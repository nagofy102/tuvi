import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test('calculates a chart privately, switches calendar, and opens a keyboard-dismissable star explanation', async ({
  page,
}) => {
  const personalRequests: string[] = [];
  page.on('request', (request) => {
    if (request.method() === 'POST' || request.url().includes('Private Test'))
      personalRequests.push(request.url());
  });
  await page.goto('/');
  await page.screenshot({ path: 'test-results/desktop-home.png', fullPage: true });
  await page.getByLabel('Họ và tên').fill('Private Test');
  await page.getByRole('button', { name: 'Âm lịch', exact: true }).click();
  await expect(page.getByLabel('Ngày sinh', { exact: true })).toHaveValue('23');
  await page.getByRole('button', { name: 'Dương lịch', exact: true }).click();
  await expect(page.getByLabel('Ngày sinh', { exact: true })).toHaveValue('17');
  await page.getByRole('button', { name: 'Khám phá lá số của tôi' }).click();
  await expect(page.getByRole('status')).toContainText('Đã lập lá số');
  await expect(page.locator('.chart-center h3')).toHaveText('Private Test');
  await expect(page.locator('.palace-cell')).toHaveCount(12);
  await page.getByRole('button', { name: 'Giải thích sao Vũ Khúc tại cung Mệnh' }).click();
  await expect(page.getByRole('dialog')).toBeVisible();
  await page.keyboard.press('Escape');
  await expect(page.getByRole('dialog')).toHaveCount(0);
  expect(personalRequests).toEqual([]);
  expect(page.url()).not.toContain('1990');
  await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }));
  await page.screenshot({ path: 'test-results/desktop-result.png', fullPage: true });
});

test('rejects impossible input rather than retaining a new successful result', async ({ page }) => {
  await page.goto('/');
  await page.getByLabel('Tháng sinh', { exact: true }).selectOption('2');
  await page.getByLabel('Ngày sinh', { exact: true }).fill('30');
  await page.getByRole('button', { name: 'Khám phá lá số của tôi' }).click();
  await expect(page.locator('#form-error')).toContainText('không tồn tại');
  await expect(page.locator('.chart-toolbar')).toContainText('MINH HỌA');
  await expect(page.locator('.interpretation-panel')).toHaveCount(0);
});

test('generates sourced reference interpretations and refreshes them for a new chart', async ({
  page,
}) => {
  const transfers: string[] = [];
  page.on('request', (request) => {
    if (request.method() === 'POST') transfers.push(request.url());
  });
  await page.goto('/');
  const panel = page.locator('.interpretation-panel');
  await page.getByRole('button', { name: 'Đọc luận giải lá số minh họa' }).click();
  await expect(panel).toContainText('Bản đọc lá số minh họa');
  await page.getByRole('button', { name: 'Khám phá lá số của tôi' }).click();
  await expect(page.getByRole('status')).toContainText('Đã lập lá số');
  await expect(panel).not.toContainText('Bản đọc lá số minh họa');
  await expect(panel.locator('.interpretation-palace')).toHaveCount(12);
  const before = await panel.locator('.interpretation-facts').innerText();
  const menh = panel
    .locator('.interpretation-palace')
    .filter({ has: page.locator('summary', { hasText: /^Mệnh ·/ }) });
  await menh.locator(':scope > summary').focus();
  await page.keyboard.press('Enter');
  await expect(menh).toHaveAttribute('open', '');
  await expect(menh).toContainText('Vũ Khúc');
  await expect(menh).toContainText('Vì sao có các cung liên hệ?');
  await menh
    .locator('.interpretation-insight')
    .first()
    .getByText('Vì sao luận như vậy?', { exact: true })
    .click();
  await expect(menh.locator('a[href*="oldid=7913704"]').first()).toBeVisible();
  await panel.locator('.interpretation-header').scrollIntoViewIfNeeded();
  await page.screenshot({ path: 'test-results/interpretation-desktop.png' });
  await page.getByLabel('Giờ sinh', { exact: true }).fill('00:00');
  await page.getByRole('button', { name: 'Khám phá lá số của tôi' }).click();
  await expect(panel.locator('.interpretation-facts')).not.toHaveText(before);
  await panel.getByText('Phạm vi và khác biệt quy tắc', { exact: true }).click();
  await expect(panel).toContainText('không phải phản hồi từ AI trực tuyến');
  expect(transfers).toEqual([]);
});

