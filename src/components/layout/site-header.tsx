import Link from 'next/link';
import { ArrowUpRight, Sun } from 'lucide-react';
import { FontSizeControl } from '../ui/font-size-control';

export function SiteHeader() {
  return (
    <>
      <a href="#main" className="skip-link">
        Đến nội dung chính
      </a>
      <header className="site-header">
        <div className="page-width header-inner">
          <Link href="/" className="brand" aria-label="Huyền Vi — trang chủ">
            <span className="brand-mark">
              <Sun size={25} strokeWidth={1.3} />
            </span>
            <span>
              HUYỀN VI<small>TINH HOA TỬ VI VIỆT</small>
            </span>
          </Link>
          <nav aria-label="Điều hướng chính" className="desktop-nav">
            <Link href="/#lap-la-so">Lập lá số</Link>
            <Link href="/#la-so">Khám phá 12 cung</Link>
            <Link href="/tu-vi-nam-2026">Tử vi 2026</Link>
            <Link href="/lich-am-duong">Lịch âm dương</Link>
          </nav>
          <div className="header-actions">
            <FontSizeControl />
            <Link href="/#lap-la-so" className="header-cta">
              Lá số của bạn <ArrowUpRight size={17} />
            </Link>
          </div>
        </div>
      </header>
    </>
  );
}
