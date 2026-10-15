import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { SportCategory } from '../types/index.ts';

interface ShowcaseCProps {
  onSelectCategory: (cat: SportCategory) => void;
}

export const ShowcaseC_Story: React.FC<ShowcaseCProps> = ({ onSelectCategory }) => {
  const stories = [
    {
      category: 'badminton' as SportCategory,
      num: '01',
      title: 'PRECISION // CHUẨN XÁC',
      sportVi: 'CẦU LÔNG',
      quote: 'Trong một trận cầu đỉnh cao, 0.05 giây và 3 milimet quyết định thắng bại.',
      desc: 'Giày cầu lông ANNASHOP mang cấu trúc đế Hexa-Grip từ cao su thiên nhiên giúp ghim chặt mũi chân vào thảm sân trong tích tắc để bật nhảy đập cầu uy lực.',
      accent: '#C8FF2F'
    },
    {
      category: 'tennis' as SportCategory,
      num: '02',
      title: 'CONTROL // KIỂM SOÁT',
      sportVi: 'TENNIS',
      quote: 'Kiểm soát quán tính sau cú trả bóng nặng là chìa khóa làm chủ vạch cuối sân.',
      desc: 'Hệ khung Dynawall và lớp phủ mũi Drag-Shield biến đổi toàn bộ xung chấn trượt ngang thành điểm tựa vững chãi cho cú bung vợt tiếp theo.',
      accent: '#38BDF8'
    },
    {
      category: 'running' as SportCategory,
      num: '03',
      title: 'FREEDOM // TỰ DO',
      sportVi: 'CHẠY BỘ',
      quote: 'Khi tâm trí hòa cùng nhịp thở, mọi giới hạn kilomet đều bị phá bỏ.',
      desc: 'Sự cộng hưởng giữa bọt Nitro-Foam truyền khí nitơ và tấm đĩa sợi carbon đẩy lùi sự mỏi mệt của cơ bắp, mang lại cảm giác thanh thoát như bay trên mặt đường.',
      accent: '#EC4899'
    }
  ];

  return (
    <section className="py-24 sm:py-32 bg-[#F5F5F0] text-[#0B0D0C] border-b border-[#E0E0D6]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between pb-8 border-b border-[#0B0D0C]/15 mb-12 gap-6">
          <div>
            <span className="text-xs font-mono tracking-[0.25em] text-[#7B807B] uppercase block mb-2">
              07 // SHOWCASE C · CÂU CHUYỆN SẢN PHẨM
            </span>
            <h2 className="text-3xl sm:text-5xl font-black font-display uppercase tracking-tight text-[#0B0D0C]">
              THE ANNASHOP <span className="underline decoration-[#C8FF2F] decoration-4">CHRONICLES</span>
            </h2>
          </div>
          <p className="text-xs sm:text-sm font-mono text-[#7B807B] max-w-sm">
            Ba triết lý cơ học ứng với ba môn thể thao trọng điểm. Khám phá câu chuyện đằng sau từng thiết kế.
          </p>
        </div>

        {/* 3 Story Panels (Horizontal card layout on desktop, stacked on mobile) */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {stories.map((story) => (
            <div
              key={story.num}
              onClick={() => onSelectCategory(story.category)}
              className="group bg-white p-8 sm:p-10 border border-[#0B0D0C]/10 hover:border-[#0B0D0C] transition-all duration-300 flex flex-col justify-between min-h-[420px] cursor-pointer shadow-sm hover:shadow-xl"
            >
              <div>
                <div className="flex items-center justify-between text-xs font-mono text-[#7B807B] pb-6 border-b border-[#0B0D0C]/10">
                  <span className="text-2xl font-black font-display text-[#0B0D0C]">
                    {story.num}
                  </span>
                  <span className="uppercase font-bold tracking-wider text-[#0B0D0C]">
                    {story.sportVi}
                  </span>
                </div>

                <div className="mt-8">
                  <h3 className="text-xl sm:text-2xl font-black font-display uppercase text-[#0B0D0C] group-hover:text-black">
                    {story.title}
                  </h3>
                  <blockquote className="mt-4 text-sm font-bold font-display italic text-[#252824] border-l-2 border-[#0B0D0C] pl-3 py-1">
                    "{story.quote}"
                  </blockquote>
                  <p className="mt-4 text-xs sm:text-sm text-[#7B807B] leading-relaxed">
                    {story.desc}
                  </p>
                </div>
              </div>

              <div className="pt-6 border-t border-[#0B0D0C]/10 flex items-center justify-between text-xs font-mono">
                <span className="font-bold text-[#0B0D0C] uppercase group-hover:underline">
                  KHÁM PHÁ DÒNG GIÀY {story.sportVi}
                </span>
                <div className="w-8 h-8 rounded-full bg-[#0B0D0C] text-[#C8FF2F] flex items-center justify-center group-hover:scale-110 transition-transform">
                  <ArrowUpRight className="w-4 h-4" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
