import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { getNovels, createNovel, updateNovel, deleteNovel, getChapters, createChapter, updateChapter, deleteChapter } from '../services/api';
import './Dashboard.css';

const GENRES = ['Action','Adventure','Comedy','Drama','Fantasy','Historical','Horror','Isekai','Martial Arts','Mecha','Mystery','Philosophical','Romance','Sci-Fi','System','Wuxia','Xianxia','Psychological'];

// ── Reusable confirm dialog ───────────────────────────────────────────────────
function ConfirmDialog({ message, onConfirm, onCancel }) {
  return (
    <div className="modal-backdrop" onClick={onCancel}>
      <div className="confirm-dialog" onClick={e => e.stopPropagation()}>
        <div className="confirm-icon">⚠️</div>
        <p className="confirm-message">{message}</p>
        <div className="confirm-actions">
          <button className="btn-secondary" onClick={onCancel}>Cancel</button>
          <button className="btn-danger" onClick={onConfirm}>Delete</button>
        </div>
      </div>
    </div>
  );
}

// ── Novel Form (create / edit) ────────────────────────────────────────────────
function NovelForm({ initial, onSave, onCancel, loading }) {
  const [form, setForm] = useState({
    title: initial?.title || '',
    description: initial?.description || '',
    status: initial?.status || 'ongoing',
    genres: initial?.genres || [],
    tags: initial?.tags?.join(', ') || '',
  });
  const [coverFile, setCoverFile] = useState(null);
  const [coverPreview, setCoverPreview] = useState(initial?.cover || '');

  function toggleGenre(g) {
    setForm(f => ({
      ...f,
      genres: f.genres.includes(g) ? f.genres.filter(x => x !== g) : [...f.genres, g],
    }));
  }

  function handleCover(e) {
    const file = e.target.files[0];
    if (!file) return;
    setCoverFile(file);
    setCoverPreview(URL.createObjectURL(file));
  }

  function handleSubmit(e) {
    e.preventDefault();
    const fd = new FormData();
    fd.append('title', form.title);
    fd.append('description', form.description);
    fd.append('status', form.status);
    fd.append('genres', JSON.stringify(form.genres));
    fd.append('tags', JSON.stringify(form.tags.split(',').map(t => t.trim()).filter(Boolean)));
    if (coverFile) fd.append('cover', coverFile);
    onSave(fd);
  }

  return (
    <form className="upload-form" onSubmit={handleSubmit}>
      <div className="form-row">
        <div className="form-group" style={{flex:1}}>
          <label>Novel Title *</label>
          <input required value={form.title} onChange={e => setForm(f => ({...f, title: e.target.value}))} placeholder="Enter novel title" />
        </div>
        <div className="form-group">
          <label>Status</label>
          <select value={form.status} onChange={e => setForm(f => ({...f, status: e.target.value}))}>
            <option value="ongoing">Ongoing</option>
            <option value="completed">Completed</option>
          </select>
        </div>
      </div>

      <div className="form-group">
        <label>Description *</label>
        <textarea required rows={5} value={form.description} onChange={e => setForm(f => ({...f, description: e.target.value}))} placeholder="Write a compelling description..." />
      </div>

      <div className="form-group">
        <label>Genres</label>
        <div className="genre-picker">
          {GENRES.map(g => (
            <button type="button" key={g} className={`genre-pick-btn ${form.genres.includes(g) ? 'selected' : ''}`} onClick={() => toggleGenre(g)}>{g}</button>
          ))}
        </div>
      </div>

      <div className="form-group">
        <label>Tags <span style={{color:'var(--text-muted)', fontWeight:400}}>(comma separated)</span></label>
        <input value={form.tags} onChange={e => setForm(f => ({...f, tags: e.target.value}))} placeholder="e.g. Cultivation, Strong MC, Revenge" />
      </div>

      <div className="form-group">
        <label>Cover Image (Cloudinary)</label>
        <div className="cloudinary-upload-area" onClick={() => document.getElementById('cover-input').click()}>
          {coverPreview
            ? <img src={coverPreview} alt="Cover preview" style={{height:'120px', borderRadius:'8px', objectFit:'cover'}} />
            : <>
                <div className="cloudinary-icon">
                  <svg width="32" height="32" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
                </div>
                <div className="cloudinary-text">
                  <strong>Click to upload cover</strong>
                  <span>JPG, PNG, WebP — stored on Cloudinary</span>
                </div>
              </>
          }
        </div>
        <input id="cover-input" type="file" accept="image/*" style={{display:'none'}} onChange={handleCover} />
      </div>

      <div className="form-actions">
        <button type="button" className="btn-secondary" onClick={onCancel}>Cancel</button>
        <button type="submit" className="btn-primary" disabled={loading}>
          {loading ? 'Saving...' : (initial ? 'Save Changes' : 'Publish Novel')}
        </button>
      </div>
    </form>
  );
}

