# ANNASHOP® — THE FUTURE OF MOTION
## NỀN TẢNG THƯƠNG MẠI ĐIỆN TỬ GIÀY THỂ THAO CAO CẤP TÍCH HỢP GOOGLE SHEETS

ANNASHOP® là hệ thống website thương mại điện tử chuyên biệt cho 3 môn thể thao: **Cầu Lông (Badminton)**, **Tennis** và **Chạy Bộ (Running)**. Website được thiết kế theo tiêu chuẩn kỹ thuật số quốc tế (Awwwards-inspired) với trải nghiệm mua sắm mượt mà, xác thực dữ liệu chặt chẽ và lưu trữ đơn hàng thời gian thực vào Google Sheets.

---

### TÍNH NĂNG NỔI BẬT

1. **Brand Identity & Cinematic Motion:**
   - Hoạt cảnh mở đầu Brand Intro (~1 giây) với thanh tiến trình tinh tế.
   - Hero Masterpiece: Tiêu đề typography khổng lồ `BUILT TO MOVE BEYOND`, mô hình giày 2.5D nhiều lớp kết hợp hiệu ứng thị sai chuột (mouse parallax) và ánh sáng định hướng.
   - Bản tuyên ngôn cơ học: `EVERY STEP. EVERY COURT. EVERY LIMIT.`
   - "CHOOSE YOUR ARENA": Khám phá 3 thế giới Cầu Lông, Tennis, Chạy Bộ với bảng thông số riêng biệt.

2. **Hệ Thống Sản Phẩm & Tìm Kiếm Đa Chiều:**
   - 12 mẫu giày thể thao chính thức có thông số cơ sinh học đầy đủ (đệm bọt Nitơ, đĩa sợi carbon, cao su bám sân).
   - Bộ lọc theo môn thể thao, tìm kiếm tức thì theo tên/từ khóa, lọc khoảng giá và lọc kích thước (Size EU 38 - 45).
   - Sắp xếp linh hoạt: Nổi bật, Giá tăng/giảm dần, Tên A-Z.

3. **Product Detail Page (PDP):**
   - Bộ sưu tập góc nhìn đa chiều (Mặt ngoài, Mặt đế, Góc trên).
   - Bắt buộc kiểm tra chọn size trước khi thêm vào giỏ hàng hoặc bấm "Mua Ngay".
   - Bảng quy đổi kích thước chân (CM ↔ EU).
   - Bảng thông số cơ học chi tiết (Đệm, Upper, Outsole, Trọng lượng, Drop, Mặt sân).

4. **Giỏ Hàng & Thanh Toán Chuẩn TMĐT:**
   - Ngăn kéo Cart Drawer hiển thị chi tiết số lượng, size giày, tạm tính và tổng tiền.
   - Tự động gộp sản phẩm cùng mã và cùng size; tách biệt các size khác nhau.
   - Lưu trữ bền bỉ trong `localStorage` (không mất khi tải lại trang).
   - Quy trình đặt hàng 2 bước:
     - **Bước 1:** Nhập Họ tên, Số điện thoại (kiểm tra chuẩn 10 số Việt Nam), Địa chỉ giao hàng.
     - **Bước 2:** Xem lại toàn bộ đơn hàng và chọn phương thức thanh toán (COD hoặc Chuyển khoản).
   - Chống gửi trùng lặp đơn hàng (Idempotency Key & Loading Guard).

5. **Tích Hợp Tự Động Hóa Google Sheets:**
   - Dữ liệu đơn hàng được thẩm định giá tại máy chủ (Server-side validation) để chống gian lận.
   - Xử lý loại bỏ mã độc công thức bảng tính (Formula Injection Sanitization).
   - Đồng bộ tự động sang Google Spreadsheet thông qua Google Apps Script Web App.
   - Công cụ kiểm tra kết nối trực tiếp trên giao diện website.
   - Hiệu ứng pháo hoa chúc mừng và biên nhận mã đơn `ANNA-XXXX`.

---

### HƯỚNG DẪN CẤU HÌNH GOOGLE APPS SCRIPT (3 PHÚT)

