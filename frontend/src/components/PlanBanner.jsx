import React from 'react'
import { useSession } from '../state/session.jsx'
import { createCheckout, openPortal } from '../utils/billing.js'

export default function PlanBanner(){
  const { plan, profile } = useSession()
  const isPro = plan === 'pro'
  return (
    <div className="max-w-6xl mx-auto px-4 mt-6">
      <div className="glass p-4 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-3">
        <div className="text-sm">
          <span className="px-2 py-1 rounded-full bg-white/10 border border-white/10 mr-2">{isPro?'Pro':'Free'}</span>
          {isPro ? 'You are on Pro. Enjoy 15 drafts/day and 10 uses/day per tool.' : 'You are on Free. Get 1 draft/day and 1 use/day per tool.'}
          {profile?.reset_at && <span className="ml-2 text-white/60">Resets at {new Date(profile.reset_at).toLocaleString()}</span>}
        </div>
        <div className="flex gap-2">
          {!isPro && <button onClick={()=>createCheckout()} className="px-4 py-2 rounded-xl bg-brand-500 hover:bg-brand-400">Upgrade</button>}
          <button onClick={()=>openPortal()} className="px-4 py-2 rounded-xl glass">Billing portal</button>
        </div>
      </div>
    </div>
  )
}