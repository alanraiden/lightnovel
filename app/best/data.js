// "Best of" list data — fully automatic, no hardcoded slugs needed.
//
// Each entry maps a URL slug → /best/regression-novels
// `tags`   = your DB tag names to query (novels must have ANY of these tags)
// `genres` = fallback genre filter if tags return too few results
// `sort`   = views | rating | week | month (default: views)
// `status` = optional — filter by novel status (e.g. 'completed')
//
// The page fetches novels from /api/novels/by-tag/:tag at build time,
// so the list updates automatically as you add more novels to your DB.

export const BEST_LISTS = {
  'regression-novels': {
    title: 'Best Regression Novels',
    h1: 'Best Regression Novels to Read',
    intro: `Regression is one of the defining tropes of Korean web novels. The hero dies — or lives through a catastrophic future — and wakes up back at a pivotal moment with all their memories intact. What makes these stories gripping isn't just the second chance, but the weight of knowing what's coming. Here are the best regression novels on our site.`,
    keywords: 'best regression novels, regression korean novels, time travel second chance novels',
    // Novels tagged with ANY of these will appear (case-insensitive)
    tags: ['Regression', 'Time Travel', 'Second Chance'],
    sort: 'views',
    limit: 12,
  },

  'op-mc-novels': {
    title: 'Best Overpowered MC Novels',
    h1: 'Best Overpowered MC Novels',
    intro: `Sometimes you just want to watch the protagonist completely dominate. No grinding for 400 chapters — just an MC who is built different from the start, or who levels up so fast that everyone else is left speechless. These are the best OP MC Korean web novels on our site.`,
    keywords: 'overpowered mc novels, op mc korean novels, best op mc web novels',
    tags: ['Overpowered Protagonist', 'Strong to Stronger', 'Cheat Skill'],
    sort: 'views',
    limit: 12,
  },

  'completed-novels': {
    title: 'Best Completed Novels',
    h1: 'Best Completed Korean Web Novels',
    intro: `No cliffhangers. No waiting. These novels are fully translated and complete — you can binge from Chapter 1 to the ending right now. If you've ever dropped a series mid-way because updates stalled, this list is for you. Every novel here is finished.`,
    keywords: 'completed korean web novels, finished light novels, fully translated web novels',
    tags: [],           // no tag filter — use status filter instead
    sort: 'rating',
    limit: 12,
    status: 'completed',  // only completed novels
  },

  'dungeon-novels': {
    title: 'Best Dungeon Novels',
    h1: 'Best Dungeon Crawler Novels',
    intro: `Dungeons, raids, boss floors, loot — the dungeon-crawler trope is a cornerstone of Korean web novels. Whether it's solo-clearing gates that whole parties couldn't beat, or diving into an endless tower, these novels deliver that addictive loop of danger and reward. Here are the best ones on our site.`,
    keywords: 'best dungeon novels, dungeon crawler korean novels, tower climbing web novels',
    tags: ['Dungeons', 'Dungeon', 'Tower Climbing', 'Gate'],
    sort: 'views',
    limit: 12,
  },

  'villainess-novels': {
    title: 'Best Villainess Novels',
    h1: 'Best Villainess Reincarnation Novels',
    intro: `You wake up as the villain of a romance novel — the one the story was never meant to save. The villainess reincarnation trope is one of the most popular in Korean web fiction, beloved for its sharp writing, morally complex heroines, and the joy of watching a doomed character rewrite her fate. Here are the best ones we host.`,
    keywords: 'villainess reincarnation novels, best villainess web novels, korean villainess novels',
    tags: ['Villainess', 'Female Protagonist', 'Reincarnation into a Villainess'],
    sort: 'views',
    limit: 12,
  },

  'system-novels': {
    title: 'Best System Novels',
    h1: 'Best System Novels (Stats, Levels & Skills)',
    intro: `Stat windows. Level-ups. Hidden quests with absurd rewards. The system trope turns the protagonist's life into an RPG — and it never gets old. These are the best system-powered Korean web novels on our site, ranked by how much readers love them.`,
    keywords: 'best system novels, rpg system web novels, level up korean novels',
    tags: ['System', 'Game Elements', 'RPG', 'Level Up', 'Status Windows'],
    sort: 'views',
    limit: 12,
  },

  'manhwa-adaptations': {
    title: 'Novels Adapted to Manhwa',
    h1: 'Korean Novels Adapted to Manhwa',
    intro: `Loved a manhwa and want to read the original novel? Or want to discover novels that already have a visual adaptation so you can switch between formats? These novels have all been adapted into manhwa (Korean comics), and you can read the original web novel right here.`,
    keywords: 'novels adapted to manhwa, manhwa original novel, korean novel manhwa adaptation',
    tags: ['Adapted to Manhwa', 'Manhwa'],
    sort: 'views',
    limit: 12,
  },
};

export const BEST_LIST_SLUGS = Object.keys(BEST_LISTS);

export const BEST_LIST_LABELS = {
  'regression-novels':    'Regression Novels',
  'op-mc-novels':         'Overpowered MC',
  'completed-novels':     'Completed Novels',
  'dungeon-novels':       'Dungeon Novels',
  'villainess-novels':    'Villainess Novels',
  'system-novels':        'System Novels',
  'manhwa-adaptations':   'Manhwa Adaptations',
};
