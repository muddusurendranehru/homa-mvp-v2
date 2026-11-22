export type PublicationType = "international" | "book" | "article" | "lecture";
export type Publication = { id: string; type: PublicationType; title: string; venue: string; year: number; citation?: string; url?: string };

export const PUB_STATS = { years: "30+", books: 13, international: 6, internationalYear: 2026, patients: "5,000+" };

export const TITLED_PUBLICATIONS: Publication[] = [
  {
    id: "p1",
    type: "international",
    title: "Waist Circumference-Triglyceride-Glucose Index as a Predictor of Central Obesity-Linked Dyslipidemia and Insulin Resistance: A Clinical Study of 50 Patients in Urban India",
    venue: "Int J Curr Pharm Rev Res",
    year: 2026,
    citation: "2026;18(2):826-833",
    url: "https://doi.org/10.25258/ijcpr.18.2.136",
  },
  {
    id: "p2",
    type: "international",
    title: "Triglyceride-Glucose Index and Metabolic Risk: A Novel Perspective on NAFLD and Lipid Dysregulation",
    venue: "Journal of Contemporary Clinical Practice",
    year: 2025,
    citation: "Nehru MS, Satheesh Kumar K, Sathyanarayana EV. 2025;11:349-357",
  },
  {
    id: "p3",
    type: "international",
    title: "Analysis of Triglycerides to Glucose Index as a Marker of Insulin Resistance in Adult Population at a Tertiary Care Hospital",
    venue: "Int J Acad Med Pharm",
    year: 2024,
    citation: "Nehru MS, Prathyusha M, Kumar SB, Tufheem A. 2024;6(4):258-261",
  },
  {
    id: "p4",
    type: "international",
    title: "Evaluation of Biochemical and Anthropometric Parameters Associated with Insulin Resistance Using TyG Index",
    venue: "International Journal of Medicine",
    year: 2026,
    citation: "Sathyanarayana EV, Reddy BL, Ram YS, Nehru MS. 2026;8(5):977-983",
  },
  {
    id: "p5",
    type: "article",
    title: "A Study on Electrolyte Abnormalities Among Stroke Patients",
    venue: "MedPulse International Journal of Medicine",
    year: 2020,
    citation: "Kumar MR, Nehru MS. 2020;14(1):18-21",
  },
];

export const PUB_CATEGORIES: { type: PublicationType | "patients" | "years"; label: string; count: string; detail: string }[] = [
  { type: "international", label: "International journals", count: String(PUB_STATS.international), detail: `Six papers presented and printed in international journals (${PUB_STATS.internationalYear}) — timestamped, peer-reviewed priority.` },
  { type: "book", label: "Books", count: String(PUB_STATS.books), detail: "Thirteen authored medical books documenting the metabolic / remission approach — dated prior work." },
  { type: "patients", label: "Patients treated", count: PUB_STATS.patients, detail: "Over five thousand patients treated across 30+ years of doctor-led metabolic care." },
  { type: "years", label: "Years of practice", count: PUB_STATS.years, detail: "Three decades-plus of clinical practice, teaching and publication in diabetes and metabolic medicine." },
];

export const hasTitled = TITLED_PUBLICATIONS.length > 0;
