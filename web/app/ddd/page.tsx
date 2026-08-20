import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'D·D·D Campaign | Diabetes Organ Damage | HOMA Clinic Gachibowli',
  description:
    'Detect diabetes damage early. HOMA test explained simply. Door-to-door metabolic care in Hyderabad. WhatsApp 09963721999.',
};

const WA = 'https://wa.me/919963721999';
const WA_DDD = `${WA}?text=${encodeURIComponent(
  'Hi Dr. Nehru — I saw the D·D·D campaign. I want to book / know more about HOMA & door-to-door visit.'
)}`;
const PLAY_STORE =
  'https://play.google.com/store/apps/details?id=com.homaclinic.app&utm_source=ddd_page&utm_medium=footer';

export default function DddCampaignPage() {
  return (
    <div
      data-ddd-landing
      className="min-h-screen bg-gradient-to-b from-slate-950 via-teal-950 to-emerald-950 text-white"
    >
      <div className="sticky top-0 z-40 border-b border-teal-500/30 bg-teal-950/90 px-4 py-3 backdrop-blur-md">
        <div className="mx-auto flex max-w-3xl items-center justify-between gap-3 text-sm">
          <Link href="/" className="font-semibold text-teal-100 hover:text-white">
            ← HOMA Clinic
          </Link>
          <a href="tel:+919963721999" className="text-teal-200 hover:text-white">
            09963721999
          </a>
        </div>
      </div>

      <section className="px-4 pb-12 pt-10 md:pb-16 md:pt-14">
        <div className="mx-auto max-w-3xl text-center">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-teal-300">
            D · D · D — Don&apos;t Delay Damage
          </p>
          <h1 className="text-3xl font-extrabold leading-tight text-white md:text-5xl">
            High sugar isn&apos;t &quot;just a number.&quot;{' '}
            <span className="text-red-400">It silently damages organs</span> — years before you feel it.
          </h1>
          <p className="mt-6 text-lg text-teal-100/95 md:text-xl">
            Eyes, kidneys, nerves, and blood vessels can suffer while fasting glucose still looks
            &quot;okay.&quot; The right test finds insulin resistance early — before irreversible harm.
          </p>
        </div>
      </section>

      <section className="border-y border-teal-500/20 bg-teal-900/40 px-4 py-12 md:py-14">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-center text-2xl font-bold text-white md:text-3xl">
            HOMA test — explained simply
          </h2>
          <ul className="mt-8 space-y-4 text-base text-teal-50/95 md:text-lg">
            <li className="flex gap-3">
              <span className="text-teal-400">●</span>
              <span>
                <strong className="text-white">HOMA-IR</strong> estimates how resistant your cells are
                to insulin using fasting glucose and fasting insulin together — not glucose alone.
              </span>
            </li>
            <li className="flex gap-3">
              <span className="text-teal-400">●</span>
              <span>
                When insulin is high but sugar looks normal, metabolism is already under strain —
                the stage where reversal is still possible.
              </span>
            </li>
            <li className="flex gap-3">
              <span className="text-teal-400">●</span>
              <span>
                At HOMA Clinic, we use this metric to guide nutrition, movement, and follow-up — so
                you fix the root pattern, not only the lab printout.
              </span>
            </li>
          </ul>
        </div>
      </section>

      <section className="px-4 py-12 md:py-16">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-center text-2xl font-bold text-white md:text-3xl">
            Door-to-door service — how it works
          </h2>
          <ol className="mt-10 space-y-6">
            {[
              {
                step: '1',
                title: 'WhatsApp us',
                body: 'Share your area in Hyderabad and a convenient time window.',
              },
              {
                step: '2',
                title: 'Schedule',
                body: 'We coordinate a home visit for sample collection / assessment as applicable.',
              },
              {
                step: '3',
                title: 'Testing & clarity',
                body: 'Fasting insulin–guided interpretation — HOMA-IR context, not random advice.',
              },
              {
                step: '4',
                title: 'Next steps',
                body: 'If you qualify, we map a structured plan — 30 / 90-day options with follow-up.',
              },
            ].map((item) => (
              <li
                key={item.step}
                className="flex gap-4 rounded-2xl border border-teal-500/25 bg-gradient-to-r from-teal-900/50 to-emerald-900/40 p-5 shadow-lg"
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-teal-500 text-lg font-bold text-slate-950">
                  {item.step}
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">{item.title}</h3>
                  <p className="mt-1 text-sm text-teal-100/90 md:text-base">{item.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="px-4 pb-8">
        <div className="mx-auto max-w-lg text-center">
          <a
            href={WA_DDD}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-[#25D366] px-6 py-5 text-lg font-bold text-white shadow-xl transition hover:bg-[#20bd5a] md:text-xl"
          >
            <span>💬</span>
            WhatsApp now: 09963721999
          </a>
          <p className="mt-3 text-sm text-teal-200/80">Tap to chat — we reply on WhatsApp.</p>
        </div>
      </section>

      <section className="border-t border-teal-500/20 px-4 py-10">
        <div className="mx-auto max-w-3xl rounded-2xl border border-teal-500/30 bg-teal-950/50 p-6 text-center md:p-8">
          <p className="text-sm font-semibold uppercase tracking-wide text-teal-300">HOMA Clinic app</p>
          <p className="mt-2 text-teal-100/90">
            Track metrics, education, and program touchpoints on your phone when you&apos;re enrolled.
          </p>
          <a
            href={PLAY_STORE}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-5 inline-block rounded-full bg-gradient-to-r from-teal-500 to-emerald-600 px-8 py-3 font-bold text-white shadow-lg transition hover:from-teal-400 hover:to-emerald-500"
          >
            Get the Android app
          </a>
          <div className="mt-6 text-sm">
            <Link href="/" className="text-teal-300 underline hover:text-white">
              Full HOMA Clinic website
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
