import React from 'react'
export default function ToolCard({ title, description, children, footer }){
  return (
    <section className="glass rounded-2xl p-6">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h3 className="text-lg font-semibold">{title}</h3>
          {description && <p className="text-sm text-white/70 mt-1">{description}</p>}
        </div>
        {footer}
      </div>
      <div className="mt-4">
        {children}
      </div>
    </section>
  )
}