import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center px-4 py-16">
      <p className="text-6xl font-bold text-slate-700">404</p>
      <p className="text-xl text-slate-600 mt-2 mb-6">This page could not be found.</p>
      <div className="flex flex-wrap gap-4 justify-center">
        <Link
          href="/"
          className="inline-block bg-teal-600 hover:bg-teal-500 text-white font-semibold px-6 py-3 rounded-lg transition-colors"
        >
          ← Home
        </Link>
        <Link
          href="/auth"
          className="inline-block bg-slate-700 hover:bg-slate-600 text-white font-semibold px-6 py-3 rounded-lg transition-colors"
        >
          Login
        </Link>
        <Link
          href="/dashboard"
          className="inline-block border-2 border-teal-600 text-teal-700 hover:bg-teal-50 font-semibold px-6 py-3 rounded-lg transition-colors"
        >
          Dashboard
        </Link>
      </div>
    </div>
  );
}
