import React from 'react'
import HeadTags from '../seo/HeadTags.jsx'
import Hero from '../components/Hero.jsx'
import Features from '../components/Features.jsx'
import Testimonials from '../components/Testimonials.jsx'
import CTA from '../components/CTA.jsx'
import PlanBanner from '../components/PlanBanner.jsx'

export default function AiWriter(){
  const jsonLd = {'@context':'https://schema.org','@type':'WebPage',name:'AI Writer — SEOScribe'}
  return (<>
    <HeadTags title="AI Writer — Long-Form, SERP-Aware Content | SEOScribe"
      description="AI writer that understands search intent. Drafts grounded in live SERP research with citations, hero image and FAQs."
      canonical="/ai-writer" jsonLd={jsonLd}/>
    <Hero kicker="AI Writer" title="AI that writes like your best SEO"
      subtitle="Turn topics into structured, research-backed drafts. Guided by competitor analysis, headlines and meta tools." keyword="AI writer"/>
    <PlanBanner/>
    <Features/><Testimonials/><CTA/>
  </>)
}