import { useState, useEffect, useRef, useCallback } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { getNovel, getNovelBySlug, getChapter, getChapters, getNovels } from '../services/api';
import '../index.css';
import './ReadPage.css';
import AdBanner from '../components/AdBanner';
import CommentSection from '../components/CommentSection';
import SEO from '../components/SEO';

const FONT_SIZES = [13, 15, 16, 17, 18, 19, 20, 22, 24, 26];



export default function ReadPage() {
  const { id, slug, chapterNum, chapterSlug } = useParams();
  const navigate = useNavigate();
  // chapterSlug is "chapter-1", chapterNum is "1" from old ID route
  const rawNum = chapterSlug || chapterNum || '1';
  const num = parseInt(String(rawNum).replace(/[^0-9]/g, '')) || 1;

  const [novel,    setNovel]    = useState(null);
  const [chapter,  setChapter]  = useState(null);
  const [chapters, setChapters] = useState([]);
  const [loading,  setLoading]  = useState(true);
  const [error,    setError]    = useState('');
  const [similar,  setSimilar]  = useState([]);

  const [fontSize, setFontSize] = useState(() => {
    const saved = localStorage.getItem('ns_fontsize');
    return saved ? Number(saved) : 18;
  });
  const [readMode, setReadMode] = useState(() => localStorage.getItem('ns_readmode') || 'dark');
  const [progress, setProgress] = useState(0);
  const [showToc, setShowToc]   = useState(false);
  const contentRef  = useRef(null);
  const touchStartX = useRef(null);
  const touchStartY = useRef(null);

  useEffect(() => {
    async function load() {
      setLoading(true);
      setError('');
      setChapter(null);
      setNovel(null);
      try {
        console.log('Loading - slug:', slug, 'id:', id, 'num:', num);
        const n = slug ? await getNovelBySlug(slug) : await getNovel(id);
        console.log('Novel loaded:', n?.title, n?._id);
        setNovel(n);
        const [chs, ch] = await Promise.all([
          getChapters(n._id),
          getChapter(n._id, num)
        ]);
        console.log('Chapter loaded:', ch?.title, 'chapters count:', chs?.length);
        setChapters(chs);
        setChapter(ch);
        // title handled by SEO component

        // Save to reading history for Continue Reading on home page
        try {
          const READING_KEY = 'ns_reading_history';
          const history = JSON.parse(localStorage.getItem(READING_KEY) || '[]');
          const entry = {
            novelId:      n._id,
            novelSlug:    n.slug || null,
            title:        n.title,
            cover:        n.cover || '',
            chapterNum:   num,
            totalChapters: chs.length,
            readAt:       Date.now(),
          };
          const filtered = history.filter(h => h.novelId !== n._id);
          localStorage.setItem(READING_KEY, JSON.stringify([entry, ...filtered].slice(0, 10)));
        } catch {}

        // Fetch similar novels by matching genres, exclude current novel
        if (n.genres && n.genres.length > 0) {
          try {
            const res = await getNovels({ genre: n.genres[0], limit: 10 });
            const others = (res.novels || []).filter(x => x._id !== n._id);
            setSimilar(others.sort(() => Math.random() - 0.5).slice(0, 4));
          } catch {}
        }
      } catch (err) {
        console.error('ReadPage load error:', err.message, err);
        setError(err.message || 'Chapter not found.');
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [id, slug, num]);

  useEffect(() => { window.scrollTo(0, 0); }, [id, slug, num]);

  useEffect(() => {
    const handle = () => {
      const el = contentRef.current;
      if (!el) return;
      const scrolled = Math.max(0, window.scrollY - el.offsetTop);
      setProgress(Math.min(100, Math.round((scrolled / el.offsetHeight) * 100)));
    };
    window.addEventListener('scroll', handle);
    return () => window.removeEventListener('scroll', handle);
  }, [chapter]);

  function changeFontSize(delta) {
    const idx = FONT_SIZES.indexOf(fontSize);
    const next = FONT_SIZES[Math.max(0, Math.min(FONT_SIZES.length - 1, idx + delta))];
    setFontSize(next);
    localStorage.setItem('ns_fontsize', next);
  }

  function changeMode(m) {
    setReadMode(m);
    localStorage.setItem('ns_readmode', m);
  }

  const sortedChapters = [...chapters].sort((a,b) => a.number - b.number);
  const currentIdx = sortedChapters.findIndex(c => c.number === num);
  const prevChapter = currentIdx > 0 ? sortedChapters[currentIdx - 1] : null;
  const nextChapter = currentIdx < sortedChapters.length - 1 ? sortedChapters[currentIdx + 1] : null;

  // Swipe left/right to navigate chapters
  function onTouchStart(e) {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  }
  function onTouchEnd(e) {
    if (touchStartX.current === null) return;
    const dx = touchStartX.current - e.changedTouches[0].clientX;
    const dy = Math.abs(touchStartY.current - e.changedTouches[0].clientY);
    // Only trigger if horizontal swipe > 60px and not mostly vertical (scrolling)
    if (Math.abs(dx) > 60 && Math.abs(dx) > dy * 1.5) {
      if (dx > 0 && nextChapter) {
        window.location.href = chapterHref(nextChapter);
      } else if (dx < 0 && prevChapter) {
        window.location.href = chapterHref(prevChapter);
      }
    }
    touchStartX.current = null;
    touchStartY.current = null;
  }

  function chapterHref(ch) {
    if (!ch) return '/';
    if (novel?.slug) return `/read/s/${novel.slug}/chapter-${ch.number}`;
    return `/read/${novel?._id || id}/${ch.number}`;
  }

  // Format content — preserve paragraph breaks
  function formatContent(content) {
    if (!content) return '';
    return content
      .split(/\n\n+/)
      .map(p => p.trim())
      .filter(Boolean)
      .map(p => `<p>${p.replace(/\n/g, '<br/>')}</p>`)
      .join('');
  }

  return (
    <div className={`read-page read-mode-${readMode}`} onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
      {novel && chapter && (
        <SEO
          title={`${novel.title} Chapter ${chapter.number}: ${chapter.title}`}
          description={`Read ${novel.title} Chapter ${chapter.number} - ${chapter.title} on idenwebstudio. ${novel.author ? `By ${novel.author}.` : ''} Free to read online.`}
          image={novel.cover || undefined}
          url={novel.slug ? `/read/s/${novel.slug}/chapter-${chapter.number}` : `/read/${novel._id}/${chapter.number}`}
          type="article"
        />
      )}
      <div className="read-progress-bar">
        <div className="read-progress-fill" style={{ width: `${progress}%` }} />
      </div>

      <div className="read-toolbar">
        <Link to={novel?.slug ? `/novel/s/${novel.slug}` : `/novel/${id || novel?._id}`} className="read-back-btn">
          <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
          <span>{novel?.title || 'Back'}</span>
        </Link>

        <div className="read-chapter-info">
          {chapter ? `Chapter ${chapter.number}` : loading ? '...' : 'Chapter'}
        </div>

        <div className="read-toolbar-actions">
          <div className="mode-toggle">
            <button className={readMode === 'dark'  ? 'active' : ''} onClick={() => changeMode('dark')}  title="Dark">🌙</button>
            <button className={readMode === 'sepia' ? 'active' : ''} onClick={() => changeMode('sepia')} title="Sepia">📜</button>
            <button className={readMode === 'light' ? 'active' : ''} onClick={() => changeMode('light')} title="Light">☀️</button>
          </div>
          <div className="font-size-controls">
            <button onClick={() => changeFontSize(-1)}>A-</button>
            <span>{fontSize}px</span>
            <button onClick={() => changeFontSize(1)}>A+</button>
          </div>
          <button className="toc-btn" onClick={() => setShowToc(!showToc)} title="Table of Contents">
            <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
          </button>
          <span className="read-progress-text">{progress}%</span>
        </div>
      </div>

      {/* TOC Drawer */}
      {showToc && (
        <div className="toc-drawer">
          <div className="toc-header">
            <span>Table of Contents</span>
            <button onClick={() => setShowToc(false)}>✕</button>
          </div>
          <div className="toc-list">
            {sortedChapters.map(ch => (
              <Link key={ch._id} to={novel?.slug ? `/read/s/${novel.slug}/chapter-${ch.number}` : `/read/${novel?._id}/${ch.number}`}
                className={`toc-item ${ch.number === num ? 'active' : ''}`}
                onClick={() => setShowToc(false)}>
                <span className="toc-num">Ch. {ch.number}</span>
                <span className="toc-title">{ch.title}</span>
              </Link>
            ))}
          </div>
        </div>
      )}

      <div className="reading-container" ref={contentRef}>
        {loading && (
          <div className="read-loading">
            <div className="read-spinner" />
            <div>Loading chapter...</div>
          </div>
        )}

        {error && (
          <div className="read-error">
            <div style={{fontSize:'2.5rem', marginBottom:'16px'}}>📭</div>
            <div style={{marginBottom:'8px', fontWeight:600}}>Could not load chapter</div>
            <div style={{fontSize:'0.75rem', opacity:0.7, marginBottom:'16px'}}>{error}</div>
            <Link
              to={novel?.slug ? `/novel/s/${novel.slug}` : slug ? `/novel/s/${slug}` : `/novel/${id}`}
              className="btn-secondary"
              style={{marginTop:'8px', display:'inline-flex'}}
            >Back to Novel</Link>
          </div>
        )}

        {!loading && !error && chapter && (
          <>
            <div className="reading-chapter-header">
              <div className="reading-novel-title">{novel?.title}</div>
              <h2 className="reading-chapter-title">Chapter {chapter.number}: {chapter.title}</h2>
              <div className="reading-meta">
                <span>{new Date(chapter.createdAt).toLocaleDateString()}</span>
                <span>·</span>
                <span>{(chapter.wordCount || 0).toLocaleString()} words</span>
                <span>·</span>
                <span>{(chapter.views || 0).toLocaleString()} views</span>
              </div>
            </div>

            <AdBanner slot="8630276662" style={{margin:'24px 0'}} />

            <div
              className="reading-content"
              style={{ fontSize: `${fontSize}px` }}
              dangerouslySetInnerHTML={{ __html: formatContent(chapter.content) }}
            />

            <AdBanner slot="4207450966" style={{margin:'32px 0'}} />

            <div className="kofi-reading-cta">
              <div className="kofi-cta-text">
                <strong>Enjoying this chapter?</strong>
                <span>Support the platform on Ko-fi</span>
              </div>
              <a href="https://ko-fi.com/idenwebstudio" target="_blank" rel="noopener noreferrer" className="kofi-cta-btn">
                Buy a Coffee
              </a>
            </div>

            <div className="reading-nav">
              {prevChapter ? (
                <Link to={novel?.slug ? `/read/s/${novel.slug}/chapter-${prevChapter.number}` : `/read/${novel?._id}/${prevChapter.number}`} className="read-nav-btn prev">
                  <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
                  <span>Ch. {prevChapter.number}</span>
                </Link>
              ) : <div />}

              <Link to={novel?.slug ? `/novel/s/${novel.slug}` : `/novel/${id || novel?._id}`} className="read-nav-toc">
                <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
                Contents
              </Link>

              {nextChapter ? (
                <Link to={novel?.slug ? `/read/s/${novel.slug}/chapter-${nextChapter.number}` : `/read/${novel?._id}/${nextChapter.number}`} className="read-nav-btn next">
                  <span>Ch. {nextChapter.number}</span>
                  <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                </Link>
              ) : (
                <div className="read-nav-btn next" style={{opacity:0.4, pointerEvents:'none'}}>
                  <span>Last Chapter</span>
                </div>
              )}
            </div>

            {/* Comments */}
            {novel && (
              <div className="read-comments">
                <CommentSection novelId={novel._id} chapterNum={num}/>
              </div>
            )}

            {/* You May Also Like */}
            {similar.length > 0 && (
              <div className="similar-novels">
                <div className="similar-novels-header">
                  <span className="similar-novels-label">You May Also Like</span>
                </div>
                <div className="similar-novels-grid">
                  {similar.map(s => (
                    <a
                      key={s._id}
                      href={s.slug ? `/novel/s/${s.slug}` : `/novel/${s._id}`}
                      className="similar-novel-card"
                    >
                      <div className="similar-novel-cover">
                        <img
                          src={s.cover || 'https://images.unsplash.com/photo-1578632767115-351597cf2477?w=400&h=600&fit=crop'}
                          alt={s.title}
                          loading="lazy"
                          onError={e => { e.target.src = 'https://images.unsplash.com/photo-1578632767115-351597cf2477?w=400&h=600&fit=crop'; }}
                        />
                      </div>
                      <div className="similar-novel-info">
                        <div className="similar-novel-title">{s.title}</div>
                        <div className="similar-novel-tags">
                          {(s.genres || []).slice(0, 2).map(g => (
                            <span key={g} className="similar-novel-tag">{g}</span>
                          ))}
                        </div>
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
