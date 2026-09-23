function bullets(text) {
  if (!text) return []
  return text.split(/(?<=\.)\s+(?=[A-Z])/).map(s => s.trim()).filter(Boolean)
}

function ExpCard({ item, index }) {
  const points = bullets(item.desc)
  return (
    <li className="xcard" style={{ '--dom': item.color || 'var(--c1)' }}>
      <div className="xcard-side">
        <span className="xcard-num">{String(index + 1).padStart(2, '0')}</span>
        <div className="xcard-logo" style={item.logoBg ? { background: item.logoBg } : undefined}>
          {item.logo
            ? <img src={item.logo} alt={item.org + ' logo'} loading="lazy" />
            : <span className="xcard-mono">{item.mono || item.org.slice(0, 2)}</span>}
        </div>
        <span className="xcard-date">{item.date}</span>
      </div>
      <div className="xcard-main">
        <h3 className="xcard-role">{item.role}</h3>
        <div className="xcard-org">{item.org}, {item.location}</div>
        {item.prev && <div className="tl-prev">{item.prev}</div>}
        {points.length > 1
          ? <ul className="xcard-points">{points.map(p => <li key={p}>{p}</li>)}</ul>
          : points.length === 1 && <p className="xcard-text">{points[0]}</p>}
        {item.tags && item.tags.length > 0 && (
          <ul className="tags" aria-label="Skills used">
            {item.tags.map(t => <li key={t}>{t}</li>)}
          </ul>
        )}
      </div>
    </li>
  )
}

export default function Timeline({ id, title, intro, items }) {
  return (
    <section id={id} className="section">
      <div className="wrap">
        <h2 className="h2 big">{title}</h2>
        {intro ? <p className="intro">{intro}</p> : <div style={{ height: '1.75rem' }} />}
        <ol className="xlist">
          {items.map((item, i) => <ExpCard key={item.role + item.org} item={item} index={i} />)}
        </ol>
      </div>
    </section>
  )
}
