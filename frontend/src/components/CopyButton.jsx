import React from 'react'
export default function CopyButton({ getText, label='Copy' }){
  const [ok, setOk] = React.useState(false)
  async function copy(){
    try {
      await navigator.clipboard.writeText(typeof getText==='function'? getText(): (getText||''))
      setOk(true); setTimeout(()=>setOk(false), 1200)
    } catch {}
  }
  return <button onClick={copy} className="px-3 py-1 rounded-lg glass text-xs">{ok?'Copied!':label}</button>
}