# AGENTS.md — monapay.vn

MONA Pay giúp phần mềm và AI agent tạo link thu tiền, VietQR, đọc giao dịch và gửi thông báo. Tiền chuyển thẳng vào tài khoản ngân hàng của doanh nghiệp; agent thao tác qua MCP theo quyền được giao.

## Cài MCP

Dùng API key trực tiếp qua stdio:

```bash
claude mcp add monapay -e MONAPAY_CLIENT_ID=client_xxx -e MONAPAY_CLIENT_SECRET=xxx -- npx -y monapay-mcp
```

Claude.ai, ChatGPT và client hỗ trợ remote MCP dùng URL:

```text
https://mcp.monacloud.vn/mcp
```

Vào Settings → Connectors → Add custom connector, dán URL rồi đăng nhập MONA Pass.
Cursor đặt `"url": "https://mcp.monacloud.vn/mcp"` trong `mcp.json`.
Codex đặt `[mcp_servers.monacloud] url = "https://mcp.monacloud.vn/mcp"` trong `config.toml`.
Qua endpoint chung, đăng nhập MONA Pass rồi gọi `monapay_link` một lần.
Muốn dùng API key trực tiếp thì cài `npx -y monapay-mcp`.

## Công cụ

- `monapay_link`: liên kết MONA Pass với MONA Pay trong giai đoạn chuyển tiếp.
- `monapay_me`: đọc tài khoản MONA Pay đang đăng nhập.
- `monapay_whoami`: kiểm tra client credential đang hoạt động.
- `monapay_list_bank_accounts`: liệt kê tài khoản ngân hàng đã nối.
- `monapay_list_virtual_accounts`: liệt kê tài khoản ảo.
- `monapay_link_bank_start`: bắt đầu nối ACB và yêu cầu OTP.
- `monapay_link_bank_verify_otp`: xác minh OTP đầu tiên do người dùng cung cấp.
- `monapay_notification_register`: đăng ký thông báo giao dịch và yêu cầu OTP tiếp theo.
- `monapay_notification_verify_otp`: xác minh OTP thông báo do người dùng cung cấp.
- `monapay_get_payment_profile`: đọc hồ sơ trang thanh toán.
- `monapay_set_payment_profile`: tạo hoặc cập nhật hồ sơ trang thanh toán.
- `monapay_create_checkout`: tạo link thu tiền.
- `monapay_get_checkout`: đọc trạng thái một checkout.
- `monapay_list_checkouts`: liệt kê checkout theo bộ lọc.
- `monapay_cancel_checkout`: huỷ checkout đang chờ.
- `monapay_create_qr`: tạo VietQR động cho một đơn hàng.
- `monapay_cancel_qr`: huỷ VietQR động.
- `monapay_list_transactions`: liệt kê giao dịch tiền vào.
- `monapay_sandbox_transaction`: tạo giao dịch giả để thử luồng.
- `monapay_list_webhooks`: liệt kê webhook.
- `monapay_create_webhook`: đăng ký webhook nhận tiền vào.
- `monapay_update_webhook`: cập nhật URL, secret hoặc trạng thái webhook.
- `monapay_delete_webhook`: xoá cấu hình webhook.
- `monapay_test_webhook`: gửi giao dịch giả tới webhook.
- `monapay_webhook_logs`: đọc lịch sử gửi webhook.
- `monapay_webhook_stats`: đọc tỷ lệ thành công và nhóm lỗi webhook.
- `monapay_list_email_configs`: liệt kê cấu hình email.
- `monapay_create_email_config`: tạo kênh email và gửi mã xác minh.
- `monapay_update_email_config`: cập nhật người nhận, sự kiện hoặc trạng thái email.
- `monapay_delete_email_config`: xoá cấu hình email.
- `monapay_verify_email`: xác minh người nhận bằng mã người dùng cung cấp.
- `monapay_resend_email_verification`: gửi lại mã xác minh email.
- `monapay_test_email`: gửi email mẫu tới địa chỉ đã xác minh.
- `monapay_email_logs`: đọc metadata các lần gửi email.
- `monapay_email_stats`: đọc thống kê gửi email.
- `monapay_list_email_suppressions`: liệt kê địa chỉ bị suppression.
- `monapay_remove_email_suppression`: gỡ suppression sau khi sửa nguyên nhân.
- `monapay_list_zalo_groups`: liệt kê cấu hình nhóm Zalo.
- `monapay_create_zalo_group`: nối nhóm đã có bot Gấu Mona.
- `monapay_update_zalo_group`: cập nhật cấu hình nhóm Zalo.
- `monapay_delete_zalo_group`: xoá cấu hình nhóm Zalo.
- `monapay_test_zalo_group`: gửi tin thử dạng text thuần.
- `monapay_zalo_group_logs`: đọc lịch sử gửi nhóm Zalo.
- `monapay_retry_transaction`: gửi lại thông báo cho giao dịch đã có.
- `monapay_generate_key`: sinh client secret mới và chỉ trả một lần.
- `monapay_rotate_key`: xoay secret hiện tại khi nghi bị lộ.
- `monapay_verify_signature`: kiểm tra chữ ký HMAC tại máy.
- `monapay_generate_webhook_snippet`: tạo code mẫu endpoint webhook cho PHP.

## Luồng chuẩn

1. Đọc tài khoản, ngân hàng, tài khoản ảo và cấu hình hiện có.
2. Dùng sandbox để thử checkout, giao dịch và webhook.
3. Báo thay đổi hoặc chi phí rồi hỏi người dùng duyệt.
4. Chỉ tạo cấu hình thật sau khi được duyệt.
5. Kiểm tra trạng thái, log và chữ ký trước khi xác nhận hoàn tất.
6. Dừng chờ người dùng ở mọi bước OTP, mã email, quét QR hoặc duyệt chi phí.

Không tự đoán OTP hoặc mã xác minh email.
Không giao hàng chỉ dựa trên trang chuyển hướng; phải kiểm webhook hoặc trạng thái checkout.

## Tin cậy

MONA Pay là sản phẩm của The MONA Group, hoạt động từ năm 2016 với hơn 14.000 dự án.
Hỗ trợ: 1900 636 648 và info@themona.global.
Official MCP Registry: `vn.monapay/monapay-mcp`.
Smithery: `smithery.ai/servers/mon/monapay-mcp` và `mon/monacloud-remote`.
Glama: `glama.ai/mcp/servers/themonagroup/monapay-mcp`.

## Liên kết

- Tài liệu: https://monapay.vn/docs
- Hướng dẫn agent: https://monapay.vn/docs/ai-agent
- llms.txt: https://monapay.vn/llms.txt
- OpenAPI: https://monapay.vn/openapi.json
