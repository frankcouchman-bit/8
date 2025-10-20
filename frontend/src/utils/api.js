// frontend/src/utils/api.js
export const BASE = import.meta.env.VITE_API_BASE || 'http://localhost:4000';

export function bearer() {
  const t =
    (typeof window !== 'undefined' && localStorage.getItem('sb_access_token')) ||
    '';
  return t ? { Authorization: `Bearer ${t}` } : {};
}

async function toJson(r) {
  const txt = await r.text();
  try {
    return JSON.parse(txt);
  } catch {
    return { raw: txt };
  }
}

export async function fetchProfile() {
  const r = await fetch(`${BASE}/api/profile`, { headers: { ...bearer() } });
  return toJson(r);
}

export async function generateDraft(payload) {
  const r = await fetch(`${BASE}/api/draft`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...bearer() },
    body: JSON.stringify(payload || {}),
  });
  return toJson(r);
}

export async function tool(path, payload) {
  const r = await fetch(`${BASE}${path}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...bearer() },
    body: JSON.stringify(payload || {}),
  });
  return toJson(r);
}

export const ToolsAPI = {
  brief: (p) => tool('/api/tools/brief', p),
  keywords: (p) => tool('/api/tools/keywords', p),
  serpPreview: (p) => tool('/api/tools/serp', p),
  headline: (p) => tool('/api/tools/headline', p),
  meta: (p) => tool('/api/tools/meta', p),
  readability: (p) => tool('/api/tools/readability', p),
  plagiarism: (p) => tool('/api/tools/plagiarism', p),
  competitors: (p) => tool('/api/tools/competitors', p),
  section: (p) => tool('/api/tools/section', p),
  assistant: (p) => tool('/api/ai-assistant', p),
  expand: (p) => tool('/api/expand', p),
};

/** Generic research endpoint */
export async function research(query, opts = {}) {
  const { region = 'us', ...rest } = opts;
  return tool('/api/research', { q: query, region, ...rest });
}

/** Debug wrapper to match existing imports */
export async function researchDebug(query, region = 'us', opts = {}) {
  return research(query, { ...opts, region, debug: true });
}
