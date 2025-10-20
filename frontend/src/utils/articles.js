const BASE = import.meta.env.VITE_API_BASE || 'http://localhost:4000';

function bearer(){
  const token = localStorage.getItem('sb_access_token') || '';
  return token ? { Authorization: `Bearer ${token}` } : {};
}

async function toJson(r){
  const t = await r.text(); try { return JSON.parse(t) } catch { return { raw: t } }
}

export async function getArticle(id){
  const r = await fetch(`${BASE}/api/articles/${id}`, { headers: { ...bearer() } })
  return toJson(r)
}

export async function listTemplates(){
  const r = await fetch(`${BASE}/api/templates`, { headers: { ...bearer() } })
  return toJson(r)
}

export async function generateFromTemplate(payload){
  // Prefer dedicated endpoint, fallback to /api/draft with template hint
  const r = await fetch(`${BASE}/api/templates/generate`, {
    method: 'POST',
    headers: { 'Content-Type':'application/json', ...bearer() },
    body: JSON.stringify(payload)
  })
  if (r.status === 404){
    const r2 = await fetch(`${BASE}/api/draft`, {
      method: 'POST', headers: { 'Content-Type':'application/json', ...bearer() },
      body: JSON.stringify({ ...payload, template: payload.template_id })
    })
    return toJson(r2)
  }
  return toJson(r)
}