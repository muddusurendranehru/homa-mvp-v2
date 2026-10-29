'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useCallback, useState } from 'react';

export default function AdminAddPatientPage() {
  const router = useRouter();
  const [patientName, setPatientName] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [email, setEmail] = useState('');
  const [clerkUserId, setClerkUserId] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successToast, setSuccessToast] = useState(false);

  const onSave = useCallback(async () => {
    setLoading(true);
    setError(null);
    setSuccessToast(false);
    try {
      const res = await fetch('/api/admin/add-patient', {
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
      window.setTimeout(() => {
        router.push('/admin');
      }, 1200);
    } catch {
      setError('Network error — try again');
    } finally {
      setLoading(false);
    }
  }, [clerkUserId, email, mobileNumber, patientName, router]);

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
          Patient added successfully!
        </div>
      )}

      <p className="text-sm text-slate-500">
        <Link href="/admin" className="text-teal-700 underline">
          Admin home
        </Link>
      </p>
      <h1 className="mt-4 text-2xl font-bold text-slate-900">Add new patient</h1>
      <p className="mt-2 text-sm text-slate-600">
        Saves to <code className="text-xs">patient_tracker</code> with program start date = today.
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

        {error && (
          <p
            className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-800"
            role="alert"
          >
            {error}
          </p>
        )}
      </div>
    </main>
  );
}
