'use client'
import { useState } from 'react'

const ACTIVITY_EMOJI: Record<string, string> = {
  meal: '🥗',
  walk: '🚶',
  sleep: '😴',
  lab: '📊',
  tip: '💬',
}

const ACTIVITY_LABEL: Record<string, string> = {
  meal: 'Meal Photo',
  walk: 'Walking',
  sleep: 'Sleep Log',
  lab: 'Lab Result',
  tip: 'Helped Someone',
}

function timeAgo(dateStr: string) {
  const date = new Date(dateStr)
  const now = new Date()
  const diff = Math.floor((now.getTime() - date.getTime()) / 1000)
  if (diff < 60) return 'just now'
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`
  return `${Math.floor(diff / 86400)}d ago`
}

export default function MyCoinsPage() {
  const [phone, setPhone] = useState('')
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState<any>(null)
  const [error, setError] = useState('')

  async function handleCheck(e: React.FormEvent) {
    e.preventDefault()
    if (!phone) return
    setLoading(true)
    setError('')
    setData(null)
    try {
      const res = await fetch(`/api/mycoins?phone=${encodeURIComponent(phone)}`)
      const json = await res.json()
      if (!res.ok) {
        setError(json.error || 'Not found')
      } else {
        setData(json)
      }
    } catch {
      setError('Network error. Try again.')
    }
    setLoading(false)
  }

  return (
    <main style={{ minHeight: '100vh', background: '#06080f', padding: '40px 20px' }}>
      <div style={{ maxWidth: '480px', margin: '0 auto' }}>

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <a href="/track" style={{ color: 'rgba(255,255,255,0.4)', fontSize: '13px', textDecoration: 'none', display: 'block', marginBottom: '20px' }}>← Log Activity</a>
          <div style={{ fontSize: '48px', marginBottom: '12px' }}>🪙</div>
          <h1 style={{ fontFamily: 'serif', fontSize: '32px', color: '#fff', marginBottom: '8px' }}>My HOMA Coins</h1>
          <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '14px' }}>Enter your WhatsApp number to check your balance</p>
        </div>

        {/* Phone lookup form */}
        <form onSubmit={handleCheck} style={{ display: 'flex', gap: '10px', marginBottom: '28px' }}>
          <input
            placeholder="Your WhatsApp number"
            value={phone}
            onChange={e => setPhone(e.target.value)}
            required
            style={{ flex: 1, background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: '12px', padding: '14px 16px', color: '#fff', fontSize: '15px', outline: 'none' }}
          />
          <button
            type="submit"
            disabled={loading}
            style={{ background: '#25D366', color: '#fff', border: 'none', borderRadius: '12px', padding: '14px 20px', fontSize: '15px', fontWeight: 700, cursor: 'pointer', whiteSpace: 'nowrap' }}
          >
            {loading ? '...' : 'Check'}
          </button>
        </form>

        {/* Error */}
        {error && (
          <div style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)', borderRadius: '12px', padding: '16px', textAlign: 'center', color: '#f87171', marginBottom: '20px' }}>
            {error === 'No record found for this number'
              ? '📵 No activities found for this number. Log your first activity!'
              : error}
          </div>
        )}

        {/* Results */}
        {data && (
          <>
            {/* Coin balance card */}
            <div style={{ background: 'rgba(37,211,102,0.1)', border: '1px solid rgba(37,211,102,0.3)', borderRadius: '16px', padding: '24px', textAlign: 'center', marginBottom: '24px' }}>
              <div style={{ color: 'rgba(255,255,255,0.6)', fontSize: '14px', marginBottom: '4px' }}>
                {data.patient_name} · {data.tribe}
              </div>
              <div style={{ fontSize: '56px', fontWeight: 900, color: '#25D366', lineHeight: 1 }}>{data.total_coins}</div>
              <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: '14px', marginTop: '4px' }}>HOMA Coins total</div>
            </div>

            {/* Activity history */}
            <h2 style={{ color: 'rgba(255,255,255,0.5)', fontSize: '11px', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '12px' }}>Recent Activities</h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {data.activities.map((a: any) => (
                <div key={a.id} style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '12px', padding: '14px 16px', display: 'flex', alignItems: 'center', gap: '14px' }}>
                  <div style={{ fontSize: '28px' }}>{ACTIVITY_EMOJI[a.activity_type] || '⭐'}</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ color: '#fff', fontSize: '14px', fontWeight: 600 }}>{ACTIVITY_LABEL[a.activity_type] || a.activity_type}</div>
                    {a.description && <div style={{ color: 'rgba(255,255,255,0.4)', fontSize: '12px', marginTop: '2px' }}>{a.description}</div>}
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ color: '#25D366', fontWeight: 700, fontSize: '15px' }}>+{a.coins_earned}</div>
                    <div style={{ color: 'rgba(255,255,255,0.3)', fontSize: '11px' }}>{timeAgo(a.created_at)}</div>
                  </div>
                </div>
              ))}
            </div>

            <div style={{ marginTop: '24px', textAlign: 'center' }}>
              <a href="/track" style={{ display: 'inline-block', background: '#25D366', color: '#fff', borderRadius: '12px', padding: '14px 32px', fontSize: '15px', fontWeight: 700, textDecoration: 'none' }}>
                + Log New Activity
              </a>
            </div>
          </>
        )}
      </div>
    </main>
  )
}
