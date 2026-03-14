import { useParams, Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { getNovel, getChapters, rateNovel } from '../services/api';
import CommentSection from '../components/CommentSection';
import { useAuth } from '../context/AuthContext';
import './NovelPage.css';

const PLACEHOLDER = 'https://images.unsplash.com/photo-1578632767115-351597cf2477?w=400&h=600&fit=crop';

function StarPicker({ value, onChange }) {
  const [hover, setHover] = useState(0);
  return (
    <div className="star-picker">
      {[1,2,3,4,5].map(i => (
        <button key={i} type="button"
          className={'star-pick' + (i <= (hover || value) ? ' lit' : '')}
          onMouseEnter={() => setHover(i)}
          onMouseLeave={() => setHover(0)}
          onClick={() => onChange(i)}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
          </svg>
        </button>
      ))}
    </div>
  );
}

export default function NovelPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [novel, setNovel]       = useState(null);
  const [chapters, setChapters] = useState([]);
  const [loading, setLoading]   = useState(true);
  const [activeTab, setActiveTab] = useState('chapters');
  const [bookmarked, setBookmarked] = useState(false);
  const [userRating, setUserRating] = useState(0);
  const [ratingMsg, setRatingMsg]   = useState('');
  const [chapterSearch, setChapterSearch] = useState('');

  useEffect(() => {
    async function load() {
      setLoading(true);
      try {
        const [n, chs] = await Promise.all([getNovel(id), getChapters(id)]);
        setNovel(n);
        setChapters(chs);
        // Update page title and meta for SEO
        document.title = n.title + ' - idenwebstudio';
        const desc = document.querySelector('meta[name="description"]');
        if (desc) desc.setAttribute('content', n.description?.slice(0, 160) || n.title);
      } catch {
        navigate('/');
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [id]);

  async function handleRate(rating) {
    if (!user) { setRatingMsg('Sign in to rate'); setTimeout(() => setRatingMsg(''), 2000); return; }
    setUserRating(rating);
    try {
      const res = await rateNovel(id, rating);
      setNovel(n => ({ ...n, rating: res.rating, ratingCount: res.ratingCount }));
      setRatingMsg('Thanks for rating!');
      setTimeout(() => setRatingMsg(''), 2000);
    } catch { setRatingMsg('Could not submit rating'); }
  }

  const filteredChapters = chapters.filter(ch =>
    !chapterSearch || ch.title.toLowerCase().includes(chapterSearch.toLowerCase()) ||
    String(ch.number).includes(chapterSearch)
  );

  if (loading) {
    return (
      <div className="novel-page">
        <div className="novel-banner"><div className="novel-banner-bg" style={{background:'var(--bg-secondary)'}} /><div className="novel-banner-overlay" /></div>
        <div className="container novel-layout" style={{marginTop:'-120px', position:'relative', zIndex:2}}>
          <div style={{display:'flex', flexDirection:'column', gap:'12px', paddingTop:'120px'}}>
            <div className="skeleton-cover" style={{width:'240px', aspectRatio:'3/4', borderRadius:'12px'}} />
          </div>
          <div style={{paddingTop:'80px'}}>
            <div className="skeleton-line" style={{width:'60%', height:'2rem', marginBottom:'16px'}} />
            <div className="skeleton-line" style={{width:'40%', marginBottom:'12px'}} />
            <div className="skeleton-line" style={{width:'80%'}} />
          </div>
        </div>
      </div>
    );
  }

  if (!novel) return null;

  const firstChapter = chapters.length > 0 ? chapters[0] : null;

  return (
    <div className="novel-page">
      <div className="novel-banner">
        <img src={novel.cover || PLACEHOLDER} alt="" className="novel-banner-bg"
          onError={e => { e.target.src = PLACEHOLDER; }} />
        <div className="novel-banner-overlay" />
      </div>

      <div className="container novel-layout">
        <aside className="novel-sidebar">
          <div className="novel-cover-wrap">
            <img src={novel.cover || PLACEHOLDER} alt={novel.title} className="novel-main-cover"
              onError={e => { e.target.src = PLACEHOLDER; }} />
            <div className="novel-cover-glow" />
          </div>
          <div className="novel-sidebar-actions">
            {firstChapter ? (
              <Link to={`/read/${novel._id}/${firstChapter.number}`} className="btn-primary" style={{width:'100%', justifyContent:'center'}}>
                <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                Start Reading
              </Link>
            ) : (
              <button className="btn-primary" style={{width:'100%', justifyContent:'center', opacity:0.5}} disabled>
                No Chapters Yet
              </button>
            )}
            <button className={`btn-secondary bookmark-btn ${bookmarked ? 'bookmarked' : ''}`} onClick={() => setBookmarked(!bookmarked)}>
              <svg width="16" height="16" fill={bookmarked ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/>
              </svg>
              {bookmarked ? 'Bookmarked' : 'Bookmark'}
            </button>
          </div>

          {/* Rate this novel */}
          <div className="rate-box">
            <div className="rate-box-label">Rate This Novel</div>
            <StarPicker value={userRating} onChange={handleRate} />
            {ratingMsg && <div className="rate-msg">{ratingMsg}</div>}
          </div>
        </aside>

        <main className="novel-main">
          <div className="novel-header">
            <div className="novel-genres">
              {(novel.genres || []).map(g => (
                <Link key={g} to={`/browse?genre=${g}`} className="hero-genre-tag">{g}</Link>
              ))}
              <span className={`badge badge-${novel.status}`}>{novel.status}</span>
            </div>
            <h1 className="novel-title">{novel.title}</h1>
            <div className="novel-author-line">by <span className="novel-author-name">{novel.author}</span></div>

            <div className="novel-stats-row">
              <div className="novel-stat">
                <div className="novel-stat-value" style={{display:'flex', alignItems:'center', gap:'4px'}}>
                  {[1,2,3,4,5].map(i => (
                    <svg key={i} width="13" height="13" viewBox="0 0 24 24" fill={i <= Math.floor(novel.rating) ? 'var(--accent-gold)' : 'var(--text-muted)'}>
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                    </svg>
                  ))}
                  <span style={{marginLeft:'4px', color:'var(--accent-gold)', fontFamily:'var(--font-mono)', fontSize:'0.85rem'}}>{novel.rating}</span>
                </div>
                <div className="novel-stat-label">Rating ({novel.ratingCount || 0})</div>
              </div>
              <div className="novel-stat-divider" />
              <div className="novel-stat">
                <div className="novel-stat-value">{novel.views?.toLocaleString()}</div>
                <div className="novel-stat-label">Views</div>
              </div>
              <div className="novel-stat-divider" />
              <div className="novel-stat">
                <div className="novel-stat-value">{novel.chapterCount || chapters.length}</div>
                <div className="novel-stat-label">Chapters</div>
              </div>
            </div>

            {(novel.tags || []).length > 0 && (
              <div className="novel-tags">
                {novel.tags.map(t => <span key={t} className="genre-tag">{t}</span>)}
              </div>
            )}
          </div>

          <div className="novel-tabs">
            <button className={`novel-tab ${activeTab === 'about' ? 'active' : ''}`} onClick={() => setActiveTab('about')}>About</button>
            <button className={`novel-tab ${activeTab === 'chapters' ? 'active' : ''}`} onClick={() => setActiveTab('chapters')}>Chapters ({chapters.length})</button>
          </div>

          {activeTab === 'about' && (
            <div className="novel-description">
              <p>{novel.description || 'No description provided.'}</p>
            </div>
          )}

          {activeTab === 'chapters' && (
            <div className="chapter-list">
              {chapters.length > 10 && (
                <div className="chapter-search-bar">
                  <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
                  <input
                    type="text" placeholder="Search chapters..."
                    value={chapterSearch} onChange={e => setChapterSearch(e.target.value)}
                  />
                </div>
              )}
              <div className="chapter-list-header">
                <span>Chapter</span>
                <span>Title</span>
                <span>Words</span>
                <span>Date</span>
              </div>
              {filteredChapters.length === 0 && (
                <div style={{padding:'32px', textAlign:'center', color:'var(--text-muted)', fontFamily:'var(--font-mono)', fontSize:'0.82rem'}}>
                  {chapters.length === 0 ? 'No chapters uploaded yet.' : 'No chapters match your search.'}
                </div>
              )}
              {filteredChapters.map(ch => (
                <Link key={ch._id} to={`/read/${novel._id}/${ch.number}`} className="chapter-item">
                  <span className="chapter-num">Ch. {ch.number}</span>
                  <span className="chapter-title-text">{ch.title}</span>
                  <span className="chapter-date">{(ch.wordCount || 0).toLocaleString()}w</span>
                  <span className="chapter-views">{new Date(ch.createdAt).toLocaleDateString()}</span>
                </Link>
              ))}
            </div>
          )}
        </main>
      </div>

      {/* Comments */}
      <div className="container" style={{paddingBottom:'80px'}}>
        <CommentSection novelId={id} />
      </div>
    </div>
  );
}
