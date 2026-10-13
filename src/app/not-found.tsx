import Link from 'next/link';
export default function NotFound() {
  return (
    <section className="page-width prose-page">
      <span className="eyebrow">404 · CHƯA TÌM THẤY TRANG</span>
      <h1>Một lối rẽ khác.</h1>
      <p>
        Đường dẫn này chưa có nội dung. Bạn có thể trở lại trang chủ để lập lá số hoặc tra cứu lịch.
      </p>
      <Link href="/" className="primary-button">
        Trở về Huyền Vi
      </Link>
    </section>
  );
}
