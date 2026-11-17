"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { caseResults } from "@/data/caseResults";

const WA_NUMBER = "919963721999";
const SRC_STORAGE = "homa_attribution_src";

function normalizeSrc(raw: string | null): string | null {
  if (!raw?.trim()) return null;
  const key = raw.trim().toLowerCase();
  const map: Record<string, string> = {
    ig: "Instagram",
    instagram: "Instagram",
    wa: "WhatsApp",
    whatsapp: "WhatsApp",
    fb: "Facebook",
    facebook: "Facebook",
    yt: "YouTube",
    youtube: "YouTube",
  };
  return map[key] ?? raw.trim();
}

function resolveAttributionSrc(): string {
  if (typeof window === "undefined") return "website";
  try {
    const stored = sessionStorage.getItem(SRC_STORAGE);
    if (stored?.trim()) return stored.trim();
  } catch {
    /* private mode */
  }
  const params = new URLSearchParams(window.location.search);
  const fromQuery = params.get("src") ?? params.get("utm_source");
  const normalized = normalizeSrc(fromQuery);
  return normalized ?? "website";
}

export default function CaseResultsSection() {
  const [src, setSrc] = useState("website");

  useEffect(() => {
    setSrc(resolveAttributionSrc());
  }, []);

  const consentedCases = caseResults.filter((c) => c.consent === true);

  if (consentedCases.length === 0) {
    return null;
  }

  const waMessage = `Hi Dr Muddu, I saw the real patient results on the website. I'm interested in the HOMA program. Source: ${src}`;
  const waHref = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(waMessage)}`;

  return (
    <section className="bg-gradient-to-br from-slate-50 to-blue-50 py-12 px-4 sm:py-16">
      <div className="mx-auto max-w-6xl">
        <h2 className="text-center text-3xl font-extrabold text-slate-900 sm:text-4xl">
          Real Patients. Real Lab Reports. Numbers Coming Down.
        </h2>
        <p className="mt-3 text-center text-sm font-medium text-slate-600">
          Shared with written consent. Individual results vary.
        </p>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {consentedCases.map((caseData) => (
            <article
              key={caseData.code}
              className="flex flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
            >
              <div className="mb-4 flex items-baseline justify-between gap-2">
                <div>
                  <div className="text-lg font-bold text-slate-900">{caseData.code}</div>
                  <div className="text-sm text-slate-600">{caseData.area}</div>
                </div>
                <div className="whitespace-nowrap text-right text-xs font-semibold text-emerald-700">
                  in {caseData.weeks} weeks
                </div>
              </div>

              <div className="flex-1 space-y-3">
                {caseData.metrics.map((metric, idx) => (
                  <div key={idx} className="flex flex-col gap-1">
                    <div className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                      {metric.label}
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-red-600 line-through opacity-70">
                        {metric.before}
                      </span>
                      <svg
                        className="h-4 w-4 shrink-0 text-emerald-600"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2.5}
                          d="M13 7l-5 5m0 0l5 5m-5-5h12"
                        />
                      </svg>
                      <span className="text-base font-bold text-emerald-700">{metric.after}</span>
                    </div>
                  </div>
                ))}
              </div>
            </article>
          ))}
        </div>

        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <a
            href={waHref}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-[52px] items-center justify-center rounded-xl bg-[#f97316] px-6 py-3 text-base font-bold text-white no-underline shadow-md transition-colors hover:bg-orange-600 sm:text-lg"
          >
            I'm interested →
          </a>
          <Link
            href="/tracker"
            className="inline-flex min-h-[52px] items-center justify-center rounded-xl bg-[#1e3a8a] px-6 py-3 text-base font-bold text-white no-underline shadow-md transition-colors hover:bg-blue-950 sm:text-lg"
          >
            Sign In / Start Tracking
          </Link>
        </div>
      </div>
    </section>
  );
}