test('supports the Vietnamese 1985 leap month and hides readings on an invalid leap input', async ({
  page,
}) => {
  await page.goto('/');
  await page.getByRole('button', { name: 'Khám phá lá số của tôi' }).click();
  await expect(page.locator('.interpretation-panel')).toBeVisible();
  await page.getByRole('button', { name: 'Âm lịch', exact: true }).click();
  await page.getByLabel('Năm sinh', { exact: true }).fill('1985');
  await page.getByLabel('Tháng sinh', { exact: true }).selectOption('2');
  await page.getByLabel('Ngày sinh', { exact: true }).fill('1');
  await page.getByRole('checkbox', { name: /tháng nhuận/i }).check();
  await page.getByRole('button', { name: 'Khám phá lá số của tôi' }).click();
  await expect(page.getByRole('status')).toContainText('Đã lập lá số');
  await expect(page.locator('.interpretation-panel')).toBeVisible();
  await expect(page.locator('#la-so')).toContainText('1985');
  await page.getByLabel('Năm sinh', { exact: true }).fill('1986');
  await page.getByRole('button', { name: 'Khám phá lá số của tôi' }).click();
  await expect(page.locator('#form-error')).toContainText('không tồn tại');
  await expect(page.locator('.interpretation-panel')).toHaveCount(0);
  await expect(page.locator('#la-so')).toContainText(
    'không phải kết quả của lần nhập chưa thành công',
  );
});

test('shows source-bounded group reasoning and publicly marks deferred rules', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('button', { name: 'Khám phá lá số của tôi' }).click();
  const panel = page.locator('.interpretation-panel');
  await expect(panel).toContainText('Đối chiếu Mệnh và cung an Thân');
  const palace = panel
    .locator('.interpretation-palace')
    .filter({ has: page.locator('[data-rule-id="pair-support"]') })
    .first();
  await palace.locator('summary').first().click();
  const group = palace.locator('[data-rule-id="pair-support"]');
  await group.getByText('Vì sao luận như vậy?', { exact: true }).click();
  await expect(group).toContainText('Có đủ hai thành viên');
  await expect(group).toContainText('Tả Phù');
  await expect(group).toContainText('辅弼为上相，辅佐紫微星');
  await expect(group).toContainText('kết nối biên tập');
  await expect(group.locator('a[href*="oldid=7913704"]').first()).toBeVisible();
  await expect(panel.locator('[data-rule-id="pair-assistance"]')).toHaveCount(0);
  await expect(panel.locator('[data-rule-id="formations-gate"]')).toHaveCount(0);
  await page.goto('/phuong-phap#ho-so-quy-tac');
  await expect(
    page.locator('.knowledge-rule > summary').filter({ hasText: /Khôi.*chưa kích hoạt/u }),
  ).toBeVisible();
  await expect(
    page.locator('.knowledge-rule > summary').filter({ hasText: /Giữ lựa chọn.*chưa thống nhất/u }),
  ).toBeVisible();
  await expect(page.getByText(/Không lấy kết quả bộ tính làm đáp án/u)).toBeVisible();
  await page.setViewportSize({ width: 320, height: 800 });
  expect(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth)).toBe(false);
});

test('mobile layout, large text and list view stay inside the viewport', async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 800 });
  await page.goto('/');
  await page.getByRole('button', { name: /^Cỡ chữ:/ }).click();
  await expect(page.locator('html')).toHaveAttribute('data-text-size', 'large');
  await page.getByRole('button', { name: 'Dạng danh sách dễ đọc' }).click();
  await expect(page.locator('.palace-list .palace-cell')).toHaveCount(12);
  await page.getByRole('button', { name: 'Đọc luận giải lá số minh họa' }).click();
  await page
    .locator('.interpretation-palace')
    .filter({ has: page.locator('summary', { hasText: /^Mệnh ·/ }) })
    .locator(':scope > summary')
    .click();
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth > innerWidth);
  expect(overflow).toBe(false);
  await page.screenshot({ path: 'test-results/mobile-home.png', fullPage: true });
});

