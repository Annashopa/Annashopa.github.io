export type SportCategory = 'badminton' | 'tennis' | 'running';

export type ShoeSize = 38 | 39 | 40 | 41 | 42 | 43 | 44 | 45;

export interface ProductSpecs {
  cushioning: string;    // Công nghệ đệm
  upper: string;         // Chất liệu thân giày
  outsole: string;       // Đế ngoài & độ bám
  weight: string;        // Trọng lượng trung bình
  drop: string;          // Độ chênh lệch gót - mũi
  surface: string;       // Bề mặt phù hợp
}

export interface Product {
  id: string;
  name: string;
  category: SportCategory;
  categoryLabelVi: string;
  series: string;
  price: number;
  originalPrice?: number;
  shortDesc: string;
  longDesc: string;
  sizes: ShoeSize[];
  inStock: boolean;
  stockCount: number;
  accentColor: string;
  themeGradient: string;
  specs: ProductSpecs;
  featured?: boolean;
  badge?: string;
  colorway?: string;
  techHighlights: string[];
}

export interface CartItem {
  productId: string;
  product: Product;
  selectedSize: ShoeSize;
  quantity: number;
}

export interface CustomerInfo {
  fullName: string;
  phone: string;
  address: string;
  note?: string;
}

export type PaymentMethod = 'cod' | 'bank_transfer';

export interface OrderItemRecord {
  productId: string;
  productName: string;
  category: string;
  size: ShoeSize;
  quantity: number;
  unitPrice: number;
  itemSubtotal: number;
}

export interface Order {
  orderId: string;
  timestamp: string;
  customer: CustomerInfo;
  items: OrderItemRecord[];
  totalAmount: number;
  paymentMethod: PaymentMethod;
  status: 'pending' | 'confirmed' | 'shipping' | 'completed';
}

export interface OrderSubmissionPayload {
  customer: CustomerInfo;
  items: {
    productId: string;
    size: ShoeSize;
    quantity: number;
  }[];
  paymentMethod: PaymentMethod;
  idempotencyKey?: string;
  googleScriptUrl?: string; // Optional client-configured Web App URL
}

export interface OrderApiResponse {
  success: boolean;
  orderId: string;
  timestamp: string;
  order: Order;
  savedToSheets: boolean;
  sheetsMessage?: string;
  error?: string;
}
