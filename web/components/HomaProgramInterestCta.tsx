"use client";

import { useEffect, useState } from "react";

const WA_BASE = "https://wa.me/919963721999";
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
  if (map[key]) return map[key];
  return raw.trim();
}

function buildWhatsAppHref(src: string) {
  const text = `Hi Dr Muddu, I'm interested in the HOMA 90-Day Program. Source: ${src}`;
  return `${WA_BASE}?text=${encodeURIComponent(text)}`;
}

function resolveAttributionSrc(): string {
  if (typeof window === "undefined") return "Website";
  try {
    const stored = sessionStorage.getItem(SRC_STORAGE);
    if (stored) return stored;
  } catch {
    /* private mode */
  }
  const params = new URLSearchParams(window.location.search);
  const fromQuery = params.get("src") ?? params.get("utm_source");
  const normalized = normalizeSrc(fromQuery);
  const src = normalized ?? "Website";
  try {
    sessionStorage.setItem(SRC_STORAGE, src);
  } catch {
    /* ignore */
  }
  return src;
}

export default function HomaProgramInterestCta() {
  const [href, setHref] = useState(() => buildWhatsAppHref("Website"));

  useEffect(() => {
    setHref(buildWhatsAppHref(resolveAttributionSrc()));
  }, []);

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      style={{
        display: "block",
        background: "#F5A623",
        color: "#1a1a1a",
        fontWeight: 700,
        fontSize: "16px",
        padding: "16px",
        borderRadius: "10px",
        textDecoration: "none",
        textAlign: "center",
      }}
    >
      I&apos;m Interested →
    </a>
  );
}