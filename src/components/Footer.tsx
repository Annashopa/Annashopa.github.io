import React from 'react';
import { Database, ShieldCheck, ArrowUp } from 'lucide-react';

interface FooterProps {
  onSelectCategory: (cat: string) => void;
  onOpenSheetsModal: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onSelectCategory, onOpenSheetsModal }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#070908] border-t border-[#1F2320] text-[#7B807B] pt-16 pb-12 text-xs font-mono">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-[#1C201D]">
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <a
              href="#"
              className="text-2xl font-black font-display tracking-tight text-white inline-block"
            >
              ANNASHOP<span className="text-[#C8FF2F]">®</span>
            </a>
            <p className="text-[#A1A8A1] max-w-sm leading-relaxed text-xs">
              Thương hiệu giày thể thao hiệu suất cao dành cho vận động viên và người đam mê vận động. Đột phá công nghệ trợ lực và chuyển hướng.
            </p>
            <div className="pt-2 flex items-center gap-2 text-[11px] text-[#A1A8A1]">
              <ShieldCheck className="w-4 h-4 text-[#C8FF2F]" />
              <span>Dự án đề tài môn học TMĐT & Ứng Dụng Web</span>
            </div>
          </div>

          {/* Col 2: Sport Categories */}
          <div className="space-y-3">
            <h4 className="text-white font-bold uppercase tracking-wider text-xs font-display">
              MÔN THỂ THAO
            </h4>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => onSelectCategory('badminton')}
                  className="hover:text-[#C8FF2F] transition-colors"
                >
                  Giày Cầu Lông (Badminton)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory('tennis')}
                  className="hover:text-[#C8FF2F] transition-colors"
                >
                  Giày Tennis (Hard Court)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory('running')}
                  className="hover:text-[#C8FF2F] transition-colors"
                >
                  Giày Chạy Bộ (Marathon)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory('all')}
                  className="hover:text-[#C8FF2F] transition-colors"
                >
                  Tất cả sản phẩm (12 mẫu)
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Customer Care */}
          <div className="space-y-3">
            <h4 className="text-white font-bold uppercase tracking-wider text-xs font-display">
              CHĂM SÓC KHÁCH HÀNG
            </h4>
            <ul className="space-y-2">
              <li>Miễn phí vận chuyển toàn quốc</li>
              <li>Kiểm tra hàng trước khi thanh toán (COD)</li>
              <li>Đổi size trong 07 ngày</li>
              <li>Bảo hành bung keo tróc đế 12 tháng</li>
            </ul>
          </div>

          {/* Col 4: Academic Integration & Contact */}
          <div className="space-y-3">
            <h4 className="text-white font-bold uppercase tracking-wider text-xs font-display">
              GOOGLE SHEETS API
            </h4>
            <p className="text-[11px] text-[#7B807B]">
              Đơn hàng được lưu trữ trực tiếp vào Google Spreadsheet qua Google Apps Script.
            </p>
            <button
              onClick={onOpenSheetsModal}
              className="inline-flex items-center gap-1.5 px-3 py-2 bg-[#142210] border border-[#C8FF2F]/40 text-[#C8FF2F] hover:bg-[#C8FF2F] hover:text-[#0B0D0C] transition-colors text-[11px] font-bold uppercase"
            >
              <Database className="w-3.5 h-3.5" />
              <span>Thiết lập & Kiểm tra API</span>
            </button>
          </div>
        </div>

        {/* Bottom Strip */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px]">
          <div>
            © 2026 ANNASHOP®. Bản quyền dự án e-commerce giáo dục. Mọi thông tin cấu hình có thể tinh chỉnh theo hướng dẫn.
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 text-[#A1A8A1] hover:text-[#C8FF2F] transition-colors"
          >
            <span>VỀ ĐẦU TRANG</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
};
