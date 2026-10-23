import { ArrowRight, PlayCircle, Star } from 'lucide-react'
import Button from '../../../components/ui/Button.jsx'
import HeroIllustration from './HeroIllustration.jsx'

export default function Hero() {
  return (
    <section id="inicio" className="relative overflow-hidden pt-32 pb-20 sm:pt-40 lg:pb-28">
      <div
        className="absolute inset-0 -z-10 bg-gradient-to-br from-brand-50 via-white to-accent-300/20"
        aria-hidden="true"
      />
      <div className="absolute inset-x-0 bottom-0 -z-10 h-40 bg-gradient-to-b from-transparent to-slate-50" aria-hidden="true" />
      <div className="absolute -top-40 right-0 -z-10 h-96 w-96 rounded-full bg-brand-200/50 blur-3xl" aria-hidden="true" />

      <div className="mx-auto grid max-w-7xl items-center gap-16 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-1.5 text-sm font-medium text-brand-800 shadow-soft ring-1 ring-brand-100">
            <span className="h-2 w-2 rounded-full bg-accent-400" aria-hidden="true" />
            Mesa de ayuda del campus
          </span>

          <h1 className="mt-6 text-4xl font-extrabold leading-tight tracking-tight text-brand-950 sm:text-5xl lg:text-6xl">
            Reporta, sigue y resuelve las incidencias del{' '}
            <span className="bg-gradient-to-r from-brand-600 to-accent-500 bg-clip-text text-transparent">campus</span>
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-relaxed text-slate-600">
            UTM Desk reemplaza los correos y las hojas de cálculo. Cada reporte recibe un folio, se asigna al técnico
            adecuado y puedes ver su avance en todo momento.
          </p>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <Button href="#acceso" size="lg">
              Reportar incidencia <ArrowRight className="h-5 w-5" aria-hidden="true" />
            </Button>
            <Button href="#como-funciona" variant="secondary" size="lg">
              <PlayCircle className="h-5 w-5" aria-hidden="true" /> Ver cómo funciona
            </Button>
          </div>

          <div className="mt-10 flex items-center gap-4">
            <div className="flex -space-x-2">
              {['DR', 'MA', 'LG', 'JP'].map((initials, index) => (
                <span
                  key={initials}
                  className={`grid h-10 w-10 place-items-center rounded-full text-xs font-bold text-white ring-2 ring-white ${
                    ['bg-brand-600', 'bg-accent-500', 'bg-indigo-500', 'bg-brand-900'][index]
                  }`}
                >
                  {initials}
                </span>
              ))}
            </div>
            <div className="text-sm">
              <div className="flex items-center gap-0.5 text-amber-400" aria-label="Calificación de 4.9 de 5">
                {Array.from({ length: 5 }).map((_, index) => (
                  <Star key={index} className="h-4 w-4 fill-current" aria-hidden="true" />
                ))}
              </div>
              <p className="mt-0.5 text-slate-600">
                <span className="font-semibold text-brand-950">4.9/5</span> de la comunidad universitaria
              </p>
            </div>
          </div>
        </div>

        <HeroIllustration />
      </div>
    </section>
  )
}
