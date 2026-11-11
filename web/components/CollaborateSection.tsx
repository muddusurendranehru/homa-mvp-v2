import Link from 'next/link';
import {
  COLLABORATE_FORM_URL,
  COLLABORATE_WHATSAPP_URL,
  collaborateAudience,
} from '@/lib/collaborate';

type CollaborateSectionProps = {
  /** When true, show a back link to the homepage (standalone page). */
  standalone?: boolean;
};

export function CollaborateSection({ standalone = false }: CollaborateSectionProps) {
  return (
    <section
      aria-labelledby="collaborate-heading"
      className="border-t border-teal-100 bg-gradient-to-b from-white via-teal-50/50 to-slate-50 px-4 py-12 sm:py-14"
    >
      <div className="mx-auto max-w-2xl text-center">
        {standalone && (
          <p className="mb-6">
            <Link
              href="/"
              className="text-sm font-semibold text-[#0D9488] hover:text-teal-700"
            >
              &larr; Back to homepage
            </Link>
          </p>
        )}

        <p className="text-sm font-semibold uppercase tracking-wide text-[#0D9488]">
          Partners across India
        </p>
        <h2
          id="collaborate-heading"
          className="mt-2 text-2xl font-bold text-slate-900 sm:text-3xl"
        >
          Collaborate with HOMA Healthcare
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-slate-600">
          Doctors, health professionals and medical students across India are joining HOMA&apos;s
          Door to Door Diabetes Discovery mission. Join us.
        </p>

        <div className="mt-8 rounded-2xl border border-slate-200 bg-white px-6 py-6 text-left shadow-sm sm:px-8">
          <p className="text-xs font-semibold uppercase tracking-wide text-[#0D9488]">
            Who can join
          </p>
          <ul className="mt-3 space-y-2 text-slate-700">
            {collaborateAudience.map((item) => (
              <li key={item} className="flex gap-2 text-sm sm:text-base">
                <span className="text-[#0D9488]" aria-hidden>
                  ✓
                </span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <a
            href={COLLABORATE_WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex w-full items-center justify-center rounded-xl bg-gradient-to-r from-teal-600 to-emerald-600 px-6 py-4 text-center text-base font-bold text-white shadow-lg shadow-teal-600/25 transition hover:from-teal-700 hover:to-emerald-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2 sm:w-auto sm:min-w-[220px]"
          >
            Join on WhatsApp
          </a>
          {COLLABORATE_FORM_URL ? (
            <a
              href={COLLABORATE_FORM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex w-full items-center justify-center rounded-xl border-2 border-[#0D9488] bg-white px-6 py-4 text-center text-base font-bold text-[#0D9488] transition hover:bg-teal-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2 sm:w-auto sm:min-w-[220px]"
            >
              Fill the sign-up form
            </a>
          ) : null}
        </div>

      </div>
    </section>
  );
}
