import { getNovelBySlugServer, getChapterServer } from '@/services/api';
import ReadPageContent from '@/components/ReadPageContent';

export async function generateMetadata({ params }) {
  try {
    const novel = await getNovelBySlugServer(params.slug);
    const num = parseInt(String(params.chapterSlug).replace(/[^0-9]/g, '')) || 1;
    const chapter = await getChapterServer(novel._id, num);
    const title = `${novel.title} Chapter ${num}: ${chapter.title} | idenwebstudio`;
    const desc = `Read ${novel.title} Chapter ${num} - ${chapter.title} free online at idenwebstudio.`;
    return {
      title,
      description: desc,
      openGraph: {
        title,
        description: desc,
        images: novel.cover ? [{ url: novel.cover }] : [],
        type: 'article',
        siteName: 'idenwebstudio',
      },
      twitter: { card: 'summary_large_image', title, description: desc },
      alternates: { canonical: `https://idenwebstudio.online/read/s/${params.slug}/${params.chapterSlug}` },
    };
  } catch {
    return { title: 'Read Chapter | idenwebstudio' };
  }
}

export default async function ReadPage({ params }) {
  let ssrNovel = null;
  let ssrChapter = null;
  let jsonLd = null;

  try {
    const num = parseInt(String(params.chapterSlug).replace(/[^0-9]/g, '')) || 1;
    ssrNovel = await getNovelBySlugServer(params.slug);
    ssrChapter = await getChapterServer(ssrNovel._id, num);

    // Article JSON-LD with isPartOf linking to Book schema + BreadcrumbList
    jsonLd = {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: `${ssrNovel.title} Chapter ${num}: ${ssrChapter.title}`,
      description: `Read ${ssrNovel.title} Chapter ${num} - ${ssrChapter.title} free online at idenwebstudio.`,
      image: ssrNovel.cover || undefined,
      url: `https://idenwebstudio.online/read/s/${params.slug}/${params.chapterSlug}`,
      datePublished: ssrChapter.createdAt || undefined,
      dateModified: ssrChapter.updatedAt || ssrChapter.createdAt || undefined,
      wordCount: ssrChapter.wordCount || undefined,
      articleBody: ssrChapter.content
        ? ssrChapter.content.replace(/<[^>]+>/g, '').slice(0, 500)
        : undefined,
      isPartOf: {
        '@type': 'Book',
        name: ssrNovel.title,
        url: `https://idenwebstudio.online/novel/s/${params.slug}`,
        author: { '@type': 'Person', name: ssrNovel.author || 'Unknown' },
      },
      position: num,
    };
  } catch {}

  // Separate BreadcrumbList schema
  const breadcrumbLd = ssrNovel ? {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://idenwebstudio.online' },
      { '@type': 'ListItem', position: 2, name: ssrNovel.title, item: `https://idenwebstudio.online/novel/s/${params.slug}` },
      { '@type': 'ListItem', position: 3, name: `Chapter ${parseInt(String(params.chapterSlug).replace(/[^0-9]/g, '')) || 1}`, item: `https://idenwebstudio.online/read/s/${params.slug}/${params.chapterSlug}` },
    ],
  } : null;

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
      {/* SSR chapter content for Google crawlability — visually hidden but in DOM */}
      {ssrNovel && ssrChapter && (
        <noscript>
          <h1>{ssrNovel.title} Chapter {parseInt(String(params.chapterSlug).replace(/[^0-9]/g, '')) || 1}: {ssrChapter.title}</h1>
          <div dangerouslySetInnerHTML={{ __html: ssrChapter.content }} />
        </noscript>
      )}
      <ReadPageContent ssrNovel={ssrNovel} ssrChapter={ssrChapter} />
    </>
  );
}
