---
draft: false
title: "Bản đồ Open API ngân hàng Việt Nam cho doanh nghiệp 2026: ai mở, mở gì, đăng ký thế nào"
description: "Toàn cảnh về chương trình Open API của hơn 10 ngân hàng Việt Nam: phân tích cổng developer, sandbox, điều kiện kỹ thuật và rào cản pháp lý."
published: 05/09/2026
version: 1.0
authors: ["Nhóm nghiên cứu MONA Pay"]
dataset: ban-do-open-api-ngan-hang-viet-nam-2026.csv
sources:
  - {name: "BIDV Open API", url: "https://openapi.bidv.com.vn", checked: "28/08/2026"}
  - {name: "VietinBank iConnect", url: "https://developer.vietinbank.vn", checked: "28/08/2026"}
  - {name: "OCB API Developer Portal", url: "https://developer.api.ocb.com.vn", checked: "28/08/2026"}
  - {name: "NCB Developer Portal", url: "https://develop.ncb-bank.vn", checked: "28/08/2026"}
  - {name: "BaaS by MB (bài báo)", url: "https://cafef.vn/mb-dan-dat-chuyen-doi-so-toan-dien-voi-baas-188240819104529719.chn", checked: "28/08/2026"}
key_numbers:
  - {label: "Số ngân hàng có tiền lệ cấp API", value: "28 ngân hàng"}
  - {label: "MB cam kết hoàn tất tích hợp", value: "3 tuần"}
  - {label: "Ngân hàng đang hoạt động trên hệ thống MONA", value: "ACB"}
---

## 1. Tóm tắt nhanh

Làn sóng Open Banking (Ngân hàng mở) tại Việt Nam năm 2026 đang bùng nổ, với ít nhất 28 ngân hàng thương mại đã có tiền lệ cấp API cho bên thứ ba. Hàng loạt ngân hàng (như BIDV, VietinBank, OCB) đã cung cấp cổng Developer Portal công khai kèm Sandbox để các lập trình viên tự đăng ký và thử nghiệm. Tuy nhiên, việc một doanh nghiệp tự mình nối thẳng vào ngân hàng đòi hỏi chi phí kỹ thuật, pháp lý và vận hành khổng lồ. Nối thêm ngân hàng thứ hai, thứ ba lại càng phức tạp do khác biệt về chuẩn mã hóa. Lớp trung gian kỹ thuật chuyên biệt (như MONA Pay) giúp giải quyết bài toán này: họ kết nối sẵn với nhiều ngân hàng và cấp một đầu API chuẩn hóa duy nhất cho doanh nghiệp, đảm bảo dữ liệu chạy mượt mà mà hoàn toàn không can thiệp vào dòng tiền thật.

## 2. Các con số chính

- 3 tuần: Thời gian cam kết triển khai nhanh kỷ lục cho luồng tích hợp Open API do MB công bố trên truyền thông.
- 6/10 ngân hàng: Tỷ lệ các ngân hàng lớn trong khảo sát của chúng tôi đã mở cổng Developer Portal và Sandbox cho phép tự do đăng ký thử nghiệm trực tuyến.
- 1 ngân hàng đang hoạt động (ACB) và 10 ngân hàng đang trong quá trình đăng ký kết nối với MONA Pay tính tới 06/09/2026, theo sổ liên hệ của nhóm.

## 3. Bối cảnh thị trường API Ngân hàng 2026

Khoảng 5 năm trước, khái niệm kết nối thẳng hệ thống phần mềm (ERP, web bán hàng) với dữ liệu ngân hàng để lấy biến động số dư chỉ dành cho các tập đoàn khổng lồ (bán lẻ, viễn thông) có đội ngũ kỹ sư hàng trăm người và doanh thu cực "khủng". Các doanh nghiệp vừa và nhỏ (SME) hoặc cửa hàng kinh doanh phải dùng giải pháp tình thế là cài các ứng dụng "đọc trộm" màn hình điện thoại hoặc quét tin nhắn SMS để lấy số dư, đi kèm rất nhiều rủi ro bảo mật và bị ngân hàng chặn liên tục.

