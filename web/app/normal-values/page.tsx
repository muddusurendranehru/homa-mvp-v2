import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cutoff values | HOMA Clinic",
  description: "Indian BMI, height and weight, waist, and HOMA clinic cutoff slides.",
};

const rows = [
  ["Under 18.5", "Underweight"],
  ["18.5 to 22.9", "Normal for Indian adults"],
  ["23.0 to 24.9", "Overweight"],
  ["25 and above", "Obese"],
];

const weights = [
  ["150 cm", "41.6 to 51.5 kg"],
  ["155 cm", "44.4 to 55.0 kg"],
  ["160 cm", "47.4 to 58.6 kg"],
  ["165 cm", "50.4 to 62.3 kg"],
  ["170 cm", "53.5 to 66.2 kg"],
  ["175 cm", "56.7 to 70.1 kg"],
  ["180 cm", "59.9 to 74.2 kg"],
];

const publicSlides = [
  ["/images/cutoffs/bmi-indian.jpg", "Indian BMI", "Under 18.5 underweight. 18.5 to 22.9 normal. Overweight from 23. Obese from 25."],
  ["/images/cutoffs/calf.jpg", "Calf", "Bigger is better. Below 34 cm is the weak side."],
  ["/images/cutoffs/neck.jpg", "Neck", "Men below 37 cm. Women below 34 cm."],
  ["/images/cutoffs/waist-hip.jpg", "Waist to hip", "Men below 0.90. Women below 0.85."],
  ["/images/cutoffs/waist-height.jpg", "Waist to height", "Below 0.5. Above 0.5 is the risk side."],
  ["/images/cutoffs/six-minute-walk.jpg", "Six-minute walk", "Below 400 metres is the weak side."],
  ["/images/cutoffs/muscle-bia.jpg", "Muscle index, BIA", "Men below 7.0. Women below 5.7."],
  ["/images/cutoffs/visceral-fat.jpg", "Visceral fat", "Above 100 square cm is high."],
  ["/images/cutoffs/height-weight.jpg", "Weight for your height", "Same band for men and women. BMI 18.5 to 22.9."],
  ["/images/cutoffs/height-inches.jpg", "Height in inches", "Centimetres and feet, side by side."],
  ["/images/cutoffs/thali.jpg", "One Indian thali", "Half the plate is vegetable and dal, not a heap of rice."],
  ["/images/cutoffs/food-shares.jpg", "A day's food", "Carbs about half the plate. Protein a palm. Fat a teaspoon."],
  ["/images/cutoffs/water.jpg", "Water, in glasses", "Sip through the day. More if you sweat."],
  ["/images/cutoffs/cut-first.jpg", "Cut this first", "Sugar in tea, then the rice, then dinner after 8 pm."],
  ["/images/cutoffs/five-stands.jpg", "Five stands", "Arms crossed. Time all five. Stop if the knees hurt."],
  ["/images/cutoffs/walk-corridor.jpg", "Walk the corridor", "On 4 metres, slower than 5 seconds is the weak side."],
  ["/images/cutoffs/daily-movement.jpg", "Daily movement", "150 minutes of walking a week. Muscle work 2 days. Yoga does not replace the walk."],
  ["/images/cutoffs/five-kinds.jpg", "Five kinds", "Walk or run stays under 220 minus age. Gym weights are the same job as resistance."],
];

const labSlides = [
  ["/images/cutoffs/homa-ir.jpg", "HOMA-IR", "Normal below 1.0. Borderline 1.0 to 2.3. Abnormal above 2.3."],
  ["/images/cutoffs/fasting-sugar.jpg", "Fasting sugar", "Normal below 100. Prediabetes 100 to 125. Diabetes above 126."],
  ["/images/cutoffs/fasting-insulin.jpg", "Fasting insulin", "Normal below 10. Borderline 10 to 20. High above 20."],
  ["/images/cutoffs/hdl.jpg", "HDL cholesterol", "Low risk above 60. High risk below 40."],
  ["/images/cutoffs/ldl.jpg", "LDL cholesterol", "Best below 100. High above 160. Known heart disease, below 70."],
  ["/images/cutoffs/triglycerides.jpg", "Triglycerides", "Best below 150. High from 200."],
  ["/images/cutoffs/apob.jpg", "ApoB", "Normal below 90. High above 120."],
  ["/images/cutoffs/homocysteine.jpg", "Homocysteine", "Normal below 10. High above 15."],
  ["/images/cutoffs/measurements1.jpg", "Which test", "Tape, BIA, DEXA, or CT. Start with the tape."],
  ["/images/cutoffs/measurements2.jpg", "Tape still wins", "Scanners are costly. A tape is still the clinic standard."],
  ["/images/cutoffs/measurements5.jpg", "Hidden fat", "Neck, waist, and waist-to-height. BMI can look normal."],
  ["/images/cutoffs/measurements4.jpg", "The cutoff card", "HOMA-IR, TyG, sugar, lipids, vitamins, and muscle."],
  ["/images/cutoffs/measurements11.jpg", "Muscle and grip", "DEXA for diagnosis. BIA to follow up. Do not mix the women's numbers."],
  ["/images/cutoffs/measurements12.jpg", "Walk, grip, chair", "The three tests to do with the body scan."],
  ["/images/cutoffs/measurements8.jpg", "Thin outside, weak inside", "High fat, low muscle, HOMA-IR above 2.3."],
  ["/images/cutoffs/measurements10.jpg", "Use with care", "Practice guides. Not every number is an Indian consensus cut."],
  ["/images/cutoffs/measurements7.jpg", "Protein at each meal", "Spread protein across the day. Not one large meal."],
  ["/images/cutoffs/daily-requirements.jpg", "A day's food", "Carbs, protein, fat, fibre, and water."],
];

