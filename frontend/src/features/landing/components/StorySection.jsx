import { useLayoutEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { MapPin } from 'lucide-react'
import { story } from '../data.js'

gsap.registerPlugin(ScrollTrigger)

// Narrativa guiada por scroll: la sección se fija y avanza paso a paso.
export default function StorySection() {
  const root = useRef(null)
  const [active, setActive] = useState(0)

  useLayoutEffect(() => {
    const mm = gsap.matchMedia()

    mm.add('(prefers-reduced-motion: no-preference)', () => {
      const steps = gsap.utils.toArray('.story-step', root.current)
      gsap.set(steps.slice(1), { autoAlpha: 0, yPercent: 30 })

      const tl = gsap.timeline({
        defaults: { ease: 'power2.inOut' },
        scrollTrigger: {
          trigger: root.current,
          start: 'top top',
          end: `+=${steps.length * 90}%`,
          pin: true,
          scrub: 0.8,
          onUpdate: (self) => setActive(Math.round(self.progress * (steps.length - 1))),
        },
      })

      steps.forEach((step, index) => {
        if (index === 0) return
        tl.to(steps[index - 1], { autoAlpha: 0, yPercent: -30 }).to(step, { autoAlpha: 1, yPercent: 0 }, '<')
      })
      tl.fromTo('.story-progress', { scaleX: 0.25 }, { scaleX: 1, ease: 'none', duration: tl.duration() }, 0)
      tl.to('.story-card', { rotate: 4, ease: 'none', duration: tl.duration() }, 0)
    })

    return () => mm.revert()
  }, [])

  const current = story[active]

  return (
    <section id="proceso" ref={root} className="relative overflow-hidden bg-white motion-safe:h-[100svh]">
      <div className="mx-auto grid h-full max-w-7xl items-center gap-12 px-4 py-24 sm:px-6 lg:grid-cols-2 lg:px-8">
        <div>
          <p className="text-sm font-bold tracking-widest text-brand-600 uppercase">Cómo funciona</p>
          <div className="mt-3 h-1.5 w-full max-w-xs overflow-hidden rounded-full bg-ink/10 motion-reduce:hidden">
            <div className="story-progress h-full origin-left rounded-full bg-ink" />
          </div>

          <div className="relative mt-10 motion-safe:h-[22rem] sm:motion-safe:h-[20rem]">
            {story.map(({ icon: Icon, kicker, title, text, color }) => (
              <article key={title} className="story-step mb-12 motion-safe:absolute motion-safe:inset-0 motion-safe:mb-0">
                <div className="flex items-center gap-3">
                  <span className={`grid h-12 w-12 place-items-center rounded-2xl ${color} text-ink`}>
                    <Icon className={`h-6 w-6 ${color === 'bg-accent-400' || color === 'bg-accent-500' ? 'text-ink' : 'text-white'}`} aria-hidden="true" />
                  </span>
                  <span className="text-sm font-bold tracking-widest text-ink/50 uppercase">{kicker}</span>
                </div>
                <h3 className="mt-6 font-display text-[clamp(3.5rem,9vw,7.5rem)] leading-[0.9] font-extrabold tracking-[-0.04em] text-ink">
                  {title}
                </h3>
                <p className="mt-6 max-w-md text-lg leading-relaxed text-ink/70">{text}</p>
              </article>
            ))}
          </div>
        </div>

        <div className="relative mx-auto hidden w-full max-w-sm lg:block motion-reduce:hidden">
          <div className={`absolute -inset-10 rounded-full ${current.color} opacity-30 blur-3xl transition-colors duration-700`} aria-hidden="true" />
          <div className="story-card relative rounded-[2rem] bg-ink p-6 text-white shadow-2xl">
            <div className="flex items-center justify-between">
              <span className="font-mono text-sm text-white/60">INC-2026-0142</span>
              <span className={`rounded-full px-3 py-1 text-xs font-bold transition-colors duration-500 ${current.color} ${current.color.startsWith('bg-accent') ? 'text-ink' : 'text-white ring-1 ring-white/30'}`}>
                {current.status}
              </span>
            </div>
            <p className="mt-8 font-display text-3xl font-extrabold leading-tight">Sin internet en el laboratorio 3</p>
            <p className="mt-3 flex items-center gap-1.5 text-sm text-white/60">
              <MapPin className="h-4 w-4" aria-hidden="true" /> Edificio C · Cómputo y redes
            </p>

            <ol className="mt-10 space-y-4">
              {story.map((step, index) => (
                <li key={step.title} className="flex items-center gap-3">
                  <span
                    className={`h-3 w-3 rounded-full transition-all duration-500 ${
                      index <= active ? `${step.color} scale-125` : 'bg-white/20'
                    }`}
                  />
                  <span className={`text-sm font-semibold transition-colors duration-500 ${index <= active ? 'text-white' : 'text-white/40'}`}>
                    {step.title}
                  </span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  )
}
