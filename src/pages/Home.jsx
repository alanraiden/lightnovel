import { useState, useEffect, useRef, useCallback } from 'react';

const READING_KEY = 'ns_reading_history';

function getReadingHistory() {
  try {
    return JSON.parse(localStorage.getItem(READING_KEY) || '[]');
  } catch { return []; }
}

function useIsMobile() {
  const [mobile, setMobile] = useState(() => window.innerWidth <= 600);
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 600px)');
    const handler = (e) => setMobile(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);
  return mobile;
}
import { Link } from 'react-router-dom';
import NovelCard from '../components/NovelCard';
import { getNovels } from '../services/api';
import './Home.css';

const PLACEHOLDER = 'https://images.unsplash.com/photo-1578632767115-351597cf2477?w=400&h=600&fit=crop';

function StarRating({ rating }) {
  return (
    <div className="hero-rating">
      {[1,2,3,4,5].map(i => (
        <svg key={i} width="14" height="14" viewBox="0 0 24 24" fill={i <= Math.floor(rating) ? 'var(--accent-gold)' : 'var(--text-muted)'}>
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
        </svg>
      ))}
      <span>{rating} / 5.0</span>
    </div>
  );
}

function NovelCardSkeleton() {
  return (
    <div className="novel-card skeleton-card">
      <div className="skeleton-cover" />
      <div className="skeleton-info">
        <div className="skeleton-line" style={{width:'80%'}} />
        <div className="skeleton-line" style={{width:'50%'}} />
        <div className="skeleton-line" style={{width:'65%'}} />
      </div>
    </div>
  );
}

