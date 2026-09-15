#!/usr/bin/env python3
"""Print built research reports with Chrome, then copy PDFs to dist and public.

Run after astro build. CHROME_BIN can override the default macOS executable.
Local assets are embedded into a temporary HTML copy so file:// printing works
with Astro's root-relative URLs, without a server or network access.
"""
import base64
import html
import mimetypes
import os
from pathlib import Path
import re
import shutil
import subprocess
import sys
import tempfile
from urllib.parse import unquote, urlsplit

SITE = Path(__file__).resolve().parents[1]
DIST = SITE / 'dist'
PUBLIC = SITE / 'public/nghien-cuu'
CHROME = os.environ.get('CHROME_BIN', '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome')


def asset(path, base=DIST):
    parsed = urlsplit(html.unescape(path))
    if parsed.scheme or parsed.netloc or not parsed.path:
        return None
    target = ((DIST / unquote(parsed.path).lstrip('/')) if parsed.path.startswith('/') else (base / unquote(parsed.path))).resolve()
    if not target.is_relative_to(DIST.resolve()) or not target.is_file():
        raise ValueError(f'Thiếu tài nguyên local: {path}')
    return target


def data_uri(path):
    mime = mimetypes.guess_type(path.name)[0] or 'application/octet-stream'
    return 'data:' + mime + ';base64,' + base64.b64encode(path.read_bytes()).decode()


def inline_css(css, base):
    def replace(match):
        url = match.group(1).strip().strip('\"\'')
        if url.startswith(('#', 'data:')):
            return match.group(0)
        target = asset(url, base)
        if target is None:
            raise ValueError(f'CSS nghiên cứu cần tài nguyên offline: {url}')
        return 'url("' + data_uri(target) + '")'
    return re.sub(r'url\(([^)]+)\)', replace, css)


def printable_html(source):
    text = source.read_text(encoding='utf-8')
    # No app scripts/network in print copies. HTML and build-time table wrappers
    # already contain all report content; PDF never depends on hydration.
    text = re.sub(r'<script\b[^>]*>[\s\S]*?</script>', '', text, flags=re.I)
    def replace_link(match):
        tag = match.group(0)
        href = re.search(r'\bhref=["\']([^"\']+)["\']', tag)
        if re.search(r'\brel=["\']stylesheet["\']', tag) and href:
            target = asset(href.group(1), source.parent)
            if target:
                return '<style>' + inline_css(target.read_text(), target.parent) + '</style>'
        return ''
    text = re.sub(r'<link\b[^>]*>', replace_link, text, flags=re.I)
    text = re.sub(r'<style([^>]*)>([\s\S]*?)</style>', lambda m: '<style' + m[1] + '>' + inline_css(m[2], source.parent) + '</style>', text)
    def replace_src(match):
        target = asset(match.group(2), source.parent)
        if target is None:
            raise ValueError(f'Ảnh nghiên cứu cần bản local để in offline: {match.group(2)}')
        return match.group(1) + '="' + data_uri(target) + '"'
    text = re.sub(r'\b(src|poster)=["\']([^"\']+)["\']', replace_src, text)
    # Keep root-relative hyperlinks useful when reading the PDF offline.
    text = re.sub(r'\bhref=["\'](/(?!/)[^"\']*)["\']', r'href="https://monapay.vn\1"', text)
    return text


def main():
    if not DIST.is_dir():
        raise ValueError('Chưa có dist; chạy npm run build trước')
    destination = DIST / 'nghien-cuu'
    destination.mkdir(exist_ok=True)
    # Site uses build.format=file. Keep its canonical /nghien-cuu URL while
    # also supplying the directory index requested for offline/static readers.
    hub = DIST / 'nghien-cuu.html'
    if hub.exists():
        shutil.copy2(hub, destination / 'index.html')
    reports = sorted((SITE / 'src/content/nghien-cuu').glob('*.md'))
    if not reports:
        print('PDF: không có báo cáo; bỏ qua')
        return
    if not Path(CHROME).is_file() and not shutil.which(CHROME):
        raise ValueError('Không tìm thấy Chrome; đặt CHROME_BIN tới Chrome/Chromium')
    PUBLIC.mkdir(parents=True, exist_ok=True)
    for report in reports:
        slug = report.stem
        if re.search(r'^draft:\s*true\s*$', report.read_text(encoding='utf-8')[:2000], re.M):
            print(f'PDF {slug}: bản nháp, bỏ qua')
            continue
        candidates = [destination / slug / 'index.html', destination / (slug + '.html')]
        source = next((p for p in candidates if p.is_file()), None)
        if source is None:
            raise ValueError(f'{slug}: thiếu HTML đã build')
        if not (destination / (slug + '.csv')).is_file():
            raise ValueError(f'{slug}: thiếu CSV trong dist; chạy sync rồi build lại')
        with tempfile.TemporaryDirectory(prefix='research-pdf-', dir=SITE) as tmp:
            work = Path(tmp)
            page, pdf = work / 'report.html', work / 'report.pdf'
            page.write_text(printable_html(source), encoding='utf-8')
            command = [CHROME, '--headless=new', '--disable-gpu', '--no-pdf-header-footer',
                       '--print-to-pdf=' + str(pdf), page.as_uri()]
            result = subprocess.run(command, capture_output=True, text=True, timeout=180)
            if result.returncode or not pdf.is_file() or pdf.stat().st_size < 1000 or not pdf.read_bytes().startswith(b'%PDF-'):
                raise ValueError(f'{slug}: Chrome không tạo PDF hợp lệ (exit {result.returncode})\n{result.stderr[-2000:] or "Chrome không ghi stderr; kiểm tra quyền chạy tiến trình headless của môi trường."}')
            shutil.copy2(pdf, destination / (slug + '.pdf'))
            shutil.copy2(pdf, PUBLIC / (slug + '.pdf'))
            print(f'PDF {slug}: {pdf.stat().st_size:,} bytes → dist + public')


if __name__ == '__main__':
    try:
        main()
    except (ValueError, OSError, subprocess.TimeoutExpired) as exc:
        print(f'PDF FAIL: {exc}', file=sys.stderr)
        sys.exit(1)