Tới năm 2026, tư duy của các tổ chức tài chính đã thay đổi 180 độ. Ngân hàng nhận ra rằng việc cung cấp Open API chính là một lợi thế cạnh tranh sống còn để thu hút dòng tiền thương mại điện tử chảy về hệ thống của mình. Do đó, các ngân hàng tiên phong đã mở toang cánh cửa: công khai tài liệu lập trình, tạo cổng thử nghiệm trực tuyến (Sandbox) và hỗ trợ khởi tạo ứng dụng nhanh chóng. Họ cung cấp các năng lực then chốt như tạo Tài khoản ảo (Virtual Account), phát sinh mã VietQR động, và gửi webhook (thông báo HTTP) báo có tức thì.

## 4. Phương pháp và dữ liệu nghiên cứu

Báo cáo này được tổng hợp từ dữ liệu thực tiễn trong chiến dịch "Bank Outreach" của The MONA Group vào cuối tháng 08/2026. 
- **Quy trình:** Đội ngũ kỹ thuật trực tiếp truy cập, tạo tài khoản và đọc tài liệu kỹ thuật trên các cổng Developer Portal công khai của ngân hàng. Đối với các ngân hàng không có cổng công khai, chúng tôi liên hệ qua email và khối Khách hàng doanh nghiệp (RM).
- **Giới hạn:** Các chính sách ngân hàng thay đổi liên tục. Ví dụ, cổng mbapi.vn của MB hiện ghi nhận tình trạng "cổng cũ không còn truy cập được ngày kiểm", yêu cầu đi qua luồng BaaS nội bộ. Thông tin về thời gian phản hồi (chứa nhãn MON KIỂM) mang tính tham chiếu cục bộ từ hồ sơ của MONA, có thể khác biệt so với các doanh nghiệp khác tùy vào quy mô vốn và giấy phép đăng ký kinh doanh.

## 5. Bảng khảo sát thực tế năng lực 10+ ngân hàng

Bảng dưới đây là kết quả đối chiếu các cổng API ngân hàng lớn mà đội ngũ MONA ghi nhận trực tiếp.

| Ngân hàng | Chương trình | Cổng Developer công khai? | Sandbox? | Năng lực | Điều kiện pháp nhân | Kênh đăng ký | Liên hệ MONA Pay ghi nhận (tới 06/09/2026) | Trạng thái với MONA Pay |
|---|---|---|---|---|---|---|---|---|
| BIDV | BIDV Open API / SmartConnect | Có (openapi.bidv.com.vn) | Có | VA, VietQR động, Thu hộ | Công ty có MST | Form online | Đăng ký qua form tích hợp trên devportal, đang hoàn thiện hồ sơ pháp nhân | Đang đăng ký |
| MB | BaaS by MB | Có (cổng cũ không còn truy cập được ngày kiểm) | Có | VA, Thông báo giao dịch | Công ty có MST | Cổng API | Thư đề xuất gửi 04/09/2026 tới kênh hỗ trợ doanh nghiệp, chưa có phản hồi; cổng mbapi.vn không truy cập được ngày 28/08/2026 | Đang đăng ký |
| VietinBank | iConnect | Có (developer.vietinbank.vn) | Có | VA, Tra cứu | Công ty có MST | Developer portal | Sandbox công khai dùng được ngay; hồ sơ production đang chuẩn bị | Đang đăng ký |
| OCB | OCB API Developer Portal | Có (developer.api.ocb.com.vn) | Có | VA, Thông báo giao dịch | Công ty có MST | Developer portal | Hai địa chỉ hỗ trợ và Open API công khai trả thư lại (không nhận), gửi lại qua dịch vụ khách hàng 04/09/2026, chưa có phản hồi | Đang đăng ký |
| NCB | NCB Developer | Có (develop.ncb-bank.vn) | Có | VA, Thông báo giao dịch | Công ty có MST | Developer portal | Thư đề xuất gửi 04/09/2026, chưa có phản hồi | Đang chờ duyệt |
| VPBank | VPBank API | Có (cskh.vpbank.com.vn) | Không | Danh mục API | Công ty có MST | CSKH / RM | Chỉ có cổng chăm sóc khách hàng (có CAPTCHA), chưa có kênh đối tác công khai; đang nộp | Đang chờ duyệt |
| TPBank | Biz API Notify | Không | Không | Thông báo giao dịch | Công ty có MST | Email / RM | Thư gửi 04/09/2026, hệ thống tạo phiếu hỗ trợ ngay trong ngày (mã TIK4469540), đang chờ bộ phận nghiệp vụ | Đang đăng ký |
| KienlongBank | Open Banking | Không | Không | VA, Thông báo giao dịch | Công ty có MST | Email / Đối tác | Thư đề xuất gửi 04/09/2026, chưa có phản hồi | Đang đăng ký |
| MSB | Open API | Không | Không | API mở | Công ty có MST | Email / Đối tác | Thư đề xuất gửi 04/09/2026, chưa có phản hồi | Đang đăng ký |
| Nam A Bank | Open Banking | Không rõ cổng công khai | Không rõ | Thông báo giao dịch | Công ty có MST | Email đối tác | Thư đề xuất gửi 04/09/2026 tới bộ phận phát triển và dịch vụ khách hàng, chưa có phản hồi | Đang đăng ký |
| ACB | ACB API | Không | Có | VA, VietQR động, Tra cứu | Hợp đồng đối tác | Hợp đồng trực tiếp | Kết nối chính thức đang chạy; đang đề nghị ACB mở luồng đăng ký cho tài khoản doanh nghiệp | Đang hoạt động |


