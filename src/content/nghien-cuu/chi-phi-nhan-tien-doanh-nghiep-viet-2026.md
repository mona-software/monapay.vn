---
draft: false
title: "Chi phí nhận tiền của doanh nghiệp Việt Nam 2026: thẻ, ví, cổng quốc tế và chuyển khoản tự báo có"
description: "Phân tích chi tiết doanh nghiệp theo quy mô chi bao nhiêu cho các trung gian thanh toán, phí PayPal, Stripe, thẻ, ví và giải pháp chuyển khoản tự động."
published: 05/09/2026
version: 1.0
authors: ["Nhóm nghiên cứu MONA Pay"]
dataset: chi-phi-nhan-tien-doanh-nghiep-viet-2026.csv
sources:
  - {name: "Biểu phí người bán PayPal Việt Nam", url: "https://www.paypal.com/vn/webapps/mpp/merchant-fees", checked: "28/08/2026"}
  - {name: "Danh sách quốc gia Stripe", url: "https://stripe.com/global", checked: "28/08/2026"}
  - {name: "Chính sách và biểu phí dịch vụ NAPAS", url: "https://napas.com.vn", checked: "05/09/2026"}
  - {name: "Thống kê thanh toán NHNN", url: "https://www.sbv.gov.vn", checked: "05/09/2026"}
  - {name: "Biểu phí dịch vụ chấp nhận thanh toán thẻ VietinBank (hiệu lực 22/04/2026)", url: "https://www.vietinbank.vn/ca-nhan/cong-cu-tien-ich/bieu-phi-va-bieu-mau/dich-vu-chap-nhan-thanh-toan-the-40-html", checked: "06/09/2026"}
  - {name: "Tạp chí Công Thương: Thanh toán điện tử tại Việt Nam giai đoạn 2022–2025", url: "https://tapchicongthuong.vn/thanh-toan-dien-tu-tai-viet-nam-giai-doan-2022-2025--trien-vong--thach-thuc-va-mot-so-giai-phap-phat-trien-89400.htm", checked: "06/09/2026"}
  - {name: "Giới thiệu MONA Pay: hệ thống chạy cho khách hàng MONA từ 2022", url: "https://monapay.vn/gioi-thieu", checked: "06/09/2026"}
key_numbers:
  - {label: "Phí PayPal (quốc tế)", value: "4,40% + 0,30 USD"}
  - {label: "Chi phí đối soát tay ẩn (SME)", value: "≈2,25 triệu đ/tháng (ước tính)"}
  - {label: "Phí qua MONA Pay VietQR", value: "0đ trên giao dịch"}
---

## 1. Tóm tắt nhanh

Doanh nghiệp Việt Nam ở mọi quy mô đang phải chia sẻ một phần đáng kể doanh thu cho các trung gian thanh toán (thẻ, ví, COD). Tỷ lệ chi phí này dao động từ 0,6% đến 1,3% tổng doanh thu tùy thuộc vào cơ cấu kênh. Các cổng thanh toán quốc tế như PayPal thu phí cực cao lên tới 4,40% cộng phí cố định, trong khi Stripe vẫn chưa chính thức mở cửa cho pháp nhân Việt Nam. Đối với phương thức thanh toán chuyển khoản nội địa, chi phí giao dịch là 0đ nhưng lại tạo ra gánh nặng chi phí vận hành ẩn do kế toán phải đối soát thủ công. Việc ứng dụng hệ thống báo có tự động xóa bỏ chi phí ẩn và giúp doanh nghiệp tiết kiệm hàng trăm triệu đồng mỗi năm khi dịch chuyển thói quen thanh toán của khách hàng sang mã VietQR.

## 2. Các con số chính

