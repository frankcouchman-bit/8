import React from 'react'
import HeadTags from '../seo/HeadTags.jsx'
import Hero from '../components/Hero.jsx'
import Features from '../components/Features.jsx'
import Testimonials from '../components/Testimonials.jsx'
import CTA from '../components/CTA.jsx'
import PlanBanner from '../components/PlanBanner.jsx'

export default function Home(){
  const jsonLd = {'@context':'https://schema.org','@type':'SoftwareApplication',name:'SEOScribe — Article Writer',applicationCategory:'BusinessApplication',offers:{'@type':'Offer','price':'24.00','priceCurrency':'USD'}}
  return (<>
    <HeadTags title="Powerful AI Article Writer – Create SEO-ready Articles in Seconds"
      description="SEOScribe is the long-form article writer built for SEO. Generate 3,000–6,000-word drafts with citations, hero images, FAQs and social posts."
      canonical="/" jsonLd={jsonLd}/>
    <Hero kicker="Article Writer" title="Create long-form, SEO-ready articles in minutes"
      subtitle="SERP-aware research, detailed briefs and drafts that include citations, FAQs and social posts. 1 free article/day." keyword="article writer"/>
    <PlanBanner/>
    <Features/><Testimonials/><CTA/>
  </>)
}