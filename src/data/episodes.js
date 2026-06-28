/**
 * Episode portfolio (newest first).
 *
 * To publish a real hook, drop an .mp4 into `public/episodes/` named after the
 * episode `slug` (e.g. public/episodes/the-shape-of-silence.mp4). The card plays
 * it inline. Covers are generated from `accent` + `number` — no image files.
 *
 * The clips currently in public/episodes/ are lightweight placeholders so the
 * Play interaction works out of the box; replace them with the real hooks.
 * `category` drives the card badge ("Guest Episode" | "Deep Dive").
 *
 * Optional per-episode links:
 *   `youtubeId` — a YouTube video/Short id; when set, the card plays it inline
 *                 instead of the local /episodes/<slug>.mp4 clip.
 *   `url`       — the full episode page (the card title + "Listen now" link there).
 */
export const episodes = [
  {
    slug: 'the-shape-of-silence',
    number: '01',
    title: 'The Shape of Silence',
    guest: 'with Dr. Lina Haddad',
    duration: '52 min',
    date: 'June 26, 2026',
    category: 'Guest Episode',
    blurb:
      'A neuroscientist on why the pauses in a conversation carry as much meaning as the words around them.',
    accent: 'emerald',
    // Real latest video + its hook Short. Update title/guest/blurb above to match.
    youtubeId: 'j_MN97w7XJs',
    url: 'https://youtu.be/dT1Z9rnli4A',
  },
  {
    slug: 'borrowed-light',
    number: '02',
    title: 'Borrowed Light',
    guest: 'with Omar Reyes',
    duration: '47 min',
    date: 'June 12, 2026',
    category: 'Guest Episode',
    blurb:
      'An astrophotographer on patience, deep time, and what a ten-hour exposure teaches you about attention.',
    accent: 'phosphor',
  },
  {
    slug: 'against-the-grain',
    number: '03',
    title: 'Against the Grain',
    guest: 'with Yuki Tanaka',
    duration: '58 min',
    date: 'May 29, 2026',
    category: 'Deep Dive',
    blurb:
      'A furniture maker on working with wood that fights back, and why the flaw is usually the design.',
    accent: 'mint',
  },
  {
    slug: 'cartography-of-doubt',
    number: '04',
    title: 'Cartography of Doubt',
    guest: 'with Prof. Amina Cole',
    duration: '63 min',
    date: 'May 15, 2026',
    category: 'Deep Dive',
    blurb:
      'A historian on mapping the things we were never sure of, and how uncertainty shaped the world we drew.',
    accent: 'emerald',
  },
  {
    slug: 'the-long-now',
    number: '05',
    title: 'The Long Now',
    guest: 'with Marco Silva',
    duration: '44 min',
    date: 'May 1, 2026',
    category: 'Guest Episode',
    blurb:
      'A clockmaker building a timepiece meant to run for ten thousand years — and the ethics of the future.',
    accent: 'phosphor',
  },
  {
    slug: 'signal-and-noise',
    number: '06',
    title: 'Signal & Noise',
    guest: 'with Nadia Bouazza',
    duration: '49 min',
    date: 'April 17, 2026',
    category: 'Guest Episode',
    blurb:
      'A sound engineer on the texture of a room, the myth of perfect quiet, and listening as a craft.',
    accent: 'mint',
  },
  {
    slug: 'the-weight-of-water',
    number: '07',
    title: 'The Weight of Water',
    guest: 'with Dr. Hana Mostafa',
    duration: '55 min',
    date: 'April 3, 2026',
    category: 'Guest Episode',
    blurb:
      'A marine biologist on pressure, depth, and the creatures that thrive where light never reaches.',
    accent: 'emerald',
  },
  {
    slug: 'a-grammar-of-cities',
    number: '08',
    title: 'A Grammar of Cities',
    guest: 'with Tomas Vidal',
    duration: '61 min',
    date: 'March 20, 2026',
    category: 'Deep Dive',
    blurb:
      'An urban planner on reading streets like sentences, and the punctuation that makes a place feel alive.',
    accent: 'phosphor',
  },
  {
    slug: 'the-honest-instrument',
    number: '09',
    title: 'The Honest Instrument',
    guest: 'with Leila Karam',
    duration: '46 min',
    date: 'March 6, 2026',
    category: 'Guest Episode',
    blurb:
      'A violin maker on tone, tension, and the long argument between tradition and the ear.',
    accent: 'mint',
  },
]

export const hookSrc = (slug) => `/episodes/${slug}.mp4`
