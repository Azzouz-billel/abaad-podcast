const CATEGORY_STYLES = {
  'Guest Episode': 'border-[rgba(34,197,94,0.4)] bg-[rgba(34,197,94,0.12)] text-mint',
  'Deep Dive': 'border-[rgba(182,240,138,0.4)] bg-[rgba(182,240,138,0.12)] text-phosphor',
}

export function EpisodeBadge({ category }) {
  const style = CATEGORY_STYLES[category] ?? CATEGORY_STYLES['Guest Episode']
  return (
    <span
      className={`inline-flex items-center rounded-full border px-2.5 py-1 font-mono text-[0.62rem] uppercase tracking-[0.14em] ${style}`}
    >
      {category}
    </span>
  )
}
