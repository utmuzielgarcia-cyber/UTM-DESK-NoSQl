export default function SectionHeading({ eyebrow, title, description, align = 'center' }) {
  const alignment = align === 'center' ? 'mx-auto text-center' : 'text-left'

  return (
    <div className={`max-w-2xl ${alignment}`}>
      {eyebrow && (
        <p className="text-sm font-semibold uppercase tracking-widest text-accent-500">{eyebrow}</p>
      )}
      <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-brand-950 sm:text-4xl">{title}</h2>
      {description && <p className="mt-4 text-lg leading-relaxed text-slate-600">{description}</p>}
    </div>
  )
}
