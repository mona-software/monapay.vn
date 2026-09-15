---
title: "SDK MONA Pay: Node.js, Python, PHP, Go và các ngôn ngữ khác"
description: "Chọn đúng SDK MONA Pay, khởi tạo bằng client_id và client_secret, tạo checkout, tra giao dịch, kiểm webhook HMAC và thử bằng sandbox."
updated: 05/09/2026
---

MONA Pay có SDK cho 10 hệ sinh thái. Node.js và Python đã có trên npm, PyPI; Go cài trực tiếp bằng module đã gắn tag. Các SDK còn lại có source và tag trên GitHub nhưng chưa có trên registry tương ứng.

Nếu anh chị đang bắt đầu một web JavaScript hoặc TypeScript, dùng Node.js. Flask, FastAPI hoặc Django dùng Python. Dự án đã chạy ngôn ngữ nào thì chọn SDK của ngôn ngữ đó để giữ secret ở backend.

## Bảng package và trạng thái phát hành

| Ngôn ngữ | Package hoặc module | Lệnh cài | Trạng thái trong repo |
|---|---|---|---|
| Node.js / TypeScript | `@monapay/node` 0.5.1 | `npm install @monapay/node` | Đã publish trên npm |
| Python | `monapay` 0.5.1 | `pip install monapay` | Đã publish trên PyPI |
| Go | `github.com/themonagroup/monapay-go` 0.4.0 | `go get github.com/themonagroup/monapay-go@v0.4.0` | Đã có repo và tag công khai |
| PHP | `monapay/php-sdk` 0.4.0 | Sau khi lên Packagist: `composer require monapay/php-sdk` | Trên GitHub, chưa lên registry |
| Java | `com.themona:monapay` 0.4.0 | Thêm dependency Maven ghi trong README sau khi lên Central | Trên GitHub, chưa lên registry |
| .NET | `MonaPay` 0.4.0 | Sau khi lên NuGet: `dotnet add package MonaPay --version 0.4.0` | Trên GitHub, chưa lên registry |
| Ruby | gem `monapay` 0.4.0 | Sau khi lên RubyGems: `gem "monapay", "~> 0.4"` | Trên GitHub, chưa lên registry |
| Dart / Flutter | package `monapay` 0.4.0 | Dùng source từ repo hiện tại | Trên GitHub, chưa lên registry |
| Rust | crate `monapay` 0.4.0 | Dùng source từ repo hiện tại | Trên GitHub, chưa lên registry |
| Elixir | Hex package `monapay` 0.4.0 | Dùng source từ repo hiện tại | Trên GitHub, chưa lên registry |

