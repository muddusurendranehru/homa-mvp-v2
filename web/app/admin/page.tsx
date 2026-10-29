'use client';

import Link from 'next/link';
import { useCallback, useState } from 'react';

type PatientTrackerRow = {
  id: string;
  clerk_user_id: string | null;
  mobile_number: string | null;
  email: string | null;
  patient_name: string | null;
  start_date: string | null;
};

type AssessmentRow = {
  id: string;
  patient_name: string | null;
  age: number | null;
  mobile_number: string | null;
  email: string | null;
  created_at: string;
  clerk_user_id: string | null;
};

function formatDate(iso: string): string {
  if (!iso) return '—';
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso.slice(0, 10);
  return d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
}

export default function AdminLinkAssessmentPage() {
  const [registryQuery, setRegistryQuery] = useState('');
  const [registryLoading, setRegistryLoading] = useState(false);
  const [registryResults, setRegistryResults] = useState<PatientTrackerRow[]>([]);
  const [registryMessage, setRegistryMessage] = useState<string | null>(null);

  const [mobileQuery, setMobileQuery] = useState('');
  const [searchLoading, setSearchLoading] = useState(false);
  const [results, setResults] = useState<AssessmentRow[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const [clerkUserId, setClerkUserId] = useState('');
  const [linkLoading, setLinkLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const onRegistrySearch = useCallback(async () => {
    setRegistryLoading(true);
    setRegistryMessage(null);
    setRegistryResults([]);
    try {
      const q = encodeURIComponent(registryQuery.trim());
      const res = await fetch(`/api/admin/search-patients?mobile=${q}`);
      const data = await res.json();
      if (!res.ok) {
        setRegistryMessage(data.error || 'Search failed');
        return;
      }
      const list = (data.patients ?? []) as PatientTrackerRow[];
      setRegistryResults(list);
      if (list.length === 0) {
        setRegistryMessage('No patients in patient_tracker for that mobile number.');
      }
    } catch {
      setRegistryMessage('Network error — try again');
    } finally {
      setRegistryLoading(false);
    }
  }, [registryQuery]);

  const onSearch = useCallback(async () => {
    setSearchLoading(true);
    setError(null);
    setSuccess(null);
    setResults([]);
    setSelectedId(null);
    try {
      const q = encodeURIComponent(mobileQuery.trim());
      const res = await fetch(`/api/admin/search-assessments?mobile=${q}`);
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || 'Search failed');
        return;
      }
      const list = (data.assessments ?? []) as AssessmentRow[];
      setResults(list);
      if (list.length === 0) {
        setError('No assessments found for that mobile number.');
      }
    } catch {
      setError('Network error — try again');
    } finally {
      setSearchLoading(false);
    }
  }, [mobileQuery]);

  const onLink = useCallback(async () => {
    if (!selectedId) {
      setError('Select an assessment from the search results first.');
      return;
    }
    setLinkLoading(true);
    setError(null);
    setSuccess(null);
    try {
      const res = await fetch('/api/admin/link-assessment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          clerk_user_id: clerkUserId.trim(),
          assessment_id: selectedId,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || 'Link failed');
        return;
      }
      const a = data.assessment as AssessmentRow & { clerk_user_id: string };
      const mobile =
        a.mobile_number ??
        results.find((r) => r.id === selectedId)?.mobile_number ??
        mobileQuery.trim();
      setSuccess(`Successfully linked ${mobile} to Clerk ID ${a.clerk_user_id}.`);
    } catch {
      setError('Network error — try again');
    } finally {
      setLinkLoading(false);
    }
  }, [clerkUserId, mobileQuery, results, selectedId]);

  const selectedRow = results.find((r) => r.id === selectedId);

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
        <h1 className="text-2xl font-bold text-slate-900">Admin — patients &amp; assessments</h1>
        <Link
          href="/admin/add-patient"
          className="rounded-lg bg-teal-600 px-4 py-2 text-sm font-semibold text-white hover:bg-teal-700"
        >
          Add New Patient
        </Link>
      </div>
      <p className="mt-2 text-sm text-slate-600">
        Search the <code className="text-xs">patient_tracker</code> registry by mobile, or link clinic
        assessments below. Sign in with a staff email (same allowlist as{' '}
        <code className="text-xs">/staff</code>).
      </p>

      <div className="mt-8 space-y-5 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-slate-900">Patient registry</h2>
        <div>
          <label className="block text-sm font-medium text-slate-700" htmlFor="registry-mobile">
            Search patient_tracker by mobile
          </label>
          <div className="mt-1 flex gap-2">
            <input
              id="registry-mobile"
              className="min-w-0 flex-1 rounded-lg border border-slate-300 px-3 py-2 text-sm"
              placeholder="e.g. 96665… or +91 996…"
              value={registryQuery}
              onChange={(e) => setRegistryQuery(e.target.value)}
              autoComplete="off"
            />
            <button
              type="button"
              disabled={registryLoading || registryQuery.trim().length < 4}
              onClick={onRegistrySearch}
              className="shrink-0 rounded-lg bg-slate-800 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-900 disabled:opacity-50"
            >
              {registryLoading ? 'Searching…' : 'Search'}
            </button>
          </div>
        </div>

        {registryResults.length > 0 && (
          <div className="overflow-x-auto rounded-lg border border-slate-200">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50 text-xs uppercase text-slate-600">
                <tr>
                  <th className="px-2 py-2" scope="col">
                    Name
                  </th>
                  <th className="px-2 py-2" scope="col">
                    Mobile
                  </th>
                  <th className="px-2 py-2" scope="col">
                    Email
                  </th>
                  <th className="px-2 py-2" scope="col">
                    Start
                  </th>
                  <th className="px-2 py-2" scope="col">
                    Clerk id
                  </th>
                </tr>
              </thead>
              <tbody>
                {registryResults.map((row) => (
                  <tr key={row.id} className="border-t border-slate-100">
                    <td className="px-2 py-2">{row.patient_name ?? '—'}</td>
                    <td className="px-2 py-2 font-mono text-xs">{row.mobile_number ?? '—'}</td>
                    <td className="px-2 py-2 text-xs">{row.email ?? '—'}</td>
                    <td className="px-2 py-2 whitespace-nowrap">
                      {row.start_date ? formatDate(row.start_date) : '—'}
                    </td>
                    <td className="px-2 py-2 font-mono text-xs">{row.clerk_user_id ?? '—'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {registryMessage && (
          <p className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-700">
            {registryMessage}
          </p>
        )}
      </div>

      <div className="mt-10 space-y-5 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-slate-900">Link patient to assessment</h2>
        <p className="text-sm text-slate-600">
          Pick a row in <code className="text-xs">patient_assessments</code> so{' '}
          <Link href="/tracker" className="text-teal-700 underline">
            /tracker
          </Link>{' '}
          shows baseline labs.
        </p>

        <div>
          <label className="block text-sm font-medium text-slate-700" htmlFor="mobile-search">
            Search assessments by mobile
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
          <p className="mt-1 text-xs text-slate-500">
            Matches digits in saved mobile numbers (10-digit India or with +91).
          </p>
        </div>

        {results.length > 0 && (
          <div className="overflow-x-auto rounded-lg border border-slate-200">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50 text-xs uppercase text-slate-600">
                <tr>
                  <th className="px-2 py-2" scope="col">
                    Pick
                  </th>
                  <th className="px-2 py-2" scope="col">
                    Name
                  </th>
                  <th className="px-2 py-2" scope="col">
                    Age
                  </th>
                  <th className="px-2 py-2" scope="col">
                    Mobile
                  </th>
                  <th className="px-2 py-2" scope="col">
                    Date
                  </th>
                </tr>
              </thead>
              <tbody>
                {results.map((row) => (
                  <tr
                    key={row.id}
                    className={`border-t border-slate-100 ${selectedId === row.id ? 'bg-teal-50' : ''}`}
                  >
                    <td className="px-2 py-2">
                      <input
                        type="radio"
                        name="assessment"
                        checked={selectedId === row.id}
                        onChange={() => setSelectedId(row.id)}
                        aria-label={`Select assessment for ${row.patient_name ?? row.mobile_number ?? row.id}`}
                      />
                    </td>
                    <td className="px-2 py-2">{row.patient_name ?? '—'}</td>
                    <td className="px-2 py-2">{row.age ?? '—'}</td>
                    <td className="px-2 py-2 font-mono text-xs">{row.mobile_number ?? '—'}</td>
                    <td className="px-2 py-2 whitespace-nowrap">{formatDate(row.created_at)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            {selectedRow?.clerk_user_id && (
              <p className="border-t border-amber-200 bg-amber-50 px-3 py-2 text-xs text-amber-900">
                This row already has Clerk id {selectedRow.clerk_user_id}. Linking will overwrite it.
              </p>
            )}
          </div>
        )}

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
            In Clerk Dashboard → Users → copy User ID. Or ask the patient to open their profile after
            sign-in.
          </p>
        </div>

        <button
          type="button"
          disabled={linkLoading || !clerkUserId.trim() || !selectedId}
          onClick={onLink}
          className="w-full rounded-xl bg-teal-600 px-4 py-3 text-sm font-bold text-white hover:bg-teal-700 disabled:opacity-50"
        >
          {linkLoading ? 'Linking…' : 'Link to Assessment'}
        </button>

        {error && (
          <p
            className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-800"
            role="alert"
          >
            {error}
          </p>
        )}
        {success && (
          <p
            className="rounded-lg border border-green-200 bg-green-50 px-3 py-2 text-sm text-green-800"
            role="status"
          >
            {success}
          </p>
        )}
      </div>
    </main>
  );
}
