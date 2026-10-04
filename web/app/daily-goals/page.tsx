import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Daily healthy goals | HOMA Clinic",
  description: "Daily protein, food, movement, and sleep goals. Lab cutoffs stay on a separate page.",
};

const goals = [
  ["Protein", "1.2 to 1.8 g per kg. Four meals, not one big meal. Eggs, dal, paneer, curd, chicken."],
  ["Carbs", "About half the plate. Not a heap of rice."],
  ["Fat", "About a teaspoon with the meal."],
  ["Exercise", "150 minutes of walking a week. Muscle work on 2 days. Yoga does not replace the walk."],
];

export default function DailyGoalsPage() {
  return (
    <main style={{ background: "#f4f7fb", color: "#1a1a1a", minHeight: "100vh" }}>
      <header style={{ background: "linear-gradient(160deg, #07153a 0%, #0D2B4E 70%)", color: "#fff", padding: "48px 6% 36px", textAlign: "center" }}>
        <p style={{ margin: "0 0 8px", letterSpacing: "0.16em", textTransform: "uppercase", color: "#d4af37", fontSize: "12px", fontWeight: 700 }}>HOMA Clinic</p>
        <h1 style={{ fontFamily: "'EB Garamond', serif", fontSize: "clamp(32px, 5vw, 52px)", fontWeight: 500, margin: "0 0 10px" }}>Daily healthy goals</h1>
        <p style={{ margin: "0 auto 18px", maxWidth: "560px", fontSize: "16px", lineHeight: 1.5, color: "rgba(255,255,255,0.82)" }}>
          Food, movement, and sleep. Lab cutoffs stay on their own page.
        </p>
        <Link href="/" style={{ color: "#d4af37", fontWeight: 700, fontSize: "15px" }}>Back to the homepage</Link>
      </header>
      <div style={{ maxWidth: "760px", margin: "0 auto", padding: "28px 6% 72px" }}>
        <a href="https://res.cloudinary.com/drhsco04l/image/upload/v1791130503/Woman_doctor_explaining_protein___20261004211237_j38otn.jpg" target="_blank" rel="noopener noreferrer">
          <img src="https://res.cloudinary.com/drhsco04l/image/upload/v1791130503/Woman_doctor_explaining_protein___20261004211237_j38otn.jpg" alt="Daily protein, 1.2 to 1.8 g per kg, four meals" style={{ display: "block", width: "100%", height: "auto", borderRadius: "12px", marginBottom: "18px" }} />
        </a>

        <a href="https://res.cloudinary.com/drhsco04l/image/upload/v1791130560/Daily_carbohydrates_plate_portio__20261004214528_qxdk15.jpg" target="_blank" rel="noopener noreferrer">
          <img src="https://res.cloudinary.com/drhsco04l/image/upload/v1791130560/Daily_carbohydrates_plate_portio__20261004214528_qxdk15.jpg" alt="Daily carbohydrates, about half the plate, not a heap of rice" style={{ display: "block", width: "100%", height: "auto", borderRadius: "12px", marginBottom: "18px" }} />
        </a>

        <a href="https://res.cloudinary.com/drhsco04l/image/upload/v1791130819/dailyfat1_mx1w7x.jpg" target="_blank" rel="noopener noreferrer">
          <img src="https://res.cloudinary.com/drhsco04l/image/upload/v1791130819/dailyfat1_mx1w7x.jpg" alt="Daily fat, 4 to 6 teaspoons a day" style={{ display: "block", width: "100%", height: "auto", borderRadius: "12px", marginBottom: "18px" }} />
        </a>

        <a href="https://res.cloudinary.com/drhsco04l/image/upload/v1791130750/walkinggoals_jcg6gd.jpg" target="_blank" rel="noopener noreferrer">
          <img src="https://res.cloudinary.com/drhsco04l/image/upload/v1791130750/walkinggoals_jcg6gd.jpg" alt="Walking goal, 150 minutes a week" style={{ display: "block", width: "100%", height: "auto", borderRadius: "12px", marginBottom: "18px" }} />
        </a>

        <a href="https://res.cloudinary.com/drhsco04l/image/upload/v1791130852/dailyreq1_yqjsth.jpg" target="_blank" rel="noopener noreferrer">
          <img src="https://res.cloudinary.com/drhsco04l/image/upload/v1791130852/dailyreq1_yqjsth.jpg" alt="Daily requirements" style={{ display: "block", width: "100%", height: "auto", borderRadius: "12px", marginBottom: "18px" }} />
        </a>

<a href="https://res.cloudinary.com/drhsco04l/image/upload/v1791131744/micro4_mtrcob.jpg" target="_blank" rel="noopener noreferrer">
          <img src="https://res.cloudinary.com/drhsco04l/image/upload/v1791131744/micro4_mtrcob.jpg" alt="Six nutrients many Indian plates miss" style={{ display: "block", width: "100%", height: "auto", borderRadius: "12px", marginBottom: "18px" }} />
        </a>
<a href="https://res.cloudinary.com/drhsco04l/image/upload/v1791131048/gokimg7_y95q8c.jpg" target="_blank" rel="noopener noreferrer">
          <img src="https://res.cloudinary.com/drhsco04l/image/upload/v1791131048/gokimg7_y95q8c.jpg" alt="Lady doctor showing the HOMA app" style={{ display: "block", width: "100%", height: "auto", borderRadius: "12px", marginBottom: "18px" }} />
        </a>
        <a href="https://res.cloudinary.com/drhsco04l/image/upload/v1791130931/proteinslide1_f6h8xm.jpg" target="_blank" rel="noopener noreferrer">
          <img src="https://res.cloudinary.com/drhsco04l/image/upload/v1791130931/proteinslide1_f6h8xm.jpg" alt="Protein slide" style={{ display: "block", width: "100%", height: "auto", borderRadius: "12px", marginBottom: "18px" }} />
        </a>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: "14px" }}>
          {goals.filter(([title]) => title !== "Protein" && title !== "Carbs" && title !== "Fat" && title !== "Exercise").map(([title, note]) => (
            <article key={title} style={{ background: "#07153a", color: "#fff", borderRadius: "12px", padding: "16px", border: "1px solid #d4af37" }}>
              <h2 style={{ color: "#d4af37", fontSize: "18px", margin: "0 0 8px" }}>{title}</h2>
              <p style={{ margin: 0, fontSize: "15px", lineHeight: 1.5 }}>{note}</p>
            </article>
          ))}
        </div>
        <p style={{ marginTop: "22px", fontSize: "15px" }}>
          <Link href="/track" style={{ color: "#0D2B4E", fontWeight: 700 }}>Log a meal, a walk, or sleep and earn HOMA coins</Link>
        </p>
        <p style={{ fontSize: "15px" }}>
          <Link href="/normal-values" style={{ color: "#0D2B4E", fontWeight: 700 }}>Lab and body cutoffs stay here</Link>
        </p>
      </div>
    </main>
  );
}
