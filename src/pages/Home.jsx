import { useState, useEffect } from 'react';
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

export default function Home() {
  const [trending, setTrending]       = useState([]);
  const [topRated, setTopRated]       = useState([]);
  const [latest, setLatest]           = useState([]);
  const [recentlyAdded, setRecent]    = useState([]);
  const [hero, setHero]               = useState(null);
  const [loading, setLoading]         = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const [byViews, byRating, byNew] = await Promise.all([
          getNovels({ sort: 'views',  limit: 4 }),
          getNovels({ sort: 'rating', limit: 4 }),
          getNovels({ sort: 'new',    limit: 6 }),
        ]);
        const trendNovels  = byViews.novels  || [];
        const ratedNovels  = byRating.novels || [];
        const newNovels    = byNew.novels    || [];

        setTrending(trendNovels);
        setTopRated(ratedNovels);
        setLatest(newNovels.slice(0, 6));
        setRecent(newNovels.slice(0, 4));
        setHero(ratedNovels[0] || trendNovels[0] || newNovels[0] || null);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  if (!loading && !hero) {
    return (
      <div className="home">
        <div className="home-empty">
          <div className="home-empty-icon">📚</div>
          <h2>No novels yet</h2>
          <p>Be the first author to publish a novel on NovaSphere!</p>
          <Link to="/dashboard" className="btn-primary" style={{display:'inline-flex', marginTop:'16px'}}>
            Go to Dashboard
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="home">
      {/* Hero */}
      <section className="hero">
        <div className="hero-bg-art">
          <img src={hero?.cover || PLACEHOLDER} alt="" aria-hidden="true" />
          <div className="hero-bg-overlay" />
        </div>
        <div className="container hero-content">
          <div className="hero-badge">
            <span className="hero-badge-dot" />
            Featured Novel
          </div>
          {loading ? (
            <div className="hero-skeleton">
              <div className="skeleton-line" style={{width:'60%', height:'2.5rem', marginBottom:'16px'}} />
              <div className="skeleton-line" style={{width:'40%', marginBottom:'12px'}} />
              <div className="skeleton-line" style={{width:'80%'}} />
            </div>
          ) : hero ? (
            <>
              <h1 className="hero-title">{hero.title}</h1>
              <div className="hero-meta">
                <span className="hero-author">by {hero.author}</span>
                <StarRating rating={hero.rating} />
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
                <Link to={`/read/${hero._id}/1`} className="btn-primary">
                  <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                  Start Reading
                </Link>
                <Link to={`/novel/${hero._id}`} className="btn-secondary">View Details</Link>
              </div>
            </>
          ) : null}
        </div>
        {hero && (
          <div className="hero-cover-showcase">
            <div className="cover-float">
              <img src={hero.cover || PLACEHOLDER} alt={hero.title}
                onError={e => { e.target.src = PLACEHOLDER; }} />
              <div className="cover-glow" />
            </div>
          </div>
        )}
      </section>

      {/* Sections */}
      <div className="container home-sections">

        <section className="home-section">
          <div className="section-title">
            <span>🔥</span> Trending <span className="accent">Now</span>
            <Link to="/browse?sort=views" className="section-see-all">See All →</Link>
          </div>
          <div className="novel-grid novel-grid-4">
            {loading ? [...Array(4)].map((_,i) => <NovelCardSkeleton key={i} />) : trending.map(n => <NovelCard key={n._id} novel={n} />)}
          </div>
        </section>

        <section className="home-section">
          <div className="section-title">
            <span>⭐</span> Top Rated
            <Link to="/rankings" className="section-see-all">See All →</Link>
          </div>
          <div className="novel-grid novel-grid-4">
            {loading ? [...Array(4)].map((_,i) => <NovelCardSkeleton key={i} />) : topRated.map((n,i) => <NovelCard key={n._id} novel={n} rank={i+1} />)}
          </div>
        </section>

        <div className="two-col-sections">
          <section className="home-section">
            <div className="section-title">
              <span>🕐</span> Latest Updates
              <Link to="/updates" className="section-see-all">See All →</Link>
            </div>
            <div className="updates-list">
              {loading
                ? [...Array(5)].map((_,i) => (
                    <div key={i} className="update-item">
                      <div className="skeleton-cover" style={{width:'46px', height:'62px', flexShrink:0}} />
                      <div className="skeleton-info" style={{flex:1}}>
                        <div className="skeleton-line" style={{width:'70%'}} />
                        <div className="skeleton-line" style={{width:'50%'}} />
                      </div>
                    </div>
                  ))
                : latest.map(n => (
                    <Link to={`/novel/${n._id}`} key={n._id} className="update-item">
                      <img src={n.cover || PLACEHOLDER} alt={n.title} className="update-cover"
                        onError={e => { e.target.src = PLACEHOLDER; }} />
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
          </section>

          <section className="home-section">
            <div className="section-title">
              <span>✨</span> Recently Added
              <Link to="/browse?sort=new" className="section-see-all">See All →</Link>
            </div>
            <div className="novel-grid novel-grid-2">
              {loading
                ? [...Array(4)].map((_,i) => <NovelCardSkeleton key={i} />)
                : recentlyAdded.map(n => <NovelCard key={n._id} novel={n} />)
              }
            </div>
          </section>
        </div>

      </div>
    </div>
  );
}