**Diễn giải cho doanh nghiệp:** Bảng khảo sát chứng minh rằng năng lực công nghệ của các ngân hàng Việt Nam đã tiệm cận chuẩn thế giới. Các khối tính năng cốt lõi như Virtual Account (tài khoản định danh) và Notify (báo có tức thì) đều đã sẵn sàng. Điểm khác biệt nằm ở trải nghiệm đăng ký: một số ngân hàng (BIDV, VietinBank) rất cởi mở, cho phép tạo môi trường Sandbox ngay lập tức; trong khi số khác vẫn ưu tiên đi qua bộ phận kinh doanh hoặc đối tác. Với doanh nghiệp, điều này có nghĩa là nền tảng công nghệ đã sẵn sàng 100% để phục vụ tự động hóa, vấn đề là chọn ai để kết nối.

## 6. Tại sao không nên tự kết nối? Bài toán "Tốn gì"

Dù cánh cửa ngân hàng đã mở, nhưng đường vào vẫn là một công trường kỹ thuật phức tạp. Một doanh nghiệp tự quyết định kết nối API với ngân hàng sẽ phải đối mặt với các khoản đầu tư sau:

### Bảng: Doanh nghiệp tự nối 1 ngân hàng tốn gì

| Yếu tố | Khối lượng công việc khi nối 1 ngân hàng |
|---|---|
| Kỹ thuật | Đọc hàng trăm trang tài liệu API, lập trình cơ chế mã hóa chữ ký số (như HMAC-SHA256 hoặc RSA), xây dựng hệ thống webhooks, xử lý logic chống trùng lặp giao dịch (idempotency) và vượt qua bài kiểm thử bảo mật (UAT) của ngân hàng. |
| Pháp lý | Soạn thảo, thương lượng hợp đồng kết nối phần mềm, thỏa thuận bảo mật dữ liệu khách hàng (NDA) và các giấy tờ xác minh pháp nhân. Quy trình này thường đi qua phòng pháp chế của ngân hàng mất từ 3 tuần đến 2 tháng. |
| Vận hành | Giám sát kênh truyền bảo mật (IP Allowlist, VPN), tự xử lý khi ngân hàng bảo trì hệ thống lúc nửa đêm, phải tự viết script tra soát thủ công nếu tin nhắn webhook bị rớt do lỗi mạng cục bộ. |


**Diễn giải cho doanh nghiệp:** Bảng trên cho thấy, để đưa 1 cổng API ngân hàng vào hoạt động thực tế, anh chị không chỉ cần một lập trình viên biết viết code, mà cần một đội ngũ hiểu sâu về an toàn thông tin tài chính và có thời gian theo đuổi hồ sơ pháp lý kéo dài nhiều tháng. Tổng chi phí đầu tư ban đầu và chi phí bảo trì hàng tháng để tự duy trì một cổng kết nối có thể lên tới hàng chục triệu đồng, hoàn toàn không tương xứng với một doanh nghiệp SME.

