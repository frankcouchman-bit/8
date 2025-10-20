import React from 'react'
export default function HeadTags({ title, description, canonical='/', jsonLd }){
  React.useEffect(()=>{
    if (title) document.title = title
    const set = (name, content) => {
      let el = document.querySelector(`meta[name="${name}"]`)
      if (!el) { el = document.createElement('meta'); el.setAttribute('name', name); document.head.appendChild(el) }
      el.setAttribute('content', content || '')
    }
    const setProp = (prop, content) => {
      let el = document.querySelector(`meta[property="${prop}"]`)
      if (!el) { el = document.createElement('meta'); el.setAttribute('property', prop); document.head.appendChild(el) }
      el.setAttribute('content', content || '')
    }
    const setCanonical = (href) => {
      let link = document.querySelector('link[rel="canonical"]')
      if (!link) { link = document.createElement('link'); link.setAttribute('rel', 'canonical'); document.head.appendChild(link) }
      link.setAttribute('href', href)
    }
    if (description) set('description', description)
    setCanonical(canonical)
    if (title) setProp('og:title', title)
    if (description) setProp('og:description', description)
    setProp('og:type', 'website')
    set('twitter:card', 'summary_large_image')
    const id = 'page-jsonld'
    const old = document.getElementById(id); if (old) old.remove()
    if (jsonLd){ const s=document.createElement('script'); s.type='application/ld+json'; s.id=id; s.textContent=JSON.stringify(jsonLd); document.head.appendChild(s) }
  }, [title, description, canonical, jsonLd])
  return null
}