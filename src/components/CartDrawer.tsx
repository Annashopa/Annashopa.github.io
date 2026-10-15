import React from 'react';
import { X, Trash2, ArrowRight, ShoppingBag, ShieldCheck } from 'lucide-react';
import { CartItem } from '../types/index.ts';
import { formatVND } from '../data/products.ts';
import { ShoeVisual } from './ShoeVisual.tsx';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (productId: string, size: number, newQty: number) => void;
  onRemoveItem: (productId: string, size: number) => void;
  onProceedToCheckout: () => void;
  onExploreMore: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onProceedToCheckout,
  onExploreMore
}) => {
  if (!isOpen) return null;

  const totalAmount = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  const totalItemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/70 backdrop-blur-sm flex justify-end animate-in fade-in duration-200">
      <div className="relative w-full max-w-md bg-[#0F1210] border-l border-[#252824] shadow-2xl flex flex-col justify-between h-full animate-in slide-in-from-right duration-300">
        {/* Header */}
        <div className="p-5 sm:p-6 border-b border-[#252824] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-[#C8FF2F]" />
            <h2 className="text-base sm:text-lg font-bold font-display uppercase tracking-tight text-white">
              GIỎ HÀNG CỦA BẠN
            </h2>
            <span className="text-xs font-mono text-[#7B807B]">
              ({totalItemCount} sản phẩm)
            </span>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-[#7B807B] hover:text-white bg-[#141715] border border-[#252824] focus:outline-none"
            aria-label="Đóng giỏ hàng"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Cart Items List */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6 divide-y divide-[#1C201D]">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center py-12">
              <div className="w-16 h-16 rounded-full bg-[#141715] border border-[#252824] flex items-center justify-center mb-4">
                <ShoppingBag className="w-7 h-7 text-[#7B807B]" />
              </div>
              <p className="text-sm font-bold font-display uppercase text-white mb-1">
                GIỎ HÀNG ĐANG TRỐNG
              </p>
              <p className="text-xs font-mono text-[#7B807B] max-w-xs mb-6">
                Chưa có sản phẩm nào được chọn. Hãy khám phá các dòng giày Cầu Lông, Tennis & Chạy Bộ.
              </p>
              <button
                onClick={() => {
                  onClose();
                  onExploreMore();
                }}
                className="px-5 py-2.5 bg-[#C8FF2F] text-[#0B0D0C] font-mono text-xs uppercase font-bold hover:bg-white transition-colors"
              >
                KHÁM PHÁ NGAY
              </button>
            </div>
          ) : (
            items.map((item) => {
              const itemTotal = item.product.price * item.quantity;

              return (
                <div
                  key={`${item.productId}-${item.selectedSize}`}
                  className="py-4 flex gap-4 items-center"
                >
                  {/* Thumbnail */}
                  <div className="w-20 h-20 bg-[#0B0D0C] border border-[#252824] flex items-center justify-center shrink-0 p-1">
                    <ShoeVisual
                      product={item.product}
                      view="card"
                      className="w-full h-full"
                    />
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <h4 className="text-xs sm:text-sm font-bold font-display uppercase text-white truncate">
                        {item.product.name}
                      </h4>
                      <button
                        onClick={() => onRemoveItem(item.productId, item.selectedSize)}
                        className="text-[#7B807B] hover:text-red-400 p-1"
                        title="Xóa sản phẩm này"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="text-[11px] font-mono text-[#7B807B] mt-0.5 flex items-center gap-2">
                      <span>Môn: {item.product.categoryLabelVi}</span>
                      <span>·</span>
                      <span className="text-[#C8FF2F] font-bold">Size: EU {item.selectedSize}</span>
                    </div>

                    <div className="mt-3 flex items-center justify-between">
                      {/* Quantity Stepper */}
                      <div className="flex items-center border border-[#252824] bg-[#141715]">
                        <button
                          onClick={() => onUpdateQuantity(item.productId, item.selectedSize, item.quantity - 1)}
                          className="px-2 py-0.5 text-xs text-[#7B807B] hover:text-white"
                          title="Giảm"
                        >
                          -
                        </button>
                        <span className="px-2.5 py-0.5 text-xs font-mono font-bold text-white tabular-nums">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => onUpdateQuantity(item.productId, item.selectedSize, item.quantity + 1)}
                          disabled={item.quantity >= item.product.stockCount}
                          className="px-2 py-0.5 text-xs text-[#7B807B] hover:text-white disabled:opacity-30"
                          title="Tăng"
                        >
                          +
                        </button>
                      </div>

                      {/* Price */}
                      <span className="text-xs sm:text-sm font-black font-mono text-[#F5F5F0] tabular-nums">
                        {formatVND(itemTotal)}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer Subtotal & Checkout CTA */}
        {items.length > 0 && (
          <div className="p-5 sm:p-6 bg-[#0B0D0C] border-t border-[#252824] space-y-4">
            <div className="space-y-1.5 text-xs font-mono">
              <div className="flex justify-between text-[#7B807B]">
                <span>Tạm tính ({totalItemCount} món):</span>
                <span className="text-white tabular-nums">{formatVND(totalAmount)}</span>
              </div>
              <div className="flex justify-between text-[#7B807B]">
                <span>Phí vận chuyển toàn quốc:</span>
                <span className="text-[#C8FF2F] font-bold">MIỄN PHÍ (0 ₫)</span>
              </div>
              <div className="flex justify-between text-sm font-bold pt-2 border-t border-[#1C201D] text-white">
                <span className="font-display uppercase">TỔNG THANH TOÁN:</span>
                <span className="text-[#C8FF2F] font-mono text-base tabular-nums">
                  {formatVND(totalAmount)}
                </span>
              </div>
            </div>

            <button
              onClick={() => {
                onClose();
                onProceedToCheckout();
              }}
              className="w-full py-4 bg-[#C8FF2F] hover:bg-white text-[#0B0D0C] font-display font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-md"
            >
              <span>TIẾN HÀNH ĐẶT HÀNG</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <div className="flex items-center justify-center gap-2 text-[11px] font-mono text-[#7B807B]">
              <ShieldCheck className="w-3.5 h-3.5 text-[#C8FF2F]" />
              <span>Dữ liệu đồng bộ Google Sheets an toàn & bảo mật</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
