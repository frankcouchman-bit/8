import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import Navbar from './components/Navbar.jsx'
import UpgradeModal from './components/UpgradeModal.jsx'
import LoginRibbon from './components/LoginRibbon.jsx'
import TopNotice from './components/TopNotice.jsx'
import { fetchProfile } from './utils/api.js'
import { useSession } from './state/session.jsx'
import Footer from './components/Footer.jsx'
import Home from './pages/Home.jsx'
import AiWriter from './pages/AiWriter.jsx'
import WritingTool from './pages/WritingTool.jsx'
import SeoContent from './pages/SeoContent.jsx'
import Pricing from './pages/Pricing.jsx'
import Dashboard from './pages/Dashboard.jsx'
import Library from './pages/Library.jsx'
import Viewer from './pages/Viewer.jsx'
import Templates from './pages/Templates.jsx'
import Teams from './pages/Teams.jsx'
import Editor from './pages/Editor.jsx'
import Login from './pages/Login.jsx'
import HeadTags from './seo/HeadTags.jsx'

const Page = ({ children }) => (
  <motion.main initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: .35 }} className="min-h-screen">
    {children}
  </motion.main>
)

export default function App(){
  const [upgradeOpen, setUpgradeOpen] = React.useState(false)
  const [activating, setActivating] = React.useState(false)
  const { plan, refreshProfile } = useSession()
  React.useEffect(()=>{
    const onUpgrade=()=>setUpgradeOpen(true); window.addEventListener('quota:upgrade', onUpgrade)
    return ()=>window.removeEventListener('quota:upgrade', onUpgrade)
  },[])
  React.useEffect(()=>{
    const u = new URL(window.location.href)
    if (u.searchParams.get('session_id') || u.searchParams.get('checkout')){
      setActivating(true)
      const iv = setInterval(async ()=>{
        const p = await fetchProfile(); if (p?.plan==='pro'){ setActivating(false); clearInterval(iv); }
      }, 2500)
      return ()=>clearInterval(iv)
    }
  }, [])
  return (
    <div className="min-h-screen bg-hero-gradient bg-slate-950">
      <HeadTags />
      <Navbar />
      <AnimatePresence mode="wait">
        <Routes>
          <Route path="/" element={<Page><Home/></Page>} />
          <Route path="/ai-writer" element={<Page><AiWriter/></Page>} />
          <Route path="/writing-tool" element={<Page><WritingTool/></Page>} />
          <Route path="/seo-content" element={<Page><SeoContent/></Page>} />
          <Route path="/pricing" element={<Page><Pricing/></Page>} />
          <Route path="/dashboard" element={<Page><Dashboard/></Page>} />
          <Route path="/library" element={<Page><Library/></Page>} />
          <Route path="/viewer/:id" element={<Page><Viewer/></Page>} />
          <Route path="/templates" element={<Page><Templates/></Page>} />
          <Route path="/teams" element={<Page><Teams/></Page>} />
          <Route path="/editor/:id" element={<Page><Editor/></Page>} />
          <Route path="/login" element={<Page><Login/></Page>} />
        </Routes>
        <TopNotice show={activating}>Activating Pro… this may take a few seconds after checkout.</TopNotice>
      </AnimatePresence>
      <Footer />
      <UpgradeModal open={upgradeOpen} onClose={()=>setUpgradeOpen(false)} />
      <LoginRibbon />
    </div>
  )
}