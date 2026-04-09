const BASE = 'https://idenwebstudio.online';
const API  = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

const GENRES = ['Action','Adventure','Comedy','Drama','Fantasy','Harem','Historical','Horror','Isekai','Josei','Martial Arts','Mecha','Mystery','Psychological','Romance','School Life','Sci-Fi','Slice of Life','Sports','Supernatural','System','Tragedy','Wuxia','Xianxia','Xuanhuan'];

import { SIMILAR_SLUGS } from './novels-like/data';
import { BEST_LIST_SLUGS } from './best/data';

export default async function sitemap() {
  const staticPages = [
    { url: BASE,               changeFrequency: 'daily',   priority: 1.0 },
    { url: `${BASE}/browse`,   changeFrequency: 'daily',   priority: 0.8 },
    { url: `${BASE}/rankings`, changeFrequency: 'weekly',  priority: 0.7 },
    { url: `${BASE}/genres`,   changeFrequency: 'monthly', priority: 0.6 },
    { url: `${BASE}/updates`,  changeFrequency: 'daily',   priority: 0.8 },
  ];

  // "Novels like X" pages — target "[popular title] alternatives" searches
  const novelsLikePages = SIMILAR_SLUGS.map(slug => ({
    url: `${BASE}/novels-like/${slug}`,
    changeFrequency: 'monthly',
    priority: 0.7,
  }));

  // "Best of" list pages — target trope/intent searches
  const bestOfPages = BEST_LIST_SLUGS.map(slug => ({
    url: `${BASE}/best/${slug}`,
    changeFrequency: 'weekly',
    priority: 0.75,
  }));

  // Genre landing pages — each one targets "[genre] web novels" keyword
  const genrePages = GENRES.map(g => ({
    url: `${BASE}/genre/${g.toLowerCase().replace(/\s+/g, '-')}`,
    changeFrequency: 'weekly',
    priority: 0.7,
  }));

  try {
    const { novels } = await fetch(`${API}/novels?limit=1000&sort=new`).then(r => r.json());
    const validNovels = (novels || []).filter(n => n.slug);

    const novelPages = validNovels.map(n => ({
      url: `${BASE}/novel/s/${n.slug}`,
      lastModified: n.updatedAt ? new Date(n.updatedAt) : new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    }));

    const chapterPages = [];
    for (const novel of validNovels.filter(n => n.chapterCount > 0)) {
      // No cap — all chapters indexed (was incorrectly capped at 50 before)
      for (let i = 1; i <= novel.chapterCount; i++) {
        chapterPages.push({
          url: `${BASE}/read/s/${novel.slug}/chapter-${i}`,
          changeFrequency: 'monthly',
          priority: 0.7,
        });
      }
    }

    return [...staticPages, ...novelsLikePages, ...bestOfPages, ...genrePages, ...novelPages, ...chapterPages];
  } catch {
    return [...staticPages, ...novelsLikePages, ...bestOfPages, ...genrePages];
  }
}
