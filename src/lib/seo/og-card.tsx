import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { ImageResponse } from 'next/og';

export const OG_SIZE = { width: 1200, height: 630 };

async function loadFont(subset: string) {
  const file = await readFile(
    path.join(
      process.cwd(),
      `node_modules/@fontsource/be-vietnam-pro/files/be-vietnam-pro-${subset}-600-normal.woff`,
    ),
  );
  return {
    name: `HV-${subset}`,
    data: new Uint8Array(file).buffer,
    weight: 600 as const,
    style: 'normal' as const,
  };
}

export async function renderOgCard({
  title,
  subtitle,
  details,
}: {
  title: string;
  subtitle: string;
  details: string;
}) {
  const fonts = await Promise.all(['latin', 'latin-ext', 'vietnamese'].map(loadFont));
  return new ImageResponse(
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        height: '100%',
        background: '#0f2425',
        color: '#f8f2e6',
        padding: '52px 64px',
        fontFamily: 'HV-latin, HV-latin-ext, HV-vietnamese',
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 18,
          color: '#dfc28b',
          fontSize: 24,
          letterSpacing: 5,
        }}
      >
        <svg width="44" height="44" viewBox="0 0 44 44" fill="none">
          <circle cx="22" cy="22" r="17" stroke="#dfc28b" />
          <circle cx="22" cy="22" r="10" stroke="#dfc28b" />
          <path
            d="M22 0v8m0 28v8M0 22h8m28 0h8M6 6l6 6m20 20l6 6M6 38l6-6m20-20l6-6"
            stroke="#dfc28b"
          />
        </svg>
        HUYỀN VI
      </div>
      <div
        style={{ display: 'flex', flex: 1, alignItems: 'center', justifyContent: 'space-between' }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', maxWidth: 835 }}>
          <div style={{ color: '#dfc28b', fontSize: 21, letterSpacing: 3, marginBottom: 22 }}>
            {subtitle}
          </div>
          <div style={{ fontSize: title.length > 35 ? 56 : 72, lineHeight: 1.2 }}>{title}</div>
          <div style={{ fontSize: 26, color: '#ccd3ca', marginTop: 27 }}>{details}</div>
        </div>
        <div
          style={{
            display: 'flex',
            width: 170,
            height: 170,
            border: '1px solid #a98a52',
            borderRadius: '50%',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <svg width="120" height="120" viewBox="0 0 120 120" fill="none">
            <circle cx="60" cy="60" r="48" stroke="#dfc28b" />
            <path d="M60 12a48 48 0 1 0 0 96 24 24 0 0 1 0-48 24 24 0 0 0 0-48Z" fill="#dfc28b" />
            <circle cx="60" cy="36" r="6" fill="#0f2425" />
            <circle cx="60" cy="84" r="6" fill="#dfc28b" />
          </svg>
        </div>
      </div>
      <div
        style={{
          display: 'flex',
          borderTop: '1px solid #526154',
          paddingTop: 24,
          justifyContent: 'space-between',
          fontSize: 18,
          color: '#ccd3ca',
        }}
      >
        <span>THẤU HIỂU BẢN THÂN · AN NHIÊN BƯỚC TỚI</span>
        <span>Thông tin văn hóa tham khảo</span>
      </div>
    </div>,
    { ...OG_SIZE, fonts },
  );
}
