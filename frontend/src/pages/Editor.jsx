import React from 'react'
import HeadTags from '../seo/HeadTags.jsx'
import { useParams } from 'react-router-dom'

const BASE = import.meta.env.VITE_API_BASE || 'http://localhost:4000'
const bearer = () => {
  const t = localStorage.getItem('sb_access_token'); return t ? { Authorization: `Bearer ${t}` } : {}
}

export default function Editor(){
  const { id } = useParams()
  const [doc, setDoc] = React.useState(null)
  const [saving, setSaving] = React.useState(false)

  React.useEffect(()=>{ (async ()=>{
    const r = await fetch(`${BASE}/api/articles/${id}`, { headers: { ...bearer() } })
    setDoc(await r.json())
  })() }, [id])

  async function save(){
    setSaving(true)
    const r = await fetch(`${BASE}/api/articles/${id}`, {
      method: 'PATCH', headers: { 'Content-Type':'application/json', ...bearer() },
      body: JSON.stringify({ content: doc?.content, title: doc?.title })
    })
    await r.json(); setSaving(false)
  }

  return (<>
    <HeadTags title={`Editor — ${doc?.title || 'Article'}`} description="Edit your article." canonical={`/editor/${id}`} />
    <section className="max-w-6xl mx-auto px-4 py-10">
      {!doc ? <div className="animate-pulse h-40 bg-white/10 rounded"/> : (
        <div className="space-y-4">
          <input value={doc.title || ''} onChange={e=>setDoc({...doc, title:e.target.value})} className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10" placeholder="Title"/>
          <textarea value={doc.content || ''} onChange={e=>setDoc({...doc, content:e.target.value})} className="w-full min-h-[400px] px-4 py-3 rounded-xl bg-white/5 border border-white/10" />
          <div className="flex gap-2">
            <button onClick={save} disabled={saving} className="px-4 py-2 rounded-xl bg-brand-500 hover:bg-brand-400 shadow-premium">{saving?'Saving…':'Save'}</button>
            <a href="/library" className="px-4 py-2 rounded-xl glass">Back to library</a>
          </div>
        </div>
      )}
    </section>
  </>)
}