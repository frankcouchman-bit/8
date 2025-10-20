import React from 'react'
import { createCheckout, openPortal } from '../utils/billing.js'

export default function UpgradeModal({ open, onClose, manage=false }){
  const [loading, setLoading] = React.useState(false)
  if (!open) return null
  async function go(fn){
    try{ setLoading(true); await fn() } finally { setLoading(false) }
  }
  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur flex items-center justify-center p-4">
      <div className="glass p-6 rounded-2xl max-w-md w-full">
        <h3 className="text-lg font-semibold">{manage ? 'Manage billing' : 'Upgrade to Pro'}</h3>
        {!manage && <p className="text-white/70 mt-2">Get 15 drafts/day and 10 uses/day for each tool.</p>}
        <div className="mt-4 flex gap-2">
          {!manage && <button disabled={loading} onClick={()=>go(()=>createCheckout())} className="px-4 py-2 rounded-xl bg-brand-500 hover:bg-brand-400">{loading?'Connecting…':'Upgrade'}</button>}
          <button disabled={loading} onClick={()=>go(()=>openPortal())} className="px-4 py-2 rounded-xl glass">{loading?'Opening…':'Portal'}</button>
          <button onClick={onClose} className="px-4 py-2 rounded-xl glass">Close</button>
        </div>
      </div>
    </div>
  )
}