import Link from 'next/link';
import { notFound } from 'next/navigation';
import NovelCard from '@/components/NovelCard';
import PageLayout from '@/components/PageLayout';

// ── All genres + SEO content ──────────────────────────────────────────────────
const GENRE_DATA = {
  'action': {
    name: 'Action',
    headline: 'Best Korean Action Web Novels — Read Free Online',
    description: 'Dive into heart-pounding Korean action web novels featuring intense battles, powerful warriors, and epic showdowns. From martial arts masters to modern-day hunters, action web novels deliver non-stop excitement and jaw-dropping fight sequences that keep you turning pages.',
    whyRead: 'Action web novels are beloved for their fast pacing, satisfying power progression, and spectacular combat. Korean authors excel at choreographing battles that feel visceral and earned, with protagonists who grow stronger through struggle.',
    keywords: ['action', 'battles', 'fight scenes', 'power progression', 'warriors'],
    related: ['martial-arts', 'fantasy', 'system', 'isekai'],
  },
  'adventure': {
    name: 'Adventure',
    headline: 'Best Korean Adventure Web Novels — Read Free Online',
    description: 'Embark on epic journeys through Korean adventure web novels. Follow heroes exploring unknown lands, uncovering ancient secrets, and facing impossible odds across vast fantasy worlds and treacherous dungeons.',
    whyRead: 'Adventure web novels capture the thrill of exploration and discovery. Korean authors build incredibly detailed worlds packed with mysteries, hidden treasures, and dangerous challenges that make every chapter feel like a new expedition.',
    keywords: ['adventure', 'exploration', 'dungeons', 'quests', 'world-building'],
    related: ['fantasy', 'action', 'isekai', 'system'],
  },
  'comedy': {
    name: 'Comedy',
    headline: 'Funniest Korean Comedy Web Novels — Read Free Online',
    description: 'Laugh out loud with the funniest Korean comedy web novels. These stories blend sharp wit, absurd situations, and lovable characters into stories that are impossible to put down. Perfect for readers who want entertainment with a smile.',
    whyRead: 'Korean comedy web novels are masters of timing and situational humor. Whether it\'s an overpowered protagonist pretending to be weak or a villainess trying not to follow a death flag, the comedy lands with perfect cultural wit.',
    keywords: ['comedy', 'funny', 'humor', 'lighthearted', 'slice of life'],
    related: ['romance', 'school-life', 'slice-of-life', 'harem'],
  },
  'drama': {
    name: 'Drama',
    headline: 'Best Korean Drama Web Novels — Emotional Stories Online',
    description: 'Experience deeply emotional Korean drama web novels filled with complex relationships, heartbreaking choices, and unforgettable character arcs. These stories explore the full spectrum of human emotion with the intensity Korean storytelling is famous for.',
    whyRead: 'Korean drama web novels mirror the emotional depth of K-dramas but with far more detailed storytelling. Complex characters face difficult choices, and the emotional payoff after chapters of buildup is unmatched in any other medium.',
    keywords: ['drama', 'emotional', 'relationships', 'character development', 'Korean drama'],
    related: ['romance', 'tragedy', 'psychological', 'josei'],
  },
  'fantasy': {
    name: 'Fantasy',
    headline: 'Best Korean Fantasy Web Novels — Read Free Online',
    description: 'Explore breathtaking Korean fantasy web novels set in richly imagined worlds full of magic, mythical creatures, and ancient kingdoms. From cultivation realms to modern-day magic academies, Korean fantasy offers an incredible variety of settings and adventures.',
    whyRead: 'Korean fantasy web novels are renowned for their exceptional world-building. Authors construct entire mythologies, magic systems, and political structures that feel as real as our own world. The blend of Eastern and Western fantasy elements creates something truly unique.',
    keywords: ['fantasy', 'magic', 'fantasy world', 'Korean fantasy novels', 'magic system'],
    related: ['isekai', 'action', 'system', 'wuxia'],
  },
  'harem': {
    name: 'Harem',
    headline: 'Best Korean Harem Web Novels — Read Free Online',
    description: 'Read popular Korean harem web novels featuring protagonists surrounded by compelling supporting characters across fantasy, school, and isekai settings. These stories blend romance, adventure, and comedy into entertaining reads.',
    whyRead: 'Korean harem web novels often use the genre as a vehicle for rich character interactions and complex relationship dynamics. Each character gets meaningful development, creating an ensemble cast that readers genuinely invest in.',
    keywords: ['harem', 'romance', 'multiple heroines', 'light novel', 'fantasy harem'],
    related: ['romance', 'isekai', 'school-life', 'comedy'],
  },
  'historical': {
    name: 'Historical',
    headline: 'Best Korean Historical Web Novels — Read Free Online',
    description: 'Travel through time with Korean historical web novels set in ancient Korea, China, and fictional historical dynasties. These stories blend political intrigue, romance, and action against meticulously researched historical backdrops.',
    whyRead: 'Korean historical web novels offer a window into East Asian history and culture that most Western readers rarely encounter. The political scheming, court intrigue, and cultural detail make these novels both entertaining and educational.',
    keywords: ['historical', 'ancient Korea', 'historical fiction', 'period drama', 'historical romance'],
    related: ['romance', 'drama', 'wuxia', 'xianxia'],
  },
  'horror': {
    name: 'Horror',
    headline: 'Best Korean Horror Web Novels — Scary Stories Online',
    description: 'Experience spine-chilling Korean horror web novels that blend psychological terror, supernatural threats, and survival horror. Korean horror storytelling has a distinctive style that goes beyond jump scares into deep dread and atmospheric terror.',
    whyRead: 'Korean horror web novels excel at building slow, suffocating dread. Drawing on East Asian supernatural folklore — vengeful spirits, cursed objects, and creatures from Korean mythology — these novels offer scares you won\'t find anywhere else.',
    keywords: ['horror', 'supernatural horror', 'psychological horror', 'Korean horror', 'scary'],
    related: ['psychological', 'supernatural', 'mystery', 'drama'],
  },
  'isekai': {
    name: 'Isekai',
    headline: 'Best Korean Isekai Web Novels — Transported to Another World',
    description: 'Read the best Korean isekai web novels where ordinary people are transported to fantasy worlds, games, or alternate realities. Korean isekai goes beyond the formula with fresh twists on reincarnation, regression, and transmigration stories.',
    whyRead: 'Korean isekai novels have reinvented the genre. Where Japanese isekai often follows familiar templates, Korean authors constantly subvert expectations — villainesses avoiding death flags, protagonists with foreknowledge changing outcomes, and heroes who were villains in past lives.',
    keywords: ['isekai', 'transmigration', 'reincarnation', 'another world', 'Korean isekai novels'],
    related: ['fantasy', 'system', 'action', 'romance'],
  },
  'josei': {
    name: 'Josei',
    headline: 'Best Korean Josei Web Novels — Romance for Adults',
    description: 'Discover elegant Korean josei web novels — romantic stories written for adult women featuring mature relationships, complex emotions, and sophisticated storytelling. These novels offer depth and realism that younger-targeted romance often lacks.',
    whyRead: 'Korean josei web novels tackle romance with an emotional honesty that\'s rare in the genre. Characters are allowed to be complicated, relationships take time to develop, and the stories respect readers\' intelligence with nuanced portrayals of adult life and love.',
    keywords: ['josei', 'adult romance', 'mature romance', 'Korean romance', 'women\'s fiction'],
    related: ['romance', 'drama', 'historical', 'slice-of-life'],
  },
  'martial-arts': {
    name: 'Martial Arts',
    headline: 'Best Korean Martial Arts Web Novels — Cultivation & Combat',
    description: 'Master the art of combat through Korean martial arts web novels featuring legendary warriors, secret techniques, and the pursuit of the ultimate fighting form. These stories follow practitioners ascending through martial ranks to become the strongest under heaven.',
    whyRead: 'Korean martial arts web novels blend the classic Chinese wuxia tradition with Korean storytelling sensibilities. The result is stories with incredibly detailed combat systems, satisfying power progression, and a cultural respect for discipline and mastery.',
    keywords: ['martial arts', 'cultivation', 'kung fu', 'wuxia', 'martial arts novel'],
    related: ['wuxia', 'xianxia', 'action', 'fantasy'],
  },
  'mecha': {
    name: 'Mecha',
    headline: 'Best Korean Mecha Web Novels — Giant Robot Stories Online',
    description: 'Pilot giant mechs through Korean mecha web novels featuring futuristic warfare, advanced technology, and humanity\'s struggle for survival. Korean mecha combines technical detail with compelling human drama.',
    whyRead: 'Korean mecha web novels bring fresh energy to the giant robot genre. Beyond the spectacle of mech battles, these stories explore themes of identity, sacrifice, and what it means to be human in a world where technology and flesh have merged.',
    keywords: ['mecha', 'giant robots', 'sci-fi action', 'mech pilot', 'mecha novel'],
    related: ['sci-fi', 'action', 'system', 'adventure'],
  },
  'mystery': {
    name: 'Mystery',
    headline: 'Best Korean Mystery Web Novels — Crime & Detective Stories',
    description: 'Unravel complex mysteries in Korean mystery web novels featuring brilliant detectives, impossible crimes, and twists that will leave you speechless. Korean mystery authors are masters of plotting intricate puzzles with satisfying solutions.',
    whyRead: 'Korean mystery web novels raise the bar for the genre with intricate, logic-tight plots that reward careful reading. The cultural setting adds unique elements — Korean social dynamics, historical contexts, and supernatural elements blend with classic mystery tropes.',
    keywords: ['mystery', 'detective', 'crime', 'thriller', 'whodunit'],
    related: ['psychological', 'horror', 'drama', 'supernatural'],
  },
  'psychological': {
    name: 'Psychological',
    headline: 'Best Korean Psychological Web Novels — Mind-Bending Stories',
    description: 'Challenge your mind with Korean psychological web novels that explore the darkest corners of human consciousness. These stories blur the line between reality and illusion, sanity and madness, creating an unforgettable reading experience.',
    whyRead: 'Korean psychological web novels are genuinely unsettling in the best way. Authors understand how to weaponize unreliable narrators, twist reader expectations, and create a sense of growing unease that makes you question everything you\'ve read.',
    keywords: ['psychological', 'mind games', 'thriller', 'unreliable narrator', 'dark'],
    related: ['horror', 'mystery', 'drama', 'tragedy'],
  },
  'romance': {
    name: 'Romance',
    headline: 'Best Korean Romance Web Novels — Love Stories Read Free',
    description: 'Fall in love with the best Korean romance web novels featuring swoon-worthy relationships, unforgettable couples, and emotional journeys from first meeting to happily ever after. Korean romance is celebrated worldwide for its emotional depth and satisfying slow burns.',
    whyRead: 'Korean romance web novels have taken the world by storm for good reason. The slow-burn tension, well-developed leads, and emotional payoff are simply superior. Whether you prefer enemies-to-lovers, second-chance romance, or arranged marriage plots, Korean romance delivers.',
    keywords: ['romance', 'Korean romance novels', 'love story', 'romantic', 'love interest'],
    related: ['drama', 'historical', 'isekai', 'josei'],
  },
  'school-life': {
    name: 'School Life',
    headline: 'Best Korean School Life Web Novels — Academy Stories Online',
    description: 'Relive school days through Korean school life web novels set in academies, high schools, and magic universities. These stories blend friendship, first love, rivalries, and the challenges of growing up with fantasy and modern settings.',
    whyRead: 'Korean school life web novels capture the intensity and emotion of youth with remarkable accuracy. The competitive academy settings often serve as crucibles where characters forge lifelong bonds, discover their powers, and confront who they want to become.',
    keywords: ['school life', 'academy', 'school setting', 'students', 'school romance'],
    related: ['romance', 'comedy', 'action', 'system'],
  },
  'sci-fi': {
    name: 'Sci-Fi',
    headline: 'Best Korean Sci-Fi Web Novels — Science Fiction Online',
    description: 'Explore the future through Korean sci-fi web novels featuring space exploration, advanced AI, post-apocalyptic survival, and technology beyond imagination. Korean sci-fi blends Eastern philosophical ideas with hard science for a unique futuristic vision.',
    whyRead: 'Korean sci-fi web novels explore ideas that Western science fiction rarely touches — collective consciousness, the ethics of memory modification, and what Korean society might look like centuries from now. The blend of philosophy and action is unlike anything else.',
    keywords: ['sci-fi', 'science fiction', 'space opera', 'cyberpunk', 'futuristic'],
    related: ['mecha', 'system', 'action', 'mystery'],
  },
  'slice-of-life': {
    name: 'Slice of Life',
    headline: 'Best Korean Slice of Life Web Novels — Relaxing Stories Online',
    description: 'Unwind with heartwarming Korean slice of life web novels that find beauty in everyday moments. From cozy cooking stories to peaceful farming in another world, these novels offer a gentle escape from the everyday.',
    whyRead: 'Korean slice of life web novels have mastered the art of the "cozy read." There\'s no world-ending threat, just the quiet satisfaction of watching a character build a life, form connections, and find happiness in small things. Deeply relaxing and surprisingly touching.',
    keywords: ['slice of life', 'cozy novel', 'relaxing', 'everyday life', 'heartwarming'],
    related: ['comedy', 'romance', 'josei', 'drama'],
  },
  'sports': {
    name: 'Sports',
    headline: 'Best Korean Sports Web Novels — Athletic Stories Online',
    description: 'Feel the thrill of competition through Korean sports web novels covering everything from esports and basketball to archery and beyond. These novels combine the tension of athletic competition with deep character development and team dynamics.',
    whyRead: 'Korean sports web novels excel at conveying the physical and mental demands of competitive sports. The underdog story, the training montage, and the big game moment are elevated by authors who clearly understand and love their chosen sports.',
    keywords: ['sports', 'esports', 'competition', 'athlete', 'sports novel'],
    related: ['action', 'school-life', 'comedy', 'drama'],
  },
  'supernatural': {
    name: 'Supernatural',
    headline: 'Best Korean Supernatural Web Novels — Read Free Online',
    description: 'Encounter the world beyond in Korean supernatural web novels featuring ghosts, demons, divine beings, and mysterious powers hidden within ordinary reality. Korean supernatural fiction draws on a rich tradition of folklore and mythology.',
    whyRead: 'Korean supernatural web novels are deeply rooted in Korean folk religion, shamanism, and mythology — creating a supernatural world that feels ancient and authentic. The blend of the mundane and the uncanny creates a distinctive atmosphere unlike Western supernatural fiction.',
    keywords: ['supernatural', 'paranormal', 'ghosts', 'demons', 'Korean mythology'],
    related: ['horror', 'mystery', 'fantasy', 'system'],
  },
  'system': {
    name: 'System',
    headline: 'Best Korean System Web Novels — Game-Like Power Novels',
    description: 'Level up with the best Korean system web novels where protagonists gain game-like abilities, stat screens, and skill trees in real life. These novels pioneered the "system fantasy" genre that has taken the world by storm.',
    whyRead: 'Korean system web novels invented a genre that has spread worldwide. The satisfying progression loop — earn experience, level up, unlock skills, get stronger — taps into something deeply rewarding. Korean authors have refined this formula into an art form.',
    keywords: ['system', 'leveling system', 'stats', 'game elements', 'system fantasy', 'skill tree'],
    related: ['isekai', 'action', 'fantasy', 'adventure'],
  },
  'tragedy': {
    name: 'Tragedy',
    headline: 'Best Korean Tragedy Web Novels — Emotionally Powerful Stories',
    description: 'Prepare your heart for the best Korean tragedy web novels — stories of sacrifice, loss, and devastating inevitability that will stay with you long after the final chapter. Korean tragedy is written with a care and intention that transforms sadness into something beautiful.',
    whyRead: 'Korean tragedy web novels understand that the most powerful stories are often the saddest ones. These novels don\'t wallow in misery — they find meaning in loss, hope in despair, and make you care so deeply about characters that their pain feels like your own.',
    keywords: ['tragedy', 'sad ending', 'emotional', 'bittersweet', 'Korean tragedy'],
    related: ['drama', 'psychological', 'romance', 'horror'],
  },
  'wuxia': {
    name: 'Wuxia',
    headline: 'Best Wuxia Web Novels in Korean — Martial World Stories',
    description: 'Enter the Jianghu with the best wuxia web novels featuring legendary swordsmen, ancient martial sects, and the code of the martial world. These stories follow warriors on the path to mastery in a world governed by strength and honor.',
    whyRead: 'Wuxia web novels transport readers to a world with its own laws, politics, and philosophy. The martial world (Jianghu) operates by a fascinating moral code, and watching characters navigate its complex hierarchy while growing in power is endlessly engaging.',
    keywords: ['wuxia', 'jianghu', 'martial world', 'swordsman', 'Chinese martial arts'],
    related: ['xianxia', 'martial-arts', 'action', 'historical'],
  },
  'xianxia': {
    name: 'Xianxia',
    headline: 'Best Xianxia Web Novels — Cultivation & Immortality Stories',
    description: 'Ascend to immortality through the best xianxia web novels featuring cultivation, spiritual energy, heavenly tribulations, and the eternal pursuit of the Dao. These novels blend Taoist philosophy with epic fantasy on a cosmic scale.',
    whyRead: 'Xianxia web novels operate on a scale that no other genre matches — from mortal to god, from a single village to the entire universe. The cultivation system, spiritual philosophy, and astronomical stakes create an addictive power fantasy unlike anything else.',
    keywords: ['xianxia', 'cultivation', 'immortality', 'dao', 'cultivation novel'],
    related: ['wuxia', 'xuanhuan', 'martial-arts', 'fantasy'],
  },
  'xuanhuan': {
    name: 'Xuanhuan',
    headline: 'Best Xuanhuan Web Novels — Chinese Fantasy Stories Online',
    description: 'Explore unique xuanhuan web novels that blend Eastern mythology, Western fantasy elements, and original world-building into something entirely new. Xuanhuan stories are known for their creative freedom and epic scope.',
    whyRead: 'Xuanhuan is the most creatively free of the Eastern fantasy genres — not bound by strict Taoist philosophy like xianxia or martial world rules like wuxia. Authors can blend dragons, gods, technology, and magic in ways that create genuinely surprising worlds.',
    keywords: ['xuanhuan', 'Chinese fantasy', 'Eastern fantasy', 'cultivation fantasy', 'xuanhuan novel'],
    related: ['xianxia', 'wuxia', 'fantasy', 'action'],
  },
};

