import React, { useState, useEffect } from 'react';
import { X, Copy, Check, ExternalLink, Database, AlertTriangle, Play, CheckCircle2 } from 'lucide-react';
import { getSavedGoogleScriptUrl, saveGoogleScriptUrl } from '../lib/sheetsIntegration.ts';

interface GoogleSheetsSetupModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const GoogleSheetsSetupModal: React.FC<GoogleSheetsSetupModalProps> = ({
  isOpen,
  onClose
}) => {
  if (!isOpen) return null;

  const [scriptUrl, setScriptUrl] = useState('');
  const [copied, setCopied] = useState(false);
  const [testStatus, setTestStatus] = useState<'idle' | 'testing' | 'success' | 'error'>('idle');
  const [testMessage, setTestMessage] = useState<string>('');
  const [saveSuccess, setSaveSuccess] = useState(false);

  useEffect(() => {
    setScriptUrl(getSavedGoogleScriptUrl());
  }, []);

  const handleSaveUrl = (e: React.FormEvent) => {
    e.preventDefault();
    saveGoogleScriptUrl(scriptUrl);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2000);
  };

  const sampleAppsScriptCode = `/**
 * ANNASHOP® — GOOGLE APPS SCRIPT WEB APP
 * Copy toàn bộ mã này dán vào: script.google.com
 */
const SHEET_NAME = 'DonHang';

const HEADERS = [
  'Order ID', 'Thời Gian Đặt Hàng', 'Họ Tên Khách Hàng', 'Số Điện Thoại',
  'Địa Chỉ Giao Hàng', 'Chi Tiết Sản Phẩm & Size', 'Size Giày', 'Số Lượng',
  'Đơn Giá (VND)', 'Tổng Tiền Đơn Hàng', 'Phương Thức Thanh Toán',
  'Trạng Thái Đơn Hàng', 'Ghi Chú Đơn Hàng'
];

function doGet(e) {
  return ContentService.createTextOutput(JSON.stringify({
    status: 'online',
    system: 'ANNASHOP Orders API v1',
    message: 'Google Apps Script Web App đang hoạt động tốt.'
  })).setMimeType(ContentService.MimeType.JSON);
}

function doPost(e) {
  const lock = LockService.getScriptLock();
  const success = lock.tryLock(10000);
  if (!success) {
    return ContentService.createTextOutput(JSON.stringify({ success: false, error: 'Locked' })).setMimeType(ContentService.MimeType.JSON);
  }

  try {
    const data = JSON.parse(e.postData.contents);
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    let sheet = ss.getSheetByName(SHEET_NAME);
    if (!sheet) {
      sheet = ss.insertSheet(SHEET_NAME);
      sheet.appendRow(HEADERS);
      sheet.getRange(1, 1, 1, HEADERS.length).setBackground('#0B0D0C').setFontColor('#C8FF2F').setFontWeight('bold');
      sheet.setFrozenRows(1);
    }

    function sanitize(v) {
      if (!v) return '';
      const s = String(v).trim();
      return (['=', '+', '-', '@'].indexOf(s[0]) !== -1) ? "'" + s : s;
    }

    const row = [
      sanitize(data.orderId || ('ANNA-' + Date.now())),
      data.timestamp || new Date().toLocaleString('vi-VN', { timeZone: 'Asia/Ho_Chi_Minh' }),
      sanitize(data.customerName || ''),
      "'" + String(data.phoneNumber || ''),
      sanitize(data.deliveryAddress || ''),
      sanitize(data.productDetails || ''),
      sanitize(data.shoeSizes || ''),
      sanitize(data.quantities || ''),
      sanitize(data.unitPrices || ''),
      sanitize(data.orderTotal || ''),
      sanitize(data.paymentMethod || 'COD'),
      sanitize(data.orderStatus || 'Đã xác nhận'),
      sanitize(data.customerNote || '')
    ];

    sheet.appendRow(row);

    return ContentService.createTextOutput(JSON.stringify({
      success: true,
      message: 'Đã lưu đơn hàng vào Google Sheets thành công!'
    })).setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({
      success: false,
      error: err.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  } finally {
    lock.releaseLock();
  }
}`;

  const handleCopyCode = () => {
    navigator.clipboard.writeText(sampleAppsScriptCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleTestConnection = async () => {
    const target = scriptUrl.trim();
    if (!target) {
      setTestStatus('error');
      setTestMessage('Vui lòng nhập Google Apps Script URL trước khi kiểm tra.');
      return;
    }

    if (!target.startsWith('https://script.google.com/')) {
      setTestStatus('error');
      setTestMessage('URL phải bắt đầu bằng https://script.google.com/...');
      return;
    }

    setTestStatus('testing');
    setTestMessage('Đang gửi gói tin kiểm tra tới Google Apps Script...');

    try {
      // Send a test ping
      const res = await fetch(target, {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify({
          action: 'ping_test',
          orderId: 'TEST-PING',
          customerName: 'Hệ thống Kiểm Tra ANNASHOP',
          phoneNumber: '0987654321',
          deliveryAddress: 'Phòng Thí Nghiệm TMĐT',
          productDetails: 'Gói tin kiểm tra kết nối',
          shoeSizes: '42',
          quantities: '1',
          unitPrices: '0 đ',
          orderTotal: '0 đ',
          paymentMethod: 'TEST',
          orderStatus: 'Kiểm tra kết nối thành công'
        })
      });

      if (res.ok) {
        setTestStatus('success');
        setTestMessage('Kết nối thành công! Đã ghi nhận một dòng kiểm thử vào Google Spreadsheet.');
      } else {
        setTestStatus('error');
        setTestMessage(`Máy chủ Google phản hồi HTTP ${res.status}. Vui lòng kiểm tra quyền "Bất kỳ ai (Anyone)" khi triển khai.`);
      }
    } catch (err: any) {
      setTestStatus('error');
      setTestMessage(`Lỗi kết nối: ${err.message || 'CORS hoặc URL không đúng'}. Hãy chắc chắn đã chọn "Anyone" khi triển khai Web App.`);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div className="relative w-full max-w-3xl bg-[#0F1210] border border-[#252824] shadow-2xl overflow-hidden my-6 text-xs font-mono">
        {/* Header */}
        <div className="p-5 sm:p-6 bg-[#0B0D0C] border-b border-[#252824] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <Database className="w-5 h-5 text-[#C8FF2F]" />
            <div>
              <span className="text-[10px] tracking-widest text-[#7B807B] uppercase block">
                TÍCH HỢP HỆ THỐNG & ĐỀ TÀI MÔN HỌC
              </span>
              <h2 className="text-base sm:text-lg font-bold font-display uppercase tracking-tight text-white">
                CẤU HÌNH GOOGLE APPS SCRIPT & GOOGLE SHEETS
              </h2>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-[#7B807B] hover:text-white bg-[#141715] border border-[#252824]"
            aria-label="Đóng"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6 sm:p-8 space-y-6 max-h-[75vh] overflow-y-auto">
          {/* Current Connection Status Alert */}
          <div
            className={`p-4 border flex items-start gap-3 ${
              scriptUrl
                ? 'bg-[#142210] border-[#C8FF2F]/40 text-[#C8FF2F]'
                : 'bg-[#1E1912] border-amber-500/40 text-amber-200'
            }`}
          >
            {scriptUrl ? (
              <CheckCircle2 className="w-5 h-5 shrink-0 mt-0.5" />
            ) : (
              <AlertTriangle className="w-5 h-5 shrink-0 mt-0.5" />
            )}
            <div>
              <div className="font-bold uppercase">
                {scriptUrl ? 'ĐÃ CẤU HÌNH GOOGLE APPS SCRIPT URL' : 'CHẾ ĐỘ THIẾT LẬP (SETUP MODE)'}
              </div>
              <p className="mt-1 text-[11px] text-[#A1A8A1]">
                {scriptUrl
                  ? 'Đơn hàng mới trên website sẽ được gửi tự động và ghi nhận vào Google Sheet của bạn.'
                  : 'Hệ thống hiện đang lưu đơn hàng an toàn trong bộ nhớ máy chủ. Hãy dán URL Google Apps Script của bạn bên dưới để đồng bộ sang Google Sheets.'}
              </p>
            </div>
          </div>

          {/* URL Input Form */}
          <form onSubmit={handleSaveUrl} className="space-y-3">
            <label className="block uppercase text-white font-bold">
              1. URL GOOGLE APPS SCRIPT WEB APP CỦA BẠN:
            </label>
            <div className="flex gap-2">
              <input
                type="url"
                value={scriptUrl}
                onChange={(e) => setScriptUrl(e.target.value)}
                placeholder="https://script.google.com/macros/s/AKfycb.../exec"
                className="flex-1 px-3.5 py-2.5 bg-[#141715] border border-[#252824] focus:border-[#C8FF2F] text-white text-xs font-mono focus:outline-none"
              />
              <button
                type="submit"
                className="px-4 py-2.5 bg-[#C8FF2F] text-[#0B0D0C] font-bold uppercase hover:bg-white transition-colors whitespace-nowrap"
              >
                {saveSuccess ? 'ĐÃ LƯU!' : 'LƯU URL'}
              </button>
            </div>

            {/* Test Connection Button */}
            <div className="flex items-center gap-3 pt-1">
              <button
                type="button"
                onClick={handleTestConnection}
                disabled={testStatus === 'testing'}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#1C201D] hover:bg-[#252924] border border-[#2E332D] text-[#F5F5F0] hover:text-[#C8FF2F] transition-colors"
              >
                <Play className="w-3.5 h-3.5" />
                <span>{testStatus === 'testing' ? 'Đang gửi test...' : 'Gửi Đơn Thử Nghiệm Vào Sheet'}</span>
              </button>

              <a
                href="https://sheets.new"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1 text-[#7B807B] hover:text-white underline underline-offset-2"
              >
                <span>Tạo Google Sheet mới</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>

            {/* Test Result Feedback */}
            {testStatus !== 'idle' && (
              <div
                className={`p-3 border mt-2 ${
                  testStatus === 'success'
                    ? 'bg-emerald-950/60 border-emerald-500/50 text-emerald-300'
                    : testStatus === 'error'
                    ? 'bg-red-950/60 border-red-500/50 text-red-300'
                    : 'bg-[#141715] border-[#252824] text-[#A1A8A1]'
                }`}
              >
                {testMessage}
              </div>
            )}
          </form>

          {/* 3 Step Instructions */}
          <div className="space-y-3 pt-3 border-t border-[#1C201D]">
            <h3 className="uppercase text-white font-bold">
              2. HƯỚNG DẪN CÀI ĐẶT NHANH (CHO SINH VIÊN & GIẢNG VIÊN):
            </h3>
            <ol className="list-decimal list-inside space-y-2 text-[#A1A8A1] leading-relaxed">
              <li>
                Tạo một bảng tính mới tại <strong className="text-white">sheets.new</strong>.
              </li>
              <li>
                Vào menu <strong className="text-white">Tiện ích mở rộng (Extensions)</strong> →{' '}
                <strong className="text-white">Apps Script</strong>.
              </li>
              <li>
                Sao chép toàn bộ mã nguồn bên dưới, dán vào và nhấn Lưu (<kbd className="px-1 bg-[#1E2320]">Ctrl+S</kbd>).
              </li>
              <li>
                Nhấn <strong className="text-[#C8FF2F]">Triển khai (Deploy)</strong> →{' '}
                <strong className="text-white">Tùy chọn triển khai mới (New deployment)</strong>.
                Chọn loại <strong className="text-white">Ứng dụng web (Web app)</strong>, chọn quyền{' '}
                <strong className="text-[#C8FF2F]">Ai có quyền truy cập: "Bất kỳ ai" (Anyone)</strong>.
              </li>
              <li>Sao chép URL kết thúc bằng <code className="text-[#C8FF2F]">/exec</code> và dán vào ô bên trên.</li>
            </ol>
          </div>

          {/* Code Viewer & Copy button */}
          <div className="pt-2">
            <div className="flex items-center justify-between bg-[#111412] px-3.5 py-2 border border-[#252824] border-b-0">
              <span className="text-[#7B807B] font-bold">Code.gs (Google Apps Script)</span>
              <button
                onClick={handleCopyCode}
                className="flex items-center gap-1.5 text-[#C8FF2F] hover:text-white transition-colors"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Đã sao chép mã!' : 'Sao chép toàn bộ Code.gs'}</span>
              </button>
            </div>
            <pre className="p-3.5 bg-[#090B0A] border border-[#252824] text-[#A1A8A1] max-h-48 overflow-y-auto text-[11px] font-mono select-all">
              {sampleAppsScriptCode}
            </pre>
          </div>

          {/* 12 Required Columns Checklist */}
          <div className="pt-2">
            <h4 className="text-[#7B807B] uppercase font-bold mb-2">
              DANH SÁCH 13 CỘT ĐƯỢC TỰ ĐỘNG KHỞI TẠO TRÊN GOOGLE SHEETS:
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5 text-[11px] text-[#A1A8A1]">
              <div className="p-1.5 bg-[#141715] border border-[#252824]">1. Order ID</div>
              <div className="p-1.5 bg-[#141715] border border-[#252824]">2. Thời Gian Đặt Hàng</div>
              <div className="p-1.5 bg-[#141715] border border-[#252824]">3. Họ Tên Khách Hàng</div>
              <div className="p-1.5 bg-[#141715] border border-[#252824]">4. Số Điện Thoại</div>
              <div className="p-1.5 bg-[#141715] border border-[#252824]">5. Địa Chỉ Giao Hàng</div>
              <div className="p-1.5 bg-[#141715] border border-[#252824]">6. Chi Tiết Sản Phẩm & Size</div>
              <div className="p-1.5 bg-[#141715] border border-[#252824]">7. Size Giày</div>
              <div className="p-1.5 bg-[#141715] border border-[#252824]">8. Số Lượng</div>
              <div className="p-1.5 bg-[#141715] border border-[#252824]">9. Đơn Giá (VND)</div>
              <div className="p-1.5 bg-[#141715] border border-[#252824]">10. Tổng Tiền Đơn Hàng</div>
              <div className="p-1.5 bg-[#141715] border border-[#252824]">11. Phương Thức Thanh Toán</div>
              <div className="p-1.5 bg-[#141715] border border-[#252824]">12. Trạng Thái Đơn Hàng</div>
              <div className="p-1.5 bg-[#141715] border border-[#252824]">13. Ghi Chú Đơn Hàng</div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-[#0B0D0C] border-t border-[#252824] flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 bg-[#1E2320] hover:bg-[#C8FF2F] text-white hover:text-[#0B0D0C] font-bold uppercase transition-colors"
          >
            ĐÓNG CỬA SỔ
          </button>
        </div>
      </div>
    </div>
  );
};
