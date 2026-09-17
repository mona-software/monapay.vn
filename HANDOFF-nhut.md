# Bàn giao giao diện monapay.vn cho Nhựt — 17/09/2026

Repo này (`site/`, Astro static) = **toàn bộ giao diện public monapay.vn**. Từ hôm nay **Nhựt là chủ**: mọi thay đổi giao diện đi qua tay Nhựt. AI trên máy Mon (Claude/Codex) **bị chặn máy** không sửa, không deploy repo này (`OWNERS.md` + hook) — để không lặp lại vụ monacloud.vn bị đè.

## Bắt đầu trong 10 phút
1. Clone: `git clone https://github.com/themonagroup/monapay.vn.git` (Mon add Nhựt làm collaborator).
2. Đọc `../STATE.md` (trạng thái cả MONAPay) và `HANDOFF-SITE.md`, `KEYWORD-MAP.md`, `BRIEF-CONTENT.md` trong repo này — luật SEO/GEO/voice của site.
3. Chạy local: `npm i && npm run dev`. Build: `npm run build` (ra `dist/`).
4. Làm việc: nhánh `feat/<việc>` → push → **Merge Request/PR về `main`** → Mon (hoặc Claude, chỉ đọc) review → merge.
5. Deploy: **chỉ từ `main` đã merge**. Hiện deploy = `deploy.sh` (rsync `dist/` → mona-vps-1 `/opt/www/monapay.vn/dist/`) chạy từ máy có SSH; Mon sẽ dựng GitLab/GitHub CI deploy để merge = lên site, Nhựt không cần SSH. Trong lúc chưa có CI: Nhựt merge xong nhắn Mon 1 câu, Mon chạy deploy từ `main`.

## Ranh giới
- Nhựt làm: mọi thứ trong repo này (trang, component, style, ảnh, content tĩnh, SEO on-page).
- Nhựt **không đụng**: `../acb-ipn` (backend), `../fe-payment` (app my.monapay.vn — trừ khi Mon giao thêm), `../app-api.mona.host` (báo-có), server/nginx/credential. Cần API/số liệu từ backend → tạo issue, AI làm.
- Luật nội dung MONA áp cho site: không "ạ"/"Vâng", số chuẩn 2016 · 14.000+ dự án · 85% retention · 1900 636 648, không nêu số nhân sự; logo THE MONA dùng file gốc trong `public/`; headline tiếng Việt: Be Vietnam Pro, 1 hàng hoặc ngắt đúng nghĩa (chi tiết: `~/mona-hub/luat/web-landing-ui.md` — Mon gửi file khi cần).

## Mỗi cuối ngày (30 giây)
- Cập nhật `STATE.md` của repo này (tạo nếu chưa có, ≤30 dòng): đang làm gì · xong gì · vướng gì. Mon và AI đọc file này thay vì hỏi.

## Việc đang chờ trong site (từ STATE MONAPay)
- Bảng giá chính thức trên site (chờ Mon chốt giá) · nhúng video · trang bank (ACB/VietinBank/Sacombank) đã có 16/09, cần rà nhất quán menu.
