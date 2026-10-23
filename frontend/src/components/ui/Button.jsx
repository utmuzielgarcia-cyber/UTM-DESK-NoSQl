const variants = {
  primary:
    'bg-brand-700 text-white shadow-lift hover:bg-brand-800 focus-visible:outline-brand-700',
  secondary:
    'bg-white text-brand-900 ring-1 ring-slate-200 shadow-soft hover:ring-brand-200 hover:bg-brand-50 focus-visible:outline-brand-700',
  ghost: 'text-brand-900 hover:bg-brand-50 focus-visible:outline-brand-700',
  light: 'bg-white text-brand-900 hover:bg-brand-50 focus-visible:outline-white',
}

const sizes = {
  md: 'px-5 py-2.5 text-sm',
  lg: 'px-7 py-3.5 text-base',
}

export default function Button({ as: Tag = 'a', variant = 'primary', size = 'md', className = '', children, ...props }) {
  return (
    <Tag
      className={`inline-flex items-center justify-center gap-2 rounded-full font-semibold transition duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </Tag>
  )
}
