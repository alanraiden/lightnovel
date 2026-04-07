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
  let jsonLd = null;
  try {
    const novel = await getNovelBySlugServer(params.slug);
    jsonLd = {
      '@context': 'https://schema.org',
      '@type': 'Book',
      name: novel.title,
      author: { '@type': 'Person', name: novel.author || 'Unknown' },
      description: novel.description?.slice(0, 160),
      image: novel.cover,
      url: `https://idenwebstudio.online/novel/s/${params.slug}`,
      genre: (novel.genres || []).join(', ') || undefined,
      aggregateRating: novel.rating ? {
        '@type': 'AggregateRating',
        ratingValue: novel.rating,
        ratingCount: novel.ratingCount || 1,
        bestRating: 5,
        worstRating: 1,
      } : undefined,
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
      <NovelPageContent />
    </>
  );
}
