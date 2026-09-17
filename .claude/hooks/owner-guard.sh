#!/usr/bin/env bash
# Hook PreToolUse (Edit|Write|MultiEdit|NotebookEdit|Bash) — CHẶN MÁY: AI không được sửa / deploy phần của repo
# có CHỦ LÀ NGƯỜI (khai trong OWNERS.md ở root repo). Ra đời sau vụ 16/09: Claude deploy đè giao diện Nhựt làm ở monacloud.vn.
#
# OWNERS.md — mỗi dòng: <đường dẫn tiền tố>  |  <chủ>  |  <ghi chú>      (chủ = claude/ai/mon → AI được sửa; tên khác = NGƯỜI → AI chỉ đọc)
#   site/        | nhut | Giao diện monapay.vn — AI không sửa, không deploy
#   fe-payment/  | nhut | App my.monapay.vn
# Mục "## Lệnh cấm với AI" — mỗi dòng 1 regex (ERE); Bash khớp là chặn:   site/deploy\.sh    deploy-fe\.sh    rsync .*103\.168\.54\.80
# Mở khoá có chủ đích: MONA_OWNER_OVERRIDE=1 claude   (Mon bật tay khi cần AI đụng phần của người — ghi lý do vào STATE).
set -u
[ "${MONA_OWNER_OVERRIDE:-0}" = "1" ] && exit 0
ROOT="${CLAUDE_PROJECT_DIR:-$(pwd)}"; OWN="$ROOT/OWNERS.md"
[ -f "$OWN" ] || exit 0
# Mở khoá bằng FILE (trong app không đặt env được): `.claude/OWNER-OVERRIDE` chứa lý do, hiệu lực 60 phút kể từ lúc tạo/touch.
OVR="$ROOT/.claude/OWNER-OVERRIDE"
if [ -f "$OVR" ]; then
  age=$(( $(date +%s) - $(stat -f %m "$OVR" 2>/dev/null || echo 0) ))
  if [ $age -lt 3600 ]; then exit 0; else rm -f "$OVR"; fi
fi
input=$(cat)
HOOK_INPUT="$input" python3 - "$OWN" "$ROOT" <<'PY'
import json, os, re, sys
own, root = sys.argv[1], sys.argv[2]
try:
    d = json.loads(os.environ.get("HOOK_INPUT") or "{}")
except Exception:
    sys.exit(0)
tool = d.get("tool_name", ""); ti = d.get("tool_input", {}) or {}
paths, cmds, sec = [], [], None
for raw in open(own, encoding="utf-8"):
    l = raw.strip()
    if l.startswith("## "): sec = "cmd" if "cấm" in l.lower() or "cam" in l.lower() else "own"; continue
    if not l or l.startswith("#") or l.startswith("|--"): continue
    if sec == "cmd":
        cmds.append(l.lstrip("-* ").strip("`")); continue
    if "|" in l:
        parts = [p.strip().strip("`") for p in l.strip("|").split("|")]
        if len(parts) >= 2 and parts[0] and parts[1].lower() not in ("chủ", "owner", "chu") and not parts[0].startswith("("):
            paths.append((parts[0], parts[1].lower(), parts[2] if len(parts) > 2 else ""))
human = [(p, o, n) for p, o, n in paths if o not in ("claude", "ai", "mon", "monbot", "any", "*")]
def deny(reason):
    print(json.dumps({"hookSpecificOutput": {"hookEventName": "PreToolUse", "permissionDecision": "deny",
          "permissionDecisionReason": reason}}, ensure_ascii=False)); sys.exit(0)
def rel(p):
    p = os.path.expanduser(p)
    if not os.path.isabs(p): p = os.path.join(root, p)
    try: return os.path.relpath(os.path.realpath(p), os.path.realpath(root))
    except Exception: return p
if tool in ("Edit", "Write", "MultiEdit", "NotebookEdit"):
    fp = rel(ti.get("file_path") or ti.get("notebook_path") or "")
    if fp == "OWNERS.md":
        deny("OWNERS.md chỉ Mon sửa tay (đây là hợp đồng phân quyền). Muốn đổi chủ → nói Mon.")
    for p, o, n in human:
        if p in (".", "./", "*") or fp == p.rstrip("/") or fp.startswith(p.rstrip("/") + "/"):
            deny(f"⛔ `{fp}` thuộc phần CỦA {o.upper()} ({n or 'xem OWNERS.md'}). AI không sửa phần của người — vụ 16/09 đè giao diện Nhựt. Muốn đổi: `bd create \"…\" -l owner:{o}` hoặc comment MR cho {o}. Mon mở khoá bằng MONA_OWNER_OVERRIDE=1 nếu cố ý.")
elif tool == "Bash":
    cmd = ti.get("command", "") or ""
    for rx in cmds:
        try:
            if re.search(rx, cmd): deny(f"⛔ Lệnh khớp mục 'Lệnh cấm với AI' trong OWNERS.md: /{rx}/ — deploy/ghi đè phần của người phải do chủ module hoặc CI làm. Mon mở khoá: MONA_OWNER_OVERRIDE=1.")
        except re.error: pass
    writes = re.search(r"\b(rsync|scp|rm|mv|cp|sed -i|tee|>|>>|git (push|checkout|reset|restore)|npm run (build|deploy)|pnpm (build|deploy))\b", cmd)
    if writes:
        for p, o, n in human:
            if p in (".", "./", "*"):
                deny(f"⛔ Repo này thuộc {o.upper()} — AI không chạy lệnh ghi/deploy ở đây. Mon mở khoá: MONA_OWNER_OVERRIDE=1.")
            if re.search(r"(^|[\s'\"/=])" + re.escape(p.rstrip("/")) + r"(/|\b)", cmd):
                deny(f"⛔ Lệnh ghi/deploy đụng `{p}` = phần CỦA {o.upper()}. AI chỉ đọc phần của người. Mon mở khoá: MONA_OWNER_OVERRIDE=1.")
sys.exit(0)
PY
exit 0
