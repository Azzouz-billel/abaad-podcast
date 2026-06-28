# أبعاد · Abaad — Podcast Site

An immersive, dark-green site for the **Abaad** podcast: a full-screen intro
video, an animated light-beam background, a bilingual hero, a featured latest
episode, a recent-episodes grid, the hosts ("The Voices"), and a contact form.

**Stack:** Vite + React 19 · Tailwind CSS v4 (`@theme` tokens) · GSAP
ScrollTrigger · lucide-react.

## Develop

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build → dist/
npm run preview  # preview the production build
npm run lint
```

## Where to edit content

| What you want to change | File |
| --- | --- |
| **Recent Episodes** + the **Latest Episode** (titles, guests, dates, badges, links) | [`src/data/episodes.js`](src/data/episodes.js) |
| **The Voices** (hosts — names, bios, handles) | [`src/data/hosts.js`](src/data/hosts.js) |
| **Spotify / YouTube / Instagram / email** links (Nav, Footer, Contact, "Discover all episodes") | [`src/data/links.js`](src/data/links.js) |
| Colors, fonts, effects (design tokens) | [`src/index.css`](src/index.css) |

### Episodes

Each episode in `src/data/episodes.js` has `title`, `guest`, `duration`, `date`,
`category` (`"Guest Episode"` | `"Deep Dive"` — drives the badge), `blurb`,
`accent`, and a `slug`. The first entry is the one featured in **Latest Episode**;
the rest fill the **Recent Episodes** grid.

Optional per-episode links:

- `youtubeId` — a YouTube video/Short id. When set, the card plays it inline
  (the latest episode uses the real hook Short). Otherwise it plays the local
  clip at `public/episodes/<slug>.mp4`, or shows a "hook coming soon" state.
- `url` — the full episode page; the card title and the "Listen now" button
  link there.

### Intro video

The full-screen opener plays `public/media/intro-alpha.webm` (with an
`intro.mp4` fallback) once per browser session, then fades into the site.
Reduced-motion visitors skip it.

## Design

Colors, fonts, and effects live as tokens in [`src/index.css`](src/index.css)
(`@theme` + `:root`); components reference the tokens — no hardcoded hex. The
animated background is a single 2D canvas ([`BeamField`](src/components/BeamField.jsx))
shared by every section. Everything respects `prefers-reduced-motion`.
