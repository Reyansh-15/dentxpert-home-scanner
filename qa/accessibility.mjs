import { chromium } from 'playwright';
import AxeBuilder from '@axe-core/playwright';
import { resolve } from 'node:path';
import { pathToFileURL } from 'node:url';
import { mkdir, writeFile } from 'node:fs/promises';

const slugs = ['home','explore','learn','discover','command-center','technology','pricing','faq','about'];
const widths = [375, 1440];
const report = { checkedAt: new Date().toISOString(), pages: [], violations: [] };
await mkdir('evidence', { recursive: true });
const browser = await chromium.launch({ headless: true });
try {
  for (const width of widths) {
    const page = await browser.newPage({ viewport: { width, height: 900 }, reducedMotion: 'reduce' });
    try {
      for (const slug of slugs) {
        const url = pathToFileURL(resolve('../website2', slug + '.html')).href;
        await page.goto(url, { waitUntil: 'load' });
        const result = await new AxeBuilder({ page }).withTags(['wcag2a','wcag2aa','wcag21a','wcag21aa']).analyze();
        report.pages.push({ slug, width, violationCount: result.violations.length });
        for (const violation of result.violations) {
          report.violations.push({ slug, width, id: violation.id, impact: violation.impact, description: violation.description, nodes: violation.nodes.map(node => ({ target: node.target, failureSummary: node.failureSummary })) });
        }
      }
    } finally { await page.close(); }
  }
} finally { await browser.close(); }
await writeFile('evidence/axe-report.json', JSON.stringify(report, null, 2));
console.log('Axe audited', report.pages.length, 'page/viewport combinations;', report.violations.length, 'violations.');
if (report.violations.length) process.exitCode = 1;
