import React from 'react'
export default function useToast(){
  const [toast, setToast] = React.useState(null)
  const show = (msg, t=3000) => { setToast(msg); setTimeout(()=>setToast(null), t) }
  const node = toast ? (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 px-4 py-2 rounded-xl bg-white/10 border border-white/20 backdrop-blur text-white">
      {toast}
    </div>
  ) : null
  return { show, node }
}