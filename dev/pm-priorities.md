# Personalized opening, short mobile reading, unknown time and consented profiles

## Implemented

Base commit: `241c2c8`. Internal reading artifact: `reference-reading-v4`. Chart/source
profiles and engine placement/calendar logic are unchanged.

1. The first thematic paragraph is built from actual topic palaces, branches and
   principal-star compositions, not the user's name. The second reflects the actual
   eligible contextual groups or honestly states that no auxiliary group qualified.
   Why/evidence retains pinned source passages. This personalizes chart facts and
   editorial reading choices, not an unvalidated personality diagnosis or forecast.
2. A short interpretation precedes the full chart. Only the selected concern opens
   initially; exercises, the 12-palace reference and source bibliography are opt-in
   details. Thematic why contains direct evidence rather than another nested why.
   The real chart is collapsed by default; on mobile its view defaults to a list.
   The initial demo remains visibly labeled. Mobile CTA returns to the result after
   successful lookup. Native keyboard details and white-paper print remain available.
3. “Chưa biết giờ sinh” disables the required time field and uses `time: null`.
   This flow converts the date and displays lunar birth-year can chi/nạp âm only.
   It does not call the chart engine, create a default hour, stars, Mệnh/Thân/Cục,
   decade or personal thematic reading. Supplying an actual hour later uses the
   normal calculation path. UI lookup rejects future solar-equivalent birth dates.
4. `src/domain/profiles/local.ts` validates a versioned local-input schema. Maximum
   10 profiles; bounded parsing, duplicate ID/version/type/calendar/time/policy checks.
   No calculated chart, narrative, provider output or undocumented certainty is stored.
5. `LocalProfiles` reads previously consented local data, but never autosaves or
   automatically calculates on reload. Every save requires an unchecked-by-default
   consent box plus save action; consent resets after saving/current-result changes.
   Opening restores input and recalculates with current rules. Individual/all deletion
   uses confirmation, preserves unrelated storage and reports failures honestly.
   Storage denied/corrupt/full cases leave anonymous lookup usable. Updates read the
   latest snapshot and listen for storage events; this is not transactional cross-tab
   storage or a cloud backup.

## Privacy and limitations

No server/database/account storage, new POST request, analytics birth payload,
personal URL, share token, AI provider or paid operation. Names/birth dates are rendered
locally only. Storage is **not encrypted**, accessible to anyone using that browser;
privacy page and save UI explicitly warn about shared devices, deletion and no sync.
Unknown-hour input remains null in saved profiles and reopens as the limited flow.
Invalid attempts invalidate the saveable current result and hide the old reading.

No chart accuracy certification, annual/decade forecasting, Phi Hóa, extra unverified
stars or new independent golden charts. No new Lighthouse score is claimed. Unknown
time rectification and comparative 12-hour analysis are deliberately not implemented.

## Verification

See `../test/pm-priorities.md` for executed tests, actual persona measurements and
remaining limitations. Recommendations about encrypted synchronization or external
AI are not implemented by this task.
