import React from 'react'
import { motion } from 'framer-motion'
import { Sparkles, LineChart, Link2 } from 'lucide-react'
const items = [
  { icon: Sparkles, title: 'Long-form drafts', desc: '3,000–6,000 words with citations, FAQs, and hero image.' },
  { icon: LineChart, title: 'SEO Brain', desc: 'SERP-aware briefs, keyword clusters, headline analyzer, SERP preview.' },
  { icon: Link2, title: 'Internal linking', desc: 'Suggests smart internal links from your site map.' },
]
export default function Features(){
  return (
    <section className="max-w-6xl mx-auto px-4 py-16 grid md:grid-cols-3 gap-6">
      {items.map((it, i) => (
        <motion.div key={it.title} initial={{opacity:0, y:8}} whileInView={{opacity:1,y:0}} viewport={{ once: true }} transition={{ delay: .05 * i }}
          className="glass p-6 rounded-2xl">
          <it.icon className="w-6 h-6 text-brand-300" />
          <h3 className="mt-4 font-semibold text-lg">{it.title}</h3>
          <p className="text-white/70 mt-2">{it.desc}</p>
        </motion.div>
      ))}
    </section>
  )
}