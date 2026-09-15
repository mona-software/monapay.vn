// Nhật ký thay đổi công khai, trang /changelog chỉ đọc từ đây. Chỉ ghi việc ĐÃ lên thật (kiểm ROADMAP + NGUYEN-LIEU), không hứa ngày.
export type Change = { date: string; version?: string; title: string; items: string[]; tag?: 'san-pham' | 'tai-lieu' | 'ma-nguon' | 'ha-tang' };
export const CHANGELOG: Change[] = [
  { date: '05/09/2026', version: 'v0.4.0', tag: 'tai-lieu', title: '32 video hướng dẫn đã có ngay trong từng trang tài liệu', items: [
    '32 video đã lên kênh YouTube MONA Pay và được nhúng vào đúng trang tài liệu. Anh chị có thể xem thao tác, đọc nội dung video và làm theo ngay trên một trang.',
    'Từng video có phần nội dung bằng chữ trong trang tài liệu để dễ tìm lại bước cần làm và để công cụ AI đọc được.',
    'Kênh YouTube và fanpage MONA Pay đã được gắn vào website. llms.txt cũng ghi rõ các kênh chính thức của MONA Pay.',
  ]},
  { date: '04/09/2026', tag: 'san-pham', title: 'Dashboard mở luồng tài khoản ảo cho doanh nghiệp', items: [
    'Wizard nối ACB đã mở lựa chọn Doanh nghiệp (ORG), kèm hướng dẫn nhập số tài khoản doanh nghiệp và số điện thoại nhận OTP.',
    'Khi ACB từ chối yêu cầu, dashboard hiện nguyên văn lỗi của ngân hàng để anh chị biết đúng chỗ đang vướng. Kết nối ORG hiện cần ACB mở luồng doanh nghiệp cho MONA Pay.',
  ]},
  { date: '04/09/2026', version: 'v0.3.0', tag: 'san-pham', title: 'Báo tiền vào qua Zalo, loa và bộ hướng dẫn dùng ngay', items: [
    'Nhóm Zalo đã có đủ cấu hình, gửi thử, nhật ký gửi và thông báo tiền vào qua bot Gấu Mona.',
    'Loa báo có chạy tại pay.monapay.vn/loa/<token>. Dashboard có trang tạo loa, đọc thử, thu hồi link và in mã QR A5 để đặt tại quầy.',
    'Bộ Dùng ngay có 5 trang cho chủ quán, tiệm tóc, người bán online và lớp học. Dashboard có mục /huong-dan, bản .md để đưa cho AI và banner ở trang Tổng quan.',
  ]},
  { date: '04/09/2026', version: 'v0.2.0', tag: 'san-pham', title: 'Shopify, WooCommerce, OpenCart và PrestaShop chạy trọn luồng thử', items: [
    'Shopify app v1.1 đã chạy tại shopify.monapay.vn, cài trên dev store và đi trọn luồng tạo đơn, mở trang thanh toán, nhận giao dịch thử rồi đánh dấu đơn đã thanh toán.',
    'Plugin WooCommerce 0.3.2 có sandbox_mode, cảnh báo đơn thử và nút tạo giao dịch thử từ trang đơn.',
    'Module OpenCart 4.1 và PrestaShop 8 đã được viết lại cho trang thanh toán MONA Pay, OAuth, webhook HMAC và sandbox. Cả hai đã đi trọn luồng trên store demo tới trạng thái đã thanh toán.',
  ]},
  { date: '03/09/2026', tag: 'san-pham', title: 'Trang thanh toán, sandbox và kênh email đã hoạt động', items: [
    'Trang thanh toán pay.monapay.vn tạo VietQR riêng cho từng đơn, theo dõi thanh toán thiếu hoặc đủ, gửi CHECKOUT_PAID và đưa khách về website bằng chữ ký HMAC.',
    'Sandbox cho phép tạo tài khoản ảo SBX, checkout và giao dịch thử mà không cần nối ngân hàng. Trang thanh toán ghi rõ PHIÊN THỬ để tránh chuyển tiền thật.',
    'Kênh email có xác minh mã 6 số, chọn sự kiện tiền vào, webhook lỗi hoặc tạo tài khoản ảo, kèm log gửi và danh sách địa chỉ bị chặn.',
    'API giao dịch nhận since_id và trả has_more để đối soát theo con trỏ. API key có thể giới hạn quyền đọc, tạo QR, tạo tài khoản ảo và cấu hình webhook.',
    'Dashboard cho xem lại hoặc xoay Client Secret sau khi xác nhận mật khẩu hoặc 2FA. Nút gửi lại thông báo cho phép gửi lại webhook hoặc Telegram từ một giao dịch.',
  ]},
  { date: '02/09/2026', tag: 'san-pham', title: 'Đăng nhập và bảo mật tài khoản rõ hơn', items: [
    'Có quên mật khẩu qua email hoặc Telegram, đăng nhập Google và GitHub, cùng xác thực 2 lớp TOTP cho dashboard.',
    'Các lệnh ghi từ dashboard tự gửi X-Client-Secret. Hệ thống có giới hạn tốc độ cho đăng ký, đăng nhập, OAuth và quên mật khẩu.',
    'Trang Cam kết bảo mật và security.txt công khai cách MONA Pay bảo vệ dữ liệu, tiếp nhận báo lỗi và xác minh webhook.',
  ]},
  { date: '31/08/2026', tag: 'san-pham', title: 'Gói giao dịch và màn quản lý thanh toán', items: [
    'Gói Miễn phí có 500 giao dịch mỗi tháng. Bốn gói trả phí tính theo số giao dịch, không thu phần trăm trên số tiền chuyển khoản.',
    'Dashboard có trang Gói & thanh toán, mức dùng trong tháng, cảnh báo khi gần hết hạn mức và danh sách hoá đơn VietQR.',
  ]},
  { date: '30/08/2026', tag: 'tai-lieu', title: 'Trang chủ viết lại cho doanh nghiệp không rành kỹ thuật', items: [
    'Trang chủ đi thẳng vào các việc quen thuộc: đơn tự xác nhận, Telegram báo tiền vào, tạo mã QR và dùng khi chưa có website.',
    'Phần tích hợp dành cho lập trình viên và AI được giữ lại, đặt sau phần hướng dẫn cho chủ doanh nghiệp.',
  ]},
  { date: '29/08/2026', version: 'v0.1.0', tag: 'ma-nguon', title: 'Mở mã nguồn SDK, MCP server, CLI, plugin WooCommerce', items: [
    'GitHub org The MONA Group (github.com/themonagroup): SDK Node.js (@monapay/node), Python (monapay), PHP (monapay/php-sdk), MCP server monapay-mcp cho Claude Code, Cursor, Codex, CLI monapay (login, tạo QR, tra giao dịch, webhook listen), plugin WooCommerce, 8 ví dụ framework (Next.js, Express, NestJS, Laravel, Django, FastAPI, Spring Boot, Go). Tất cả MIT, phát hành v0.1.0; bản trên npm, PyPI, Packagist, wordpress.org lên sau.',
    'API reference tương tác tại /docs/api-reference (sinh từ openapi.json, thử endpoint ngay trên trình duyệt) và Postman collection 20 request.',
    'Trạng thái hệ thống công khai tại /status, kiểm 5 phút một lần website, dashboard, API; dữ liệu máy đọc /status.json.',
  ]},
  { date: '29/08/2026', tag: 'tai-lieu', title: 'Tài liệu tiếng Anh và bảng ngân hàng hỗ trợ', items: [
    '17 trang tài liệu bản tiếng Anh tại /en/docs, trang /en và /en/ai-agent, hreflang hai chiều, mỗi trang có bản .md cho máy đọc; llms.txt thêm mục English docs.',
    'Trang /ngan-hang: bảng trạng thái kết nối từng ngân hàng (đang hoạt động, đang đăng ký kết nối, trong kế hoạch); thêm ngân hàng không phải sửa tích hợp vì webhook, Telegram, API dùng chung.',
    'Blog 14 bài hướng dẫn và kiến thức (xác nhận thanh toán tự động, báo có, gắn cổng thanh toán, VietQR, webhook, API ngân hàng, open banking, tài khoản ảo), mỗi bài có bản .md.',
  ]},
  { date: '28/08/2026', tag: 'san-pham', title: 'Website monapay.vn và dashboard my.monapay.vn', items: [
    'Website chính thức: trang sản phẩm, tài liệu tích hợp 18 trang, llms.txt, llms-full.txt, openapi.json, robots mở cho GPTBot, ClaudeBot, PerplexityBot.',
    'Đăng ký tài khoản tự kích hoạt, dùng ngay, tự tạo API key; nút Tạo tài khoản mở thẳng tab đăng ký (/auth?mode=register).',
    'Wizard nối ACB 4 bước liền mạch với 2 lần OTP (tạo tài khoản ảo, đăng ký nhận thông báo giao dịch).',
    'Dashboard Webhooks: lịch sử từng lần gửi (mã HTTP, thời gian phản hồi, nhãn lỗi), gửi lại, thống kê tỷ lệ thành công và P95.',
    'Tool tạo mã QR ngân hàng chuẩn VietQR cho 36 ngân hàng, chạy trên trình duyệt, không lưu dữ liệu, kèm 10 trang theo ngân hàng.',
    'Bộ nhận diện: logo, favicon, ảnh đại diện chia sẻ; trang Điều khoản sử dụng và Chính sách bảo mật.',
  ]},
];
export const LATEST_VERSION = CHANGELOG.find(({ version }) => version)?.version ?? 'v0.1.0';

// Đang triển khai (mã đã viết, chờ đưa lên máy chủ), cập nhật tại đây khi lên
export const IN_PROGRESS: string[] = [
  'Gửi lại webhook tự động theo lịch (tối đa 7 lần) khi máy chủ của anh chị không phản hồi.',
  'Giới hạn tốc độ gọi API, danh sách IP được phép, Idempotency-Key cho lệnh tạo QR và tài khoản ảo.',
  'Kênh thông báo Zalo OA và ZNS, Slack, Discord bên cạnh Telegram, nhóm Zalo và email.',
  'Kết nối thêm ngân hàng ngoài ACB theo bảng tại /ngan-hang.',
];
