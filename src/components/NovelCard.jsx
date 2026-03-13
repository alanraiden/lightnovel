import { Link } from 'react-router-dom';

const PLACEHOLDER = 'https://images.unsplash.com/photo-1578632767115-351597cf2477?w=400&h=600&fit=crop';

export default function NovelCard({ novel, rank }) {
  // Support both _id (MongoDB) and id (mock data)
  const id = novel._id || novel.id;

  return (
    <Link to={`/novel/${id}`} style={{ textDecoration: 'none' }}>
      <div className="novel-card">
        <div className="novel-card-cover">
          <img
            src={novel.cover || PLACEHOLDER}
            alt={novel.title}
            loading="lazy"
            onError={e => { e.target.src = PLACEHOLDER; }}
          />
          <div className="novel-card-overlay">
            <span style={{ color: 'var(--text-secondary)', fontSize: '0.72rem', fontFamily: 'var(--font-mono)' }}>
              {novel.chapterCount || novel.chapters || 0} chapters
            </span>
          </div>
          <div className="novel-card-status">
            <span className={`badge badge-${novel.status}`}>
              {novel.status === 'ongoing' ? '● ' : '✓ '}{novel.status}
            </span>
          </div>
          {rank && <div className="novel-card-rank">#{rank}</div>}
        </div>
        <div className="novel-card-info">
          <div className="novel-card-title">{novel.title}</div>
          <div className="novel-card-author">{novel.author}</div>
          <div className="novel-card-meta">
            <div className="novel-card-rating">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
              </svg>
              {novel.rating || '0.0'}
            </div>
            <span style={{ color: 'var(--text-muted)', fontSize: '0.7rem', fontFamily: 'var(--font-mono)' }}>
              {typeof novel.views === 'number' ? novel.views.toLocaleString() : novel.views || '0'}
            </span>
          </div>
          <div className="novel-card-genres">
            {(novel.genres || []).slice(0, 2).map(g => (
              <span key={g} className="genre-tag">{g}</span>
            ))}
          </div>
        </div>
      </div>
    </Link>
  );
}
