import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test('star explanation is centered, readable and returns focus after dismissal', async ({
  page,
}) => {
  await page.goto('/');
  const trigger = page.getByRole('button', { name: 'Giải thích sao Vũ Khúc tại cung Mệnh' });
  await trigger.click();
  const dialog = page.getByRole('dialog');
  await expect(dialog).toBeVisible();
  await expect(dialog).not.toContainText(/iztro|reference-reading|\d+\.\d+\.\d+/u);
  const bounds = await dialog.boundingBox();
  const viewport = page.viewportSize();
  expect(bounds).not.toBeNull();
  expect(viewport).not.toBeNull();
  if (!bounds || !viewport) throw new Error('Dialog or viewport geometry unavailable');
  expect(Math.abs(bounds.x + bounds.width / 2 - viewport.width / 2)).toBeLessThan(2);
  expect(Math.abs(bounds.y + bounds.height / 2 - viewport.height / 2)).toBeLessThan(2);
  expect(await page.locator('body').evaluate((element) => element.style.overflow)).toBe('hidden');
  await page.screenshot({ path: 'test-results/star-dialog-luxury-desktop.png' });
  const report = await new AxeBuilder({ page })
    .withRules(['color-contrast', 'color-contrast-enhanced', 'aria-dialog-name'])
    .analyze();
  expect(report.violations).toEqual([]);
  await page.keyboard.press('Escape');
  await expect(dialog).toHaveCount(0);
  await expect(trigger).toBeFocused();
  expect(await page.locator('body').evaluate((element) => element.style.overflow)).toBe('');
  await trigger.click();
  await page.mouse.click(4, 4);
  await expect(dialog).toHaveCount(0);
  await expect(trigger).toBeFocused();
});

test('imperial chart and dialog stay usable at 320px with extra-large text', async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 800 });
  await page.goto('/');
  await page.getByRole('button', { name: /^Cỡ chữ:/u }).click();
  await page.getByRole('button', { name: /^Cỡ chữ:/u }).click();
  await expect(page.locator('html')).toHaveAttribute('data-text-size', 'extra-large');
  await page.getByRole('button', { name: 'Dạng danh sách dễ đọc' }).click();
  await expect(page.locator('.palace-list .palace-cell')).toHaveCount(12);
  await expect(page.locator('.palace-cell').first()).toHaveCSS(
    'background-color',
    'rgb(23, 36, 58)',
  );
  expect(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth)).toBe(false);
  await page.getByRole('button', { name: 'Giải thích sao Vũ Khúc tại cung Mệnh' }).click();
  const dialog = page.getByRole('dialog');
  const bounds = await dialog.boundingBox();
  if (!bounds) throw new Error('Dialog geometry unavailable');
  expect(bounds.x).toBeGreaterThanOrEqual(0);
  expect(bounds.x + bounds.width).toBeLessThanOrEqual(320);
  expect(bounds.y).toBeGreaterThanOrEqual(0);
  expect(bounds.y + bounds.height).toBeLessThanOrEqual(800);
  expect(await dialog.evaluate((element) => element.scrollWidth > element.clientWidth)).toBe(false);
  await page.screenshot({ path: 'test-results/star-dialog-luxury-mobile.png' });
  await page.getByRole('button', { name: 'Đóng cửa sổ giải thích' }).click();
  await expect(dialog).toHaveCount(0);
  const report = await new AxeBuilder({ page })
    .include('.chart-layout')
    .withRules(['color-contrast', 'color-contrast-enhanced'])
    .analyze();
  expect(report.violations).toEqual([]);
});
