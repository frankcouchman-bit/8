import React from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
export default function Hero({ title, kicker, subtitle, keyword }){
  const ref = React.useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end','end start'] })
  const y = useTransform(scrollYProgress, [0,1], [0, -20])
  return (
    <section className="relative overflow-hidden" ref={ref}>
      <div className="max-w-6xl mx-auto px-4 pt-16 pb-10 md:pt-24 md:pb-20">
        <motion.p style={{y}} className="text-brand-200">{kicker}</motion.p>
        <motion.h1 style={{y}} className="text-4xl md:text-6xl font-extrabold tracking-tight mt-3">{title}</motion.h1>
        <motion.p style={{y}} className="text-white/80 mt-4 max-w-2xl">{subtitle}</motion.p>
        <motion.div style={{y}} className="mt-8 flex items-center gap-3">
          <a href="#cta" className="px-6 py-3 rounded-2xl bg-brand-500 hover:bg-brand-400 text-white shadow-premium">Try the {keyword} free</a>
          <a href="/dashboard" className="px-6 py-3 rounded-2xl glass hover:shadow-premium">Go to dashboard</a>
        </motion.div>
      </div>
      <div aria-hidden className="absolute inset-0 -z-10 pointer-events-none bg-hero-gradient"></div>
    </section>
  )
}