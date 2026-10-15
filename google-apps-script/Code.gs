/**
 * =========================================================================
 * ANNASHOP® — GOOGLE APPS SCRIPT ORDER RELAY & SPREADSHEET SYNC
 * Mã nguồn Google Apps Script phục vụ đề tài môn học TMĐT & Ứng dụng Web
 * =========================================================================
 * 
 * HƯỚNG DẪN CÀI ĐẶT NHANH TRONG 3 BƯỚC:
 * 1. Mở một Google Spreadsheet mới tại: https://sheets.new
 * 2. Đổi tên Sheet1 thành "DonHang" (hoặc giữ nguyên Sheet1).
 * 3. Vào menu: Tiện ích mở rộng (Extensions) -> Apps Script.
 * 4. Xóa hết code cũ, dán toàn bộ nội dung file này vào và nhấn Lưu (Ctrl+S).
 * 5. Nhấn "Triển khai" (Deploy) -> "Tùy chọn triển khai mới" (New deployment).
 *    - Loại: "Ứng dụng web" (Web app).
 *    - Mô tả: "ANNASHOP Orders API v1".
 *    - Thực thi dưới tên: "Tôi" (Me).
 *    - Ai có quyền truy cập: "Bất kỳ ai" (Anyone).
 * 6. Sao chép "URL ứng dụng web" (Web App URL) và dán vào modal cấu hình
 *    Google Sheets trên website ANNASHOP!
 */

const SHEET_NAME = 'DonHang';

// Tiêu đề các cột dữ liệu theo đúng yêu cầu đề bài
const HEADERS = [
  'Order ID',
  'Thời Gian Đặt Hàng',
  'Họ Tên Khách Hàng',
  'Số Điện Thoại',
  'Địa Chỉ Giao Hàng',
  'Chi Tiết Sản Phẩm & Size',
  'Size Giày',
  'Số Lượng',
  'Đơn Giá (VND)',
  'Tổng Tiền Đơn Hàng',
  'Phương Thức Thanh Toán',
  'Trạng Thái Đơn Hàng',
  'Ghi Chú Đơn Hàng'
];

/**
 * Xử lý yêu cầu GET để kiểm tra trạng thái hoạt động của Web App
 */
function doGet(e) {
  return ContentService.createTextOutput(JSON.stringify({
    status: 'online',
    system: 'ANNASHOP Orders Integration API',
    timestamp: new Date().toISOString(),
    message: 'Google Apps Script Web App đang hoạt động bình thường.'
  })).setMimeType(ContentService.MimeType.JSON);
}

/**
 * Xử lý yêu cầu POST lưu đơn hàng từ ANNASHOP vào Google Sheets
 */
function doPost(e) {
  const lock = LockService.getScriptLock();
  // Khóa tối đa 10 giây để tránh xung đột ghi dữ liệu đồng thời
  const success = lock.tryLock(10000);
  
  if (!success) {
    return ContentService.createTextOutput(JSON.stringify({
      success: false,
      error: 'Hệ thống đang bận ghi dữ liệu, vui lòng thử lại sau vài giây.'
    })).setMimeType(ContentService.MimeType.JSON);
  }

  try {
    const rawData = e.postData.contents;
    const data = JSON.parse(rawData);

    // Mở bảng tính đang gắn với script này
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    let sheet = ss.getSheetByName(SHEET_NAME);

    // Nếu sheet chưa tồn tại thì tạo mới và thêm hàng tiêu đề
    if (!sheet) {
      sheet = ss.insertSheet(SHEET_NAME);
      sheet.appendRow(HEADERS);
      
      // Định dạng dòng tiêu đề: Nền đen, chữ trắng, in đậm, căn giữa
      const headerRange = sheet.getRange(1, 1, 1, HEADERS.length);
      headerRange.setBackground('#0B0D0C');
      headerRange.setFontColor('#C8FF2F');
      headerRange.setFontWeight('bold');
      headerRange.setHorizontalAlignment('center');
      headerRange.setFontFamily('Arial');
      sheet.setFrozenRows(1);
    }

    // Kiểm tra hàng đầu tiên có phải là header chưa
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(HEADERS);
    }

    // Phòng chống lỗi chèn công thức Google Sheets (Formula Injection)
    function sanitize(cellValue) {
      if (!cellValue) return '';
      const str = String(cellValue).trim();
      if (['=', '+', '-', '@'].indexOf(str.charAt(0)) !== -1) {
        return "'" + str;
      }
      return str;
    }

    // Chuẩn bị dữ liệu theo các cột yêu cầu
    const row = [
      sanitize(data.orderId || ('ANNA-' + Date.now())),
      data.timestamp || new Date().toLocaleString('vi-VN', { timeZone: 'Asia/Ho_Chi_Minh' }),
      sanitize(data.customerName || ''),
      "'" + String(data.phoneNumber || '').replace(/[\s.-]/g, ''), // Giữ nguyên số 0 ở đầu số điện thoại
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

    // Định dạng tự động căn chỉnh độ rộng cột sau khi thêm
    for (let c = 1; c <= HEADERS.length; c++) {
      sheet.autoResizeColumn(c);
    }

    return ContentService.createTextOutput(JSON.stringify({
      success: true,
      message: 'Đơn hàng đã được lưu thành công vào Google Sheets!',
      orderId: data.orderId,
      timestamp: new Date().toISOString()
    })).setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({
      success: false,
      error: 'Lỗi ghi nhận đơn hàng: ' + err.toString()
    })).setMimeType(ContentService.MimeType.JSON);

  } finally {
    lock.releaseLock();
  }
}