- 4,40% + 0,30 USD: Mức phí cơ bản mà PayPal áp dụng cho mỗi giao dịch thương mại từ ngoài lãnh thổ Việt Nam.
- 60.000đ: Chi phí cố định mỗi khi doanh nghiệp rút tiền từ ví PayPal về tài khoản ngân hàng nội địa.
- 1,0% đến 3,7%: dải phí chiết khấu thẻ theo biểu phí công khai của một ngân hàng lớn (VietinBank, hiệu lực 22/04/2026): thẻ nội địa tại POS 1,0% đến 2,0%, thẻ quốc tế phát hành nước ngoài 3,5%, thương mại điện tử 1,818% + 4.200 đ mỗi giao dịch với thẻ nội địa và 3,7% + 4.500 đ với thẻ quốc tế. Ví điện tử và cổng trong nước thu theo hợp đồng từng đơn vị, bài này dùng mức giả định 1,5% đến 2,0%.
- ≈9,5 triệu đ/tháng: tổng phí trung gian của một shop thương mại điện tử doanh thu 800 triệu/tháng theo cơ cấu kênh giả định trong bài (ước tính, xem mục 5).
- ≈2,25 triệu đ/tháng: chi phí ẩn cho nhân sự tra soát chuyển khoản bằng tay ở doanh nghiệp vừa (ước tính: 1.500 giao dịch × 3 phút × 30.000 đ/giờ).

## 3. Bối cảnh thị trường thanh toán 2026

Bức tranh thanh toán tại Việt Nam đang có sự phân hóa sâu sắc dựa trên đối tượng khách hàng. Đối với tệp khách hàng quốc tế, doanh nghiệp Việt Nam gần như không có lựa chọn nào khác ngoài việc tuân thủ luật chơi của các gã khổng lồ như PayPal hay Visa/Mastercard, chấp nhận mức phí chiết khấu rất cao. Trong khi đó, với thị trường nội địa, sự bùng nổ của hạ tầng NAPAS và chuẩn VietQR đã đưa chi phí chuyển khoản liên ngân hàng về mức 0đ cho người dùng. 

Tuy nhiên, sự tiện lợi của VietQR lại đẩy cái khó về phía người bán. Việc nhận hàng trăm, hàng ngàn giao dịch chuyển khoản mỗi ngày khiến bộ phận kế toán rơi vào tình trạng quá tải. Họ phải liên tục làm mới ứng dụng ngân hàng, đối chiếu số tiền, mã đơn hàng, và xác nhận thủ công cho nhân viên đóng gói. Nút thắt cổ chai này làm chậm tốc độ xử lý đơn hàng, giảm trải nghiệm khách hàng và tốn kém giờ công lao động. Đó là lý do lớp dịch vụ hạ tầng tự động xác nhận báo có như MONA Pay ra đời.

## 4. Phương pháp và dữ liệu nghiên cứu

Báo cáo này được thực hiện bằng phương pháp tổng hợp dữ liệu thứ cấp từ các nguồn công khai kết hợp với phân tích dữ liệu sơ cấp từ hệ thống của MONA Pay. 
- **Kỳ đo:** Số liệu nội bộ được trích xuất từ tháng 01/2022 đến tháng 08/2026. 
- **Cỡ mẫu:** Dữ liệu hành vi thanh toán và chi phí đối soát được lấy ẩn danh từ khách hàng doanh nghiệp của MONA đang sử dụng hệ thống của The MONA Group. Mọi thông tin định danh đều được mã hóa một chiều và loại bỏ các giao dịch nhiễu, giao dịch thử nghiệm (sandbox) trước khi phân tích.
- **Dữ liệu công khai:** Cập nhật ngày 28/08/2026 và 05/09/2026 từ biểu phí chính thức của các nền tảng (PayPal, Stripe) và tổ chức tài chính.
- **Giới hạn:** Cơ cấu kênh thanh toán (tỷ lệ Thẻ/Ví/COD/CK) của các phân tầng doanh nghiệp được ước tính dựa trên quan sát cục bộ và dữ liệu tham khảo, có thể thay đổi tùy thuộc vào đặc thù ngành hàng. Chi phí thẻ và ví nội địa phụ thuộc vào hợp đồng riêng của từng đơn vị.

## 5. Doanh nghiệp theo quy mô chi bao nhiêu cho trung gian thanh toán

Trục chính của bài toán chi phí không chỉ nằm ở một kênh riêng lẻ mà nằm ở tổng thể cơ cấu thanh toán của doanh nghiệp. Chúng tôi chia thị trường thành 5 phân tầng quy mô để thấy rõ dòng tiền đang "chảy" đi đâu.

