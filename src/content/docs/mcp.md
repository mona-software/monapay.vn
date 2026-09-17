---
title: "MCP server MONA Pay: cho Claude Code, Cursor, Codex thu tiền thay anh chị"
description: "Cài monapay-mcp, đưa API key cho Claude Code, Cursor hoặc Codex, rồi tạo link thu tiền, tra giao dịch và thử webhook ngay trong khung chat."
updated: 05/09/2026
---

`monapay-mcp` là MCP server chính thức của MONA Pay. Sau khi cài, Claude Code, Cursor, Codex hoặc một MCP client khác có thể gọi 50 công cụ để tạo link thu tiền, tạo VietQR, tra giao dịch, cấu hình webhook và chạy sandbox ngay trong lúc làm code.

Tiền vẫn chuyển thẳng vào tài khoản ngân hàng của anh chị. MCP chỉ dùng API MONA Pay để tạo và đọc dữ liệu theo lệnh anh chị giao.

## Chuẩn bị

- Node.js 18 trở lên.
- Tài khoản MONA Pay tại [my.monapay.vn](https://my.monapay.vn).
- Một khối cấu hình lấy từ dashboard: **API Keys → Tạo key → Đưa cho AI agent**.

Khối này có `client_id` và `client_secret`. Agent dùng hai giá trị đó để lấy Bearer token qua OAuth client credentials. Agent không cầm username hoặc mật khẩu, nên tài khoản bật xác thực 2 lớp vẫn dùng được.

Secret chỉ nên nằm trong biến môi trường hoặc cấu hình MCP trên máy của anh chị. Không dán secret vào source, ảnh chụp, issue GitHub hoặc tin nhắn công khai.

## Chạy thử từ terminal

Package trên npm có tên chính xác là `monapay-mcp` và cần Node.js 18 trở lên:

```bash
npx monapay-mcp
```

Server dùng giao tiếp `stdio`. Khi chạy qua một MCP client, dùng `npx -y monapay-mcp` để client tự khởi động đúng package.

| Biến môi trường | Dùng để làm gì |
|---|---|
| `MONAPAY_CLIENT_ID` | ID của API key trong dashboard |
| `MONAPAY_CLIENT_SECRET` | Secret của API key, dùng lấy OAuth token và ký quyền cho lệnh ghi |
| `MONAPAY_BASE_URL` | Tuỳ chọn, mặc định `https://api.monapay.vn` |

`MONAPAY_USERNAME` và `MONAPAY_PASSWORD` là cách tương thích cũ. Tụi em khuyên dùng `client_id` và `client_secret`; cách dùng mật khẩu sẽ không chạy khi tài khoản bật xác thực 2 lớp.

## Cấu hình Claude Code

Chép nguyên khối dashboard cấp cho anh chị, hoặc thay hai giá trị mẫu dưới đây:

```bash
claude mcp add monapay \
  -e MONAPAY_CLIENT_ID=client_id_cua_anh_chi \
  -e MONAPAY_CLIENT_SECRET=client_secret_cua_anh_chi \
  -- npx -y monapay-mcp
```

Mở lại Claude Code nếu client chưa nhận server, sau đó yêu cầu: `Kiểm tra kết nối MONA Pay của tôi`. MCP sẽ gọi `monapay_whoami`.

## Cấu hình Cursor

Tạo hoặc cập nhật `.cursor/mcp.json` trong dự án:

```json
{
  "mcpServers": {
    "monapay": {
      "command": "npx",
      "args": ["-y", "monapay-mcp"],
      "env": {
        "MONAPAY_CLIENT_ID": "client_id",
        "MONAPAY_CLIENT_SECRET": "client_secret"
      }
    }
  }
}
```

Nếu file này chứa secret thật, thêm nó vào `.gitignore` trước khi commit. Khởi động lại Cursor rồi kiểm tra server `monapay` trong danh sách MCP.

## Cấu hình Codex

Thêm vào `~/.codex/config.toml`:

```toml
[mcp_servers.monapay]
command = "npx"
args = ["-y", "monapay-mcp"]
env = { MONAPAY_CLIENT_ID = "client_id", MONAPAY_CLIENT_SECRET = "client_secret" }
```

Khởi động lại Codex sau khi lưu. Nếu anh chị xoay secret trong dashboard hoặc bằng tool `monapay_rotate_key`, hãy cập nhật `MONAPAY_CLIENT_SECRET` rồi khởi động lại client.

## 50 công cụ MCP

Mỗi tool trong manifest có nhãn phạm vi để client biết đây là lệnh đọc hay lệnh ghi. Các nhãn như `read`, `checkout:write`, `webhooks:write` mô tả loại thao tác của tool; OAuth token hiện trả `scope: "*"`.

| Nhóm | Tool |
|---|---|
| Bắt đầu nhanh | `monapay_quickstart` |
| Kết nối và hồ sơ | `monapay_whoami`, `monapay_me` |
| Ngân hàng và VA | `monapay_list_bank_accounts`, `monapay_list_virtual_accounts`, `monapay_link_bank_start`, `monapay_link_bank_verify_otp`, `monapay_notification_register`, `monapay_notification_verify_otp` |
| Hồ sơ thanh toán | `monapay_get_payment_profile`, `monapay_set_payment_profile` |
| Link thu tiền | `monapay_create_checkout`, `monapay_get_checkout`, `monapay_list_checkouts`, `monapay_cancel_checkout` |
| VietQR | `monapay_create_qr`, `monapay_cancel_qr` |
| Giao dịch | `monapay_list_transactions`, `monapay_get_transaction`, `monapay_get_transactions_summary`, `monapay_sandbox_transaction`, `monapay_retry_transaction` |
| Webhook | `monapay_list_webhooks`, `monapay_create_webhook`, `monapay_update_webhook`, `monapay_delete_webhook`, `monapay_test_webhook`, `monapay_webhook_logs`, `monapay_webhook_stats` |
| Email | `monapay_list_email_configs`, `monapay_create_email_config`, `monapay_update_email_config`, `monapay_delete_email_config`, `monapay_verify_email`, `monapay_resend_email_verification`, `monapay_test_email`, `monapay_email_logs`, `monapay_email_stats`, `monapay_list_email_suppressions`, `monapay_remove_email_suppression` |
| Nhóm Zalo | `monapay_list_zalo_groups`, `monapay_create_zalo_group`, `monapay_update_zalo_group`, `monapay_delete_zalo_group`, `monapay_test_zalo_group`, `monapay_zalo_group_logs` |
| API key | `monapay_generate_key`, `monapay_rotate_key` |
| Chạy tại máy | `monapay_verify_signature`, `monapay_generate_webhook_snippet` |

MCP còn có resource `monapay://docs/llms`, `monapay://docs/{slug}` và prompt `integrate-monapay`. Tool `monapay_verify_signature` chạy tại máy, không gọi mạng.

## 3 câu anh chị có thể giao thẳng

**1. “Tạo link thu 250.000đ cho đơn DH10234 và chạy ở sandbox.”**

Agent gọi `monapay_create_checkout` với `amount: 250000`, `order_code: "DH10234"`, `sandbox: true`, rồi trả `checkout_url`. Khi cần kiểm lại, agent gọi `monapay_get_checkout`.

**2. “Tra 20 giao dịch mới nhất của tài khoản ảo MONA0000010234.”**

Agent gọi `monapay_list_transactions` với số VA, trang 1 và giới hạn 20. Đây là lệnh đọc, phù hợp để đối soát mà không đổi cấu hình.

**3. “Tạo webhook HMAC cho shop này, bắn thử và kiểm tra log giúp tôi.”**

Agent có thể lấy code bằng `monapay_generate_webhook_snippet`, tạo cấu hình bằng `monapay_create_webhook`, gọi `monapay_test_webhook`, rồi đọc `monapay_webhook_logs`. Anh chị chỉ nên chốt xong khi endpoint trả HTTP 200, 201 hoặc 202.

## Chỗ agent phải dừng để hỏi anh chị

- Nối ACB có 2 mã OTP do ngân hàng gửi về điện thoại. Agent phải hỏi anh chị ở cả hai bước, không được đoán mã.
- Thêm địa chỉ nhận email có mã xác minh 6 số. Agent phải chờ anh chị đọc mã trong hộp thư.
- Nhóm Zalo cần `group_id` thật và đã có bot Gấu Mona.

Các tool ghi tự gửi `X-Client-Secret` khi đã cấu hình `MONAPAY_CLIENT_SECRET`. Dùng một API key riêng cho từng máy hoặc từng dự án để có thể thu hồi đúng chỗ khi secret bị lộ. Khi nghi lộ secret, gọi `monapay_rotate_key`, cập nhật cấu hình rồi khởi động lại MCP client; secret cũ hết hiệu lực ngay.

## Lỗi thường gặp

| Hiện tượng | Cách kiểm |
|---|---|
| MCP client không thấy server | Chạy `node --version`, cần từ 18; chạy `npx -y monapay-mcp` trong terminal để xem lỗi khởi động |
| `monapay_whoami` trả 401 | Chép lại đúng cặp `client_id` và `client_secret` từ cùng một API key |
| Lệnh ghi bị từ chối | Kiểm `MONAPAY_CLIENT_SECRET`, khởi động lại client sau khi xoay key |
| Webhook test thất bại | URL phải public qua HTTPS; đọc `monapay_webhook_logs` để xem HTTP code và thời gian phản hồi |

Đặc tả đầy đủ: [MCP manifest](/.well-known/mcp-manifest.json) · [Tài liệu cho AI agent](/docs/ai-agent) · [Sandbox](/docs/api/sandbox)
