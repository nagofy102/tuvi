import { test, expect } from '@playwright/test';

test('retains legacy lunar input without recalculating or deleting it', async ({ page }) => {
  const key = 'huyenvi:consented-profiles:v1';
  const raw = JSON.stringify({
    version: 1,
    profiles: [
      {
        id: 'legacy-case',
        name: 'Hồ sơ cũ',
        input: {
          calendar: 'lunar',
          date: { year: 1985, month: 2, day: 1, isLeapMonth: true },
          gender: 'male',
          time: '09:30',
          leapPolicy: 'split_at_15',
          ziPolicy: 'civil_midnight',
        },
      },
    ],
  });
  await page.addInitScript(({ key, raw }) => localStorage.setItem(key, raw), { key, raw });
  await page.goto('/');
  await expect(page.locator('.local-profiles')).toContainText('Dữ liệu cũ được giữ nguyên');
  await expect(page.getByRole('button', { name: 'Mở hồ sơ Hồ sơ cũ' })).toHaveCount(0);
  await expect(page.locator('.interpretation-panel')).toHaveCount(0);
  expect(await page.evaluate((key) => localStorage.getItem(key), key)).toBe(raw);
  expect(
    await page.evaluate(() => localStorage.getItem('huyenvi:consented-profiles:v2')),
  ).toBeNull();
  page.once('dialog', (dialog) => dialog.dismiss());
  await page.getByRole('button', { name: 'Xóa hồ sơ theo lịch cũ' }).click();
  expect(await page.evaluate((key) => localStorage.getItem(key), key)).toBe(raw);
  page.once('dialog', (dialog) => dialog.accept());
  await page.getByRole('button', { name: 'Xóa hồ sơ theo lịch cũ' }).click();
  expect(await page.evaluate((key) => localStorage.getItem(key), key)).toBeNull();
});

test('date-only lookup uses the Chinese calendar and the form has one fixed profile', async ({
  page,
}) => {
  await page.goto('/');
  await page.getByLabel('Năm sinh', { exact: true }).fill('1985');
  await page.getByLabel('Tháng sinh', { exact: true }).selectOption('1');
  await page.getByLabel('Ngày sinh', { exact: true }).fill('21');
  await page.getByLabel('Chưa biết giờ sinh', { exact: true }).check();
  await page.getByRole('button', { name: 'Xem thông tin không cần giờ sinh' }).click();
  await expect(page.locator('.unknown-time-reading')).toContainText('Giáp Tý');
  await expect(page.locator('.unknown-time-reading')).toContainText('21/01/1985');
  await expect(page.locator('.chart-layout')).toHaveCount(0);
  await expect(page.locator('.reading-theme')).toHaveCount(0);
  await expect(page.getByLabel('Quy ước tháng nhuận', { exact: true })).toHaveCount(0);
  await expect(page.getByLabel('Quy ước giờ Tý', { exact: true })).toHaveCount(0);
});
