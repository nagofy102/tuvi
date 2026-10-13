import { test, expect } from '@playwright/test';
const key = 'huyenvi:consented-profiles:v2';
test('multiple profiles stay separate and corrupt local data can be cleared without breaking lookup', async ({
  page,
}) => {
  await page.addInitScript((key) => {
    localStorage.setItem(key, '{broken-json');
  }, key);
  await page.goto('/');
  await expect(page.locator('.local-profiles')).toContainText('Không thể đọc hồ sơ');
  page.on('dialog', (dialog) => dialog.accept());
  await page.getByRole('button', { name: 'Xóa tất cả hồ sơ đã lưu' }).click();
  for (const [name, year] of [
    ['Hồ sơ A', '1990'],
    ['Hồ sơ B', '2000'],
  ]) {
    await page.getByLabel('Họ và tên').fill(name);
    await page.getByLabel('Năm sinh', { exact: true }).fill(year);
    await page.getByRole('button', { name: 'Khám phá lá số của tôi' }).click();
    await page.getByLabel('Tôi đồng ý lưu hồ sơ đang xem trên trình duyệt này').check();
    await page.getByRole('button', { name: 'Lưu hồ sơ đang xem' }).click();
  }
  await expect(page.getByRole('button', { name: 'Mở hồ sơ Hồ sơ A', exact: true })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Mở hồ sơ Hồ sơ B', exact: true })).toBeVisible();
  await page.getByRole('button', { name: 'Mở hồ sơ Hồ sơ A', exact: true }).click();
  await expect(page.getByLabel('Năm sinh', { exact: true })).toHaveValue('1990');
  await page.getByRole('button', { name: 'Mở hồ sơ Hồ sơ B', exact: true }).click();
  await expect(page.getByLabel('Năm sinh', { exact: true })).toHaveValue('2000');
  await page.getByRole('button', { name: 'Xóa tất cả hồ sơ đã lưu' }).click();
  expect(await page.evaluate((key) => localStorage.getItem(key), key)).toBeNull();
});
test('unknown time followed by invalid input never relabels the previous chart', async ({
  page,
}) => {
  await page.goto('/');
  await page.getByLabel('Họ và tên').fill('Hồ sơ đã lập');
  await page.getByRole('button', { name: 'Khám phá lá số của tôi' }).click();
  await page.getByLabel('Họ và tên').fill('Hồ sơ chưa biết giờ');
  await page.getByLabel('Chưa biết giờ sinh', { exact: true }).check();
  await page.getByRole('button', { name: 'Xem thông tin không cần giờ sinh' }).click();
  await expect(page.locator('.unknown-time-reading')).toBeVisible();
  await page.getByLabel('Năm sinh', { exact: true }).fill('2050');
  await page.getByRole('button', { name: 'Xem thông tin không cần giờ sinh' }).click();
  await expect(page.locator('#form-error')).toContainText('tương lai');
  await expect(page.locator('.unknown-time-reading')).toHaveCount(0);
  await expect(page.locator('.chart-center h3')).toHaveText('Hồ sơ đã lập');
  await expect(page.getByRole('button', { name: 'Lưu hồ sơ đang xem' })).toHaveCount(0);
});
test('requires consent, restores input on request after reload and deletes local profiles', async ({
  page,
}) => {
  const posts: string[] = [];
  page.on('request', (request) => {
    if (request.method() === 'POST') posts.push(request.url());
  });
  await page.goto('/');
  await page.getByLabel('Họ và tên').fill('Hồ sơ kiểm thử');
  await page.getByRole('button', { name: 'Khám phá lá số của tôi' }).click();
  await expect(page.locator('.interpretation-panel')).toBeVisible();
  expect(await page.evaluate((key) => localStorage.getItem(key), key)).toBeNull();
  await expect(page.getByRole('button', { name: 'Lưu hồ sơ đang xem' })).toBeDisabled();
  await page.getByLabel('Tôi đồng ý lưu hồ sơ đang xem trên trình duyệt này').check();
  await page.getByRole('button', { name: 'Lưu hồ sơ đang xem' }).click();
  await expect(page.getByRole('button', { name: 'Mở hồ sơ Hồ sơ kiểm thử' })).toBeVisible();
  await expect(
    page.getByLabel('Tôi đồng ý lưu hồ sơ đang xem trên trình duyệt này'),
  ).not.toBeChecked();
  await page.reload();
  await expect(page.locator('.interpretation-panel')).toHaveCount(0);
  await page.getByRole('button', { name: 'Mở hồ sơ Hồ sơ kiểm thử' }).click();
  await expect(page.getByLabel('Họ và tên')).toHaveValue('Hồ sơ kiểm thử');
  await expect(page.locator('.interpretation-panel')).toBeVisible();
  page.on('dialog', (dialog) => dialog.accept());
  await page.getByRole('button', { name: 'Xóa hồ sơ Hồ sơ kiểm thử' }).click();
  await expect(page.getByRole('button', { name: 'Mở hồ sơ Hồ sơ kiểm thử' })).toHaveCount(0);
  expect(await page.evaluate((key) => localStorage.getItem(key), key)).toBeNull();
  expect(posts).toEqual([]);
});
test('unknown time never creates a chart, saves null and can later be supplied', async ({
  page,
}) => {
  await page.goto('/');
  await page.getByLabel('Chưa biết giờ sinh', { exact: true }).check();
  await expect(page.getByLabel('Giờ sinh', { exact: true })).toBeDisabled();
  await page.getByRole('button', { name: 'Xem thông tin không cần giờ sinh' }).click();
  await expect(page.locator('.unknown-time-reading')).toContainText(
    'Chưa biết giờ sinh nên không xác định Mệnh',
  );
  await expect(page.locator('.chart-layout')).toHaveCount(0);
  await expect(page.locator('.reading-theme')).toHaveCount(0);
  await page.getByLabel('Tôi đồng ý lưu hồ sơ đang xem trên trình duyệt này').check();
  await page.getByRole('button', { name: 'Lưu hồ sơ đang xem' }).click();
  expect(
    await page.evaluate(
      (key) => JSON.parse(localStorage.getItem(key)!).profiles[0].input.time,
      key,
    ),
  ).toBeNull();
  await page.reload();
  await page.getByRole('button', { name: 'Mở hồ sơ không đặt tên' }).click();
  await expect(page.getByLabel('Chưa biết giờ sinh', { exact: true })).toBeChecked();
  await expect(page.locator('.chart-layout')).toHaveCount(0);
  await page.getByLabel('Chưa biết giờ sinh', { exact: true }).uncheck();
  await page.getByLabel('Giờ sinh', { exact: true }).fill('14:00');
  await page.getByRole('button', { name: 'Khám phá lá số của tôi' }).click();
  await expect(page.locator('.reading-theme')).toHaveCount(3);
  await expect(page.locator('.unknown-time-reading')).toHaveCount(0);
});
test('future input hides stale reading and disables saving, storage failure is honest', async ({
  page,
}) => {
  await page.goto('/');
  await page.getByRole('button', { name: 'Khám phá lá số của tôi' }).click();
  await page.getByLabel('Năm sinh', { exact: true }).fill('2050');
  await page.getByRole('button', { name: 'Khám phá lá số của tôi' }).click();
  await expect(page.locator('#form-error')).toContainText('tương lai');
  await expect(page.locator('.interpretation-panel')).toHaveCount(0);
  await expect(page.getByRole('button', { name: 'Lưu hồ sơ đang xem' })).toHaveCount(0);
  await page.getByLabel('Năm sinh', { exact: true }).fill('1990');
  await page.getByRole('button', { name: 'Khám phá lá số của tôi' }).click();
  await page.evaluate(() => {
    Storage.prototype.setItem = () => {
      throw new DOMException('Blocked', 'SecurityError');
    };
  });
  await page.getByLabel('Tôi đồng ý lưu hồ sơ đang xem trên trình duyệt này').check();
  await page.getByRole('button', { name: 'Lưu hồ sơ đang xem' }).click();
  await expect(page.locator('.local-profiles')).toContainText('hồ sơ chưa được lưu');
});
test('mobile shows a short reading before the collapsed chart and has shallow reasoning', async ({
  page,
}) => {
  await page.setViewportSize({ width: 320, height: 800 });
  await page.goto('/');
  await page.getByRole('button', { name: /^Cỡ chữ:/ }).click();
  await page.getByRole('button', { name: /^Cỡ chữ:/ }).click();
  await page.getByRole('button', { name: 'Khám phá lá số của tôi' }).click();
  const panel = page.locator('.interpretation-panel');
  await expect(panel).toBeVisible();
  await expect(page.locator('.full-chart')).not.toHaveAttribute('open');
  expect(await panel.evaluate((node) => node.getBoundingClientRect().height)).toBeLessThan(6000);
  expect(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth)).toBe(false);
  await panel
    .locator('.reading-theme')
    .first()
    .getByText('Vì sao luận như vậy?', { exact: true })
    .click();
  await expect(
    panel.locator('.reading-theme').first().locator('a[href*="oldid="]').first(),
  ).toBeVisible();
  await expect(
    panel.locator('.reading-theme').first().locator('.interpretation-insight details'),
  ).toHaveCount(0);
  await page.getByText('Xem lá số 12 cung', { exact: true }).click();
  await expect(page.locator('.palace-list .palace-cell')).toHaveCount(12);
  await page.screenshot({ path: 'test-results/pm-mobile-reading.png' });
});
