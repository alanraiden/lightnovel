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

  // ── EXISTING 7 ─────────────────────────────────────────────────────────────

  'regression-novels': {
    title: 'Best Regression Novels',
    h1: 'Best Regression Novels to Read',
    intro: `Regression is one of the defining tropes of Korean web novels. The hero dies — or lives through a catastrophic future — and wakes up back at a pivotal moment with all their memories intact. What makes these stories gripping isn't just the second chance, but the weight of knowing what's coming. Here are the best regression novels on our site.`,
    keywords: 'best regression novels, regression korean novels, time travel second chance novels',
    tags: ['Regression', 'Time Travel', 'Second Chance'],
    sort: 'views',
    limit: 12,
  },

  'op-mc-novels': {
    title: 'Best Overpowered MC Novels',
    h1: 'Best Overpowered MC Novels',
    intro: `Sometimes you just want to watch the protagonist completely dominate. No grinding for 400 chapters — just an MC who is built different from the start, or who levels up so fast that everyone else is left speechless. These are the best OP MC Korean web novels on our site.`,
    keywords: 'overpowered mc novels, op mc korean novels, best op mc web novels',
    tags: ['Overpowered Protagonist', 'Strong to Stronger', 'Protagonist Strong from the Start'],
    sort: 'views',
    limit: 12,
  },

  'completed-novels': {
    title: 'Best Completed Novels',
    h1: 'Best Completed Korean Web Novels',
    intro: `No cliffhangers. No waiting. These novels are fully translated and complete — you can binge from Chapter 1 to the ending right now. If you've ever dropped a series mid-way because updates stalled, this list is for you. Every novel here is finished.`,
    keywords: 'completed korean web novels, finished light novels, fully translated web novels',
    tags: [],
    sort: 'rating',
    limit: 12,
    status: 'completed',
  },

  'dungeon-novels': {
    title: 'Best Dungeon Novels',
    h1: 'Best Dungeon Crawler Novels',
    intro: `Dungeons, raids, boss floors, loot — the dungeon-crawler trope is a cornerstone of Korean web novels. Whether it's solo-clearing gates that whole parties couldn't beat, or diving into an endless tower, these novels deliver that addictive loop of danger and reward. Here are the best ones on our site.`,
    keywords: 'best dungeon novels, dungeon crawler korean novels, tower climbing web novels',
    tags: ['Dungeons', 'Dungeon Master', 'Hunters'],
    sort: 'views',
    limit: 12,
  },

  'villainess-novels': {
    title: 'Best Villainess Novels',
    h1: 'Best Villainess Reincarnation Novels',
    intro: `You wake up as the villain of a romance novel — the one the story was never meant to save. The villainess reincarnation trope is one of the most popular in Korean web fiction, beloved for its sharp writing, morally complex heroines, and the joy of watching a doomed character rewrite her fate. Here are the best ones we host.`,
    keywords: 'villainess reincarnation novels, best villainess web novels, korean villainess novels',
    tags: ['Villainess', 'Female Protagonist', 'Reincarnated in Another World'],
    sort: 'views',
    limit: 12,
  },

  'system-novels': {
    title: 'Best System Novels',
    h1: 'Best System Novels (Stats, Levels & Skills)',
    intro: `Stat windows. Level-ups. Hidden quests with absurd rewards. The system trope turns the protagonist's life into an RPG — and it never gets old. These are the best system-powered Korean web novels on our site, ranked by how much readers love them.`,
    keywords: 'best system novels, rpg system web novels, level up korean novels',
    tags: ['Game Elements', 'Game Ranking System', 'Level System', 'Skill Books', 'Skill Assimilation'],
    sort: 'views',
    limit: 12,
  },

  'manhwa-adaptations': {
    title: 'Novels Adapted to Manhwa',
    h1: 'Korean Novels Adapted to Manhwa',
    intro: `Loved a manhwa and want to read the original novel? Or want to discover novels that already have a visual adaptation so you can switch between formats? These novels have all been adapted into manhwa (Korean comics), and you can read the original web novel right here.`,
    keywords: 'novels adapted to manhwa, manhwa original novel, korean novel manhwa adaptation',
    tags: ['Adapted to Manhwa'],
    sort: 'views',
    limit: 12,
  },

  // ── NEW: POWER FANTASY & PROGRESSION ───────────────────────────────────────

  'weak-to-strong-novels': {
    title: 'Best Weak to Strong Novels',
    h1: 'Best Weak to Strong Korean Web Novels',
    intro: `There's nothing more satisfying than watching a protagonist start from rock bottom and claw their way to the top. Dismissed, underestimated, and overlooked — until they aren't. These weak-to-strong Korean web novels are some of the most addictive stories on our site.`,
    keywords: 'weak to strong novels, underdog protagonist korean novels, weak mc gets stronger',
    tags: ['Weak to Strong', 'Weak Protagonist', 'Underestimated Protagonist', 'Hard-Working Protagonist'],
    sort: 'views',
    limit: 12,
  },

  'hidden-ability-novels': {
    title: 'Best Hidden Ability Novels',
    h1: 'Best Novels Where the MC Hides Their True Power',
    intro: `Everyone thinks he's weak. He lets them. The hidden-power trope is a staple of Korean web fiction — protagonists who conceal godlike abilities, operate in the shadows, and only reveal their true strength when it counts. These are the best of them.`,
    keywords: 'hidden ability novels, hiding true power korean novel, low key op mc',
    tags: ['Hidden Abilities', 'Hiding True Abilities', 'Hiding True Identity', 'Secret Identity'],
    sort: 'views',
    limit: 12,
  },

  'genius-protagonist-novels': {
    title: 'Best Genius Protagonist Novels',
    h1: 'Best Korean Novels with a Genius Protagonist',
    intro: `Strategy, foresight, and intelligence that makes everyone around them look slow. Genius protagonists don't just win fights — they outthink entire systems, factions, and enemies before anyone realizes the game has started. Here are the smartest protagonists in Korean web fiction.`,
    keywords: 'genius protagonist novels, smart mc korean novels, intelligent protagonist web novels',
    tags: ['Genius Protagonist', 'Clever Protagonist', 'Cunning Protagonist', 'Schemes and Conspiracies'],
    sort: 'views',
    limit: 12,
  },

  'kingdom-building-novels': {
    title: 'Best Kingdom Building Novels',
    h1: 'Best Kingdom & Empire Building Korean Web Novels',
    intro: `From a single territory to an empire that spans the world — kingdom building novels are about strategy, loyalty, and the slow satisfaction of watching something great rise from nothing. These are the best construction and nation-building stories on our site.`,
    keywords: 'kingdom building novels, empire building korean novels, nation building web fiction',
    tags: ['Kingdom Building', 'Army Building', 'Management', 'Business Management', 'Empires'],
    sort: 'views',
    limit: 12,
  },

  // ── NEW: ROMANCE & RELATIONSHIPS ────────────────────────────────────────────

  'romance-novels': {
    title: 'Best Romance Novels',
    h1: 'Best Korean Web Novels with Romance',
    intro: `Not just a subplot — the main event. These Korean web novels put romance front and center, from slow-burn tension that takes a hundred chapters to pay off, to love interests who fall fast and hard. Whether you want heartwarming or heart-wrenching, this list has it.`,
    keywords: 'best korean romance novels, romance web fiction, korean novel love story',
    tags: ['Love Interest Falls in Love First', 'Slow Romance', 'Secret Relationship', 'Enemies Become Lovers', 'Power Couple'],
    sort: 'rating',
    limit: 12,
  },

  'female-protagonist-novels': {
    title: 'Best Female Protagonist Novels',
    h1: 'Best Korean Web Novels with a Female Lead',
    intro: `From scheming noblewomen to sword-swinging hunters, Korean web fiction has some of the most compelling female protagonists in the genre. These novels put women at the center of the action — and deliver stories every bit as gripping as their male-led counterparts.`,
    keywords: 'female protagonist korean novels, female lead web fiction, strong female mc korean',
    tags: ['Female Protagonist', 'Female Master', 'Tomboyish Female Lead'],
    sort: 'views',
    limit: 12,
  },

  'reincarnation-novels': {
    title: 'Best Reincarnation Novels',
    h1: 'Best Reincarnation Korean Web Novels',
    intro: `Die in one world, wake up in another — or the same one, centuries earlier. Reincarnation novels are a cornerstone of Korean web fiction, blending past-life memories with new beginnings, ancient grudges, and the chance to do things right. These are the best on our site.`,
    keywords: 'reincarnation novels korean, best isekai reincarnation, reborn in another world novels',
    tags: ['Reincarnation', 'Reincarnated in Another World', 'Transmigration', 'Previous Life', 'Transplanted Memories'],
    sort: 'views',
    limit: 12,
  },

  // ── NEW: SETTING & WORLD ────────────────────────────────────────────────────

  'isekai-novels': {
    title: 'Best Isekai Novels',
    h1: 'Best Isekai & Transported to Another World Novels',
    intro: `Another world, different rules, and a protagonist who has to figure it out fast. Isekai is one of the most beloved sub-genres in Korean web fiction — whether it's through a gate, a game portal, or sheer magical accident. These are our highest-rated transported-to-another-world stories.`,
    keywords: 'isekai korean novels, transported to another world novels, best isekai web fiction',
    tags: ['Transported to Another World', 'Gate to Another World', 'Transported into a Game World', 'Interdimensional Travel', 'Parallel Worlds'],
    sort: 'views',
    limit: 12,
  },

  'fantasy-novels': {
    title: 'Best Fantasy Novels',
    h1: 'Best Korean Fantasy Web Novels',
    intro: `Magic systems, mythical beasts, ancient curses, and worlds built from the ground up. Korean fantasy web novels bring some of the most imaginative world-building in the genre. From high medieval settings to dark and gritty realms, here are the best fantasy reads on our site.`,
    keywords: 'best korean fantasy novels, fantasy web fiction korean, magic system novels',
    tags: ['Fantasy World', 'Magic', 'Elemental Magic', 'Sword and Magic', 'Mythical Beasts', 'Fantasy Creatures'],
    sort: 'views',
    limit: 12,
  },

  'medieval-novels': {
    title: 'Best Medieval Fantasy Novels',
    h1: 'Best Medieval-Setting Korean Web Novels',
    intro: `Knights, nobles, swords, and courts. Medieval-set Korean web novels bring the tension of political intrigue and battlefield glory together in ways that feel both classic and fresh. If you love the aesthetic of feudal warfare and aristocratic scheming, start here.`,
    keywords: 'medieval korean novels, knights and nobles web fiction, sword fantasy korean',
    tags: ['Medieval', 'Knights', 'Nobles', 'Aristocracy', 'European Ambience', 'Kingdoms'],
    sort: 'views',
    limit: 12,
  },

  'modern-day-novels': {
    title: 'Best Modern Day Novels',
    h1: 'Best Modern Setting Korean Web Novels',
    intro: `Not every Korean web novel takes place in a fantasy kingdom. Some of the best stories are set in the world we know — hunters operating out of Seoul, celebrities hiding supernatural powers, or ordinary people thrust into extraordinary situations. These are our top modern-setting picks.`,
    keywords: 'modern day korean novels, contemporary setting web fiction, hunters in modern world',
    tags: ['Modern Day', 'Hunters', 'Celebrities', 'Showbiz', 'Apartment Life', 'Living Alone'],
    sort: 'views',
    limit: 12,
  },

  // ── NEW: DARK & THRILLER ────────────────────────────────────────────────────

  'dark-novels': {
    title: 'Best Dark Novels',
    h1: 'Best Dark & Gritty Korean Web Novels',
    intro: `No easy wins. No plot armor. No mercy. These Korean web novels embrace darkness — moral ambiguity, brutal consequences, and protagonists who are as dangerous as the enemies they face. If you want stories with real weight and edge, these deliver.`,
    keywords: 'dark korean novels, gritty web fiction, mature dark fantasy novels',
    tags: ['Dark', 'Gore', 'Cruel Characters', 'Depictions of Cruelty', 'Antihero Protagonist', 'Evil Protagonist'],
    sort: 'rating',
    limit: 12,
  },

  'revenge-novels': {
    title: 'Best Revenge Novels',
    h1: 'Best Revenge Korean Web Novels',
    intro: `Betrayed. Killed. Wronged. And then given a chance to settle the score. Revenge is one of the most electrifying motivators in Korean web fiction — cold, methodical, and deeply satisfying. These are the best revenge-driven stories on our site.`,
    keywords: 'revenge korean novels, betrayal and revenge web fiction, best revenge story novels',
    tags: ['Revenge', 'Betrayal', 'Schemes and Conspiracies', 'Ruthless Protagonist'],
    sort: 'views',
    limit: 12,
  },

  'survival-novels': {
    title: 'Best Survival Novels',
    h1: 'Best Survival Korean Web Novels',
    intro: `When the world turns hostile, only the most adaptable survive. Survival-focused Korean web novels strip away comfort and force protagonists — and readers — to reckon with what it truly takes to stay alive. Tense, high-stakes, and impossible to put down.`,
    keywords: 'survival korean novels, post-apocalyptic web fiction, survival thriller novels',
    tags: ['Survival', 'Thriller', 'Near-Death Experience', 'Mutated Creatures'],
    sort: 'views',
    limit: 12,
  },

  // ── NEW: CHARACTERS & ARCHETYPES ───────────────────────────────────────────

  'necromancer-novels': {
    title: 'Best Necromancer Novels',
    h1: 'Best Necromancer Korean Web Novels',
    intro: `Why fight alone when you can raise an army of the dead? Necromancer protagonists are some of the most uniquely compelling in Korean web fiction — outsiders who turn death itself into a weapon. These are the best necromancer-focused stories on our site.`,
    keywords: 'necromancer korean novels, undead army web fiction, best necromancer protagonist',
    tags: ['Necromancer', 'Souls', 'Soul Power', 'Demons'],
    sort: 'views',
    limit: 12,
  },

  'assassin-novels': {
    title: 'Best Assassin Novels',
    h1: 'Best Assassin & Shadow Operative Korean Web Novels',
    intro: `Silent. Precise. Deadly. Assassin protagonists operate in the spaces between power — hired blades, shadow operatives, and cold professionals who live and die by the mission. These are the best assassin-focused Korean web novels on our site.`,
    keywords: 'assassin korean novels, shadow protagonist web fiction, best assassin mc novels',
    tags: ['Assassins', 'Secret Identity', 'Multiple Identities', 'Secretive Protagonist'],
    sort: 'views',
    limit: 12,
  },

  'academy-novels': {
    title: 'Best Academy Novels',
    h1: 'Best Academy & Battle School Korean Web Novels',
    intro: `Magic academies, hunter schools, elite military training grounds — academy-set Korean web novels combine the tension of competition with the bonds of friendship and rivalry. Whether the MC is secretly the strongest student or a genuine underdog, these stories hit every time.`,
    keywords: 'academy korean novels, battle school web fiction, magic school novels korean',
    tags: ['Academy', 'Battle Academy', 'Student-Teacher Relationship', 'Coming of Age'],
    sort: 'views',
    limit: 12,
  },

  'time-loop-novels': {
    title: 'Best Time Loop Novels',
    h1: 'Best Time Loop Korean Web Novels',
    intro: `Die, repeat, improve. Time loop stories are among the most intellectually satisfying sub-genres in Korean web fiction — protagonists who must relive the same events over and over, each loop bringing them closer to an answer, or breaking them down completely.`,
    keywords: 'time loop korean novels, repeat death novels, best time loop web fiction',
    tags: ['Time Loop', 'Time Manipulation', 'Time Travel'],
    sort: 'rating',
    limit: 12,
  },

  'virtual-reality-novels': {
    title: 'Best Virtual Reality Novels',
    h1: 'Best VR & Game World Korean Web Novels',
    intro: `Log in, level up, and never want to come back out. VR and game-world novels blur the line between reality and play until the stakes become very, very real. These are the best game-dive Korean web novels on our site.`,
    keywords: 'virtual reality korean novels, game world web fiction, vr mmorpg novels',
    tags: ['Virtual Reality', 'Transported into a Game World', 'Game Elements', 'Gamers'],
    sort: 'views',
    limit: 12,
  },

  'dragon-novels': {
    title: 'Best Dragon Novels',
    h1: 'Best Dragon Korean Web Novels',
    intro: `Ancient, terrifying, and magnificent. Dragons hold a special place in Korean web fiction — whether as enemies to slay, companions to ride, or forms to take. These novels put dragons at the heart of the story in ways that go far beyond standard fantasy.`,
    keywords: 'dragon korean novels, dragon protagonist web fiction, dragon rider novels',
    tags: ['Dragons', 'Dragon Riders', 'Dragon Slayers', 'Mythical Beasts', 'Beasts'],
    sort: 'views',
    limit: 12,
  },

  'guild-novels': {
    title: 'Best Guild & Party Novels',
    h1: 'Best Guild, Party & Mercenary Korean Web Novels',
    intro: `No protagonist is an island. Guild and party-based Korean web novels thrive on the chemistry between characters — the loyal companions, the brewing rivalries, the unspoken trust that only comes from facing death together. These are our top picks.`,
    keywords: 'guild korean novels, party-based web fiction, mercenary novels korean',
    tags: ['Guilds', 'Mercenaries', 'Teamwork', 'Loyal Subordinates', 'Boss-Subordinate Relationship'],
    sort: 'views',
    limit: 12,
  },

  'god-protagonist-novels': {
    title: 'Best God-Level Protagonist Novels',
    h1: 'Best Korean Novels with a God-Level Protagonist',
    intro: `Beyond overpowered. Beyond human. These novels feature protagonists who ascend to something greater — gods, divine beings, or entities rewriting the rules of existence itself. If you're looking for stories where the scale is truly cosmic, start here.`,
    keywords: 'god level protagonist novels, divine mc korean web fiction, godly power novels',
    tags: ['God Protagonist', 'Godly Powers', 'Gods', 'God-human Relationship', 'Multiple Realms'],
    sort: 'views',
    limit: 12,
  },

  'magic-beast-novels': {
    title: 'Best Beast Taming & Familiar Novels',
    h1: 'Best Monster Taming & Beast Companion Korean Novels',
    intro: `Companions who fight alongside the protagonist and grow just as powerful — beast-taming and monster companion novels are a fan favourite sub-genre of Korean web fiction. Whether it's a loyal familiar or a tamed ancient beast, these novels deliver.`,
    keywords: 'beast tamer korean novels, magic beast web fiction, monster companion novels',
    tags: ['Beast Companions', 'Magic Beasts', 'Familiars', 'Pets', 'Monsters'],
    sort: 'views',
    limit: 12,
  },

  'political-intrigue-novels': {
    title: 'Best Political Intrigue Novels',
    h1: 'Best Korean Web Novels with Politics & Scheming',
    intro: `Power isn't just won on a battlefield. Korean web novels with deep political intrigue reward patient readers with layered schemes, shifting alliances, and protagonists who are as dangerous in a throne room as on a frontline. If you love the chess match of power, read these.`,
    keywords: 'political intrigue korean novels, scheming web fiction, power struggle novels korean',
    tags: ['Politics', 'Power Struggle', 'Schemes and Conspiracies', 'Nobles', 'Royalty'],
    sort: 'rating',
    limit: 12,
  },

  'heartwarming-novels': {
    title: 'Best Heartwarming Novels',
    h1: 'Best Heartwarming Korean Web Novels',
    intro: `Not every story needs blood and battle. These Korean web novels warm you from the inside — through found family, unconditional love, healing, and characters who genuinely care for each other. Perfect for when you want a story that leaves you smiling.`,
    keywords: 'heartwarming korean novels, feel good web fiction, wholesome korean novel',
    tags: ['Heartwarming', 'Familial Love', 'Family', 'Cute Children', 'Childcare', 'Unconditional Love'],
    sort: 'rating',
    limit: 12,
  },

};

