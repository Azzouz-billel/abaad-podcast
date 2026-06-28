import { HostCard } from './HostCard'
import { hosts } from '../data/hosts'
import { useScrollReveal } from '../hooks/useScrollReveal'

export function Hosts() {
  const scope = useScrollReveal({ stagger: 0.12 })

  return (
    <section id="hosts" ref={scope} className="mx-auto max-w-6xl px-5 py-28 sm:py-36">
      <div className="mb-14 max-w-2xl">
        <p data-reveal className="eyebrow mb-5">
          The voices
        </p>
        <h2
          data-reveal
          className="font-display text-[clamp(2rem,5vw,3.5rem)] font-semibold leading-tight tracking-tight"
        >
          Two hosts, one <span className="text-gradient">long conversation</span>.
        </h2>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        {hosts.map((host) => (
          <HostCard key={host.name} host={host} />
        ))}
      </div>
    </section>
  )
}
