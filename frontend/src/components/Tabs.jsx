import React from 'react'
export default function Tabs({ tabs=[], value, onChange }){
  return (
    <div className="border-b border-white/10 overflow-x-auto">
      <div className="flex gap-1">
        {tabs.map(t => (
          <button key={t.value}
            onClick={()=>onChange(t.value)}
            className={`px-4 py-3 whitespace-nowrap ${value===t.value ? 'text-brand-300 border-b-2 border-brand-400' : 'text-white/70 hover:text-white'}`}>
            {t.label}
          </button>
        ))}
      </div>
    </div>
  )
}