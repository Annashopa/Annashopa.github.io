import React, { useState, useEffect } from 'react';
import { ArrowDown, ArrowRight, ShieldCheck, Zap, Sparkles } from 'lucide-react';
import { PRODUCTS } from '../data/products.ts';
import { ShoeVisual } from './ShoeVisual.tsx';

interface HeroProps {
  onExploreClick: () => void;
  onFindShoeClick: () => void;
  onOpenProduct: (productId: string) => void;
}

export const Hero: React.FC<HeroProps> = ({
  onExploreClick,
  onFindShoeClick,
  onOpenProduct
}) => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const flagshipShoe = PRODUCTS.find((p) => p.id === 'run-01') || PRODUCTS[0];

  useEffect(() => {
    // Only track mouse movement on non-touch devices for performance
    const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (isTouch) return;

    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      const x = (e.clientX / innerWidth - 0.5) * 20; // max +/- 10px offset
      const y = (e.clientY / innerHeight - 0.5) * 20;
      setMousePos({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section className="relative min-h-screen flex flex-col justify-between pt-28 pb-12 overflow-hidden bg-[#0B0D0C] border-b border-[#252824]">
      {/* Cinematic Ambient Directional Lighting */}
      <div
        className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[550px] rounded-full pointer-events-none transition-transform duration-700 ease-out"
        style={{
          background: 'radial-gradient(circle, rgba(200, 255, 47, 0.12) 0%, rgba(20, 34, 16, 0.05) 50%, transparent 75%)',
          transform: `translate(calc(-50% + ${mousePos.x * 1.5}px), calc(-50% + ${mousePos.y * 1.5}px))`
        }}
      />
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-[#252824]/20 rounded-full blur-[140px] pointer-events-none" />

      {/* Hero Content Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex-1 flex flex-col justify-center my-auto">
        {/* Eyebrow kicker */}
        <div className="mb-4 flex items-center gap-3">
          <span className="w-8 h-[2px] bg-[#C8FF2F]" />
          <span className="text-xs sm:text-sm font-mono tracking-[0.25em] text-[#C8FF2F] uppercase font-semibold">
            ANNASHOP® / PERFORMANCE FOOTWEAR / 2026
          </span>
        </div>

        {/* 2-Column Responsive Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Enormous Editorial Typography */}
          <div className="lg:col-span-6 z-10">
            <h1 className="text-5xl sm:text-7xl lg:text-8xl xl:text-9xl font-black font-display tracking-tight leading-[0.88] uppercase text-[#F5F5F0]">
              <span className="block hover:text-[#C8FF2F] transition-colors duration-300">BUILT TO</span>
              <span className="block text-transparent [-webkit-text-stroke:2px_#F5F5F0] hover:text-[#F5F5F0] transition-colors duration-300">
                MOVE
              </span>
              <span className="block text-[#C8FF2F]">BEYOND.</span>
            </h1>

            {/* Vietnamese Subheading */}
            <p className="mt-6 text-base sm:text-lg text-[#A1A8A1] max-w-xl font-normal leading-relaxed">
              Khám phá những đôi giày được tạo nên cho tốc độ, sự linh hoạt và những giới hạn mới.
              Chuyên biệt cho Cầu Lông, Tennis và Chạy Bộ đường trường.
            </p>

            {/* Dual CTAs */}
            <div className="mt-8 sm:mt-10 flex flex-wrap items-center gap-4">
              {/* Primary CTA */}
              <button
                onClick={onExploreClick}
                className="group relative inline-flex items-center gap-3 px-7 py-4 bg-[#C8FF2F] text-[#0B0D0C] font-display font-bold text-sm tracking-wider uppercase transition-all duration-300 hover:bg-white hover:shadow-[0_0_25px_rgba(200,255,47,0.4)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C8FF2F]"
              >
                <span>KHÁM PHÁ BỘ SƯU TẬP</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </button>

              {/* Secondary CTA */}
              <button
                onClick={onFindShoeClick}
                className="inline-flex items-center gap-2 px-6 py-4 bg-[#141715] hover:bg-[#252824] border border-[#2E332D] hover:border-[#C8FF2F]/60 text-[#F5F5F0] hover:text-[#C8FF2F] font-mono text-xs tracking-wider uppercase transition-all duration-200 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#C8FF2F]"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#C8FF2F]" />
                <span>TÌM ĐÔI GIÀY CỦA BẠN</span>
              </button>
            </div>

            {/* Micro Trust Indicators */}
            <div className="mt-10 pt-6 border-t border-[#252824] flex items-center gap-6 text-xs font-mono text-[#7B807B]">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#C8FF2F]" />
                <span>Cam kết chính hãng 100%</span>
              </div>
              <span className="text-[#3B423A]">/</span>
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-[#C8FF2F]" />
                <span>Đồng bộ Google Sheets</span>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Masterpiece Centerpiece Shoe */}
          <div className="lg:col-span-6 relative flex items-center justify-center">
            <div
              className="relative w-full max-w-xl transition-transform duration-500 ease-out cursor-pointer group"
              style={{
                transform: `translate(${mousePos.x * -0.8}px, ${mousePos.y * -0.8}px)`
              }}
              onClick={() => onOpenProduct(flagshipShoe.id)}
              title="Nhấn để xem chi tiết ANNA NITRO-VELOCITY ELITE"
            >
              {/* Product Badge Tag */}
              <div className="absolute top-4 left-4 z-20 bg-[#0B0D0C]/80 backdrop-blur-md border border-[#252824] px-3 py-1.5 text-[11px] font-mono uppercase tracking-wider text-[#C8FF2F]">
                FLAGSHIP 2026 · {flagshipShoe.name}
              </div>

              {/* Shoe visual component in hero view */}
              <ShoeVisual
                product={flagshipShoe}
                view="hero"
                className="w-full aspect-[4/3] sm:aspect-[16/11]"
              />

              {/* Tap to inspect hover affordance */}
              <div className="text-center mt-2">
                <span className="text-[11px] font-mono tracking-widest text-[#7B807B] group-hover:text-[#C8FF2F] transition-colors">
                  [ NHẤN VÀO GIÀY ĐỂ MỞ THÔNG SỐ CHI TIẾT ]
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Elegant Bottom Scroll Indicator */}
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 flex items-center justify-between text-xs font-mono text-[#7B807B]">
        <div className="flex items-center gap-2">
          <span className="text-[#C8FF2F]">01</span>
          <span>/</span>
          <span>03 MÔN THỂ THAO ĐỈNH CAO</span>
        </div>

        <button
          onClick={onExploreClick}
          className="flex items-center gap-2 hover:text-[#C8FF2F] transition-colors group focus:outline-none"
        >
          <span className="tracking-widest uppercase text-[11px]">CUỘN ĐỂ KHÁM PHÁ</span>
          <ArrowDown className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-y-1 text-[#C8FF2F]" />
        </button>
      </div>
    </section>
  );
};
