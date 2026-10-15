import React, { useState, useEffect } from 'react';
import { ShoppingBag, Database, Menu, X, ArrowUpRight } from 'lucide-react';

interface NavbarProps {
  cartItemCount: number;
  onOpenCart: () => void;
  onOpenSheetsModal: () => void;
  onSelectCategory: (cat: string) => void;
  activeCategory: string;
}

export const Navbar: React.FC<NavbarProps> = ({
  cartItemCount,
  onOpenCart,
  onOpenSheetsModal,
  onSelectCategory,
  activeCategory
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { id: 'badminton', label: 'Cầu Lông' },
    { id: 'tennis', label: 'Tennis' },
    { id: 'running', label: 'Chạy Bộ' },
    { id: 'spotlight', label: 'Công Nghệ', isScrollTarget: '#spotlight' },
    { id: 'workflow', label: 'Quy Trình', isScrollTarget: '#workflow' }
  ];

  const handleNavClick = (link: typeof navLinks[0]) => {
    setIsMobileMenuOpen(false);
    if (link.isScrollTarget) {
      const el = document.querySelector(link.isScrollTarget);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
        return;
      }
    }
    onSelectCategory(link.id);
    const catalogEl = document.getElementById('catalog');
    if (catalogEl) {
      catalogEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-[#0B0D0C]/90 backdrop-blur-md border-b border-[#252824] py-3.5 shadow-lg'
            : 'bg-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-8">
            {/* Zone 1: Single text element wordmark */}
            <a
              href="#"
              className="text-xl sm:text-2xl font-black tracking-tight font-display text-white whitespace-nowrap shrink-0 group flex items-center gap-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C8FF2F]"
            >
              <span>ANNASHOP</span>
              <span className="text-[#C8FF2F] group-hover:scale-110 transition-transform">®</span>
            </a>

            {/* Zone 2: 4–5 clean single-line text navigation links */}
            <nav className="hidden md:flex items-center gap-8 text-xs font-semibold uppercase tracking-wider text-[#A1A8A1]">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link)}
                  className={`transition-colors whitespace-nowrap shrink-0 relative py-1 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#C8FF2F] ${
                    activeCategory === link.id
                      ? 'text-[#C8FF2F]'
                      : 'hover:text-white'
                  }`}
                >
                  {link.label}
                  {activeCategory === link.id && (
                    <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#C8FF2F]" />
                  )}
                </button>
              ))}
            </nav>

            {/* Zone 3: Primary action cluster */}
            <div className="flex items-center gap-3 shrink-0">
              {/* Google Sheets Integration Modal Trigger */}
              <button
                onClick={onOpenSheetsModal}
                title="Cấu hình Google Sheets & Xem Tài Liệu Môn Học"
                className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-[11px] font-mono uppercase tracking-wider text-[#C8FF2F] bg-[#142210] border border-[#C8FF2F]/40 hover:bg-[#C8FF2F] hover:text-[#0B0D0C] transition-all whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C8FF2F]"
              >
                <Database className="w-3.5 h-3.5" />
                <span>Google Sheets API</span>
              </button>

              {/* Shopping Bag Button */}
              <button
                onClick={onOpenCart}
                aria-label={`Giỏ hàng (${cartItemCount} sản phẩm)`}
                className="relative inline-flex items-center justify-center p-2.5 bg-[#1B1E1A] hover:bg-[#252824] border border-[#2E332D] text-white hover:text-[#C8FF2F] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C8FF2F]"
              >
                <ShoppingBag className="w-4 h-4" />
                {cartItemCount > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 w-5 h-5 flex items-center justify-center bg-[#C8FF2F] text-[#0B0D0C] text-[10px] font-bold font-mono rounded-full shadow-md">
                    {cartItemCount}
                  </span>
                )}
              </button>

              {/* Mobile menu toggle */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden p-2 text-[#A1A8A1] hover:text-white focus-visible:outline-none"
                aria-label="Menu"
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Navigation */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-30 bg-[#0B0D0C]/95 backdrop-blur-xl md:hidden pt-24 px-6 flex flex-col justify-between pb-10 animate-in fade-in duration-200">
          <div className="flex flex-col gap-6">
            <span className="text-[11px] font-mono tracking-widest text-[#7B807B] uppercase">
              DANH MỤC THỂ THAO
            </span>
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleNavClick(link)}
                className="text-left text-2xl font-bold font-display text-[#F5F5F0] hover:text-[#C8FF2F] transition-colors flex items-center justify-between"
              >
                <span>{link.label}</span>
                <ArrowUpRight className="w-5 h-5 text-[#7B807B]" />
              </button>
            ))}
          </div>

          <div className="pt-8 border-t border-[#252824] flex flex-col gap-4">
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                onOpenSheetsModal();
              }}
              className="w-full flex items-center justify-center gap-2 py-3 bg-[#142210] border border-[#C8FF2F]/50 text-[#C8FF2F] text-xs font-mono uppercase tracking-wider font-bold"
            >
              <Database className="w-4 h-4" />
              <span>Cấu Hình Google Sheets API</span>
            </button>
            <p className="text-[11px] font-mono text-[#7B807B] text-center">
              ANNASHOP® FOOTWEAR 2026 · VIỆT NAM
            </p>
          </div>
        </div>
      )}
    </>
  );
};
