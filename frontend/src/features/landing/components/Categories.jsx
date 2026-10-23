import SectionHeading from '../../../components/ui/SectionHeading.jsx'
import { categories, features } from '../data.js'

export default function Categories() {
  return (
    <section id="categorias" className="scroll-mt-24 py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Categorías"
          title="Todo lo que pasa en el campus, en un solo lugar"
          description="Clasifica tu reporte para que llegue directo al equipo que puede resolverlo."
        />

        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {categories.map(({ icon: Icon, title, description, examples, color }) => (
            <article
              key={title}
              className="group rounded-3xl bg-white p-8 shadow-soft ring-1 ring-slate-100 transition duration-300 hover:-translate-y-1 hover:shadow-lift"
            >
              <span className={`grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br ${color} text-white shadow-soft`}>
                <Icon className="h-7 w-7" aria-hidden="true" />
              </span>
              <h3 className="mt-6 text-xl font-bold text-brand-950">{title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-slate-600">{description}</p>
              <ul className="mt-6 flex flex-wrap gap-2">
                {examples.map((example) => (
                  <li key={example} className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
                    {example}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>

        <div className="mt-20 grid gap-8 rounded-3xl bg-gradient-to-br from-brand-900 to-brand-950 p-8 text-white shadow-lift sm:grid-cols-2 sm:p-12 lg:grid-cols-4">
          {features.map(({ icon: Icon, title, description }) => (
            <div key={title}>
              <span className="grid h-11 w-11 place-items-center rounded-xl bg-white/10 text-accent-300">
                <Icon className="h-5 w-5" aria-hidden="true" />
              </span>
              <h3 className="mt-4 font-bold">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-300">{description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
