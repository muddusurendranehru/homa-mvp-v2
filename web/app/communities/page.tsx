'use client'

import { Bebas_Neue, Inter } from 'next/font/google'

const bebas = Bebas_Neue({ weight: '400', subsets: ['latin'], display: 'swap', variable: '--font-bebas' })
const inter = Inter({ subsets: ['latin'], display: 'swap', variable: '--font-inter' })

const WA_ICON = (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="white" style={{ flexShrink: 0 }}>
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
)

const tribes = [
  {
    name: "Heart Heroes",
    category: "Cardiac & Metabolic",
    region: "Hyderabad",
    desc: "Heart health meets metabolic medicine. Lower your cardiac risk the HOMA way.",
    accent: "#ff6b6b",
    image: "/images/tribes/heart-heroes.jpg",
    whatsapp: "https://chat.whatsapp.com/IiayyYqev513pefKknFf3m",
    stat: "HbA1c · BP · Lipids",
  },
  {
    name: "Dyslipidemia Dynamos",
    category: "Cholesterol & Lipids",
    region: "Hyderabad",
    desc: "High cholesterol & triglycerides. Understand your lipid panel. Reverse it for real.",
    accent: "#60a5fa",
    image: "/images/tribes/dyslipidemia-dynamos.jpg",
    whatsapp: "https://chat.whatsapp.com/FLZWZ1D4a3v6NfawK3vMYe",
    stat: "LDL · HDL · TG · VLDL",
  },
  {
    name: "Obesity Warriors",
    category: "Weight & Metabolic Reset",
    region: "Hyderabad",
    desc: "Less belly. More energy. Metabolic Reset Walking — 15 minutes a day changes everything.",
    accent: "#fb923c",
    image: "/images/tribes/obesity-warriors.jpg",
    whatsapp: "https://chat.whatsapp.com/Cb5NGQpiGMM9l7Fz016hNB",
    stat: "BMI · Waist · HOMA-IR",
  },
  {
    name: "Hypertension Heroes",
    category: "Blood Pressure",
    region: "Hyderabad",
    desc: "BP control without fear. Real lifestyle wins from Dr. Muddu's team, every evening 6–7 PM.",
    accent: "#c084fc",
    image: "/images/tribes/hypertension-heroes.jpg",
    whatsapp: "https://chat.whatsapp.com/Cpk5Wrq6bw25CpbFhMd2Ab",
    stat: "Systolic · Diastolic · Pulse",
  },
  {
    name: "Diabetes Gladiators Hyd1",
    category: "Type 2 Diabetes Reversal",
    region: "Hyderabad",
    desc: "HbA1c goals, HOMA-IR tracking, weekly wins. Reversing T2D together in Hyderabad.",
    accent: "#4ade80",
    image: "/images/tribes/diabetes-gladiators.jpg",
    whatsapp: "https://chat.whatsapp.com/IfeG6QI8Ia6ArRFlxwqxMp",
    stat: "HbA1c · FBS · HOMA-IR",
  },
  {
    name: "Diabetes GDK1",
    category: "Type 2 Diabetes",
    region: "Godavarikhani · Telangana",
    desc: "Your local diabetes community for GDK & surrounding Telangana. Track. Reverse. Thrive.",
    accent: "#4ade80",
    image: "/images/tribes/diabetes-gdk1.jpg",
    whatsapp: "https://chat.whatsapp.com/Dw7SdP23zlo9lGHWOMqeHE",
    stat: "HbA1c · Insulin · Glucose",
  },
  {
    name: "Lady Lions",
    category: "Women's Metabolic Health",
    region: "Hyderabad",
    desc: "For women managing heart disease, obesity & diabetes together. Strong. Supported. Thriving.",
    accent: "#fbbf24",
    image: "/images/tribes/lady-lions.png",
    whatsapp: "https://chat.whatsapp.com/Jy7b3h8iMzpAySmJj4pc1z",
    stat: "PCOS · Thyroid · HOMA-IR",
  },
  {
    name: "Kurnool Kings",
    category: "Diabetes & Metabolic Health",
    region: "Kurnool · Andhra Pradesh",
    desc: "Diabetes & metabolic health for Kurnool & Andhra patients. Local, trusted, free.",
    accent: "#2dd4bf",
    image: "/images/tribes/kurnool-kings.jpg",
    whatsapp: "https://chat.whatsapp.com/BVkFCEQ8KKS4NpYeZLfQv4",
    stat: "HbA1c · BP · Lipids",
  },
  {
    name: "Adoni Adventurers",
    category: "Metabolic Health",
    region: "Adoni · Kurnool District",
    desc: "HOMA Metabolic Walking group for Adoni & Kurnool. Move better. Live younger.",
    accent: "#86efac",
    image: "/images/tribes/adoni-adventurers.jpg",
    whatsapp: "https://chat.whatsapp.com/HCRPphFyKA59DATji1k26S",
    stat: "Steps · Waist · Glucose",
  },
  {
    name: "Mutharam Mahaveers",
    category: "Diabetes & Metabolic Health",
    region: "Mutharam · Karimnagar",
    desc: "Track your HbA1c. Reverse your diabetes. Your Karimnagar community, backed by HOMA.",
    accent: "#fda4af",
    image: "/images/tribes/mutharam-mahaveers.jpg",
    whatsapp: "https://chat.whatsapp.com/Lwfuz7R5EotK7W5DiaoxvG",
    stat: "HbA1c · FBS · HOMA-IR",
  },
]

