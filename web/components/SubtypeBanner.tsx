import Link from "next/link";

export default function SubtypeBanner() {
  return (
    <section style={{ background: "#07153a", padding: "60px 6%", color: "#fff" }}>
      <div style={{ maxWidth: "1000px", margin: "0 auto", display: "flex", flexWrap: "wrap", alignItems: "center", gap: "40px" }}>
        
        {/* Left Side: Text */}
        <div style={{ flex: "1 1 400px" }}>
          <div style={{ fontSize: "12px", fontWeight: 700, color: "#d4af37", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "12px" }}>
            Personalized Precision Care
          </div>
          <h2 style={{ fontSize: "clamp(28px, 4vw, 42px)", fontWeight: 800, lineHeight: 1.2, marginBottom: "20px" }}>
            Two women wear different sarees.<br/>
            <span style={{ color: "#d4af37" }}>Why do they get the same diet?</span>
          </h2>
          <p style={{ fontSize: "17px", color: "rgba(255,255,255,0.8)", lineHeight: 1.6, marginBottom: "24px" }}>
            Why waste hours watching generic health gurus? Why waste money on superfoods that don't work—or worse, damage your kidneys and heart? 
            <br/><br/>
            We are the <strong>first in India</strong> to pioneer 23 specific metabolic subtypes. Don't guess. Know your exact subtype before you waste another day.
          </p>
          
          <Link 
            href="/subtypes" 
            style={{ display: "inline-block", background: "#00A896", color: "#fff", fontWeight: 700, fontSize: "16px", padding: "16px 32px", borderRadius: "10px", textDecoration: "none" }}
          >
            Find Your Subtype →
          </Link>
        </div>

        {/* Right Side: The 3 Language Lines */}
        <div style={{ flex: "1 1 300px", display: "flex", flexDirection: "column", gap: "16px" }}>
          <div style={{ background: "rgba(255,255,255,0.05)", padding: "20px", borderRadius: "12px", borderLeft: "4px solid #00A896" }}>
            <div style={{ fontSize: "12px", color: "#00A896", fontWeight: 700, marginBottom: "4px" }}>ENGLISH</div>
            <div style={{ fontSize: "16px", fontWeight: 500 }}>Why generalised diets? Know your precise subtype first.</div>
          </div>
          
          <div style={{ background: "rgba(255,255,255,0.05)", padding: "20px", borderRadius: "12px", borderLeft: "4px solid #d4af37" }}>
            <div style={{ fontSize: "12px", color: "#d4af37", fontWeight: 700, marginBottom: "4px" }}>हिंदी (HINDI)</div>
            <div style={{ fontSize: "16px", fontWeight: 500 }}>सामान्य डाइट क्यों? पहले अपना सटीक सबटाइप जानें।</div>
          </div>
          
          <div style={{ background: "rgba(255,255,255,0.05)", padding: "20px", borderRadius: "12px", borderLeft: "4px solid #25D366" }}>
            <div style={{ fontSize: "12px", color: "#25D366", fontWeight: 700, marginBottom: "4px" }}>తెలుగు (TELUGU)</div>
            <div style={{ fontSize: "16px", fontWeight: 500 }}>సాధారణ డైట్లు ఎందుకు? మొదట మీ ఖచ్చితమైన సబ్‌టైప్ తెలుసుకోండి.</div>
          </div>
        </div>

      </div>

      {/* Social & Contact Strip */}
      <div style={{ maxWidth: "1000px", margin: "40px auto 0", paddingTop: "20px", borderTop: "1px solid rgba(255,255,255,0.1)", display: "flex", flexWrap: "wrap", gap: "20px", justifyContent: "center", fontSize: "14px", color: "rgba(255,255,255,0.6)" }}>
        <span>🌐 <a href="https://mvp.homahealthcarecenter.in" style={{ color: "#d4af37", textDecoration: "none" }}>mvp.homahealthcarecenter.in</a></span>
        <span>📱 <a href="https://play.google.com/store/apps/details?id=com.kivra.tools" style={{ color: "#d4af37", textDecoration: "none" }}>Download Android App</a></span>
        <span>📞 <a href="tel:+919963721999" style={{ color: "#d4af37", textDecoration: "none" }}>099637 21999</a></span>
        <span>✉️ <a href="mailto:surendra.muddu@gmail.com" style={{ color: "#d4af37", textDecoration: "none" }}>Email Us</a></span>
        <span>Follow us: <a href="#" style={{ color: "#d4af37", textDecoration: "none" }}>Instagram</a> | <a href="#" style={{ color: "#d4af37", textDecoration: "none" }}>YouTube</a></span>
      </div>
    </section>
  );
}