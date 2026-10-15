import React from 'react';
import { Target, Layers, Cpu, ArrowRight } from 'lucide-react';

interface WhyAnnashopProps {
  onCtaClick: () => void;
}

export const WhyAnnashop: React.FC<WhyAnnashopProps> = ({ onCtaClick }) => {
  const pillars = [
    {
      icon: Cpu,
      title: 'THIẾT KẾ DÀNH CHO CHUYỂN ĐỘNG',
      subtitle: 'Ergonomic Kinetic Geometry',
      desc: 'Mỗi chi tiết trên giày được tinh chỉnh dựa trên nghiên cứu cơ sinh học chân thật: góc nghiêng đế, phân bổ đệm khí, và độ co giãn của vải dệt ôm khít.'
    },
    {
      icon: Target,
      title: 'CHUYÊN BIỆT THEO TỪNG MÔN THỂ THAO',
      subtitle: 'Zero Compromise Performance',
      desc: 'Không sản xuất các dòng giày đa năng hời hợt. ANNASHOP phát triển ba hệ sản phẩm tách biệt hoàn toàn cho Cầu Lông, Tennis và Chạy Bộ đường dài.'
    },
    {
      icon: Layers,
      title: 'TRẢI NGHIỆM MUA SẮM MINH BẠCH',
      subtitle: 'Real-time Google Sheets Automation',
      desc: 'Đặt hàng nhanh chóng, không cần đăng ký tài khoản phức tạp. Dữ liệu đơn hàng được thẩm định máy chủ và lưu trữ tự động vào Google Sheets tức thì.'
    }
  ];

  return (
    <section id="workflow" className="py-24 sm:py-32 bg-[#0B0D0C] border-b border-[#252824]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-mono tracking-[0.25em] text-[#C8FF2F] uppercase block mb-3 font-semibold">
            08 // GIÁ TRỊ CỐT LÕI
          </span>
          <h2 className="text-3xl sm:text-5xl font-black font-display uppercase tracking-tight text-white">
            TẠI SAO CHỌN <span className="text-[#C8FF2F]">ANNASHOP?</span>
          </h2>
          <p className="mt-4 text-xs sm:text-sm font-mono text-[#A1A8A1]">
            Sự kết hợp giữa công nghệ thể thao tiên phong và nền tảng thương mại điện tử hiện đại.
          </p>
        </div>

        {/* 3 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {pillars.map((item, idx) => (
            <div
              key={idx}
              className="p-8 bg-[#0F1210] border border-[#252824] hover:border-[#C8FF2F]/60 transition-colors flex flex-col justify-between"
            >
              <div>
                <div className="w-12 h-12 bg-[#142210] border border-[#C8FF2F]/40 flex items-center justify-center text-[#C8FF2F] mb-6">
                  <item.icon className="w-6 h-6" />
                </div>
                <span className="text-[10px] font-mono text-[#7B807B] uppercase block mb-1">
                  {item.subtitle}
                </span>
                <h3 className="text-lg font-bold font-display uppercase tracking-tight text-white mb-3">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm font-mono text-[#A1A8A1] leading-relaxed">
                  {item.desc}
                </p>
              </div>

              <div className="pt-6 mt-6 border-t border-[#1C201D] text-xs font-mono text-[#7B807B]">
                CHỨNG NHẬN TIÊU CHUẨN 2026
              </div>
            </div>
          ))}
        </div>

        {/* Final Call to Action Strip */}
        <div className="mt-20 p-8 sm:p-14 bg-gradient-to-r from-[#142210] via-[#0E170F] to-[#0B0D0C] border border-[#C8FF2F]/40 flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <span className="text-xs font-mono tracking-[0.25em] text-[#C8FF2F] uppercase block mb-2 font-bold">
              BẮT ĐẦU CHUYẾN HÀNH TRÌNH
            </span>
            <h3 className="text-3xl sm:text-4xl lg:text-5xl font-black font-display uppercase text-white tracking-tight">
              YOUR NEXT MOVE STARTS HERE.
            </h3>
            <p className="mt-2 text-xs sm:text-sm font-mono text-[#A1A8A1] max-w-xl">
              Chọn đôi giày phù hợp với môn thể thao và kích cỡ chân của bạn ngay hôm nay. Hưởng ưu đãi miễn phí giao hàng toàn quốc và thanh toán COD an toàn.
            </p>
          </div>

          <button
            onClick={onCtaClick}
            className="px-8 py-4 bg-[#C8FF2F] hover:bg-white text-[#0B0D0C] font-display font-bold text-xs uppercase tracking-widest whitespace-nowrap transition-all shadow-lg flex items-center gap-3 shrink-0"
          >
            <span>CHỌN GIÀY NGAY</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
};
