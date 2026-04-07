const BASE = 'https://idenwebstudio.online';
const API  = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

export default async function sitemap() {
  const staticPages = [
    { url: BASE,               changeFrequency: 'daily',   priority: 1.0 },
    { url: `${BASE}/browse`,   changeFrequency: 'daily',   priority: 0.8 },
    { url: `${BASE}/rankings`, changeFrequency: 'weekly',  priority: 0.7 },
    { url: `${BASE}/genres`,   changeFrequency: 'monthly', priority: 0.6 },
    { url: `${BASE}/updates`,  changeFrequency: 'daily',   priority: 0.8 },
  ];

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
      const limit = Math.min(novel.chapterCount, 50);
      for (let i = 1; i <= limit; i++) {
        chapterPages.push({
          url: `${BASE}/read/s/${novel.slug}/chapter-${i}`,
          changeFrequency: 'monthly',
          priority: 0.7,
        });
      }
    }

    return [...staticPages, ...novelPages, ...chapterPages];
  } catch {
    return staticPages;
  }
}