// ── Chapter Form (create / edit) ──────────────────────────────────────────────
function ChapterForm({ novelId, initial, onSave, onCancel, loading }) {
  const [form, setForm] = useState({
    number: initial?.number || '',
    title: initial?.title || '',
    content: initial?.content || '',
  });

  function handleSubmit(e) {
    e.preventDefault();
    onSave({ number: Number(form.number), title: form.title, content: form.content });
  }

  const wordCount = form.content.trim().split(/\s+/).filter(Boolean).length;

  return (
    <form className="upload-form" onSubmit={handleSubmit}>
      <div className="form-row">
        <div className="form-group">
          <label>Chapter Number *</label>
          <input required type="number" min="1" value={form.number} onChange={e => setForm(f => ({...f, number: e.target.value}))} placeholder="e.g. 1" disabled={!!initial} />
        </div>
        <div className="form-group" style={{flex:1}}>
          <label>Chapter Title *</label>
          <input required value={form.title} onChange={e => setForm(f => ({...f, title: e.target.value}))} placeholder="e.g. Into the Void" />
        </div>
      </div>
      <div className="form-group">
        <label>Content *</label>
        <textarea required rows={20} value={form.content} onChange={e => setForm(f => ({...f, content: e.target.value}))} placeholder="Write your chapter content here..." />
        <div className="form-hint">{wordCount.toLocaleString()} words</div>
      </div>
      <div className="form-actions">
        <button type="button" className="btn-secondary" onClick={onCancel}>Cancel</button>
        <button type="submit" className="btn-primary" disabled={loading}>
          {loading ? 'Saving...' : (initial ? 'Save Chapter' : 'Publish Chapter')}
        </button>
      </div>
    </form>
  );
}

