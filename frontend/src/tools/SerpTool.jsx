import { useSession } from '../state/session.jsx'
import React from 'react'
import ToolCard from '../components/ToolCard.jsx'
import JSONViewer from '../components/JSONViewer.jsx'
import { ToolsAPI } from '../utils/api.js'
export default function SerpTool(){
    const { usage, limits, plan } = useSession();
  const toolsUsed = usage?.tools || 0;
  const toolsLimit = limits?.tools ?? (plan==='pro'?10:1);
  const authed = !!localStorage.getItem('sb_access_token');
  const demoAvailable = !authed && localStorage.getItem('demo_used')!=='1';
  const blocked = authed ? (toolsUsed >= toolsLimit) : (!demoAvailable);
const [query, setQuery] = React.useState('best article writer tools')
  const [title, setTitle] = React.useState('Powerful AI Article Writer | SEOScribe')
  const [desc, setDesc] = React.useState('Generate long-form SEO content in minutes.')
  const [loading, setLoading] = React.useState(false)
  const [result, setResult] = React.useState(null)
  return (
    <ToolCard title="SERP Preview" description="Preview titles/meta against the live SERP.">
      <div className="grid md:grid-cols-3 gap-4">
        <label className="block"><div className="text-sm text-white/70 mb-1">Query</div><input value={query} onChange={e=>setQuery(e.target.value)} className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10"/></label>
        <label className="block"><div className="text-sm text-white/70 mb-1">Proposed Title</div><input value={title} onChange={e=>setTitle(e.target.value)} className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10"/></label>
        <label className="block"><div className="text-sm text-white/70 mb-1">Meta Description</div><input value={desc} onChange={e=>setDesc(e.target.value)} className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10"/></label>
        <div className="md:col-span-3">
          <button disabled={loading || blocked} onClick={async ()=>{ setLoading(true); setResult(null); const r=await ToolsAPI.serpPreview({ query, title, description: desc }); setResult(r); setLoading(false) }} className="px-4 py-2 rounded-xl bg-brand-500 hover:bg-brand-400 shadow-premium">{loading?'Running…':'Preview SERP'}</button>
        </div>
      </div>
      {result && <div className="mt-4"><JSONViewer data={result}/></div>}
    {blocked && <div className="mt-3 text-sm text-amber-300">You\'ve hit today\'s limit. Upgrade or try again tomorrow.</div>}\n    </ToolCard>
  )
}