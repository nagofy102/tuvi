export const SITE_NAME = 'Huyền Vi';
export const SITE_URL = (process.env.SITE_URL || 'http://localhost:3000').replace(/\/$/, '');
export const siteUrl = (path: string) => new URL(path, `${SITE_URL}/`).href;
export function jsonLd(data: unknown): string {
  return JSON.stringify(data).replace(/</g, '\\u003c');
}
