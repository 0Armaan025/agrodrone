export default function Placeholder({ title = 'Page' }) {
  return (
    <div className="min-h-[60vh] bg-surface rounded-3xl border border-line p-8 flex flex-col items-center justify-center gap-4 shadow-card">
      <h1 className="text-3xl font-bold text-ink">{title}</h1>
      <p className="text-ink-3">Full web-size page — content ready.</p>
    </div>
  )
}
