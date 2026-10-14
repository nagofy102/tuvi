import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test('career separates interpretation, traceable reasons and optional practice without transmitting birth data', async ({
  page,
}) => {
  const transfers: string[] = [];
  page.on('request', (request) => {
    const url = new URL(request.url());
    if (
      request.method() !== 'GET' ||
      url.origin !== 'http://127.0.0.1:3000' ||
      /Career Privacy|2000-08-29/u.test(request.url())
    )
      transfers.push(request.url());
  });
  await page.goto('/');
  await page.getByLabel('Họ và tên').fill('Career Privacy');
  await page.getByRole('button', { name: 'Khám phá lá số của tôi' }).click();
  const career = page.locator('.reading-theme[data-concern="career"]');
  await expect(career).toHaveAttribute(
    'data-career-reading-state',
    /^(direct-career|no-direct-career|insufficient-context)$/,
  );
  const body = career.locator('.career-narrative');
  await expect(body).toBeVisible();
  expect(await body.locator('p').count()).toBeGreaterThanOrEqual(2);
  await expect(body).not.toContainText(
    /chốt ba dòng|bỏ qua bài tập|người giao việc|Tự kiểm chứng:/u,
  );
  const why = career.locator('.career-reason');
  const practice = career.locator('.career-practice');
  await expect(why).not.toHaveAttribute('open');
  await expect(practice).not.toHaveAttribute('open');
  await expect(
    career.locator('.reading-claims, .reading-exercise:not(.career-practice)'),
  ).toHaveCount(0);
  await expect(practice).toHaveCount(1);
  await why.getByText('Vì sao luận như vậy?', { exact: true }).click();
  await expect(why.locator('a[href*="oldid="]').first()).toBeVisible();
  await expect(why).toContainText('Quan Lộc');
  await practice.locator(':scope > summary').click();
  await expect(practice).toHaveAttribute('open', '');
  expect(await practice.locator('p').count()).toBeGreaterThanOrEqual(2);
  expect(await career.innerText()).not.toMatch(
    /reference-reading-|career-\w+-v\d|principal-\d|\bengine\b|\d+(?:[.,]\d+)?\s*%/iu,
  );
  expect(transfers).toEqual([]);
  expect(page.url()).not.toContain('Career');
  expect(
    await page.evaluate(() => localStorage.getItem('huyenvi:consented-profiles:v2')),
  ).toBeNull();
});

test('career reasoning and practice remain independently accessible on 320px extra-large text', async ({
  page,
}) => {
  await page.setViewportSize({ width: 320, height: 800 });
  await page.goto('/');
  await page.getByRole('button', { name: /^Cỡ chữ:/ }).click();
  await page.getByRole('button', { name: /^Cỡ chữ:/ }).click();
  await page.getByRole('button', { name: 'Khám phá lá số của tôi' }).click();
  const career = page.locator('.reading-theme[data-concern="career"]');
  const why = career.locator('.career-reason');
  const practice = career.locator('.career-practice');
  await expect(why).not.toHaveAttribute('open');
  await expect(practice).not.toHaveAttribute('open');
  await career.screenshot({ path: 'test-results/career-reading-mobile-initial.png' });
  await why.locator(':scope > summary').focus();
  await page.keyboard.press('Enter');
  await expect(why).toHaveAttribute('open', '');
  await expect(practice).not.toHaveAttribute('open');
  await practice.locator(':scope > summary').focus();
  await page.keyboard.press('Enter');
  await expect(practice).toHaveAttribute('open', '');
  expect(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth)).toBe(false);
  const accessibility = await new AxeBuilder({ page })
    .include('.interpretation-panel')
    .withTags(['wcag2a', 'wcag2aa', 'wcag21aa'])
    .analyze();
  expect(accessibility.violations).toEqual([]);
  await page.screenshot({ path: 'test-results/career-reading-mobile.png' });
});
