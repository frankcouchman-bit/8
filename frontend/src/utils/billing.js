const BASE = import.meta.env.VITE_API_BASE || 'http://localhost:4000';

function bearer(){
  const token = localStorage.getItem('sb_access_token') || '';
  return token ? { Authorization: `Bearer ${token}` } : {};
}

async function toJson(r){
  const t = await r.text(); try { return JSON.parse(t) } catch { return { raw:t } }
}

export async function createCheckout(returnTo){
  const r = await fetch(`${BASE}/api/stripe/create-checkout`, {
    method: 'POST',
    headers: { 'Content-Type':'application/json', ...bearer() },
    body: JSON.stringify({ return_url: returnTo || window.location.href })
  })
  const j = await toJson(r)
  if (j?.url) { window.location.assign(j.url); return }
  throw new Error(j?.error || 'Checkout failed')
}

export async function openPortal(returnTo){
  const r = await fetch(`${BASE}/api/stripe/portal`, {
    method: 'POST',
    headers: { 'Content-Type':'application/json', ...bearer() },
    body: JSON.stringify({ return_url: returnTo || window.location.href })
  })
  const j = await toJson(r)
  if (j?.url) { window.location.assign(j.url); return }
  throw new Error(j?.error || 'Portal failed')
}