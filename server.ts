import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { PRODUCTS } from './src/data/products.ts';
import { CustomerInfo, Order, OrderItemRecord, PaymentMethod, ShoeSize } from './src/types/index.ts';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = Number(process.env.PORT) || 3000;

app.use(express.json());

// In-memory idempotency cache (keyed by idempotencyKey)
const processedOrders = new Map<string, { timestamp: number; response: any }>();

// Formula injection sanitizer
function sanitizeFormula(str: string): string {
  if (!str) return '';
  const trimmed = str.trim();
  if (['=', '+', '-', '@'].includes(trimmed.charAt(0))) {
    return `'${trimmed}`;
  }
  return trimmed;
}

// Generate authoritative Order ID
function createOrderId(): string {
  const dateStr = new Date().toISOString().slice(2, 10).replace(/-/g, '');
  const rand = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `ANNA-${dateStr}-${rand}`;
}

// Phone validator (Vietnamese format)
function isValidPhone(phone: string): boolean {
  const cleaned = phone.replace(/[\s.-]/g, '');
  return /^(0|\+84)(3|5|7|8|9)[0-9]{8}$/.test(cleaned);
}

// API Health & Config Status
app.get('/api/config', (req: Request, res: Response) => {
  const envUrl = process.env.GOOGLE_SCRIPT_URL || '';
  res.json({
    status: 'online',
    storeName: 'ANNASHOP® — The Future of Motion',
    googleSheetsConfigured: !!envUrl,
    environment: process.env.NODE_ENV || 'development'
  });
});

