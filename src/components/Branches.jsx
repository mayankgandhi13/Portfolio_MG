import { useState } from 'react'

// Each earlier role is a branch that flows into the current one.
// Branches alternate above and below the trunk, in date order.
const BRANCHES = [
  { id: 'microlabs', org: 'Micro Labs', years: '2022', brought: 'Pharma QA & bench testing', color: 'var(--c5)', side: -1,
    story: 'Hands-on HPLC, GC, FTIR and dissolution testing showed me how lab data is produced and how QA judges it. That QA lens is half of my role at Century.' },
  { id: 'ncbs', org: 'NCBS-TIFR', years: '2023', brought: 'Modeling & validation', color: 'var(--c2)', side: 1,
    story: "ODE models of Parkinson's synapses, validated against curated experiments with FindSim. Testing against known answers is the same idea behind the ground-truth benchmarking I do at Century." },
  { id: 'letsexcel', org: "Let's Excel", years: '2023–24', brought: 'Python & pharma analytics', color: 'var(--c6)', side: -1,
    story: 'Python for DataPandit, a predictive analytics platform for pharma quality management: data science applied to the same quality problems I had seen at Micro Labs.' },
  { id: 'cencora', org: 'Cencora', years: '2025', brought: 'Production software & QC', color: 'var(--c4)', side: 1,
    story: 'Shipping an Angular and Spring Boot app with SQL-driven data mapping and automated QC reports. It is why I build pipelines as software other people can use.' },
]
const NOW = {
  id: 'century', org: 'Century Therapeutics', years: '2026–now', brought: 'Comp bio + QA', color: 'var(--c1)',
  story: 'Bulk RNA-seq deconvolution for cell-therapy QA: lab context, modeling and validation, data science and software engineering, all in one role.',
}

const W = 1000, H = 360, TRUNK = 175, LANE = 8
const END_X = 868
// lane offsets: later branches join on the outside so no two streams cross
const LANES = [-0.5, 0.5, -1.5, 1.5]

function branchPath(b, i) {
  const sx = 70 + i * 165, sy = TRUNK + b.side * 105
  const mx = sx + 175, ly = TRUNK + LANES[i] * LANE
  return {
    sx, sy,
    d: `M${sx} ${sy} H${sx + 35} C${sx + 115} ${sy} ${mx - 70} ${ly} ${mx} ${ly} H${END_X}`,
  }
}

function jump(id) {
  document.getElementById('job-' + id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

export default function Branches() {
  const [active, setActive] = useState(null)
  const cur = active === NOW.id ? NOW : BRANCHES.find(b => b.id === active)
  const target = id => ({
    tabIndex: 0,
    role: 'button',
    onMouseEnter: () => setActive(id),
    onFocus: () => setActive(id),
    onClick: () => jump(id),
    onKeyDown: e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); jump(id) } },
  })

  return (
    <figure className="figure branches" onMouseLeave={() => setActive(null)}>
      <div className="br-scroll">
        <svg viewBox={`0 0 ${W} ${H}`} role="img" aria-label="Four earlier roles drawn as branches that merge into my current role at Century Therapeutics">
          {BRANCHES.map((b, i) => {
            const { sx, sy, d } = branchPath(b, i)
            const dim = active && active !== b.id && active !== NOW.id
            const labelY = b.side < 0 ? sy - 46 : sy + 30
            return (
              <g key={b.id} className={'br' + (dim ? ' dim' : '') + (active === b.id ? ' on' : '')} style={{ '--dom': b.color }}
                aria-label={`${b.org}, ${b.years}: ${b.brought}. Jump to details.`} {...target(b.id)}>
                <path d={d} className="br-hit" />
                <path d={d} className="br-line" />
                <circle cx={sx} cy={sy} r="7" className="br-start" />
                <text x={sx - 8} y={labelY} className="br-org">{b.org}</text>
                <text x={sx - 8} y={labelY + 16} className="br-years">{b.years}</text>
                <text x={sx - 8} y={labelY + 33} className="br-brought">{b.brought}</text>
              </g>
            )
          })}
          <g className={'br br-now' + (active === NOW.id ? ' on' : '')} style={{ '--dom': NOW.color }}
            aria-label={`${NOW.org}, ${NOW.years}. Jump to details.`} {...target(NOW.id)}>
            <circle cx={END_X + 34} cy={TRUNK} r="34" className="br-now-ring" />
            <circle cx={END_X + 34} cy={TRUNK} r="26" className="br-now-core" />
            <text x={END_X + 34} y={TRUNK + 4} textAnchor="middle" className="br-now-label">NOW</text>
            <text x={END_X + 68} y={TRUNK - 52} textAnchor="end" className="br-org">{NOW.org}</text>
            <text x={END_X + 68} y={TRUNK + 62} textAnchor="end" className="br-years">{NOW.years}</text>
          </g>
        </svg>
      </div>
      <figcaption aria-live="polite">
        {cur
          ? <><b>{cur.org}, {cur.years}.</b> {cur.story} <a href={'#job-' + cur.id}>Details ↓</a></>
          : <>Every role I have had is a branch feeding the one I am in now. Hover a branch to see what it brought; click it to jump to the details.</>}
      </figcaption>
    </figure>
  )
}