1. Mở một bảng tính Google Sheets mới tại: **[sheets.new](https://sheets.new)**
2. Đổi tên trang tính đầu tiên thành `DonHang` (hoặc để mặc định).
3. Vào menu: **Tiện ích mở rộng (Extensions)** → **Apps Script**.
4. Xóa hết mã có sẵn và dán toàn bộ nội dung từ file `/google-apps-script/Code.gs` vào.
5. Nhấn biểu tượng đĩa mềm hoặc phím `Ctrl + S` để lưu dự án.
6. Nhấn nút **Triển khai (Deploy)** ở góc trên bên phải → chọn **Tùy chọn triển khai mới (New deployment)**:
   - **Loại:** Chọn biểu tượng bánh răng ⚙️ → `Ứng dụng web (Web app)`
   - **Mô tả:** `ANNASHOP Orders API v1`
   - **Thực thi dưới tên:** `Tôi (Me)`
   - **Ai có quyền truy cập:** Chọn `Bất kỳ ai (Anyone)` *(Bắt buộc)*
7. Nhấn **Triển khai**, cấp quyền truy cập tài khoản Google và sao chép **URL ứng dụng web** (kết thúc bằng `/exec`).
8. Mở website ANNASHOP, bấm nút **Google Sheets API** trên thanh menu, dán URL vào và bấm **LƯU URL**.
9. Bấm nút **Gửi Đơn Thử Nghiệm Vào Sheet** để kiểm chứng kết quả!

---

### CHẠY DỰ ÁN DƯỚI MÔI TRƯỜNG PHÁT TRIỂN

```bash
# Cài đặt các thư viện phụ thuộc
npm install

# Khởi chạy máy chủ tích hợp Express + Vite
npm run dev

# Kiểm tra cú pháp TypeScript & Linting
npm run lint

# Đóng gói sản phẩm cho môi trường Production
npm run build
```

---

### CẤU TRÚC THƯ MỤC CHÍNH

```
├── google-apps-script/
│   └── Code.gs                 # Mã nguồn Google Apps Script Web App
├── src/
│   ├── components/             # Các thành phần giao diện người dùng
│   │   ├── BrandIntro.tsx      # Hoạt cảnh mở đầu thương hiệu (~1s)
│   │   ├── CartDrawer.tsx      # Ngăn kéo giỏ hàng trượt
│   │   ├── CheckoutModal.tsx   # Modal thanh toán 2 bước & validate SĐT
│   │   ├── EditorialStatement.tsx # Khối tuyên ngôn kinetic typography
│   │   ├── Footer.tsx          # Chân trang đa cột & thông tin liên hệ
│   │   ├── GoogleSheetsSetupModal.tsx # Giao diện kiểm tra & cấu hình Sheets API
│   │   ├── Hero.tsx            # Hero 2.5D với typography khổng lồ
│   │   ├── Navbar.tsx          # Thanh điều hướng chuẩn 3-zone contract
│   │   ├── OrderSuccessModal.tsx # Màn hình chúc mừng đặt hàng & pháo hoa
│   │   ├── ProductCard.tsx     # Thẻ sản phẩm tối ưu hình ảnh & chọn size nhanh
│   │   ├── ProductDetailModal.tsx # Trang chi tiết sản phẩm & thông số cơ học
│   │   ├── ProductGrid.tsx     # Bộ lọc đa chiều & danh mục sản phẩm
│   │   ├── ShoeVisual.tsx      # Động cơ vector kết xuất giày thể thao chuyên nghiệp
│   │   ├── ShowcaseA_Spotlight.tsx # Khối điểm nhấn công nghệ bọt Nitơ & Carbon
│   │   ├── ShowcaseB_Campaign.tsx  # Khối chiến dịch thể thao toàn cảnh
│   │   ├── ShowcaseC_Story.tsx     # Khối câu chuyện cơ sinh học 3 môn đấu
│   │   └── WhyAnnashop.tsx     # Giá trị cốt lõi & CTA kết thúc
│   ├── data/
│   │   └── products.ts         # Danh mục 12 sản phẩm chính thức & tiền tệ VND
│   ├── lib/
│   │   └── sheetsIntegration.ts # Thư viện tích hợp, validate và sanitize dữ liệu
│   ├── types/
│   │   └── index.ts            # Kiểu dữ liệu TypeScript định nghĩa toàn hệ thống
│   ├── App.tsx                 # Điều phối luồng ứng dụng và lưu giỏ hàng
│   ├── index.css               # Design tokens & cấu hình Tailwind CSS
│   └── main.tsx                # Điểm khởi tạo ứng dụng React
├── server.ts                   # Máy chủ Express: validate giá & relay Google Sheets
├── DOCUMENTATION.md            # Tài liệu đề tài môn học kèm sơ đồ Mermaid & test checklist
└── package.json
```
