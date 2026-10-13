import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test('mobile starts with the form and offers direct reading, palace and profile navigation', async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/');
  const nameTop = await page
    .getByLabel('Họ và tên')
    .evaluate((node) => node.getBoundingClientRect().top);
  expect(nameTop).toBeLessThan(844);
  await page.screenshot({ path: 'test-results/redesign-mobile-first-screen.png' });
  await page.getByRole('button', { name: 'Khám phá lá số của tôi' }).click();
  const navigation = page.getByRole('navigation', { name: 'Đi nhanh trong kết quả' });
  await expect(navigation).toBeVisible();
  await navigation.getByRole('link', { name: 'Bản đọc của bạn' }).click();
  await expect(page.locator('#ban-doc')).toBeInViewport();
  await expect(page.getByRole('heading', { name: 'Bản đọc dành cho bạn' })).toBeVisible();
  await page.screenshot({ path: 'test-results/redesign-mobile-reading.png' });
  await navigation.getByRole('link', { name: '12 cung', exact: true }).click();
  await expect(page.locator('#ban-do-12-cung')).toHaveAttribute('open', '');
  await page.getByRole('button', { name: 'Khám phá cung Phu Thê', exact: true }).click();
  const insight = page.getByRole('complementary', { name: 'Giải thích cung được chọn' });
  await expect(insight).toContainText('CUNG PHU THÊ');
  await expect(insight).toBeFocused();
  await expect(insight).toBeInViewport();
  await insight.getByText('Hiểu các ký hiệu trong lá số', { exact: true }).click();
  await expect(insight).toContainText('không phải chẩn đoán sức khỏe');
  await insight.getByText('Tất cả sao trong cung', { exact: true }).click();
  expect(await insight.locator('.all-stars li').count()).toBeGreaterThan(0);
  await page.screenshot({ path: 'test-results/redesign-mobile-palace.png' });
  await navigation.getByRole('link', { name: 'Lưu hồ sơ' }).click();
  await expect(page.locator('.local-profiles')).toBeInViewport();
  await expect(
    page.getByLabel('Tôi đồng ý lưu hồ sơ đang xem trên trình duyệt này'),
  ).not.toBeChecked();
});

test('palace chooser works by keyboard, at large text, and keeps all twelve palaces', async ({
  page,
}) => {
  await page.setViewportSize({ width: 320, height: 800 });
  await page.goto('/');
  await page.getByRole('button', { name: /^Cỡ chữ:/ }).click();
  await page.getByRole('button', { name: /^Cỡ chữ:/ }).click();
  const chooser = page.getByRole('navigation', { name: 'Chọn cung để khám phá' });
  await expect(chooser.locator('button')).toHaveCount(12);
  for (const name of ['Tài Bạch', 'Quan Lộc', 'Mệnh']) {
    const button = chooser.getByRole('button', { name: `Khám phá cung ${name}`, exact: true });
    await button.focus();
    await page.keyboard.press('Enter');
    await expect(button).toHaveAttribute('aria-pressed', 'true');
    await expect(page.locator('.palace-insight')).toContainText(
      `CUNG ${name.toLocaleUpperCase('vi')}`,
    );
  }
  await expect(page.locator('.palace-cell')).toHaveCount(12);
  expect(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth)).toBe(false);
  const targetSizes = await chooser
    .locator('button')
    .evaluateAll((nodes) => nodes.map((node) => node.getBoundingClientRect().height));
  expect(targetSizes.every((height) => height >= 48)).toBe(true);
  await page.screenshot({ path: 'test-results/redesign-mobile-large-text.png' });
  const report = await new AxeBuilder({ page })
    .withTags(['wcag2a', 'wcag2aa', 'wcag21aa'])
    .analyze();
  expect(report.violations).toEqual([]);
});
