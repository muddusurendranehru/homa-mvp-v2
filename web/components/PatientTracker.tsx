'use client';

import { useAuth } from '@clerk/nextjs';
import { useCallback, useEffect, useRef, useState } from 'react';
import ClinicalBaselineStrip, { type ClinicalBaselineData } from '@/components/ClinicalBaselineStrip';
import {
  HABIT_COIN_REWARD,
  type PatientJourneyJson,
  type PatientMeResponse,
  emptyJourney,
} from '@/lib/patient-me';

type HabitId = 'exercise' | 'water' | 'sleep';

const HABITS: { id: HabitId; emoji: string; label: string }[] = [
  { id: 'exercise', emoji: '🏃', label: 'Exercise 30 mins' },
  { id: 'water', emoji: '💧', label: 'Water 2L' },
  { id: 'sleep', emoji: '😴', label: 'Sleep 7+ hrs' },
];

const MEALS = [
  { slot: 'Breakfast', time: '8:00 AM', item: 'Vegetable upma + cucumber salad', note: 'Low GI, high fiber' },
  { slot: 'Lunch', time: '1:00 PM', item: '2 millet rotis + dal + sautéed greens', note: 'Portion-controlled carbs' },
  { slot: 'Dinner', time: '7:30 PM', item: 'Grilled paneer/tofu + mixed veg soup', note: 'Light dinner window' },
];

type BaselineState =
  | { kind: 'baseline'; data: ClinicalBaselineData }
  | { kind: 'processing' }
  | { kind: 'sign_in' }
  | { kind: 'loading' };

function applyPatientMe(
  data: PatientMeResponse,
  setBaseline: (s: BaselineState) => void,
  setJourney: (j: PatientJourneyJson) => void,
  setCoins: (n: number) => void,
) {
  setJourney(data.journey);
  setCoins(data.journey.coinsBalance ?? 0);

  if (data.success && data.status === 'linked' && data.baseline) {
    setBaseline({ kind: 'baseline', data: data.baseline });
  } else {
    setBaseline({ kind: 'processing' });
  }
}

type PatientTrackerProps = {
  /** Optional server-rendered payload so baseline shows before client hydration. */
  initialPatientMe?: PatientMeResponse | null;
};

function baselineFromPatientMe(me: PatientMeResponse | null | undefined): BaselineState {
  if (!me) return { kind: 'loading' };
  if (me.success && me.status === 'linked' && me.baseline) {
    return { kind: 'baseline', data: me.baseline };
  }
  if (me.status === 'processing') return { kind: 'processing' };
  return { kind: 'loading' };
}

