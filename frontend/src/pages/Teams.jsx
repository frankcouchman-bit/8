import React from 'react'
import HeadTags from '../seo/HeadTags.jsx'

const BASE = import.meta.env.VITE_API_BASE || 'http://localhost:4000'
const bearer = () => {
  const t = localStorage.getItem('sb_access_token'); return t ? { Authorization: `Bearer ${t}` } : {}
}

export default function Teams(){
  const [members, setMembers] = React.useState([])
  const [email, setEmail] = React.useState('')
  const [status, setStatus] = React.useState('')
  const [supported, setSupported] = React.useState(true)

  React.useEffect(()=>{ (async ()=>{
    try {
      const r = await fetch(`${BASE}/api/teams`, { headers: { ...bearer() } })
      if (r.status === 404) { setSupported(false); return }
      const j = await r.json().catch(()=>({ members: [] }))
      setMembers(j.members || [])
    } catch { setSupported(false) }
  })() }, [])

  async function invite(){
    try{
      setStatus('Sending…')
      const r = await fetch(`${BASE}/api/teams/invite`, {
        method:'POST', headers: { 'Content-Type':'application/json', ...bearer() },
        body: JSON.stringify({ email })
      })
      const j = await r.json().catch(()=>({}))
      setStatus(j?.ok ? 'Invite sent' : (j?.error || 'Failed'))
    }catch{ setStatus('Failed') }
  }

  return (<>
    <HeadTags title="Teams — SEOScribe" description="Invite your team." canonical="/teams" />
    <section className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold">Teams</h1>
      {!supported ? (
        <div className="glass p-6 rounded-2xl mt-4">Teams are not enabled on this workspace.</div>
      ) : (
        <div className="grid md:grid-cols-3 gap-6 mt-6">
          <div className="md:col-span-2">
            <div className="glass p-4 rounded-2xl">
              <div className="text-sm text-white/70 mb-2">Members</div>
              <ul className="space-y-2 text-sm">{members.map((m,i)=>(<li key={i} className="glass p-2 rounded-xl">{m.email || m.name}</li>))}</ul>
              {(!members || members.length===0) && <div className="text-white/60 text-sm">No members yet.</div>}
            </div>
          </div>
          <div className="md:col-span-1">
            <div className="glass p-4 rounded-2xl">
              <div className="text-sm text-white/70 mb-2">Invite</div>
              <input value={email} onChange={e=>setEmail(e.target.value)} placeholder="user@example.com" className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10" />
              <button onClick={invite} className="mt-3 w-full px-3 py-2 rounded-xl bg-brand-500 hover:bg-brand-400">Send invite</button>
              <div className="text-sm text-white/70 mt-2 h-5">{status}</div>
            </div>
          </div>
        </div>
      )}
    </section>
  </>)
}