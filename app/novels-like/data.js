// "Novels Like X" data
//
// TWO types of entries:
//
// 1. NOVELS ON YOUR SITE (no tags/genres needed)
//    The similar list is fetched automatically via GET /api/novels/slug/:slug/similar
//    which scores your DB novels by shared tags + genres.
//    Example: 'a-knight-who-regresses' — you host this novel.
//
// 2. EXTERNAL NOVELS (not on your site — copyright etc.)
//    Add `tags` and `genres` arrays matching the tags you use in your dashboard.
//    The page fetches your site's novels that share those tags via /by-tag.
//    Example: 'solo-leveling' — you don't host it, but you know its tags.
//
// TO ADD A NEW EXTERNAL PAGE: add an entry with tags + genres. Deploy. Done.
// TO ADD A NEW INTERNAL PAGE: add an entry with no tags. Deploy. Done.

export const SIMILAR_DATA = {

  // ── EXTERNAL NOVELS (not hosted — fetched by tags) ─────────────────────────

  'solo-leveling': {
    title: 'Solo Leveling',
    description:
      'Solo Leveling follows Sung Jinwoo, the weakest hunter, who awakens a hidden system and rises to become the most powerful being in existence. If you loved the power fantasy, dungeon-crawling tension, and the feeling of watching a zero become a god — these novels hit the same notes.',
    keywords: 'novels like solo leveling, similar to solo leveling, solo leveling alternatives',
    // Tags & genres that describe Solo Leveling — must match what you use in your dashboard
    tags: ['Hunters', 'System', 'Dungeons', 'Overpowered Protagonist', 'Weak to Strong', 'Gates'],
    genres: ['Action', 'Fantasy'],
  },

  'omniscient-reader': {
    title: "Omniscient Reader's Viewpoint",
    description:
      "ORV is beloved for its meta storytelling, emotionally complex characters, and the idea that a reader becomes part of the story he knows by heart. If you're searching for that same feeling of someone navigating a world only they understand — these are your next reads.",
    keywords: 'novels like omniscient reader viewpoint, similar to ORV, omniscient reader alternatives',
    tags: ['Apocalypse', 'System', 'Hidden Abilities', 'Regression', 'Meta'],
    genres: ['Action', 'Fantasy', 'Drama'],
  },

  'shadow-slave': {
    title: 'Shadow Slave',
    description:
      'Shadow Slave stands out for its dark atmosphere, morally complex protagonist, and a nightmare-fuelled world where every victory comes at a cost. If you loved the tension and the feeling that anything could go wrong at any moment — these will scratch the same itch.',
    keywords: 'novels like shadow slave, similar to shadow slave, dark fantasy web novels',
    tags: ['Dark & Gritty', 'Survival', 'System', 'Dungeons', 'Monsters'],
    genres: ['Action', 'Fantasy', 'Horror'],
  },

  'the-beginning-after-the-end': {
    title: 'The Beginning After the End',
    description:
      'TBATE blends isekai reincarnation with a deeply personal story about a king reborn into a magic-filled world. The slow-burn power progression and emotional stakes set it apart. If that combination hooked you, these novels are worth your time.',
    keywords: 'novels like the beginning after the end, similar to TBATE, isekai progression novels',
    tags: ['Reincarnation', 'Isekai', 'Magic', 'Overpowered Protagonist', 'Kingdom Building'],
    genres: ['Action', 'Fantasy', 'Romance'],
  },

  'overgeared': {
    title: 'Overgeared',
    description:
      "Overgeared starts with an unlucky, ordinary gamer who discovers a hidden class and slowly becomes the world's most powerful blacksmith-ruler. The satisfaction of watching an underdog leverage a niche talent into dominance is what makes it special. These novels deliver the same slow-building payoff.",
    keywords: 'novels like overgeared, game world blacksmith novels, crafting protagonist web novels',
    tags: ['Virtual Reality', 'System', 'Crafting', 'Guild & Party', 'Kingdom Building'],
    genres: ['Action', 'Fantasy'],
  },

  'nano-machine': {
    title: 'Nano Machine',
    description:
      'Nano Machine combines murim martial arts with futuristic technology — a descendant from the future arrives to give the protagonist nanobots that accelerate his cultivation to impossible levels. If you loved the clash of ancient and ultra-modern, and the sheer unstoppable rise of the MC, these are for you.',
    keywords: 'novels like nano machine, murim technology novels, cultivation cheat novel similar',
    tags: ['Murim', 'Martial Arts', 'Overpowered Protagonist', 'Hidden Abilities'],
    genres: ['Action', 'Fantasy'],
  },

  'return-of-the-mount-hua-sect': {
    title: 'Return of the Mount Hua Sect',
    description:
      'Return of the Mount Hua Sect is a martial arts epic about a legendary warrior reincarnated as the weakest disciple of a declining sect. The mix of humour, deep martial arts progression, and a protagonist who hides extraordinary skill behind a carefree façade makes it unforgettable. These novels share the same spirit.',
    keywords: 'novels like return of the mount hua sect, murim cultivation novels, similar martial arts web novels',
    tags: ['Murim', 'Martial Arts', 'Reincarnation', 'Hidden Abilities', 'Regression'],
    genres: ['Action', 'Fantasy', 'Comedy'],
  },

  'the-legendary-mechanic': {
    title: 'The Legendary Mechanic',
    description:
      'The Legendary Mechanic drops a player into the game world he knows better than anyone — as an NPC — and lets him exploit every loophole the game has to offer. If you love game-world novels where the protagonist has meta-knowledge and uses it brilliantly, these are your next reads.',
    keywords: 'novels like the legendary mechanic, game world meta knowledge novels, similar system novels',
    tags: ['System', 'Virtual Reality', 'Genius Protagonist', 'Hidden Abilities'],
    genres: ['Action', 'Sci-Fi', 'Fantasy'],
  },

  'murim-login': {
    title: 'Murim Login',
    description:
      'Murim Login blends the modern hunter world with VR martial arts training in a way that makes both settings feel alive and interconnected. If you liked how the two worlds fed into each other — and the protagonist mastering both — these novels will keep you hooked.',
    keywords: 'novels like murim login, murim vr novel, hunter and martial arts novel similar',
    tags: ['Murim', 'Hunters', 'Virtual Reality', 'Modern Day'],
    genres: ['Action', 'Fantasy'],
  },

  'the-second-coming-of-gluttony': {
    title: 'The Second Coming of Gluttony',
    description:
      'The Second Coming of Gluttony is a story of redemption — a man given a second chance to save a future he saw in his dreams, carrying deep guilt and a unique ability that nobody else understands. If the emotional weight and strategic use of foresight drew you in, these novels offer something similar.',
    keywords: 'novels like second coming of gluttony, redemption regression novels, similar to SCG',
    tags: ['Regression', 'Apocalypse', 'Hidden Abilities', 'Dark & Gritty'],
    genres: ['Action', 'Fantasy', 'Drama'],
  },

  'return-of-the-blossoming-blade': {
    title: 'Return of the Blossoming Blade',
    description:
      'Return of the Blossoming Blade is a murim regression story with a protagonist who returns after living through a tragic era, carrying grief and knowledge no one else has. The melancholic tone alongside explosive power makes it stand apart in the genre. These novels hit a similar emotional note.',
    keywords: 'novels like return of the blossoming blade, murim regression novel, similar cultivation regression',
    tags: ['Murim', 'Martial Arts', 'Regression', 'Hidden Abilities'],
    genres: ['Action', 'Fantasy', 'Drama'],
  },

  'i-alone-level-up': {
    title: 'I Alone Level Up (Solo Leveling Original)',
    description:
      'If you read the manhwa and want more hunter-world novels with that same visceral tension, satisfying power spikes, and a protagonist who rises from absolute zero — this list was built for you. These are the closest matches to the Solo Leveling experience on our site.',
    keywords: 'novels like i alone level up, hunter awakening novels, similar to solo leveling web novel',
    tags: ['Hunters', 'System', 'Dungeons', 'Weak to Strong', 'Overpowered Protagonist'],
    genres: ['Action', 'Fantasy'],
  },

  'player-who-cant-level-up': {
    title: "The Player Who Can't Level Up",
    description:
      "A player stuck at level 1 for years — unable to grow while the world moves on without him. The Player Who Can't Level Up is about stubborn persistence paying off against impossible odds. If that underdog energy resonated with you, these novels share the same soul.",
    keywords: "novels like player who can't level up, stuck level novel, underdog hunter novel similar",
    tags: ['Hunters', 'System', 'Weak to Strong', 'Hidden Abilities'],
    genres: ['Action', 'Fantasy'],
  },

  'a-returners-magic-should-be-special': {
    title: "A Returner's Magic Should Be Special",
    description:
      "A Returner's Magic Should Be Special follows a mage who survived humanity's final dungeon and returned to the past, determined to stop the tragedy from happening again. The blend of tactical dungeon-clearing, past trauma, and a protagonist carrying the weight of a dead future makes it a standout.",
    keywords: "novels like a returner's magic should be special, magic regression dungeon novel, similar to returner",
    tags: ['Regression', 'Magic', 'Dungeons', 'Academy', 'Genius Protagonist'],
    genres: ['Action', 'Fantasy'],
  },

  'the-max-level-hero-has-returned': {
    title: 'The Max Level Hero Has Returned',
    description:
      'A frail prince, his soul sent to train in another realm for a thousand years, returns to his body as a being beyond any mortal comprehension. If you love the trope of a seemingly powerless protagonist hiding an absurd depth of true ability, these novels deliver that same satisfaction.',
    keywords: 'novels like max level hero has returned, hidden power prince novel, similar op mc novels',
    tags: ['Hidden Abilities', 'Overpowered Protagonist', 'Kingdom Building', 'Nobility'],
    genres: ['Action', 'Fantasy'],
  },

  'leveling-with-the-gods': {
    title: 'Leveling With the Gods',
    description:
      'Leveling With the Gods takes the tower-climbing genre to a cosmic scale — a regressor at the top of the tower goes back to the beginning, but this time he plans to reach even further. The mythological characters and the scale of the stakes make it unlike most other regression novels.',
    keywords: 'novels like leveling with the gods, tower climbing regression novel, similar mythology web novels',
    tags: ['Regression', 'Tower', 'God Protagonist', 'Overpowered Protagonist'],
    genres: ['Action', 'Fantasy'],
  },

  'top-tier-providence': {
    title: 'Top Tier Providence',
    description:
      'Top Tier Providence follows a protagonist navigating a world where divine providence determines fate — and learning to exploit that system better than anyone. If you love clever protagonists who understand the rules of their world better than their enemies do, read these.',
    keywords: 'novels like top tier providence, providence system novels, similar clever mc novels',
    tags: ['System', 'Genius Protagonist', 'Hidden Abilities', 'Reincarnation'],
    genres: ['Action', 'Fantasy'],
  },

  'reincarnator': {
    title: 'Reincarnator',
    description:
      "Reincarnator is a relentless survival novel — the last human travels back to the beginning of humanity's worst period and must claw through every danger again with nothing but memory and will. If you want a brutal, no-compromises regression story with real stakes, these novels are close matches.",
    keywords: 'novels like reincarnator, brutal regression survival novel, similar to reincarnator web novel',
    tags: ['Regression', 'Survival', 'Apocalypse', 'Dark & Gritty', 'Overpowered Protagonist'],
    genres: ['Action', 'Fantasy'],
  },

  'the-world-after-the-fall': {
    title: 'The World After the Fall',
    description:
      "The World After the Fall is a deeply philosophical tower novel about a protagonist who refuses to clear the dungeon the way everyone else did — and discovers a hidden truth about their world. If you want a novel that makes you think as much as it thrills you, these are the reads that come closest.",
    keywords: 'novels like the world after the fall, philosophical tower novel, deep story web novels korean',
    tags: ['Tower', 'Regression', 'Dark & Gritty', 'System'],
    genres: ['Action', 'Fantasy', 'Drama'],
  },

  'tomb-raider-king': {
    title: 'Tomb Raider King',
    description:
      "Tomb Raider King's MC is a relic hunter who goes back in time knowing exactly which relics will appear and when — and sets out to monopolise them all before anyone else can. The fun comes from watching him stay five steps ahead of every faction. These novels share the same cunning, foresight-driven energy.",
    keywords: 'novels like tomb raider king, relic hunter novel, similar foresight mc novels',
    tags: ['Regression', 'Hunters', 'Hidden Abilities', 'Genius Protagonist'],
    genres: ['Action', 'Fantasy'],
  },

  // ── NOVELS ON YOUR SITE (fetched by slug similarity — no tags needed) ───────
  // Add entries here for novels you DO host. The similar list builds automatically.

  'a-knight-who-regresses': {
    title: 'A Knight Who Regresses',
    description:
      'A Knight Who Regresses follows a veteran warrior sent back in time, carrying the weight of a future only he witnessed. The regressor archetype with knightly honour and restrained power makes it stand out. Here are similar titles on our site.',
    keywords: 'novels like a knight who regresses, knight regression novel, similar regression novels',
  },

  'the-legendary-mechanic-hosted': {
    title: 'The Legendary Mechanic',
    description:
      'The Legendary Mechanic drops a player into the game world he knows better than anyone. These are similar novels on our site.',
    keywords: 'novels like the legendary mechanic, game world meta knowledge novels, similar system novels',
  },

};

// All valid slugs for generateStaticParams — derived from the keys above
export const SIMILAR_SLUGS = Object.keys(SIMILAR_DATA);
