const BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

function getToken() { return localStorage.getItem('ns_token'); }
function authHeaders() {
  const t = getToken();
  return t ? { Authorization: 'Bearer ' + t } : {};
}

async function req(path, options = {}) {
  const res = await fetch(BASE + path, {
    headers: { 'Content-Type': 'application/json', ...authHeaders(), ...options.headers },
    ...options,
  });
  const text = await res.text();
  let data;
  try { data = JSON.parse(text); } catch { throw new Error('Server error: ' + text.slice(0, 200)); }
  if (!res.ok) throw new Error(data.error || 'Request failed');
  return data;
}

async function reqForm(path, method, formData) {
  const res = await fetch(BASE + path, { method, headers: authHeaders(), body: formData });
  const text = await res.text();
  let data;
  try { data = JSON.parse(text); } catch { throw new Error('Server error: ' + text.slice(0, 200)); }
  if (!res.ok) throw new Error(data.error || 'Request failed');
  return data;
}

// Auth
export const googleLogin  = (credential) => req('/auth/google', { method: 'POST', body: JSON.stringify({ credential }) });
export const emailSignup  = (name, email, password) => req('/auth/signup', { method: 'POST', body: JSON.stringify({ name, email, password }) });
export const emailLogin   = (email, password) => req('/auth/login',  { method: 'POST', body: JSON.stringify({ email, password }) });
export const getMe        = () => req('/auth/me');

// Novels
export const getNovels    = (params = {}) => req('/novels?' + new URLSearchParams(params).toString());
export const getNovel     = (id) => req('/novels/' + id);
export const createNovel  = (fd)     => reqForm('/novels', 'POST', fd);
export const updateNovel  = (id, fd) => reqForm('/novels/' + id, 'PUT', fd);
export const deleteNovel  = (id) => req('/novels/' + id, { method: 'DELETE' });
export const rateNovel    = (id, rating) => req('/novels/' + id + '/rate', { method: 'POST', body: JSON.stringify({ rating }) });

// Chapters
export const getChapters   = (novelId)       => req('/novels/' + novelId + '/chapters');
export const getChapter    = (novelId, num)  => req('/novels/' + novelId + '/chapters/' + num);
export const createChapter = (novelId, data) => req('/novels/' + novelId + '/chapters', { method: 'POST', body: JSON.stringify(data) });
export const updateChapter = (novelId, num, data) => req('/novels/' + novelId + '/chapters/' + num, { method: 'PUT', body: JSON.stringify(data) });
export const deleteChapter = (novelId, num)  => req('/novels/' + novelId + '/chapters/' + num, { method: 'DELETE' });
