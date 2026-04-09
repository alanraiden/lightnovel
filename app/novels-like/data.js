// "Novels Like X" data — similar novels are now fetched automatically from the API.
//
// You only need to define:
//   title       — displayed in the H1 and page title
//   description — the intro paragraph on the page
//   keywords    — for SEO meta
//
// The similar novels list is built automatically at build time by calling:
//   GET /api/novels/slug/:slug/similar
// which scores every novel in your DB by shared tags + genres and returns the
// top matches. No slugs to maintain — add novels with matching tags and they
// appear automatically.
//
// TO ADD A NEW PAGE: just add an entry here and deploy. Done.

export const SIMILAR_DATA = {
  'solo-leveling': {
    title: 'Solo Leveling',
    description:
      'Solo Leveling follows Sung Jinwoo, the weakest hunter, who awakens a hidden system and rises to become the most powerful being in existence. If you loved the power fantasy, dungeon-crawling tension, and the feeling of watching a zero become a god — these novels hit the same notes.',
    keywords: 'novels like solo leveling, similar to solo leveling, solo leveling alternatives',
  },

  'omniscient-reader': {
    title: "Omniscient Reader's Viewpoint",
    description:
      "ORV is beloved for its meta storytelling, emotionally complex characters, and the idea that a reader becomes part of the story he knows by heart. If you're searching for that same feeling of someone navigating a world only they understand — these are your next reads.",
    keywords: 'novels like omniscient reader viewpoint, similar to ORV, omniscient reader alternatives',
  },

  'a-knight-who-regresses': {
    title: 'A Knight Who Regresses',
    description:
      'A Knight Who Regresses follows a veteran warrior sent back in time, carrying the weight of a future only he witnessed. The regressor archetype with knightly honour and restrained power makes it stand out. Here are similar titles on our site.',
    keywords: 'novels like a knight who regresses, knight regression novel, similar regression novels',
  },

  'the-beginning-after-the-end': {
    title: 'The Beginning After the End',
    description:
      'TBATE blends isekai reincarnation with a deeply personal story about a king reborn into a magic-filled world. The slow-burn power progression and emotional stakes set it apart. If that combination hooked you, these novels are worth your time.',
    keywords: 'novels like the beginning after the end, similar to TBATE, isekai progression novels',
  },

  'shadow-slave': {
    title: 'Shadow Slave',
    description:
      'Shadow Slave stands out for its dark atmosphere, morally complex protagonist, and a nightmare-fuelled world where every victory comes at a cost. If you loved the tension and the feeling that anything could go wrong at any moment — these will scratch the same itch.',
    keywords: 'novels like shadow slave, similar to shadow slave, dark fantasy web novels',
  },
};

// All valid slugs for generateStaticParams — derived from the keys above
export const SIMILAR_SLUGS = Object.keys(SIMILAR_DATA);
