import React, { useState } from 'react';
import { ShoppingBag, Eye, Check } from 'lucide-react';
import { Product, ShoeSize } from '../types/index.ts';
import { formatVND } from '../data/products.ts';
import { ShoeVisual } from './ShoeVisual.tsx';

interface ProductCardProps {
  product: Product;
  onOpenDetails: (product: Product) => void;
  onQuickAddToCart: (product: Product, size: ShoeSize) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onOpenDetails,
  onQuickAddToCart
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [selectedSize, setSelectedSize] = useState<ShoeSize>(product.sizes[1] || product.sizes[0]);
  const [addedFeedback, setAddedFeedback] = useState(false);

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    onQuickAddToCart(product, selectedSize);
    setAddedFeedback(true);
    setTimeout(() => setAddedFeedback(false), 1200);
  };

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => onOpenDetails(product)}
      className="group relative flex flex-col justify-between bg-[#111412] hover:bg-[#151916] border border-[#252824] hover:border-[#C8FF2F]/60 transition-all duration-300 cursor-pointer overflow-hidden p-5 sm:p-6"
    >
      {/* Top Bar Metadata (Zero-pill discipline: unboxed clean text) */}
      <div className="flex items-center justify-between text-xs font-mono text-[#7B807B] mb-2">
        <div className="flex items-center gap-1.5">
          <span className="uppercase text-[#A1A8A1]">{product.categoryLabelVi}</span>
          <span aria-hidden="true">·</span>
          <span>{product.series.split(' ')[0]}</span>
        </div>

        {product.originalPrice && (
          <span className="text-[#C8FF2F] text-[11px] font-bold">
            TIẾT KIỆM {formatVND(product.originalPrice - product.price)}
          </span>
        )}
      </div>

      {/* Product Image Stage (65-75% visual dominance) */}
      <div className="relative py-4 flex items-center justify-center min-h-[220px]">
        <ShoeVisual
          product={product}
          view="card"
          isHovered={isHovered}
          className="w-full aspect-[4/3]"
        />

        {/* Quick View Button overlay */}
        <div
          className={`absolute bottom-2 right-2 transition-opacity duration-200 ${
            isHovered ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <button
            onClick={(e) => {
              e.stopPropagation();
              onOpenDetails(product);
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-[#0B0D0C]/90 backdrop-blur-md border border-[#252824] hover:border-[#C8FF2F] text-xs font-mono text-[#F5F5F0] hover:text-[#C8FF2F] transition-colors focus:outline-none"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Chi tiết</span>
          </button>
        </div>
      </div>

      {/* Bottom Content Area */}
      <div className="pt-4 border-t border-[#252824]">
        {/* Product Title */}
        <h3 className="text-base sm:text-lg font-bold font-display uppercase tracking-tight text-[#F5F5F0] group-hover:text-[#C8FF2F] transition-colors line-clamp-1">
          {product.name}
        </h3>

        {/* Short description */}
        <p className="mt-1 text-xs text-[#7B807B] line-clamp-1 font-mono">
          {product.shortDesc}
        </p>

        {/* Price Lockup */}
        <div className="mt-3 flex items-baseline gap-2">
          <span className="text-lg font-black font-mono tracking-tight text-[#F5F5F0] tabular-nums">
            {formatVND(product.price)}
          </span>
          {product.originalPrice && (
            <span className="text-xs font-mono text-[#7B807B] line-through tabular-nums">
              {formatVND(product.originalPrice)}
            </span>
          )}
        </div>

        {/* Interactive Size Selector & Quick Add Trigger */}
        <div className="mt-4 pt-3 border-t border-[#1F2320]">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-mono text-[#7B807B] uppercase">Chọn Size:</span>
            <span className="text-[11px] font-mono font-bold text-[#C8FF2F]">EU {selectedSize}</span>
          </div>

          <div className="grid grid-cols-6 gap-1" onClick={(e) => e.stopPropagation()}>
            {product.sizes.map((size) => (
              <button
                key={size}
                type="button"
                onClick={() => setSelectedSize(size)}
                className={`py-1 text-[11px] font-mono font-bold transition-all border ${
                  selectedSize === size
                    ? 'bg-[#C8FF2F] text-[#0B0D0C] border-[#C8FF2F]'
                    : 'bg-[#181C19] text-[#A1A8A1] border-[#252824] hover:border-[#7B807B] hover:text-white'
                }`}
              >
                {size}
              </button>
            ))}
          </div>

          {/* Quick Add To Cart Button */}
          <button
            type="button"
            onClick={handleQuickAdd}
            className={`w-full mt-3 py-2.5 px-3 flex items-center justify-center gap-2 text-xs font-mono uppercase tracking-wider font-bold transition-all duration-200 ${
              addedFeedback
                ? 'bg-white text-[#0B0D0C]'
                : 'bg-[#1E2320] hover:bg-[#C8FF2F] text-[#F5F5F0] hover:text-[#0B0D0C] border border-[#2E332D]'
            }`}
          >
            {addedFeedback ? (
              <>
                <Check className="w-4 h-4 text-emerald-600" />
                <span>ĐÃ THÊM SIZE {selectedSize}</span>
              </>
            ) : (
              <>
                <ShoppingBag className="w-3.5 h-3.5" />
                <span>THÊM VÀO GIỎ</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