test('landing page has no WCAG A/AA axe violations', async ({ page }) => {
  await page.goto('/');
  const report = await new AxeBuilder({ page })
    .withTags(['wcag2a', 'wcag2aa', 'wcag21aa'])
    .analyze();
  expect(report.violations).toEqual([]);
});

test('landing text meets enhanced AAA contrast thresholds', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('button', { name: 'Đọc luận giải lá số minh họa' }).click();
  await expect(page.locator('.interpretation-palace')).toHaveCount(12);
  await page.locator('.interpretation-panel details').evaluateAll((nodes) => {
    for (const node of nodes) if (node instanceof HTMLDetailsElement) node.open = true;
  });
  const report = await new AxeBuilder({ page }).withRules(['color-contrast-enhanced']).analyze();
  expect(report.violations).toEqual([]);
});

test('annual SEO metadata, valid JSON-LD, canonical and real OpenGraph PNG', async ({
  page,
  request,
}) => {
  const path = '/tu-vi-nam-2026/tuoi-binh-dan-1986-nam-mang';
  await page.goto(path);
  await expect(page).toHaveTitle(/Bính Dần 1986.*2026/);
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
    'href',
    `http://localhost:3000${path}`,
  );
  const data = JSON.parse(await page.locator('script[type="application/ld+json"]').innerText());
  expect(data['@graph'].map((entry: { '@type': string }) => entry['@type'])).toEqual([
    'Article',
    'BreadcrumbList',
    'FAQPage',
  ]);
  const imageUrl = await page.locator('meta[property="og:image"]').first().getAttribute('content');
  expect(imageUrl).toBeTruthy();
  const response = await request.get(imageUrl!);
  expect(response.status()).toBe(200);
  expect(response.headers()['content-type']).toContain('image/png');
  const buffer = await response.body();
  expect(buffer.subarray(1, 4).toString()).toBe('PNG');
  expect(buffer.readUInt32BE(16)).toBe(1200);
  expect(buffer.readUInt32BE(20)).toBe(630);
  await page.screenshot({ path: 'test-results/annual-page.png', fullPage: true });
});

test('unsupported annual paths return 404, on-demand female routes and public discovery work', async ({
  request,
}) => {
  expect((await request.get('/tu-vi-nam-2026/tuoi-unknown-1986-nam-mang')).status()).toBe(404);
  expect((await request.get('/tu-vi-nam-3000')).status()).toBe(404);
  expect((await request.get('/tu-vi-nam-2026/tuoi-giap-ty-1984-nu-mang')).status()).toBe(200);
  const sitemap = await (await request.get('/sitemap.xml')).text();
  expect(sitemap).toContain('tuoi-giap-ty-1984-nu-mang');
  expect(sitemap).not.toContain('/chia-se/');
  expect(await (await request.get('/robots.txt')).text()).toContain('Disallow: /api/');
});

test('calendar converter handles a genuine leap month and rejects a fake one', async ({ page }) => {
  await page.goto('/lich-am-duong');
  await page.getByRole('button', { name: 'Âm lịch', exact: true }).click();
  await page.getByLabel('Ngày', { exact: true }).fill('1');
  await page.getByLabel('Tháng', { exact: true }).selectOption('2');
  await page.getByLabel('Năm', { exact: true }).fill('2023');
  await page.getByRole('checkbox', { name: 'Tháng nhuận' }).check();
  await page.getByRole('button', { name: 'Chuyển đổi ngày' }).click();
  await expect(page.locator('.converter-result')).toContainText('22/03/2023');
  await page.getByLabel('Năm', { exact: true }).fill('2024');
  await expect(page.locator('.form-error')).toContainText('không tồn tại');
});