const ALL_GENRES = Object.keys(GENRE_DATA);

function slugToData(slug) {
  return GENRE_DATA[slug] || null;
}

// ── Static params — pre-builds all genre pages at deploy time ─────────────────
export function generateStaticParams() {
  return ALL_GENRES.map(slug => ({ slug }));
}

// ── Metadata — unique per genre ───────────────────────────────────────────────
export async function generateMetadata({ params }) {
  const g = slugToData(params.slug);
  if (!g) return { title: 'Genre | idenwebstudio' };

  return {
    title: g.headline,
    description: g.description.slice(0, 160),
    keywords: g.keywords.join(', '),
    alternates: { canonical: `https://www.idenwebstudio.online/genre/${params.slug}` },
    openGraph: {
      title: g.headline,
      description: g.description.slice(0, 160),
      type: 'website',
      siteName: 'idenwebstudio',
      url: `https://www.idenwebstudio.online/genre/${params.slug}`,
    },
    twitter: {
      card: 'summary',
      title: g.headline,
      description: g.description.slice(0, 160),
    },
  };
}

// ── Fetch novels server-side ──────────────────────────────────────────────────
async function fetchGenreNovels(genre) {
  try {
    const BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
    const res  = await fetch(
      `${BASE}/novels?genre=${encodeURIComponent(genre)}&limit=24&sort=rating`,
      { next: { revalidate: 3600 } }
    );
    const data = await res.json();
    return data.novels || [];
  } catch {
    return [];
  }
}

