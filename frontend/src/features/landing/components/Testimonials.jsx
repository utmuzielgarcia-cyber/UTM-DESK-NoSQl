import { Quote } from 'lucide-react'
import SectionHeading from '../../../components/ui/SectionHeading.jsx'
import { testimonials } from '../data.js'

export default function Testimonials() {
  return (
    <section id="testimonios" className="scroll-mt-24 py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Testimonios"
          title="Lo que dice la comunidad"
          description="Opiniones de ejemplo de quienes usarían UTM Desk todos los días."
        />

        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {testimonials.map(({ quote, name, role, initials }) => (
            <figure key={name} className="flex flex-col rounded-3xl bg-white p-8 shadow-soft ring-1 ring-slate-100">
              <Quote className="h-8 w-8 text-accent-400" aria-hidden="true" />
              <blockquote className="mt-4 flex-1 leading-relaxed text-slate-700">“{quote}”</blockquote>
              <figcaption className="mt-8 flex items-center gap-3">
                <span className="grid h-11 w-11 place-items-center rounded-full bg-gradient-to-br from-brand-600 to-accent-500 text-sm font-bold text-white">
                  {initials}
                </span>
                <div>
                  <p className="font-semibold text-brand-950">{name}</p>
                  <p className="text-sm text-slate-500">{role}</p>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}
