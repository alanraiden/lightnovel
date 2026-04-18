'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { getNovels } from '@/services/api';
import PageLayout from '@/components/PageLayout';

const PLACEHOLDER = 'https://images.unsplash.com/photo-1578632767115-351597cf2477?w=400&h=600&fit=crop';
const TABS = ['Top Rated', 'Most Viewed', 'Most Chapters'];
const SORT_MAP = { 'Top Rated': 'rating', 'Most Viewed': 'views', 'Most Chapters': 'chapters' };

function medalColor(i) {
  return i === 0 ? 'var(--accent-gold)' : i === 1 ? '#c0c0c0' : i === 2 ? '#cd7f32' : 'var(--text-muted)';
}

function RankCard({ novel, i, tab }) {
  const href = novel.slug ? `/novel/s/${novel.slug}` : `/novel/${novel._id}`;

  const latestChapter = novel.latestChapter || novel.lastChapter || null;
  const chapterLabel = latestChapter
    ? (latestChapter.title || `Chapter ${latestChapter.number || novel.chapterCount}`)
    : novel.chapterCount > 0 ? `Chapter ${novel.chapterCount}` : null;

  const statValue = tab === 'Top Rated'
    ? `⭐ ${novel.rating || '—'}`
    : tab === 'Most Viewed'
    ? `${novel.views?.toLocaleString() || 0} views`
    : `${novel.chapterCount || 0} ch`;

  return (
    <Link href={href} style={{ textDecoration: 'none', display: 'block' }}>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '44px 80px 1fr',
          gap: '12px',
          alignItems: 'stretch',
          padding: '12px 14px',
          background: 'var(--bg-card)',
          border: '1px solid var(--border)',
          borderRadius: 'var(--radius)',
          transition: 'border-color 0.2s, background 0.2s',
        }}
        onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--border-accent)'; e.currentTarget.style.background = 'var(--bg-elevated)'; }}
        onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.background = 'var(--bg-card)'; }}
      >
        {/* Rank */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
          <span style={{
            fontFamily: 'var(--font-display)',
            fontSize: i < 3 ? '1.35rem' : '1rem',
            fontWeight: 700,
            color: medalColor(i),
            lineHeight: 1,
          }}>
            {i < 3 ? ['🥇', '🥈', '🥉'][i] : `#${i + 1}`}
          </span>
        </div>

        {/* Cover */}
        <div style={{ flexShrink: 0, borderRadius: '6px', overflow: 'hidden' }}>
          <img
            src={novel.cover || PLACEHOLDER}
            alt={novel.title}
            onError={e => { e.target.src = PLACEHOLDER; }}
            style={{ width: '80px', height: '108px', objectFit: 'cover', display: 'block' }}
          />
        </div>

        {/* Text */}
        <div style={{ minWidth: 0, display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '4px' }}>
          <div style={{
            fontFamily: 'var(--font-display)',
            fontSize: '0.82rem',
            fontWeight: 600,
            color: 'var(--text-primary)',
            lineHeight: 1.35,
            overflow: 'hidden',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
          }}>
            {novel.title}
          </div>

          {chapterLabel && (
            <div style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.72rem',
              fontWeight: 700,
              color: 'var(--text-primary)',
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
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
            }}>
              {novel.description}
            </div>
          )}

          <div style={{
            marginTop: '4px',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.68rem',
            fontWeight: 700,
            color: tab === 'Top Rated' ? 'var(--accent-gold)' : tab === 'Most Viewed' ? 'var(--accent-blue)' : 'var(--accent-purple)',
          }}>
            {statValue}
          </div>
        </div>
      </div>
    </Link>
  );
}

export default function RankingsPage() {
  const [tab, setTab] = useState('Top Rated');
  const [novels, setNovels] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    getNovels({ sort: SORT_MAP[tab], limit: 20 })
      .then(d => setNovels(d.novels || []))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [tab]);

  return (
    <PageLayout>
      <div style={{ padding: '40px 0 80px', minHeight: '100vh' }}>
        <div className="container">
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.4rem,4vw,2rem)', fontWeight: 700, marginBottom: '6px' }}>
            Rankings
          </h1>
          <p style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', fontSize: '0.82rem', marginBottom: '24px' }}>
            Top novels on idenwebstudio
          </p>

          <div style={{ display: 'flex', gap: '4px', borderBottom: '1px solid var(--border)', marginBottom: '24px', overflowX: 'auto', scrollbarWidth: 'none' }}>
            {TABS.map(t => (
              <button key={t} onClick={() => setTab(t)} style={{
                padding: '10px 18px',
                background: 'transparent',
                border: 'none',
                borderBottom: t === tab ? '2px solid var(--accent-orange)' : '2px solid transparent',
                marginBottom: '-1px',
                color: t === tab ? 'var(--accent-orange)' : 'var(--text-secondary)',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.8rem',
                cursor: 'pointer',
                transition: 'color 0.2s',
                whiteSpace: 'nowrap',
                flexShrink: 0,
              }}>{t}</button>
            ))}
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            {loading
              ? [...Array(10)].map((_, i) => (
                <div key={i} style={{
                  height: '108px',
                  background: 'var(--bg-card)',
                  border: '1px solid var(--border)',
                  borderRadius: 'var(--radius)',
                  backgroundImage: 'linear-gradient(90deg,var(--bg-elevated) 25%,var(--bg-card) 50%,var(--bg-elevated) 75%)',
                  backgroundSize: '200% 100%',
                  animation: 'shimmer 1.5s infinite',
                }} />
              ))
              : novels.map((n, i) => <RankCard key={n._id} novel={n} i={i} tab={tab} />)
            }
            {!loading && novels.length === 0 && (
              <div style={{ textAlign: 'center', padding: '60px', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                No novels yet. Be the first to publish!
              </div>
            )}
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
