import { useSession } from '../state/session.jsx'
import React from 'react'
import ToolCard from '../components/ToolCard.jsx'
import JSONViewer from '../components/JSONViewer.jsx'
import { ToolsAPI } from '../utils/api.js'
export default function HeadlineTool(){
    const { usage, limits, plan } = useSession();
  const toolsUsed = usage?.tools || 0;
  const toolsLimit = limits?.tools ?? (plan==='pro'?10:1);
  const authed = !!localStorage.getItem('sb_access_token');
  const demoAvailable = !authed && localStorage.getItem('demo_used')!=='1';
  const blocked = authed ? (toolsUsed >= toolsLimit) : (!demoAvailable);
const [headline, setHeadline] = React.useState('Powerful AI Article Writer — Create SEO Content Fast')
  const [loading, setLoading] = React.useState(false)
  const [result, setResult] = React.useState(null)
  return (
    <ToolCard title="Headline Analyzer" description="Score your H1/title ideas.">
      <div className="grid md:grid-cols-3 gap-4">
        <label className="block md:col-span-2"><div className="text-sm text-white/70 mb-1">Headline</div><input value={headline} onChange={e=>setHeadline(e.target.value)} className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10"/></label>
        <div className="md:col-span-1 flex items-end">
          <button disabled={loading || blocked} onClick={async ()=>{ setLoading(true); setResult(null); const r=await ToolsAPI.headline({ headline }); setResult(r); setLoading(false) }} className="w-full px-4 py-3 rounded-xl bg-brand-500 hover:bg-brand-400 shadow-premium">{loading?'Running…':'Analyze'}</button>
        </div>
      </div>
      {result && <div className="mt-4"><JSONViewer data={result}/></div>}
    {blocked && <div className="mt-3 text-sm text-amber-300">You\'ve hit today\'s limit. Upgrade or try again tomorrow.</div>}\n    </ToolCard>
  )
}