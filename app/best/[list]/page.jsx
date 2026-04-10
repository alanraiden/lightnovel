import Link from 'next/link';
import PageLayout from '@/components/PageLayout';
import NovelCard from '@/components/NovelCard';
import { BEST_LISTS, BEST_LIST_SLUGS, BEST_LIST_LABELS } from '../data';

const BASE_URL = 'https://idenwebstudio.online';
const API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }) {
  const data = BEST_LISTS[params.list];
  if (!data) return { title: 'Best Novels | idenwebstudio' };
  return {
    title: `${data.title} | Read Free at idenwebstudio`,
    description: `${data.intro.slice(0, 155)}...`,
    keywords: data.keywords,
    alternates: { canonical: `${BASE_URL}/best/${params.list}` },
    openGraph: {
      title: data.title,
      description: `${data.intro.slice(0, 155)}...`,
      type: 'website',
      siteName: 'idenwebstudio',
    },
  };
}

// Fetch top novels by tag(s) — tries each tag, merges results, deduplicates
async function fetchNovelsByTags(tags, sort, limit, status) {
  if (!tags || tags.length === 0) return [];
  try {
    // Query each tag and merge, then deduplicate by _id
    const results = await Promise.all(
      tags.map(async tag => {
        const params = new URLSearchParams({ sort, limit: String(limit) });
        if (status) params.set('status', status);
        const res = await fetch(`${API}/novels/by-tag/${encodeURIComponent(tag)}?${params}`, {
          next: { revalidate: 3600 },
        });
        if (!res.ok) return [];
        const data = await res.json();
        return data.novels || [];
      })
    );

    // Merge and deduplicate — preserve order (first occurrence wins), sort by views
    const seen = new Set();
    const merged = results.flat().filter(n => {
      if (seen.has(String(n._id))) return false;
      seen.add(String(n._id));
      return true;
    });

    // Sort merged result by the requested sort field
    const sortKey = { views: 'views', rating: 'rating', week: 'viewsWeek', month: 'viewsMonth' }[sort] || 'views';
    merged.sort((a, b) => (b[sortKey] || 0) - (a[sortKey] || 0));

    return merged.slice(0, limit);
  } catch {
    return [];
  }
}

// Fetch by status only (for completed-novels style lists with no tag)
async function fetchNovelsByStatus(status, sort, limit) {
  try {
    const res = await fetch(
      `${API}/novels?status=${status}&limit=${limit}&sort=${sort}`,
      { next: { revalidate: 3600 } }
    );
    const data = await res.json();
    return data.novels || [];
  } catch {
    return [];
  }
}

export default async function BestListPage({ params }) {
  const data = BEST_LISTS[params.list];

  if (!data) {
    return (
      <PageLayout>
        <div style={{ padding: '80px 0', textAlign: 'center' }}>
          <h1 style={{ fontFamily: 'var(--font-display)' }}>List not found</h1>
          <Link href="/browse" style={{ color: 'var(--accent-purple)' }}>Browse all novels →</Link>
        </div>
      </PageLayout>
    );
  }

  const sort  = data.sort  || 'views';
  const limit = data.limit || 12;

  // Fetch novels — by tag(s), by status, or both
  let novels = [];
  if (data.status && (!data.tags || data.tags.length === 0)) {
    // Pure status filter (e.g. completed-novels with no specific tags)
    novels = await fetchNovelsByStatus(data.status, sort, limit);
  } else if (data.tags && data.tags.length > 0) {
    // Tag-based fetch, optionally filtered by status too
    novels = await fetchNovelsByTags(data.tags, sort, limit, data.status);
  }

  const relatedLists = BEST_LIST_SLUGS.filter(s => s !== params.list);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: data.title,
    description: data.intro.slice(0, 160),
    url: `${BASE_URL}/best/${params.list}`,
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: BASE_URL },
        { '@type': 'ListItem', position: 2, name: data.title, item: `${BASE_URL}/best/${params.list}` },
      ],
    },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <PageLayout>
        <div style={{ padding: '40px 0 80px', minHeight: '100vh' }}>
          <div className="container">

            <nav style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '20px', fontFamily: 'var(--font-mono)' }}>
              <Link href="/" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>Home</Link>
              {' › '}
              <span style={{ color: 'var(--text-primary)' }}>{data.title}</span>
            </nav>

            <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', fontWeight: 700, marginBottom: '16px' }}>
              {data.h1}
            </h1>
            <p style={{
              color: 'var(--text-muted)', fontFamily: 'var(--font-body)',
              fontSize: '0.95rem', lineHeight: '1.75', maxWidth: '720px', marginBottom: '48px',
            }}>
              {data.intro}
            </p>

            {novels.length > 0 ? (
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))',
                gap: '20px',
                marginBottom: '56px',
              }}>
                {novels.map((novel, i) => (
                  <div key={novel._id} style={{ position: 'relative' }}>
                    <div style={{
                      position: 'absolute', top: '8px', left: '8px', zIndex: 10,
                      background: 'var(--accent-orange)', color: '#fff',
                      fontFamily: 'var(--font-mono)', fontSize: '0.65rem', fontWeight: 700,
                      padding: '2px 7px', borderRadius: '4px', letterSpacing: '0.05em',
                    }}>
                      #{i + 1}
                    </div>
                    <NovelCard novel={novel} />
                  </div>
                ))}
              </div>
            ) : (
              <p style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', fontSize: '0.85rem', marginBottom: '56px' }}>
                Novels coming soon — check back after tagging your novels in the dashboard.{' '}
                <Link href="/browse" style={{ color: 'var(--accent-purple)' }}>Browse all novels →</Link>
              </p>
            )}

            <div style={{ padding: '28px 32px', background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)' }}>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1rem', marginBottom: '16px', letterSpacing: '0.08em' }}>
                MORE CURATED LISTS
              </h2>
              <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                {relatedLists.map(slug => (
                  <Link key={slug} href={`/best/${slug}`} style={{
                    padding: '8px 16px', border: '1px solid var(--border-accent)',
                    borderRadius: '999px', fontFamily: 'var(--font-mono)', fontSize: '0.78rem',
                    color: 'var(--text-secondary)', textDecoration: 'none',
                    transition: 'all var(--transition)',
                    background: 'rgba(139,92,246,0.05)',
                  }}>
                    {BEST_LIST_LABELS[slug]}
                  </Link>
                ))}
                <Link href="/browse" style={{
                  padding: '8px 16px', border: '1px solid var(--border)',
                  borderRadius: '999px', fontFamily: 'var(--font-mono)', fontSize: '0.78rem',
                  color: 'var(--text-muted)', textDecoration: 'none',
                }}>
                  Browse All →
                </Link>
              </div>
            </div>

          </div>
        </div>
      </PageLayout>
    </>
  );
}
