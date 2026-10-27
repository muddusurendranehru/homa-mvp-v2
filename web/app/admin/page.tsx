'use client';

import Link from 'next/link';
import { useCallback, useState } from 'react';

export default function AdminLinkAssessmentPage() {
  const [clerkUserId, setClerkUserId] = useState('');
  const [assessmentId, setAssessmentId] = useState('');
  const [useLatest, setUseLatest] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const onSubmit = useCallback(async () => {
    setLoading(true);
    setError(null);
    setSuccess(null);
    try {
      const res = await fetch('/api/admin/link-assessment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          clerk_user_id: clerkUserId.trim(),
          assessment_id: useLatest ? undefined : assessmentId.trim(),
          use_latest: useLatest,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || 'Link failed');
        return;
      }
      const a = data.assessment;
      setSuccess(
        `Linked assessment ${String(a.id).slice(0, 8)}… to Clerk user. Patient can refresh /tracker to see baseline labs.`,
      );
    } catch {
      setError('Network error — try again');
    } finally {
      setLoading(false);
    }
  }, [assessmentId, clerkUserId, useLatest]);

  return (
    <main className="mx-auto max-w-xl px-4 py-10">
      <p className="text-sm text-slate-500">
        <Link href="/staff" className="text-teal-700 underline">Staff dashboard</Link>
        {' · '}
        <Link href="/admin/blog" className="text-teal-700 underline">Blog admin</Link>
      </p>
      <h1 className="mt-4 text-2xl font-bold text-slate-900">Link patient to assessment</h1>
      <p className="mt-2 text-sm text-slate-600">
        Connect a Clerk login to a row in <code className="text-xs">patient_assessments</code> so{' '}
        <Link href="/tracker" className="text-teal-700 underline">/tracker</Link> shows baseline labs.
        Sign in with a staff email (same allowlist as <code className="text-xs">/staff</code>).
      </p>

      <div className="mt-8 space-y-5 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div>
          <label className="block text-sm font-medium text-slate-700" htmlFor="clerk-id">
            Clerk user id
          </label>
          <input
            id="clerk-id"
            className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
            placeholder="user_2abc…"
            value={clerkUserId}
            onChange={(e) => setClerkUserId(e.target.value)}
            autoComplete="off"
          />
          <p className="mt-1 text-xs text-slate-500">
            In Clerk Dashboard → Users → copy User ID. Or ask the patient to open their profile after sign-in.
          </p>
        </div>

        <label className="flex items-center gap-2 text-sm text-slate-700">
          <input
            type="checkbox"
            checked={useLatest}
            onChange={(e) => setUseLatest(e.target.checked)}
            className="h-4 w-4 rounded border-slate-300 text-teal-600"
          />
          Use latest unmatched assessment (no clerk_user_id yet)
        </label>

        {!useLatest && (
          <div>
            <label className="block text-sm font-medium text-slate-700" htmlFor="assessment-id">
              Assessment id (UUID)
            </label>
            <input
              id="assessment-id"
              className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm font-mono"
              placeholder="full uuid from save response or Neon"
              value={assessmentId}
              onChange={(e) => setAssessmentId(e.target.value)}
            />
          </div>
        )}

        <button
          type="button"
          disabled={loading || !clerkUserId.trim()}
          onClick={onSubmit}
          className="w-full rounded-xl bg-teal-600 px-4 py-3 text-sm font-bold text-white hover:bg-teal-700 disabled:opacity-50"
        >
          {loading ? 'Linking…' : 'Link to Assessment'}
        </button>

        {error && (
          <p className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-800" role="alert">
            {error}
          </p>
        )}
        {success && (
          <p className="rounded-lg border border-green-200 bg-green-50 px-3 py-2 text-sm text-green-800" role="status">
            {success}
          </p>
        )}
      </div>
    </main>
  );
}
