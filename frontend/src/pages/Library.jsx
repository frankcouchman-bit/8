import React from 'react'
import HeadTags from '../seo/HeadTags.jsx'

const BASE = import.meta.env.VITE_API_BASE || 'http://localhost:4000'
const bearer = () => {
  const t = localStorage.getItem('sb_access_token'); return t ? { Authorization: `Bearer ${t}` } : {}
}

export default function Library(){
  const [items, setItems] = React.useState([])
  const [loading, setLoading] = React.useState(true)

  React.useEffect(()=>{ (async ()=>{
    const r = await fetch(`${BASE}/api/articles`, { headers: { ...bearer() } })
    const j = await r.json().catch(()=>[]); setItems(Array.isArray(j) ? j : (j?.items||[])); setLoading(false)
  })() }, [])

  return (<>
    <HeadTags title="Library — SEOScribe" description="Your generated articles." canonical="/library" />
    <section className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold">Articles</h1>
      {loading ? <div className="animate-pulse h-40 bg-white/10 rounded mt-6"/> : (
        <div className="grid gap-4 mt-6">
          {items.map(a => (
            <a key={a.id} href={`/editor/${a.id}`} className="glass p-4 rounded-2xl hover:bg-white/10 flex items-center justify-between">
              <div className="font-semibold">{a.title || 'Untitled'}</div>
              <div className="text-sm text-white/70 mt-1">{a.created_at}</div>
            <div className="flex gap-2">
              <a className="px-3 py-1 rounded-lg glass" href={`/viewer/${a.id}`}>View</a>
              <a className="px-3 py-1 rounded-lg glass" href={`/editor/${a.id}`}>Edit</a>
            </div>
            </a>
          ))}
          {(!items || items.length===0) && <div className="text-white/70">No articles yet.</div>}
        </div>
      )}
    </section>
  </>)
}