import { useSession } from '../state/session.jsx'
import React from 'react'
import ToolCard from '../components/ToolCard.jsx'
import JSONViewer from '../components/JSONViewer.jsx'
import { ToolsAPI } from '../utils/api.js'
export default function MetaTool(){
    const { usage, limits, plan } = useSession();
  const toolsUsed = usage?.tools || 0;
  const toolsLimit = limits?.tools ?? (plan==='pro'?10:1);
  const authed = !!localStorage.getItem('sb_access_token');
  const demoAvailable = !authed && localStorage.getItem('demo_used')!=='1';
  const blocked = authed ? (toolsUsed >= toolsLimit) : (!demoAvailable);
const [content, setContent] = React.useState('Paste your article content...')
  const [loading, setLoading] = React.useState(false)
  const [result, setResult] = React.useState(null)
  return (
    <ToolCard title="Meta Description" description="Generate optimized meta from content.">
      <textarea value={content} onChange={e=>setContent(e.target.value)} className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 min-h-[140px]" />
      <div className="mt-3">
        <button disabled={loading || blocked} onClick={async ()=>{ setLoading(true); setResult(null); const r=await ToolsAPI.meta({ content }); setResult(r); setLoading(false) }} className="px-4 py-2 rounded-xl bg-brand-500 hover:bg-brand-400 shadow-premium">{loading?'Running…':'Generate Meta'}</button>
      </div>
      {result && <div className="mt-4"><JSONViewer data={result}/></div>}
    {blocked && <div className="mt-3 text-sm text-amber-300">You\'ve hit today\'s limit. Upgrade or try again tomorrow.</div>}\n    </ToolCard>
  )
}