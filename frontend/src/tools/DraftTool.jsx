import { useSession } from '../state/session.jsx'
import React from 'react'
import ToolCard from '../components/ToolCard.jsx'
import JSONViewer from '../components/JSONViewer.jsx'
import { generateDraft } from '../utils/api.js'
export default function DraftTool(){
    const { usage, limits, plan } = useSession();
  const draftsUsed = usage?.drafts || 0;
  const draftsLimit = limits?.drafts ?? (plan==='pro'?15:1);
  const authed = !!localStorage.getItem('sb_access_token');
  const demoAvailable = !authed && localStorage.getItem('demo_used')!=='1';
  const blocked = authed ? (draftsUsed >= draftsLimit) : (!demoAvailable);
const [topic, setTopic] = React.useState('AI content strategy for startups')
  const [wc, setWc] = React.useState(3000)
  const [region, setRegion] = React.useState('us')
  const [loading, setLoading] = React.useState(false)
  const [result, setResult] = React.useState(null)
  return (
    <ToolCard title="Generate Draft" description="3,000–6,000+ word draft with citations and FAQs.">
      <div className="grid md:grid-cols-3 gap-4">
        <label className="block"><div className="text-sm text-white/70 mb-1">Topic</div><input value={topic} onChange={e=>setTopic(e.target.value)} className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10"/></label>
        <label className="block"><div className="text-sm text-white/70 mb-1">Target words</div><input type="number" value={wc} onChange={e=>setWc(e.target.value)} className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10"/></label>
        <label className="block"><div className="text-sm text-white/70 mb-1">Region</div><input value={region} onChange={e=>setRegion(e.target.value)} className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10"/></label>
        <div className="md:col-span-3">
          <button disabled={loading || blocked} onClick={async ()=>{ setLoading(true); setResult(null); const r=await generateDraft({ topic, target_word_count:Number(wc), region, research:true, generate_social:true }); setResult(r); setLoading(false) }} className="px-4 py-2 rounded-2xl bg-brand-500 hover:bg-brand-400 shadow-premium">{loading?'Generating…':'Generate Draft'}</button>
        </div>
      </div>
      {result && <div className="mt-4"><JSONViewer data={result}/></div>}
    {blocked && <div className="mt-3 text-sm text-amber-300">You\'ve hit today\'s limit. Upgrade or try again tomorrow.</div>}\n    </ToolCard>
  )
}