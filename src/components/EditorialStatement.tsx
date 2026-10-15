import React from 'react';

export const EditorialStatement: React.FC = () => {
  return (
    <section className="relative py-24 sm:py-32 bg-[#F5F5F0] text-[#0B0D0C] overflow-hidden border-b border-[#E0E0D6]">
      {/* Background Architectural Watermark Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Subtle Category Index */}
        <div className="flex items-center justify-between border-b border-[#0B0D0C]/15 pb-4 mb-12 sm:mb-16">
          <span className="text-xs font-mono tracking-[0.25em] uppercase text-[#7B807B]">
            02 // TRIẾT LÝ THIẾT KẾ ANNASHOP
          </span>
          <span className="text-xs font-mono tracking-widest uppercase text-[#0B0D0C] font-semibold">
            EST. 2026 · VIỆT NAM
          </span>
        </div>

        {/* Huge Kinetic Typography */}
        <div className="space-y-2 sm:space-y-4">
          <div className="overflow-hidden">
            <h2 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black font-display tracking-tight leading-[0.9] uppercase text-[#0B0D0C]">
              EVERY STEP.
            </h2>
          </div>
          <div className="overflow-hidden">
            <h2 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black font-display tracking-tight leading-[0.9] uppercase text-[#0B0D0C]">
              EVERY <span className="bg-[#0B0D0C] text-[#C8FF2F] px-3 sm:px-6 inline-block transform -rotate-1">COURT.</span>
            </h2>
          </div>
          <div className="overflow-hidden">
            <h2 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black font-display tracking-tight leading-[0.9] uppercase text-[#7B807B]">
              EVERY LIMIT.
            </h2>
          </div>
        </div>

        {/* Vietnamese Brand Manifesto Split Section */}
        <div className="mt-16 sm:mt-24 grid grid-cols-1 md:grid-cols-12 gap-8 items-start border-t border-[#0B0D0C]/15 pt-8 sm:pt-12">
          <div className="md:col-span-4">
            <span className="text-xs font-mono uppercase tracking-[0.2em] text-[#7B807B] block mb-2">
              BẢN TUYÊN NGÔN VẬN HÀNH
            </span>
            <p className="text-lg font-bold font-display uppercase tracking-tight text-[#0B0D0C]">
              "KHÔNG CHỈ LÀ CHUYỂN ĐỘNG. ĐÓ LÀ CÁCH BẠN BỨT PHÁ."
            </p>
          </div>

          <div className="md:col-span-8 space-y-4 text-base sm:text-lg text-[#252824] leading-relaxed">
            <p>
              Tại <strong className="text-[#0B0D0C]">ANNASHOP</strong>, chúng tôi không xem giày thể thao là một phụ kiện thời trang đơn thuần. Mỗi đôi giày đại diện cho sự tính toán chính xác về cơ sinh học: từ góc nghiêng hỗ trợ cổ chân khi cứu cầu lông sát lưới, cấu trúc chống mài mòn đế sườn khi trượt trên sân cứng tennis, cho đến tấm đĩa sợi carbon đẩy lùi lực cản trên từng kilomet marathon.
            </p>
            <p className="text-sm font-mono text-[#7B807B]">
              Hệ thống bán hàng được kết nối trực tiếp với Google Sheets theo chuẩn quy trình thương mại điện tử minh bạch, kiểm chứng đơn hàng tự động và bảo mật thông tin tối đa.
            </p>
          </div>
        </div>

        {/* 3 Pillars strip */}
        <div className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-6 pt-8 border-t border-[#0B0D0C]/10 text-xs font-mono">
          <div>
            <span className="font-bold text-[#0B0D0C] block text-sm mb-1 font-display uppercase">01 / CHUẨN XÁC NỘI SÂN</span>
            <span className="text-[#7B807B]">Cầu lông: Phản xạ siêu việt và chống trượt sàn gỗ tuyệt đối.</span>
          </div>
          <div>
            <span className="font-bold text-[#0B0D0C] block text-sm mb-1 font-display uppercase">02 / ỔN ĐỊNH CUỐI SÂN</span>
            <span className="text-[#7B807B]">Tennis: Chống lật cổ chân và bảo vệ mũi giày khi trượt cứu bóng.</span>
          </div>
          <div>
            <span className="font-bold text-[#0B0D0C] block text-sm mb-1 font-display uppercase">03 / TRỢ LỰC VƯỢT GIỚI HẠN</span>
            <span className="text-[#7B807B]">Chạy bộ: Hoàn trả 87% động năng từ bọt truyền khí nitơ và carbon.</span>
          </div>
        </div>
      </div>
    </section>
  );
};
