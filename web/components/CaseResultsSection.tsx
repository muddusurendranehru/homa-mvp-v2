"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { caseResults, programStats } from "@/data/caseResults";

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

function getAvatarSvg(code: string): string {
  const match = code.match(/(\d+)([MF])/);
  if (!match) return getMaleYoungSvg();
  const age = parseInt(match[1], 10);
  const sex = match[2];
  if (sex === "F") return getFemaleSvg();
  if (age >= 55) return getMaleOlderSvg();
  return getMaleYoungSvg();
}

function getMaleYoungSvg(): string {
  return `<svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="24" cy="24" r="23" fill="#8B4513"/><circle cx="24" cy="20" r="12" fill="#A0522D"/><path d="M12 32c0-6.6 5.4-12 12-12s12 5.4 12 12" fill="#8B4513"/><circle cx="19" cy="19" r="1.5" fill="#000"/><circle cx="29" cy="19" r="1.5" fill="#000"/></svg>`;
}

function getMaleOlderSvg(): string {
  return `<svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="24" cy="24" r="23" fill="#696969"/><circle cx="24" cy="20" r="12" fill="#A0522D"/><path d="M12 32c0-6.6 5.4-12 12-12s12 5.4 12 12" fill="#696969"/><circle cx="19" cy="19" r="1.5" fill="#000"/><circle cx="29" cy="19" r="1.5" fill="#000"/></svg>`;
}

function getFemaleSvg(): string {
  return `<svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8 18c0-4 2-8 8-10s8-2 16 0c8 2 8 6 8 10v18c0 2-2 4-4 4H12c-2 0-4-2-4-4V18z" fill="#1a1a1a"/><circle cx="24" cy="22" r="11" fill="#A0522D"/><circle cx="19" cy="21" r="1.5" fill="#000"/><circle cx="29" cy="21" r="1.5" fill="#000"/><circle cx="24" cy="16" r="2" fill="#DC143C"/></svg>`;
}

export default function CaseResultsSection() {
  const [src, setSrc] = useState("website");

  useEffect(() => {
    setSrc(resolveAttributionSrc());
  }, []);

  const consentedCases = caseResults.filter((c) => c.consent === true);
  const hasCases = consentedCases.length > 0;

  const waMessage = hasCases
    ? `Hi Dr Muddu, I saw the real patient results on the website. I'm interested in the HOMA program. Source: ${src}`
    : `Hi Dr Muddu, I'm interested in the precision care program. Source: ${src}`;
  const waHref = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(waMessage)}`;

  return (
    <section className="bg-gradient-to-br from-slate-50 to-blue-50 py-8 px-4 sm:py-12">
      <div className="mx-auto max-w-6xl">
        {hasCases ? (
          <>
            <h2 className="text-center text-2xl font-extrabold text-slate-900 sm:text-3xl">
              Real Patients. Real Lab Reports. Numbers Coming Down.
            </h2>
            <p className="mt-2 text-center text-xs font-medium text-slate-600 sm:text-sm">
              Shared with written consent. Individual results vary.
            </p>
          </>
        ) : (
          <h2 className="text-center text-2xl font-extrabold text-slate-900 sm:text-3xl">
            Precision Care, Tracked by Your Doctor
          </h2>
        )}

        <div className="mt-6 grid grid-cols-3 gap-2 text-center sm:gap-4">
          <div className="rounded-lg bg-white px-2 py-3 shadow-sm">
            <div className="text-xl font-bold text-blue-900 sm:text-2xl">{programStats.subtypes}</div>
            <div className="mt-1 text-[10px] font-medium text-slate-600 sm:text-xs">
              Metabolic Sub-types
            </div>
          </div>
          <div className="rounded-lg bg-white px-2 py-3 shadow-sm">
            <div className="text-xl font-bold text-blue-900 sm:text-2xl">{programStats.patientsOnPlans}</div>
            <div className="mt-1 text-[10px] font-medium text-slate-600 sm:text-xs">
              Patients on Precision Plans
            </div>
          </div>
          <div className="rounded-lg bg-white px-2 py-3 shadow-sm">
            <div className="text-xl font-bold text-blue-900 sm:text-2xl">{programStats.doctorFollowUps}</div>
            <div className="mt-1 text-[10px] font-medium text-slate-600 sm:text-xs">
              Doctor Follow-ups
            </div>
          </div>
        </div>

        {hasCases && (
          <div className="mt-6 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3 xl:grid-cols-4">
            {consentedCases.map((caseData) => (
              <article
                key={caseData.code}
                className="flex flex-col rounded-lg border border-slate-200 bg-white p-3 shadow-sm"
              >
                <div className="mb-2 flex items-start gap-2">
                  <div
                    className="h-9 w-9 shrink-0 overflow-hidden rounded-full"
                    dangerouslySetInnerHTML={{ __html: getAvatarSvg(caseData.code) }}
                    aria-hidden="true"
                  />
                  <div className="min-w-0 flex-1">
                    <div className="text-xs font-bold text-slate-900">{caseData.code}</div>
                    <div className="text-[10px] text-slate-600">{caseData.area}</div>
                    <div className="mt-0.5 text-[10px] font-semibold text-emerald-700">
                      in {caseData.weeks} weeks
                    </div>
                  </div>
                </div>

                <div className="flex-1 space-y-1.5">
                  {caseData.metrics.map((metric, idx) => (
                    <div key={idx} className="flex flex-col">
                      <div className="text-[9px] font-semibold uppercase tracking-wide text-slate-500">
                        {metric.label}
                      </div>
                      <div className="flex items-center gap-1">
                        <span className="text-xs font-medium text-red-600 line-through opacity-70">
                          {metric.before}
                        </span>
                        <svg
                          className="h-3 w-3 shrink-0 text-emerald-600"
                          fill="currentColor"
                          viewBox="0 0 16 16"
                          aria-hidden="true"
                        >
                          <path d="M8 12l-4-4h8z" />
                        </svg>
                        <span className="text-sm font-bold text-emerald-700">{metric.after}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </article>
            ))}
          </div>
        )}

        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <a
            href={waHref}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-[48px] items-center justify-center rounded-xl bg-[#f97316] px-5 py-2.5 text-sm font-bold text-white no-underline shadow-md transition-colors hover:bg-orange-600 sm:text-base"
          >
            I'm interested →
          </a>
          <Link
            href="/tracker"
            className="inline-flex min-h-[48px] items-center justify-center rounded-xl bg-[#1e3a8a] px-5 py-2.5 text-sm font-bold text-white no-underline shadow-md transition-colors hover:bg-blue-950 sm:text-base"
          >
            Sign In / Start Tracking
          </Link>
        </div>
      </div>
    </section>
  );
}
