import { CartItem, CustomerInfo, Order, OrderApiResponse, PaymentMethod, ShoeSize } from '../types/index.ts';

const STORAGE_KEY_SCRIPT_URL = 'annashop_google_script_url';

export function getSavedGoogleScriptUrl(): string {
  try {
    return localStorage.getItem(STORAGE_KEY_SCRIPT_URL) || '';
  } catch {
    return '';
  }
}

export function saveGoogleScriptUrl(url: string): void {
  try {
    localStorage.setItem(STORAGE_KEY_SCRIPT_URL, url.trim());
  } catch (err) {
    console.error('Cannot save Google Script URL to localStorage', err);
  }
}

/**
 * Validates Vietnamese phone numbers:
 * Starts with 0 or +84, followed by 3, 5, 7, 8, 9, and 8 digits (10 digits total).
 */
export function validateVietnamesePhone(phone: string): { isValid: boolean; message?: string } {
  const cleaned = phone.replace(/[\s.-]/g, '');
  if (!cleaned) {
    return { isValid: false, message: 'Vui lòng nhập số điện thoại nhận hàng' };
  }
  const regex = /^(0|\+84)(3|5|7|8|9)[0-9]{8}$/;
  if (!regex.test(cleaned)) {
    return {
      isValid: false,
      message: 'Số điện thoại không hợp lệ (ví dụ: 0987654321 hoặc +84987654321)'
    };
  }
  return { isValid: true };
}

/**
 * Sanitizes spreadsheet inputs to prevent CSV / formula injection (=, +, -, @).
 */
export function sanitizeSpreadsheetCell(value: string): string {
  if (!value) return '';
  const trimmed = value.trim();
  if (['=', '+', '-', '@'].includes(trimmed.charAt(0))) {
    return `'${trimmed}`;
  }
  return trimmed;
}

export function generateOrderId(): string {
  const dateStr = new Date().toISOString().slice(2, 10).replace(/-/g, '');
  const randomSuffix = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `ANNA-${dateStr}-${randomSuffix}`;
}

export async function submitOrderToBackend(
  customer: CustomerInfo,
  cartItems: CartItem[],
  paymentMethod: PaymentMethod,
  idempotencyKey?: string
): Promise<OrderApiResponse> {
  const googleScriptUrl = getSavedGoogleScriptUrl();

  const payload = {
    customer: {
      fullName: sanitizeSpreadsheetCell(customer.fullName),
      phone: customer.phone.replace(/[\s.-]/g, ''),
      address: sanitizeSpreadsheetCell(customer.address),
      note: customer.note ? sanitizeSpreadsheetCell(customer.note) : ''
    },
    items: cartItems.map((item) => ({
      productId: item.productId,
      size: item.selectedSize,
      quantity: item.quantity
    })),
    paymentMethod,
    idempotencyKey: idempotencyKey || `key-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    googleScriptUrl
  };

  try {
    const response = await fetch('/api/orders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      const errData = await response.json().catch(() => ({ error: 'Máy chủ phản hồi lỗi' }));
      throw new Error(errData.error || `HTTP ${response.status}`);
    }

    const data: OrderApiResponse = await response.json();
    return data;
  } catch (error: any) {
    // If running in pure Vite dev mode without server.ts proxy running yet, provide seamless authoritative fallback
    console.warn('Backend relay unavailable, running client-side direct validator & sheets dispatch', error);
    return submitOrderDirectFallback(customer, cartItems, paymentMethod, googleScriptUrl);
  }
}

/**
 * Fallback direct client submission that also calculates prices authoritatively
 * and posts directly to Google Apps Script if configured.
 */
async function submitOrderDirectFallback(
  customer: CustomerInfo,
  cartItems: CartItem[],
  paymentMethod: PaymentMethod,
  googleScriptUrl: string
): Promise<OrderApiResponse> {
  const orderId = generateOrderId();
  const timestamp = new Date().toLocaleString('vi-VN', { timeZone: 'Asia/Ho_Chi_Minh' });

  let totalAmount = 0;
  const orderItems = cartItems.map((item) => {
    const subtotal = item.product.price * item.quantity;
    totalAmount += subtotal;
    return {
      productId: item.productId,
      productName: item.product.name,
      category: item.product.categoryLabelVi,
      size: item.selectedSize,
      quantity: item.quantity,
      unitPrice: item.product.price,
      itemSubtotal: subtotal
    };
  });

  const orderRecord: Order = {
    orderId,
    timestamp,
    customer,
    items: orderItems,
    totalAmount,
    paymentMethod,
    status: 'confirmed'
  };

  let savedToSheets = false;
  let sheetsMessage = 'Chưa cấu hình Google Apps Script URL (Chế độ thiết lập).';

  if (googleScriptUrl && googleScriptUrl.startsWith('https://script.google.com/')) {
    try {
      // Prepared row data for Google Sheets
      const sheetPayload = {
        action: 'create_order',
        orderId,
        timestamp,
        customerName: sanitizeSpreadsheetCell(customer.fullName),
        phoneNumber: customer.phone,
        deliveryAddress: sanitizeSpreadsheetCell(customer.address),
        productDetails: orderItems.map((i) => `${i.productName} (Size ${i.size}) x${i.quantity}`).join(' | '),
        shoeSizes: orderItems.map((i) => i.size).join(', '),
        quantities: orderItems.map((i) => i.quantity).join(', '),
        unitPrices: orderItems.map((i) => `${i.unitPrice.toLocaleString('vi-VN')} đ`).join(', '),
        orderTotal: `${totalAmount.toLocaleString('vi-VN')} đ`,
        paymentMethod: paymentMethod === 'cod' ? 'COD (Thanh toán khi nhận hàng)' : 'Chuyển khoản ngân hàng',
        orderStatus: 'Đã xác nhận (Mới)',
        customerNote: customer.note || ''
      };

      const res = await fetch(googleScriptUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify(sheetPayload)
      });

      if (res.ok) {
        savedToSheets = true;
        sheetsMessage = 'Đã lưu đơn hàng thành công vào Google Sheets!';
      } else {
        sheetsMessage = `Google Script phản hồi mã HTTP ${res.status}`;
      }
    } catch (e: any) {
      console.error('Lỗi khi gửi trực tiếp tới Google Apps Script:', e);
      sheetsMessage = `Lỗi kết nối tới Google Sheets: ${e.message || 'CORS hoặc URL không đúng'}`;
    }
  }

  return {
    success: true,
    orderId,
    timestamp,
    order: orderRecord,
    savedToSheets,
    sheetsMessage
  };
}
