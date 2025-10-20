import QuotaPill from './QuotaPill.jsx'
import React from 'react'
import { Link, NavLink } from 'react-router-dom'

const NavItem = ({ to, children }) => (
  <NavLink
    to={to}
    className={({ isActive }) =>
      `px-3 py-2 rounded-xl hover:bg-white/5 ${isActive ? 'text-brand-300' : 'text-white/80'}`
    }
  >
    {children}
  </NavLink>
)

export default function Navbar() {
  return (
    <header className="sticky top-0 z-40 backdrop-blur border-b border-white/5 bg-slate-950/60">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between gap-4">
        <Link to="/" className="font-semibold tracking-tight text-white text-lg">
          <span className="text-brand-300">SEO</span>Scribe
        </Link>

        <nav className="hidden md:flex items-center gap-1">
          <NavItem to="/">Article Writer</NavItem>
          <NavItem to="/ai-writer">AI Writer</NavItem>
          <NavItem to="/writing-tool">Writing Tool</NavItem>
          <NavItem to="/seo-content">SEO Content</NavItem>
          <NavItem to="/pricing">Pricing</NavItem>
          <NavItem to="/templates">Templates</NavItem>
          <NavItem to="/library">Library</NavItem>
          <NavItem to="/teams">Teams</NavItem>
          <NavItem to="/dashboard">Dashboard</NavItem>
        </nav>

        <QuotaPill />

        <div className="flex items-center gap-2">
          <Link to="/login" className="px-4 py-2 rounded-xl glass hover:shadow-premium">
            Sign in
          </Link>
          <a href="#cta" className="px-4 py-2 rounded-xl bg-brand-500 hover:bg-brand-400 text-white shadow-premium">
            Try free
          </a>
        </div>
      </div>
    </header>
  )
}
