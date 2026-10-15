import React, { useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { SportCategory } from '../types/index.ts';
import { PRODUCTS } from '../data/products.ts';
import { ShoeVisual } from './ShoeVisual.tsx';

interface ThreeWorldsProps {
  onSelectCategory: (category: SportCategory) => void;
}

export const ThreeWorldsOfMotion: React.FC<ThreeWorldsProps> = ({ onSelectCategory }) => {
  const [hoveredArena, setHoveredArena] = useState<SportCategory | null>(null);

  // Representative shoe for each category
  const badmintonShoe = PRODUCTS.find((p) => p.id === 'bmt-01')!;
  const tennisShoe = PRODUCTS.find((p) => p.id === 'tns-01')!;
  const runningShoe = PRODUCTS.find((p) => p.id === 'run-01')!;

  const arenas = [
    {
      id: 'badminton' as SportCategory,
      num: '01',
      titleVi: 'GIÀY CẦU LÔNG',
      titleEn: 'BADMINTON ARENA',
      tagline: 'TỐC ĐỘ & BẬT NHẢY SMASH',
      desc: 'Thiết kế đế cao su tự nhiên Hexa-Grip bám sàn tuyệt đối. Khung gia cố cổ chân bảo vệ tối đa các pha chuyển hướng ngang và cứu cầu gấp mép lưới.',
      representativeShoe: badmintonShoe,
      courtAesthetic: 'Sân thảm PVC tiêu chuẩn BWF',
      color: '#C8FF2F',
      surfaceGradient: 'from-[#142310] via-[#0E150F] to-[#0B0D0C]'
    },
    {
      id: 'tennis' as SportCategory,
      num: '02',
      titleVi: 'GIÀY TENNIS',
      titleEn: 'TENNIS ARENA',
      tagline: 'VỮNG CHÃI & TRƯỢT SÂN CỨNG',
      desc: 'Lớp bảo vệ mũi Drag-Shield chịu mài mòn cao. Khung Dynawall khóa chặt bàn chân trong những cú vụt forehand uy lực và các pha trượt cứu bóng.',
      representativeShoe: tennisShoe,
      courtAesthetic: 'Sân cứng Hard Court & Sân đất nện ITF',
      color: '#38BDF8',
      surfaceGradient: 'from-[#0C1E2B] via-[#0D151C] to-[#0B0D0C]'
    },
    {
      id: 'running' as SportCategory,
      num: '03',
      titleVi: 'GIÀY CHẠY BỘ',
      titleEn: 'RUNNING ARENA',
      tagline: 'TRỢ LỰC CARBON & BỨT TỐC',
      desc: 'Bọt Nitro-Foam truyền Nitơ hoàn trả 87% động năng kết hợp tấm đĩa carbon uốn cong trợ lực từng guồng chân trên đường đua 21K - 42K.',
      representativeShoe: runningShoe,
      courtAesthetic: 'Đường Road đô thị & Đường chạy Track',
      color: '#E11D48',
      surfaceGradient: 'from-[#280D14] via-[#170C10] to-[#0B0D0C]'
    }
  ];

  return (
    <section id="arenas" className="py-24 sm:py-32 bg-[#0B0D0C] border-b border-[#252824]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono tracking-[0.25em] text-[#C8FF2F] uppercase mb-3">
              <span>03 // THE THREE WORLDS OF MOTION</span>
            </div>
            <h2 className="text-4xl sm:text-6xl font-black font-display tracking-tight uppercase text-white">
              CHOOSE YOUR <span className="text-[#C8FF2F]">ARENA.</span>
            </h2>
          </div>
          <p className="max-w-md text-sm text-[#A1A8A1] font-mono leading-relaxed">
            Mỗi môn thể thao đòi hỏi một cấu trúc cơ học riêng biệt. Chọn đấu trường của bạn để khám phá bộ sưu tập chuyên sâu.
          </p>
        </div>

        {/* 3 Arena Panels (Oversized, interactive responsive grid) */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {arenas.map((arena) => {
            const isHovered = hoveredArena === arena.id;

            return (
              <div
                key={arena.id}
                onMouseEnter={() => setHoveredArena(arena.id)}
                onMouseLeave={() => setHoveredArena(null)}
                onClick={() => onSelectCategory(arena.id)}
                className={`group relative overflow-hidden bg-gradient-to-b ${arena.surfaceGradient} border transition-all duration-500 cursor-pointer flex flex-col justify-between p-8 sm:p-10 min-h-[520px] ${
                  isHovered ? 'border-[#C8FF2F] shadow-[0_20px_40px_rgba(0,0,0,0.8)] -translate-y-1.5' : 'border-[#252824]'
                }`}
              >
                {/* Top: Index & Subtitle */}
                <div>
                  <div className="flex items-center justify-between text-xs font-mono pb-6 border-b border-[#252824]">
                    <span className="text-3xl font-black font-display text-[#7B807B] group-hover:text-white transition-colors">
                      {arena.num}
                    </span>
                    <span className="text-[11px] uppercase tracking-wider text-[#7B807B] group-hover:text-[#C8FF2F] transition-colors">
                      {arena.courtAesthetic}
                    </span>
                  </div>

                  <div className="mt-8">
                    <span className="text-[11px] font-mono tracking-widest uppercase block text-[#C8FF2F] mb-1">
                      {arena.tagline}
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-black font-display uppercase tracking-tight text-white group-hover:translate-x-1 transition-transform">
                      {arena.titleVi}
                    </h3>
                    <p className="mt-3 text-xs sm:text-sm text-[#A1A8A1] leading-relaxed">
                      {arena.desc}
                    </p>
                  </div>
                </div>

                {/* Center: Dynamic Category Shoe Visual */}
                <div className="my-8 relative flex items-center justify-center">
                  <div className="w-full max-w-[280px]">
                    <ShoeVisual
                      product={arena.representativeShoe}
                      view="card"
                      isHovered={isHovered}
                      className="aspect-[4/3]"
                    />
                  </div>
                </div>

                {/* Bottom: Clickable Action Bar */}
                <div className="pt-6 border-t border-[#252824] flex items-center justify-between text-xs font-mono">
                  <span className="tracking-wider text-white uppercase font-bold group-hover:text-[#C8FF2F] transition-colors">
                    XEM BỘ SƯU TẬP {arena.titleVi}
                  </span>
                  <div className="w-9 h-9 flex items-center justify-center bg-[#1B1E1A] group-hover:bg-[#C8FF2F] text-white group-hover:text-[#0B0D0C] transition-all">
                    <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
