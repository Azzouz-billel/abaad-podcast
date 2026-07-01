import { useState } from 'react'

import { Nav } from './components/Nav'
import { Hero } from './components/Hero'
import { About } from './components/About'
import { LatestEpisode } from './components/LatestEpisode'
import { Episodes } from './components/Episodes'
import { Hosts } from './components/Hosts'
import { Support } from './components/Support'
import { Contact } from './components/Contact'
import { Footer } from './components/Footer'
import { BeamField } from './components/BeamField'
import { IntroVideo } from './components/IntroVideo'
import { hasSeenIntro } from './lib/intro'

function App() {
  // `revealed` starts the hero entrance; `introGone` unmounts the overlay once
  // it has finished dissolving — the two overlap for a single crossfade.
  const [revealed, setRevealed] = useState(hasSeenIntro)
  const [introGone, setIntroGone] = useState(hasSeenIntro)

  return (
    <>
      {/* One site-wide background: the light-beam field behind every section. */}
      <div className="fixed inset-0 z-0 overflow-hidden" aria-hidden="true">
        <BeamField />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(80%_55%_at_50%_0%,rgba(34,197,94,0.16),transparent_60%)]" />
        <div className="grain pointer-events-none absolute inset-0" />
      </div>

      <Nav />

      <main className="relative z-10">
        <Hero start={revealed} />
        <About />
        <LatestEpisode />
        <Episodes />
        <Hosts />
        <Support />
        <Contact />
      </main>

      <div className="relative z-10">
        <Footer />
      </div>

      {!introGone && (
        <IntroVideo onReveal={() => setRevealed(true)} onExit={() => setIntroGone(true)} />
      )}
    </>
  )
}

export default App
