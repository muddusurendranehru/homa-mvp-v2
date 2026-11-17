// ⚠️ DATA SAFETY RULES — read before editing:
// 1. Every case MUST be a real patient with a written, signed consent form on file.
// 2. NEVER put a patient's name here. Code + age/sex + area only.
// 3. Every number must come from an actual lab report. No estimates, no rounding up.
// 4. If a metric is not in the report, DELETE that row — do not invent a value.
// 5. consent must stay `true`. Setting it to false hides the case instantly.

export type CaseMetric = { label: string; before: string; after: string };

export type CaseResult = {
  code: string;
  area: string;
  weeks: number;
  metrics: CaseMetric[];
  consent: boolean;
};

// Real counts from Neon as of 17 Nov 2026 — update monthly by hand
export const programStats = {
  subtypes: 26,
  patientsOnPlans: 21,
  doctorFollowUps: 90,
};

export const caseResults: CaseResult[] = [
  // PLACEHOLDER — verify against real report + signed consent before setting consent: true
  {
    code: "ST07 · 52M",
    area: "Kondapur",
    weeks: 14,
    consent: false,
    metrics: [
      { label: "HbA1c", before: "9.2%", after: "6.1%" },
      { label: "Fasting Sugar", before: "168", after: "94" },
      { label: "Weight", before: "88 kg", after: "79 kg" },
    ],
  },
  {
    code: "ST12 · 45F",
    area: "Madhapur",
    weeks: 12,
    consent: false,
    metrics: [
      { label: "HbA1c", before: "8.7%", after: "6.4%" },
      { label: "Triglycerides", before: "280", after: "150" },
      { label: "Waist", before: "98 cm", after: "84 cm" },
    ],
  },
  {
    code: "ST03 · 58M",
    area: "Gachibowli",
    weeks: 16,
    consent: false,
    metrics: [
      { label: "Fasting Sugar", before: "142", after: "96" },
      { label: "LDL Cholesterol", before: "156", after: "98" },
      { label: "Weight", before: "92 kg", after: "83 kg" },
    ],
  },
  // ← add more real, consented cases here. 4–8 cards is ideal.
];
