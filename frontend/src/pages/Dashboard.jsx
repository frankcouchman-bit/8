import React from 'react'
import HeadTags from '../seo/HeadTags.jsx'
import Tabs from '../components/Tabs.jsx'
import JSONViewer from '../components/JSONViewer.jsx'
import { getProfile } from '../utils/api.js'

import BriefTool from '../tools/BriefTool.jsx'
import KeywordsTool from '../tools/KeywordsTool.jsx'
import SerpTool from '../tools/SerpTool.jsx'
import HeadlineTool from '../tools/HeadlineTool.jsx'
import MetaTool from '../tools/MetaTool.jsx'
import ReadabilityTool from '../tools/ReadabilityTool.jsx'
import PlagiarismTool from '../tools/PlagiarismTool.jsx'
import CompetitorsTool from '../tools/CompetitorsTool.jsx'
import SectionTool from '../tools/SectionTool.jsx'
import AssistantTool from '../tools/AssistantTool.jsx'
import ExpandTool from '../tools/ExpandTool.jsx'
import DraftTool from '../tools/DraftTool.jsx'
import ResearchTool from '../tools/ResearchTool.jsx'

export default function Dashboard(){
  React.useEffect(()=>{
    const u = new URL(window.location.href)
    if (u.searchParams.get('demo')==='true' && !localStorage.getItem('sb_access_token')){
      const el = document.getElementById('demo-hint'); if (el) el.textContent = 'Demo enabled: you can run one tool or a short draft without signing in.'
    }
  }, [])
  const [profile, setProfile] = React.useState(null)
  const [tab, setTab] = React.useState('brief')
  React.useEffect(()=>{ getProfile().then(setProfile) }, [])

  return (
    <>
      <HeadTags title="Dashboard — SEOScribe" description="Workspace: tools, drafts, quotas." canonical="/dashboard" />
      <section className="max-w-6xl mx-auto px-4 py-10">
        <div className="grid md:grid-cols-4 gap-6">
          <aside className="md:col-span-1 space-y-4">
            <section className="glass p-4 rounded-2xl">
              <div className="text-sm text-white/70">Plan & Usage</div>
              {!profile ? <div className="animate-pulse h-24 bg-white/10 rounded mt-3"/> :
                <pre className="text-xs text-white/70 mt-3 whitespace-pre-wrap">{JSON.stringify(profile, null, 2)}</pre>}
            <div className="mt-2 text-sm text-white/70" id="demo-hint"></div></section>
            <section className="glass p-4 rounded-2xl">
              <div className="text-sm text-white/70">Quick</div>
              <ul className="mt-2 text-sm space-y-2">
                <li><a className="hover:underline" href="/library">Library</a></li>
                <li><a className="hover:underline" href="/">Article Writer</a></li>
                <li><a className="hover:underline" href="/ai-writer">AI Writer</a></li>
                <li><a className="hover:underline" href="/writing-tool">Writing Tool</a></li>
              </ul>
            <div className="mt-2 text-sm text-white/70" id="demo-hint"></div></section>
          </aside>

          <main className="md:col-span-3">
            <Tabs value={tab} onChange={setTab} tabs={[
              {value:'brief', label:'Brief'},
              {value:'keywords', label:'Keywords'},
              {value:'serp', label:'SERP'},
              {value:'headline', label:'Headline'},
              {value:'meta', label:'Meta'},
              {value:'readability', label:'Readability'},
              {value:'plagiarism', label:'Plagiarism'},
              {value:'competitors', label:'Competitors'},
              {value:'section', label:'Section'},
              {value:'assistant', label:'Assistant'},
              {value:'expand', label:'Expand'},
              {value:'draft', label:'Draft'},
              {value:'research', label:'Research'}
            ]}/>

            <div className="mt-6 space-y-6">
              {tab==='brief' && <BriefTool/>}
              {tab==='keywords' && <KeywordsTool/>}
              {tab==='serp' && <SerpTool/>}
              {tab==='headline' && <HeadlineTool/>}
              {tab==='meta' && <MetaTool/>}
              {tab==='readability' && <ReadabilityTool/>}
              {tab==='plagiarism' && <PlagiarismTool/>}
              {tab==='competitors' && <CompetitorsTool/>}
              {tab==='section' && <SectionTool/>}
              {tab==='assistant' && <AssistantTool/>}
              {tab==='expand' && <ExpandTool/>}
              {tab==='draft' && <DraftTool/>}
              {tab==='research' && <ResearchTool/>}
            </div>
          </main>
        </div>
      <div className="mt-2 text-sm text-white/70" id="demo-hint"></div></section>
    </>
  )
}