import React from 'react'
import HeadTags from '../seo/HeadTags.jsx'
import Hero from '../components/Hero.jsx'
import Features from '../components/Features.jsx'
import Testimonials from '../components/Testimonials.jsx'
import CTA from '../components/CTA.jsx'
import PlanBanner from '../components/PlanBanner.jsx'

export default function WritingTool(){
  const jsonLd = {'@context':'https://schema.org','@type':'WebPage',name:'Writing Tool — SEOScribe'}
  return (<>
    <HeadTags title="Writing Tool — Drafts, Headlines, SERP Preview | SEOScribe"
      description="A writing tool with keyword clustering, content briefs, readability and headline analyzer. Built to rank."
      canonical="/writing-tool" jsonLd={jsonLd}/>
    <Hero kicker="Writing Tool" title="Everything you need to write content that ranks"
      subtitle="From ideas to optimized drafts with internal links. Analyze headlines, preview SERPs, and check readability." keyword="writing tool"/>
    <PlanBanner/>
    <Features/><Testimonials/><CTA/>
  </>)
}