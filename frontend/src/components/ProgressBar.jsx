import React from 'react'
export default function ProgressBar({ targetId='article-root' }){
  const [p, setP] = React.useState(0)
  React.useEffect(()=>{
    const el = document.getElementById(targetId)
    if (!el) return
    function onScroll(){
      const rect = el.getBoundingClientRect()
      const total = el.scrollHeight - window.innerHeight
      const scrolled = Math.min(Math.max(window.scrollY - el.offsetTop, 0), total)
      const per = total > 0 ? Math.round((scrolled/total)*100) : 0
      setP(per)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => { window.removeEventListener('scroll', onScroll); window.removeEventListener('resize', onScroll) }
  }, [targetId])
  return (
    <div className="sticky top-0 z-[60] h-1 bg-white/5">
      <div className="h-1 bg-brand-500 transition-[width] duration-200" style={{width: p+'%'}}/>
    </div>
  )
}