import { Asterisk } from 'lucide-react'
import { marqueeWords } from '../data.js'

export default function Marquee() {
  const words = [...marqueeWords, ...marqueeWords]

  return (
    <div className="relative overflow-hidden border-y border-white/10 bg-ink py-6" aria-hidden="true">
      <div className="flex w-max animate-marquee items-center gap-8">
        {words.map((word, index) => (
          <span key={index} className="flex items-center gap-8 font-display text-4xl font-extrabold tracking-tight text-white uppercase sm:text-6xl">
            {word}
            <Asterisk className="h-10 w-10 text-accent-400 sm:h-12 sm:w-12" strokeWidth={3} />
          </span>
        ))}
      </div>
    </div>
  )
}