export default function CommunitiesPage() {
  return (
    <main className={`${inter.variable} ${bebas.variable}`} style={{
      fontFamily: 'var(--font-inter), Inter, sans-serif',
      background: '#06080f',
      minHeight: '100vh',
      color: '#fff',
    }}>

      {/* HERO */}
      <section style={{
        position: 'relative',
        padding: 'clamp(64px,10vw,120px) 6% clamp(56px,8vw,96px)',
        textAlign: 'center',
        overflow: 'hidden',
        background: 'linear-gradient(180deg, #0d1628 0%, #06080f 100%)',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
      }}>
        <div style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          background: 'radial-gradient(ellipse 70% 60% at 50% 0%, rgba(37,211,102,0.12) 0%, transparent 70%)',
        }} />

        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', marginBottom: '24px' }}>
          <span style={{
            background: '#25D366', color: '#fff',
            fontSize: '10px', fontWeight: 800, letterSpacing: '2px',
            textTransform: 'uppercase', padding: '5px 12px', borderRadius: '100px',
          }}>HOMA</span>
          <span style={{
            fontSize: '11px', fontWeight: 600,
            color: 'rgba(255,255,255,0.45)', letterSpacing: '2px', textTransform: 'uppercase',
          }}>Free Patient Communities</span>
        </div>

        <h1 style={{
          fontFamily: 'var(--font-bebas), "Bebas Neue", sans-serif',
          fontSize: 'clamp(52px, 9vw, 96px)',
          letterSpacing: '0.03em', lineHeight: 0.95,
          color: '#fff', marginBottom: '20px',
        }}>
          Join Your Tribe
        </h1>

        <p style={{
          fontSize: 'clamp(15px, 2vw, 18px)',
          color: 'rgba(255,255,255,0.6)',
          maxWidth: '560px', margin: '0 auto 32px', lineHeight: 1.7,
        }}>
          Connect with hundreds of patients on the same journey. Ask questions, share progress, get weekly tips from Dr. Muddu's team.
        </p>

        <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '8px 24px' }}>
          {['10 Groups', '1,000+ Members', '100% Free', 'Moderated by Dr. Muddu'].map(stat => (
            <span key={stat} style={{ fontSize: '13px', fontWeight: 600, color: '#25D366', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span style={{ color: 'rgba(37,211,102,0.5)' }}>✦</span> {stat}
            </span>
          ))}
        </div>
      </section>

      {/* TRIBE GRID */}
      <section style={{ padding: 'clamp(40px,6vw,72px) 6%' }}>
        <div style={{ maxWidth: '1160px', margin: '0 auto' }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
            gap: '16px',
          }}>
            {tribes.map((tribe) => (
              <div
                key={tribe.name}
                style={{
                  position: 'relative',
                  borderRadius: '16px',
                  overflow: 'hidden',
                  minHeight: '340px',
                  display: 'flex',
                  flexDirection: 'column',
                  border: `1px solid ${tribe.accent}30`,
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLElement).style.transform = 'translateY(-4px)'
                  ;(e.currentTarget as HTMLElement).style.boxShadow = `0 20px 50px ${tribe.accent}25`
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLElement).style.transform = 'translateY(0)'
                  ;(e.currentTarget as HTMLElement).style.boxShadow = 'none'
                }}
              >
                {/* Background photo */}
                <div style={{
                  position: 'absolute', inset: 0,
                  backgroundImage: `url(${tribe.image})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }} />

                {/* Cinematic gradient overlay — dark top + dark bottom, bright middle */}
                <div style={{
                  position: 'absolute', inset: 0,
                  background: 'linear-gradient(to bottom, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.25) 40%, rgba(0,0,0,0.25) 60%, rgba(0,0,0,0.88) 100%)',
                }} />

                {/* Accent color tint */}
                <div style={{
                  position: 'absolute', inset: 0,
                  background: `linear-gradient(135deg, ${tribe.accent}18 0%, transparent 60%)`,
                }} />

                {/* Card content */}
                <div style={{
                  position: 'relative', zIndex: 1,
                  display: 'flex', flexDirection: 'column',
                  height: '100%', padding: '18px 20px 20px',
                }}>

                  {/* Top badges */}
                  <div style={{ display: 'flex', gap: '8px', marginBottom: 'auto' }}>
                    <span style={{
                      background: 'rgba(0,0,0,0.6)',
                      border: '1px solid rgba(255,255,255,0.2)',
                      color: '#fff', fontSize: '9px', fontWeight: 700,
                      letterSpacing: '1.5px', textTransform: 'uppercase',
                      padding: '3px 8px', borderRadius: '100px',
                      backdropFilter: 'blur(4px)',
                    }}>HOMA</span>
                    <span style={{
                      background: '#25D366',
                      color: '#fff', fontSize: '9px', fontWeight: 700,
                      letterSpacing: '1.5px', textTransform: 'uppercase',
                      padding: '3px 8px', borderRadius: '100px',
                    }}>FREE GROUP</span>
                  </div>

                  {/* Bottom content */}
                  <div style={{ marginTop: '100px' }}>
                    {/* Category */}
                    <div style={{
                      fontSize: '9px', fontWeight: 700,
                      letterSpacing: '1.5px', textTransform: 'uppercase',
                      color: tribe.accent, marginBottom: '6px',
                    }}>{tribe.category} · {tribe.region}</div>

                    {/* Tribe name */}
                    <div style={{
                      fontFamily: 'var(--font-bebas), "Bebas Neue", sans-serif',
                      fontSize: 'clamp(24px, 3.5vw, 28px)',
                      letterSpacing: '0.04em', lineHeight: 1,
                      color: '#fff', marginBottom: '8px',
                      textShadow: '0 2px 8px rgba(0,0,0,0.8)',
                    }}>{tribe.name}</div>

                    {/* Description */}
                    <p style={{
                      fontSize: '12px', color: 'rgba(255,255,255,0.75)',
                      lineHeight: 1.6, margin: '0 0 14px',
                    }}>{tribe.desc}</p>

                    {/* WhatsApp CTA */}
                    <a
                      href={tribe.whatsapp}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        display: 'flex', alignItems: 'center',
                        justifyContent: 'center', gap: '8px',
                        background: '#25D366', color: '#fff',
                        fontWeight: 700, fontSize: '12px',
                        letterSpacing: '0.5px', textTransform: 'uppercase',
                        padding: '10px 16px', borderRadius: '8px',
                        textDecoration: 'none', width: '100%',
                      }}
                    >
                      {WA_ICON}
                      Join Free Group
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <p style={{
            textAlign: 'center', marginTop: '40px',
            fontSize: '12px', color: 'rgba(255,255,255,0.25)', letterSpacing: '0.5px',
          }}>
            🔒 All groups moderated by Dr. Muddu's team · Medical queries answered weekly · No spam ever
          </p>
        </div>
      </section>

      {/* BOTTOM CTA */}
      <section style={{
        background: 'linear-gradient(180deg, #06080f 0%, #0a1f0d 100%)',
        borderTop: '1px solid rgba(37,211,102,0.12)',
        padding: 'clamp(48px,7vw,80px) 6%', textAlign: 'center',
      }}>
        <div style={{
          fontSize: '10px', fontWeight: 700, letterSpacing: '2px',
          textTransform: 'uppercase', color: '#25D366', marginBottom: '16px',
        }}>New to HOMA?</div>

        <h2 style={{
          fontFamily: 'var(--font-bebas), "Bebas Neue", sans-serif',
          fontSize: 'clamp(32px, 5vw, 52px)', letterSpacing: '0.04em',
          color: '#fff', marginBottom: '12px', lineHeight: 1,
        }}>
          Start Your Reversal Journey
        </h2>

        <p style={{
          fontSize: '15px', color: 'rgba(255,255,255,0.5)',
          margin: '0 auto 32px', maxWidth: '440px', lineHeight: 1.65,
        }}>
          Book a consultation with Dr. Muddu's team. Get your HOMA-IR tested. Know your metabolic age.
        </p>

        <a
          href="https://wa.me/919963721999"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'inline-flex', alignItems: 'center', gap: '10px',
            background: '#25D366', color: '#fff',
            fontWeight: 700, fontSize: '15px', letterSpacing: '0.5px',
            textTransform: 'uppercase', padding: '14px 36px',
            borderRadius: '12px', textDecoration: 'none',
          }}
        >
          {WA_ICON}
          WhatsApp Dr. Muddu's Team
        </a>

        <p style={{ marginTop: '16px', fontSize: '12px', color: 'rgba(255,255,255,0.3)' }}>
          +91 99637 21999 · Free first consultation available
        </p>
      </section>

    </main>
  )
}
