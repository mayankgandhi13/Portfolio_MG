import { useEffect, useMemo, useState } from 'react'

const W = 420
const H = 340

// Each cluster is a domain of work; each point stands for a tool, method or dataset.
const clusters = [
  { id: 'rnaseq', label: 'Bulk & single-cell RNA-seq', color: 'var(--c1)', cx: 130, cy: 118, sx: 46, sy: 28, rot: 0.35, n: 110,
    items: 'Seurat, Scanpy, Squidpy, MuSiC, CIBERSORTx, BayesPrism, limma, DESeq2, clusterProfiler, fgsea, scGPT, Geneformer' },
  { id: 'rust', label: 'Rust tooling', color: 'var(--c2)', cx: 305, cy: 92, sx: 30, sy: 19, rot: -0.3, n: 58,
    items: 'rayon, extendr, PyO3, sprs, hnsw_rs; CellChatR, doublet-rs, gliph2-rs, scqc' },
  { id: 'pipelines', label: 'Pipelines & HPC', color: 'var(--c6)', cx: 256, cy: 210, sx: 36, sy: 20, rot: 0.2, n: 64,
    items: 'Nextflow, Snakemake, SLURM, Docker, Singularity, AWS, STAR, HISAT2, Salmon, BWA, GATK' },
  { id: 'ml', label: 'Machine learning & AI', color: 'var(--c3)', cx: 108, cy: 250, sx: 30, sy: 21, rot: -0.5, n: 50,
    items: 'PyTorch, scikit-learn, SHAP, interpretable ML, ensemble methods, agentic LLM pipelines' },
  { id: 'sysbio', label: 'Systems biology', color: 'var(--c4)', cx: 368, cy: 292, sx: 19, sy: 13, rot: 0.6, n: 26,
    items: "ODE models, HillTau, FindSim; Parkinson's synaptic signalling at NCBS-TIFR" },
  { id: 'wetlab', label: 'Wet lab & QA', color: 'var(--c5)', cx: 44, cy: 50, sx: 15, sy: 11, rot: 0, n: 18,
    items: 'HPLC, GC, FTIR, UV spectroscopy, dissolution testing, formulation QA at Micro Labs' },
]

function rng(seed) {
  return function () {
    seed |= 0; seed = (seed + 0x6d2b79f5) | 0
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

function gauss(r) {
  const u = Math.max(r(), 1e-6), v = r()
  return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v)
}

function buildPoints() {
  const r = rng(13)
  const pts = []
  clusters.forEach(c => {
    for (let i = 0; i < c.n; i++) {
      const a = gauss(r) * c.sx * 0.72, b = gauss(r) * c.sy * 0.72
      const x = c.cx + a * Math.cos(c.rot) - b * Math.sin(c.rot)
      const y = c.cy + a * Math.sin(c.rot) + b * Math.cos(c.rot)
      pts.push({
        c: c.id, color: c.color,
        x: Math.min(W - 8, Math.max(8, x)), y: Math.min(H - 8, Math.max(8, y)),
        x0: 30 + r() * (W - 60), y0: 30 + r() * (H - 60),
        d: Math.floor(r() * 400),
      })
    }
  })
  return pts
}

function Embedding() {
  const points = useMemo(buildPoints, [])
  const [settled, setSettled] = useState(false)
  const [active, setActive] = useState(null)

  useEffect(() => {
    const id = setTimeout(() => setSettled(true), 120)
    return () => clearTimeout(id)
  }, [])

  const current = clusters.find(c => c.id === active)

  return (
    <figure className="figure">
      <svg viewBox={`0 0 ${W} ${H}`} role="img" aria-label="UMAP-style scatter plot of Mayank's skills, grouped into six domains">
        <g>
          {points.map((p, i) => (
            <circle
              key={i}
              className="pt"
              r="2.4"
              cx="0" cy="0"
              fill={p.color}
              style={{
                transform: `translate(${settled ? p.x : p.x0}px, ${settled ? p.y : p.y0}px)`,
                transitionDelay: `${p.d}ms`,
                opacity: active && active !== p.c ? 0.15 : 0.85,
              }}
            />
          ))}
        </g>
        {clusters.map(c => (
          <g
            key={c.id}
            className="cluster"
            tabIndex={0}
            role="button"
            aria-label={c.label}
            onMouseEnter={() => setActive(c.id)}
            onMouseLeave={() => setActive(null)}
            onFocus={() => setActive(c.id)}
            onBlur={() => setActive(null)}
            onClick={() => setActive(a => (a === c.id ? null : c.id))}
          >
            <ellipse cx={c.cx} cy={c.cy} rx={c.sx + 10} ry={c.sy + 10} transform={`rotate(${(c.rot * 180) / Math.PI} ${c.cx} ${c.cy})`} fill="transparent" />
            <text
              className="cluster-label"
              x={c.cx}
              y={c.cy - c.sy * 1.45 - 6}
              textAnchor={c.cx < 60 ? 'start' : c.cx > W - 70 ? 'end' : 'middle'}
              fill={c.color}
              style={{ opacity: settled && (!active || active === c.id) ? 1 : 0.25 }}
            >
              {c.label}
            </text>
          </g>
        ))}
        <path className="axis" d={`M10 ${H - 44} V${H - 10} H44`} />
        <text className="axis-label" x="14" y={H - 50}>UMAP 2</text>
        <text className="axis-label" x="50" y={H - 7}>UMAP 1</text>
      </svg>
      <figcaption aria-live="polite">
        {current
          ? <><b>{current.label}.</b> {current.items}</>
          : <><b>Figure 1.</b> My toolkit drawn as a UMAP: each point is a tool, method or dataset I work with, grouped by domain. Hover or tap a cluster to list it.</>}
      </figcaption>
    </figure>
  )
}

export default function Hero() {
  return (
    <header id="top" className="hero">
      <div className="wrap hero-grid">
        <div>
          <h1>Mayank Gandhi</h1>
          <p className="hero-role">Computational biologist and bioinformatics engineer</p>
          <p className="hero-lead">
            I build sequencing pipelines, benchmark deconvolution methods, and rewrite slow bioinformatics tools in Rust.
            Currently a computational biology co-op at Century Therapeutics and an MS Bioinformatics student at Northeastern University.
          </p>
          <div className="hero-actions">
            <a href="#projects" className="btn btn-solid">See my projects</a>
            <a href="/MayankGandhi-Resume.pdf" className="btn btn-line" target="_blank" rel="noreferrer">Download resume</a>
          </div>
          <p className="hero-meta">
            Boston, MA. <a href="https://github.com/mayankgandhi13" target="_blank" rel="noreferrer">GitHub</a>,{' '}
            <a href="https://linkedin.com/in/mayankgandhi0713" target="_blank" rel="noreferrer">LinkedIn</a>,{' '}
            <a href="https://orcid.org/0009-0000-3448-9308" target="_blank" rel="noreferrer">ORCID</a>
          </p>
        </div>
        <Embedding />
      </div>
    </header>
  )
}
