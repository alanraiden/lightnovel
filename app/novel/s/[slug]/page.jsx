import { getNovelBySlugServer } from '@/services/api';
import NovelPageContent from '@/app/novel/NovelPageContent';

export async function generateStaticParams() {
  try {
    const BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
    const { novels } = await fetch(`${BASE}/novels?limit=200&sort=views`).then(r => r.json());
    return (novels || []).filter(n => n.slug).map(n => ({ slug: n.slug }));
  } catch { return []; }
}

export async function generateMetadata({ params }) {
  try {
    const novel = await getNovelBySlugServer(params.slug);
    // Meta description capped at 160 chars (correct for search snippets)
    const desc = novel.description?.slice(0, 160) || `Read ${novel.title} by ${novel.author} free online at idenwebstudio.`;
    return {
      title: `${novel.title} | Read Free at idenwebstudio`,
      description: desc,
      openGraph: {
        title: novel.title,
        description: desc,
        images: novel.cover ? [{ url: novel.cover }] : [{ url: 'https://idenwebstudio.online/og-image.jpg' }],
        type: 'book',
        siteName: 'idenwebstudio',
      },
      twitter: { card: 'summary_large_image', title: novel.title, description: desc, images: novel.cover ? [novel.cover] : [] },
      alternates: { canonical: `https://idenwebstudio.online/novel/s/${params.slug}` },
    };
  } catch {
    return { title: 'Novel | idenwebstudio' };
  }
}

export default async function NovelPage({ params }) {
  let novel = null;
  let jsonLd = null;
  let breadcrumbLd = null;

  try {
    novel = await getNovelBySlugServer(params.slug);

    // Book JSON-LD — use FULL description (not truncated to 160 chars)
    jsonLd = {
      '@context': 'https://schema.org',
      '@type': 'Book',
      name: novel.title,
      author: { '@type': 'Person', name: novel.author || 'Unknown' },
      description: novel.description || undefined,  // Full description for richer entity understanding
      image: novel.cover,
      url: `https://idenwebstudio.online/novel/s/${params.slug}`,
      genre: (novel.genres || []).join(', ') || undefined,
      numberOfPages: novel.chapterCount || undefined,
      aggregateRating: novel.rating ? {
        '@type': 'AggregateRating',
        ratingValue: novel.rating,
        ratingCount: novel.ratingCount || 1,
        bestRating: 5,
        worstRating: 1,
      } : undefined,
    };

    // BreadcrumbList for site hierarchy and search result breadcrumb display
    breadcrumbLd = {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://idenwebstudio.online' },
        { '@type': 'ListItem', position: 2, name: novel.title, item: `https://idenwebstudio.online/novel/s/${params.slug}` },
      ],
    };
  } catch {}

  return (
    <>
      {jsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      )}
      {breadcrumbLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
        />
      )}
      {/* SSR the H1 + description so crawlers see them in initial HTML */}
      {novel && (
        <noscript>
          <h1>{novel.title}</h1>
          {novel.author && <p>By {novel.author}</p>}
          {novel.description && <p>{novel.description}</p>}
          {novel.genres?.length > 0 && <p>Genres: {novel.genres.join(', ')}</p>}
        </noscript>
      )}
      <NovelPageContent ssrNovel={novel} />
    </>
  );
}
