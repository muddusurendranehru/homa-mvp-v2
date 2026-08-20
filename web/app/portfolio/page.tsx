import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Dr. Muddu Surendra Nehru MD | Portfolio & Publications',
  description:
    'Professor of Medicine, Senior Physician — 30+ years, 500K+ patients, 25+ apps, HOMA pioneer. Media, YouTube, collaboration.',
};

const YT = 'https://www.youtube.com/channel/UCf8avHrw6K07POXSIoKgHwg';
const INSTA = 'https://instagram.com/homahealthcarecenter';
const SITE = 'https://www.homahealthcarecenter.in';
const WA = 'https://wa.me/919963721999?text=I want to explore collaboration with HOMA Clinic';

export default function PortfolioPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-teal-50/50 to-cyan-50/40">
      <section className="border-b border-teal-200/60 bg-gradient-to-r from-teal-700 via-emerald-700 to-teal-800 px-4 py-12 text-white md:py-16">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="text-3xl font-extrabold md:text-5xl">Dr. Muddu Surendra Nehru, MD</h1>
          <p className="mt-3 text-lg font-semibold text-teal-100 md:text-xl">
            Professor of Medicine · Senior Physician · Metabolic &amp; HOMA pioneer
          </p>
          <p className="mx-auto mt-4 max-w-2xl text-base text-teal-50/95 md:text-lg">
            World&apos;s first physician to develop AI-based full-stack web apps for nutrition,
            health metrics, and drug-trial tracking — ethics-guided care for over three decades.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-4xl space-y-12 px-4 py-10 md:py-14">
        <section>
          <h2 className="text-2xl font-bold text-slate-900 md:text-3xl">Profile</h2>
          <p className="mt-4 text-slate-700 text-base md:text-lg leading-relaxed">
            Dr. Muddu leads HOMA Clinic (Gachibowli, Hyderabad), focusing on diabetes, obesity,
            cardiovascular risk, and insulin resistance — with fasting insulin and HOMA-IR at the
            center of assessment, not glucose alone.
          </p>
        </section>

        <section className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {[
            { label: 'Clinical experience', value: '30+ years' },
            { label: 'Patients served', value: '5,00,000+' },
            { label: 'HOMA tests (India)', value: '5,000+' },
          ].map((s) => (
            <div
              key={s.label}
              className="rounded-2xl border border-teal-200 bg-white p-5 text-center shadow-sm"
            >
              <div className="text-2xl font-extrabold text-teal-700 md:text-3xl">{s.value}</div>
              <div className="mt-1 text-sm font-medium text-slate-600">{s.label}</div>
            </div>
          ))}
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 md:text-3xl">Publications &amp; thought leadership</h2>
          <ul className="mt-4 list-disc space-y-2 pl-5 text-slate-700 md:text-lg">
            <li>300+ articles written and reviewed — metabolism, HOMA-IR, diabetes, obesity, and heart risk.</li>
            <li>Author of multiple books on diabetes reversal and weight management.</li>
            <li>Regular public education on metabolic health and early detection.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 md:text-3xl">Apps built</h2>
          <p className="mt-3 text-slate-700 md:text-lg">
            25+ digital tools including nutrition guidance, OCR report analysis, PCOS HOMA scoring,
            90-day metrics, and drug-trial tracking — see{' '}
            <Link href="/products" className="font-semibold text-teal-700 underline hover:text-teal-900">
              Products
            </Link>
            .
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 md:text-3xl">YouTube</h2>
          <p className="mt-3 text-slate-700 md:text-lg">
            Educational videos on metabolic health — subscribe for updates on HOMA, lifestyle, and
            remission-focused care.
          </p>
          <a
            href={YT}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex items-center gap-2 rounded-xl bg-red-600 px-6 py-3 font-bold text-white shadow hover:bg-red-700"
          >
            <span>▶️</span> homasurendranehru on YouTube
          </a>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 md:text-3xl">Media &amp; press</h2>
          <p className="mt-3 text-slate-700 md:text-lg">
            Featured in patient directories, local health coverage, and community events — including
            recognition alongside national figures in wellness conversations. Clinic listings: JustDial,
            Practo, and Google Business Profile (Gachibowli).
          </p>
        </section>

        <section className="rounded-2xl border border-teal-300 bg-gradient-to-br from-teal-50 to-emerald-50 p-6 md:p-8">
          <h2 className="text-2xl font-bold text-slate-900 md:text-3xl">Contact &amp; collaboration</h2>
          <p className="mt-3 text-slate-700 md:text-lg">
            Join · Collaborate · Franchise · Donate — connect for partnerships, training, or
            metabolic program enquiries.
          </p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <a href="tel:+919963721999" className="text-lg font-semibold text-teal-800 hover:underline">
              📞 09963721999
            </a>
            <a
              href={WA}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-xl bg-[#25D366] px-6 py-3 font-bold text-white hover:bg-[#20bd5a]"
            >
              💬 WhatsApp
            </a>
            <a
              href={SITE}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-xl border-2 border-teal-600 px-6 py-3 font-bold text-teal-800 hover:bg-teal-100"
            >
              🌐 homahealthcarecenter.in
            </a>
            <a
              href={INSTA}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-xl border border-pink-300 bg-white px-6 py-3 font-semibold text-pink-800 hover:bg-pink-50"
            >
              📷 @homahealthcarecenter
            </a>
          </div>
        </section>
      </div>
    </div>
  );
}
