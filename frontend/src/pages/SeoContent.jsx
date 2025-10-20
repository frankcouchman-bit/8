import React from 'react'
import HeadTags from '../seo/HeadTags.jsx'
import Hero from '../components/Hero.jsx'
import Features from '../components/Features.jsx'
import Testimonials from '../components/Testimonials.jsx'
import CTA from '../components/CTA.jsx'
import PlanBanner from '../components/PlanBanner.jsx'

export default function SeoContent(){
  const jsonLd = {'@context':'https://schema.org','@type':'WebPage',name:'SEO Content — SEOScribe'}
  return (<>
    <HeadTags title="SEO Content — Research, Briefs, and Long-Form Drafts | SEOScribe"
      description="Generate SEO content that mirrors search intent. Research, briefs, long-form drafts, citations and FAQs included."
      canonical="/seo-content" jsonLd={jsonLd}/>
    <Hero kicker="SEO Content" title="SEO content that mirrors search intent"
      subtitle="Build briefs from SERPs, then draft 3,000–6,000 word articles with citations, FAQs and social posts." keyword="SEO content"/>
    <PlanBanner/>
    <Features/><Testimonials/><CTA/>
  </>)
}