### Bảng phân tầng 5 quy mô doanh nghiệp

Cơ cấu kênh thanh toán của từng tầng là giả định của nhóm nghiên cứu, neo vào hai mốc công khai: COD còn chiếm khoảng 67% giao dịch mua sắm trực tuyến năm 2024 theo tổng hợp của Tạp chí Công Thương, và tỷ trọng thanh toán không tiền mặt tăng dần theo quy mô doanh nghiệp. Mức phí thẻ lấy từ biểu phí đơn vị chấp nhận thanh toán công khai của VietinBank (hiệu lực 22/04/2026); phí ví điện tử và cổng trong nước là giả định 1,5% đến 2,0% vì phụ thuộc hợp đồng từng đơn vị; doanh thu là điểm giữa của dải mỗi tầng. Đổi giả định thì con số đổi theo, bộ dữ liệu CSV kèm bài cho phép tính lại.

| Phân tầng | Doanh thu | Số đơn | Cơ cấu (Thẻ/Ví/Cổng/COD/CK) | Phí trung gian / tháng | Phí trung gian / năm | % Doanh thu mất |
|---|---|---|---|---|---|---|
| Tập đoàn/chuỗi lớn | 30 tỷ | 15.000 | 40% / 20% / 10% / 10% / 20% | 420.000.000 đ | 5.040.000.000 đ | 1,40% |
| Doanh nghiệp lớn | 10 tỷ | 10.000 | 20% / 20% / 20% / 20% / 20% | 130.000.000 đ | 1.560.000.000 đ | 1,30% |
| Doanh nghiệp vừa | 2,5 tỷ | 5.000 | 10% / 20% / 10% / 30% / 30% | 27.500.000 đ | 330.000.000 đ | 1,10% |
| SME/shop đang lớn | 0,5 tỷ | 1.667 | 5% / 15% / 0% / 40% / 40% | 4.625.000 đ | 55.500.000 đ | 0,92% |
| Hộ kinh doanh/shop nhỏ | 0,05 tỷ | 334 | 0% / 10% / 0% / 30% / 60% | 300.000 đ | 3.600.000 đ | 0,60% |


**Diễn giải cho doanh nghiệp:** Bảng trên cho thấy nghịch lý của thị trường thanh toán: những đơn vị càng nhỏ (Hộ kinh doanh, SME) lại càng phụ thuộc vào COD (thu hộ) và ví điện tử, dẫn đến tỷ lệ % doanh thu mất cho trung gian cao hơn (xấp xỉ 0,8 - 0,9%). Ở các tập đoàn lớn, dù con số tuyệt đối chi trả lên tới hàng trăm triệu đồng mỗi tháng, nhưng nhờ lợi thế đàm phán giảm phí và kiểm soát tốt tỷ lệ chuyển khoản trực tiếp, tỷ lệ thất thoát trên doanh thu lại thấp hơn (dưới 0,6%). Nếu doanh nghiệp có thể dịch chuyển 10-20% tập khách hàng từ COD hoặc thẻ sang chuyển khoản VietQR, khoản lợi nhuận ròng tăng thêm sẽ rất đáng kể.

### Ca cụ thể: Một shop thương mại điện tử điển hình

Để hình dung rõ hơn, hãy xét một shop bán lẻ trực tuyến có doanh thu 800 triệu đồng/tháng (khoảng 1.600 đơn hàng, giá trị trung bình 500.000đ/đơn). Cơ cấu thanh toán giả định: 35% khách nhận hàng trả tiền (COD), 30% khách chuyển khoản, 20% dùng ví điện tử, 15% quẹt thẻ hoặc dùng cổng thanh toán.

**Bảng chi phí các kênh thanh toán của shop**

| Khoản mục phí | Tỷ trọng | Doanh thu qua kênh | Mức phí giả định | Chi phí / tháng |
|---|---|---|---|---|
| COD (Thu hộ) | 35% | 280.000.000 đ | 1.5% | 4.200.000 đ |
| Ví điện tử | 20% | 160.000.000 đ | 1.5% | 2.400.000 đ |
| Thẻ / Cổng | 15% | 120.000.000 đ | 2.0% | 2.400.000 đ |
| Chuyển khoản | 30% | 240.000.000 đ | 0% | 0 đ |
| Phí cố định/rút | N/A | N/A | N/A | 500.000 đ |
| **Tổng cộng** | **100%** | **800.000.000 đ** | | **9.500.000 đ** |


