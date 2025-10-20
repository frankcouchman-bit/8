import React from 'react'
import { useSession } from '../state/session.jsx'

export default function QuotaPill(){
  const { profile } = useSession()
  const drafts = profile?.usage?.drafts || 0
  const draftsLimit = profile?.limits?.drafts || (profile?.plan==='pro' ? 15 : 1)
  const tools = profile?.usage?.tools || 0
  const toolsLimit = profile?.limits?.tools || (profile?.plan==='pro' ? 10 : 1)
  return (
    <div className="hidden md:flex items-center gap-2 text-xs text-white/80">
      <div className="px-3 py-1 rounded-full bg-white/10 border border-white/10">Drafts {drafts}/{draftsLimit}</div>
      <div className="px-3 py-1 rounded-full bg-white/10 border border-white/10">Tools {tools}/{toolsLimit}</div>
    </div>
  )
}