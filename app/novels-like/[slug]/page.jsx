import Link from 'next/link';
import PageLayout from '@/components/PageLayout';
import NovelCard from '@/components/NovelCard';
import { SIMILAR_DATA } from '../data';

const BASE_URL = 'https://idenwebstudio.online';
const API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

export const dynamic = 'force-dynamic';

// Fetch the novel itself by slug to get its title (used when slug isn't in SIMILAR_DATA)
async function fetchNovelBySlug(slug) {
  try {
    const res = await fetch(`${API}/novels/slug/${slug}`, {
      next: { revalidate: 3600 },
    });
    if (!res.ok) return null;
    return await res.json();
  } catch {
    return null;
  }
}

export async function generateMetadata({ params }) {
  // Use SIMILAR_DATA if available, otherwise fetch the novel from the API
  const staticData = SIMILAR_DATA[params.slug];
  const title = staticData?.title ?? (await fetchNovelBySlug(params.slug))?.title ?? params.slug;

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

// Fetch similar novels from the API — scored automatically by shared tags + genres
async function fetchSimilarNovels(slug, limit = 8) {
  try {
    const res = await fetch(
      `${API}/novels/slug/${slug}/similar?limit=${limit}`,
      { next: { revalidate: 3600 } }
    );
    if (!res.ok) return [];
    const data = await res.json();
    return data.novels || [];
  } catch {
    return [];
  }
}

export default async function NovelsLikePage({ params }) {
  // Try static data first; fall back to fetching the novel from the API
  const staticData = SIMILAR_DATA[params.slug];
  let novelTitle = staticData?.title;
  let description = staticData?.description;

  if (!novelTitle) {
    const novel = await fetchNovelBySlug(params.slug);
    if (!novel) {
      // Novel doesn't exist in DB at all — show not found
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
    // Auto-generate a generic description from the novel's own description
    description = novel.description
      ? `${novel.description.slice(0, 200).trim()}... If this novel resonated with you, these similar reads are worth checking out.`
      : `If you enjoyed ${novelTitle}, here are the most similar novels on our site based on shared tags and genres.`;
  }

  const novels = await fetchSimilarNovels(params.slug, 8);

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
        <div style={{ padding: '40px 0 80px', minHeight: '100vh' }}>
          <div className="container">

            <nav style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '20px', fontFamily: 'var(--font-mono)' }}>
              <Link href="/" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>Home</Link>
              {' › '}
              <span style={{ color: 'var(--text-primary)' }}>Novels Like {novelTitle}</span>
            </nav>

            <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', fontWeight: 700, marginBottom: '16px' }}>
              Novels Like {novelTitle}
            </h1>
            <p style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-body)', fontSize: '0.95rem', lineHeight: '1.7', maxWidth: '720px', marginBottom: '48px' }}>
              {description}
            </p>

            {novels.length > 0 ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
                {novels.map((novel, i) => {
                  const href = novel.slug ? `/novel/s/${novel.slug}` : `/novel/${novel._id}`;
                  return (
                    <div key={novel._id} style={{
                      display: 'grid',
                      gridTemplateColumns: '160px 1fr',
                      gap: '24px',
                      background: 'var(--bg-card)',
                      border: '1px solid var(--border)',
                      borderRadius: 'var(--radius-lg)',
                      overflow: 'hidden',
                    }}>
                      <Link href={href} style={{ display: 'block' }}>
                        <img
                          src={novel.cover || 'https://images.unsplash.com/photo-1578632767115-351597cf2477?w=400&h=600&fit=crop'}
                          alt={novel.title}
                          style={{ width: '100%', aspectRatio: '3/4', objectFit: 'cover', display: 'block' }}
                        />
                      </Link>

                      <div style={{ padding: '24px 24px 24px 0', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
                          <span style={{
                            fontFamily: 'var(--font-mono)', fontSize: '0.7rem',
                            color: 'var(--accent-orange)', letterSpacing: '0.1em',
                            background: 'rgba(255,107,43,0.1)', padding: '2px 8px', borderRadius: '999px',
                          }}>
                            #{i + 1}
                          </span>
                          {(novel.genres || []).slice(0, 2).map(g => (
                            <Link key={g} href={`/genre/${g.toLowerCase().replace(/\s+/g, '-')}`}
                              style={{ fontSize: '0.72rem', color: 'var(--text-muted)', border: '1px solid var(--border)', padding: '2px 8px', borderRadius: '999px', fontFamily: 'var(--font-mono)' }}>
                              {g}
                            </Link>
                          ))}
                        </div>

                        <Link href={href} style={{ textDecoration: 'none' }}>
                          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.2rem', fontWeight: 600, color: 'var(--text-primary)' }}>
                            {novel.title}
                          </h2>
                        </Link>

                        {(novel.tags || []).length > 0 && (
                          <div style={{
                            background: 'rgba(139,92,246,0.06)',
                            border: '1px solid var(--border-accent)',
                            borderRadius: 'var(--radius)',
                            padding: '10px 14px',
                            fontSize: '0.85rem',
                            color: 'var(--text-secondary)',
                            fontFamily: 'var(--font-body)',
                            lineHeight: '1.6',
                          }}>
                            <span style={{ color: 'var(--accent-purple)', fontFamily: 'var(--font-mono)', fontSize: '0.72rem', display: 'block', marginBottom: '6px' }}>
                              SIMILAR TAGS
                            </span>
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                              {(novel.tags || []).slice(0, 6).map(tag => (
                                <span key={tag} style={{
                                  fontSize: '0.72rem', padding: '2px 8px',
                                  background: 'rgba(139,92,246,0.1)', borderRadius: '999px',
                                  color: 'var(--text-secondary)', fontFamily: 'var(--font-mono)',
                                }}>
                                  {tag}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}

                        <div style={{ display: 'flex', gap: '16px', alignItems: 'center', fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                          <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="var(--accent-gold)">
                              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                            </svg>
                            {novel.rating || '0.0'}
                          </span>
                          <span>{novel.chapterCount || 0} chapters</span>
                          <span className={`badge badge-${novel.status}`}>{novel.status}</span>
                        </div>

                        <div style={{ marginTop: 'auto' }}>
                          <Link href={href} style={{
                            display: 'inline-flex', alignItems: 'center', gap: '6px',
                            background: 'var(--accent-purple)', color: '#fff',
                            padding: '8px 18px', borderRadius: 'var(--radius)',
                            fontSize: '0.82rem', fontFamily: 'var(--font-mono)',
                            textDecoration: 'none',
                          }}>
                            Start Reading →
                          </Link>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <p style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', fontSize: '0.85rem' }}>
                Similar novels will appear here once novels are tagged in the dashboard.{' '}
                <Link href="/browse" style={{ color: 'var(--accent-purple)' }}>Browse all novels →</Link>
              </p>
            )}

            <div style={{ marginTop: '56px', padding: '32px', background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', textAlign: 'center' }}>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.1rem', marginBottom: '10px' }}>
                Want more recommendations?
              </h2>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', marginBottom: '20px', fontFamily: 'var(--font-body)' }}>
                Browse our full library of Korean web novels and light novels — all free to read online.
              </p>
              <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
                <Link href="/browse" style={{ padding: '10px 22px', background: 'var(--accent-purple)', color: '#fff', borderRadius: 'var(--radius)', fontFamily: 'var(--font-mono)', fontSize: '0.82rem' }}>
                  Browse All Novels
                </Link>
                <Link href="/rankings" style={{ padding: '10px 22px', border: '1px solid var(--border)', color: 'var(--text-secondary)', borderRadius: 'var(--radius)', fontFamily: 'var(--font-mono)', fontSize: '0.82rem' }}>
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
