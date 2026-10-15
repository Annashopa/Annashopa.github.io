import React, { useState } from 'react';
import { X, ArrowRight, ArrowLeft, ShieldCheck, CheckCircle2, AlertCircle, Loader2, CreditCard, Truck } from 'lucide-react';
import { CartItem, CustomerInfo, OrderApiResponse, PaymentMethod } from '../types/index.ts';
import { formatVND } from '../data/products.ts';
import { validateVietnamesePhone, submitOrderToBackend } from '../lib/sheetsIntegration.ts';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onOrderSuccess: (response: OrderApiResponse) => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  items,
  onOrderSuccess
}) => {
  if (!isOpen) return null;

  const [step, setStep] = useState<1 | 2>(1);
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [note, setNote] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('cod');

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const totalAmount = items.reduce((sum, i) => sum + i.product.price * i.quantity, 0);

  const validateStep1 = (): boolean => {
    const newErrors: { [key: string]: string } = {};

    if (!fullName.trim()) {
      newErrors.fullName = 'Vui lòng nhập họ và tên người nhận.';
    }

    const phoneCheck = validateVietnamesePhone(phone);
    if (!phoneCheck.isValid) {
      newErrors.phone = phoneCheck.message || 'Số điện thoại không hợp lệ.';
    }

    if (!address.trim()) {
      newErrors.address = 'Vui lòng nhập địa chỉ nhận hàng chi tiết.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNextToReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateStep1()) {
      setStep(2);
      setSubmitError(null);
    }
  };

  const handleConfirmOrder = async () => {
    if (isSubmitting) return;

    if (!validateStep1()) {
      setStep(1);
      return;
    }

    if (items.length === 0) {
      setSubmitError('Giỏ hàng trống. Không thể tạo đơn.');
      return;
    }

    setIsSubmitting(true);
    setSubmitError(null);

    const customer: CustomerInfo = {
      fullName: fullName.trim(),
      phone: phone.trim(),
      address: address.trim(),
      note: note.trim()
    };

    try {
      const response = await submitOrderToBackend(customer, items, paymentMethod);
      if (response.success) {
        onOrderSuccess(response);
      } else {
        setSubmitError(response.error || 'Không thể lưu đơn hàng. Vui lòng kiểm tra lại kết nối.');
      }
    } catch (err: any) {
      console.error('Checkout error:', err);
      setSubmitError(err.message || 'Lỗi gửi đơn hàng. Vui lòng thử lại.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-[#0F1210] border border-[#252824] shadow-2xl overflow-hidden my-6">
        {/* Top Header */}
        <div className="p-5 sm:p-6 bg-[#0B0D0C] border-b border-[#252824] flex items-center justify-between">
          <div>
            <span className="text-[11px] font-mono tracking-widest text-[#C8FF2F] uppercase block mb-1">
              QUY TRÌNH THANH TOÁN CHÍNH THỨC
            </span>
            <h2 className="text-xl sm:text-2xl font-black font-display uppercase tracking-tight text-white">
              {step === 1 ? 'BƯỚC 1: THÔNG TIN GIAO HÀNG' : 'BƯỚC 2: XÁC NHẬN ĐƠN HÀNG'}
            </h2>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-[#7B807B] hover:text-white bg-[#141715] border border-[#252824] focus:outline-none"
            aria-label="Đóng"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Multi-step progress bar */}
        <div className="grid grid-cols-2 bg-[#141715] border-b border-[#252824] text-xs font-mono">
          <div
            className={`py-2.5 px-4 flex items-center gap-2 border-r border-[#252824] ${
              step === 1 ? 'bg-[#182315] text-[#C8FF2F] font-bold' : 'text-[#7B807B]'
            }`}
          >
            <span>01.</span>
            <span>Địa chỉ nhận hàng</span>
          </div>
          <div
            className={`py-2.5 px-4 flex items-center gap-2 ${
              step === 2 ? 'bg-[#182315] text-[#C8FF2F] font-bold' : 'text-[#7B807B]'
            }`}
          >
            <span>02.</span>
            <span>Kiểm tra & Ghi nhận</span>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 max-h-[75vh] overflow-y-auto">
          {submitError && (
            <div className="mb-6 p-3.5 bg-red-950/70 border border-red-500/60 text-red-200 text-xs font-mono flex items-start gap-2 animate-in shake">
              <AlertCircle className="w-4 h-4 shrink-0 text-red-400 mt-0.5" />
              <div>
                <p className="font-bold">KHÔNG THỂ HOÀN TẤT ĐƠN HÀNG</p>
                <p>{submitError}</p>
              </div>
            </div>
          )}

          {step === 1 ? (
            /* STEP 1: CUSTOMER FORM */
            <form onSubmit={handleNextToReview} className="space-y-4">
              <div>
                <label className="block text-xs font-mono uppercase text-[#A1A8A1] mb-1.5 font-bold">
                  Họ và tên khách hàng <span className="text-[#C8FF2F]">*</span>
                </label>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => {
                    setFullName(e.target.value);
                    if (errors.fullName) setErrors({ ...errors, fullName: '' });
                  }}
                  placeholder="Ví dụ: Nguyễn Văn An"
                  className={`w-full px-3.5 py-2.5 bg-[#141715] border text-xs font-mono text-white placeholder-[#7B807B] focus:outline-none transition-colors ${
                    errors.fullName ? 'border-red-500' : 'border-[#252824] focus:border-[#C8FF2F]'
                  }`}
                />
                {errors.fullName && (
                  <p className="mt-1 text-[11px] font-mono text-red-400">{errors.fullName}</p>
                )}
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-[#A1A8A1] mb-1.5 font-bold">
                  Số điện thoại nhận hàng <span className="text-[#C8FF2F]">*</span>
                </label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => {
                    setPhone(e.target.value);
                    if (errors.phone) setErrors({ ...errors, phone: '' });
                  }}
                  placeholder="Ví dụ: 0987654321 hoặc +84987654321"
                  className={`w-full px-3.5 py-2.5 bg-[#141715] border text-xs font-mono text-white placeholder-[#7B807B] focus:outline-none transition-colors ${
                    errors.phone ? 'border-red-500' : 'border-[#252824] focus:border-[#C8FF2F]'
                  }`}
                />
                {errors.phone && (
                  <p className="mt-1 text-[11px] font-mono text-red-400">{errors.phone}</p>
                )}
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-[#A1A8A1] mb-1.5 font-bold">
                  Địa chỉ nhận hàng chi tiết <span className="text-[#C8FF2F]">*</span>
                </label>
                <textarea
                  rows={2}
                  value={address}
                  onChange={(e) => {
                    setAddress(e.target.value);
                    if (errors.address) setErrors({ ...errors, address: '' });
                  }}
                  placeholder="Số nhà, tên đường, phường/xã, quận/huyện, tỉnh/thành phố"
                  className={`w-full px-3.5 py-2.5 bg-[#141715] border text-xs font-mono text-white placeholder-[#7B807B] focus:outline-none transition-colors resize-none ${
                    errors.address ? 'border-red-500' : 'border-[#252824] focus:border-[#C8FF2F]'
                  }`}
                />
                {errors.address && (
                  <p className="mt-1 text-[11px] font-mono text-red-400">{errors.address}</p>
                )}
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-[#A1A8A1] mb-1.5">
                  Ghi chú giao hàng (Tùy chọn)
                </label>
                <input
                  type="text"
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  placeholder="Giao giờ hành chính, gọi trước khi giao, v.v."
                  className="w-full px-3.5 py-2 bg-[#141715] border border-[#252824] focus:border-[#C8FF2F] text-xs font-mono text-white placeholder-[#7B807B] focus:outline-none"
                />
              </div>

              {/* Payment Method Selector */}
              <div className="pt-2">
                <span className="block text-xs font-mono uppercase text-[#A1A8A1] mb-2 font-bold">
                  Phương thức thanh toán:
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('cod')}
                    className={`p-3 text-left border flex items-center gap-3 transition-colors ${
                      paymentMethod === 'cod'
                        ? 'border-[#C8FF2F] bg-[#142210] text-white'
                        : 'border-[#252824] bg-[#141715] text-[#7B807B] hover:text-white'
                    }`}
                  >
                    <Truck className="w-5 h-5 text-[#C8FF2F] shrink-0" />
                    <div>
                      <div className="text-xs font-bold font-mono">COD — Nhận Hàng</div>
                      <div className="text-[10px] text-[#A1A8A1]">Thanh toán tiền mặt khi giao</div>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('bank_transfer')}
                    className={`p-3 text-left border flex items-center gap-3 transition-colors ${
                      paymentMethod === 'bank_transfer'
                        ? 'border-[#C8FF2F] bg-[#142210] text-white'
                        : 'border-[#252824] bg-[#141715] text-[#7B807B] hover:text-white'
                    }`}
                  >
                    <CreditCard className="w-5 h-5 text-[#C8FF2F] shrink-0" />
                    <div>
                      <div className="text-xs font-bold font-mono">Chuyển Khoản Ngân Hàng</div>
                      <div className="text-[10px] text-[#A1A8A1]">Quét mã QR / hướng dẫn</div>
                    </div>
                  </button>
                </div>
              </div>

              <div className="pt-4 flex justify-end">
                <button
                  type="submit"
                  className="px-6 py-3.5 bg-[#C8FF2F] hover:bg-white text-[#0B0D0C] font-display uppercase tracking-wider font-bold text-xs flex items-center gap-2 transition-all"
                >
                  <span>TIẾP TỤC KIỂM TRA ĐƠN HÀNG</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </form>
          ) : (
            /* STEP 2: ORDER REVIEW */
            <div className="space-y-6">
              {/* Customer summary */}
              <div className="p-4 bg-[#141715] border border-[#252824] space-y-2 text-xs font-mono">
                <div className="flex justify-between items-center text-[#7B807B] border-b border-[#252824] pb-2">
                  <span className="font-bold uppercase text-white">THÔNG TIN NGƯỜI NHẬN</span>
                  <button
                    onClick={() => setStep(1)}
                    className="text-[#C8FF2F] hover:underline"
                  >
                    Sửa
                  </button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[#A1A8A1]">
                  <div><span className="text-[#7B807B]">Họ tên:</span> {fullName}</div>
                  <div><span className="text-[#7B807B]">Điện thoại:</span> {phone}</div>
                  <div className="sm:col-span-2"><span className="text-[#7B807B]">Địa chỉ:</span> {address}</div>
                  {note && <div className="sm:col-span-2"><span className="text-[#7B807B]">Ghi chú:</span> {note}</div>}
                  <div className="sm:col-span-2">
                    <span className="text-[#7B807B]">Phương thức:</span>{' '}
                    <span className="text-[#C8FF2F] font-bold">
                      {paymentMethod === 'cod' ? 'Thanh toán khi nhận hàng (COD)' : 'Chuyển khoản ngân hàng'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Items summary */}
              <div className="border border-[#252824] divide-y divide-[#1C201D]">
                <div className="p-3 bg-[#111412] text-xs font-mono uppercase text-[#7B807B] flex justify-between">
                  <span>Sản phẩm ({items.length} mẫu)</span>
                  <span>Thành tiền</span>
                </div>
                {items.map((item) => (
                  <div key={`${item.productId}-${item.selectedSize}`} className="p-3 flex justify-between items-center text-xs font-mono">
                    <div>
                      <div className="font-bold text-white uppercase">{item.product.name}</div>
                      <div className="text-[11px] text-[#7B807B]">
                        Size: <span className="text-[#C8FF2F] font-bold">EU {item.selectedSize}</span> · SL: {item.quantity} · Đơn giá: {formatVND(item.product.price)}
                      </div>
                    </div>
                    <div className="text-right font-bold text-white tabular-nums">
                      {formatVND(item.product.price * item.quantity)}
                    </div>
                  </div>
                ))}
              </div>

              {/* Financial Total */}
              <div className="p-4 bg-[#0B0D0C] border border-[#252824] space-y-1.5 text-xs font-mono">
                <div className="flex justify-between text-[#7B807B]">
                  <span>Tổng tiền hàng:</span>
                  <span className="text-white tabular-nums">{formatVND(totalAmount)}</span>
                </div>
                <div className="flex justify-between text-[#7B807B]">
                  <span>Vận chuyển hỏa tốc toàn quốc:</span>
                  <span className="text-[#C8FF2F] font-bold">MIỄN PHÍ</span>
                </div>
                <div className="flex justify-between text-base font-bold text-white pt-2 border-t border-[#1C201D]">
                  <span className="font-display uppercase">TỔNG CỘNG:</span>
                  <span className="text-[#C8FF2F] font-mono text-lg tabular-nums">
                    {formatVND(totalAmount)}
                  </span>
                </div>
              </div>

              {/* Action buttons */}
              <div className="pt-2 flex items-center justify-between gap-4">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  disabled={isSubmitting}
                  className="px-4 py-3 bg-[#141715] hover:bg-[#1E2320] border border-[#252824] text-[#A1A8A1] hover:text-white text-xs font-mono flex items-center gap-1.5"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Quay lại</span>
                </button>

                <button
                  type="button"
                  onClick={handleConfirmOrder}
                  disabled={isSubmitting}
                  className="flex-1 py-4 bg-[#C8FF2F] hover:bg-white text-[#0B0D0C] font-display font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all disabled:opacity-50 shadow-lg"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>ĐANG LƯU VÀO GOOGLE SHEETS...</span>
                    </>
                  ) : (
                    <>
                      <CheckCircle2 className="w-4 h-4" />
                      <span>XÁC NHẬN ĐẶT HÀNG</span>
                    </>
                  )}
                </button>
              </div>

              <div className="flex items-center justify-center gap-2 text-[11px] font-mono text-[#7B807B]">
                <ShieldCheck className="w-3.5 h-3.5 text-[#C8FF2F]" />
                <span>Bảo vệ chống gửi trùng lặp & kiểm tra giá phía máy chủ</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
