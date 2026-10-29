'use client';

import Link from 'next/link';
import { useCallback, useState } from 'react';

type PatientTrackerRow = {
  id: string;
  patient_name: string | null;
  mobile_number: string | null;
};

export default function AdminPatientsPage() {
  const [mobileQuery, setMobileQuery] = useState('');
  const [searchLoading, setSearchLoading] = useState(false);
  const [results, setResults] = useState<PatientTrackerRow[]>([]);
  const [message, setMessage] = useState<string | null>(null);

  const onSearch = useCallback(async () => {
    setSearchLoading(true);
    setMessage(null);
    setResults([]);
    try {
      const q = encodeURIComponent(mobileQuery.trim());
      const res = await fetch(`/api/admin/search-patients?mobile=${q}`);
      const data = await res.json();
      if (!res.ok) {
        setMessage(data.error || 'Search failed');
        return;
      }
      const list = (data.patients ?? []) as PatientTrackerRow[];
      setResults(list);
      if (list.length === 0) {
        setMessage('No patient found for that mobile number.');
      }
    } catch {
      setMessage('Network error — try again');
    } finally {
      setSearchLoading(false);
    }
  }, [mobileQuery]);

  return (
    <main className="mx-auto max-w-xl px-4 py-10">
      <p className="text-sm text-slate-500">
        <Link href="/staff" className="text-teal-700 underline">
          Staff dashboard
        </Link>
        {' · '}
        <Link href="/admin/blog" className="text-teal-700 underline">
          Blog admin
        </Link>
      </p>

      <div className="mt-4 flex flex-wrap items-center gap-3">
        <h1 className="text-2xl font-bold text-slate-900">Admin — patients</h1>
        <Link
          href="/admin/add-patient"
          className="rounded-lg bg-teal-600 px-4 py-2 text-sm font-semibold text-white hover:bg-teal-700"
        >
          Add New Patient
        </Link>
      </div>
      <p className="mt-2 text-sm text-slate-600">
        Search <code className="text-xs">patient_tracker</code> by mobile. Sign in with a staff email
        (same allowlist as <code className="text-xs">/staff</code>).
      </p>

      <div className="mt-8 space-y-5 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div>
          <label className="block text-sm font-medium text-slate-700" htmlFor="mobile-search">
            Search by mobile number
          </label>
          <div className="mt-1 flex gap-2">
            <input
              id="mobile-search"
              className="min-w-0 flex-1 rounded-lg border border-slate-300 px-3 py-2 text-sm"
              placeholder="e.g. 96665… or +91 996…"
              value={mobileQuery}
              onChange={(e) => setMobileQuery(e.target.value)}
              autoComplete="off"
            />
            <button
              type="button"
              disabled={searchLoading || mobileQuery.trim().length < 4}
              onClick={onSearch}
              className="shrink-0 rounded-lg bg-slate-800 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-900 disabled:opacity-50"
            >
              {searchLoading ? 'Searching…' : 'Search'}
            </button>
          </div>
        </div>

        {results.length > 0 && (
          <ul className="space-y-2 rounded-lg border border-slate-200 bg-slate-50 p-4">
            {results.map((row) => (
              <li key={row.id} className="text-sm text-slate-800">
                <span className="font-semibold">{row.patient_name ?? '—'}</span>
                <span className="text-slate-500"> · </span>
                <span className="font-mono text-xs">{row.mobile_number ?? '—'}</span>
              </li>
            ))}
          </ul>
        )}

        {message && (
          <p className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-700">
            {message}
          </p>
        )}
      </div>
    </main>
  );
}
