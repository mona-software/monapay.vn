#!/usr/bin/env python3
"""Sync paired research Markdown/CSV files. No Python packages required.

python3 scripts/sync_research.py          # handoff/research/out/*.md + *.csv
python3 scripts/sync_research.py --sample # isolated sample/ fixture for local QA
"""
import argparse
import csv
import io
import json
from pathlib import Path
import re
import subprocess
import sys

SITE = Path(__file__).resolve().parents[1]
SOURCE = SITE.parent / 'handoff/research/out'
COLLECTION = SITE / 'src/content/nghien-cuu'
PUBLIC = SITE / 'public/nghien-cuu'
DRAFTS = SITE / '.research-drafts'  # CSV bản nháp, không ship
MANIFEST = SITE / '.research-sync.json'
SLUG = re.compile(r'^[a-z0-9]+(?:-[a-z0-9]+)*$')
COLUMNS = ['chi_so', 'nhom', 'gia_tri', 'don_vi', 'ky_do', 'nguon', 'xac_minh']


def metadata(files):
    # Use the site's pinned js-yaml dependency so YAML arrays/quotes/numbers work
    # exactly as authored. Do not try to parse YAML with regular expressions.
    script = """
import { readFileSync } from 'node:fs';
import { load, JSON_SCHEMA } from 'js-yaml';
const paths = JSON.parse(readFileSync(0, 'utf8'));
console.log(JSON.stringify(paths.map(path => {
  const text = readFileSync(path, 'utf8').replace(/^\\uFEFF/, '');
  const match = text.match(/^---\\r?\\n([\\s\\S]*?)\\r?\\n---(?:\\r?\\n|$)/);
  if (!match) throw new Error(path + ': thiếu frontmatter YAML');
  return load(match[1], {schema: JSON_SCHEMA});
})));
"""
    result = subprocess.run(['node', '--input-type=module', '-e', script], cwd=SITE,
                            input=json.dumps([str(f) for f in files]), text=True, capture_output=True)
    if result.returncode:
        raise ValueError(result.stderr.strip())
    return json.loads(result.stdout)


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--sample', action='store_true', help='Chỉ nạp sample/mau-bao-cao để kiểm thử; chạy lại không cờ để gỡ')
    args = parser.parse_args()
    source = SOURCE / 'sample' if args.sample else SOURCE
    if not source.is_dir():
        raise ValueError(f'Không có thư mục đầu vào: {source}')
    files = sorted(f for f in source.glob('*.md') if SLUG.fullmatch(f.stem))  # bỏ qua file hướng dẫn/ghi chú viết hoa
    pending = []
    for md, data in zip(files, metadata(files) if files else []):
        slug = md.stem
        if not SLUG.fullmatch(slug) or slug == 'index':
            raise ValueError(f'{md.name}: slug không hợp lệ hoặc trùng hub')
        if not isinstance(data, dict) or data.get('dataset') != slug + '.csv':
            raise ValueError(f'{md.name}: dataset phải là {slug}.csv')
        required = ['title', 'description', 'published', 'version', 'authors', 'sources', 'key_numbers']
        if any(key not in data for key in required):
            raise ValueError(f'{md.name}: thiếu trường frontmatter bắt buộc')
        dataset = source / (slug + '.csv')
        if not dataset.is_file():
            raise ValueError(f'{md.name}: thiếu {dataset.name}; chưa thay đổi collection')
        raw_csv = dataset.read_bytes()
        reader = csv.DictReader(io.StringIO(raw_csv.decode('utf-8-sig')), strict=True)
        if reader.fieldnames != COLUMNS:
            raise ValueError(f'{dataset.name}: cần cột {",".join(COLUMNS)}')
        rows = list(reader)
        if not rows or any(None in row or any(value is None for value in row.values()) for row in rows):
            raise ValueError(f'{dataset.name}: không có dữ liệu hoặc sai số cột')
        if any(row['xac_minh'] not in ('mon_kiem', 'cong_khai', 'uoc_tinh') for row in rows):
            raise ValueError(f'{dataset.name}: xac_minh phải là mon_kiem, cong_khai hoặc uoc_tinh (ước tính có giả định ghi trong bài)')
        raw_md = md.read_bytes()
        text_md = raw_md.decode('utf-8')
        csv_text = raw_csv.decode('utf-8-sig')
        is_draft = ('[MON KIỂM' in text_md) or ('[CẦN NGUỒN]' in text_md) or ('[MON KIỂM' in csv_text) or ('[CẦN NGUỒN]' in csv_text) or any(row['xac_minh'] == 'mon_kiem' for row in rows)
        # Ghi cờ draft vào frontmatter: nháp còn số chưa kiểm thì site ẩn (trang, hub, llms, PDF, nav)
        text_md = re.sub(r'^draft:.*\n', '', text_md, count=1, flags=re.M)
        text_md = text_md.replace('---\n', '---\ndraft: ' + ('true' if is_draft else 'false') + '\n', 1)
        pending.append((slug, text_md.encode('utf-8'), raw_csv, len(rows), is_draft))

    # Validate all input before modifying managed output. Never delete source files.
    previous = json.loads(MANIFEST.read_text()) if MANIFEST.exists() else []
    if not isinstance(previous, list) or any(not isinstance(s, str) or not SLUG.fullmatch(s) for s in previous):
        raise ValueError('Manifest đồng bộ không hợp lệ')
    COLLECTION.mkdir(parents=True, exist_ok=True)
    PUBLIC.mkdir(parents=True, exist_ok=True)
    active = {item[0] for item in pending}
    for slug in set(previous) - active:
        (COLLECTION / (slug + '.md')).unlink(missing_ok=True)
        for ext in ('.csv', '.pdf'):
            (PUBLIC / (slug + ext)).unlink(missing_ok=True)
        print(f'Gỡ bản đồng bộ cũ: {slug}')
    DRAFTS.mkdir(parents=True, exist_ok=True)
    for slug, md, dataset, count, is_draft in pending:
        md_target = COLLECTION / (slug + '.md')
        csv_target = (DRAFTS if is_draft else PUBLIC) / (slug + '.csv')
        changed = not md_target.exists() or md_target.read_bytes() != md or not csv_target.exists() or csv_target.read_bytes() != dataset
        if changed or is_draft:
            (PUBLIC / (slug + '.pdf')).unlink(missing_ok=True)
        if is_draft:
            (PUBLIC / (slug + '.csv')).unlink(missing_ok=True)
        else:
            (DRAFTS / (slug + '.csv')).unlink(missing_ok=True)
        md_target.write_bytes(md)
        csv_target.write_bytes(dataset)
        print(f"SYNC {slug}: Markdown + {count} dòng CSV" + (" · NHÁP (còn nhãn số chưa kiểm → ẩn khỏi site)" if is_draft else " · CÔNG BỐ"))
    MANIFEST.write_text(json.dumps(sorted(active), ensure_ascii=False, indent=2) + '\n')
    print(f'Đã đồng bộ {len(pending)} báo cáo' + (' (MẪU KIỂM THỬ)' if args.sample else ''))


if __name__ == '__main__':
    try:
        main()
    except (ValueError, OSError, csv.Error) as exc:
        print(f'SYNC FAIL: {exc}', file=sys.stderr)
        sys.exit(1)
