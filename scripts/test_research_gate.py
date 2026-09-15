#!/usr/bin/env python3
"""Regression checks for the publishing gate; no browser or Python dependencies."""
from pathlib import Path
import subprocess
import sys
import tempfile
import unittest

SITE = Path(__file__).resolve().parents[1]
QC = SITE / 'scripts/qc.py'


class ResearchGateTests(unittest.TestCase):
    def check_gate(self, extension, content, expected, message='', nested=False, allow=False):
        with tempfile.TemporaryDirectory(prefix='test-research-', dir=SITE) as directory:
            root = Path(directory)
            target = root / 'nghien-cuu' / ('nested' if nested else '') / ('report' + extension)
            target.parent.mkdir(parents=True)
            target.write_text(content, encoding='utf-8')
            result = subprocess.run([sys.executable, str(QC), str(root)] + (['--allow-mon-kiem'] if allow else []),
                                    text=True, capture_output=True)
            self.assertEqual(result.returncode, expected, result.stdout + result.stderr)
            self.assertIn(message, result.stdout)

    def test_markdown_frontmatter_and_body(self):
        self.check_gate('.md', '---\nvalue: "[MON KIỂM: 10]"\n---\n[MON KIỂM: 20]', 1, '[MON KIỂM: 2 lần', nested=True)

    def test_missing_source_in_csv(self):
        self.check_gate('.csv', 'nguon\n[CẦN NGUỒN]\n', 1, '[CẦN NGUỒN]: 1 lần')

    def test_csv_status_without_visible_marker(self):
        self.check_gate('.csv', 'gia_tri,xac_minh\n38,mon_kiem\n', 1, 'xac_minh=mon_kiem: 1 dòng')

    def test_encoded_html_and_jsonld(self):
        self.check_gate('.html', '<h1>Báo cáo</h1><p class="answer-first">&#91;MON KIỂM: 12]</p><script type="application/ld+json">{"value":"[CẦN NGUỒN]"}</script>', 1, '[CẦN NGUỒN]: 1 lần')

    def test_allow_only_research_markers(self):
        self.check_gate('.md', '[MON KIỂM: 12] [CẦN NGUỒN]', 0, '0 FAIL', allow=True)

    def test_allow_does_not_bypass_other_qc(self):
        self.check_gate('.html', '<h1>Báo cáo</h1><p>[MON KIỂM: 12]</p>', 1, 'thiếu .answer-first', allow=True)

    def test_public_csv_passes(self):
        self.check_gate('.csv', 'gia_tri,xac_minh\n38,cong_khai\n', 0, '0 FAIL')

    def test_pdf_bytes_are_not_scanned(self):
        self.check_gate('.pdf', '[MON KIỂM: 12]', 0, '0 FAIL')

    def test_missing_build_is_not_success(self):
        with tempfile.TemporaryDirectory(prefix='test-research-', dir=SITE) as directory:
            result = subprocess.run([sys.executable, str(QC), str(Path(directory) / 'missing')], text=True, capture_output=True)
            self.assertNotEqual(result.returncode, 0)


if __name__ == '__main__':
    unittest.main()
