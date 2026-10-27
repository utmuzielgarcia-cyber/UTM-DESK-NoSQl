import { ArrowUpRight } from 'lucide-react'
import { roles } from '../data.js'
import Reveal from './Reveal.jsx'

const fills = ['bg-brand-600', 'bg-accent-500', 'bg-brand-900', 'bg-accent-400', 'bg-brand-600']

export default function RolesSection() {
  return (
    <section id="roles" className="bg-white py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <p className="text-sm font-bold tracking-widest text-accent-500 uppercase">Cinco perfiles</p>
          <h2 className="mt-4 font-display text-[clamp(2.6rem,6vw,5.5rem)] leading-[0.92] font-extrabold tracking-[-0.04em] text-ink">
            Cada quien, <span className="text-brand-600">su vista.</span>
          </h2>
        </Reveal>

        <ul className="mt-14 border-t-2 border-ink">
          {roles.map(({ icon: Icon, name, text }, index) => (
            <li key={name} className="group relative overflow-hidden border-b-2 border-ink">
              <span
                className={`absolute inset-0 origin-bottom scale-y-0 ${fills[index]} transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-y-100`}
                aria-hidden="true"
              />
              <div className="relative flex flex-wrap items-center gap-x-6 gap-y-2 py-6 sm:py-8">
                <span className="font-mono text-sm text-ink/50">0{index + 1}</span>
                <Icon className="h-8 w-8 text-ink" aria-hidden="true" />
                <h3 className="font-display text-4xl font-extrabold tracking-tight text-ink sm:text-6xl">{name}</h3>
                <p className="w-full text-ink/70 sm:ml-auto sm:w-auto sm:max-w-xs sm:text-right">{text}</p>
                <ArrowUpRight className="hidden h-8 w-8 -rotate-45 text-ink transition duration-500 group-hover:rotate-0 sm:block" aria-hidden="true" />
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