// Authoritative Order Submission Endpoint
app.post('/api/orders', async (req: Request, res: Response) => {
  try {
    const { customer, items, paymentMethod, idempotencyKey, googleScriptUrl: clientScriptUrl } = req.body;

    // 1. Idempotency Check
    if (idempotencyKey && processedOrders.has(idempotencyKey)) {
      const cached = processedOrders.get(idempotencyKey)!;
      // If within 5 minutes, return duplicate cached response
      if (Date.now() - cached.timestamp < 300000) {
        return res.json({
          ...cached.response,
          duplicatePrevented: true
        });
      }
    }

    // 2. Validate Customer Details
    if (!customer || typeof customer !== 'object') {
      return res.status(400).json({ error: 'Thông tin khách hàng không hợp lệ.' });
    }

    const fullName = (customer.fullName || '').trim();
    const phone = (customer.phone || '').trim();
    const address = (customer.address || '').trim();
    const note = (customer.note || '').trim();

    if (!fullName) {
      return res.status(400).json({ error: 'Vui lòng nhập Họ và tên khách hàng.' });
    }

    if (!isValidPhone(phone)) {
      return res.status(400).json({ error: 'Số điện thoại không hợp lệ theo chuẩn Việt Nam (10 số).' });
    }

    if (!address) {
      return res.status(400).json({ error: 'Vui lòng cung cấp địa chỉ nhận hàng chi tiết.' });
    }

    // 3. Validate Cart Items against Authoritative Catalog
    if (!Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ error: 'Giỏ hàng của bạn đang trống.' });
    }

    let calculatedTotal = 0;
    const validatedOrderItems: OrderItemRecord[] = [];

    for (const item of items) {
      const { productId, size, quantity } = item;
      const product = PRODUCTS.find((p) => p.id === productId);

      if (!product) {
        return res.status(400).json({ error: `Sản phẩm với ID ${productId} không tồn tại trong hệ thống.` });
      }

      if (!product.inStock) {
        return res.status(400).json({ error: `Sản phẩm "${product.name}" hiện đã hết hàng.` });
      }

      const numQuantity = parseInt(quantity, 10);
      if (isNaN(numQuantity) || numQuantity <= 0) {
        return res.status(400).json({ error: `Số lượng cho sản phẩm "${product.name}" phải là số nguyên dương.` });
      }

      const numSize = parseInt(size, 10) as ShoeSize;
      if (!product.sizes.includes(numSize)) {
        return res.status(400).json({ error: `Size ${size} không khả dụng cho mẫu "${product.name}".` });
      }

      // Authoritative server-side price calculation
      const itemSubtotal = product.price * numQuantity;
      calculatedTotal += itemSubtotal;

      validatedOrderItems.push({
        productId: product.id,
        productName: sanitizeFormula(product.name),
        category: product.categoryLabelVi,
        size: numSize,
        quantity: numQuantity,
        unitPrice: product.price,
        itemSubtotal
      });
    }

    // 4. Construct Order Record
    const orderId = createOrderId();
    const serverTimestamp = new Date().toLocaleString('vi-VN', { timeZone: 'Asia/Ho_Chi_Minh' });

    const orderRecord: Order = {
      orderId,
      timestamp: serverTimestamp,
      customer: {
        fullName: sanitizeFormula(fullName),
        phone: phone.replace(/[\s.-]/g, ''),
        address: sanitizeFormula(address),
        note: sanitizeFormula(note)
      },
      items: validatedOrderItems,
      totalAmount: calculatedTotal,
      paymentMethod: (paymentMethod as PaymentMethod) || 'cod',
      status: 'confirmed'
    };

    // 5. Google Sheets Web App Synchronization
    const targetScriptUrl = (process.env.GOOGLE_SCRIPT_URL || clientScriptUrl || '').trim();
    let savedToSheets = false;
    let sheetsMessage = 'Chưa cấu hình Google Apps Script URL. Đơn hàng được lưu trên máy chủ.';

    if (targetScriptUrl && targetScriptUrl.startsWith('https://script.google.com/')) {
      try {
        const sheetPayload = {
          action: 'create_order',
          orderId,
          timestamp: serverTimestamp,
          customerName: orderRecord.customer.fullName,
          phoneNumber: orderRecord.customer.phone,
          deliveryAddress: orderRecord.customer.address,
          productDetails: validatedOrderItems.map((i) => `${i.productName} (Size ${i.size}) x${i.quantity}`).join(' | '),
          shoeSizes: validatedOrderItems.map((i) => i.size).join(', '),
          quantities: validatedOrderItems.map((i) => i.quantity).join(', '),
          unitPrices: validatedOrderItems.map((i) => `${i.unitPrice.toLocaleString('vi-VN')} đ`).join(', '),
          orderTotal: `${calculatedTotal.toLocaleString('vi-VN')} đ`,
          paymentMethod: paymentMethod === 'cod' ? 'COD (Thanh toán khi nhận hàng)' : 'Chuyển khoản ngân hàng',
          orderStatus: 'Đã xác nhận (Mới)',
          customerNote: orderRecord.customer.note || ''
        };

        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), 8000); // 8-second safety timeout

        const response = await fetch(targetScriptUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'text/plain;charset=utf-8'
          },
          body: JSON.stringify(sheetPayload),
          signal: controller.signal
        });

        clearTimeout(timeout);

        if (response.ok) {
          savedToSheets = true;
          sheetsMessage = 'Đã ghi nhận đơn hàng thành công vào Google Sheets!';
        } else {
          sheetsMessage = `Google Script phản hồi HTTP ${response.status}. Đơn hàng vẫn được tạo an toàn.`;
        }
      } catch (scriptErr: any) {
        console.error('Lỗi khi chuyển tiếp dữ liệu tới Google Apps Script:', scriptErr);
        sheetsMessage = `Không thể kết nối tới Google Apps Script (${scriptErr.message || 'Timeout / URL không hợp lệ'}).`;
      }
    }

    const responsePayload = {
      success: true,
      orderId,
      timestamp: serverTimestamp,
      order: orderRecord,
      savedToSheets,
      sheetsMessage
    };

    if (idempotencyKey) {
      processedOrders.set(idempotencyKey, {
        timestamp: Date.now(),
        response: responsePayload
      });
    }

    return res.status(201).json(responsePayload);
  } catch (error: any) {
    console.error('Lỗi xử lý đơn hàng:', error);
    return res.status(500).json({ error: 'Đã xảy ra lỗi hệ thống khi xử lý đơn hàng: ' + (error.message || '') });
  }
});

// Full-Stack Server Initialization with Vite
async function startServer() {
  const isDev = process.env.NODE_ENV !== 'production';

  if (isDev) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa'
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (req: Request, res: Response) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`ANNASHOP Server listening on http://0.0.0.0:${PORT}`);
  });
}

startServer();
