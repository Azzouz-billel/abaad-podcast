/**
 * Episode list (newest first).
 *
 * The first entry is featured in the "Latest Episode" section. Add more entries
 * and they automatically fill the "Recent Episodes" grid; while this is the only
 * one, the grid shows a "coming soon" block instead.
 *
 * Fields: title, guest, duration, date, category ("Guest Episode" | "Deep Dive",
 * drives the badge), blurb, accent ("emerald" | "mint" | "phosphor"), slug.
 *
 * Optional per-episode links:
 *   `youtubeId` — a YouTube video/Short id; when set, the card plays it inline
 *                 instead of the local /episodes/<slug>.mp4 clip.
 *   `url`       — the full episode page (the card title + "Listen now" link there).
 */
export const episodes = [
  {
    slug: 'NHSM-experience',
    number: '01',
    title: 'The Shape of Silence',
    guest: 'with 5th year nhsm student',
    duration: '2h 35 min',
    date: 'June 28, 2026',
    category: 'Guest Episode',
    blurb:
      'how it was in nhsm the struggles and triumphs that come with it, all this and more in our first episode.',
    accent: 'emerald',
    // Real latest video + its hook Short. Update title/guest/blurb above to match.
    youtubeId: 'j_MN97w7XJs',
    url: 'https://youtu.be/dT1Z9rnli4A',
  },
]

export const hookSrc = (slug) => `/episodes/${slug}.mp4`
