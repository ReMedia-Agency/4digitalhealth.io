import { useState, useEffect } from 'react'
import { supabase } from './lib/supabase'

const TEAL = '#2f695b'
const GOLD = '#f8b300'

function LoginScreen({ onLogin }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleLogin(e) {
    e.preventDefault()
    setLoading(true)
    setError('')
    const { data, error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) setError(error.message)
    else onLogin(data.user)
    setLoading(false)
  }

  return (
    <div style={{ minHeight: '100vh', background: '#f4f6fc', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Montserrat, sans-serif' }}>
      <div style={{ background: 'white', borderRadius: 16, padding: 48, width: 400, boxShadow: '0 4px 24px rgba(0,0,0,0.08)' }}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{ fontSize: 28, fontWeight: 800, marginBottom: 4 }}>
            <span style={{ color: TEAL }}>4</span>
            <span style={{ color: GOLD }}>Digital</span>
            <span style={{ color: TEAL }}>Health</span>
          </div>
          <div style={{ color: '#888', fontSize: 14 }}>Client Portal</div>
        </div>
        <form onSubmit={handleLogin}>
          <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)}
            style={{ width: '100%', padding: '12px 16px', borderRadius: 8, border: '1px solid #ddd', fontSize: 15, marginBottom: 12, boxSizing: 'border-box' }} />
          <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)}
            style={{ width: '100%', padding: '12px 16px', borderRadius: 8, border: '1px solid #ddd', fontSize: 15, marginBottom: 16, boxSizing: 'border-box' }} />
          {error && <p style={{ color: 'red', fontSize: 13, marginBottom: 12 }}>{error}</p>}
          <button type="submit" disabled={loading}
            style={{ width: '100%', padding: 14, background: TEAL, color: 'white', border: 'none', borderRadius: 8, fontSize: 15, fontWeight: 700, cursor: 'pointer' }}>
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>
      </div>
    </div>
  )
}

function Dashboard({ user, profile, onSignOut }) {
  const [activeTab, setActiveTab] = useState('overview')

  const tabs = [
    { id: 'overview', label: '🏠 Overview' },
    { id: 'sessions', label: '📅 Sessions' },
    { id: 'messages', label: '💬 Messages' },
    { id: 'reports', label: '📊 Reports' },
    { id: 'invoices', label: '💳 Invoices' },
    { id: 'resources', label: '🎥 Resources' },
  ]

  return (
    <div style={{ minHeight: '100vh', background: '#f4f6fc', fontFamily: 'Montserrat, sans-serif' }}>
      {/* Top Nav */}
      <div style={{ background: TEAL, padding: '0 32px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 60 }}>
        <div style={{ fontSize: 20, fontWeight: 800, color: 'white' }}>
          <span style={{ color: GOLD }}>4</span>Digital<span style={{ color: GOLD }}>Health</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <span style={{ color: 'white', fontSize: 14 }}>{profile?.full_name || user.email}</span>
          <span style={{ background: GOLD, color: TEAL, padding: '3px 10px', borderRadius: 20, fontSize: 12, fontWeight: 700, textTransform: 'uppercase' }}>
            {profile?.role || 'user'}
          </span>
          <button onClick={onSignOut} style={{ background: 'transparent', border: '1px solid rgba(255,255,255,0.4)', color: 'white', padding: '6px 14px', borderRadius: 6, cursor: 'pointer', fontSize: 13 }}>
            Sign out
          </button>
        </div>
      </div>

      {/* Tab Bar */}
      <div style={{ background: 'white', borderBottom: '1px solid #eee', padding: '0 32px', display: 'flex', gap: 4 }}>
        {tabs.map(tab => (
          <button key={tab.id} onClick={() => setActiveTab(tab.id)}
            style={{ padding: '16px 20px', border: 'none', background: 'transparent', cursor: 'pointer', fontSize: 14, fontWeight: activeTab === tab.id ? 700 : 400,
              color: activeTab === tab.id ? TEAL : '#666', borderBottom: activeTab === tab.id ? `3px solid ${TEAL}` : '3px solid transparent' }}>
            {tab.label}
          </button>
        ))}
      </div>

      {/* Content */}
      <div style={{ padding: 32 }}>
        {activeTab === 'overview' && <Overview profile={profile} user={user} />}
        {activeTab === 'sessions' && <ComingSoon title="Sessions" desc="Your upcoming and past coaching sessions will appear here." />}
        {activeTab === 'messages' && <ComingSoon title="Messages" desc="Chat with your coach directly here." />}
        {activeTab === 'reports' && <ComingSoon title="Progress Reports" desc="Your coach's progress reports will appear here when published." />}
        {activeTab === 'invoices' && <ComingSoon title="Invoices" desc="Your billing history and upcoming invoices will appear here." />}
        {activeTab === 'resources' && <ComingSoon title="Resources" desc="Videos, worksheets, and documents shared by your coach." />}
      </div>
    </div>
  )
}

function Overview({ profile, user }) {
  return (
    <div>
      <h2 style={{ marginTop: 0, color: '#1a1a1a' }}>Welcome back{profile?.full_name ? `, ${profile.full_name}` : ''}! 👋</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 20, marginTop: 24 }}>
        {[
          { label: 'Next Session', value: 'Not scheduled', icon: '📅' },
          { label: 'Unread Messages', value: '0', icon: '💬' },
          { label: 'Reports Available', value: '0', icon: '📊' },
          { label: 'Balance Due', value: '$0.00', icon: '💳' },
        ].map(card => (
          <div key={card.label} style={{ background: 'white', borderRadius: 12, padding: 24, boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
            <div style={{ fontSize: 28, marginBottom: 8 }}>{card.icon}</div>
            <div style={{ fontSize: 22, fontWeight: 700, color: TEAL }}>{card.value}</div>
            <div style={{ fontSize: 13, color: '#888', marginTop: 4 }}>{card.label}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

function ComingSoon({ title, desc }) {
  return (
    <div style={{ background: 'white', borderRadius: 12, padding: 48, textAlign: 'center', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
      <div style={{ fontSize: 48, marginBottom: 16 }}>🚧</div>
      <h3 style={{ color: TEAL, marginTop: 0 }}>{title}</h3>
      <p style={{ color: '#888' }}>{desc}</p>
    </div>
  )
}

export default function App() {
  const [user, setUser] = useState(null)
  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        setUser(session.user)
        fetchProfile(session.user.id)
      }
      setLoading(false)
    })
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session) { setUser(session.user); fetchProfile(session.user.id) }
      else { setUser(null); setProfile(null) }
    })
    return () => subscription.unsubscribe()
  }, [])

  async function fetchProfile(userId) {
    const { data } = await supabase.from('profiles').select('*').eq('id', userId).single()
    setProfile(data)
  }

  async function handleSignOut() {
    await supabase.auth.signOut()
  }

  if (loading) return <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh', fontFamily: 'sans-serif', color: '#888' }}>Loading...</div>
  if (!user) return <LoginScreen onLogin={setUser} />
  return <Dashboard user={user} profile={profile} onSignOut={handleSignOut} />
}