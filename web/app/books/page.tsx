import { Metadata } from "next";
import Link from "next/link";
import { Montserrat, Lato } from "next/font/google";

const montserrat = Montserrat({ subsets: ["latin"], weight: ["600", "700", "800"] });
const lato = Lato({ subsets: ["latin"], weight: ["400", "700"] });

export const metadata: Metadata = {
  title: "Books by Dr Muddu Surendra Nehru MD | HOMA Healthcare Center",
  description:
    "BP: The Untold Truth and The HOMA GLP-1 Prescribing Guide by Dr Muddu Surendra Nehru MD. Buy on Amazon.",
};

const NAVY = "#0D3B5E";
const GOLD = "#F5A623";
const CREAM = "#FDF3DC";

type Book = {
  title: string;
  subtitle: string;
  cover: string;
  amazon: string;
  description: string;
  coAuthors?: string[];
};

const books: Book[] = [
  {
    title: "BP: The Untold Truth",
    subtitle: "Why Your Blood Pressure Is High When Every Test Says Normal",
    cover: "/images/bp-book.jpg",
    amazon: "https://www.amazon.in/dp/B0H23M9VPF",
    description:
      "A clinical guide explaining why blood pressure medicine alone is not enough \u2014 the real cause is insulin resistance.",
  },
  {
    title: "The HOMA GLP-1 Prescribing Guide",
    subtitle:
      "From Insulin Resistance to GLP-1 Receptor Agonists \u2014 A Complete Clinical Manual for Indian Practice",
    cover: "/images/glp1-book.jpg",
    amazon: "https://www.amazon.in/dp/B0GXYQMJD6",
    description:
      "India\u2019s first GLP-1 prescribing guide, based on 2,500+ patients screened and the HOMA Quadrant framework.",
    coAuthors: [
      "Dr. Manish Chhaganlal Sachdev",
      "Dr. P Vamsee Krishna",
      "Dr. LKV Kumar Kesamsetty",
      "Dr. Baswaraj Puranik MD MAMS",
    ],
  },
];

export default function BooksPage() {
  return (
    <main className={lato.className} style={{ background: CREAM, color: "#1a1a1a", minHeight: "100vh" }}>
      <header style={{ background: NAVY, color: "#fff", padding: "48px 6% 36px", textAlign: "center" }}>
        <p className={montserrat.className} style={{ margin: "0 0 8px", letterSpacing: "0.16em", textTransform: "uppercase", color: GOLD, fontSize: "13px", fontWeight: 700 }}>
          HOMA Healthcare Center
        </p>
        <h1 className={montserrat.className} style={{ fontSize: "clamp(28px, 5vw, 46px)", fontWeight: 800, margin: "0 0 14px" }}>
          Books by Dr Muddu Surendra Nehru MD
        </h1>
        <Link href="/" style={{ color: GOLD, fontWeight: 700, fontSize: "15px" }}>
          &larr; Back to the homepage
        </Link>
      </header>

      <section style={{ maxWidth: "1100px", margin: "0 auto", padding: "36px 5%", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "28px" }}>
        {books.map((b) => (
          <article key={b.title} style={{ background: "#fff", borderRadius: "14px", border: `2px solid ${GOLD}`, boxShadow: "0 6px 20px rgba(13,59,94,0.12)", padding: "24px", display: "flex", flexDirection: "column" }}>
            <div style={{ background: NAVY, borderRadius: "10px", padding: "16px", display: "flex", justifyContent: "center", marginBottom: "18px" }}>
              <img src={b.cover} alt={`${b.title} book cover`} style={{ width: "100%", maxWidth: "260px", aspectRatio: "2 / 3", objectFit: "contain", borderRadius: "6px" }} />
            </div>
            <h2 className={montserrat.className} style={{ color: NAVY, fontSize: "24px", fontWeight: 800, margin: "0 0 6px" }}>{b.title}</h2>
            <p className={montserrat.className} style={{ color: "#8a5a00", fontSize: "15px", fontWeight: 600, margin: "0 0 14px", lineHeight: 1.4 }}>{b.subtitle}</p>
            <p style={{ fontSize: "16px", lineHeight: 1.6, margin: "0 0 14px" }}>{b.description}</p>
            {b.coAuthors && (
              <div style={{ background: CREAM, borderRadius: "8px", padding: "12px 14px", margin: "0 0 16px" }}>
                <p className={montserrat.className} style={{ margin: "0 0 6px", fontWeight: 700, color: NAVY, fontSize: "14px" }}>Co-authors</p>
                <ul style={{ margin: 0, paddingLeft: "18px", fontSize: "15px", lineHeight: 1.6 }}>
                  {b.coAuthors.map((c) => (
                    <li key={c}>{c}</li>
                  ))}
                </ul>
              </div>
            )}
            <a href={b.amazon} target="_blank" rel="noopener noreferrer" className={montserrat.className} style={{ marginTop: "auto", alignSelf: "flex-start", background: GOLD, color: NAVY, fontWeight: 800, fontSize: "16px", padding: "13px 26px", borderRadius: "8px", textDecoration: "none" }}>
              Buy on Amazon &rarr;
            </a>
          </article>
        ))}
      </section>

      <section style={{ background: NAVY, color: "#fff", padding: "40px 5% 48px", textAlign: "center" }}>
        <h2 className={montserrat.className} style={{ color: GOLD, fontSize: "clamp(22px, 4vw, 32px)", fontWeight: 800, margin: "0 0 22px" }}>Endorsement</h2>
        <figure style={{ maxWidth: "640px", margin: "0 auto" }}>
          <img src="/images/minister-sridhar-babu-homa.jpg" alt="Hon'ble Minister Sri Duddilla Sridhar Babu receiving BP: The Untold Truth" style={{ display: "block", width: "100%", borderRadius: "12px", border: `3px solid ${GOLD}` }} />
          <figcaption style={{ marginTop: "14px", fontSize: "17px", lineHeight: 1.5 }}>
            Endorsed by Hon&rsquo;ble Minister Sri Duddilla Sridhar Babu, Government of Telangana
          </figcaption>
        </figure>
        <p style={{ marginTop: "28px" }}>
          <Link href="/" style={{ color: GOLD, fontWeight: 700 }}>&larr; Back to the homepage</Link>
        </p>
      </section>
    </main>
  );
}