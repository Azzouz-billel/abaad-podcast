import { Mic, Video, AudioLines, Heart, ShieldCheck } from 'lucide-react'

import { MagneticButton } from './MagneticButton'
import { links } from '../data/links'
import { useScrollReveal } from '../hooks/useScrollReveal'

const FUNDS = [
  { icon: Mic, label: 'Studio microphones', note: 'Clean, warm audio' },
  { icon: Video, label: 'A proper camera', note: 'Video worth watching' },
  { icon: AudioLines, label: 'Room treatment', note: 'No echo, no noise' },
]

export function Support() {
  const scope = useScrollReveal({ stagger: 0.1 })
  const canPay = Boolean(links.chargily)

  return (
    <section id="support" ref={scope} className="mx-auto max-w-6xl px-5 py-28 sm:py-36">
      <div className="glass relative overflow-hidden rounded-[2rem] p-8 sm:p-12">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(75%_70%_at_15%_0%,rgba(34,197,94,0.16),transparent_60%)]" />

        <div className="relative grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-16">
          <div>
            <p data-reveal className="eyebrow mb-5">
              Support the show
            </p>
            <h2
              data-reveal
              className="font-display text-[clamp(2rem,5vw,3.5rem)] font-semibold leading-[1.05] tracking-tight"
            >
              Help us <span className="text-gradient">level up</span>.
            </h2>
            <p data-reveal className="mt-6 max-w-md text-lg leading-relaxed text-moss">
              Abaad runs on borrowed gear. Chip in and help us buy our own — better mics,
              a real camera, proper sound — so every conversation sounds and looks the way
              it deserves.
            </p>

            <div data-reveal className="mt-9">
              {canPay ? (
                <MagneticButton
                  href={links.chargily}
                  target="_blank"
                  rel="noopener noreferrer"
                  strength={0.4}
                  className="group inline-flex items-center gap-2.5 rounded-full bg-[linear-gradient(120deg,var(--color-emerald),var(--color-mint))] px-7 py-3.5 font-medium text-[#06120c] shadow-[var(--glow-emerald)] transition-transform duration-300"
                >
                  <Heart size={18} fill="#06120c" strokeWidth={0} />
                  <span>Contribute on Chargily</span>
                </MagneticButton>
              ) : (
                <span className="glass inline-flex cursor-not-allowed items-center gap-2.5 rounded-full px-7 py-3.5 font-medium text-moss">
                  <Heart size={18} />
                  <span>Contributions opening soon</span>
                </span>
              )}

              <p className="mt-4 flex items-center gap-2 font-mono text-[0.7rem] uppercase tracking-[0.14em] text-moss">
                <ShieldCheck size={14} className="text-phosphor" />
                Secure payment · CIB &amp; EDAHABIA · via Chargily
              </p>
            </div>
          </div>

          <ul className="grid gap-3">
            {FUNDS.map(({ icon: Icon, label, note }) => (
              <li
                key={label}
                data-reveal
                className="flex items-center gap-4 rounded-2xl border border-[var(--line)] bg-[rgba(11,32,24,0.4)] p-4 transition-colors duration-300 hover:border-[var(--line-bright)]"
              >
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[rgba(34,197,94,0.12)] text-phosphor">
                  <Icon size={20} strokeWidth={1.75} />
                </span>
                <div>
                  <p className="font-display text-base font-medium text-bone">{label}</p>
                  <p className="text-sm text-moss">{note}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
