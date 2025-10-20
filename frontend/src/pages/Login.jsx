import React from 'react'
import HeadTags from '../seo/HeadTags.jsx'
import { sendMagicLink } from '../utils/api.js'
export default function Login(){
  const [email, setEmail] = React.useState('')
  const [msg, setMsg] = React.useState('')
  const submit = async (e) => {
    e.preventDefault(); setMsg('Sending magic link…')
    const r = await sendMagicLink(email); setMsg(r?.message || r?.error || 'Check your inbox.')
  }
  React.useEffect(()=>{
    const u = new URL(window.location.href)
    const at = u.searchParams.get('access_token')
    const rt = u.searchParams.get('refresh_token')
    if (at) { localStorage.setItem('sb_access_token', at); if (rt) localStorage.setItem('sb_refresh_token', rt); window.history.replaceState({}, '', '/dashboard'); window.location.assign('/dashboard') }
  }, [])
  return (<>
    <HeadTags title="Sign in — SEOScribe" description="Magic link login." canonical="/login" />
    <section className="max-w-md mx-auto px-4 py-20">
      <form onSubmit={submit} className="glass p-6 rounded-2xl space-y-4">
        <h1 className="text-2xl font-bold">Sign in</h1>
        <input type="email" required value={email} onChange={e=>setEmail(e.target.value)} placeholder="you@example.com" className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10" />
        <button className="w-full px-4 py-3 rounded-2xl bg-brand-500 hover:bg-brand-400 shadow-premium">Send magic link</button>
        <p className="text-sm text-white/70">{msg}</p>
      </form>
    </section>
  </>)
}