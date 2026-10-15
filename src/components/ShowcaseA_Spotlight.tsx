import React, { useState } from 'react';
import { ArrowRight, Activity, ShieldCheck, Zap } from 'lucide-react';
import { PRODUCTS } from '../data/products.ts';
import { ShoeVisual } from './ShoeVisual.tsx';

interface ShowcaseAProps {
  onExploreProduct: (productId: string) => void;
}

export const ShowcaseA_Spotlight: React.FC<ShowcaseAProps> = ({ onExploreProduct }) => {
  const spotlightShoe = PRODUCTS.find((p) => p.id === 'run-01') || PRODUCTS[0];
  const [activeTab, setActiveTab] = useState<'comfort' | 'stability' | 'responsiveness'>('responsiveness');

  const technicalDetails = {
    comfort: {
      title: 'ĐỘ ÊM ÁI TOÀN PHẦN (COMFORT)',
      desc: 'Công nghệ bọt đệm truyền khí Nitơ đa mật độ tạo nên cấu trúc bóng khí siêu vi, giảm thiểu 40% áp lực phản hồi lên khớp gối và cơ bắp bàn chân trong các cự ly chạy dài.',
      icon: Activity,
      stat: 'Cấu trúc bọt vi mô Nitơ'
    },
    stability: {
      title: 'ĐỘ ỔN ĐỊNH CƠ HỌC (STABILITY)',
      desc: 'Khung định hình TPU đúc liền khối ôm sát gót chân cùng đế ngoài mở rộng ở gan bàn chân giúp triệt tiêu hiện tượng vặn xoắn và lật cổ chân khi tiếp đất ở tốc độ cao.',
      icon: ShieldCheck,
      stat: 'Khung chống xoắn 360°'
    },
    responsiveness: {
      title: 'HOÀN TRẢ ĐỘNG NĂNG (RESPONSIVENESS)',
      desc: 'Tấm đĩa trợ lực sợi Carbon toàn phần uốn cong theo giải phẫu sinh học hoạt động như một chiếc đòn bẩy tự nhiên, gia tăng phản xạ bật nảy trong từng chu kỳ tiếp đất.',
      icon: Zap,
      stat: 'Tấm đệm Carbon nguyên khối'
    }
  };

  const current = technicalDetails[activeTab];

  return (
    <section id="spotlight" className="py-24 sm:py-32 bg-[#0B0D0C] border-b border-[#252824] relative overflow-hidden">
      {/* Background Radial Glow */}
      <div className="absolute top-1/2 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#C8FF2F]/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-12">
          <span className="text-xs font-mono tracking-[0.25em] text-[#C8FF2F] uppercase block mb-3">
            05 // SHOWCASE A · ĐỘT PHÁ CÔNG NGHỆ
          </span>
          <h2 className="text-4xl sm:text-6xl lg:text-7xl font-black font-display uppercase tracking-tight text-white max-w-3xl leading-[0.95]">
            ENGINEERED FOR YOUR <span className="text-[#C8FF2F]">NEXT MOVE.</span>
          </h2>
        </div>

        {/* 2-Column Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Column: Large Product Visual */}
          <div className="lg:col-span-7 relative bg-[#0F1210] border border-[#252824] p-8 sm:p-12 overflow-hidden flex items-center justify-center">
            {/* Background grid */}
            <div className="absolute inset-0 bg-[radial-gradient(#252824_1px,transparent_1px)] [background-size:24px_24px] opacity-40 pointer-events-none" />

            <div className="relative z-10 w-full max-w-xl">
              <ShoeVisual
                product={spotlightShoe}
                view="spotlight"
                className="w-full aspect-[16/10]"
              />
            </div>

            <div className="absolute bottom-4 left-6 text-xs font-mono text-[#7B807B]">
              FLAGSHIP MODEL // {spotlightShoe.name}
            </div>
          </div>

          {/* Right Column: Technical Panel */}
          <div className="lg:col-span-5 space-y-6">
            {/* Switch Tabs */}
            <div className="grid grid-cols-3 gap-2 p-1 bg-[#141715] border border-[#252824]">
              {(['comfort', 'stability', 'responsiveness'] as const).map((tabKey) => (
                <button
                  key={tabKey}
                  onClick={() => setActiveTab(tabKey)}
                  className={`py-2 text-[11px] font-mono uppercase tracking-wider transition-colors ${
                    activeTab === tabKey
                      ? 'bg-[#C8FF2F] text-[#0B0D0C] font-bold'
                      : 'text-[#7B807B] hover:text-white'
                  }`}
                >
                  {tabKey === 'comfort' ? 'Êm Ái' : tabKey === 'stability' ? 'Ổn Định' : 'Trợ Lực'}
                </button>
              ))}
            </div>

            {/* Active Content Card */}
            <div className="p-6 bg-[#121513] border border-[#252824] space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-none bg-[#1C201D] border border-[#C8FF2F]/40 flex items-center justify-center text-[#C8FF2F]">
                  <current.icon className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] font-mono text-[#7B807B] uppercase block">
                    CHỈ SỐ THIẾT KẾ CƠ SINH HỌC
                  </span>
                  <h3 className="text-base font-bold font-display uppercase tracking-tight text-white">
                    {current.title}
                  </h3>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-[#A1A8A1] font-mono leading-relaxed">
                {current.desc}
              </p>

              <div className="pt-3 border-t border-[#1C201D] flex items-center justify-between text-xs font-mono">
                <span className="text-[#7B807B]">Đặc điểm then chốt:</span>
                <span className="text-[#C8FF2F] font-bold">{current.stat}</span>
              </div>
            </div>

            {/* Explore button */}
            <button
              onClick={() => onExploreProduct(spotlightShoe.id)}
              className="w-full py-4 bg-[#141715] hover:bg-[#C8FF2F] text-[#F5F5F0] hover:text-[#0B0D0C] border border-[#2E332D] hover:border-[#C8FF2F] font-display font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all"
            >
              <span>CHI TIẾT {spotlightShoe.name}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
