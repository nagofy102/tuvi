'use client';
import { useEffect, useState } from 'react';

const SIZES = ['normal', 'large', 'extra-large'] as const;
export function FontSizeControl() {
  const [size, setSize] = useState(0);
  useEffect(() => {
    try {
      const index = SIZES.indexOf(localStorage.getItem('text-size') as (typeof SIZES)[number]);
      if (index >= 0) {
        setSize(index);
        document.documentElement.dataset.textSize = SIZES[index];
      }
    } catch {
      /* Preference storage may be unavailable; normal text remains usable. */
    }
  }, []);
  function changeSize() {
    const next = (size + 1) % 3;
    setSize(next);
    document.documentElement.dataset.textSize = SIZES[next];
    try {
      localStorage.setItem('text-size', SIZES[next]);
    } catch {
      /* Nonessential preference. */
    }
  }
  return (
    <button
      type="button"
      className="font-control"
      onClick={changeSize}
      aria-label={`Cỡ chữ: ${['bình thường', 'lớn', 'rất lớn'][size]}. Nhấn để thay đổi.`}
      title="Thay đổi cỡ chữ"
    >
      A<span>A</span>
    </button>
  );
}
