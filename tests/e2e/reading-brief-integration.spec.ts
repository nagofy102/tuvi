import { expect, test } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

async function enterA1BirthData(page: import('@playwright/test').Page) {
  await page.getByLabel('Năm sinh', { exact: true }).fill('2000');
  await page.getByLabel('Tháng sinh', { exact: true }).selectOption('8');
  await page.getByLabel('Ngày sinh', { exact: true }).fill('29');
  await page.getByLabel('Giờ sinh', { exact: true }).fill('09:30');
}

test('renders the admitted A1 brief first, with expandable evidence and no data transfer', async ({
  page,
}) => {
  const transfers: string[] = [];
  page.on('request', (request) => {
    if (request.method() !== 'GET') transfers.push(request.url());
  });
  await page.setViewportSize({ width: 320, height: 800 });
  await page.goto('/');
  await enterA1BirthData(page);
  await page.getByRole('button', { name: 'Khám phá lá số của tôi' }).click();

  const brief = page.locator('.reading-brief');
  await expect(brief).toHaveAttribute('data-reading-origin', 'user-chart');
  await expect(brief).toHaveAttribute('data-reading-status', 'ready');
  await expect(brief.locator('h3')).toContainText(
    'công việc nổi bật ở mối liên hệ giữa trách nhiệm công khai',
  );
  await expect(brief.locator('.reading-brief-insight')).toHaveCount(1);
  await expect(brief).not.toContainText('Gợi ý thực hành');

  const evidence = brief.locator('.reading-brief-conclusion-evidence');
  await expect(evidence).not.toHaveAttribute('open');
  await evidence.locator(':scope > summary').focus();
  await page.keyboard.press('Enter');
  await expect(evidence).toHaveAttribute('open', '');
  await expect(evidence.locator('a[href*="oldid="]').first()).toBeVisible();
  expect(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth)).toBe(false);
  const accessibility = await new AxeBuilder({ page })
    .include('.reading-brief')
    .withTags(['wcag2a', 'wcag2aa', 'wcag21aa'])
    .analyze();
  expect(accessibility.violations).toEqual([]);
  expect(transfers).toEqual([]);
});

test('keeps demo labeling visible and fails closed for a distinct unsupported SignalSet', async ({
  page,
}) => {
  await page.goto('/');
  await page.getByRole('button', { name: 'Đọc luận giải lá số minh họa' }).click();
  const demo = page.locator('.reading-brief');
  await expect(demo).toHaveAttribute('data-reading-origin', 'demonstration');
  await expect(demo).toContainText(/Bản minh họa|Mẫu cấu trúc/u);

  await page.getByLabel('Năm sinh', { exact: true }).fill('1990');
  await page.getByLabel('Tháng sinh', { exact: true }).selectOption('5');
  await page.getByLabel('Ngày sinh', { exact: true }).fill('15');
  await page.getByLabel('Giờ sinh', { exact: true }).fill('14:00');
  await page.getByRole('button', { name: 'Khám phá lá số của tôi' }).click();
  const personal = page.locator('.reading-brief');
  await expect(personal).toHaveAttribute('data-reading-origin', 'user-chart');
  await expect(personal).toHaveAttribute('data-reading-status', 'insufficient-evidence');
  await expect(personal).toContainText('Chưa có kết luận riêng cho phần này');
  await expect(personal.locator('.reading-brief-insight')).toHaveCount(0);
  await expect(personal).not.toContainText('Bản minh họa');
});
