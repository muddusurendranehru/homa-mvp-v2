'use client';

import { useCallback, useRef, useState } from 'react';

const MOCK_COINS = 120;
const CURRENT_DAY = 14;
const PROGRAM_DAYS = 90;
const DAY_PCT = Math.round((CURRENT_DAY / PROGRAM_DAYS) * 100);

const MEALS = [
  { slot: 'Breakfast', time: '8:00 AM', item: 'Vegetable upma + cucumber salad', note: 'Low GI, high fiber' },
  { slot: 'Lunch', time: '1:00 PM', item: '2 millet rotis + dal + sautéed greens', note: 'Portion-controlled carbs' },
  { slot: 'Dinner', time: '7:30 PM', item: 'Grilled paneer/tofu + mixed veg soup', note: 'Light dinner window' },
];

export default function PatientTracker() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [dragOver, setDragOver] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [toast, setToast] = useState(false);

  const clearFile = useCallback(() => {
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setPreviewUrl(null);
    setFile(null);
    if (inputRef.current) inputRef.current.value = '';
  }, [previewUrl]);

  const applyFile = useCallback(
    (next: File | null) => {
      if (!next || !next.type.startsWith('image/')) return;
      clearFile();
      setFile(next);
      setPreviewUrl(URL.createObjectURL(next));
    },
    [clearFile],
  );

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const dropped = e.dataTransfer.files?.[0];
    if (dropped) applyFile(dropped);
  };

  const onSubmit = async () => {
    if (!file || submitting) return;
    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 2000));
    console.log('[mock Neon] meal_photo_submit', {
      table: 'meal_logs',
      day: CURRENT_DAY,
      homaCoins: MOCK_COINS,
      fileName: file.name,
      fileSize: file.size,
      mimeType: file.type,
      submittedAt: new Date().toISOString(),
    });
    setSubmitting(false);
    setToast(true);
    clearFile();
    window.setTimeout(() => setToast(false), 4500);
  };

  return (
    <div className="space-y-6 pb-8">
      {toast && (
        <div
          role="status"
          className="fixed bottom-6 left-4 right-4 z-[1100] mx-auto max-w-md rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-center text-sm font-semibold text-green-800 shadow-lg sm:left-auto sm:right-6"
        >
          Meal photo sent to HOMA staff. Thank you!
        </div>
      )}

      <header className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
        <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">My 90-Day Journey</h1>
        <p className="mt-2 text-slate-600">Track your meals. Earn HOMA Coins. Improve your numbers.</p>
      </header>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-md">
          <div className="flex items-start gap-3">
            <span
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-amber-50 text-xl"
              aria-hidden
            >
              🪙
            </span>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">HOMA Coins</p>
              <p className="mt-1 text-3xl font-bold text-[#0D9488]">{MOCK_COINS}</p>
              <p className="mt-1 text-xs text-slate-500">Mock balance for demo</p>
            </div>
          </div>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-md">
          <div className="flex items-start gap-3">
            <span
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-teal-50 text-xl"
              aria-hidden
            >
              📅
            </span>
            <div className="min-w-0 flex-1">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Current day</p>
              <p className="mt-1 text-lg font-bold text-slate-900">
                Day {CURRENT_DAY} of {PROGRAM_DAYS}
              </p>
              <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-slate-100">
                <div
                  className="h-full rounded-full bg-teal-600 transition-all"
                  style={{ width: `${DAY_PCT}%` }}
                />
              </div>
              <p className="mt-1 text-xs text-slate-500">~{DAY_PCT}% of program</p>
            </div>
          </div>
        </div>
      </div>

      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-md">
        <h2 className="text-lg font-bold text-slate-900">Today&apos;s Meal Plan</h2>
        <p className="mt-1 text-sm text-slate-600">
          Placeholder plan — designed by your HOMA doctor for your metabolic subtype.
        </p>
        <ul className="mt-4 space-y-3">
          {MEALS.map((m) => (
            <li
              key={m.slot}
              className="rounded-xl border border-slate-100 bg-slate-50/80 px-4 py-3"
            >
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <span className="font-semibold text-slate-800">{m.slot}</span>
                <span className="text-xs text-slate-500">{m.time}</span>
              </div>
              <p className="mt-1 text-sm text-slate-700">{m.item}</p>
              <p className="mt-1 text-xs text-[#0D9488]">{m.note}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="rounded-2xl border border-teal-200 bg-gradient-to-br from-teal-50 to-white p-6 shadow-md">
        <h2 className="text-lg font-bold text-teal-900">Log Your Meal</h2>
        <p className="mt-1 text-sm text-slate-600">Snap or upload a photo of what you ate today.</p>

        <div
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') inputRef.current?.click();
          }}
          onDragOver={(e) => {
            e.preventDefault();
            setDragOver(true);
          }}
          onDragLeave={() => setDragOver(false)}
          onDrop={onDrop}
          onClick={() => inputRef.current?.click()}
          className={[
            'mt-4 flex min-h-[160px] cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed px-4 py-8 text-center transition-colors',
            dragOver ? 'border-teal-600 bg-teal-50/80' : 'border-[#0D9488]/50 bg-white/60 hover:border-teal-600',
          ].join(' ')}
        >
          <span className="text-3xl" aria-hidden>📷</span>
          <p className="mt-2 text-sm font-medium text-slate-700">Drop a meal photo here or tap to choose</p>
          <p className="mt-1 text-xs text-slate-500">JPG or PNG · one photo at a time</p>
          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => applyFile(e.target.files?.[0] ?? null)}
          />
        </div>

        {previewUrl && file && (
          <div className="mt-4 overflow-hidden rounded-xl border border-slate-200 bg-white p-3 shadow-sm">
            <img src={previewUrl} alt="Meal preview" className="mx-auto max-h-56 w-auto rounded-lg object-contain" />
            <p className="mt-2 truncate text-center text-xs text-slate-500">{file.name}</p>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                clearFile();
              }}
              className="mt-2 w-full text-center text-xs font-medium text-slate-600 underline"
            >
              Remove photo
            </button>
          </div>
        )}

        <button
          type="button"
          disabled={!file || submitting}
          onClick={onSubmit}
          className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-teal-600 px-4 py-3.5 text-base font-bold text-white shadow-md transition-colors hover:bg-teal-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {submitting ? (
            <>
              <span
                className="inline-block h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white"
                aria-hidden
              />
              Sending to HOMA staff…
            </>
          ) : (
            'Submit to HOMA Staff'
          )}
        </button>
      </section>

      <footer className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-center text-xs text-slate-500 shadow-sm">
        Your meal photos are private and reviewed by HOMA staff only — not shared publicly.
      </footer>
    </div>
  );
}
