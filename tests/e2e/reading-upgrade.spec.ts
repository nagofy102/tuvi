import { test, expect } from '@playwright/test';

test('thematic reading prioritizes a concern without changing the chart and hides debug labels', async ({
  page,
}) => {
  await page.goto('/');
  await page.getByRole('button', { name: 'Khám phá lá số của tôi' }).click();
  const panel = page.locator('.interpretation-panel');
  await expect(panel.locator('.reading-theme')).toHaveCount(3);
  await expect(panel.locator('.reading-present')).toContainText('2026 · Bính Ngọ');
  await expect(panel.locator('.reading-present')).toContainText('chưa an sao Lưu niên');
  const original = await page.locator('.chart-center').innerText();
  await page.getByLabel('Bạn muốn bắt đầu từ điều gì?').selectOption('finance');
  await expect(panel.locator('.reading-theme').first()).toHaveAttribute('data-concern', 'finance');
  expect(await page.locator('.chart-center').innerText()).toBe(original);
  await page.locator('details').evaluateAll((nodes) => {
    for (const node of nodes) if (node instanceof HTMLDetailsElement) node.open = true;
  });
  const text = await page.locator('body').innerText();
  expect(text).not.toMatch(
    /iztro|reference-reading-|huyenvi-source-|iztro-default-|pair-support|principal-\d|Phiên bản nội dung|\bengine\b|revision\s+\d|\d+\.\d+\.\d+/iu,
  );
  await page.setViewportSize({ width: 320, height: 800 });
  expect(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth)).toBe(false);
  await page.goto('/phuong-phap');
  await page.locator('details').evaluateAll((nodes) => {
    for (const node of nodes) if (node instanceof HTMLDetailsElement) node.open = true;
  });
  expect(await page.locator('body').innerText()).not.toMatch(
    /iztro|reference-reading-|huyenvi-source-|pair-support|principal-\d|\bengine\b|revision\s+\d|\d+\.\d+\.\d+/iu,
  );
});
