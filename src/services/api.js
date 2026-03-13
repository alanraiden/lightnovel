const BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

function getToken() {
  return localStorage.getItem('ns_token');
}

function authHeaders() {
  const t = getToken();
  return t ? { Authorization: 'Bearer ' + t } : {};
}

async function req(path, options = {}) {
  const res = await fetch(BASE + path, {
    headers: { 'Content-Type': 'application/json', ...authHeaders(), ...options.headers },
    ...options,
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Request failed');
  return data;
}

// Auth
export const googleLogin = (credential) =>
  req('/auth/google', { method: 'POST', body: JSON.stringify({ credential }) });

export const getMe = () => req('/auth/me');

// Novels
export const getNovels = (params = {}) =>
  req('/novels?' + new URLSearchParams(params).toString());

export const getNovel = (id) => req('/novels/' + id);

export const createNovel = async (formData) => {
  const res = await fetch(BASE + '/novels', { method: 'POST', headers: authHeaders(), body: formData });
  const text = await res.text();
  try {
    const data = JSON.parse(text);
    if (!res.ok) throw new Error(data.error || 'Failed to create novel');
    return data;
  } catch {
    throw new Error('Server error: ' + text.slice(0, 200));
  }
};

export const updateNovel = async (id, formData) => {
  const res = await fetch(BASE + '/novels/' + id, { method: 'PUT', headers: authHeaders(), body: formData });
  const text = await res.text();
  try {
    const data = JSON.parse(text);
    if (!res.ok) throw new Error(data.error || 'Failed to update novel');
    return data;
  } catch {
    throw new Error('Server error: ' + text.slice(0, 200));
  }
};

export const deleteNovel = (id) => req('/novels/' + id, { method: 'DELETE' });

export const rateNovel = (id, rating) =>
  req('/novels/' + id + '/rate', { method: 'POST', body: JSON.stringify({ rating }) });

// Chapters
export const getChapters = (novelId) => req('/novels/' + novelId + '/chapters');

export const getChapter = (novelId, num) => req('/novels/' + novelId + '/chapters/' + num);

export const createChapter = (novelId, data) =>
  req('/novels/' + novelId + '/chapters', { method: 'POST', body: JSON.stringify(data) });

export const updateChapter = (novelId, num, data) =>
  req('/novels/' + novelId + '/chapters/' + num, { method: 'PUT', body: JSON.stringify(data) });

export const deleteChapter = (novelId, num) =>
  req('/novels/' + novelId + '/chapters/' + num, { method: 'DELETE' });