export default function PatientTracker({ initialPatientMe = null }: PatientTrackerProps) {
  const { isLoaded: clerkLoaded, isSignedIn } = useAuth();
  const inputRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [dragOver, setDragOver] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [toast, setToast] = useState(false);
  const [baseline, setBaseline] = useState<BaselineState>(() => baselineFromPatientMe(initialPatientMe));
  const [journey, setJourney] = useState<PatientJourneyJson>(
    () => initialPatientMe?.journey ?? emptyJourney(),
  );
  const [coins, setCoins] = useState(0);
  const [habits, setHabits] = useState<Record<HabitId, boolean>>({
    exercise: false,
    water: false,
    sleep: false,
  });
  const [habitFlash, setHabitFlash] = useState<HabitId | null>(null);

  useEffect(() => {
    if (!clerkLoaded) return;

    let cancelled = false;

    async function loadPatient() {
      if (!isSignedIn) {
        setBaseline({ kind: 'sign_in' });
        setJourney(emptyJourney());
        setCoins(0);
        return;
      }

      const skipLoadingFlash =
        initialPatientMe?.success === true && initialPatientMe.status === 'linked' && !!initialPatientMe.baseline;
      if (!skipLoadingFlash) {
        setBaseline({ kind: 'loading' });
      }
      try {
        const res = await fetch('/api/patient/me', {
          cache: 'no-store',
          credentials: 'same-origin',
        });
        if (cancelled) return;

        if (res.status === 401) {
          setBaseline({ kind: 'sign_in' });
          setJourney(emptyJourney());
          setCoins(0);
          return;
        }

        if (!res.ok) {
          setBaseline({ kind: 'processing' });
          setJourney(emptyJourney());
          setCoins(0);
          return;
        }

        const data = (await res.json()) as PatientMeResponse;
        applyPatientMe(data, setBaseline, setJourney, setCoins);
      } catch {
        if (!cancelled) {
          setBaseline({ kind: 'processing' });
          setJourney(emptyJourney());
          setCoins(0);
        }
      }
    }

    void loadPatient();
    return () => {
      cancelled = true;
    };
  }, [clerkLoaded, isSignedIn, initialPatientMe]);

  const clearFile = useCallback(() => {
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setPreviewUrl(null);
    setFile(null);
    if (inputRef.current) inputRef.current.value = '';
  }, [previewUrl]);

  const applyFile = useCallback(
    (next: File | null) => {
      if (!next || !next.type.startsWith('image/')) return;
      if (previewUrl) URL.revokeObjectURL(previewUrl);
      setFile(next);
      setPreviewUrl(URL.createObjectURL(next));
    },
    [previewUrl],
  );

  const toggleHabit = (id: HabitId) => {
    const completed = !habits[id];
    setHabits((prev) => ({ ...prev, [id]: completed }));
    setCoins((c) => c + (completed ? HABIT_COIN_REWARD : -HABIT_COIN_REWARD));

    void fetch('/api/patient/habit-log', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        habit: id,
        completed,
        programDay: journey.currentDay,
      }),
    }).catch(() => {
      /* session-only fallback; route may return 401 when signed out */
    });

    if (completed) {
      setHabitFlash(id);
      window.setTimeout(() => setHabitFlash(null), 1600);
    }
  };

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const dropped = e.dataTransfer.files?.[0];
    if (dropped) applyFile(dropped);
  };

  const onSubmit = async () => {
    if (!file || submitting) return;
    setSubmitting(true);
    try {
      await fetch('/api/patient/meal-photo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fileName: file.name,
          fileSize: file.size,
          mimeType: file.type,
          programDay: journey.currentDay,
        }),
      });
      setToast(true);
      clearFile();
      window.setTimeout(() => setToast(false), 4500);
    } catch {
      setToast(true);
      window.setTimeout(() => setToast(false), 4500);
    } finally {
      setSubmitting(false);
    }
  };

  const coinsHint =
    journey.coinsBalance == null
      ? 'Includes today’s habits (saved to your account after clinic sync)'
      : `+${HABIT_COIN_REWARD} per habit today`;

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
        <p className="mt-2 text-slate-600">
          Track your meals, movement, and sleep. Earn HOMA Coins.
        </p>
      </header>

      {baseline.kind === 'loading' && (
        <section
          className="rounded-2xl border border-slate-200 bg-slate-50 p-5 shadow-sm sm:p-6"
          aria-busy="true"
          aria-label="Loading clinical baseline"
        >
          <p className="text-sm text-slate-600">Loading your clinic baseline…</p>
        </section>
      )}
      {baseline.kind === 'baseline' && (
        <ClinicalBaselineStrip variant="baseline" data={baseline.data} />
      )}
      {baseline.kind === 'processing' && <ClinicalBaselineStrip variant="processing" />}
      {baseline.kind === 'sign_in' && <ClinicalBaselineStrip variant="sign_in" />}

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
              <p className="mt-1 text-3xl font-bold text-[#0D9488]">{coins}</p>
              <p className="mt-1 text-xs text-slate-500">{coinsHint}</p>
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
                Day {journey.currentDay} of {journey.programDays}
              </p>
              <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-slate-100">
                <div
                  className="h-full rounded-full bg-teal-600 transition-all"
                  style={{ width: `${journey.dayPercent}%` }}
                />
              </div>
              <p className="mt-1 text-xs text-slate-500">~{journey.dayPercent}% of program</p>
            </div>
          </div>
        </div>
      </div>

      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-md">
        <h2 className="text-lg font-bold text-slate-900">Today&apos;s Healthy Habits</h2>
        <p className="mt-1 text-sm text-slate-600">
          Check each habit when you complete it today (+{HABIT_COIN_REWARD} coins each). Checked habits stay in this
          browser session until daily habit sync is enabled.
        </p>
        <ul className="mt-4 space-y-3">
          {HABITS.map((h) => {
            const done = habits[h.id];
            const flash = habitFlash === h.id;
            return (
              <li key={h.id}>
                <label
                  className={[
                    'flex cursor-pointer items-center gap-3 rounded-xl border px-4 py-3 transition-all',
                    done
                      ? 'border-teal-300 bg-teal-50 shadow-sm'
                      : 'border-slate-100 bg-slate-50/80 hover:border-slate-200',
                    flash ? 'ring-2 ring-green-400 ring-offset-1' : '',
                  ].join(' ')}
                >
                  <input
                    type="checkbox"
                    checked={done}
                    onChange={() => toggleHabit(h.id)}
                    className="h-5 w-5 shrink-0 rounded border-slate-300 text-teal-600 focus:ring-teal-500"
                  />
                  <span className="text-xl" aria-hidden>{h.emoji}</span>
                  <span className="flex-1 font-medium text-slate-800">{h.label}</span>
                  {done && (
                    <span className="shrink-0 rounded-full bg-green-100 px-2 py-0.5 text-xs font-semibold text-green-800">
                      +{HABIT_COIN_REWARD} ✓
                    </span>
                  )}
                  {flash && (
                    <span className="shrink-0 text-xs font-bold text-green-600 animate-pulse">
                      +{HABIT_COIN_REWARD} coins!
                    </span>
                  )}
                </label>
              </li>
            );
          })}
        </ul>
      </section>

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
