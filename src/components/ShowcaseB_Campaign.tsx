import React from 'react';
import { ArrowRight } from 'lucide-react';

interface ShowcaseBProps {
  onExploreCampaign: () => void;
}

export const ShowcaseB_Campaign: React.FC<ShowcaseBProps> = ({ onExploreCampaign }) => {
  return (
    <section className="relative py-28 sm:py-36 bg-[#0B0D0C] overflow-hidden border-b border-[#252824]">
      {/* Background Graphic Field */}
      <div className="absolute inset-0 bg-gradient-to-r from-black via-[#101411] to-black opacity-90" />

      {/* Speed lines backdrop */}
      <svg
        className="absolute inset-0 w-full h-full opacity-15 pointer-events-none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <line x1="0" y1="20%" x2="100%" y2="80%" stroke="#C8FF2F" strokeWidth="2" strokeDasharray="10 15" />
        <line x1="0" y1="40%" x2="100%" y2="100%" stroke="#FFFFFF" strokeWidth="1" strokeDasharray="6 12" />
        <circle cx="85%" cy="30%" r="280" fill="none" stroke="#252824" strokeWidth="1.5" />
      </svg>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-10">
        <div>
          <span className="text-xs font-mono tracking-[0.3em] text-[#C8FF2F] uppercase block mb-3 font-semibold">
            06 // SHOWCASE B · CAMPAIGN 2026
          </span>

          <h2 className="text-5xl sm:text-7xl lg:text-8xl font-black font-display uppercase tracking-tight text-white leading-[0.88]">
            THE GAME<br />
            <span className="text-transparent [-webkit-text-stroke:2px_#F5F5F0]">NEVER</span>{' '}
            <span className="text-[#C8FF2F]">STOPS.</span>
          </h2>

          <p className="mt-6 text-sm sm:text-base text-[#A1A8A1] max-w-xl font-mono leading-relaxed">
            Dù là thảm đấu cầu lông rực lửa, mặt sân cứng tennis chói chang hay chặng marathon 42.195km dưới cơn mưa đêm — ANNASHOP đồng hành cùng từng giây bứt phá của bạn.
          </p>
        </div>

        <div className="shrink-0">
          <button
            onClick={onExploreCampaign}
            className="px-8 py-5 bg-[#C8FF2F] hover:bg-white text-[#0B0D0C] font-display font-black text-sm tracking-widest uppercase transition-all duration-300 shadow-[0_0_30px_rgba(200,255,47,0.3)] flex items-center gap-3 group focus-visible:outline-none"
          >
            <span>XEM TẤT CẢ BỘ SƯU TẬP</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>
        </div>
      </div>
    </section>
  );
};
