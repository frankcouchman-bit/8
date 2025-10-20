import React from 'react'
import HeadTags from '../seo/HeadTags.jsx'
import { createCheckout, openPortal } from '../utils/billing.js'
import { useSession } from '../state/session.jsx'

function Card({title, price, features, cta, onClick, highlight}){
  return (
    <div className={`glass p-6 rounded-2xl ${highlight?'ring-1 ring-brand-400':''}`}>
      <h3 className="text-xl font-semibold">{title}</h3>
      <div className="text-3xl font-extrabold mt-2">{price}</div>
      <ul className="text-sm text-white/80 mt-4 space-y-2">
        {features.map((f,i)=>(<li key={i}>• {f}</li>))}
      </ul>
      <button onClick={onClick} className="mt-6 w-full px-4 py-3 rounded-xl bg-brand-500 hover:bg-brand-400">{cta}</button>
    </div>
  )
}

export default function Pricing(){
  const { plan } = useSession()
  return (<>
    <HeadTags title="Pricing — SEOScribe" description="Choose Free or Pro." canonical="/pricing" />
    <section className="max-w-6xl mx-auto px-4 py-16">
      <h1 className="text-3xl font-bold">Pricing</h1>
      <p className="text-white/70 mt-2">Start free. Upgrade anytime.</p>
      <div className="grid md:grid-cols-2 gap-6 mt-8">
        <Card title="Free" price="$0" cta="Start free"
          features={['1 draft/day','1 use/day per tool','Magic link login']}
          onClick={()=>window.location.assign('/login')} />
        <Card title="Pro" price="$24/mo" cta={plan==='pro'?'Manage billing':'Upgrade to Pro'} highlight
          features={['15 drafts/day','10 uses/day per tool','Priority generation','Billing portal']}
          onClick={()=> plan==='pro' ? openPortal() : createCheckout()} />
      </div>
    </section>
  </>)
}