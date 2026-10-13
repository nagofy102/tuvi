import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test('conditional readings disclose applicability, sources and limits without sending birth data', async ({
  page,
}) => {
  const transfers: string[] = [];
  page.on('request', (request) => {
    const url = new URL(request.url());
    if (
      request.method() !== 'GET' ||
      url.origin !== 'http://127.0.0.1:3000' ||
      request.url().includes('Synthesis Privacy')
    ) {
      transfers.push(request.url());
    }
  });
  await page.goto('/');
  await page.getByLabel('Họ và tên').fill('Synthesis Privacy');
  await page.getByRole('button', { name: 'Khám phá lá số của tôi' }).click();
  const panel = page.locator('.interpretation-panel');
  await expect(panel.locator('.reading-theme')).toHaveCount(3);
  const chartBefore = await page.locator('.chart-center').innerText();
  for (const concern of ['career', 'finance', 'relationship']) {
    await page.getByLabel('Bạn muốn bắt đầu từ điều gì?').selectOption(concern);
    const theme = panel.locator('.reading-theme').first();
    await expect(theme).toHaveAttribute('data-concern', concern);
    const conditions = theme.locator('.reading-claims');
    await expect(conditions).not.toHaveAttribute('open');
    await conditions.getByText('Điều kiện của mạch luận', { exact: true }).click();
    const claims = conditions.locator('.reading-claim');
    expect(await claims.count()).toBeGreaterThan(0);
    for (const claim of await claims.all()) {
      await expect(claim).toHaveAttribute('data-claim-state', /^(supported|mixed|insufficient)$/);
      const state = await claim.getAttribute('data-claim-state');
      const status =
        state === 'supported'
          ? 'Đủ điều kiện biên tập'
          : state === 'mixed'
            ? 'Cần đối chiếu tín hiệu trái chiều'
            : 'Chưa đủ điều kiện';
      await expect(claim).toContainText(status);
      await expect(claim.locator('h4').first()).not.toBeEmpty();
      if (state === 'insufficient') {
        await expect(claim).toContainText('không suy ra một điểm yếu');
        await expect(claim).not.toContainText('Tự kiểm chứng:');
      }
      await claim.getByText('Vì sao có đánh giá này?', { exact: true }).click();
      const reasons = claim.locator('.interpretation-reason');
      await expect(reasons).toHaveAttribute('open', '');
      await expect(reasons.locator('a[href*="oldid="]').first()).toBeVisible();
      expect(await reasons.locator('li').count()).toBeGreaterThan(0);
    }
    expect(await page.locator('.chart-center').innerText()).toBe(chartBefore);
  }
  expect(transfers).toEqual([]);
  expect(page.url()).not.toContain('1990');
  expect(page.url()).not.toContain('Synthesis');
  expect(
    await page.evaluate(() => localStorage.getItem('huyenvi:consented-profiles:v1')),
  ).toBeNull();
});

test('conditional details are keyboard accessible at mobile extra-large text without bloating the initial read', async ({
  page,
}) => {
  await page.setViewportSize({ width: 320, height: 800 });
  await page.goto('/');
  await page.getByRole('button', { name: /^Cỡ chữ:/ }).click();
  await page.getByRole('button', { name: /^Cỡ chữ:/ }).click();
  await page.getByRole('button', { name: 'Khám phá lá số của tôi' }).click();
  const panel = page.locator('.interpretation-panel');
  await expect(panel.locator('.reading-claims')).toHaveCount(3);
  expect(await panel.evaluate((node) => node.getBoundingClientRect().height)).toBeLessThan(6000);
  const conditions = panel.locator('.reading-theme').first().locator('.reading-claims');
  await conditions.locator(':scope > summary').focus();
  await page.keyboard.press('Enter');
  await expect(conditions).toHaveAttribute('open', '');
  const reason = conditions.locator('.reading-claim').first().locator('.interpretation-reason');
  await reason.locator(':scope > summary').focus();
  await page.keyboard.press('Enter');
  await expect(reason).toHaveAttribute('open', '');
  await expect(reason.locator('a[href*="oldid="]').first()).toBeVisible();
  expect(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth)).toBe(false);
  const result = await new AxeBuilder({ page })
    .include('.interpretation-panel')
    .withTags(['wcag2a', 'wcag2aa', 'wcag21aa'])
    .analyze();
  expect(result.violations).toEqual([]);
  await page.screenshot({ path: 'test-results/reading-synthesis-mobile.png' });
});

test('unknown birth time and invalid dates never retain conditional star readings', async ({
  page,
}) => {
  await page.goto('/');
  await page.getByRole('button', { name: 'Khám phá lá số của tôi' }).click();
  await expect(page.locator('.reading-claims')).toHaveCount(3);
  await page.getByLabel('Chưa biết giờ sinh', { exact: true }).check();
  await page.getByRole('button', { name: 'Xem thông tin không cần giờ sinh' }).click();
  await expect(page.locator('.unknown-time-reading')).toBeVisible();
  await expect(page.locator('.reading-claim')).toHaveCount(0);
  await expect(page.locator('#ban-doc')).toHaveCount(0);
  await expect(page.locator('.reading-theme')).toHaveCount(0);
  await page.getByLabel('Chưa biết giờ sinh', { exact: true }).uncheck();
  await page.getByLabel('Năm sinh', { exact: true }).fill('2050');
  await page.getByRole('button', { name: 'Khám phá lá số của tôi' }).click();
  await expect(page.locator('#form-error')).toContainText('tương lai');
  await expect(page.locator('.reading-claim')).toHaveCount(0);
  await expect(page.locator('.interpretation-panel')).toHaveCount(0);
});