**Diễn giải cho doanh nghiệp:** Với quy mô này, shop đang trả khoảng 9,5 triệu đồng mỗi tháng cho các khâu trung gian, tương đương với quỹ lương của hơn một nhân sự toàn thời gian (mức lương cơ bản 8 triệu đồng). Giả sử shop áp dụng hệ thống xác nhận chuyển khoản tự động và tung ra chính sách "Giảm 1% khi thanh toán bằng VietQR", thành công chuyển dịch 70% số đơn COD và Ví sang chuyển khoản trực tiếp. Khi đó, mức tiết kiệm chi phí ròng có thể lên tới hơn khoảng 6,65 triệu đồng (ước tính theo giả định ở trên) mỗi tháng, vừa giảm rủi ro bom hàng (COD), vừa thu tiền về tài khoản ngân hàng ngay lập tức.

## 6. So sánh "đốt tiền" qua cổng quốc tế và chi phí ẩn nội địa

### Bảng chi phí đốt tiền qua cổng PayPal so với chuyển khoản

Đối với doanh nghiệp bắt buộc dùng cổng quốc tế như PayPal, mức phí 4,40% + 0,30 USD (chưa tính phí rút 60.000đ) là một khoản khổng lồ.

| Doanh thu / tháng | Số đơn (AOV 500k) | Phí PayPal (AOV 500k) | Số đơn (AOV 2tr) | Phí PayPal (AOV 2tr) | Số đơn (AOV 5tr) | Phí PayPal (AOV 5tr) | Phí CK VietQR |
|---|---|---|---|---|---|---|---|
| 100 triệu | 200 | 6.164.000 đ | 50 | 5.021.000 đ | 20 | 4.792.400 đ | 0 đ |
| 500 triệu | 1.000 | 29.860.000 đ | 250 | 24.145.000 đ | 100 | 23.002.000 đ | 0 đ |
| 1 tỷ | 2.000 | 59.480.000 đ | 500 | 48.050.000 đ | 200 | 45.764.000 đ | 0 đ |
| 5 tỷ | 10.000 | 296.440.000 đ | 2.500 | 239.290.000 đ | 1.000 | 227.860.000 đ | 0 đ |
| 20 tỷ | 40.000 | 1.185.040.000 đ | 10.000 | 956.440.000 đ | 4.000 | 910.720.000 đ | 0 đ |

*(Tỷ giá giả định: 1 USD = 25.400 VND. Phí PayPal giả định rút tiền 4 lần/tháng).*

**Diễn giải cho doanh nghiệp:** Nếu anh chị bán một đơn hàng trị giá 500.000đ qua PayPal, tổng phí mất đi lên tới khoảng 30.000đ cho mỗi đơn. Với doanh thu 1 tỷ/tháng, doanh nghiệp "cống nạp" gần 60 triệu đồng cho cổng thanh toán này. Khách quốc tế thì đành chịu, nhưng tuyệt đối không nên dùng PayPal để thu tiền khách hàng nội địa Việt Nam. Kênh chuyển khoản VietQR có phí giao dịch bằng 0đ là lựa chọn tối ưu, chỉ cần giải bài toán vận hành đối soát.

### Bảng chi phí đối soát tay (chi phí ẩn của chuyển khoản)

Ước tính theo giả định ghi ngay trong bảng: số giao dịch mỗi tháng × số phút kiểm tra mỗi giao dịch × lương theo giờ.

Chuyển khoản miễn phí, nhưng công sức xác nhận bằng tay thì không miễn phí. Đây là chi phí nhân sự tính theo giờ.

| Quy mô | Số giao dịch / tháng | Phút tra soát / GD | Lương giờ | Chi phí ẩn / tháng |
|---|---|---|---|---|
| Nhỏ | 300 | 3 | 25.000 đ | 375.000 đ |
| Vừa | 1.500 | 3 | 30.000 đ | 2.250.000 đ |
| Lớn | 5.000 | 3 | 35.000 đ | 8.750.000 đ |


