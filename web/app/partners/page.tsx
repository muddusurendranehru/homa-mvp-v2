import type { Metadata } from "next";
// Link is not needed anymore, we use <a> for external links

export const metadata: Metadata = {
  title: "Partner with HOMA Healthcare Center | Metabolic Reversal Protocols",
  description:
    "Partner with HOMA Healthcare Center to bring Dr. Muddu Surendra Nehru's proven metabolic reversal protocols, clinical registry, and digital tools to your clinic or franchise.",
};
const APPLY_URL = "https://docs.google.com/forms/d/e/1FAIpQLScFyqzVxG4DzDlEgCHFlwNnPbo6Iz1jHLPHrxdQKQBwA9fEcQ/viewform";
const CONTACT_URL = "mailto:info@homahealthcarecenter.in";

const features = [
  {
    title: "Clinical Data",
    description:
      "Access to our 23-Subtype Clinical Registry and evidence-based protocols.",
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z"
      />
    ),
  },
  {
    title: "Tech Platform",
    description:
      "Give your patients access to the Metric Explorer app (500+ installs, 99% retention) and our web tools.",
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3"
      />
    ),
  },
  {
    title: "Trust & Compliance",
    description:
      "Leverage our commitment to HONcode principles and DPDPA-compliant privacy standards.",
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z"
      />
    ),
  },
];

const audiences = [
  "Doctors & Diabetologists",
  "Clinic Owners & Franchisees",
  "Health Tech Entrepreneurs",
];

export default function PartnersPage() {
  return (
    <main className="bg-white text-gray-800">
      {/* Hero */}
      <section className="border-b border-gray-100 bg-gradient-to-b from-green-50/60 to-white">
        <div className="mx-auto max-w-5xl px-6 py-24 text-center sm:py-32">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
            Partner with HOMA Healthcare Center
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-gray-600">
            Bring Dr. Muddu Surendra Nehru&apos;s proven metabolic reversal
            protocols to your clinic or franchise.
          </p>
          <div className="mt-10 flex justify-center">
            <a
              href={APPLY_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg bg-green-600 px-8 py-3.5 text-base font-semibold text-white shadow-sm transition hover:bg-green-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-600 focus-visible:ring-offset-2"
            >
              Apply for Partnership
            </a>
          </div>
        </div>
      </section>

      {/* Why Partner */}
      <section className="mx-auto max-w-6xl px-6 py-20 sm:py-24">
        <h2 className="text-center text-3xl font-bold tracking-tight text-gray-900">
          Why Partner with HOMA?
        </h2>
        <div className="mt-14 grid gap-8 md:grid-cols-3">
          {features.map((f) => (
            <div
              key={f.title}
              className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm transition hover:shadow-md"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-green-100 text-green-700">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="h-6 w-6"
                  aria-hidden="true"
                >
                  {f.icon}
                </svg>
              </div>
              <h3 className="mt-6 text-xl font-semibold text-gray-900">
                {f.title}
              </h3>
              <p className="mt-3 leading-7 text-gray-600">{f.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Who We Are Looking For */}
      <section className="border-y border-gray-100 bg-gray-50">
        <div className="mx-auto max-w-4xl px-6 py-20 sm:py-24">
          <h2 className="text-center text-3xl font-bold tracking-tight text-gray-900">
            Who We Are Looking For
          </h2>
          <ul className="mt-12 grid gap-4 sm:grid-cols-3">
            {audiences.map((a) => (
              <li
                key={a}
                className="flex items-center gap-3 rounded-xl border border-gray-200 bg-white p-5 shadow-sm"
              >
                <span
                  className="flex h-6 w-6 flex-none items-center justify-center rounded-full bg-green-600 text-white"
                  aria-hidden="true"
                >
                  <svg
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="h-4 w-4"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.704 5.29a1 1 0 010 1.42l-7.5 7.5a1 1 0 01-1.42 0l-3.5-3.5a1 1 0 111.42-1.42l2.79 2.79 6.79-6.79a1 1 0 011.42 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </span>
                <span className="font-medium text-gray-900">{a}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-4xl px-6 py-20 text-center sm:py-24">
        <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          Ready to scale metabolic health?
        </h2>
        <div className="mt-10 flex justify-center">
          <a
            href={CONTACT_URL}
            className="rounded-lg bg-green-600 px-8 py-3.5 text-base font-semibold text-white shadow-sm transition hover:bg-green-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-600 focus-visible:ring-offset-2"
          >
            Contact Dr. Nehru&apos;s Team
          </a>
        </div>
      </section>
    </main>
  );
}