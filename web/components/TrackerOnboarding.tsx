'use client';

import { useState } from 'react';

const APP_URL = 'https://mvp.homahealthcarecenter.in';

function QrPlaceholder({ label }: { label: string }) {
  return (
    <div
      className="flex h-[120px] w-[120px] flex-col items-center justify-center rounded-lg border-2 border-dashed border-teal-600/40 bg-slate-100 text-center"
      role="img"
      aria-label={`${label} QR code coming soon`}
    >
      <span className="text-2xl" aria-hidden="true">
        ▦
      </span>
      <span className="mt-1 text-[10px] font-semibold text-slate-500">QR coming soon</span>
    </div>
  );
}

function QrImage({ src, label }: { src: string; label: string }) {
  const [failed, setFailed] = useState(false);
  if (failed) return <QrPlaceholder label={label} />;
  return (
    <img
      src={src}
      alt={`${label} QR code`}
      width={120}
      height={120}
      className="h-[120px] w-[120px] rounded-lg border border-slate-200 bg-white object-contain"
      onError={() => setFailed(true)}
    />
  );
}

const STEPS = [
  {
    n: 1,
    title: 'Get the App',
    accent: 'from-teal-600 to-emerald-600',
    body: (
      <>
        <a
          href={APP_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="font-semibold text-teal-700 underline decoration-teal-600/40 underline-offset-2 hover:text-teal-900"
        >
          mvp.homahealthcarecenter.in
        </a>
        <div className="mt-4 flex flex-wrap justify-center gap-4">
          <div className="text-center">
            <QrImage src="/images/qr/qr-android.png" label="Android" />
            <p className="mt-1 text-xs font-semibold text-slate-600">Android</p>
          </div>
          <div className="text-center">
            <QrImage src="/images/qr/qr-ios.png" label="iPhone" />
            <p className="mt-1 text-xs font-semibold text-slate-600">iPhone</p>
          </div>
        </div>
        <p className="mt-3 text-sm text-slate-600">
          Scan to open on your phone (Android or iPhone) or click the direct link.
        </p>
      </>
    ),
  },
  {
    n: 2,
    title: 'Install',
    accent: 'from-cyan-600 to-teal-600',
    body: (
      <p className="text-sm text-slate-600">
        Tap &apos;Add to Home Screen&apos; on your phone to install the HOMA app instantly. No app store
        needed.
      </p>
    ),
  },
  {
    n: 3,
    title: 'Sign In & Earn',
    accent: 'from-emerald-600 to-green-600',
    body: (
      <p className="text-sm text-slate-600">
        Sign in securely with Google. Start ticking your daily habits, earning HOMA Coins, and saving your
        target organs.
      </p>
    ),
  },
] as const;

export default function TrackerOnboarding() {
  return (
    <section
      className="mb-6 rounded-2xl border border-teal-200 bg-gradient-to-br from-teal-50 via-white to-emerald-50 p-5 shadow-sm sm:p-8"
      aria-labelledby="tracker-onboarding-title"
    >
      <h2 id="tracker-onboarding-title" className="text-center text-xl font-bold text-slate-900 sm:text-2xl">
        Start your 90-day bingo tracker
      </h2>
      <p className="mx-auto mt-2 max-w-2xl text-center text-sm text-slate-600">
        Three quick steps on your phone — then tick daily habits and earn HOMA Coins.
      </p>
      <div className="mt-6 grid gap-4 lg:grid-cols-3">
        {STEPS.map((step) => (
          <article
            key={step.n}
            className="flex h-full flex-col rounded-xl border border-slate-200 bg-white p-5 shadow-sm"
          >
            <div
              className={`mb-3 inline-flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br ${step.accent} text-xl font-extrabold text-white shadow-md`}
            >
              {step.n}
            </div>
            <h3 className="text-lg font-bold text-slate-900">{step.title}</h3>
            <div className="mt-2 flex-grow">{step.body}</div>
          </article>
        ))}
      </div>
    </section>
  );
}