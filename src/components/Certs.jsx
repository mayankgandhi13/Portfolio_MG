import { useMemo, useState } from 'react'

const CAT_COLORS = ['var(--c1)', 'var(--c2)', 'var(--c6)']

/* ---------- 4. Genome browser (IGV-style) ---------- */
const MONTHS = { Jan: 0, Feb: 1, Mar: 2, Apr: 3, May: 4, Jun: 5, Jul: 6, Aug: 7, Sep: 8, Oct: 9, Nov: 10, Dec: 11 }

function monthIndex(date) {
  const m = date.match(/([A-Z][a-z]{2})[^0-9]*?(\d{4})/)
  if (!m) return 0
  return (+m[2] - 2020) * 12 + (MONTHS[m[1]] ?? 0)
}

export function CertBrowser({ groups }) {
  const [active, setActive] = useState(null)
  const W = 1000, LEFT = 170, RIGHT = 20, SPAN = 84 // Jan 2020 → Dec 2026
  const x = m => LEFT + (m / SPAN) * (W - LEFT - RIGHT)
  const FEAT = 3 // each feature spans ~3 months

  const tracks = useMemo(() => {
    let id = 0
    return groups.map((g, gi) => {
      const items = g.items
        .map(c => ({ ...c, cat: g.name, ci: gi, color: CAT_COLORS[gi % CAT_COLORS.length], m: monthIndex(c.date), id: id++ }))
        .sort((a, b) => a.m - b.m)
      // expanded mode: pack features + labels into rows so nothing overlaps
      const rowsEnd = []
      items.forEach(c => {
        const x0 = x(c.m)
        const labelW = Math.min(c.title.length, 26) * 5.6
        const x1 = Math.max(x(c.m + FEAT), x0 + labelW)
        let r = rowsEnd.findIndex(end => end + 10 < x0)
        if (r === -1) { r = rowsEnd.length; rowsEnd.push(0) }
        rowsEnd[r] = x1
        c.row = r
      })
      return { name: g.name, color: CAT_COLORS[gi % CAT_COLORS.length], items, rows: Math.max(rowsEnd.length, 1) }
    })
  }, [groups])

  const ROW_H = 34, TRACK_PAD = 14, RULER_Y = 64
  let yCursor = RULER_Y + 26
  const laid = tracks.map(t => {
    const y0 = yCursor
    const h = t.rows * ROW_H + TRACK_PAD
    yCursor += h
    return { ...t, y0, h }
  })
  const H = yCursor + 10
  const all = laid.flatMap(t => t.items.map(c => ({ ...c, y: t.y0 + 8 + c.row * ROW_H })))
  const cur = active !== null ? all.find(c => c.id === active) : null
  const years = [2020, 2021, 2022, 2023, 2024, 2025, 2026]

  return (
    <div className="gb">
      <div className="gb-toolbar">
        <span className="gb-genome">hg-career</span>
        <span className="gb-locus">chrLearning:2020–2026</span>
        <span className="gb-count">{all.length} features · {groups.length} tracks</span>
      </div>
      <svg viewBox={`0 0 ${W} ${H}`} role="img" aria-label="Certifications drawn as features in a genome browser, positioned by date">
        {/* ideogram */}
        <rect x={LEFT} y="14" width={W - LEFT - RIGHT} height="14" rx="7" className="gb-ideo" />
        {years.map((yr, i) => (
          <rect key={yr} x={x(i * 12)} y="14" width={x(12) - x(0)} height="14" className={i % 2 ? 'gb-band-a' : 'gb-band-b'}
            clipPath="url(#ideoClip)" />
        ))}
        <defs><clipPath id="ideoClip"><rect x={LEFT} y="14" width={W - LEFT - RIGHT} height="14" rx="7" /></clipPath></defs>
        {cur && <rect x={x(cur.m) - 2} y="11" width={x(cur.m + FEAT) - x(cur.m) + 4} height="20" className="gb-ideo-mark" />}
        <text x={LEFT - 12} y="25" className="gb-label" textAnchor="end">chrLearning</text>

        {/* ruler */}
        <line x1={LEFT} x2={W - RIGHT} y1={RULER_Y} y2={RULER_Y} className="gb-axis" />
        {Array.from({ length: SPAN + 1 }, (_, m) => (
          <line key={m} x1={x(m)} x2={x(m)} y1={RULER_Y} y2={RULER_Y + (m % 12 === 0 ? -9 : -4)} className="gb-axis" />
        ))}
        {years.map((yr, i) => (
          <text key={yr} x={x(i * 12) + 3} y={RULER_Y - 12} className="gb-tick">{yr}</text>
        ))}

        {/* tracks */}
        {laid.map(t => (
          <g key={t.name}>
            <rect x="0" y={t.y0 - 6} width={W} height={t.h} className="gb-track-bg" />
            <text x={LEFT - 12} y={t.y0 + 14} className="gb-track-name" textAnchor="end">{t.name}</text>
            <line x1="0" x2={W} y1={t.y0 + t.h - 6} y2={t.y0 + t.h - 6} className="gb-sep" />
          </g>
        ))}
        {all.map(c => {
          const x0 = x(c.m), x1 = x(c.m + FEAT)
          const on = active === c.id
          return (
            <g
              key={c.id}
              className={'gb-feat' + (on ? ' on' : '') + (active !== null && !on ? ' dim' : '')}
              style={{ '--dom': c.color }}
              tabIndex={0}
              role="button"
              aria-label={`${c.title}, ${c.issuer}, ${c.date}`}
              onMouseEnter={() => setActive(c.id)}
              onFocus={() => setActive(c.id)}
              onClick={() => setActive(c.id)}
            >
              <rect x={x0 - 4} y={c.y - 4} width={Math.max(x1 - x0, 140) + 8} height="30" fill="transparent" />
              <line x1={x0 - 6} x2={x1 + 6} y1={c.y + 5} y2={c.y + 5} className="gb-intron" />
              <rect x={x0} y={c.y} width={x1 - x0} height="10" rx="1.5" className="gb-exon" />
              {[0.3, 0.7].map(f => (
                <path key={f} d={`M${x0 + (x1 - x0) * f - 2} ${c.y + 2.5} l3 2.5 l-3 2.5`} className="gb-strand" />
              ))}
              <text x={x0 + Math.min(c.title.length, 26) * 5.6 > W - RIGHT ? x1 : x0} textAnchor={x0 + Math.min(c.title.length, 26) * 5.6 > W - RIGHT ? 'end' : 'start'} y={c.y + 23} className="gb-feat-label">{c.title.length > 26 ? c.title.slice(0, 25) + '…' : c.title}</text>
            </g>
          )
        })}
      </svg>
      <div className="gb-popup" aria-live="polite">
        {cur ? (
          <div className="gb-popup-inner" style={{ '--dom': cur.color }}>
            <div className="gb-kv"><span>Feature</span><b>{cur.title}</b></div>
            <div className="gb-kv"><span>Source</span>{cur.issuer}</div>
            <div className="gb-kv"><span>Position</span>chrLearning:{cur.date}</div>
            <div className="gb-kv"><span>Track</span>{cur.cat}</div>
            {cur.note && <div className="gb-kv"><span>Notes</span>{cur.note}</div>}
            {cur.href && <a className="cert-view" href={cur.href} target="_blank" rel="noreferrer">View credential</a>}
          </div>
        ) : (
          <div className="gb-popup-empty">Every certificate is a feature on chrLearning, placed at the month I earned it. Hover or tap one to open its details, just like IGV.</div>
        )}
      </div>
    </div>
  )
}
