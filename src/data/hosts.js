/**
 * Hosts shown in the "The Voices" section.
 *
 * `photo` is the card avatar. Drop a square image (≈320×320) in public/hosts/
 * and point to it (e.g. '/hosts/azzouz-billel.jpg'), or paste any image URL.
 * If `photo` is missing or fails to load, the card falls back to the
 * `initials` tile.
 */
export const hosts = [
  {
    name: 'azzouz billel',
    handle: 'Host · Producer',
    initials: 'أب',
    photo: '/hosts/me.png',
    bio: 'Spent a decade in documentary radio before founding Abaad. Collects first questions and unfinished sentences.',
    accent: 'phosphor',
    socials: { x: '#', instagram: 'https://www.instagram.com/billel_.azzouz/', linkedin: 'https://www.linkedin.com/in/billel-azzouz-1a6aa0302/' },
  },
  {
    name: 'mansouri abdenoure',
    handle: 'Co-host · Editor',
    initials: 'مان',
    photo: '/hosts/abdnr.png',
    bio: 'Composer turned interviewer. Believes every good conversation has a key signature and an unresolved chord.',
    accent: 'emerald',
    socials: { x: '#', instagram: 'https://www.instagram.com/abdnr_mn/', linkedin: '#' },
  },
]
