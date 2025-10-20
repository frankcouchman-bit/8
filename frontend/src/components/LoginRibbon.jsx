import React from 'react'
export default function LoginRibbon(){
  const [show, setShow] = React.useState(false)
  React.useEffect(()=>{
    const token = localStorage.getItem('sb_access_token')
    if (!token) setShow(true)
  }, [])
  if (!show) return null
  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 bg-white/10 border border-white/20 backdrop-blur text-sm px-4 py-2 rounded-xl">
      Try one demo then <a className="underline" href="/login">sign in</a> to continue.
    </div>
  )
}