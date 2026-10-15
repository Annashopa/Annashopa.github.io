import React, { useState } from 'react';
import { X, Check, ShoppingBag, Zap, ShieldAlert, ArrowRight, Ruler } from 'lucide-react';
import { Product, ShoeSize } from '../types/index.ts';
import { PRODUCTS, formatVND } from '../data/products.ts';
import { ShoeVisual } from './ShoeVisual.tsx';

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product, size: ShoeSize, quantity: number) => void;
  onBuyNow: (product: Product, size: ShoeSize, quantity: number) => void;
  onSelectRelated: (product: Product) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  onClose,
  onAddToCart,
  onBuyNow,
  onSelectRelated
}) => {
  if (!product) return null;

  const [selectedSize, setSelectedSize] = useState<ShoeSize | null>(null);
  const [quantity, setQuantity] = useState<number>(1);
  const [selectedAngle, setSelectedAngle] = useState<'lateral' | 'sole' | 'top'>('lateral');
  const [showSizeGuide, setShowSizeGuide] = useState<boolean>(false);
  const [validationError, setValidationError] = useState<string | null>(null);
  const [addedSuccess, setAddedSuccess] = useState<boolean>(false);

  // Related products from same sport category
  const relatedProducts = PRODUCTS.filter(
    (p) => p.category === product.category && p.id !== product.id
  ).slice(0, 3);

  const handleAddToCart = () => {
    if (!selectedSize) {
      setValidationError('Vui lòng chọn size giày trước khi thêm vào giỏ hàng.');
      return;
    }
    setValidationError(null);
    onAddToCart(product, selectedSize, quantity);
    setAddedSuccess(true);
    setTimeout(() => setAddedSuccess(false), 2000);
  };

  const handleBuyNow = () => {
    if (!selectedSize) {
      setValidationError('Vui lòng chọn size giày trước khi thanh toán.');
      return;
    }
    setValidationError(null);
    onBuyNow(product, selectedSize, quantity);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 md:p-6 animate-in fade-in duration-200">
      <div className="relative w-full max-w-5xl bg-[#0F1210] border border-[#252824] shadow-2xl overflow-hidden my-6">
        {/* Modal Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 text-[#7B807B] hover:text-white bg-[#141715]/80 border border-[#252824] focus:outline-none"
          aria-label="Đóng"
        >
          <X className="w-5 h-5" />
        </button>

        {/* 2-Column Responsive Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[580px]">
          {/* Left Column: Cinematic Product Gallery */}
          <div className="lg:col-span-7 bg-[#0B0D0C] p-6 sm:p-10 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-[#252824]">
            {/* Top metadata unboxed */}
            <div className="flex items-center justify-between text-xs font-mono text-[#7B807B]">
              <span className="uppercase text-[#C8FF2F]">{product.categoryLabelVi}</span>
              <span>{product.series}</span>
            </div>

            {/* Main Stage Image */}
            <div className="my-6 relative flex items-center justify-center">
              <ShoeVisual
                product={product}
                view="spotlight"
                angle={selectedAngle}
                className="w-full aspect-[4/3] max-w-lg"
              />
            </div>

            {/* Gallery Angle Tabs & Highlights */}
            <div>
              <div className="flex items-center justify-between text-xs font-mono text-[#7B807B] mb-3">
                <span>GÓC QUAN SÁT:</span>
                <span className="text-white uppercase font-bold">{selectedAngle.toUpperCase()}</span>
              </div>
              <div className="grid grid-cols-3 gap-2">
                {(['lateral', 'sole', 'top'] as const).map((angle) => (
                  <button
                    key={angle}
                    onClick={() => setSelectedAngle(angle)}
                    className={`py-2 text-[11px] font-mono uppercase tracking-wider border transition-colors ${
                      selectedAngle === angle
                        ? 'border-[#C8FF2F] bg-[#142210] text-[#C8FF2F] font-bold'
                        : 'border-[#252824] bg-[#111412] text-[#7B807B] hover:text-white'
                    }`}
                  >
                    {angle === 'lateral' ? 'Mặt Ngoài' : angle === 'sole' ? 'Mặt Đế' : 'Góc Trên'}
                  </button>
                ))}
              </div>

              {/* Tech Highlights tags */}
              <div className="mt-4 pt-4 border-t border-[#1C201D] flex flex-wrap gap-2 text-[11px] font-mono text-[#A1A8A1]">
                {product.techHighlights.map((tech, i) => (
                  <span key={i} className="border border-[#252824] px-2 py-0.5 bg-[#141715]">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Contiguous Purchase Module & Specs */}
          <div className="lg:col-span-5 p-6 sm:p-8 flex flex-col justify-between bg-[#0F1210]">
            <div>
              {/* Product Title */}
              <h2 className="text-2xl sm:text-3xl font-black font-display uppercase tracking-tight text-white">
                {product.name}
              </h2>

              {/* Price lockup */}
              <div className="mt-3 flex items-baseline gap-3 pb-4 border-b border-[#252824]">
                <span className="text-2xl sm:text-3xl font-black font-mono tracking-tight text-[#C8FF2F] tabular-nums">
                  {formatVND(product.price)}
                </span>
                {product.originalPrice && (
                  <span className="text-sm font-mono text-[#7B807B] line-through tabular-nums">
                    {formatVND(product.originalPrice)}
                  </span>
                )}
              </div>

              {/* Long Description */}
              <p className="mt-4 text-xs sm:text-sm text-[#A1A8A1] leading-relaxed">
                {product.longDesc}
              </p>

              {/* Shoe Size Selection (Mandatory) */}
              <div className="mt-6">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono uppercase text-[#F5F5F0] font-bold">
                      CHỌN SIZE (EU):
                    </span>
                    {selectedSize && (
                      <span className="text-xs font-mono font-bold text-[#C8FF2F]">
                        ĐÃ CHỌN {selectedSize}
                      </span>
                    )}
                  </div>
                  <button
                    type="button"
                    onClick={() => setShowSizeGuide(!showSizeGuide)}
                    className="text-[11px] font-mono text-[#7B807B] hover:text-[#C8FF2F] flex items-center gap-1 underline underline-offset-2"
                  >
                    <Ruler className="w-3 h-3" />
                    <span>Bảng đo size</span>
                  </button>
                </div>

                {/* Size guide popup accordion */}
                {showSizeGuide && (
                  <div className="p-3 mb-3 bg-[#151916] border border-[#252824] text-[11px] font-mono text-[#A1A8A1] animate-in fade-in">
                    <div className="font-bold text-white mb-1">QUY ĐỔI KÍCH CỠ CHUẨN:</div>
                    <div className="grid grid-cols-4 gap-1 text-center">
                      <div>EU 39: 24.5cm</div>
                      <div>EU 40: 25.0cm</div>
                      <div>EU 41: 25.5cm</div>
                      <div>EU 42: 26.0cm</div>
                      <div>EU 43: 26.5cm</div>
                      <div>EU 44: 27.0cm</div>
                      <div>EU 45: 27.5cm</div>
                      <div>Form chuẩn</div>
                    </div>
                  </div>
                )}

                {/* Size Grid */}
                <div className="grid grid-cols-4 sm:grid-cols-6 gap-1.5">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      type="button"
                      onClick={() => {
                        setSelectedSize(size);
                        setValidationError(null);
                      }}
                      className={`py-2 text-xs font-mono font-bold transition-all border ${
                        selectedSize === size
                          ? 'bg-[#C8FF2F] text-[#0B0D0C] border-[#C8FF2F] shadow-sm'
                          : 'bg-[#141715] text-[#F5F5F0] border-[#252824] hover:border-[#7B807B]'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>

                {/* Validation Error Banner */}
                {validationError && (
                  <div className="mt-2.5 p-2 bg-red-950/60 border border-red-500/50 text-red-300 text-xs font-mono flex items-center gap-1.5 animate-in shake">
                    <ShieldAlert className="w-4 h-4 shrink-0 text-red-400" />
                    <span>{validationError}</span>
                  </div>
                )}
              </div>

              {/* Quantity Stepper */}
              <div className="mt-5 flex items-center gap-4">
                <span className="text-xs font-mono uppercase text-[#7B807B]">Số lượng:</span>
                <div className="flex items-center border border-[#252824] bg-[#141715]">
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    disabled={quantity <= 1}
                    className="px-3 py-1.5 text-sm font-mono text-[#F5F5F0] hover:bg-[#252824] disabled:opacity-40"
                  >
                    -
                  </button>
                  <span className="px-4 py-1 text-xs font-mono font-bold text-white tabular-nums">
                    {quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => Math.min(product.stockCount, q + 1))}
                    disabled={quantity >= product.stockCount}
                    className="px-3 py-1.5 text-sm font-mono text-[#F5F5F0] hover:bg-[#252824] disabled:opacity-40"
                  >
                    +
                  </button>
                </div>
                <span className="text-[11px] font-mono text-[#7B807B]">
                  (Còn {product.stockCount} đôi sẵn kho)
                </span>
              </div>

              {/* Action Buttons: Add to Cart & Buy Now */}
              <div className="mt-6 space-y-2">
                <button
                  type="button"
                  onClick={handleAddToCart}
                  className={`w-full py-3.5 px-4 flex items-center justify-center gap-2 font-display uppercase tracking-wider font-bold text-xs transition-all ${
                    addedSuccess
                      ? 'bg-white text-[#0B0D0C]'
                      : 'bg-[#C8FF2F] hover:bg-white text-[#0B0D0C]'
                  }`}
                >
                  {addedSuccess ? (
                    <>
                      <Check className="w-4 h-4 text-emerald-600" />
                      <span>ĐÃ THÊM VÀO GIỎ HÀNG THÀNH CÔNG!</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-4 h-4" />
                      <span>THÊM VÀO GIỎ HÀNG</span>
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={handleBuyNow}
                  className="w-full py-3 px-4 flex items-center justify-center gap-2 font-mono uppercase tracking-wider text-xs font-bold text-[#F5F5F0] hover:text-[#C8FF2F] bg-[#181C19] hover:bg-[#202521] border border-[#2E332D] transition-colors"
                >
                  <Zap className="w-3.5 h-3.5 text-[#C8FF2F]" />
                  <span>MUA NGAY & THANH TOÁN (COD)</span>
                </button>
              </div>

              {/* Technical Specifications Matrix */}
              <div className="mt-8 pt-6 border-t border-[#252824]">
                <h4 className="text-xs font-mono font-bold uppercase text-[#7B807B] tracking-wider mb-3">
                  THÔNG SỐ KỸ THUẬT CƠ HỌC:
                </h4>
                <div className="space-y-1.5 text-xs font-mono">
                  <div className="flex justify-between py-1 border-b border-[#1C201D]">
                    <span className="text-[#7B807B]">Công nghệ đệm:</span>
                    <span className="text-white text-right font-medium">{product.specs.cushioning}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-[#1C201D]">
                    <span className="text-[#7B807B]">Thân giày (Upper):</span>
                    <span className="text-white text-right font-medium">{product.specs.upper}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-[#1C201D]">
                    <span className="text-[#7B807B]">Đế ngoài (Outsole):</span>
                    <span className="text-white text-right font-medium">{product.specs.outsole}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-[#1C201D]">
                    <span className="text-[#7B807B]">Trọng lượng:</span>
                    <span className="text-[#C8FF2F] text-right font-bold tabular-nums">{product.specs.weight}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-[#1C201D]">
                    <span className="text-[#7B807B]">Độ chênh (Drop):</span>
                    <span className="text-white text-right font-medium">{product.specs.drop}</span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span className="text-[#7B807B]">Mặt sân phù hợp:</span>
                    <span className="text-white text-right font-medium">{product.specs.surface}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Related Products Footer */}
            {relatedProducts.length > 0 && (
              <div className="mt-8 pt-4 border-t border-[#252824]">
                <span className="text-[11px] font-mono text-[#7B807B] uppercase block mb-2">
                  CÙNG MÔN THỂ THAO ({product.categoryLabelVi.toUpperCase()}):
                </span>
                <div className="flex items-center gap-2">
                  {relatedProducts.map((rel) => (
                    <button
                      key={rel.id}
                      onClick={() => onSelectRelated(rel)}
                      className="flex-1 p-2 bg-[#141715] hover:bg-[#1D221E] border border-[#252824] text-left transition-colors"
                    >
                      <div className="text-[10px] font-mono text-white truncate font-bold">
                        {rel.name.split(' ')[1]} {rel.name.split(' ')[2]}
                      </div>
                      <div className="text-[10px] font-mono text-[#C8FF2F] tabular-nums">
                        {formatVND(rel.price)}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