export const BEST_LIST_SLUGS = Object.keys(BEST_LISTS);

export const BEST_LIST_LABELS = {
  // Original 7
  'regression-novels':          'Regression Novels',
  'op-mc-novels':               'Overpowered MC',
  'completed-novels':           'Completed Novels',
  'dungeon-novels':             'Dungeon Novels',
  'villainess-novels':          'Villainess Novels',
  'system-novels':              'System Novels',
  'manhwa-adaptations':         'Manhwa Adaptations',
  // Power Fantasy & Progression
  'weak-to-strong-novels':      'Weak to Strong',
  'hidden-ability-novels':      'Hidden Abilities',
  'genius-protagonist-novels':  'Genius Protagonist',
  'kingdom-building-novels':    'Kingdom Building',
  // Romance & Relationships
  'romance-novels':             'Romance',
  'female-protagonist-novels':  'Female Protagonist',
  'reincarnation-novels':       'Reincarnation',
  // Setting & World
  'isekai-novels':              'Isekai',
  'fantasy-novels':             'Fantasy',
  'medieval-novels':            'Medieval',
  'modern-day-novels':          'Modern Day',
  // Dark & Thriller
  'dark-novels':                'Dark & Gritty',
  'revenge-novels':             'Revenge',
  'survival-novels':            'Survival',
  // Characters & Archetypes
  'necromancer-novels':         'Necromancer',
  'assassin-novels':            'Assassin',
  'academy-novels':             'Academy',
  'time-loop-novels':           'Time Loop',
  'virtual-reality-novels':     'Virtual Reality',
  'dragon-novels':              'Dragons',
  'guild-novels':               'Guild & Party',
  'god-protagonist-novels':     'God Protagonist',
  'magic-beast-novels':         'Beast Taming',
  'political-intrigue-novels':  'Political Intrigue',
  'heartwarming-novels':        'Heartwarming',
};
