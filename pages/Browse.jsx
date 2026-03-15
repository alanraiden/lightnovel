import { useState, useEffect, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import NovelCard from '../components/NovelCard';
import { getNovels } from '../services/api';

const GENRES = ['Action','Adventure','Comedy','Drama','Fantasy','Historical','Horror','Isekai','Martial Arts','Mecha','Mystery','Philosophical','Romance','Sci-Fi','System','Wuxia','Xianxia','Psychological'];

function NovelCardSkeleton() {
  return (
    <div className="novel-card" style={{pointerEvents:'none'}}>
      <div style={{aspectRatio:'3/4', background:'linear-gradient(90deg,var(--bg-elevated) 25%,var(--bg-card) 50%,var(--bg-elevated) 75%)', backgroundSize:'200% 100%', animation:'shimmer 1.5s infinite'}} />
      <div style={{padding:'14px', display:'flex', flexDirection:'column', gap:'8px'}}>
        <div style={{height:'12px', width:'80%', background:'var(--bg-elevated)', borderRadius:'4px'}} />
        <div style={{height:'10px', width:'50%', background:'var(--bg-elevated)', borderRadius:'4px'}} />
      </div>
    </div>
  );
}

export default function Browse() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [search, setSearch]             = useState(searchParams.get('q') || '');
  const [genre, setGenre]               = useState(searchParams.get('genre') || '');
  const [status, setStatus]             = useState('');
  const [sort, setSort]                 = useState(searchParams.get('sort') || 'rating');
  const [novels, setNovels]             = useState([]);
  const [total, setTotal]               = useState(0);
  const [page, setPage]                 = useState(1);
  const [loading, setLoading]           = useState(true);
  const LIMIT = 20;

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const params = { sort, limit: LIMIT, page };
      if (search) params.search = search;
      if (genre)  params.genre  = genre;
      if (status) params.status = status;
      const data = await getNovels(params);
      setNovels(data.novels || []);
      setTotal(data.total || 0);
    } catch {}
    setLoading(false);
  }, [search, genre, status, sort, page]);

  useEffect(() => { load(); }, [load]);

  function handleSearch(e) {
    e.preventDefault();
    setPage(1);
    load();
  }

  const totalPages = Math.ceil(total / LIMIT);

  return (
    <div className="browse-page">
      <div className="container">
        <div className="browse-header">
          <h1 className="browse-title">Browse Novels</h1>
          <p className="browse-subtitle">{loading ? 'Loading...' : `${total} novels found`}</p>
        </div>

        <div className="browse-layout">
          <aside className="browse-filters">
            <div className="filter-group">
              <div className="filter-label">Search</div>
              <form onSubmit={handleSearch}>
                <div className="filter-search">
                  <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
                  <input type="text" placeholder="Title, author, tags..." value={search} onChange={e => { setSearch(e.target.value); setPage(1); }} />
                </div>
              </form>
            </div>

            <div className="filter-group">
              <div className="filter-label">Sort By</div>
              <div className="filter-options">
                {[['rating','Top Rated'],['views','Most Viewed'],['new','Newest'],['chapters','Most Chapters']].map(([v,l]) => (
                  <button key={v} className={`filter-option ${sort === v ? 'active' : ''}`} onClick={() => { setSort(v); setPage(1); }}>{l}</button>
                ))}
              </div>
            </div>

            <div className="filter-group">
              <div className="filter-label">Status</div>
              <div className="filter-options">
                {[['','All'],['ongoing','Ongoing'],['completed','Completed']].map(([v,l]) => (
                  <button key={v} className={`filter-option ${status === v ? 'active' : ''}`} onClick={() => { setStatus(v); setPage(1); }}>{l}</button>
                ))}
              </div>
            </div>

            <div className="filter-group">
              <div className="filter-label">Genre</div>
              <div className="filter-genres">
                <button className={`genre-filter-btn ${!genre ? 'active' : ''}`} onClick={() => { setGenre(''); setPage(1); }}>All</button>
                {GENRES.map(g => (
                  <button key={g} className={`genre-filter-btn ${genre === g ? 'active' : ''}`}
                    onClick={() => { setGenre(g === genre ? '' : g); setPage(1); }}>{g}</button>
                ))}
              </div>
            </div>
          </aside>

          <div className="browse-results">
            {loading ? (
              <div className="browse-grid">
                {[...Array(12)].map((_,i) => <NovelCardSkeleton key={i} />)}
              </div>
            ) : novels.length === 0 ? (
              <div className="browse-empty">
                <div style={{fontSize:'3rem', marginBottom:'16px'}}>📭</div>
                <div style={{fontFamily:'var(--font-display)', fontSize:'1.1rem', marginBottom:'8px'}}>No novels found</div>
                <div style={{color:'var(--text-muted)', fontSize:'0.85rem'}}>Try adjusting your filters</div>
              </div>
            ) : (
              <>
                <div className="browse-grid">
                  {novels.map(n => <NovelCard key={n._id} novel={n} />)}
                </div>
                {totalPages > 1 && (
                  <div className="pagination">
                    <button className="page-btn" disabled={page === 1} onClick={() => setPage(p => p - 1)}>
                      <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M15 18l-6-6 6-6"/></svg>
                    </button>
                    {[...Array(totalPages)].map((_,i) => (
                      <button key={i} className={`page-btn ${page === i+1 ? 'active' : ''}`} onClick={() => setPage(i+1)}>{i+1}</button>
                    ))}
                    <button className="page-btn" disabled={page === totalPages} onClick={() => setPage(p => p + 1)}>
                      <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M9 18l6-6-6-6"/></svg>
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
