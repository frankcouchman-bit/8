// frontend/src/pages/Templates.jsx
import React from 'react'
import HeadTags from '../seo/HeadTags.jsx'
import { listTemplates, generateFromTemplate } from '../utils/articles.js'

const ICONS = { all:'🌐', Blog:'📝', 'How-to':'🛠️', Comparison:'⚖️', Listicle:'🔢', Review:'⭐' }

export default function Templates(){
  const [items, setItems] = React.useState([])
  const [loading, setLoading] = React.useState(true)
  const [active, setActive] = React.useState(null)
  const [topic, setTopic] = React.useState('AI content strategy for startups')
  const [region, setRegion] = React.useState('us')
  const [status, setStatus] = React.useState('')
  const [category, setCategory] = React.useState('all')

  React.useEffect(()=>{ (async ()=>{
    const r = await listTemplates()
    let arr = r?.templates || r || []
    arr = arr.map(t => ({
      ...t,
      category: t.category || t.group || (/(compare|vs|against)/i.test(t.title||'')? 'Comparison' : /(how|guide)/i.test(t.title||'')? 'How-to' : /(list|top|best)/i.test(t.title||'')? 'Listicle' : 'Blog'),
      art: t.art || null
    }))
    setItems(arr); setLoading(false)
  })() }, [])

  async function runGenerate(){
    if(!active) return
    setStatus('Generating…')
    const res = await generateFromTemplate({ template_id: active.id || active.slug || active.name, topic, region, research: true })
    setStatus(res?.id ? 'Draft created. See Library.' : res?.error || 'Done')
  }

  const visible = React.useMemo(()=>{
    if (category==='all') return items||[]
    return (items||[]).filter(t => t.category===category)
  }, [items, category])

  return (<>
    <HeadTags title="Templates — SEOScribe" description="Start with a template." canonical="/templates" />
    <section className="max-w-6xl mx-auto px-4 py-10">
      <div className="flex items-center justify-between gap-3">
        <h1 className="text-2xl font-bold">Templates</h1>
        <div className="text-sm text-white/70">{status}</div>
      </div>

      <div className="mt-4 flex flex-wrap gap-2 text-sm">
        {['all','Blog','How-to','Comparison','Listicle','Review'].map(cat => (
          <button key={cat} onClick={()=>setCategory(cat)} className={`px-3 py-1 rounded-xl ${category===cat?'bg-brand-500':'glass'}`}>
            {ICONS[cat]} {cat}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="animate-pulse h-40 bg-white/10 rounded mt-6" />
      ) : (
        <div className="grid md:grid-cols-3 gap-4 mt-6">
          {visible.length>0 ? visible.map(t => {
            const isActive = active && (active.id===t.id || active.slug===t.slug || active.name===t.name)
            return (
              <button key={t.id||t.slug||t.name} onClick={()=>setActive(t)} className={`glass p-4 rounded-2xl text-left hover:bg-white/10 ${isActive?'ring-1 ring-brand-400':''}`}>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-brand-400 to-fuchsia-400" aria-hidden />
                  <div>
                    <div className="font-semibold">{t.title || t.name}</div>
                    <div className="text-xs text-white/60 mt-1">{t.category}</div>
                  </div>
                </div>
                <div className="text-sm text-white/70 mt-3">{t.description || 'Template'}</div>
              </button>
            )
          }) : (
            <div className="text-white/70">No templates available.</div>
          )}
        </div>
      )}

      <div className="glass p-6 rounded-2xl mt-6">
        <div className="grid md:grid-cols-3 gap-4">
          <label className="block">
            <div className="text-sm text-white/70 mb-1">Topic</div>
            <input value={topic} onChange={e=>setTopic(e.target.value)} className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10" />
          </label>
          <label className="block">
            <div className="text-sm text-white/70 mb-1">Region</div>
            <input value={region} onChange={e=>setRegion(e.target.value)} className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10" />
          </label>
          <div className="md:col-span-1 flex items-end">
            <button disabled={!active} onClick={runGenerate} className="w-full px-4 py-3 rounded-xl bg-brand-500 hover:bg-brand-400 disabled:opacity-50 disabled:cursor-not-allowed">
              {active ? 'Generate from template' : 'Choose a template'}
            </button>
          </div>
        </div>
      </div>
    </section>
  </>)
}