import React from 'react'
export default function OutlineNav({ toc=[] }){
  if (!toc.length) return null
  return (
    <nav className="glass p-4 rounded-2xl sticky top-24 max-h-[70vh] overflow-auto">
      <div className="text-sm text-white/70 mb-2">On this page</div>
      <ul className="space-y-2 text-sm">
        {toc.map((it,i)=>(
          <li key={i} className={it.level===3?'pl-4':''}>
            <a href={`#${it.id}`} className="hover:underline">{it.title}</a>
          </li>
        ))}
      </ul>
    </nav>
  )
}