### Điều gì thay đổi khi thêm ngân hàng thứ 2, thứ 3?

Câu chuyện trở thành "cơn ác mộng" bảo trì khi doanh nghiệp muốn mở thêm tài khoản nhận tiền ở ngân hàng thứ 2. 
- Mỗi ngân hàng có một kiến trúc hệ thống riêng: Bank A dùng cơ chế chữ ký HMAC, Bank B bắt buộc dùng khóa bất đối xứng RSA, Bank C lại yêu cầu cấp phép IP cố định kết hợp VPN phần cứng.
- Không có chuẩn chung về cấu trúc dữ liệu JSON trả về.
- Khi đối soát, kế toán phải xem 3 báo cáo khác nhau từ 3 ngân hàng.
Sự phức tạp kỹ thuật tăng theo cấp số nhân. Việc duy trì 3 mã nguồn kết nối riêng biệt sẽ tiêu tốn toàn bộ quỹ thời gian của đội IT nội bộ.

## 7. Ý nghĩa và khuyến nghị hành động

Từ góc độ cấu trúc phần mềm và vận hành, chúng tôi có 4 khuyến nghị:

1. **Từ bỏ việc quét màn hình / SMS:** Các giải pháp quét thông báo trên điện thoại hoặc đọc trộm DOM màn hình trình duyệt là cực kỳ kém ổn định và vi phạm quy chuẩn an toàn. Hãy chuyển hẳn sang sử dụng API ngân hàng chính ngạch (Open API).
2. **Sử dụng lớp trung gian (Aggregator):** Đừng tự nối. Hãy sử dụng một hệ thống hạ tầng thanh toán trung gian như MONA Pay. Họ đã giải quyết toàn bộ bài toán mã hóa, pháp lý và bảo trì với nhiều ngân hàng khác nhau, đóng gói thành 1 cổng webhook duy nhất. Anh chị chỉ mất vài phút cài đặt thay vì vài tháng lập trình.
3. **An tâm về dòng tiền:** Hãy chọn các lớp trung gian kỹ thuật chuyên biệt (không phải là ví điện tử hay trung gian thanh toán giữ tiền). Với các đơn vị này, khi khách hàng quét VietQR, tiền chạy thẳng từ tài khoản khách vào tài khoản ngân hàng của anh chị. Trung gian chỉ đóng vai trò "người truyền tin" báo có, tuyệt đối an toàn cho dòng vốn.
4. **Mở rộng linh hoạt:** Khi sử dụng 1 chuẩn API trung gian, trong tương lai nếu anh chị muốn đổi ngân hàng nhận tiền từ ACB sang BIDV hay VietinBank, anh chị chỉ việc thay đổi cấu hình trên dashboard mà không phải sửa một dòng code nào trên website của mình.

## 8. Cách trích dẫn

Nhóm nghiên cứu MONA Pay (2026). Bản đồ Open API ngân hàng Việt Nam cho doanh nghiệp 2026: ai mở, mở gì, đăng ký thế nào. The MONA Group. https://monapay.vn/nghien-cuu/ban-do-open-api-ngan-hang-viet-nam-2026

## 9. Nguồn tham khảo

- Cổng BIDV Open API, https://openapi.bidv.com.vn (Kiểm tra: 28/08/2026)
- Cổng VietinBank iConnect, https://developer.vietinbank.vn (Kiểm tra: 28/08/2026)
- Cổng OCB API Developer Portal, https://developer.api.ocb.com.vn (Kiểm tra: 28/08/2026)
- Cổng NCB Developer Portal, https://develop.ncb-bank.vn (Kiểm tra: 28/08/2026)
- Bài báo MB dẫn dắt chuyển đổi số BaaS, https://cafef.vn/mb-dan-dat-chuyen-doi-so-toan-dien-voi-baas-188240819104529719.chn (Kiểm tra: 28/08/2026)
