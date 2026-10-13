import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import { SiteHeader } from '@/components/layout/site-header';
import { SiteFooter } from '@/components/layout/site-footer';
import { SITE_URL, SITE_NAME } from '@/lib/seo/site';

const sans = localFont({
  src: [
    { path: '../fonts/hv-sans-regular.woff2', weight: '400' },
    { path: '../fonts/hv-sans-semibold.woff2', weight: '600' },
  ],
  variable: '--font-hv-sans',
  display: 'optional',
  adjustFontFallback: 'Arial',
});
const serif = localFont({
  src: [
    { path: '../fonts/hv-serif-regular.woff2', weight: '500', style: 'normal' },
    { path: '../fonts/hv-serif-italic.woff2', weight: '500', style: 'italic' },
  ],
  variable: '--font-hv-serif',
  display: 'optional',
  adjustFontFallback: 'Times New Roman',
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: 'Huyền Vi — Hiểu vận mệnh, sống an nhiên', template: `%s | ${SITE_NAME}` },
  description:
    'Lập lá số 12 cung theo hồ sơ Nam phái, chuyển đổi âm lịch Trung Quốc và tìm một góc nhìn bình tâm về bản thân. Không cần tài khoản.',
  openGraph: { locale: 'vi_VN', type: 'website', siteName: SITE_NAME },
  twitter: { card: 'summary_large_image' },
  icons: { icon: '/icon.svg' },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="vi" className={`${sans.variable} ${serif.variable}`}>
      <body>
        <SiteHeader />
        <main id="main">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
