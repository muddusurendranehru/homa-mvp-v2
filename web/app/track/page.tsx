'use client'
import { useState } from 'react'

const TRIBES = [
  "Heart Heroes",
  "Dyslipidemia Dynamos",
  "Obesity Warriors",
  "Hypertension Heroes",
  "Diabetes Gladiators Hyd1",
  "Diabetes GDK1",
  "Lady Lions",
  "Kurnool Kings",
  "Adoni Adventurers",
  "Mutharam Mahaveers",
]

const ACTIVITIES = [
  { type: "meal", label: "🥗 Meal Photo", desc: "What I ate today", coins: 10 },
  { type: "walk", label: "🚶 Walking", desc: "Steps / walk photo", coins: 15 },
  { type: "sleep", label: "😴 Sleep Log", desc: "Hours slept last night", coins: 10 },
  { type: "lab", label: "📊 Lab Result", desc: "HbA1c / BP improved!", coins: 50 },
  { type: "tip", label: "💬 Helped Someone", desc: "Shared advice in group", coins: 20 },
]

export default function TrackPage() {
  const [step, setStep] = useState<'form' | 'success'>('form')
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({
    patient_name: '',
    phone: '',
    tribe: '',
    activity_type: '',
    description: '',
  })
  const [coinsEarned, setCoinsEarned] = useState(0)
  const [totalCoins, setTotalCoins] = useState(0)

  const selectedActivity = ACTIVITIES.find(a => a.type === form.activity_type)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!form.patient_name || !form.phone || !form.tribe || !form.activity_type) return
    setLoading(true)
    try {
      const res = await fetch('/api/track', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const data = await res.json()
      setCoinsEarned(data.coins_earned)
      setTotalCoins(data.total_coins)
      setStep('success')
    } catch (err) {
      alert('Something went wrong. Please try again.')
    }
    setLoading(false)
  }

  if (step === 'success') {
    return (
      <main style={{ minHeight: '100vh', background: '#06080f', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px' }}>
        <div style={{ maxWidth: '420px', width: '100%', textAlign: 'center' }}>
          <div style={{ fontSize: '72px', marginBottom: '16px' }}>🎉</div>
          <h1 style={{ fontFamily: 'serif', fontSize: '32px', color: '#fff', marginBottom: '8px' }}>Activity Logged!</h1>
          <p style={{ color: 'rgba(255,255,255,0.5)', marginBottom: '32px' }}>Keep it up — every step counts!</p>

          <div style={{ background: 'rgba(37,211,102,0.1)', border: '1px solid rgba(37,211,102,0.3)', borderRadius: '16px', padding: '24px', marginBottom: '24px' }}>
            <div style={{ fontSize: '48px', fontWeight: 900, color: '#25D366' }}>+{coinsEarned}</div>
            <div style={{ color: 'rgba(255,255,255,0.6)', fontSize: '14px' }}>HOMA Coins earned</div>
            <div style={{ marginTop: '12px', paddingTop: '12px', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
              <div style={{ fontSize: '22px', fontWeight: 700, color: '#fbbf24' }}>🪙 {totalCoins} total</div>
              <div style={{ color: 'rgba(255,255,255,0.4)', fontSize: '12px' }}>Your HOMA Coin balance</div>
            </div>
          </div>

          <button onClick={() => { setStep('form'); setForm({ ...form, activity_type: '', description: '' }) }}
            style={{ background: '#25D366', color: '#fff', border: 'none', borderRadius: '12px', padding: '14px 32px', fontSize: '15px', fontWeight: 700, cursor: 'pointer', width: '100%', marginBottom: '12px' }}>
            Log Another Activity
          </button>
          <a href="/communities" style={{ display: 'block', color: 'rgba(255,255,255,0.4)', fontSize: '13px', textDecoration: 'none' }}>← Back to Communities</a>
        </div>
      </main>
    )
  }

  return (
    <main style={{ minHeight: '100vh', background: '#06080f', padding: '40px 20px' }}>
      <div style={{ maxWidth: '480px', margin: '0 auto' }}>

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <a href="/communities" style={{ color: 'rgba(255,255,255,0.4)', fontSize: '13px', textDecoration: 'none', display: 'block', marginBottom: '20px' }}>← Communities</a>
          <div style={{ display: 'inline-block', background: '#25D366', color: '#fff', fontSize: '10px', fontWeight: 800, letterSpacing: '2px', textTransform: 'uppercase', padding: '5px 14px', borderRadius: '100px', marginBottom: '12px' }}>HOMA</div>
          <h1 style={{ fontFamily: 'serif', fontSize: '32px', color: '#fff', marginBottom: '8px' }}>Log Your Activity</h1>
          <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '14px' }}>Earn HOMA Coins for every healthy action</p>
        </div>

        {/* Coin legend */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px', marginBottom: '28px' }}>
          {ACTIVITIES.map(a => (
            <div key={a.type} style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '10px', padding: '10px 8px', textAlign: 'center' }}>
              <div style={{ fontSize: '18px' }}>{a.label.split(' ')[0]}</div>
              <div style={{ fontSize: '16px', fontWeight: 800, color: '#25D366' }}>+{a.coins}</div>
              <div style={{ fontSize: '9px', color: 'rgba(255,255,255,0.3)', letterSpacing: '0.5px' }}>coins</div>
            </div>
          ))}
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>

          <input
            placeholder="Your Name"
            value={form.patient_name}
            onChange={e => setForm({ ...form, patient_name: e.target.value })}
            required
            style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: '12px', padding: '14px 16px', color: '#fff', fontSize: '15px', outline: 'none' }}
          />

          <input
            placeholder="Phone Number (WhatsApp)"
            value={form.phone}
            onChange={e => setForm({ ...form, phone: e.target.value })}
            required
            style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: '12px', padding: '14px 16px', color: '#fff', fontSize: '15px', outline: 'none' }}
          />

          <select
            value={form.tribe}
            onChange={e => setForm({ ...form, tribe: e.target.value })}
            required
            style={{ background: '#1a1f2e', border: '1px solid rgba(255,255,255,0.12)', borderRadius: '12px', padding: '14px 16px', color: form.tribe ? '#fff' : 'rgba(255,255,255,0.4)', fontSize: '15px', outline: 'none' }}
          >
            <option value="">Select Your Tribe</option>
            {TRIBES.map(t => <option key={t} value={t}>{t}</option>)}
          </select>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
            {ACTIVITIES.map(a => (
              <button
                key={a.type}
                type="button"
                onClick={() => setForm({ ...form, activity_type: a.type })}
                style={{
                  background: form.activity_type === a.type ? 'rgba(37,211,102,0.15)' : 'rgba(255,255,255,0.04)',
                  border: form.activity_type === a.type ? '1px solid #25D366' : '1px solid rgba(255,255,255,0.08)',
                  borderRadius: '12px', padding: '12px 10px', cursor: 'pointer', textAlign: 'left',
                }}
              >
                <div style={{ fontSize: '18px' }}>{a.label.split(' ')[0]}</div>
                <div style={{ fontSize: '12px', color: '#fff', fontWeight: 600, marginTop: '2px' }}>{a.label.split(' ').slice(1).join(' ')}</div>
                <div style={{ fontSize: '11px', color: '#25D366', fontWeight: 700 }}>+{a.coins} coins</div>
              </button>
            ))}
          </div>

          <textarea
            placeholder={selectedActivity ? selectedActivity.desc : "Describe your activity..."}
            value={form.description}
            onChange={e => setForm({ ...form, description: e.target.value })}
            rows={3}
            style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: '12px', padding: '14px 16px', color: '#fff', fontSize: '15px', outline: 'none', resize: 'none' }}
          />

          <button
            type="submit"
            disabled={loading || !form.patient_name || !form.phone || !form.tribe || !form.activity_type}
            style={{
              background: loading ? 'rgba(37,211,102,0.5)' : '#25D366',
              color: '#fff', border: 'none', borderRadius: '12px',
              padding: '16px', fontSize: '16px', fontWeight: 700,
              cursor: loading ? 'not-allowed' : 'pointer', marginTop: '8px',
            }}
          >
            {loading ? 'Logging...' : `Log Activity & Earn ${selectedActivity ? selectedActivity.coins : ''} Coins 🪙`}
          </button>
        </form>
      </div>
    </main>
  )
}
