'use client'
import { useState, useEffect } from 'react'

const ACTIVITY_LABELS: Record<string, { icon: string; label: string; color: string }> = {
  meal:  { icon: '🥗', label: 'Meal',   color: '#f59e0b' },
  walk:  { icon: '🚶', label: 'Walk',   color: '#22c55e' },
  sleep: { icon: '😴', label: 'Sleep',  color: '#6366f1' },
  lab:   { icon: '📊', label: 'Lab',    color: '#ec4899' },
  tip:   { icon: '💬', label: 'Helped', color: '#14b8a6' },
}

function timeAgo(ts: string) {
  const diff = Math.floor((Date.now() - new Date(ts).getTime()) / 1000)
  if (diff < 60) return `${diff}s ago`
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`
  return `${Math.floor(diff / 86400)}d ago`
}

interface Activity {
  patient_name: string
  phone: string
  tribe: string
  activity_type: string
  description: string
  coins_earned: number
  created_at: string
}

interface Patient {
  patient_name: string
  phone: string
  tribe: string
  total_coins: number
  last_activity: string | null
}

export default function StaffPage() {
  const [activities, setActivities] = useState<Activity[]>([])
  const [patients, setPatients]     = useState<Patient[]>([])
  const [search, setSearch]         = useState('')
  const [tab, setTab]               = useState<'feed' | 'patients'>('feed')
  const [loading, setLoading]       = useState(true)
  const [lastRefresh, setLastRefresh] = useState(new Date())

  async function load() {
    try {
      const res  = await fetch('/api/staff')
      const data = await res.json()
      setActivities(data.activities || [])
      setPatients(data.patients || [])
      setLastRefresh(new Date())
    } catch (e) {
      console.error(e)
    }
    setLoading(false)
  }

  useEffect(() => {
    load()
    const timer = setInterval(load, 30_000) // auto-refresh every 30s
    return () => clearInterval(timer)
  }, [])

  // Patients who logged today
  const todayStart = new Date(); todayStart.setHours(0,0,0,0)
  const loggedToday = new Set(
    activities
      .filter(a => new Date(a.created_at) >= todayStart)
      .map(a => a.phone)
  )

  const filteredPatients = patients.filter(p =>
    !search ||
    p.phone.includes(search) ||
    p.patient_name.toLowerCase().includes(search.toLowerCase()) ||
    p.tribe.toLowerCase().includes(search.toLowerCase())
  )

  const base: React.CSSProperties = {
    minHeight: '100vh',
    background: '#0a0d14',
    color: '#fff',
    fontFamily: 'system-ui, sans-serif',
    padding: '20px',
  }

  const card: React.CSSProperties = {
    background: 'rgba(255,255,255,0.05)',
    border: '1px solid rgba(255,255,255,0.08)',
    borderRadius: '12px',
    padding: '14px 16px',
    marginBottom: '10px',
  }

  if (loading) {
    return (
      <main style={base}>
        <div style={{ textAlign: 'center', paddingTop: '80px', color: 'rgba(255,255,255,0.4)' }}>
          Loading dashboard…
        </div>
      </main>
    )
  }

  return (
    <main style={base}>
      <div style={{ maxWidth: '640px', margin: '0 auto' }}>

        {/* Header */}
        <div style={{ marginBottom: '24px' }}>
          <div style={{
            display: 'inline-block', background: '#25D366', color: '#fff',
            fontSize: '10px', fontWeight: 800, letterSpacing: '2px',
            textTransform: 'uppercase', padding: '4px 12px',
            borderRadius: '100px', marginBottom: '10px',
          }}>STAFF</div>
          <h1 style={{ fontSize: '26px', fontWeight: 800, margin: 0 }}>HOMA Dashboard</h1>
          <p style={{ color: 'rgba(255,255,255,0.35)', fontSize: '12px', marginTop: '4px' }}>
            Auto-refreshes every 30s · Last: {lastRefresh.toLocaleTimeString()}
          </p>
        </div>

        {/* Summary row */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '10px', marginBottom: '20px' }}>
          {[
            { label: 'Total Patients', value: patients.length, color: '#fff' },
            { label: 'Logged Today ✅', value: loggedToday.size, color: '#25D366' },
            { label: 'Not Yet ⚠️', value: patients.length - loggedToday.size, color: '#f59e0b' },
          ].map(s => (
            <div key={s.label} style={{ ...card, textAlign: 'center', padding: '16px 8px' }}>
              <div style={{ fontSize: '28px', fontWeight: 900, color: s.color }}>{s.value}</div>
              <div style={{ fontSize: '10px', color: 'rgba(255,255,255,0.4)', marginTop: '4px' }}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* Search */}
        <input
          placeholder="Search name, phone, or tribe…"
          value={search}
          onChange={e => setSearch(e.target.value)}
          style={{
            width: '100%', boxSizing: 'border-box',
            background: 'rgba(255,255,255,0.06)',
            border: '1px solid rgba(255,255,255,0.12)',
            borderRadius: '10px', padding: '12px 16px',
            color: '#fff', fontSize: '14px', outline: 'none',
            marginBottom: '16px',
          }}
        />

        {/* Tabs */}
        <div style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
          {(['feed', 'patients'] as const).map(t => (
            <button key={t} onClick={() => setTab(t)} style={{
              padding: '8px 18px', borderRadius: '8px', border: 'none',
              background: tab === t ? '#25D366' : 'rgba(255,255,255,0.06)',
              color: '#fff', fontWeight: 700, fontSize: '13px', cursor: 'pointer',
            }}>
              {t === 'feed' ? `Activity Feed (${activities.length})` : `All Patients (${filteredPatients.length})`}
            </button>
          ))}
        </div>

        {/* Activity Feed */}
        {tab === 'feed' && (
          <div>
            {activities.length === 0 && (
              <div style={{ textAlign: 'center', color: 'rgba(255,255,255,0.3)', padding: '40px' }}>
                No activity in last 24 hours
              </div>
            )}
            {activities
              .filter(a => !search ||
                a.phone.includes(search) ||
                a.patient_name.toLowerCase().includes(search.toLowerCase()) ||
                a.tribe.toLowerCase().includes(search.toLowerCase())
              )
              .map((a, i) => {
                const act = ACTIVITY_LABELS[a.activity_type] || { icon: '📌', label: a.activity_type, color: '#888' }
                return (
                  <div key={i} style={card}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                      <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                        <span style={{ fontSize: '24px' }}>{act.icon}</span>
                        <div>
                          <div style={{ fontWeight: 700, fontSize: '15px' }}>{a.patient_name}</div>
                          <div style={{ color: 'rgba(255,255,255,0.4)', fontSize: '12px' }}>
                            {a.phone} · {a.tribe}
                          </div>
                          {a.description && (
                            <div style={{ color: 'rgba(255,255,255,0.55)', fontSize: '12px', marginTop: '2px' }}>
                              "{a.description}"
                            </div>
                          )}
                        </div>
                      </div>
                      <div style={{ textAlign: 'right', flexShrink: 0, marginLeft: '12px' }}>
                        <div style={{ color: act.color, fontWeight: 800, fontSize: '16px' }}>
                          +{a.coins_earned} 🪙
                        </div>
                        <div style={{ color: 'rgba(255,255,255,0.3)', fontSize: '11px' }}>
                          {timeAgo(a.created_at)}
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}
          </div>
        )}

        {/* All Patients */}
        {tab === 'patients' && (
          <div>
            {filteredPatients.length === 0 && (
              <div style={{ textAlign: 'center', color: 'rgba(255,255,255,0.3)', padding: '40px' }}>
                No patients found
              </div>
            )}
            {filteredPatients.map((p, i) => {
              const logged = loggedToday.has(p.phone)
              return (
                <div key={i} style={{ ...card, borderLeft: `3px solid ${logged ? '#25D366' : '#f59e0b'}` }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span style={{ fontSize: '16px' }}>{logged ? '✅' : '⚠️'}</span>
                        <span style={{ fontWeight: 700, fontSize: '15px' }}>{p.patient_name}</span>
                      </div>
                      <div style={{ color: 'rgba(255,255,255,0.4)', fontSize: '12px', marginTop: '2px' }}>
                        {p.phone} · {p.tribe}
                      </div>
                      {p.last_activity && (
                        <div style={{ color: 'rgba(255,255,255,0.3)', fontSize: '11px', marginTop: '2px' }}>
                          Last: {timeAgo(p.last_activity)}
                        </div>
                      )}
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontSize: '22px', fontWeight: 900, color: '#fbbf24' }}>
                        🪙 {p.total_coins}
                      </div>
                      <div style={{ color: 'rgba(255,255,255,0.3)', fontSize: '10px' }}>total coins</div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        )}

      </div>
    </main>
  )
}
