import React, { useEffect, useRef } from 'react';
import { CheckCircle2, Database, ShoppingBag, ArrowRight, FileSpreadsheet } from 'lucide-react';
import { OrderApiResponse } from '../types/index.ts';
import { formatVND } from '../data/products.ts';

interface OrderSuccessModalProps {
  orderResponse: OrderApiResponse | null;
  onClose: () => void;
  onOpenSheetsModal: () => void;
}

export const OrderSuccessModal: React.FC<OrderSuccessModalProps> = ({
  orderResponse,
  onClose,
  onOpenSheetsModal
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (!orderResponse) return;

    // Gentle celebratory confetti effect on canvas
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const colors = ['#C8FF2F', '#FFFFFF', '#7B807B', '#A8FF53', '#00E5FF'];
    const particles = Array.from({ length: 45 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height * 0.4,
      size: Math.random() * 6 + 3,
      color: colors[Math.floor(Math.random() * colors.length)],
      vx: (Math.random() - 0.5) * 3,
      vy: Math.random() * 2 + 1.5,
      rotation: Math.random() * 360,
      vRot: (Math.random() - 0.5) * 4
    }));

    let animFrame: number;
    let frames = 0;

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        p.rotation += p.vRot;

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate((p.rotation * Math.PI) / 180);
        ctx.fillStyle = p.color;
        ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.6);
        ctx.restore();
      });

      frames++;
      if (frames < 180) {
        animFrame = requestAnimationFrame(render);
      } else {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
    };

    render();

    return () => cancelAnimationFrame(animFrame);
  }, [orderResponse]);

  if (!orderResponse) return null;

  const { order, savedToSheets, sheetsMessage } = orderResponse;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/90 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-300">
      {/* Confetti canvas */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none z-10"
      />

      <div className="relative z-20 w-full max-w-xl bg-[#0F1210] border border-[#C8FF2F]/50 shadow-[0_0_50px_rgba(200,255,47,0.15)] overflow-hidden my-6">
        {/* Header Banner */}
        <div className="p-6 sm:p-8 bg-[#0B0D0C] border-b border-[#252824] text-center">
          <div className="w-16 h-16 rounded-full bg-[#142210] border border-[#C8FF2F] flex items-center justify-center mx-auto mb-4 shadow-[0_0_20px_rgba(200,255,47,0.3)]">
            <CheckCircle2 className="w-9 h-9 text-[#C8FF2F]" />
          </div>

          <span className="text-[11px] font-mono tracking-[0.25em] text-[#C8FF2F] uppercase block mb-1">
            ĐẶT HÀNG THÀNH CÔNG
          </span>

          <h2 className="text-2xl sm:text-3xl font-black font-display uppercase tracking-tight text-white">
            CẢM ƠN {order.customer.fullName.toUpperCase()}!
          </h2>

          <p className="mt-2 text-xs font-mono text-[#A1A8A1]">
            Đơn hàng của bạn đã được ghi nhận vào hệ thống quản lý bán hàng ANNASHOP®.
          </p>

          <div className="mt-4 inline-flex items-center gap-2 px-3.5 py-1.5 bg-[#141715] border border-[#252824] text-xs font-mono">
            <span className="text-[#7B807B]">MÃ ĐƠN:</span>
            <span className="text-[#C8FF2F] font-bold tracking-wider">{order.orderId}</span>
          </div>
        </div>

        {/* Status of Google Sheets Relay */}
        <div className={`p-4 border-b border-[#252824] text-xs font-mono flex items-center justify-between ${
          savedToSheets ? 'bg-[#142210] text-[#C8FF2F]' : 'bg-[#1E1912] text-amber-300'
        }`}>
          <div className="flex items-center gap-2">
            <Database className="w-4 h-4 shrink-0" />
            <span>{sheetsMessage || (savedToSheets ? 'Đã đồng bộ Google Sheets' : 'Chưa kết nối Google Sheets')}</span>
          </div>

          <button
            onClick={onOpenSheetsModal}
            className="text-[11px] underline underline-offset-2 hover:text-white"
          >
            Chi tiết
          </button>
        </div>

        {/* Order Details Body */}
        <div className="p-6 sm:p-8 space-y-5 text-xs font-mono max-h-[50vh] overflow-y-auto">
          {/* Customer & Shipping info */}
          <div className="space-y-1 text-[#A1A8A1]">
            <div className="text-white font-bold uppercase mb-1">CHI TIẾT GIAO HÀNG:</div>
            <div>Họ tên: <strong className="text-white">{order.customer.fullName}</strong></div>
            <div>Số điện thoại: <strong className="text-white">{order.customer.phone}</strong></div>
            <div>Địa chỉ nhận: <strong className="text-white">{order.customer.address}</strong></div>
            <div>Phương thức: <strong className="text-[#C8FF2F]">{order.paymentMethod === 'cod' ? 'Thanh toán khi nhận hàng (COD)' : 'Chuyển khoản'}</strong></div>
            <div>Thời gian: {order.timestamp}</div>
          </div>

          {/* Ordered items breakdown */}
          <div className="pt-3 border-t border-[#1C201D] space-y-2">
            <div className="text-white font-bold uppercase">SẢN PHẨM ĐÃ ĐẶT:</div>
            {order.items.map((item, idx) => (
              <div key={idx} className="flex justify-between items-center py-1.5 border-b border-[#141715]">
                <div>
                  <div className="font-bold text-white uppercase">{item.productName}</div>
                  <div className="text-[11px] text-[#7B807B]">
                    Size: EU {item.size} · SL: {item.quantity} · Đơn giá: {formatVND(item.unitPrice)}
                  </div>
                </div>
                <div className="font-bold text-white tabular-nums">
                  {formatVND(item.itemSubtotal)}
                </div>
              </div>
            ))}
          </div>

          {/* Total summary */}
          <div className="pt-3 border-t border-[#1C201D] flex justify-between items-baseline text-sm font-bold text-white">
            <span className="font-display uppercase">TỔNG GIÁ TRỊ ĐƠN HÀNG:</span>
            <span className="text-[#C8FF2F] font-mono text-base tabular-nums">
              {formatVND(order.totalAmount)}
            </span>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-5 sm:p-6 bg-[#0B0D0C] border-t border-[#252824] flex flex-col sm:flex-row gap-3">
          <button
            onClick={onClose}
            className="flex-1 py-3.5 bg-[#C8FF2F] hover:bg-white text-[#0B0D0C] font-display font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-md"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>TIẾP TỤC MUA SẮM</span>
          </button>

          <button
            onClick={onOpenSheetsModal}
            className="py-3 px-4 bg-[#141715] hover:bg-[#1C201D] border border-[#252824] text-xs font-mono text-[#A1A8A1] hover:text-[#C8FF2F] flex items-center justify-center gap-2"
          >
            <FileSpreadsheet className="w-4 h-4 text-[#C8FF2F]" />
            <span>Xem Bảng Tính & Báo Cáo</span>
          </button>
        </div>
      </div>
    </div>
  );
};
