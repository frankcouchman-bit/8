import React from 'react'
export default function TopNotice({ show, children }){
  if (!show) return null
  return (
    <div className="sticky top-16 z-40 w-full bg-amber-500/10 text-amber-200 border-b border-amber-500/20">
      <div className="max-w-6xl mx-auto px-4 py-2 text-sm">{children}</div>
    </div>
  )
}