// ── Page ──────────────────────────────────────────────────────────────────────
export default async function GenrePage({ params }) {
  const g = slugToData(params.slug);
  if (!g) notFound();

  const novels = await fetchGenreNovels(g.name);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type':    'CollectionPage',
    name:        g.headline,
    description: g.description.slice(0, 200),
    url:         `https://www.idenwebstudio.online/genre/${params.slug}`,
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home',   item: 'https://www.idenwebstudio.online' },
        { '@type': 'ListItem', position: 2, name: 'Genres', item: 'https://www.idenwebstudio.online/genres' },
        { '@type': 'ListItem', position: 3, name: g.name,   item: `https://www.idenwebstudio.online/genre/${params.slug}` },
      ],
    },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <PageLayout>
        <div style={{ padding: '40px 0 80px', minHeight: '100vh' }}>
          <div className="container">

            {/* Breadcrumb */}
            <nav aria-label="Breadcrumb" style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginBottom: '20px', fontFamily: 'var(--font-mono)', display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap' }}>
              <Link href="/"       style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>Home</Link>
              <span>›</span>
              <Link href="/genres" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>Genres</Link>
              <span>›</span>
              <span style={{ color: 'var(--text-primary)' }}>{g.name}</span>
            </nav>

            {/* H1 + description — plain HTML for Google */}
            <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.5rem, 3vw, 2.2rem)', fontWeight: 700, marginBottom: '14px', lineHeight: 1.2, color: 'var(--text-primary)' }}>
              {g.headline}
            </h1>

            <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: 1.75, marginBottom: '12px', maxWidth: '720px' }}>
              {g.description}
            </p>

            <p style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', fontSize: '0.78rem', marginBottom: '40px' }}>
              {novels.length > 0 ? `${novels.length} novels available` : 'Novels coming soon'} · Free to read · Updated daily
            </p>

            {/* Novel grid */}
            {novels.length > 0 ? (
              <>
                <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.1rem', fontWeight: 700, marginBottom: '20px', color: 'var(--text-primary)' }}>
                  Top {g.name} Novels
                </h2>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(155px, 1fr))', gap: '20px', marginBottom: '56px' }}>
                  {novels.map(novel => (
                    <NovelCard key={novel._id} novel={novel} />
                  ))}
                </div>
              </>
            ) : (
              <div style={{ textAlign: 'center', padding: '60px 20px', color: 'var(--text-muted)', marginBottom: '40px' }}>
                <div style={{ fontSize: '3rem', marginBottom: '12px' }}>📚</div>
                <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem' }}>
                  No {g.name} novels yet. <Link href="/browse" style={{ color: 'var(--accent-orange)' }}>Browse all novels →</Link>
                </p>
              </div>
            )}

            {/* Why read this genre — unique content per genre, good for SEO */}
            <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: '14px', padding: '28px 32px', marginBottom: '32px' }}>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.1rem', fontWeight: 700, marginBottom: '12px', color: 'var(--text-primary)' }}>
                Why Read {g.name} Web Novels?
              </h2>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.75, margin: 0 }}>
                {g.whyRead}
              </p>
            </div>

            {/* Related genres */}
            <div style={{ marginBottom: '32px' }}>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1rem', fontWeight: 700, marginBottom: '14px', color: 'var(--text-primary)' }}>
                Related Genres
              </h2>
              <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                {g.related.map(relSlug => {
                  const rel = GENRE_DATA[relSlug];
                  if (!rel) return null;
                  return (
                    <Link key={relSlug} href={`/genre/${relSlug}`}
                      style={{ padding: '8px 16px', background: 'var(--bg-elevated)', border: '1px solid var(--border)', borderRadius: '999px', color: 'var(--text-secondary)', textDecoration: 'none', fontSize: '0.82rem', fontFamily: 'var(--font-mono)', transition: 'all 0.2s' }}
                      onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--accent-purple)'; e.currentTarget.style.color = 'var(--text-primary)'; }}
                      onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = 'var(--text-secondary)'; }}
                    >
                      {rel.name}
                    </Link>
                  );
                })}
              </div>
            </div>

            {/* All genres footer */}
            <div style={{ borderTop: '1px solid var(--border)', paddingTop: '28px' }}>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1rem', fontWeight: 700, marginBottom: '14px', color: 'var(--text-primary)' }}>
                Browse All Genres
              </h2>
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                {ALL_GENRES.filter(s => s !== params.slug).map(s => (
                  <Link key={s} href={`/genre/${s}`}
                    style={{ padding: '5px 12px', border: '1px solid var(--border)', borderRadius: '999px', color: 'var(--text-muted)', textDecoration: 'none', fontSize: '0.76rem', fontFamily: 'var(--font-mono)' }}>
                    {GENRE_DATA[s]?.name || s}
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
