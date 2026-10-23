import SectionHeading from '../../../components/ui/SectionHeading.jsx'
import { roles } from '../data.js'

export default function Roles() {
  return (
    <section id="roles" className="scroll-mt-24 bg-white py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Roles"
          title="Cada quien ve lo que necesita"
          description="Los permisos dependen de tu rol, así la información se mantiene ordenada y segura."
        />

        <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
          {roles.map(({ icon: Icon, title, description }) => (
            <article
              key={title}
              className="rounded-2xl bg-slate-50 p-6 ring-1 ring-slate-100 transition duration-300 hover:bg-white hover:shadow-lift"
            >
              <span className="grid h-12 w-12 place-items-center rounded-xl bg-brand-100 text-brand-700">
                <Icon className="h-6 w-6" aria-hidden="true" />
              </span>
              <h3 className="mt-5 font-bold text-brand-950">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">{description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
