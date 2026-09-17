---
title: "Mã nguồn MONA Pay trên GitHub"
description: "Bản đồ repo MONA Pay trong tổ chức The MONA Group: 10 SDK, MCP, CLI, plugin, connector, ví dụ; kèm cách báo lỗi, gửi PR và báo lỗ hổng."
updated: 05/09/2026
---

Mã nguồn và ví dụ tích hợp MONA Pay nằm trong tổ chức [github.com/themonagroup](https://github.com/themonagroup). Chọn repo theo việc cần làm: SDK để gọi API trong backend, MCP để AI agent tự thao tác, CLI để thử từ terminal, plugin hoặc connector cho nền tảng bán hàng.

Tài liệu endpoint được phát hành riêng tại `monapay.vn`. Khi README và code mẫu chưa đủ một trường, hãy kiểm [OpenAPI 3.1](/openapi.json) và trang API tương ứng trước khi gửi request thật.

## Bản đồ repository

| Repo | Nội dung | Trạng thái ghi nhận trong repo |
|---|---|---|
| [`monapay-node`](https://github.com/themonagroup/monapay-node) | SDK Node.js / TypeScript, package `@monapay/node` | npm 0.5.1 đã publish |
| [`monapay-python`](https://github.com/themonagroup/monapay-python) | SDK Python, package `monapay` | PyPI 0.5.1 đã publish |
| [`monapay-go`](https://github.com/themonagroup/monapay-go) | SDK Go, module `github.com/themonagroup/monapay-go` | Tag 0.4.0, cài được bằng module path |
| [`monapay-php`](https://github.com/themonagroup/monapay-php) | SDK PHP, package dự kiến `monapay/php-sdk` | Tag 0.4.0; trên GitHub, chưa lên Packagist |
| [`monapay-java`](https://github.com/themonagroup/monapay-java) | SDK Java, Maven artifact `com.themona:monapay` | Tag 0.4.0; trên GitHub, chưa lên Maven Central |
| [`monapay-dotnet`](https://github.com/themonagroup/monapay-dotnet) | SDK .NET, NuGet package `MonaPay` | Tag 0.4.0; trên GitHub, chưa lên NuGet |
| [`monapay-ruby`](https://github.com/themonagroup/monapay-ruby) | SDK Ruby, gem `monapay` | Tag 0.4.0; trên GitHub, chưa lên RubyGems |
| [`monapay-dart`](https://github.com/themonagroup/monapay-dart) | SDK Dart / Flutter, package `monapay` | Tag 0.4.0; trên GitHub, chưa lên pub.dev |
| [`monapay-rust`](https://github.com/themonagroup/monapay-rust) | SDK Rust, crate `monapay` | Tag 0.4.0; trên GitHub, chưa lên crates.io |
| [`monapay-elixir`](https://github.com/themonagroup/monapay-elixir) | SDK Elixir, Hex package `monapay` | Tag 0.4.0; trên GitHub, chưa lên Hex |
| [`monapay-mcp`](https://github.com/themonagroup/monapay-mcp) | MCP server cho Claude Code, Cursor, Codex | npm `monapay-mcp` 0.6.0, manifest có 50 tool |
| [`monapay-cli`](https://github.com/themonagroup/monapay-cli) | CLI đăng nhập, tạo QR, tra giao dịch, nghe webhook | npm `@monapay/cli` 0.2.0 đã publish |
| [`woocommerce-monapay`](https://github.com/themonagroup/woocommerce-monapay) | Plugin WooCommerce tạo checkout hoặc VietQR và tự xác nhận đơn | GitHub release 0.3.2; hồ sơ WordPress.org đang chờ |
| [`monapay-connectors`](https://github.com/themonagroup/monapay-connectors) | Shopify app, adapter và module cho các nền tảng bán hàng | Shopify, OpenCart, PrestaShop đã qua luồng sandbox tới `paid`; Magento đang ở bản scaffold |
| [`monapay-examples`](https://github.com/themonagroup/monapay-examples) | Mẫu Next.js, Express, NestJS, Laravel, Django, FastAPI, Spring Boot và Go | 8 ví dụ đã hoàn thành, có gate theo từng runtime |
| [`monapay.vn`](https://github.com/themonagroup/monapay.vn) | Site, docs, `llms.txt`, OpenAPI và Postman collection | Tài liệu public tại [monapay.vn/docs](/docs) |

Mỗi repo SDK có README, `SECURITY.md`, file license và ví dụ webhook theo ngôn ngữ. Hãy đọc yêu cầu runtime, cài đúng version rồi chạy test của repo trước khi ghép vào hệ thống đang thu tiền.

## Dùng CLI `monapay`

CLI cần Node.js 18 trở lên. Package đã publish là `@monapay/cli`:

```bash
npm install --global @monapay/cli
```

Nếu đang sửa source trong repo `monapay-cli`, chạy `npm link` từ thư mục repo để liên kết lệnh vào máy.

### Đăng nhập bằng API key

```bash
monapay login \
  --client-id "$MONAPAY_CLIENT_ID" \
  --client-secret "$MONAPAY_CLIENT_SECRET"

monapay me
```

CLI đổi client credentials thành OAuth token và cache theo hạn dùng. Credentials được lưu tại `~/.config/monapay/credentials.json`; thư mục có mode `700`, file có mode `600`. Có thể đổi vị trí bằng `MONAPAY_CONFIG_DIR`.

### Tạo VietQR động

QR động cần các giá trị merchant ACB trong biến môi trường như `MONAPAY_OWNER_NUMBER`, `MONAPAY_MERCHANT_ID`, `MONAPAY_TERMINAL_ID`, `MONAPAY_VA_PREFIX` và `MONAPAY_BENEFICIARY_NAME`. Khi đã đặt đủ:

```bash
monapay qr create \
  --order DH10234 \
  --amount 2500000 \
  --desc "Thanh toan DH10234"
```

CLI in `qr_data_url` và lưu ảnh `DH10234.png`. Dùng `--out ./public/qr/DH10234.png` nếu cần đường dẫn khác.

### Tra giao dịch

```bash
monapay tx list \
  --va MONA0000010234 \
  --limit 100

monapay tx list \
  --va MONA0000010234 \
  --since-id FT26240001234 \
  --json
```

`--since-id` dừng trước giao dịch đã biết và không in lại bản ghi đó. Đây là lọc phía CLI; lưu `transaction_code` ở database vẫn là lớp chống xử lý trùng cho đơn hàng.

### Nghe webhook tại máy

```bash
export MONAPAY_WEBHOOK_SECRET="secret-hmac"
monapay webhook listen --port 3939
```

Muốn chuyển tiếp sang app đang chạy:

```bash
monapay webhook listen \
  --port 3939 \
  --forward http://localhost:8000/webhook
```

MONA Pay cần một URL HTTPS public để bắn thử. Mở tunnel tới cổng 3939, sau đó dùng `monapay webhooks test --url https://TEN-TUNNEL.example`.

## OpenAPI và Postman

| File | Nội dung | Cách dùng |
|---|---|---|
| [`openapi.json`](/openapi.json) | OpenAPI 3.1, hiện có 52 path | Import vào Postman, Insomnia hoặc công cụ sinh client; đây là nguồn kiểm method, path, field và response |
| [`monapay.postman_collection.json`](/monapay.postman_collection.json) | 20 request mẫu | Import collection rồi đặt `baseUrl`, `accessToken`, `clientSecret` trong environment riêng |
| [`llms.txt`](/llms.txt) | Mục lục docs có link Markdown | Đưa cho AI agent để tìm đúng trang |
| [`llms-full.txt`](/llms-full.txt) | Toàn văn tài liệu VI và EN | Dùng khi agent cần đọc trọn bộ trong một lần |

`baseUrl` mặc định của collection là `https://api.monapay.vn`. Không điền secret thật vào collection rồi export hoặc commit file environment.

## Báo lỗi

Mở tab **Issues** trong đúng repo và ghi đủ:

1. Runtime và version package đang dùng.
2. Các bước tái hiện ngắn, kèm request đã xoá token, secret, số tài khoản và dữ liệu khách hàng.
3. Kết quả mong đợi và kết quả thực tế.
4. HTTP status, `message` và log liên quan đã che dữ liệu nhạy cảm.

Kiểm issue đang mở trước để tránh tạo trùng. Lỗi thuộc endpoint API nhưng tái hiện qua SDK vẫn có thể mở ở repo SDK; ghi rõ path API để đội MONA chuyển đúng chỗ.

## Gửi pull request

Fork repo, tạo nhánh ngắn theo nội dung sửa, cập nhật test và README nếu hành vi public thay đổi. Chạy gate ghi trong README hoặc package scripts trước khi mở PR. Mô tả PR nên có lý do, phạm vi file, cách kiểm và ảnh chụp khi thay đổi giao diện plugin.

Không commit `.env`, API key, access token, webhook secret, file credentials CLI hoặc dữ liệu giao dịch thật. Nếu PR cần fixture, dùng mã đơn và VA giả.

## License và báo lỗ hổng bảo mật

SDK, MCP, CLI và bộ ví dụ dùng MIT. Plugin WooCommerce dùng GPLv2 hoặc mới hơn. Một số component connector có điều khoản riêng; ví dụ metadata Magento hiện ghi `proprietary`. File `LICENSE` hoặc metadata trong đúng repo là nguồn cần đọc trước khi phân phối lại.

Lỗ hổng bảo mật không đăng lên issue công khai. Gửi `info@themona.global` với tiêu đề `[security] monapay`, mô tả cách tái hiện và ảnh hưởng. Theo `SECURITY.md`, tụi em xác nhận trong 2 ngày làm việc và chỉ công bố sau khi có bản vá.
