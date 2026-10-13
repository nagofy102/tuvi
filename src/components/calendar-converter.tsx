'use client';
import { useState } from 'react';
import { ArrowLeftRight, CalendarDays } from 'lucide-react';
import { formatDate, normalizeDate } from '@/domain/calendar/convert';
import { MAX_YEAR, MIN_YEAR } from '@/domain/calendar/types';

export function CalendarConverter() {
  const [calendar, setCalendar] = useState<'solar' | 'lunar'>('solar');
  const [day, setDay] = useState(13);
  const [month, setMonth] = useState(10);
  const [year, setYear] = useState(2026);
  const [isLeapMonth, setLeap] = useState(false);
  const [message, setMessage] = useState('');
  let result: ReturnType<typeof normalizeDate> | null = null;
  let error = '';
  try {
    result = normalizeDate(
      calendar === 'solar'
        ? { calendar, date: { day, month, year } }
        : { calendar, date: { day, month, year, isLeapMonth } },
    );
  } catch (cause) {
    error = cause instanceof Error ? cause.message : 'Ngày không hợp lệ.';
  }
  function switchMode(next: 'solar' | 'lunar') {
    if (calendar === next) return;
    if (result) {
      const value = next === 'solar' ? result.solar : result.lunar;
      setDay(value.day);
      setMonth(value.month);
      setYear(value.year);
      setLeap(result.lunar.isLeapMonth);
    }
    setCalendar(next);
    setMessage('');
  }
  return (
    <div className="converter-card">
      <div className="calendar-switch" role="group" aria-label="Loại lịch nhập">
        <button
          type="button"
          aria-pressed={calendar === 'solar'}
          onClick={() => switchMode('solar')}
        >
          Dương lịch
        </button>
        <button
          type="button"
          aria-pressed={calendar === 'lunar'}
          onClick={() => switchMode('lunar')}
        >
          Âm lịch
        </button>
      </div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          setMessage(error || 'Đã chuyển đổi ngày thành công.');
        }}
      >
        <div className="date-fields">
          <label className="field">
            Ngày
            <input
              aria-label="Ngày"
              type="number"
              min={1}
              max={31}
              required
              value={day || ''}
              onChange={(e) => setDay(Number(e.target.value))}
            />
          </label>
          <label className="field">
            Tháng
            <select
              aria-label="Tháng"
              value={month}
              onChange={(e) => setMonth(Number(e.target.value))}
            >
              {Array.from({ length: 12 }, (_, i) => (
                <option key={i} value={i + 1}>
                  {i + 1}
                </option>
              ))}
            </select>
          </label>
          <label className="field">
            Năm
            <input
              aria-label="Năm"
              type="number"
              min={MIN_YEAR}
              max={MAX_YEAR}
              required
              value={year || ''}
              onChange={(e) => setYear(Number(e.target.value))}
            />
          </label>
        </div>
        {calendar === 'lunar' && (
          <label className="checkbox-label">
            <input
              type="checkbox"
              checked={isLeapMonth}
              onChange={(e) => setLeap(e.target.checked)}
            />
            Tháng nhuận
          </label>
        )}
        <button className="primary-button" type="submit">
          Chuyển đổi ngày <ArrowLeftRight size={18} />
        </button>
      </form>
      {error && (
        <p role="alert" className="form-error">
          {error}
        </p>
      )}
      {result && (
        <div className="converter-result">
          <CalendarDays size={27} />
          <div>
            <span>DƯƠNG LỊCH</span>
            <strong>{formatDate(result.solar)}</strong>
          </div>
          <ArrowLeftRight size={22} />
          <div>
            <span>ÂM LỊCH</span>
            <strong>{formatDate(result.lunar)}</strong>
            <small>{result.lunar.isLeapMonth ? 'Tháng nhuận' : 'Tháng thường'}</small>
          </div>
        </div>
      )}
      <p role="status">{message}</p>
    </div>
  );
}
