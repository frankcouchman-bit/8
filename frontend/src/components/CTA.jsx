import React from 'react'
export default function CTA(){
  return (
    <section id="cta" className="max-w-6xl mx-auto px-4 py-16 flex flex-col md:flex-row items-center gap-6">
      <div className="glass p-6 rounded-2xl w-full md:w-2/3">
        <h3 className="text-2xl font-bold">Get 1 free article/day</h3>
        <p className="text-white/70 mt-2">Sign in with magic link. Upgrade anytime for 15/day.</p>
      </div>
      <a href="/login" className="px-6 py-4 rounded-2xl bg-brand-500 hover:bg-brand-400 text-white shadow-premium">Sign in</a>
    </section>
  )
}