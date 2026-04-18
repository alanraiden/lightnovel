'use client';

import Link from 'next/link';

const PLACEHOLDER = 'https://images.unsplash.com/photo-1578632767115-351597cf2477?w=400&h=600&fit=crop';

export default function NovelRow({ novel }) {
  const href = novel.slug ? `/novel/s/${novel.slug}` : `/novel/${novel._id}`;

  const latestChapter = novel.latestChapter || novel.lastChapter || null;
  const chapterLabel = latestChapter
    ? (latestChapter.title || `Chapter ${latestChapter.number || novel.chapterCount}`)
    : novel.chapterCount > 0 ? `Chapter ${novel.chapterCount}` : null;

  return (
    <Link href={href} style={{ textDecoration: 'none', display: 'block' }}>
      <div style={{
        display: 'grid',
        gridTemplateColumns: '90px 1fr',
        gap: '14px',
        alignItems: 'stretch',
        padding: '12px',
        background: 'var(--bg-card)',
        border: '1px solid var(--border)',
        borderRadius: 'var(--radius)',
        transition: 'border-color 0.2s, background 0.2s',
      }}
        onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--border-accent)'; e.currentTarget.style.background = 'var(--bg-elevated)'; }}
        onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.background = 'var(--bg-card)'; }}
      >
        {/* Cover */}
        <div style={{ borderRadius: '6px', overflow: 'hidden', position: 'relative', flexShrink: 0 }}>
          <img
            src={novel.cover || PLACEHOLDER}
            alt={novel.title}
            onError={e => { e.target.src = PLACEHOLDER; }}
            style={{ width: '90px', height: '120px', objectFit: 'cover', display: 'block' }}
          />
          {novel.rating && (
            <div style={{
              position: 'absolute', top: '6px', left: '6px',
              background: 'rgba(10,10,20,0.82)',
              border: '1px solid rgba(245,158,11,0.4)',
              borderRadius: '4px',
              padding: '2px 5px',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.6rem',
              color: 'var(--accent-gold)',
              fontWeight: 700,
              display: 'flex', alignItems: 'center', gap: '3px',
              backdropFilter: 'blur(4px)',
            }}>
              ★ {novel.rating}
            </div>
          )}
        </div>

        {/* Text */}
        <div style={{ minWidth: 0, display: 'flex', flexDirection: 'column', gap: '4px', justifyContent: 'center' }}>
          <div style={{
            fontSize: '0.78rem',
            color: 'var(--text-muted)',
            fontFamily: 'var(--font-mono)',
            overflow: 'hidden',
            whiteSpace: 'nowrap',
            textOverflow: 'ellipsis',
          }}>
            {novel.title}
          </div>

          {chapterLabel && (
            <div style={{
              fontFamily: 'var(--font-display)',
              fontSize: '0.88rem',
              fontWeight: 700,
              color: 'var(--text-primary)',
              lineHeight: 1.3,
              overflow: 'hidden',
              display: '-webkit-box',
              WebkitLineClamp: 1,
              WebkitBoxOrient: 'vertical',
            }}>
              {chapterLabel}
            </div>
          )}

          {novel.description && (
            <div style={{
              fontSize: '0.78rem',
              color: 'var(--text-secondary)',
              lineHeight: 1.5,
              overflow: 'hidden',
              display: '-webkit-box',
              WebkitLineClamp: 3,
              WebkitBoxOrient: 'vertical',
            }}>
              {novel.description}
            </div>
          )}

          {novel.views > 0 && (
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.68rem',
              color: 'var(--text-muted)',
              marginTop: '2px',
            }}>
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>
              </svg>
              {novel.views?.toLocaleString()}
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}