const card = { background: "#07153a", border: "1px solid rgba(212,175,55,0.35)", borderRadius: "16px", padding: "18px 16px", marginBottom: "22px" };

export default function NormalValuesPage() {
  return (
    <main style={{ background: "#f4f7fb", color: "#1a1a1a" }}>
      <header style={{ background: "linear-gradient(160deg, #07153a 0%, #0D2B4E 70%)", color: "#fff", padding: "48px 6% 36px", textAlign: "center" }}>
        <p style={{ margin: "0 0 8px", letterSpacing: "0.16em", textTransform: "uppercase", color: "#d4af37", fontSize: "12px", fontWeight: 700 }}>HOMA Clinic</p>
        <h1 style={{ fontFamily: "'EB Garamond', serif", fontSize: "clamp(32px, 5vw, 52px)", fontWeight: 500, margin: "0 0 10px" }}>Cutoff values</h1>
        <p style={{ margin: "0 auto", maxWidth: "520px", fontSize: "16px", lineHeight: 1.5, color: "rgba(255,255,255,0.82)" }}>
          Indian BMI, waist, and the clinic cutoff slides. Tap any slide to open it large.
        </p>
      </header>

      <img src="/images/franchise-banner.jpg" alt="HOMA Clinics, India's first diabetes reversal franchise" style={{ display: "block", width: "100%", maxWidth: "760px", height: "auto", margin: "0 auto" }} />

      <img src="/images/cutoffs/metabolic-transformation.jpg" alt="90-day metabolic transformation is the goal" style={{ display: "block", width: "100%", maxWidth: "760px", height: "auto", margin: "0 auto" }} />

      <div style={{ maxWidth: "760px", margin: "0 auto", padding: "28px 6% 72px" }}>
        <section style={card}>
          <h2 style={{ color: "#d4af37", fontSize: "18px", margin: "0 0 10px" }}>Indian BMI</h2>
          <p style={{ color: "rgba(255,255,255,0.85)", fontSize: "15px", lineHeight: 1.5, margin: "0 0 12px" }}>
            Overweight starts at 23, not 25. Obesity starts at 25. Asia-Pacific cut, used by ICMR-INDIAB.
          </p>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "15px", color: "#fff" }}>
            <tbody>
              {rows.map(([value, label]) => (
                <tr key={value}>
                  <td style={{ borderBottom: "1px solid rgba(255,255,255,0.12)", padding: "8px 0", fontWeight: 700, color: "#d4af37" }}>{value}</td>
                  <td style={{ borderBottom: "1px solid rgba(255,255,255,0.12)", padding: "8px 0" }}>{label}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        <section style={{ ...card, background: "#fff" }}>
          <h2 style={{ color: "#0D2B4E", fontSize: "18px", margin: "0 0 8px" }}>Height and weight</h2>
          <p style={{ fontSize: "15px", lineHeight: 1.5, margin: "0 0 12px", color: "#333" }}>
            Weight that keeps BMI between 18.5 and 22.9. Worked out from those two limits.
          </p>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "15px" }}>
            <tbody>
              {weights.map(([height, weight]) => (
                <tr key={height}>
                  <td style={{ borderBottom: "1px solid #ece9e1", padding: "8px 0", fontWeight: 700, color: "#0D2B4E" }}>{height}</td>
                  <td style={{ borderBottom: "1px solid #ece9e1", padding: "8px 0" }}>{weight}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        <section style={card}>
          <h2 style={{ color: "#d4af37", fontSize: "18px", margin: "0 0 8px" }}>Waist line</h2>
          <p style={{ color: "#fff", fontSize: "16px", lineHeight: 1.5, margin: 0 }}>
            90 cm or more in men. 80 cm or more in women.
          </p>
        </section>

        <h2 style={{ color: "#0D2B4E", fontSize: "20px", margin: "8px 0 12px" }}>For the public</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))", gap: "14px", marginBottom: "28px" }}>
          {publicSlides.map(([src, title, note]) => (
            <a key={src} href={src} target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none", background: "#fff", borderRadius: "12px", overflow: "hidden", border: "1px solid #e6eaf0" }}>
              <img src={src} alt={title} style={{ width: "100%", height: "110px", objectFit: "cover", display: "block" }} />
              <div style={{ padding: "8px 10px 10px" }}>
                <div style={{ fontSize: "14px", fontWeight: 700, color: "#0D2B4E" }}>{title}</div>
                <div style={{ fontSize: "12px", color: "#555", marginTop: "2px" }}>{note}</div>
              </div>
            </a>
          ))}
        </div>
        <h2 style={{ color: "#0D2B4E", fontSize: "20px", margin: "8px 0 12px" }}>Lab cutoffs</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))", gap: "14px" }}>
          {labSlides.map(([src, title, note]) => (
            <a key={src} href={src} target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none", background: "#fff", borderRadius: "12px", overflow: "hidden", border: "1px solid #e6eaf0" }}>
              <img src={src} alt={title} style={{ width: "100%", height: "110px", objectFit: "cover", display: "block" }} />
              <div style={{ padding: "8px 10px 10px" }}>
                <div style={{ fontSize: "14px", fontWeight: 700, color: "#0D2B4E" }}>{title}</div>
                <div style={{ fontSize: "12px", color: "#555", marginTop: "2px" }}>{note}</div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </main>
  );
}