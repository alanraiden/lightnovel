import { useState, useEffect, useRef } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { getNovel, getNovelBySlug, getChapter, getChapters } from '../services/api';
import '../index.css';
import './ReadPage.css';
import AdBanner from '../components/AdBanner';

const FONT_SIZES = [13, 15, 16, 17, 18, 19, 20, 22, 24, 26];

export default function ReadPage() {
  const { id, slug, chapterNum, chapterSlug } = useParams();
  const navigate = useNavigate();

  // Works with BOTH route patterns:
  //   /read/s/:slug/:chapterSlug       → chapterSlug = 'chapter-1'
  //   /read/s/:slug/chapter-:chapterNum → chapterNum  = '1'
  //   /read/:id/:chapterNum             → chapterNum  = '1'
  const rawNum = chapterSlug || chapterNum || '1';
  const num = parseInt(String(rawNum).replace(/[^0-9]/g, ''), 10) || 1;

  const [novel,    setNovel]    = useState(null);
  const [chapter,  setChapter]  = useState(null);
  const [chapters, setChapters] = useState([]);
  const [loading,  setLoading]  = useState(true);
  const [error,    setError]    = useState('');

  const [fontSize, setFontSize] = useState(() => {
    try { const s = localStorage.getItem('ns_fontsize'); return s ? Number(s) : 18; } catch { return 18; }
  });
  const [readMode, setReadMode] = useState(() => {
    try { return localStorage.getItem('ns_readmode') || 'dark'; } catch { return 'dark'; }
  });
  const [progress, setProgress] = useState(0);
  const [showToc,  setShowToc]  = useState(false);
  const contentRef = useRef(null);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      setLoading(true);
      setError('');
      setChapter(null);
      setNovel(null);
      try {
        // Determine how to fetch the novel
        let n;
        if (slug) {
          n = await getNovelBySlug(slug);
        } else if (id) {
          n = await getNovel(id);
        } else {
          throw new Error('No novel identifier in URL');
        }

        if (cancelled) return;
        if (!n || !n._id) throw new Error('Novel not found');

        setNovel(n);

        const [chs, ch] = await Promise.all([
          getChapters(n._id),
          getChapter(n._id, num),
        ]);

        if (cancelled) return;
        setChapters(Array.isArray(chs) ? chs : []);
        setChapter(ch);
        document.title = `${n.title} Chapter ${num} - idenwebstudio`;
      } catch (err) {
        if (!cancelled) setError(err.message || 'Could not load chapter.');
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    load();
    return () => { cancelled = true; };
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
    const idx  = FONT_SIZES.indexOf(fontSize);
    const next = FONT_SIZES[Math.max(0, Math.min(FONT_SIZES.length - 1, idx + delta))];
    setFontSize(next);
    try { localStorage.setItem('ns_fontsize', next); } catch {}
  }

  function changeMode(m) {
    setReadMode(m);
    try { localStorage.setItem('ns_readmode', m); } catch {}
  }

  const sortedChapters = [...chapters].sort((a, b) => a.number - b.number);
  const currentIdx  = sortedChapters.findIndex(c => c.number === num);
  const prevChapter = currentIdx > 0 ? sortedChapters[currentIdx - 1] : null;
  const nextChapter = currentIdx < sortedChapters.length - 1 ? sortedChapters[currentIdx + 1] : null;

  // Safe back-links — always resolve to a valid URL
  const novelHref = novel?.slug
    ? `/novel/s/${novel.slug}`
    : novel?._id
      ? `/novel/${novel._id}`
      : slug
        ? `/novel/s/${slug}`
        : id
          ? `/novel/${id}`
          : '/';

  function chapterHref(ch) {
    if (!ch) return '/';
    if (novel?.slug) return `/read/s/${novel.slug}/chapter-${ch.number}`;
    const nid = novel?._id || id;
    return `/read/${nid}/${ch.number}`;
  }

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
    <div className={`read-page read-mode-${readMode}`}>
      <div className="read-progress-bar">
        <div className="read-progress-fill" style={{ width: `${progress}%` }} />
      </div>

      <div className="read-toolbar">
        <Link to={novelHref} className="read-back-btn">
          <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path d="M19 12H5M12 19l-7-7 7-7"/>
          </svg>
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
            <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/>
            </svg>
          </button>
          <span className="read-progress-text">{progress}%</span>
        </div>
      </div>

      {showToc && (
        <div className="toc-drawer">
          <div className="toc-header">
            <span>Table of Contents</span>
            <button onClick={() => setShowToc(false)}>✕</button>
          </div>
          <div className="toc-list">
            {sortedChapters.map(ch => (
              <Link
                key={ch._id}
                to={chapterHref(ch)}
                className={`toc-item ${ch.number === num ? 'active' : ''}`}
                onClick={() => setShowToc(false)}
              >
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

        {!loading && error && (
          <div className="read-error">
            <div style={{ fontSize: '2.5rem', marginBottom: '16px' }}>📭</div>
            <div style={{ marginBottom: '8px', fontWeight: 600 }}>Could not load chapter</div>
            <div style={{ fontSize: '0.75rem', opacity: 0.7, marginBottom: '16px' }}>{error}</div>
            <Link to={novelHref} className="btn-secondary" style={{ marginTop: '8px', display: 'inline-flex' }}>
              Back to Novel
            </Link>
          </div>
        )}

        {!loading && !error && !chapter && (
          <div className="read-error">
            <div style={{ fontSize: '2.5rem', marginBottom: '16px' }}>📭</div>
            <div style={{ marginBottom: '8px', fontWeight: 600 }}>Chapter not found</div>
            <div style={{ fontSize: '0.75rem', opacity: 0.7, marginBottom: '16px' }}>
              Chapter {num} does not exist for this novel.
            </div>
            <Link to={novelHref} className="btn-secondary" style={{ marginTop: '8px', display: 'inline-flex' }}>
              Back to Novel
            </Link>
          </div>
        )}

        {!loading && !error && chapter && (
          <>
            <div className="reading-chapter-header">
              <div className="reading-novel-title">{novel?.title}</div>
              <h2 className="reading-chapter-title">Chapter {chapter.number}: {chapter.title}</h2>
              <div className="reading-meta">
                <span>{novel?.author}</span>
                <span>·</span>
                <span>{new Date(chapter.createdAt).toLocaleDateString()}</span>
                <span>·</span>
                <span>{(chapter.wordCount || 0).toLocaleString()} words</span>
              </div>
            </div>

            <AdBanner slot="TOP_AD_SLOT_ID" format="horizontal" style={{ margin: '24px 0' }} />

            <div
              className="reading-content"
              style={{ fontSize: `${fontSize}px` }}
              dangerouslySetInnerHTML={{ __html: formatContent(chapter.content) }}
            />

            <AdBanner slot="MID_AD_SLOT_ID" format="rectangle" style={{ margin: '32px 0' }} />

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
                <Link to={chapterHref(prevChapter)} className="read-nav-btn prev">
                  <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path d="M19 12H5M12 19l-7-7 7-7"/>
                  </svg>
                  <span>Ch. {prevChapter.number}</span>
                </Link>
              ) : <div />}

              <Link to={novelHref} className="read-nav-toc">
                <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/>
                </svg>
                Contents
              </Link>

              {nextChapter ? (
                <Link to={chapterHref(nextChapter)} className="read-nav-btn next">
                  <span>Ch. {nextChapter.number}</span>
                  <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                  </svg>
                </Link>
              ) : (
                <div className="read-nav-btn next" style={{ opacity: 0.4, pointerEvents: 'none' }}>
                  <span>Last Chapter</span>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