// ── Chapter Manager ───────────────────────────────────────────────────────────
function ChapterManager({ novel, onBack }) {
  const [chapters, setChapters] = useState([]);
  const [view, setView] = useState('list'); // list | new | edit
  const [editTarget, setEditTarget] = useState(null);
  const [loading, setLoading] = useState(false);
  const [confirm, setConfirm] = useState(null);
  const [msg, setMsg] = useState('');

  useEffect(() => { loadChapters(); }, [novel._id]);

  async function loadChapters() {
    try { setChapters(await getChapters(novel._id)); } catch {}
  }

  async function handleCreate(data) {
    setLoading(true);
    try {
      await createChapter(novel._id, data);
      setMsg('Chapter published!');
      setView('list');
      loadChapters();
    } catch (e) { setMsg('Error: ' + e.message); }
    setLoading(false);
  }

  async function handleEdit(data) {
    setLoading(true);
    try {
      await updateChapter(novel._id, editTarget.number, data);
      setMsg('Chapter updated!');
      setView('list');
      setEditTarget(null);
      loadChapters();
    } catch (e) { setMsg('Error: ' + e.message); }
    setLoading(false);
  }

  async function handleDelete(num) {
    try {
      await deleteChapter(novel._id, num);
      setMsg('Chapter deleted.');
      setConfirm(null);
      loadChapters();
    } catch (e) { setMsg('Error: ' + e.message); }
  }

  return (
    <div>
      <div style={{display:'flex', alignItems:'center', gap:'12px', marginBottom:'24px', flexWrap:'wrap'}}>
        <button className="btn-secondary" onClick={onBack}>
          <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
          Back to Novels
        </button>
        <div style={{fontFamily:'var(--font-display)', fontSize:'1rem', fontWeight:600}}>{novel.title}</div>
        <div style={{marginLeft:'auto'}}>
          {view === 'list' && (
            <button className="btn-primary" onClick={() => setView('new')}>+ New Chapter</button>
          )}
        </div>
      </div>

      {msg && <div className={`upload-success ${msg.startsWith('Error') ? 'upload-error' : ''}`}>{msg}</div>}

      {view === 'list' && (
        <div className="novels-table">
          <div className="novels-table-header" style={{gridTemplateColumns:'80px 1fr 120px 100px 120px'}}>
            <span>No.</span><span>Title</span><span>Date</span><span>Words</span><span>Actions</span>
          </div>
          {chapters.length === 0 && (
            <div style={{padding:'40px', textAlign:'center', color:'var(--text-muted)', fontFamily:'var(--font-mono)', fontSize:'0.82rem'}}>
              No chapters yet. Upload your first chapter!
            </div>
          )}
          {chapters.map(ch => (
            <div key={ch._id} className="novels-table-row" style={{gridTemplateColumns:'80px 1fr 120px 100px 120px'}}>
              <span className="table-mono" style={{color:'var(--accent-orange)'}}>Ch. {ch.number}</span>
              <span className="novel-table-title">{ch.title}</span>
              <span className="table-mono">{new Date(ch.createdAt).toLocaleDateString()}</span>
              <span className="table-mono">{(ch.wordCount||0).toLocaleString()}w</span>
              <span style={{display:'flex', gap:'6px'}}>
                <button className="table-action-btn" onClick={() => { setEditTarget(ch); setView('edit'); }}>Edit</button>
                <button className="table-action-btn danger" onClick={() => setConfirm(ch.number)}>Del</button>
              </span>
            </div>
          ))}
        </div>
      )}

      {view === 'new' && (
        <>
          <div className="dashboard-section-title">New Chapter</div>
          <ChapterForm novelId={novel._id} onSave={handleCreate} onCancel={() => setView('list')} loading={loading} />
        </>
      )}

      {view === 'edit' && editTarget && (
        <>
          <div className="dashboard-section-title">Edit Chapter {editTarget.number}</div>
          <ChapterForm novelId={novel._id} initial={editTarget} onSave={handleEdit} onCancel={() => { setView('list'); setEditTarget(null); }} loading={loading} />
        </>
      )}

      {confirm !== null && (
        <ConfirmDialog
          message={'Delete Chapter ' + confirm + '? This cannot be undone.'}
          onConfirm={() => handleDelete(confirm)}
          onCancel={() => setConfirm(null)}
        />
      )}
    </div>
  );
}

// ── Main Dashboard ────────────────────────────────────────────────────────────
const TABS = ['Overview', 'My Novels', 'Upload Novel', 'Analytics'];

