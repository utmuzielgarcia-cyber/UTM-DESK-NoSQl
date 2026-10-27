// Barras horizontales simples, sin librerías.
export default function Barras({ datos, color = 'bg-brand-600' }) {
  const max = Math.max(1, ...datos.map((d) => d.valor))
  if (!datos.length) return <p className="text-sm text-slate-500">Sin datos todavía.</p>
  return (
    <ul className="space-y-3.5">
      {datos.map((d) => (
        <li key={d.etiqueta}>
          <div className="flex justify-between text-sm"><span className="text-slate-600">{d.etiqueta}</span><span className="font-semibold text-ink tabular-nums">{d.valor}</span></div>
          <div className="mt-1.5 h-2 rounded-full bg-slate-100">
            <div className={`h-2 rounded-full ${color} transition-[width] duration-700`} style={{ width: `${(d.valor / max) * 100}%` }} />
          </div>
        </li>
      ))}
    </ul>
  )
}
