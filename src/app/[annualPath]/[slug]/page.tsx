import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowRight, ArrowUpRight, BookOpen } from 'lucide-react';
import {
  ANNUAL_YEARS,
  FEATURED_BIRTH_YEARS,
  annualSlug,
  getAnnualContent,
} from '@/data/annual-content';
import { jsonLd, SITE_NAME, siteUrl } from '@/lib/seo/site';

type Props = { params: Promise<{ annualPath: string; slug: string }> };
export const revalidate = 86400;
export function generateStaticParams() {
  return ANNUAL_YEARS.flatMap((year) =>
    FEATURED_BIRTH_YEARS.flatMap((birthYear) =>
      (['male', 'female'] as const).map((gender) => ({
        annualPath: `tu-vi-nam-${year}`,
        slug: annualSlug(birthYear, gender),
      })),
    ),
  );
}
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { annualPath, slug } = await params;
  const record = getAnnualContent(annualPath, slug);
  if (!record) notFound();
  return {
    title: `${record.title} — Tử vi năm ${record.targetYear}`,
    description: record.description,
    alternates: { canonical: record.path },
    openGraph: {
      title: `${record.title} · ${record.targetYear}`,
      description: record.description,
      url: record.path,
      type: 'article',
    },
  };
}
export default async function AnnualPage({ params }: Props) {
  const { annualPath, slug } = await params;
  const record = getAnnualContent(annualPath, slug);
  if (!record) notFound();
  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Article',
        headline: `${record.title} trong năm ${record.targetYear}`,
        description: record.description,
        inLanguage: 'vi',
        author: { '@type': 'Organization', name: SITE_NAME },
        mainEntityOfPage: siteUrl(record.path),
        image: siteUrl(`${record.path}/opengraph-image`),
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: SITE_NAME, item: siteUrl('/') },
          {
            '@type': 'ListItem',
            position: 2,
            name: `Tử vi ${record.targetYear}`,
            item: siteUrl(`/${annualPath}`),
          },
          { '@type': 'ListItem', position: 3, name: record.title, item: siteUrl(record.path) },
        ],
      },
      {
        '@type': 'FAQPage',
        mainEntity: record.faq.map((faq) => ({
          '@type': 'Question',
          name: faq.question,
          acceptedAnswer: { '@type': 'Answer', text: faq.answer },
        })),
      },
    ],
  };
  return (
    <article className="page-width annual-article">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd(structuredData) }}
      />
      <nav aria-label="Đường dẫn" className="breadcrumbs">
        <Link href="/">Huyền Vi</Link>
        <span>/</span>
        <Link href={`/${annualPath}`}>{record.targetYear}</Link>
        <span>/</span>
        <span>{record.birthName}</span>
      </nav>
      <div className="annual-hero">
        <div>
          <span className="eyebrow">
            HỒ SƠ NĂM TUỔI · {record.genderLabel.toLocaleUpperCase('vi')}
          </span>
          <h1>
            {record.birthName}
            <br />
            <em>{record.birthYear}</em>
          </h1>
          <p>
            Năm {record.targetName} {record.targetYear}. Một dịp để hiểu gốc rễ và nhìn lại những
            điều bạn muốn vun đắp.
          </p>
          <Link className="primary-button" href="/#lap-la-so">
            Lập lá số của riêng bạn <ArrowRight size={18} />
          </Link>
        </div>
        <div className="annual-seal">
          <span>{record.element.element}</span>
          <strong>{record.element.name}</strong>
          <small>
            {record.nominalAge} tuổi mụ · trong năm âm lịch {record.targetYear}
          </small>
        </div>
      </div>
      <div className="article-columns">
        <div className="article-body">
          <h2>Năm tuổi và ngũ hành</h2>
          <p>
            Năm âm lịch {record.birthName} {record.birthYear} có nạp âm{' '}
            <strong>{record.element.name}</strong>, thuộc hành {record.element.element}. Cùng nạp âm
            không đồng nghĩa cùng lá số: tháng, ngày và giờ sinh tạo ra những vị trí cung và sao
            khác nhau.
          </p>
          <p>
            Trong năm âm lịch {record.targetName} {record.targetYear}, tuổi mụ của người sinh năm âm
            lịch {record.birthYear} là <strong>{record.nominalAge}</strong>. Tuổi theo ngày sinh
            dương lịch có thể khác; nếu sinh trước Tết, hãy dùng công cụ chuyển lịch để xác định
            đúng năm âm lịch.
          </p>
          <h2>Đọc lá số theo cách có cơ sở</h2>
          <p>
            {record.genderLabel} là tham số trong quy tắc an đại hạn truyền thống. Nó không đủ để
            kết luận về tài lộc, sự nghiệp hay quan hệ. Các nội dung trên trang này là thông tin năm
            tuổi và hướng dẫn văn hóa, không phải dự báo vận hạn cá nhân.
          </p>
          <div className="article-callout">
            <BookOpen size={22} />
            <p>
              Nhập đầy đủ ngày, tháng, năm, giờ sinh và kiểm tra quy ước tháng nhuận/giờ Tý trước
              khi đọc lá số.
            </p>
          </div>
          <h2>Ba điều đáng suy ngẫm trong năm {record.targetYear}</h2>
          <ol>
            <li>
              <strong>Nguồn lực:</strong> Bạn có kế hoạch chi tiêu và dự phòng rõ ràng chưa?
            </li>
            <li>
              <strong>Công việc:</strong> Bạn muốn nâng cao kỹ năng nào để chủ động hơn?
            </li>
            <li>
              <strong>Kết nối:</strong> Bạn muốn dành thời gian chất lượng cho ai?
            </li>
          </ol>
          <p>Đây là câu hỏi tự nhìn lại, không phải lời luận giải riêng cho năm tuổi.</p>
          <h2>Câu hỏi thường gặp</h2>
          <div className="faq-list">
            {record.faq.map((f) => (
              <details key={f.question}>
                <summary>
                  {f.question}
                  <span>+</span>
                </summary>
                <p>{f.answer}</p>
              </details>
            ))}
          </div>
        </div>
        <aside className="article-sidebar">
          <span className="eyebrow">HÀNH TRÌNH CỦA BẠN</span>
          <h3>
            Năm sinh chỉ là
            <br />
            <em>điểm bắt đầu.</em>
          </h3>
          <p>Lá số đầy đủ có 12 cung, Mệnh, Thân và hệ thống sao được an theo ngày giờ sinh.</p>
          <Link href="/#lap-la-so" className="text-link">
            Khám phá lá số <ArrowUpRight size={18} />
          </Link>
          <hr />
          <Link href="/phuong-phap">Nguồn & phương pháp</Link>
          <Link href="/lich-am-duong">Kiểm tra ngày âm lịch</Link>
        </aside>
      </div>
    </article>
  );
}
