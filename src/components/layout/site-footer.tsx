import Link from 'next/link';
import { Sun } from 'lucide-react';

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="page-width footer-main">
        <div>
          <Link href="/" className="brand">
            <span className="brand-mark">
              <Sun size={23} strokeWidth={1.2} />
            </span>
            <span>
              HUYỀN VI<small>TINH HOA TỬ VI VIỆT</small>
            </span>
          </Link>
          <p>Thấu hiểu bản thân. An nhiên bước tới.</p>
        </div>
        <nav aria-label="Thông tin">
          <Link href="/phuong-phap">Phương pháp & nguồn</Link>
          <Link href="/quyen-rieng-tu">Quyền riêng tư</Link>
          <Link href="/lich-am-duong">Chuyển đổi lịch</Link>
        </nav>
      </div>
      <div className="page-width footer-bottom">
        <span>© 2026 Huyền Vi</span>
        <span>Nội dung văn hóa tham khảo · Không thay thế tư vấn chuyên môn.</span>
        <span className="footer-ornament">✦</span>
      </div>
    </footer>
  );
}