Không chạy lệnh cài từ registry cho 7 dòng ghi “chưa lên registry”. Mở [GitHub The MONA Group](https://github.com/themonagroup), chọn repo `monapay-<ngôn-ngữ>`, rồi làm theo README và tag trong repo. Trang [Mã nguồn MONA Pay trên GitHub](/docs/github) có danh sách link đầy đủ.

## Cách xác thực chung

Base URL production là:

```text
https://api.monapay.vn
```

Vào dashboard [my.monapay.vn](https://my.monapay.vn), mở **API Keys**, tạo một key riêng cho ứng dụng và lưu hai giá trị sau vào secret store của backend:

```bash
export MONAPAY_BASE_URL="https://api.monapay.vn"
export MONAPAY_CLIENT_ID="client_id"
export MONAPAY_CLIENT_SECRET="client_secret"
export MONAPAY_WEBHOOK_SECRET="secret-hmac-rieng"
```

SDK đổi `client_id` và `client_secret` thành Bearer token qua `POST /api/v1/oauth/token`, cache token tới gần hạn và lấy lại một lần khi gặp HTTP 401. Các SDK tự gắn `X-Client-Secret` cho lệnh ghi POST, PUT và DELETE.

`MONAPAY_CLIENT_SECRET` dùng để ứng dụng gọi MONA Pay. `MONAPAY_WEBHOOK_SECRET` dùng để kiểm chữ ký dữ liệu MONA Pay gửi về. Hãy dùng hai chuỗi khác nhau và không đưa chúng xuống trình duyệt.

## Node.js: khởi tạo client

Node.js SDK cần Node 18 trở lên vì dùng `fetch` có sẵn:

```js
import { MonaPay, verifyWebhook } from '@monapay/node';

const mona = new MonaPay({
  baseUrl: 'https://api.monapay.vn',
  clientId: process.env.MONAPAY_CLIENT_ID,
  clientSecret: process.env.MONAPAY_CLIENT_SECRET,
});
```

Nếu đã đặt đủ biến môi trường, có thể viết gọn:

```js
const mona = MonaPay.fromEnv();
```

### 1. Tạo checkout

```js
const checkout = await mona.checkouts.create({
  amount: 250000,
  order_code: 'DH10234',
  return_url: 'https://shop.vn/payment/return',
});

console.log(checkout.checkout_url);
```

Đưa `checkout_url` cho khách hoặc chuyển hướng trình duyệt sang đó. Chỉ giao hàng khi webhook `CHECKOUT_PAID` đã qua bước kiểm chữ ký và khớp đơn, số tiền; redirect của trình duyệt không đủ để xác nhận thanh toán.

### 2. Tra giao dịch theo tài khoản ảo

```js
const page = await mona.transactions.list({
  virtualAccountNumber: 'MONA0000010234',
  page: 1,
  limit: 20,
});

for (const tx of page.data ?? []) {
  console.log(tx.transaction_code, tx.amount, tx.description);
}
```

`transaction_code` không đổi qua các lần gửi lại. Lưu trường này bằng unique constraint để một giao dịch chỉ cập nhật đơn một lần.

### 3. Kiểm chữ ký webhook HMAC

```js
const rawBody = new Uint8Array(await request.arrayBuffer());
const result = verifyWebhook({
  rawBody,
  headers: request.headers,
  secret: process.env.MONAPAY_WEBHOOK_SECRET,
});

if (!result.ok) {
  return new Response(result.reason, { status: 401 });
}

await saveOnce(result.payload.transaction_code, result.payload);
return Response.json({ ok: true });
```

Phải truyền đúng raw body nhận từ mạng. Nếu parse JSON rồi stringify lại, byte có thể đổi và chữ ký sẽ sai. Verifier kiểm HMAC-SHA256, so sánh constant-time và mặc định từ chối timestamp lệch quá 300 giây.

## Python: khởi tạo client

Python SDK đồng bộ và chỉ dùng thư viện chuẩn:

```python
import os
from monapay import MonaPay, verify_webhook

mona = MonaPay(
    base_url="https://api.monapay.vn",
    client_id=os.environ["MONAPAY_CLIENT_ID"],
    client_secret=os.environ["MONAPAY_CLIENT_SECRET"],
)
```

Khi đã đặt biến môi trường, dùng `MonaPay.from_env()`.

### 1. Tạo checkout

```python
checkout = mona.checkouts.create({
    "amount": 250000,
    "order_code": "DH10234",
    "return_url": "https://shop.vn/payment/return",
})

print(checkout["checkout_url"])
```

Webhook `CHECKOUT_PAID` dùng trường `checkout_id`. Sau khi kiểm chữ ký, gọi `mona.checkouts.get(event["checkout_id"])` để đối chiếu trạng thái server-side trước khi giao hàng.

### 2. Tra giao dịch theo tài khoản ảo

```python
page = mona.transactions.list(
    "MONA0000010234",
    page=1,
    limit=20,
)

for tx in page.get("data", []):
    print(tx["transaction_code"], tx["amount"], tx["description"])
```

Muốn đọc hết nhiều trang, dùng `mona.iter_transactions("MONA0000010234", limit=100)`.

### 3. Kiểm chữ ký webhook HMAC

```python
raw_body = request.get_data(cache=True)
result = verify_webhook(
    raw_body,
    request.headers,
    os.environ["MONAPAY_WEBHOOK_SECRET"],
)

if not result.ok:
    return {"reason": result.reason}, 401

save_once(result.payload["transaction_code"], result.payload)
return {"ok": True}, 200
```

`raw_body` phải là `bytes`. SDK kiểm hai header `X-Mona-Timestamp`, `X-Mona-Signature` và cửa sổ 300 giây trước khi parse JSON.

## Thử luồng thanh toán bằng sandbox

Sandbox tạo giao dịch giả, bắn webhook và khớp checkout như luồng thật nhưng không chuyển tiền, không tính hạn mức. Tài khoản chưa nối ngân hàng vẫn dùng được.

**Node.js**

```js
const checkout = await mona.checkouts.create({
  amount: 10000,
  order_code: 'DH-SBX-01',
  return_url: 'https://shop.vn/payment/return',
  sandbox: true,
});

await mona.sandbox.transaction({
  virtual_account_number: checkout.bank.account_number,
  amount: checkout.amount,
  description: checkout.order_code,
});

console.log((await mona.checkouts.get(checkout.id)).status); // "paid"
```

**Python**

```python
checkout = mona.checkouts.create({
    "amount": 10000,
    "order_code": "DH-SBX-01",
    "return_url": "https://shop.vn/payment/return",
}, sandbox=True)

mona.sandbox.transaction(
    virtual_account_number=checkout["bank"]["account_number"],
    amount=checkout["amount"],
    description=checkout["order_code"],
)

print(mona.checkouts.get(checkout["id"])["status"])  # "paid"
```

Chạy sandbox trước với đủ tiền, thiếu tiền, chữ ký sai và `transaction_code` lặp. Khi lên production, giữ endpoint webhook public qua HTTPS, trả HTTP 200, 201 hoặc 202 trong 10 giây rồi xử lý phần nặng ở hàng đợi.

Đọc thêm: [Sandbox](/docs/api/sandbox) · [Bảo mật webhook](/docs/webhooks/bao-mat) · [API reference](/docs/api-reference)