function HeroSlider({ novels, loading }) {
  const [current, setCurrent]   = useState(0);
  const [animating, setAnimating] = useState(false);
  const timerRef    = useRef(null);
  const touchStartX = useRef(null);

  const goTo = useCallback((idx) => {
    if (animating) return;
    setAnimating(true);
    setCurrent(idx);
    setTimeout(() => setAnimating(false), 500);
  }, [animating]);

  const next = useCallback(() => {
    if (!novels.length) return;
    goTo((current + 1) % novels.length);
  }, [current, novels.length, goTo]);

  const prev = useCallback(() => {
    if (!novels.length) return;
    goTo((current - 1 + novels.length) % novels.length);
  }, [current, novels.length, goTo]);

  useEffect(() => {
    if (!novels.length) return;
    // Disable auto-slide on mobile (touch devices)
    if (window.matchMedia('(max-width: 600px)').matches) return;
    timerRef.current = setInterval(next, 5000);
    return () => clearInterval(timerRef.current);
  }, [next, novels.length]);

  const pause  = () => clearInterval(timerRef.current);
  const resume = () => {
    if (window.matchMedia('(max-width: 600px)').matches) return;
    timerRef.current = setInterval(next, 5000);
  };

  const onTouchStart = (e) => { touchStartX.current = e.touches[0].clientX; pause(); };
  const onTouchEnd   = (e) => {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) diff > 0 ? next() : prev();
    touchStartX.current = null;
    resume();
  };

  if (loading) {
    return (
      <section className="hero">
        <div className="hero-bg-art active">
          <div style={{width:'100%',height:'100%',background:'var(--bg-secondary)'}}/>
          <div className="hero-bg-overlay"/>
        </div>
        <div className="container hero-content">
          <div className="hero-skeleton">
            <div className="skeleton-line" style={{width:'30%',height:'0.8rem',marginBottom:'20px',borderRadius:'100px'}}/>
            <div className="skeleton-line" style={{width:'65%',height:'2.5rem',marginBottom:'16px'}}/>
            <div className="skeleton-line" style={{width:'40%',marginBottom:'12px'}}/>
            <div className="skeleton-line" style={{width:'85%',marginBottom:'8px'}}/>
            <div className="skeleton-line" style={{width:'70%',marginBottom:'28px'}}/>
            <div style={{display:'flex',gap:'12px'}}>
              <div className="skeleton-line" style={{width:'130px',height:'42px',borderRadius:'8px'}}/>
              <div className="skeleton-line" style={{width:'110px',height:'42px',borderRadius:'8px'}}/>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (!novels.length) return null;
  const hero = novels[current];

  return (
    <section
      className="hero hero-slider"
      onMouseEnter={pause}
      onMouseLeave={resume}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      {novels.map((n, i) => (
        <div key={n._id} className={`hero-bg-art ${i === current ? 'active' : ''}`}>
          <img src={n.cover || PLACEHOLDER} alt="" aria-hidden="true" loading={i === 0 ? "eager" : "lazy"} fetchpriority={i === 0 ? "high" : "low"}/>
          <div className="hero-bg-overlay"/>
        </div>
      ))}

      <div className={`container hero-content ${animating ? 'hero-fade' : ''}`}>
        <div className="hero-badge">
          <span className="hero-badge-dot"/>
          Featured Novel
        </div>
        <h1 className="hero-title">{hero.title}</h1>
        <div className="hero-meta">
          <span className="hero-author">by {hero.author}</span>
          <StarRating rating={hero.rating}/>
          <div className="hero-stats">
            <span>{hero.chapterCount} Chapters</span>
            <span className="hero-stat-sep">·</span>
            <span>{hero.views?.toLocaleString()} Views</span>
            <span className="hero-stat-sep">·</span>
            <span className={`badge badge-${hero.status}`}>{hero.status}</span>
          </div>
        </div>
        <div className="hero-genres">
          {(hero.genres || []).map(g => (
            <span key={g} className="hero-genre-tag">{g}</span>
          ))}
        </div>
        <p className="hero-description">{hero.description}</p>
        <div className="hero-actions">
          <Link to={hero.slug ? `/novel/s/${hero.slug}` : `/novel/${hero._id}`} className="btn-primary">
            <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
            Start Reading
          </Link>
          <Link to={hero.slug ? `/novel/s/${hero.slug}` : `/novel/${hero._id}`} className="btn-secondary">View Details</Link>
        </div>
      </div>

      <div className="hero-cover-showcase">
        <div className="cover-float">
          <img src={hero.cover || PLACEHOLDER} alt={hero.title} onError={e => { e.target.src = PLACEHOLDER; }}/>
          <div className="cover-glow"/>
        </div>
      </div>

      {novels.length > 1 && (
        <>
          <button className="hero-arrow hero-arrow-prev" onClick={prev} aria-label="Previous">
            <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M15 18l-6-6 6-6"/></svg>
          </button>
          <button className="hero-arrow hero-arrow-next" onClick={next} aria-label="Next">
            <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M9 18l6-6-6-6"/></svg>
          </button>
          <div className="hero-dots">
            {novels.map((_, i) => (
              <button key={i} className={`hero-dot ${i === current ? 'active' : ''}`} onClick={() => goTo(i)} aria-label={`Slide ${i+1}`}/>
            ))}
          </div>

        </>
      )}
    </section>
  );
}

export default function Home() {
  const [continueReading, setContinue] = useState([]);
  const isMobile = useIsMobile();
  const [featured,      setFeatured]  = useState([]);
  const [trending,      setTrending]  = useState([]);
  const [topRated,      setTopRated]  = useState([]);
  const [latest,        setLatest]    = useState([]);
  const [recentlyAdded, setRecent]    = useState([]);
  const [loading,       setLoading]   = useState(true);

  useEffect(() => {
    const history = getReadingHistory();
    setContinue(history.slice(0, 5));
  }, []);

  useEffect(() => {
    async function load() {
      try {
        const [byViews, byRating, byNew] = await Promise.all([
          getNovels({ sort: 'views',  limit: 9 }),
          getNovels({ sort: 'rating', limit: 9 }),
          getNovels({ sort: 'new',    limit: 6 }),
        ]);
        const trendNovels = byViews.novels  || [];
        const ratedNovels = byRating.novels || [];
        const newNovels   = byNew.novels    || [];

        const seen = new Set();
        const feat = [];
        for (const n of [...ratedNovels, ...trendNovels]) {
          if (!seen.has(n._id) && feat.length < 9) { seen.add(n._id); feat.push(n); }
        }
        setFeatured(feat);
        setTrending(trendNovels.slice(0, 9));
        setTopRated(ratedNovels.slice(0, 9));
        setLatest(newNovels.slice(0, 6));
        setRecent(newNovels.slice(0, 4));
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  if (!loading && !featured.length) {
    return (
      <div className="home">
        <div className="home-empty">
          <div className="home-empty-icon">📚</div>
          <h2>No novels yet</h2>
          <p>Be the first to publish a novel on idenwebstudio!</p>
          <Link to="/dashboard" className="btn-primary" style={{display:'inline-flex',marginTop:'16px'}}>
            Go to Dashboard
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="home">
      <HeroSlider novels={featured} loading={loading}/>

      <div className="container home-sections">

        {/* Continue Reading */}
        {continueReading.length > 0 && (
          <section className="home-section continue-section">
            <div className="section-title">
              <span>📖</span> Continue Reading
            </div>
            <div className="continue-list">
              {continueReading.map(item => (
                <Link
                  key={item.novelId}
                  to={item.novelSlug ? `/read/s/${item.novelSlug}/chapter-${item.chapterNum}` : `/read/${item.novelId}/${item.chapterNum}`}
                  className="continue-card"
                >
                  <img src={item.cover || PLACEHOLDER} alt={item.title} className="continue-cover"
                    onError={e => { e.target.src = PLACEHOLDER; }} loading="lazy"/>
                  <div className="continue-info">
                    <div className="continue-title">{item.title}</div>
                    <div className="continue-meta">Chapter {item.chapterNum} of {item.totalChapters}</div>
                    <div className="continue-progress-bar">
                      <div className="continue-progress-fill"
                        style={{width: `${Math.round((item.chapterNum / Math.max(item.totalChapters,1)) * 100)}%`}}/>
                    </div>
                  </div>
                  <div className="continue-btn">
                    <svg width="14" height="14" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        <section className="home-section">
          <div className="section-title">
            <span>🔥</span> Trending <span className="accent">Now</span>
            <Link to="/browse?sort=views" className="section-see-all">See All →</Link>
          </div>
          <div className={isMobile ? "scroll-row" : "novel-grid novel-grid-4"}>
            {loading ? [...Array(4)].map((_,i) => <NovelCardSkeleton key={i}/>) : trending.map(n => <NovelCard key={n._id} novel={n}/>)}
          </div>
        </section>

        <section className="home-section">
          <div className="section-title">
            <span>⭐</span> Top Rated
            <Link to="/rankings" className="section-see-all">See All →</Link>
          </div>
          <div className={isMobile ? "scroll-row" : "novel-grid novel-grid-4"}>
            {loading ? [...Array(4)].map((_,i) => <NovelCardSkeleton key={i}/>) : topRated.map((n,i) => <NovelCard key={n._id} novel={n} rank={i+1}/>)}
          </div>
        </section>

        {/* Latest Updates — vertical list on desktop, horizontal scroll on mobile */}
        <div className={isMobile ? "" : "two-col-sections"}>
          <section className="home-section">
            <div className="section-title">
              <span>🕐</span> Latest Updates
              <Link to="/updates" className="section-see-all">See All →</Link>
            </div>
            {isMobile ? (
              <div className="scroll-row">
                {loading
                  ? [...Array(5)].map((_,i) => (
                      <div key={i} className="update-item update-item-card">
                        <div className="skeleton-cover" style={{width:'46px',height:'62px',flexShrink:0}}/>
                        <div className="skeleton-info" style={{flex:1}}>
                          <div className="skeleton-line" style={{width:'70%'}}/>
                          <div className="skeleton-line" style={{width:'50%'}}/>
                        </div>
                      </div>
                    ))
                  : latest.map(n => (
                      <Link to={n.slug ? `/novel/s/${n.slug}` : `/novel/${n._id}`} key={n._id} className="update-item update-item-card">
                        <img src={n.cover || PLACEHOLDER} alt={n.title} className="update-cover"
                          onError={e => { e.target.src = PLACEHOLDER; }}/>
                        <div className="update-info">
                          <div className="update-title">{n.title}</div>
                          <div className="update-chapter">
                            {n.chapterCount > 0 ? `${n.chapterCount} chapters` : 'No chapters yet'}
                          </div>
                          <div className="update-date">{new Date(n.updatedAt).toLocaleDateString()}</div>
                        </div>
                      </Link>
                    ))
                }
              </div>
            ) : (
              <div className="updates-list">
                {loading
                  ? [...Array(5)].map((_,i) => (
                      <div key={i} className="update-item">
                        <div className="skeleton-cover" style={{width:'46px',height:'62px',flexShrink:0}}/>
                        <div className="skeleton-info" style={{flex:1}}>
                          <div className="skeleton-line" style={{width:'70%'}}/>
                          <div className="skeleton-line" style={{width:'50%'}}/>
                        </div>
                      </div>
                    ))
                  : latest.map(n => (
                      <Link to={n.slug ? `/novel/s/${n.slug}` : `/novel/${n._id}`} key={n._id} className="update-item">
                        <img src={n.cover || PLACEHOLDER} alt={n.title} className="update-cover"
                          onError={e => { e.target.src = PLACEHOLDER; }}/>
                        <div className="update-info">
                          <div className="update-title">{n.title}</div>
                          <div className="update-chapter">
                            {n.chapterCount > 0 ? `${n.chapterCount} chapters` : 'No chapters yet'}
                          </div>
                          <div className="update-date">{new Date(n.updatedAt).toLocaleDateString()}</div>
                        </div>
                        <span className={`badge badge-${n.status}`}>{n.status}</span>
                      </Link>
                    ))
                }
              </div>
            )}
          </section>

          {/* Recently Added — scroll row on mobile */}
          <section className="home-section">
            <div className="section-title">
              <span>✨</span> Recently Added
              <Link to="/browse?sort=new" className="section-see-all">See All →</Link>
            </div>
            <div className={isMobile ? "scroll-row" : "novel-grid novel-grid-2"}>
              {loading
                ? [...Array(4)].map((_,i) => <NovelCardSkeleton key={i}/>)
                : recentlyAdded.map(n => <NovelCard key={n._id} novel={n}/>)
              }
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
