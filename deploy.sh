#!/usr/bin/env bash
# ⛔️ NGỪNG DÙNG từ 19/09/2026 17:20 — script này đã 2 lần rsync --delete bản Astro đè lên bản Next.js của Nhựt (13:11 + 17:11 cùng ngày).
# Giao diện monapay.vn LIVE = Next.js 16, repo git.mona.host:web2/monapay.vn (clone ~/monapay-nhut). Deploy = ~/monapay-nhut/scripts/deploy.sh prod --confirm.
# Repo Astro này chỉ còn là nguồn nội dung/docs để port sang Next; muốn deploy Astro lại phải có Mon gật + MONAPAY_ASTRO_DEPLOY=1.
set -euo pipefail
if [ "${MONAPAY_ASTRO_DEPLOY:-0}" != "1" ]; then
  echo "⛔️ deploy.sh Astro bị khoá: live monapay.vn là bản Next.js của Nhựt (web2/monapay.vn). Dùng ~/monapay-nhut/scripts/deploy.sh. Mon gật thì export MONAPAY_ASTRO_DEPLOY=1." >&2
  exit 1
fi
cd "$(dirname "$0")"
# Chốt chặn: server đang chạy bản Next (có version.json / _next) → không đè
if ssh -o BatchMode=yes mona-vps-1 'test -f /opt/www/monapay.vn/dist/version.json -o -d /opt/www/monapay.vn/dist/_next'; then
  echo "⛔️ Server đang chạy bản Next.js (version.json/_next). Không rsync Astro đè." >&2; exit 1
fi
npm run build
python3 scripts/build_research_pdf.py
python3 scripts/qc.py dist || { echo "QC FAIL — không deploy"; exit 1; }
rsync -az --delete dist/ mona-vps-1:/opt/www/monapay.vn/dist/
echo "DEPLOYED → https://monapay.vn (kiểm: curl -s https://monapay.vn/)"
