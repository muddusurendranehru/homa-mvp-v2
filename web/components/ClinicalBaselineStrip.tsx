import Link from 'next/link';

export type ClinicalBaselineData = {
  age: number | null;
  gender: string | null;
  hba1c: number | null;
  homaIr: number | null;
};

type Props =
  | { variant: 'baseline'; data: ClinicalBaselineData }
  | { variant: 'processing' }
  | { variant: 'sign_in' };

function formatGender(g: string | null) {
  if (!g) return '—';
  const lower = g.toLowerCase();
  if (lower === 'm' || lower === 'male') return 'Male';
  if (lower === 'f' || lower === 'female') return 'Female';
  return g;
}

export default function ClinicalBaselineStrip(props: Props) {
  if (props.variant === 'sign_in') {
    return (
      <section
        className="rounded-2xl border border-teal-200 bg-gradient-to-br from-teal-50 to-white p-5 shadow-sm sm:p-6"
        aria-label="Clinical baseline"
      >
        <p className="text-sm text-slate-700">
          Sign in to see your clinic baseline labs on this tracker.
        </p>
        <Link
          href="/auth"
          className="mt-3 inline-flex rounded-lg bg-teal-600 px-4 py-2 text-sm font-semibold text-white hover:bg-teal-700"
        >
          Sign In
        </Link>
      </section>
    );
  }

  if (props.variant === 'processing') {
    return (
      <section
        className="rounded-2xl border border-slate-200 bg-slate-50 p-5 shadow-sm sm:p-6"
        aria-label="Clinical baseline"
      >
        <p className="text-sm font-medium text-slate-800">
          Your clinical data is being processed. Please check back after your clinic visit.
        </p>
      </section>
    );
  }

  const { data } = props;
  const homaIr = data.homaIr ?? null;

  return (
    <section
      className="rounded-2xl border border-teal-200 bg-gradient-to-br from-teal-50 via-white to-white p-5 shadow-md sm:p-6"
      aria-label="Clinical baseline from your assessment"
    >
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <h2 className="text-lg font-bold text-teal-900">Your clinical baseline</h2>
        <span className="text-xs font-semibold uppercase tracking-wide text-teal-700/80">From clinic labs</span>
      </div>
      <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-xl border border-teal-100 bg-white/80 px-4 py-3">
          <p className="text-xs font-semibold uppercase text-slate-500">Age</p>
          <p className="mt-1 text-2xl font-bold text-slate-900">{data.age ?? '—'}</p>
        </div>
        <div className="rounded-xl border border-teal-100 bg-white/80 px-4 py-3">
          <p className="text-xs font-semibold uppercase text-slate-500">Gender</p>
          <p className="mt-1 text-2xl font-bold text-slate-900">{formatGender(data.gender)}</p>
        </div>
        <div className="rounded-xl border border-teal-100 bg-white/80 px-4 py-3">
          <p className="text-xs font-semibold uppercase text-slate-500">HOMA-IR</p>
          <p className="mt-1 text-2xl font-bold text-[#0D9488]">
            {homaIr != null ? homaIr.toFixed(2) : '—'}
          </p>
        </div>
        <div className="rounded-xl border border-teal-100 bg-white/80 px-4 py-3">
          <p className="text-xs font-semibold uppercase text-slate-500">HbA1c</p>
          <p className="mt-1 text-2xl font-bold text-slate-900">
            {data.hba1c != null ? `${data.hba1c}%` : '—'}
          </p>
        </div>
      </div>
    </section>
  );
}
