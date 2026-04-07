import { getNovelServer, getChapterServer } from '@/services/api';
import ReadPageContent from '@/components/ReadPageContent';

export async function generateMetadata({ params }) {
  try {
    const novel = await getNovelServer(params.id);
    const num = parseInt(params.chapterNum) || 1;
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
      alternates: { canonical: novel.slug ? `https://idenwebstudio.online/read/s/${novel.slug}/chapter-${num}` : `https://idenwebstudio.online/read/${params.id}/${num}` },
    };
  } catch {
    return { title: 'Read Chapter | idenwebstudio' };
  }
}

export default function ReadPage() {
  return <ReadPageContent />;
}
