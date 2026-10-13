'use client';
import { useEffect, useState } from 'react';
import {
  decodeProfiles,
  encodeProfiles,
  MAX_PROFILES,
  PROFILE_STORAGE_KEY,
  LEGACY_PROFILE_STORAGE_KEY,
  type LocalProfile,
} from '@/domain/profiles/local';
import { formatDate } from '@/domain/calendar/convert';

export function LocalProfiles({
  current,
  onOpen,
}: {
  current: Omit<LocalProfile, 'id'> | null;
  onOpen: (profile: LocalProfile) => Promise<void>;
}) {
  const [profiles, setProfiles] = useState<LocalProfile[]>([]);
  const [consent, setConsent] = useState(false);
  const [ready, setReady] = useState(false);
  const [message, setMessage] = useState('');
  const [busy, setBusy] = useState(false);
  const [hasLegacy, setHasLegacy] = useState(false);
  useEffect(() => {
    function read() {
      try {
        setHasLegacy(localStorage.getItem(LEGACY_PROFILE_STORAGE_KEY) !== null);
        setProfiles(decodeProfiles(localStorage.getItem(PROFILE_STORAGE_KEY)));
        setMessage('');
      } catch {
        setProfiles([]);
        setMessage(
          'Không thể đọc hồ sơ trên thiết bị. Bạn vẫn có thể tra cứu không lưu; dùng Xóa tất cả để bỏ dữ liệu cũ nếu muốn.',
        );
      }
      setReady(true);
      setConsent(false);
    }
    read();
    window.addEventListener('storage', read);
    return () => window.removeEventListener('storage', read);
  }, []);
  useEffect(() => {
    setConsent(false);
  }, [current]);
  function save() {
    if (!ready || !current || !consent) return;
    try {
      // Merge the latest snapshot instead of overwriting another tab's newer profiles.
      const latest = decodeProfiles(localStorage.getItem(PROFILE_STORAGE_KEY));
      if (latest.length >= MAX_PROFILES)
        throw new Error('Đã đủ 10 hồ sơ. Hãy xóa một hồ sơ trước khi lưu thêm.');
      const next = [...latest, { ...current, id: crypto.randomUUID() }];
      localStorage.setItem(PROFILE_STORAGE_KEY, encodeProfiles(next, consent));
      setProfiles(next);
      setConsent(false);
      setMessage('Đã lưu trên trình duyệt này. Hồ sơ không được gửi lên máy chủ.');
    } catch (cause) {
      setMessage(
        cause instanceof Error && cause.message.startsWith('Đã đủ')
          ? cause.message
          : 'Không thể lưu trên trình duyệt này. Kết quả tra cứu vẫn dùng được; hồ sơ chưa được lưu.',
      );
    }
  }
  function remove(id?: string) {
    if (
      !window.confirm(
        id ? 'Xóa hồ sơ này khỏi trình duyệt?' : 'Xóa tất cả hồ sơ đã lưu trên trình duyệt này?',
      )
    )
      return;
    try {
      const next = id
        ? decodeProfiles(localStorage.getItem(PROFILE_STORAGE_KEY)).filter((p) => p.id !== id)
        : [];
      if (next.length) localStorage.setItem(PROFILE_STORAGE_KEY, encodeProfiles(next, true));
      else localStorage.removeItem(PROFILE_STORAGE_KEY);
      setProfiles(next);
      setConsent(false);
      setMessage('Đã xóa dữ liệu đã lưu. Bản đang xem còn trong bộ nhớ cho đến khi tải lại trang.');
    } catch {
      setMessage(
        'Chưa thể xóa trên trình duyệt này. Không báo xóa thành công khi dữ liệu chưa được xóa.',
      );
    }
  }
  function removeLegacy() {
    if (
      !window.confirm(
        'Xóa hồ sơ theo lịch Việt Nam cũ khỏi trình duyệt? Không thể khôi phục sau khi xóa.',
      )
    )
      return;
    try {
      localStorage.removeItem(LEGACY_PROFILE_STORAGE_KEY);
      setHasLegacy(false);
      setMessage('Đã xóa hồ sơ theo lịch cũ.');
    } catch {
      setMessage('Chưa thể xóa hồ sơ theo lịch cũ trên trình duyệt này.');
    }
  }
  return (
    <section className="local-profiles" aria-labelledby="local-profiles-title">
      <h3 id="local-profiles-title">Hồ sơ trên thiết bị của bạn</h3>
      <p>
        Không tự lưu. Chỉ lưu ngày sinh, giờ sinh nếu biết, tên bạn nhập và quy ước tính khi bạn
        đồng ý. Người dùng chung trình duyệt có thể đọc hồ sơ; dữ liệu không được mã hóa và không
        đồng bộ tài khoản. Hồ sơ lưu kèm mã lịch và hồ sơ Nam phái. Khi mở hồ sơ tương thích, lá số
        được tính lại, không giữ bản luận giải cũ.
      </p>
      {hasLegacy && (
        <div className="source-note">
          <p>
            Bạn có hồ sơ lưu theo lịch Việt Nam cũ. Hãy nhập lại ngày dương hoặc xác nhận ngày âm
            theo lịch Trung Quốc để tra cứu và lưu mới. Dữ liệu cũ được giữ nguyên, chưa tự chuyển.
          </p>
          <button type="button" onClick={removeLegacy}>
            Xóa hồ sơ theo lịch cũ
          </button>
        </div>
      )}
      {current && (
        <div className="profile-save">
          <p>
            Hồ sơ đang xem: <strong>{current.name || 'Không đặt tên'}</strong> ·{' '}
            {formatDate(current.input.date)} ·{' '}
            {current.input.calendar === 'lunar' ? 'Âm lịch' : 'Dương lịch'} ·{' '}
            {current.input.time ?? 'Chưa biết giờ sinh'}.
          </p>
          <label className="checkbox-label">
            <input
              type="checkbox"
              checked={consent}
              onChange={(event) => setConsent(event.target.checked)}
            />
            Tôi đồng ý lưu hồ sơ đang xem trên trình duyệt này
          </label>
          <button
            type="button"
            className="primary-button"
            disabled={!ready || !consent}
            onClick={save}
          >
            Lưu hồ sơ đang xem
          </button>
        </div>
      )}
      {profiles.length > 0 && (
        <ul>
          {profiles.map((profile) => (
            <li key={profile.id}>
              <span>
                {profile.name || 'Không đặt tên'} · {formatDate(profile.input.date)} ·{' '}
                {profile.input.calendar === 'lunar' ? 'Âm lịch' : 'Dương lịch'} ·{' '}
                {profile.input.time ?? 'Chưa biết giờ sinh'}
              </span>
              <button
                type="button"
                disabled={busy}
                onClick={async () => {
                  setBusy(true);
                  try {
                    await onOpen(profile);
                  } finally {
                    setBusy(false);
                  }
                }}
              >
                Mở hồ sơ {profile.name || 'không đặt tên'}
              </button>
              <button type="button" onClick={() => remove(profile.id)}>
                Xóa hồ sơ {profile.name || 'không đặt tên'}
              </button>
            </li>
          ))}
        </ul>
      )}
      {ready && (
        <button type="button" onClick={() => remove()}>
          Xóa tất cả hồ sơ đã lưu
        </button>
      )}
      <p aria-live="polite">{message}</p>
    </section>
  );
}
