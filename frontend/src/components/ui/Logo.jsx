export default function Logo({ light = false, href = '#inicio' }) {
  return (
    <a href={href} className="flex items-center gap-2.5" aria-label="UTM Desk, ir al inicio">
      <svg viewBox="0 0 32 32" className="h-9 w-9" aria-hidden="true">
        <rect width="32" height="32" rx="9" fill={light ? '#ffffff' : '#111a40'} />
        <path
          d="M9 9v8a7 7 0 0 0 14 0V9"
          fill="none"
          stroke={light ? '#2747d8' : '#e7b447'}
          strokeWidth="3.5"
          strokeLinecap="round"
        />
      </svg>
      <span className={`font-display text-lg font-extrabold tracking-tight ${light ? 'text-white' : 'text-ink'}`}>
        UTM <span className={light ? 'text-accent-300' : 'text-brand-600'}>Desk</span>
      </span>
    </a>
  )
}
