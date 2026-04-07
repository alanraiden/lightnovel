import Link from 'next/link';
import NovelCard from '@/components/NovelCard';
import PageLayout from '@/components/PageLayout';

const GENRES = ['Action','Adventure','Comedy','Drama','Fantasy','Harem','Historical','Horror','Isekai','Josei','Martial Arts','Mecha','Mystery','Psychological','Romance','School Life','Sci-Fi','Slice of Life','Sports','Supernatural','System','Tragedy','Wuxia','Xianxia','Xuanhuan'];

function slugToGenre(slug) {
  return GENRES.find(g => g.toLowerCase().replace(/\s+/g, '-') === slug) || null;
}

export function generateStaticParams() {
  return GENRES.map(g => ({ slug: g.toLowerCase().replace(/\s+/g, '-') }));
}

export async function generateMetadata({ params }) {
  const genre = slugToGenre(params.slug);
  if (!genre) return { title: 'Genre | idenwebstudio' };
  return {
    title: `Best ${genre} Web Novels | Read Free at idenwebstudio`,
    description: `Read the best ${genre} Korean web novels and light novels free online. Browse our collection of top-rated ${genre} novels updated daily.`,
    alternates: { canonical: `https://idenwebstudio.online/genre/${params.slug}` },
    openGraph: {
      title: `Best ${genre} Web Novels`,
      description: `Discover top-rated ${genre} Korean web novels — read free online at idenwebstudio.`,
      type: 'website',
      siteName: 'idenwebstudio',
    },
  };
}

async function fetchGenreNovels(genre) {
  try {
    const BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
    const res = await fetch(`${BASE}/novels?genre=${encodeURIComponent(genre)}&limit=24&sort=rating`, { next: { revalidate: 3600 } });
    const data = await res.json();
    return data.novels || [];
  } catch {
    return [];
  }
}

export default async function GenrePage({ params }) {
  const genre = slugToGenre(params.slug);

  if (!genre) {
    return (
      <PageLayout>
        <div style={{ padding: '80px 0', textAlign: 'center' }}>
          <h1>Genre not found</h1>
          <Link href="/genres">Browse all genres</Link>
        </div>
      </PageLayout>
    );
  }

  const novels = await fetchGenreNovels(genre);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: `Best ${genre} Web Novels`,
    description: `Read the best ${genre} Korean web novels and light novels free online at idenwebstudio.`,
    url: `https://idenwebstudio.online/genre/${params.slug}`,
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://idenwebstudio.online' },
        { '@type': 'ListItem', position: 2, name: 'Genres', item: 'https://idenwebstudio.online/genres' },
        { '@type': 'ListItem', position: 3, name: genre, item: `https://idenwebstudio.online/genre/${params.slug}` },
      ],
    },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <PageLayout>
        <div style={{ padding: '40px 0 80px', minHeight: '100vh' }}>
          <div className="container">
            {/* Static H1 + description — fully crawlable */}
            <nav style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '20px', fontFamily: 'var(--font-mono)' }}>
              <Link href="/" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>Home</Link>
              {' › '}
              <Link href="/genres" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>Genres</Link>
              {' › '}
              <span style={{ color: 'var(--text-primary)' }}>{genre}</span>
            </nav>

            <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', fontWeight: 700, marginBottom: '8px' }}>
              Best {genre} Web Novels
            </h1>
            <p style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', fontSize: '0.82rem', marginBottom: '40px' }}>
              Read the top-rated {genre} Korean web novels and light novels free online. Updated daily with new chapters.
            </p>

            {novels.length > 0 ? (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', gap: '20px' }}>
                {novels.map(novel => (
                  <NovelCard key={novel._id} novel={novel} />
                ))}
              </div>
            ) : (
              <p style={{ color: 'var(--text-muted)' }}>
                No {genre} novels found yet. <Link href="/browse">Browse all novels →</Link>
              </p>
            )}

            <div style={{ marginTop: '48px', padding: '24px', background: 'var(--bg-card)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border)' }}>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.1rem', marginBottom: '12px' }}>
                About {genre} Web Novels
              </h2>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: '1.7' }}>
                {genre} is one of the most popular genres in Korean web novels and light novels. 
                Browse our collection of {genre} stories — from classic works to the latest releases — 
                all available to read for free online. New chapters added daily.
              </p>
              <div style={{ marginTop: '16px', display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                {GENRES.filter(g => g !== genre).slice(0, 6).map(g => (
                  <Link
                    key={g}
                    href={`/genre/${g.toLowerCase().replace(/\s+/g, '-')}`}
                    style={{ fontSize: '0.78rem', color: 'var(--text-muted)', textDecoration: 'none', padding: '4px 10px', border: '1px solid var(--border)', borderRadius: '999px' }}
                  >
                    {g}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </PageLayout>
    </>
  );
}
