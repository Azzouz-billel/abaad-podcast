import { useState } from 'react'
import { Mail, Send, CheckCircle2 } from 'lucide-react'

import { InstagramIcon, YoutubeIcon, SpotifyIcon } from './BrandIcons'
import { links } from '../data/links'
import { useScrollReveal } from '../hooks/useScrollReveal'

const FIELD_CLASS =
  'w-full rounded-xl border border-[var(--line)] bg-[rgba(6,18,12,0.5)] px-4 py-3 text-bone placeholder:text-moss/70 transition-colors duration-300 focus:border-[var(--line-bright)] focus:outline-none'

export function Contact() {
  const scope = useScrollReveal({ stagger: 0.12 })
  const [status, setStatus] = useState('idle') // idle | sending | sent | error

  const handleSubmit = async (event) => {
    event.preventDefault()
    const form = event.currentTarget
    const data = new FormData(form)
    setStatus('sending')
    try {
      const res = await fetch(`https://formsubmit.co/ajax/${links.email}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          name: data.get('name'),
          email: data.get('email'),
          message: data.get('message'),
          _subject: 'New message from the Abaad website',
          _template: 'table',
          _captcha: 'false',
        }),
      })
      const json = await res.json().catch(() => ({}))
      if (res.ok && String(json.success) === 'true') {
        form.reset()
        setStatus('sent')
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  return (
    <section id="contact" ref={scope} className="mx-auto max-w-6xl px-5 py-28 sm:py-36">
      <div className="mb-14 max-w-2xl">
        <p data-reveal className="eyebrow mb-5">
          Get in touch
        </p>
        <h2
          data-reveal
          className="font-display text-[clamp(2rem,5vw,3.5rem)] font-semibold leading-tight tracking-tight"
        >
          Pitch a guest, or just <span className="text-gradient">say hello</span>.
        </h2>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.5fr_1fr]">
        <div data-reveal className="glass rounded-3xl p-8 sm:p-10">
          {status === 'sent' ? (
            <div role="status" className="flex h-full min-h-56 flex-col items-center justify-center gap-4 text-center">
              <CheckCircle2 size={40} className="text-phosphor" strokeWidth={1.5} />
              <p className="font-display text-2xl text-bone">Message on its way.</p>
              <p className="max-w-sm text-moss">
                Thanks for reaching out — we read every note and reply to the ones that
                start a good conversation.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              <div className="grid gap-5 sm:grid-cols-2">
                <div className="flex flex-col gap-2">
                  <label htmlFor="contact-name" className="font-mono text-xs uppercase tracking-[0.18em] text-moss">
                    Name
                  </label>
                  <input id="contact-name" name="name" type="text" required placeholder="Your name" className={FIELD_CLASS} />
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="contact-email" className="font-mono text-xs uppercase tracking-[0.18em] text-moss">
                    Email
                  </label>
                  <input id="contact-email" name="email" type="email" required placeholder="you@email.com" className={FIELD_CLASS} />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="contact-message" className="font-mono text-xs uppercase tracking-[0.18em] text-moss">
                  Message
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  required
                  rows={5}
                  placeholder="Tell us about the idea, the guest, or the question you can't stop turning over."
                  className={`${FIELD_CLASS} resize-none`}
                />
              </div>

              {status === 'error' && (
                <p role="alert" className="text-sm text-[#f0a5a5]">
                  Couldn't send that just now — please try again, or email us directly at{' '}
                  {links.email}.
                </p>
              )}

              <button
                type="submit"
                disabled={status === 'sending'}
                className="group mt-1 inline-flex items-center justify-center gap-2.5 self-start rounded-full bg-[linear-gradient(120deg,var(--color-emerald),var(--color-mint))] px-7 py-3.5 font-medium text-[#06120c] shadow-[var(--glow-emerald)] transition-transform duration-300 hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:scale-100"
              >
                <Send size={17} className="transition-transform duration-300 group-hover:translate-x-0.5" />
                <span>{status === 'sending' ? 'Sending…' : 'Send message'}</span>
              </button>
            </form>
          )}
        </div>

        <div data-reveal className="glass flex flex-col gap-8 rounded-3xl p-8 sm:p-10">
          <div>
            <p className="eyebrow mb-3">Direct</p>
            <a
              href={`mailto:${links.email}`}
              className="group flex items-center gap-3 text-lg text-bone transition-colors duration-300 hover:text-phosphor"
            >
              <Mail size={20} className="text-phosphor" />
              {links.email}
            </a>
          </div>

          <div>
            <p className="eyebrow mb-3">For guests</p>
            <p className="leading-relaxed text-moss">
              Working on something worth turning over from every side? Send a line and a
              link — we plan seasons around ideas, not calendars.
            </p>
          </div>

          <div className="mt-auto">
            <p className="eyebrow mb-4">Follow</p>
            <div className="flex items-center gap-5">
              <a href={links.instagram} target="_blank" rel="noopener noreferrer" aria-label="Abaad on Instagram" className="text-moss transition-colors duration-300 hover:text-bone">
                <InstagramIcon size={19} />
              </a>
              <a href={links.youtube} target="_blank" rel="noopener noreferrer" aria-label="Abaad on YouTube" className="text-moss transition-colors duration-300 hover:text-bone">
                <YoutubeIcon size={19} />
              </a>
              <a href={links.spotify} target="_blank" rel="noopener noreferrer" aria-label="Abaad on Spotify" className="text-moss transition-colors duration-300 hover:text-bone">
                <SpotifyIcon size={19} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
