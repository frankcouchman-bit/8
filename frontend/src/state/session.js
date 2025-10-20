import React from 'react'
const Ctx = React.createContext(null)

export function SessionProvider({ children }){
  const [profile, setProfile] = React.useState(null)
  const [demoUsed, setDemoUsed] = React.useState(localStorage.getItem('demo_used') === '1')

  async function fetchProfile(){
    try{
      const base = import.meta.env.VITE_API_BASE || 'http://localhost:4000'
      const r = await fetch(`${base}/api/profile`, { headers: bearer() })
      const j = await r.json().catch(()=>null)
      if (j) setProfile(j)
    }catch{}
  }

  React.useEffect(()=>{
    fetchProfile()
    const onFocus = () => fetchProfile()
    window.addEventListener('focus', onFocus)
    const t = setInterval(fetchProfile, 15000)
    return () => { window.removeEventListener('focus', onFocus); clearInterval(t) }
  }, [])

  const value = {
    profile,
    plan: profile?.plan || 'free',
    usage: profile?.usage || {},
    limits: profile?.limits || {},
    demoUsed,
    markDemoUsed: () => { localStorage.setItem('demo_used','1'); setDemoUsed(true) },
    refreshProfile: fetchProfile
  }
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>
}

export function useSession(){ return React.useContext(Ctx) }

export function bearer(){
  const token = localStorage.getItem('sb_access_token') || ''
  return token ? { Authorization: `Bearer ${token}` } : {}
}