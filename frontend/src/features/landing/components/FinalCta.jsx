import { ArrowRight } from 'lucide-react'
import MagneticButton from './MagneticButton.jsx'
import Reveal from './Reveal.jsx'

export default function FinalCta() {
  return (
    <section className="relative overflow-hidden bg-white bg-grain py-32">
      <div className="absolute -bottom-40 left-1/2 h-96 w-[60rem] -translate-x-1/2 rounded-full bg-brand-300/30 blur-[140px]" aria-hidden="true" />
      <Reveal className="relative mx-auto max-w-6xl px-4 text-center sm:px-6">
        <h2 className="font-display text-[clamp(3.2rem,11vw,10rem)] leading-[0.85] font-extrabold tracking-[-0.05em] text-ink">
          ¿Algo falla?
          <br />
          <span className="text-brand-600">Repórtalo.</span>
        </h2>
        <p className="mx-auto mt-8 max-w-lg text-lg text-ink/70">
          Entra con tu cuenta institucional y levanta tu primer reporte en menos de un minuto.
        </p>
        <div className="mt-10 flex justify-center">
          <MagneticButton to="/login" className="px-10 py-5 text-lg">
            Iniciar sesión <ArrowRight className="h-5 w-5" aria-hidden="true" />
          </MagneticButton>
        </div>
      </Reveal>
    </section>
  )
}
