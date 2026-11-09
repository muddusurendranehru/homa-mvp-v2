'use client';

import Link from 'next/link';
import { useCallback, useEffect, useState } from 'react';
import { buildWhatsAppUrlForMobile } from '@/lib/whatsapp-patient-invite';

type PatientTrackerRow = {
  id: string;
  patient_name: string | null;
  mobile_number: string | null;
};

function SendWhatsAppLink({
  mobile,
  className = '',
}: {
  mobile: string | null | undefined;
  className?: string;
}) {
  const url = mobile ? buildWhatsAppUrlForMobile(mobile) : null;
  if (!url) return null;
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex shrink-0 items-center rounded-lg border border-green-600 bg-green-50 px-3 py-1.5 text-xs font-semibold text-green-800 hover:bg-green-100 ${className}`}
    >
      Send WhatsApp Link
    </a>
  );
}

function PatientListItem({ row }: { row: PatientTrackerRow }) {
  return (
    <li className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200 pb-2 last:border-0 last:pb-0">
      <div className="min-w-0 text-sm text-slate-800">
        <span className="font-semibold">{row.patient_name ?? '—'}</span>
        <span className="text-slate-500"> · </span>
        <span className="font-mono text-xs">{row.mobile_number ?? '—'}</span>
      </div>
      <SendWhatsAppLink mobile={row.mobile_number} />
    </li>
  );
}

export default function AdminAddPatientPage() {
  const [patientName, setPatientName] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [email, setEmail] = useState('');
  const [clerkUserId, setClerkUserId] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successToast, setSuccessToast] = useState(false);
  const [savedRow, setSavedRow] = useState<PatientTrackerRow | null>(null);

  const [mobileQuery, setMobileQuery] = useState('');
  const [searchLoading, setSearchLoading] = useState(false);
  const [searchResults, setSearchResults] = useState<PatientTrackerRow[]>([]);
  const [searchMessage, setSearchMessage] = useState<string | null>(null);
  const [recentPatients, setRecentPatients] = useState<PatientTrackerRow[]>([]);
  const [recentLoading, setRecentLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      setRecentLoading(true);
      try {
        const res = await fetch('/api/admin/search-patients?recent=15');
        const data = await res.json();
        if (!cancelled && res.ok) {
          setRecentPatients((data.patients ?? []) as PatientTrackerRow[]);
        }
      } catch {
        /* staff-only list — ignore */
      } finally {
        if (!cancelled) setRecentLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const onSearch = useCallback(async () => {
    setSearchLoading(true);
    setSearchMessage(null);
    setSearchResults([]);
    try {
      const q = encodeURIComponent(mobileQuery.trim());
      const res = await fetch(`/api/admin/search-patients?mobile=${q}`);
      const data = await res.json();
      if (!res.ok) {
        setSearchMessage(data.error || 'Search failed');
        return;
      }
      const list = (data.patients ?? []) as PatientTrackerRow[];
      setSearchResults(list);
      if (list.length === 0) {
        setSearchMessage('No patient found for that mobile number.');
      }
    } catch {
      setSearchMessage('Network error — try again');
    } finally {
      setSearchLoading(false);
    }
  }, [mobileQuery]);

  const onSave = useCallback(async () => {
    setLoading(true);
    setError(null);
    setSuccessToast(false);
    setSavedRow(null);
    try {
      const res = await fetch('/api/admin/link-patient', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          patient_name: patientName.trim(),
          mobile_number: mobileNumber.trim(),
          email: email.trim(),
          clerk_user_id: clerkUserId.trim(),
        }),
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        setError(data.error || 'Save failed');
        return;
      }
      setSuccessToast(true);
      setSavedRow({
        id: 'saved',
        patient_name: patientName.trim(),
        mobile_number: mobileNumber.trim(),
      });
      const q = encodeURIComponent(mobileQuery.trim());
      const recentRes = await fetch('/api/admin/search-patients?recent=15');
      const recentData = await recentRes.json();
      if (recentRes.ok) {
        setRecentPatients((recentData.patients ?? []) as PatientTrackerRow[]);
      }
      if (mobileQuery.trim().length >= 4) {
        const searchRes = await fetch(`/api/admin/search-patients?mobile=${q}`);
        const searchData = await searchRes.json();
        if (searchRes.ok) {
          setSearchResults((searchData.patients ?? []) as PatientTrackerRow[]);
        }
      }
    } catch {
      setError('Network error — try again');
    } finally {
      setLoading(false);
    }
  }, [clerkUserId, email, mobileNumber, mobileQuery, patientName]);

  const canSave =
    patientName.trim().length > 0 &&
    mobileNumber.replace(/\D/g, '').length >= 10 &&
    email.trim().includes('@') &&
    clerkUserId.trim().length > 0;

  return (
    <main className="mx-auto max-w-xl px-4 py-10">
      {successToast && (
        <div
          role="status"
          className="fixed bottom-6 left-4 right-4 z-[1100] mx-auto max-w-md rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-center text-sm font-semibold text-green-800 shadow-lg sm:left-auto sm:right-6"
        >
          Patient linked successfully!
        </div>
      )}

      <p className="text-sm text-slate-500">
        <Link href="/admin" className="text-teal-700 underline">
          Admin home
        </Link>
      </p>
      <h1 className="mt-4 text-2xl font-bold text-slate-900">Add new patient</h1>
      <p className="mt-2 text-sm text-slate-600">
        Links staff to <code className="text-xs">patient_tracker</code> and sets program start date on first
        insert only.
      </p>

      <div className="mt-8 space-y-5 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div>
          <label className="block text-sm font-medium text-slate-700" htmlFor="patient-name">
            Patient Name
          </label>
          <input
            id="patient-name"
            className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
            value={patientName}
            onChange={(e) => setPatientName(e.target.value)}
            autoComplete="name"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700" htmlFor="mobile">
            Mobile Number
          </label>
          <input
            id="mobile"
            className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
            placeholder="e.g. 9963721999"
            value={mobileNumber}
            onChange={(e) => setMobileNumber(e.target.value)}
            autoComplete="tel"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700" htmlFor="email">
            Email Address
          </label>
          <input
            id="email"
            type="email"
            className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700" htmlFor="clerk-id">
            Clerk User ID
          </label>
          <input
            id="clerk-id"
            className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
            placeholder="user_2abc…"
            value={clerkUserId}
            onChange={(e) => setClerkUserId(e.target.value)}
            autoComplete="off"
          />
        </div>

        <button
          type="button"
          disabled={loading || !canSave}
          onClick={onSave}
          className="w-full rounded-xl bg-teal-600 px-4 py-3 text-sm font-bold text-white hover:bg-teal-700 disabled:opacity-50"
        >
          {loading ? 'Saving…' : 'Save Patient'}
        </button>

        {savedRow && (
          <div className="flex flex-wrap items-center justify-between gap-3 rounded-lg border border-green-200 bg-green-50 px-3 py-3">
            <p className="text-sm font-medium text-green-900">
              {savedRow.patient_name} — share the app link with the patient
            </p>
            <SendWhatsAppLink mobile={savedRow.mobile_number} />
          </div>
        )}

        {error && (
          <p
            className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-800"
            role="alert"
          >
            {error}
          </p>
        )}
      </div>

      <section className="mt-10 space-y-5 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-slate-900">Search by mobile</h2>
        <div className="flex gap-2">
          <input
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
        {searchResults.length > 0 && (
          <ul className="space-y-2 rounded-lg border border-slate-200 bg-slate-50 p-4">
            {searchResults.map((row) => (
              <PatientListItem key={row.id} row={row} />
            ))}
          </ul>
        )}
        {searchMessage && (
          <p className="text-sm text-slate-600" role="status">
            {searchMessage}
          </p>
        )}
      </section>

      <section className="mt-8 space-y-3 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-slate-900">Recent patients</h2>
        {recentLoading ? (
          <p className="text-sm text-slate-500">Loading…</p>
        ) : recentPatients.length === 0 ? (
          <p className="text-sm text-slate-600">No patients in patient_tracker yet.</p>
        ) : (
          <ul className="space-y-2 rounded-lg border border-slate-200 bg-slate-50 p-4">
            {recentPatients.map((row) => (
              <PatientListItem key={row.id} row={row} />
            ))}
          </ul>
        )}
      </section>
    </main>
  );
}
