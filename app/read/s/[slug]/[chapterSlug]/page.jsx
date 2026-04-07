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

export default function ReadPage() {
  return <ReadPageContent />;
}
