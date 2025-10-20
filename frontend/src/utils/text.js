export function readingTime(text=''){
  const words = (text||'').trim().split(/\s+/).filter(Boolean).length
  const minutes = Math.max(1, Math.round(words/200))
  return { words, minutes }
}

export function buildTocFromMarkdown(md=''){
  const lines = (md||'').split(/\n+/)
  const toc = []
  for (const line of lines){
    const m = /^(#{2,3})\s+(.+)$/.exec(line.trim())
    if (m){
      const level = m[1].length
      let title = m[2].trim()
      title = title.replace(/[#`*]/g,'').trim()
      const id = slugify(title)
      toc.push({ id, title, level })
    }
  }
  return dedupeIds(toc)
}

export function buildTocFromHtml(html=''){
  const rx = /<(h[23])[^>]*>(.*?)<\/\1>/gi
  const toc = []
  let m
  while ((m = rx.exec(html))){
    const tag = m[1].toLowerCase()
    const title = stripTags(m[2]).trim()
    const id = slugify(title)
    toc.push({ id, title, level: tag==='h2'?2:3 })
  }
  return dedupeIds(toc)
}

export function injectAnchorIds(html='', toc=[]){
  let out = html
  for (const item of toc){
    const rx = new RegExp(`<(h[23])(.*?)>(\\s*?)${escapeRegExp(item.title)}(\\s*?)<\\/\\1>`, 'i')
    out = out.replace(rx, (_a, tag, attrs, a, _b) => `<${tag}${attrs} id="${item.id}">${item.title}</${tag}>`)
  }
  return out
}

function stripTags(s){ return (s||'').replace(/<[^>]+>/g,'') }
function slugify(s){ return (s||'').toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/(^-|-$)/g,'') || 'section' }
function escapeRegExp(s){ return (s||'').replace(/[.*+?^${}()|[\]\\]/g, '\\$&') }

function dedupeIds(toc){
  const seen = {}
  return toc.map(it=>{
    let id = it.id
    let i = 2
    while (seen[id]){ id = it.id + '-' + i; i++ }
    seen[id] = true
    return { ...it, id }
  })
}