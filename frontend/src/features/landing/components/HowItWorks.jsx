import SectionHeading from '../../../components/ui/SectionHeading.jsx'
import { steps } from '../data.js'

export default function HowItWorks() {
  return (
    <section id="como-funciona" className="scroll-mt-24 bg-white py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Cómo funciona"
          title="De reporte a solución en cuatro pasos"
          description="Cada incidencia recibe un folio único con el formato INC-AAAA-NNNN para que nunca pierdas el seguimiento."
        />

        <ol className="relative mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div
            className="absolute top-8 left-[12%] right-[12%] hidden h-0.5 bg-gradient-to-r from-brand-200 via-accent-300 to-brand-200 lg:block"
            aria-hidden="true"
          />
          {steps.map(({ icon: Icon, title, description }, index) => (
            <li key={title} className="relative text-center">
              <span className="relative mx-auto grid h-16 w-16 place-items-center rounded-2xl bg-gradient-to-br from-brand-600 to-brand-800 text-white shadow-lift">
                <Icon className="h-7 w-7" aria-hidden="true" />
                <span className="absolute -top-2 -right-2 grid h-7 w-7 place-items-center rounded-full bg-accent-400 text-xs font-bold text-brand-950 ring-4 ring-white">
                  {index + 1}
                </span>
              </span>
              <h3 className="mt-6 text-lg font-bold text-brand-950">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">{description}</p>
            </li>
          ))}
        </ol>

        <div className="mx-auto mt-16 flex max-w-md items-center justify-between rounded-2xl bg-brand-50 p-5 ring-1 ring-brand-100">
          <div>
            <p className="text-xs font-medium text-slate-500">Folio de ejemplo</p>
            <p className="mt-1 font-mono text-xl font-bold text-brand-900">INC-2026-0142</p>
          </div>
          <span className="rounded-full bg-accent-300/40 px-3 py-1 text-xs font-semibold text-teal-800">Cerrada</span>
        </div>
      </div>
    </section>
  )
}
