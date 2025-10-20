import React from 'react'
import { motion } from 'framer-motion'
const data = [
  { name: 'Maya K.', role: 'Content Lead', quote: 'We shipped 30+ articles in two weeks. Rankings moved within days.' },
  { name: 'Andre P.', role: 'Founder', quote: 'Finally an article writer that understands search intent.' },
  { name: 'Sofia R.', role: 'SEO Manager', quote: 'The brief + long-form draft saved ~6 hours per piece.' },
]
export default function Testimonials(){
  return (
    <section className="max-w-6xl mx-auto px-4 py-16">
      <h3 className="text-xl font-semibold">Loved by marketers</h3>
      <div className="grid md:grid-cols-3 gap-6 mt-6">
        {data.map((t, i) => (
          <motion.blockquote key={i} initial={{opacity:0, y:6}} whileInView={{opacity:1, y:0}} viewport={{ once: true }} transition={{ delay: .06 * i }}
            className="glass p-6 rounded-2xl">
            <p className="text-white/90">“{t.quote}”</p>
            <footer className="mt-3 text-sm text-white/70">— {t.name}, {t.role}</footer>
          </motion.blockquote>
        ))}
      </div>
    </section>
  )
}