export default function Dashboard() {
  const { user, token } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('Overview');
  const [novels, setNovels] = useState([]);
  const [novelView, setNovelView] = useState('list'); // list | edit | chapters
  const [editTarget, setEditTarget] = useState(null);
  const [chapterTarget, setChapterTarget] = useState(null);
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState('');
  const [confirm, setConfirm] = useState(null);

  useEffect(() => {
    if (user) loadMyNovels();
  }, [user]);

  async function loadMyNovels() {
    if (!user) return;
    try { const data = await getNovels({ authorId: user.id || user._id, limit: 50 }); setNovels(data.novels || []); } catch {}
  }

  if (!token) {
    return (
      <div style={{padding:'80px 0', textAlign:'center', minHeight:'100vh'}}>
        <div style={{fontSize:'3rem', marginBottom:'20px'}}>🔒</div>
        <div style={{fontFamily:'var(--font-display)', fontSize:'1.3rem', marginBottom:'12px'}}>Sign in to access your dashboard</div>
        <div style={{color:'var(--text-muted)', fontSize:'0.88rem'}}>Click the Sign In button in the navbar to continue with Google.</div>
      </div>
    );
  }

  // If managing chapters, show chapter manager full page
  if (chapterTarget) {
    return (
      <div className="dashboard-page">
        <div className="container">
          <ChapterManager novel={chapterTarget} onBack={() => { setChapterTarget(null); loadMyNovels(); }} />
        </div>
      </div>
    );
  }

  async function handleCreateNovel(fd) {
    setLoading(true);
    try {
      await createNovel(fd);
      setMsg('Novel published!');
      setActiveTab('My Novels');
      loadMyNovels();
    } catch (e) { setMsg('Error: ' + e.message); }
    setLoading(false);
  }

  async function handleEditNovel(fd) {
    setLoading(true);
    try {
      await updateNovel(editTarget._id, fd);
      setMsg('Novel updated!');
      setNovelView('list');
      setEditTarget(null);
      loadMyNovels();
    } catch (e) { setMsg('Error: ' + e.message); }
    setLoading(false);
  }

  async function handleDeleteNovel(id) {
    try {
      await deleteNovel(id);
      setMsg('Novel deleted.');
      setConfirm(null);
      loadMyNovels();
    } catch (e) { setMsg('Error: ' + e.message); }
  }

  const totalChapters = novels.reduce((a, n) => a + (n.chapterCount || 0), 0);
  const totalViews = novels.reduce((a, n) => a + (n.views || 0), 0);
  const avgRating = novels.length ? (novels.reduce((a, n) => a + n.rating, 0) / novels.length).toFixed(1) : '0.0';

  return (
    <div className="dashboard-page">
      <div className="container">
        <div className="dashboard-header">
          <div>
            <h1 className="dashboard-title">idenwebstudio Dashboard</h1>
            <p className="dashboard-subtitle">Welcome back, <strong style={{color:'var(--accent-orange)'}}>{user.name}</strong></p>
          </div>
          <a href="https://ko-fi.com/idenwebstudio" target="_blank" rel="noopener noreferrer" className="kofi-btn">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M23.881 8.948c-.773-4.085-4.859-4.593-4.859-4.593H.723c-.604 0-.623.782-.623.782s-.01 7.537-.01 11.306c0 3.704 2.498 4.557 4.722 4.557h9.975c3.5 0 6.12-2.13 6.12-5.553 0-1.768-.917-3.22-2.108-4.142z"/></svg>
            Support on Ko-fi
          </a>
        </div>

        <div className="dashboard-tabs">
          {TABS.map(t => (
            <button key={t} className={'dashboard-tab' + (activeTab === t ? ' active' : '')} onClick={() => { setActiveTab(t); setNovelView('list'); setMsg(''); }}>{t}</button>
          ))}
        </div>

        {msg && (
          <div className={'upload-success' + (msg.startsWith('Error') ? ' upload-error' : '')} style={{marginBottom:'20px'}}>
            {msg.startsWith('Error') ? '❌ ' : '✅ '}{msg}
          </div>
        )}

        {/* Overview */}
        {activeTab === 'Overview' && (
          <div className="dashboard-content">
            <div className="stats-grid">
              {[
                { label:'My Novels', value: novels.length, icon:'📚', color:'var(--accent-purple)' },
                { label:'Total Chapters', value: totalChapters.toLocaleString(), icon:'📄', color:'var(--accent-orange)' },
                { label:'Total Views', value: totalViews >= 1000 ? (totalViews/1000).toFixed(1)+'K' : totalViews, icon:'👁', color:'var(--accent-blue)' },
                { label:'Avg Rating', value: avgRating, icon:'⭐', color:'var(--accent-gold)' },
              ].map(s => (
                <div key={s.label} className="stat-card">
                  <div className="stat-icon" style={{color:s.color}}>{s.icon}</div>
                  <div className="stat-value">{s.value}</div>
                  <div className="stat-label">{s.label}</div>
                </div>
              ))}
            </div>
            <div className="dashboard-section-title">Your Novels</div>
            {novels.length === 0
              ? <div style={{textAlign:'center', padding:'40px', color:'var(--text-muted)', fontFamily:'var(--font-mono)', fontSize:'0.85rem'}}>
                  No novels yet. <button style={{background:'none',border:'none',color:'var(--accent-orange)',cursor:'pointer',fontFamily:'inherit', fontSize:'inherit'}} onClick={() => setActiveTab('Upload Novel')}>Upload your first one!</button>
                </div>
              : novels.slice(0,3).map(n => (
                <div key={n._id} className="update-item" style={{cursor:'default'}}>
                  <img src={n.cover || 'https://via.placeholder.com/46x62/1a1a2e/8b5cf6?text=N'} className="update-cover" alt={n.title} onError={e => {e.target.src='https://via.placeholder.com/46x62/1a1a2e/8b5cf6?text=N';}} />
                  <div className="update-info">
                    <div className="update-title">{n.title}</div>
                    <div style={{color:'var(--text-muted)', fontFamily:'var(--font-mono)', fontSize:'0.72rem'}}>{n.chapterCount} chapters · {n.views} views</div>
                  </div>
                  <span className={'badge badge-' + n.status}>{n.status}</span>
                </div>
              ))
            }
          </div>
        )}

        {/* My Novels */}
        {activeTab === 'My Novels' && (
          <div className="dashboard-content">
            {novelView === 'list' && (
              <>
                <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'24px'}}>
                  <div className="dashboard-section-title" style={{marginBottom:0}}>Your Novels ({novels.length})</div>
                  <button className="btn-primary" onClick={() => setActiveTab('Upload Novel')}>+ New Novel</button>
                </div>
                <div className="novels-table">
                  <div className="novels-table-header" style={{gridTemplateColumns:'80px 1fr 90px 90px 100px 160px'}}>
                    <span>Cover</span><span>Title</span><span>Chapters</span><span>Views</span><span>Status</span><span>Actions</span>
                  </div>
                  {novels.length === 0 && (
                    <div style={{padding:'40px', textAlign:'center', color:'var(--text-muted)', fontFamily:'var(--font-mono)', fontSize:'0.82rem'}}>
                      No novels yet.
                    </div>
                  )}
                  {novels.map(n => (
                    <div key={n._id} className="novels-table-row" style={{gridTemplateColumns:'80px 1fr 90px 90px 100px 160px'}}>
                      <span>
                        <img src={n.cover||'https://via.placeholder.com/40x56/1a1a2e/8b5cf6?text=N'} alt="" style={{width:'40px',height:'56px',objectFit:'cover',borderRadius:'4px'}} onError={e=>{e.target.src='https://via.placeholder.com/40x56/1a1a2e/8b5cf6?text=N';}} />
                      </span>
                      <span className="novel-table-title">{n.title}</span>
                      <span className="table-mono">{n.chapterCount}</span>
                      <span className="table-mono">{n.views}</span>
                      <span><span className={'badge badge-'+n.status}>{n.status}</span></span>
                      <span style={{display:'flex', gap:'5px', flexWrap:'wrap'}}>
                        <button className="table-action-btn" onClick={() => { setChapterTarget(n); }}>Chapters</button>
                        <button className="table-action-btn" onClick={() => { setEditTarget(n); setNovelView('edit'); }}>Edit</button>
                        <button className="table-action-btn danger" onClick={() => setConfirm(n._id)}>Del</button>
                      </span>
                    </div>
                  ))}
                </div>
              </>
            )}
            {novelView === 'edit' && editTarget && (
              <>
                <div className="dashboard-section-title">Edit Novel</div>
                <NovelForm initial={editTarget} onSave={handleEditNovel} onCancel={() => { setNovelView('list'); setEditTarget(null); }} loading={loading} />
              </>
            )}
          </div>
        )}

        {/* Upload Novel */}
        {activeTab === 'Upload Novel' && (
          <div className="dashboard-content">
            <div className="dashboard-section-title">Publish New Novel</div>
            <div className="upload-info-banner">
              <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
              Cover images are stored via Cloudinary. Make sure your backend .env is configured.
            </div>
            <NovelForm onSave={handleCreateNovel} onCancel={() => setActiveTab('My Novels')} loading={loading} />
          </div>
        )}

        {/* Analytics */}
        {activeTab === 'Analytics' && (
          <div className="dashboard-content">
            <div className="dashboard-section-title">Analytics</div>
            <div className="analytics-placeholder">
              <div style={{fontSize:'3rem', marginBottom:'16px'}}>📊</div>
              <div style={{fontFamily:'var(--font-display)', fontSize:'1.1rem', marginBottom:'8px'}}>Coming Soon</div>
              <div style={{color:'var(--text-muted)', fontSize:'0.85rem', maxWidth:'360px', textAlign:'center', lineHeight:'1.6'}}>
                Connect your MongoDB database to view real-time chapter views, reader retention, and growth metrics.
              </div>
            </div>
          </div>
        )}

        {confirm && (
          <ConfirmDialog
            message="Delete this novel and ALL its chapters? This cannot be undone."
            onConfirm={() => handleDeleteNovel(confirm)}
            onCancel={() => setConfirm(null)}
          />
        )}
      </div>
    </div>
  );
}
