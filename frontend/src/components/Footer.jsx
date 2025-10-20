import React from 'react'
import { Link } from 'react-router-dom'
export default function Footer(){
  return (
    <footer className="border-t border-white/10 mt-20">
      <div className="max-w-6xl mx-auto px-4 py-10 grid md:grid-cols-3 gap-8 text-sm text-white/70">
        <div><div className="font-semibold text-white">SEOScribe</div><p className="mt-2">Long-form article writer built for SEO.</p></div>
        <div className="space-y-2">
          <Link to="/" className="block hover:text-white">Article Writer</Link>
          <Link to="/ai-writer" className="block hover:text-white">AI Writer</Link>
          <Link to="/writing-tool" className="block hover:text-white">Writing Tool</Link>
          <Link to="/seo-content" className="block hover:text-white">SEO Content</Link>
        </div>
        <div className="space-y-2">
          <a href="mailto:support@seoscribe.pro" className="block hover:text-white">Support</a>
          <a href="/privacy" className="block hover:text-white">Privacy</a>
          <a href="/terms" className="block hover:text-white">Terms</a>
        </div>
      </div>
    </footer>
  )
}