// frontend/src/tools/ResearchTool.jsx
import React from 'react'
import { useSession } from '../state/session.jsx'
import ToolCard from '../components/ToolCard.jsx'
import JSONViewer from '../components/JSONViewer.jsx'
import { researchDebug } from '../utils/api.js'

export default function ResearchTool() {
  const { usage, limits, plan } = useSession()
  const toolsUsed = usage?.tools || 0
  const toolsLimit = limits?.tools ?? (plan === 'pro' ? 10 : 1)
  const authed = !!localStorage.getItem('sb_access_token')
  const demoAvailable = !authed && localStorage.getItem('demo_used') !== '1'
  const blocked = authed ? toolsUsed >= toolsLimit : !demoAvailable

  const [q, setQ] = React.useState('best article writer tools')
  const [region, setRegion] = React.useState('us')
  const [loading, setLoading] = React.useState(false)
  const [result, setResult] = React.useState(null)
  const [error, setError] = React.useState(null)

  async function run() {
    try {
      setLoading(true)
      setError(null)
      setResult(null)
      const r = await researchDebug(q, region)
      setResult(r)
    } catch (e) {
      setError(e?.message || 'Request failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <ToolCard title="Research (debug)" description="Run the Worker research utility.">
      <div className="grid md:grid-cols-3 gap-4">
        <label className="block">
          <div className="text-sm text-white/70 mb-1">Query</div>
          <input
            value={q}
            onChange={e => setQ(e.target.value)}
            className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10"
          />
        </label>

        <label className="block">
          <div className="text-sm text-white/70 mb-1">Region</div>
          <input
            value={region}
            onChange={e => setRegion(e.target.value)}
            className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10"
          />
        </label>

        <div className="md:col-span-3">
          <button
            disabled={loading || blocked}
            onClick={run}
            className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 border border-white/10 disabled:opacity-50"
          >
            {loading ? 'Running…' : 'Run Research'}
          </button>
        </div>
      </div>

      {error && (
        <div className="mt-3 text-sm text-amber-300">
          {error}
        </div>
      )}

      {result && (
        <div className="mt-4">
          <JSONViewer data={result} />
        </div>
      )}

      {blocked && (
        <div className="mt-3 text-sm text-amber-300">
          You’ve hit today’s limit. Upgrade or try again tomorrow.
        </div>
      )}
    </ToolCard>
  )
}
