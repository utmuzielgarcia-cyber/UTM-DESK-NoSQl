import { ArrowRight } from 'lucide-react'
import Button from '../../../components/ui/Button.jsx'

export default function CallToAction() {
  return (
    <section id="acceso" className="scroll-mt-24 pb-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-brand-700 via-brand-800 to-brand-950 px-6 py-16 text-center shadow-lift sm:px-16">
          <div className="absolute -top-24 -right-24 h-72 w-72 rounded-full bg-accent-400/30 blur-3xl" aria-hidden="true" />
          <div className="absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-brand-500/40 blur-3xl" aria-hidden="true" />

          <h2 className="relative text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            ¿Algo no funciona en el campus?
          </h2>
          <p className="relative mx-auto mt-4 max-w-xl text-lg text-brand-100">
            Inicia sesión con tu cuenta institucional y levanta tu reporte en menos de un minuto.
          </p>
          <div className="relative mt-10 flex justify-center">
            <Button href="#acceso" variant="light" size="lg">
              Iniciar sesión <ArrowRight className="h-5 w-5" aria-hidden="true" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