**Diễn giải cho doanh nghiệp:** Thay vì trả phí phần trăm cho thẻ hay ví, doanh nghiệp dùng chuyển khoản đang trả lương cho kế toán để ngồi dò tin nhắn. Một doanh nghiệp lớn với 5.000 đơn hàng/tháng sẽ tốn 250 giờ (5.000 đơn × 3 phút) lao động chỉ để kiểm tra số dư, tương đương 8.750.000 đ. Con số này hoàn toàn có thể bị xóa sổ bằng một hệ thống API ngân hàng báo có tự động.

## 7. Ý nghĩa và khuyến nghị hành động

Từ góc độ tối ưu dòng tiền, chúng tôi đề xuất 4 hành động cụ thể cho các chủ doanh nghiệp:

1. **Quy hoạch lại kênh thanh toán theo tệp khách:** Giữ nút thanh toán PayPal hay Stripe (nếu có pháp nhân nước ngoài) độc quyền cho IP khách truy cập từ quốc tế. Với khách nội địa, luôn đặt mã VietQR ở vị trí ưu tiên cao nhất trên trang thanh toán.
2. **Kích thích khách hàng chuyển khoản:** Dùng một phần chi phí tiết kiệm được (1-2%) từ việc không dùng thẻ/COD để làm ngân sách khuyến mãi, giảm giá trực tiếp hoặc miễn phí vận chuyển cho khách hàng thanh toán qua mã QR.
3. **Loại bỏ đối soát thủ công bằng công nghệ:** Không giao điện thoại chứa app ngân hàng cho nhân viên, cũng không bắt kế toán túc trực. Hãy gắn hệ thống báo có tự động (như MONA Pay) vào website, phần mềm bán hàng hoặc loa báo có tại quầy. Hệ thống không giữ tiền của anh chị, tiền đi thẳng vào tài khoản ngân hàng, nhưng đơn hàng được xác nhận trong vài giây.
4. **Tái phân bổ nhân sự:** Khi loại bỏ được 200-300 giờ tra soát ngân hàng mỗi tháng, hãy điều chuyển nhân sự kế toán sang các tác vụ có giá trị sinh lời cao hơn như phân tích dữ liệu bán hàng hoặc tối ưu luồng vốn.

## 8. Cách trích dẫn

Nhóm nghiên cứu MONA Pay (2026). Chi phí nhận tiền của doanh nghiệp Việt Nam 2026: thẻ, ví, cổng quốc tế và chuyển khoản tự báo có. The MONA Group. https://monapay.vn/nghien-cuu/chi-phi-nhan-tien-doanh-nghiep-viet-2026

## 9. Nguồn tham khảo

- Biểu phí người bán PayPal Việt Nam, https://www.paypal.com/vn/webapps/mpp/merchant-fees (Kiểm tra: 28/08/2026)
- Danh sách quốc gia Stripe, https://stripe.com/global (Kiểm tra: 28/08/2026)
- Chính sách và biểu phí dịch vụ NAPAS, https://napas.com.vn (Kiểm tra: 05/09/2026)
- Thống kê thanh toán không dùng tiền mặt Ngân hàng Nhà nước, https://www.sbv.gov.vn (Kiểm tra: 05/09/2026)
- Tạp chí Công Thương, Thanh toán điện tử tại Việt Nam giai đoạn 2022–2025, https://tapchicongthuong.vn/thanh-toan-dien-tu-tai-viet-nam-giai-doan-2022-2025--trien-vong--thach-thuc-va-mot-so-giai-phap-phat-trien-89400.htm (kiểm 06/09/2026)
- VietinBank, Biểu phí dịch vụ chấp nhận thanh toán thẻ (hiệu lực 22/04/2026), https://www.vietinbank.vn/ca-nhan/cong-cu-tien-ich/bieu-phi-va-bieu-mau/dich-vu-chap-nhan-thanh-toan-the-40-html (kiểm 06/09/2026)
- MONA Pay, Giới thiệu: hệ thống xác nhận chuyển khoản chạy cho khách hàng MONA từ 2022, https://monapay.vn/gioi-thieu (kiểm 06/09/2026)
