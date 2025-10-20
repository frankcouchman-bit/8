import React from 'react'
export default function JSONViewer({ data, maxHeight=420 }){
  return (
    <pre className="text-xs text-white/80 bg-white/5 border border-white/10 rounded-xl p-4 overflow-auto"
         style={{maxHeight}}>{JSON.stringify(data, null, 2)}</pre>
  )
}