import React from 'react'
import HeadTags from '../seo/HeadTags.jsx'
import { useParams } from 'react-router-dom'
import { marked } from 'marked'
import DOMPurify from 'dompurify'
import { getArticle } from '../utils/articles.js'
import { readingTime, buildTocFromMarkdown, buildTocFromHtml, injectAnchorIds } from '../utils/text.js'
import OutlineNav from '../components/OutlineNav.jsx'
import CopyButton from '../components/CopyButton.jsx'
import ProgressBar from '../components/ProgressBar.jsx'

function HTML({ markdown='' }){
  const html = React.useMemo(()=> DOMPurify.sanitize(marked.parse(markdown || '')), [markdown])
  return <div className="prose prose-invert max-w-none" dangerouslySetInnerHTML={{ __html: html }} />
}

export default function Viewer(){
  const { id } = useParams()
  const [doc, setDoc] = React.useState(null)
  React.useEffect(()=>{ (async ()=>{ setDoc(await getArticle(id)) })() }, [id])

  const md = doc?.content || ''
  const htmlRaw = 'html' in (doc||{}) ? (doc.html || '') : null
  const toc = React.useMemo(()=> htmlRaw ? buildTocFromHtml(htmlRaw) : buildTocFromMarkdown(md), [htmlRaw, md])
  const html = React.useMemo(()=>{
    if (htmlRaw){
      const withIds = injectAnchorIds(htmlRaw, toc)
      return withIds
    }
    return null
  }, [htmlRaw, toc])
  const rt = readingTime((doc?.content || '') + ' ' + (doc?.plain || ''))

  const citations = doc?.sources || doc?.citations || []

  return (<>
    <HeadTags title={`Viewer — ${doc?.title || 'Article'}`} description="Rendered article." canonical={`/viewer/${id}`} />
    <section className="max-w-6xl mx-auto px-4 py-10">
      <ProgressBar targetId="article-root" />
      {!doc ? <div className="animate-pulse h-40 bg-white/10 rounded" /> : (
        <div className="grid md:grid-cols-3 gap-6">
          <article id="article-root" className="md:col-span-2 glass p-6 rounded-2xl">
            <h1 className="text-3xl font-bold">{doc.title || 'Untitled'}</h1>
            <div className="mt-3 flex gap-2">
              <CopyButton label="Copy link" getText={()=>window.location.href} />
              <CopyButton label="Copy section" getText={()=>{
                try{
                  const id = window.location.hash?.slice(1)
                  if (!id) return document.querySelector('#article-root')?.innerText || ''
                  const current = document.getElementById(id)
                  if (!current) return document.querySelector('#article-root')?.innerText || ''
                  let txt = current.innerText + '\n'
                  let n = current.nextElementSibling
                  while (n && !/^H[23]$/.test(n.tagName)) { txt += (n.innerText||'') + '\n'; n = n.nextElementSibling }
                  return txt.trim()
                }catch{ return document.querySelector('#article-root')?.innerText || '' }
              }} />
            </div>
            <div className="text-white/60 text-sm mt-2 flex items-center gap-3"><span>{doc.created_at}</span><span>•</span><span>{rt.minutes} min read</span><CopyButton label="Copy Markdown" getText={()=>doc.content || ''} /></div>
            <div className="mt-6">
              {html ? <div className="prose prose-invert max-w-none" dangerouslySetInnerHTML={{ __html: html }} /> : <HTML markdown={doc.content || ''} />}
            </div>
          </article>
          <aside className="md:col-span-1 space-y-4">
            <OutlineNav toc={toc} />
            <section className="glass p-4 rounded-2xl">
              <div className="text-sm text-white/70">Metadata</div>
              <div className="text-xs text-white/60 mt-2">Words: {doc.word_count || '-'}</div>
              <div className="text-xs text-white/60">Region: {doc.region || '-'}</div>
            </section>
            <section className="glass p-4 rounded-2xl">
              <div className="text-sm text-white/70 mb-2">Citations</div>
              {!citations || citations.length===0 ? <div className="text-xs text-white/60">None</div> :
                <ul className="text-xs space-y-2">{citations.map((c,i)=>(<li key={i} className="break-words"><a className="underline" href={c.url || c} target="_blank" rel="noreferrer">{c.title || c.url || c}</a></li>))}</ul>
              }
            </section>
          </aside>
        </div>
      )}
    </section>
  </>)
}