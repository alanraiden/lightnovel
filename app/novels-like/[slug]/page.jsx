import Link from 'next/link';
import PageLayout from '@/components/PageLayout';
import { SIMILAR_DATA } from '../data';
import NovelRow from './NovelRow';

const BASE_URL = 'https://idenwebstudio.online';
const API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

export const dynamic = 'force-dynamic';

async function fetchSimilarBySlug(slug, limit = 8) {
  try {
    const res = await fetch(`${API}/novels/slug/${slug}/similar?limit=${limit}`, { next: { revalidate: 3600 } });
    if (!res.ok) return [];
    const data = await res.json();
    return data.novels || [];
  } catch { return []; }
}

async function fetchSimilarByTags(tags, genres, limit = 8) {
  if (!tags?.length && !genres?.length) return [];
  try {
    const tagResults = await Promise.all(
      (tags || []).map(async tag => {
        const res = await fetch(`${API}/novels/by-tag/${encodeURIComponent(tag)}?sort=views&limit=${limit}`, { next: { revalidate: 3600 } });
        if (!res.ok) return [];
        const data = await res.json();
        return data.novels || [];
      })
    );
    const seen = new Set();
    const merged = tagResults.flat().filter(n => {
      if (seen.has(String(n._id))) return false;
      seen.add(String(n._id));
      return true;
    });
    merged.sort((a, b) => (b.views || 0) - (a.views || 0));
    return merged.slice(0, limit);
  } catch { return []; }
}

async function fetchNovelBySlug(slug) {
  try {
    const res = await fetch(`${API}/novels/slug/${slug}`, { next: { revalidate: 3600 } });
    if (!res.ok) return null;
    return await res.json();
  } catch { return null; }
}

export async function generateMetadata({ params }) {
  const staticData = SIMILAR_DATA[params.slug];
  let title = staticData?.title;
  if (!title) {
    const novel = await fetchNovelBySlug(params.slug);
    title = novel?.title ?? params.slug;
  }
  return {
    title: `Novels Like ${title} | Read Free at idenwebstudio`,
    description: `Finished ${title}? Here are the best similar novels to read next — all free at idenwebstudio.`,
    keywords: staticData?.keywords ?? `novels like ${title}, similar to ${title}, ${title} alternatives`,
    alternates: { canonical: `${BASE_URL}/novels-like/${params.slug}` },
    openGraph: {
      title: `Novels Like ${title}`,
      description: `Finished ${title}? Here are the best similar novels to read next — free online.`,
      type: 'website',
      siteName: 'idenwebstudio',
    },
  };
}

// ── Page ─────────────────────────────────────────────────────────────────────
export default async function NovelsLikePage({ params }) {
  const staticData = SIMILAR_DATA[params.slug];
  let novelTitle = staticData?.title;
  let description = staticData?.description;
  let novels = [];

  if (staticData) {
    if (staticData.tags?.length) {
      novels = await fetchSimilarByTags(staticData.tags, staticData.genres, 8);
    } else {
      novels = await fetchSimilarBySlug(params.slug, 8);
    }
  } else {
    const novel = await fetchNovelBySlug(params.slug);
    if (!novel) {
      return (
        <PageLayout>
          <div style={{ padding: '80px 0', textAlign: 'center' }}>
            <h1 style={{ fontFamily: 'var(--font-display)' }}>Page not found</h1>
            <Link href="/browse" style={{ color: 'var(--accent-purple)' }}>Browse all novels →</Link>
          </div>
        </PageLayout>
      );
    }
    novelTitle = novel.title;
    description = novel.description
      ? `${novel.description.slice(0, 200).trim()}... If this novel resonated with you, these similar reads are worth checking out.`
      : `If you enjoyed ${novelTitle}, here are the most similar novels on our site based on shared tags and genres.`;
    novels = await fetchSimilarBySlug(params.slug, 8);
  }

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: `Novels Like ${novelTitle}`,
    description: `Best novels similar to ${novelTitle} — read free at idenwebstudio.`,
    url: `${BASE_URL}/novels-like/${params.slug}`,
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: BASE_URL },
        { '@type': 'ListItem', position: 2, name: `Novels Like ${novelTitle}`, item: `${BASE_URL}/novels-like/${params.slug}` },
      ],
    },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <PageLayout>
        <div style={{ padding: '32px 0 80px', minHeight: '100vh' }}>
          <div className="container">

            <nav style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginBottom: '16px', fontFamily: 'var(--font-mono)' }}>
              <Link href="/" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>Home</Link>
              {' › '}
              <span style={{ color: 'var(--text-primary)' }}>Novels Like {novelTitle}</span>
            </nav>

            <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.3rem,4vw,1.9rem)', fontWeight: 700, marginBottom: '10px' }}>
              Novels Like {novelTitle}
            </h1>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', lineHeight: '1.65', maxWidth: '680px', marginBottom: '28px' }}>
              {description}
            </p>

            {novels.length > 0 ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                {novels.map((novel, i) => <NovelRow key={novel._id} novel={novel} i={i} />)}
              </div>
            ) : (
              <p style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', fontSize: '0.85rem' }}>
                Similar novels will appear here once novels are tagged in the dashboard.{' '}
                <Link href="/browse" style={{ color: 'var(--accent-purple)' }}>Browse all novels →</Link>
              </p>
            )}

            {/* Bottom CTA */}
            <div style={{
              marginTop: '48px', padding: '28px 24px',
              background: 'var(--bg-card)', border: '1px solid var(--border)',
              borderRadius: 'var(--radius-lg)', textAlign: 'center',
            }}>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1rem', marginBottom: '8px' }}>
                Want more recommendations?
              </h2>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '18px' }}>
                Browse our full library of light novels — all free to read online.
              </p>
              <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', flexWrap: 'wrap' }}>
                <Link href="/browse" style={{ padding: '9px 20px', background: 'var(--accent-purple)', color: '#fff', borderRadius: 'var(--radius)', fontFamily: 'var(--font-mono)', fontSize: '0.8rem' }}>
                  Browse All Novels
                </Link>
                <Link href="/rankings" style={{ padding: '9px 20px', border: '1px solid var(--border)', color: 'var(--text-secondary)', borderRadius: 'var(--radius)', fontFamily: 'var(--font-mono)', fontSize: '0.8rem' }}>
                  View Rankings
                </Link>
              </div>
            </div>

          </div>
        </div>
      </PageLayout>
    </>
  );
}
