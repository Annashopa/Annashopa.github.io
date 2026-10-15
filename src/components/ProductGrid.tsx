import React, { useState, useMemo } from 'react';
import { Search, SlidersHorizontal, RotateCcw, ArrowUpDown } from 'lucide-react';
import { Product, ShoeSize, SportCategory } from '../types/index.ts';
import { PRODUCTS, CATEGORIES, formatVND } from '../data/products.ts';
import { ProductCard } from './ProductCard.tsx';

interface ProductGridProps {
  selectedCategory: string;
  onCategoryChange: (cat: string) => void;
  onOpenDetails: (product: Product) => void;
  onQuickAddToCart: (product: Product, size: ShoeSize) => void;
}

export const ProductGrid: React.FC<ProductGridProps> = ({
  selectedCategory,
  onCategoryChange,
  onOpenDetails,
  onQuickAddToCart
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSizeFilter, setSelectedSizeFilter] = useState<number | null>(null);
  const [maxPriceFilter, setMaxPriceFilter] = useState<number>(5500000);
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'name-az'>('featured');
  const [showFiltersMobile, setShowFiltersMobile] = useState(false);

  const allSizes: ShoeSize[] = [38, 39, 40, 41, 42, 43, 44, 45];

  // Filtering & Sorting Logic
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((item) => {
      // Category filter
      if (selectedCategory !== 'all' && item.category !== selectedCategory) {
        return false;
      }
      // Search filter
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchName = item.name.toLowerCase().includes(q);
        const matchDesc = item.shortDesc.toLowerCase().includes(q);
        const matchSeries = item.series.toLowerCase().includes(q);
        const matchCategory = item.categoryLabelVi.toLowerCase().includes(q);
        if (!matchName && !matchDesc && !matchSeries && !matchCategory) {
          return false;
        }
      }
      // Size filter
      if (selectedSizeFilter !== null) {
        if (!item.sizes.includes(selectedSizeFilter as ShoeSize)) {
          return false;
        }
      }
      // Price filter
      if (item.price > maxPriceFilter) {
        return false;
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'name-az') return a.name.localeCompare(b.name);
      // default: featured
      return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
    });
  }, [selectedCategory, searchQuery, selectedSizeFilter, maxPriceFilter, sortBy]);

  const hasActiveFilters =
    selectedCategory !== 'all' ||
    searchQuery.trim() !== '' ||
    selectedSizeFilter !== null ||
    maxPriceFilter < 5500000 ||
    sortBy !== 'featured';

  const handleResetFilters = () => {
    onCategoryChange('all');
    setSearchQuery('');
    setSelectedSizeFilter(null);
    setMaxPriceFilter(5500000);
    setSortBy('featured');
  };

  return (
    <section id="catalog" className="py-20 bg-[#0B0D0C] border-b border-[#252824]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between pb-8 border-b border-[#252824] mb-10 gap-6">
          <div>
            <span className="text-xs font-mono tracking-[0.25em] text-[#C8FF2F] uppercase block mb-2">
              04 // DANH MỤC SẢN PHẨM TOÀN DIỆN
            </span>
            <h2 className="text-3xl sm:text-5xl font-black font-display uppercase tracking-tight text-white">
              BỘ SƯU TẬP <span className="text-[#C8FF2F]">CHÍNH THỨC</span>
            </h2>
          </div>

          <p className="text-xs sm:text-sm font-mono text-[#7B807B] max-w-sm">
            12 mẫu giày thể thao hiệu suất cao đạt chứng nhận thi đấu. Lựa chọn môn đấu, size chân và đặt hàng lưu trực tiếp Google Sheets.
          </p>
        </div>

        {/* Discovery & Control Toolbar */}
        <div className="space-y-6 mb-10">
          {/* Top Row: Category Tabs & Search Bar */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            {/* Functional Segmented Category Tabs (Buttons) */}
            <div className="flex flex-wrap items-center gap-1.5 p-1 bg-[#121513] border border-[#252824] rounded-none">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => onCategoryChange(cat.id)}
                  className={`px-4 py-2 text-xs font-mono uppercase tracking-wider transition-all duration-200 whitespace-nowrap ${
                    selectedCategory === cat.id
                      ? 'bg-[#C8FF2F] text-[#0B0D0C] font-bold shadow-sm'
                      : 'text-[#A1A8A1] hover:text-white hover:bg-[#1A1F1B]'
                  }`}
                >
                  {cat.labelVi}
                  <span className="ml-1.5 text-[10px] opacity-70">
                    ({cat.id === 'all' ? PRODUCTS.length : PRODUCTS.filter((p) => p.category === cat.id).length})
                  </span>
                </button>
              ))}
            </div>

            {/* Search Input Box */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#7B807B]" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Tìm theo tên giày, công nghệ, môn đấu..."
                className="w-full pl-10 pr-4 py-2.5 bg-[#141715] border border-[#252824] focus:border-[#C8FF2F] text-[#F5F5F0] placeholder-[#7B807B] text-xs font-mono transition-colors focus:outline-none"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#7B807B] hover:text-white"
                >
                  ✕
                </button>
              )}
            </div>
          </div>

          {/* Secondary Row: Filter Strip (Size, Price slider, Sorting, Reset) */}
          <div className="pt-4 border-t border-[#1C201D] flex flex-wrap items-center justify-between gap-4 text-xs font-mono">
            {/* Size Filter */}
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-[#7B807B] uppercase tracking-wider">Lọc Size:</span>
              <button
                onClick={() => setSelectedSizeFilter(null)}
                className={`px-2.5 py-1 border transition-colors ${
                  selectedSizeFilter === null
                    ? 'bg-[#F5F5F0] text-[#0B0D0C] border-white font-bold'
                    : 'bg-[#141715] text-[#7B807B] border-[#252824] hover:border-[#7B807B]'
                }`}
              >
                TẤT CẢ
              </button>
              {allSizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSizeFilter(selectedSizeFilter === size ? null : size)}
                  className={`px-2.5 py-1 border transition-colors ${
                    selectedSizeFilter === size
                      ? 'bg-[#C8FF2F] text-[#0B0D0C] border-[#C8FF2F] font-bold'
                      : 'bg-[#141715] text-[#A1A8A1] border-[#252824] hover:border-[#7B807B] hover:text-white'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>

            {/* Right: Sort & Price & Reset */}
            <div className="flex items-center gap-4 flex-wrap">
              {/* Price Range max control */}
              <div className="flex items-center gap-2">
                <span className="text-[#7B807B]">Giá tối đa:</span>
                <span className="text-[#C8FF2F] font-bold">{formatVND(maxPriceFilter)}</span>
                <input
                  type="range"
                  min="2000000"
                  max="5500000"
                  step="200000"
                  value={maxPriceFilter}
                  onChange={(e) => setMaxPriceFilter(Number(e.target.value))}
                  className="w-24 accent-[#C8FF2F] cursor-pointer"
                />
              </div>

              {/* Sort selector */}
              <div className="flex items-center gap-2">
                <ArrowUpDown className="w-3.5 h-3.5 text-[#7B807B]" />
                <select
                  value={sortBy}
                  onChange={(e: any) => setSortBy(e.target.value)}
                  className="bg-[#141715] border border-[#252824] text-[#F5F5F0] text-xs font-mono px-3 py-1.5 focus:border-[#C8FF2F] focus:outline-none"
                >
                  <option value="featured">Nổi bật nhất</option>
                  <option value="price-asc">Giá: Thấp đến Cao</option>
                  <option value="price-desc">Giá: Cao đến Thấp</option>
                  <option value="name-az">Tên: A — Z</option>
                </select>
              </div>

              {/* Reset filter button if active */}
              {hasActiveFilters && (
                <button
                  onClick={handleResetFilters}
                  className="flex items-center gap-1.5 px-3 py-1.5 text-xs text-[#C8FF2F] hover:text-white border border-[#C8FF2F]/30 hover:border-white transition-colors"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Xóa bộ lọc</span>
                </button>
              )}
            </div>
          </div>

          {/* Results count indicator */}
          <div className="flex items-center justify-between text-xs font-mono text-[#7B807B]">
            <div>
              Hiển thị <span className="text-white font-bold">{filteredProducts.length}</span> trên tổng số {PRODUCTS.length} mẫu giày
              {selectedCategory !== 'all' && ` · Môn: ${selectedCategory.toUpperCase()}`}
              {selectedSizeFilter && ` · Size: EU ${selectedSizeFilter}`}
            </div>
            {filteredProducts.length === 0 && (
              <span className="text-amber-400">Không tìm thấy sản phẩm phù hợp.</span>
            )}
          </div>
        </div>

        {/* Empty State */}
        {filteredProducts.length === 0 ? (
          <div className="py-20 text-center border border-dashed border-[#252824] bg-[#121513]">
            <p className="text-lg font-bold font-display uppercase text-[#F5F5F0] mb-2">
              KHÔNG TÌM THẤY SẢN PHẨM PHÙ HỢP
            </p>
            <p className="text-xs font-mono text-[#7B807B] max-w-md mx-auto mb-6">
              Vui lòng thử tìm từ khóa khác hoặc xóa bớt tiêu chí lọc size và khoảng giá.
            </p>
            <button
              onClick={handleResetFilters}
              className="px-5 py-2.5 bg-[#C8FF2F] text-[#0B0D0C] font-mono font-bold text-xs uppercase"
            >
              ĐẶT LẠI TẤT CẢ BỘ LỌC
            </button>
          </div>
        ) : (
          /* Products Grid (3 columns on desktop, 2 on tablet, 1 on mobile) */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onOpenDetails={onOpenDetails}
                onQuickAddToCart={onQuickAddToCart}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
