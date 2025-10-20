import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import fetch from 'node-fetch'
import jwt from 'jsonwebtoken'

const app = express()
const PORT = process.env.BACKEND_PORT || 4000
const API = process.env.VITE_API_BASE || process.env.PUBLIC_API_URL || 'http://localhost:8787'
const JWT_SECRET = process.env.JWT_SECRET || 'dev_secret'

app.use(express.json({ limit: '1mb' }))
app.use(cookieParser())
app.use(cors({ origin: true, credentials: true }))

app.get('/api/health', (_, res) => res.json({ ok: true, ts: new Date().toISOString() }))

app.post('/api/auth/magic-link', async (req, res) => {
  try {
    const r = await fetch(`${API}/auth/magic-link`, {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: req.body.email, redirect: req.body.redirect })
    })
    const data = await r.json().catch(()=>({})); res.status(r.status).json(data)
  } catch(e){ res.status(500).json({ error: 'Magic link error' }) }
})

app.post('/api/auth/set-tokens', (req, res) => {
  const { access_token, refresh_token } = req.body || {}
  if (!access_token) return res.status(400).json({ error: 'No token' })
  const session = jwt.sign({ sub: 'supabase', at: access_token }, JWT_SECRET, { expiresIn: '1d' })
  res.cookie('ss_session', session, { httpOnly: true, sameSite: 'lax', secure: false, maxAge: 86400000 })
  res.json({ ok: true })
})

app.get('/api/user/profile', async (req, res) => {
  try {
    const r = await fetch(`${API}/api/profile`, { headers: { 'Authorization': req.headers.authorization || '' } })
    const data = await r.json().catch(()=>({})); res.status(r.status).json(data)
  } catch(e){ res.status(500).json({ error: 'Profile error' }) }
})

app.post('/api/*', async (req, res) => {
  try {
    const path = req.params[0]
    const r = await fetch(`${API}/api/${path}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': req.headers.authorization || '' },
      body: JSON.stringify(req.body || {})
    })
    const data = await r.json().catch(()=>({})); res.status(r.status).json(data)
  } catch(e){ res.status(500).json({ error: 'Proxy error' }) }
})

app.listen(Number(process.env.PORT || 4000), ()=>console.log('proxy on :'+(process.env.PORT||4000))), ()=>console.log('proxy on :'+(process.env.PORT||4000)))


// Articles CRUD proxy
app.get('/api/articles', async (req,res)=>{
  try {
    const r = await fetch(`${API}/api/articles`, { headers: { 'Authorization': req.headers.authorization || '' } })
    const data = await r.json().catch(()=>({})); res.status(r.status).json(data)
  } catch(e){ res.status(500).json({ error: 'Articles list error' }) }
})
app.get('/api/articles/:id', async (req,res)=>{
  try {
    const r = await fetch(`${API}/api/articles/${req.params.id}`, { headers: { 'Authorization': req.headers.authorization || '' } })
    const data = await r.json().catch(()=>({})); res.status(r.status).json(data)
  } catch(e){ res.status(500).json({ error: 'Article fetch error' }) }
})
app.post('/api/articles', async (req,res)=>{
  try {
    const r = await fetch(`${API}/api/articles`, { method:'POST', headers: { 'Content-Type':'application/json','Authorization': req.headers.authorization || '' }, body: JSON.stringify(req.body||{}) })
    const data = await r.json().catch(()=>({})); res.status(r.status).json(data)
  } catch(e){ res.status(500).json({ error: 'Article create error' }) }
})
app.patch('/api/articles/:id', async (req,res)=>{
  try {
    const r = await fetch(`${API}/api/articles/${req.params.id}`, { method:'PATCH', headers: { 'Content-Type':'application/json','Authorization': req.headers.authorization || '' }, body: JSON.stringify(req.body||{}) })
    const data = await r.json().catch(()=>({})); res.status(r.status).json(data)
  } catch(e){ res.status(500).json({ error: 'Article update error' }) }
})
app.delete('/api/articles/:id', async (req,res)=>{
  try {
    const r = await fetch(`${API}/api/articles/${req.params.id}`, { method:'DELETE', headers: { 'Authorization': req.headers.authorization || '' } })
    const data = await r.json().catch(()=>({})); res.status(r.status).json(data)
  } catch(e){ res.status(500).json({ error: 'Article delete error' }) }
})

// Stripe helpers
app.post('/api/stripe/create-checkout', async (req,res)=>{
  try {
    const r = await fetch(`${API}/api/stripe/create-checkout`, { method:'POST', headers: { 'Content-Type':'application/json','Authorization': req.headers.authorization || '' }, body: JSON.stringify(req.body||{}) })
    const data = await r.json().catch(()=>({})); res.status(r.status).json(data)
  } catch(e){ res.status(500).json({ error: 'Stripe checkout error' }) }
})
app.post('/api/stripe/portal', async (req,res)=>{
  try {
    const r = await fetch(`${API}/api/stripe/portal`, { method:'POST', headers: { 'Content-Type':'application/json','Authorization': req.headers.authorization || '' }, body: JSON.stringify(req.body||{}) })
    const data = await r.json().catch(()=>({})); res.status(r.status).json(data)
  } catch(e){ res.status(500).json({ error: 'Stripe portal error' }) }
})