import { useEffect, useRef, useState } from 'react'
import Icon, { hasIcon } from './Icon'

const projects = [
  {
    type: 'R package, Rust',
    name: 'CellChatR',
    fullName: 'CellChatR — Rust Rewrite of CellChat',
    desc: 'Rebuilt the core cell-cell communication inference engine of CellChat (R) in Rust, cutting compute overhead by parallelizing signalling-pathway computations with rayon. Exposed through extendr bindings as a drop-in upgrade for existing R workflows; submitted to Bioconductor.',
    stack: ['Rust', 'rayon', 'extendr', 'R', 'Bioconductor'],
    color: '#3d9eff',
    github: 'https://github.com/mayankgandhi13/cellchatr',
    live: 'https://mayankgandhi13.r-universe.dev',
    liveLabel: 'R-universe',
    lines: [
      '> Loading CellChat signalling DB...',
      '> Compiling Rust engine (rayon)...',
      '> Parallelizing pathway computations...',
      '> Exposing via extendr bindings...',
      '✓ Drop-in R upgrade ready.',
    ],
  },
  {
    type: 'Single-cell, Rust',
    name: 'doublet-rs',
    fullName: 'doublet-rs — Memory-Efficient DoubletFinder in Rust',
    desc: "Rewriting DoubletFinder's core engine in Rust to cut its memory footprint. Sparse matrices, batched doublet simulation and an HNSW approximate-nearest-neighbour index, parallelized with rayon, with extendr (R) and PyO3 (Python) bindings. Goal: run on a 16GB laptop where the original needs 64GB+.",
    stack: ['Rust', 'rayon', 'sprs', 'hnsw_rs', 'extendr', 'PyO3'],
    color: '#00e5b0',
    status: 'in-progress',
    github: 'https://github.com/mayankgandhi13/doublet-rs',
    lines: [
      '> Loading sparse expression matrix...',
      '> Simulating artificial doublets in batches...',
      '> Building HNSW kNN index...',
      '> Computing pANN doublet scores...',
      '> Benchmark target: peak memory vs. R',
      '⚙ Work in progress.',
    ],
  },
  {
    type: 'Immunology, Rust',
    name: 'gliph2-rs',
    fullName: 'gliph2-rs — Deterministic GLIPH2 in Rust',
    desc: "Rewriting GLIPH2's TCR clustering engine in Rust: length-bucketed CDR3 similarity search, motif enrichment against a precomputed reference table and union-find cluster assembly, parallelized with rayon. Goal: reproducible clusters and large speedups on 100K+ sequence repertoires.",
    stack: ['Rust', 'rayon', 'TCR-seq', 'extendr', 'PyO3'],
    color: '#a78bfa',
    status: 'in-progress',
    github: 'https://github.com/mayankgandhi13/gliph2-rs',
    lines: [
      '> Parsing CDR3 sequences...',
      '> Bucketing by length...',
      '> Local clustering (Hamming ≤ 1)...',
      '> Motif enrichment vs. reference...',
      '> Union-find cluster assembly...',
      '⚙ Work in progress.',
    ],
  },
  {
    type: 'Deep learning, multi-omics',
    name: 'AMR-Fusion',
    fullName: 'Multi-Omics AMR Prediction',
    desc: 'Extending Ren et al. (2022) by fusing WGS (FCGR images), pangenome gene content and transcriptomics in an attention-based PyTorch model to predict E. coli resistance to four antibiotics, with SHAP explainability and a 7-model ablation study.',
    stack: ['PyTorch', 'SHAP', 'FCGR', 'Roary', 'DESeq2', 'SLURM'],
    color: '#f472b6',
    status: 'in-progress',
    github: 'https://github.com/mayankgandhi13/Multi-Omics-AMR-Prediction-with-Attention-Fusion',
    lines: [
      '> Encoding genomes as 64x64 FCGR images...',
      '> Branches: WGS | pangenome | RNA-seq',
      '> Attention fusion across omics layers...',
      '> SHAP: which genes drive resistance?',
      '> Ablation: 7 model variants planned',
      '⚙ Work in progress.',
    ],
  },
  {
    type: 'Single-cell, Rust',
    name: 'scqc',
    fullName: 'scqc — Single-cell QC in Rust',
    desc: 'Single-cell RNA-seq quality-control pipeline written in Rust.',
    stack: ['Rust', 'scRNA-seq', 'QC'],
    color: '#00e5b0',
    github: 'https://github.com/mayankgandhi13/scqc',
    lines: [
      '> Reading count matrix...',
      '> Computing per-cell QC metrics...',
      '> Flagging low-quality cells...',
      '> Writing filtered matrix...',
      '✓ QC complete.',
    ],
  },
  {
    type: 'Deconvolution',
    name: 'pancreas-deconv',
    fullName: 'Pancreatic Islet Deconvolution Pipeline',
    desc: 'Bulk RNA-seq cell-type deconvolution pipeline using MuSiC/MuSiC2 on public pancreatic islet data, with QC, validation, benchmarking and stacked-bar composition outputs.',
    stack: ['MuSiC', 'MuSiC2', 'R', 'Shell', 'Bulk RNA-seq'],
    color: '#a78bfa',
    github: 'https://github.com/mayankgandhi13/pancreas-deconv-pipeline',
    lines: [
      '> Loading islet scRNA-seq reference...',
      '> Running bulk QC...',
      '> Deconvolving with MuSiC / MuSiC2...',
      '> Benchmarking & validation...',
      '> Plotting cell-type proportions...',
      '✓ Pipeline complete.',
    ],
  },
  {
    type: 'Deconvolution',
    name: 'scRef-LiverDeconv',
    fullName: 'GTEx Liver Deconvolution by Age and Sex',
    desc: 'CIBERSORTx and BayesPrism deconvolution of GTEx liver bulk RNA-seq to characterize age- and sex-related differences in cell composition.',
    stack: ['CIBERSORTx', 'BayesPrism', 'R', 'GTEx'],
    color: '#f472b6',
    github: 'https://github.com/mayankgandhi13/scRef-LiverDeconv',
    lines: [
      '> Loading GTEx liver bulk RNA-seq...',
      '> Building single-cell reference...',
      '> Running CIBERSORTx & BayesPrism...',
      '> Comparing composition by age & sex...',
      '✓ Analysis complete.',
    ],
  },
  {
    type: 'Transcriptomics',
    name: 'NeuroExprViz',
    stats: [{ v: '3,358', l: 'DEGs found' }, { v: '27', l: 'Hallmark pathways' }],
    fullName: "NeuroExprViz — Alzheimer's Transcriptomics",
    desc: "Alzheimer's transcriptomics on GSE5281 (n=161, 6 brain regions): limma differential expression and clusterProfiler enrichment surfaced 3,358 DEGs and 27 Hallmark pathways. The same results are visualized in R, Python (Seaborn) and JavaScript (Plotly.js) to compare which stack works best for bioinformatics.",
    stack: ['R', 'limma', 'clusterProfiler', 'Seaborn', 'Plotly.js', 'GEO'],
    color: '#00e5b0',
    github: 'https://github.com/mayankgandhi13/NeuroExprViz',
    live: 'https://mayankgandhi13.github.io/NeuroExprViz/dashboard/index.html',
    lines: [
      '> Loading GSE5281 (n=161, 6 regions)...',
      '> Running limma differential expression...',
      '> DEA complete: 3,358 sig. genes',
      '> clusterProfiler: 27 Hallmark pathways',
      '> Rendering in R | Seaborn | Plotly.js...',
      '✓ Pipeline complete.',
    ],
  },
  {
    type: 'RNA-seq',
    name: 'COPD-TX',
    stats: [{ v: '111', l: 'COPD samples' }, { v: '40', l: 'Controls' }],
    fullName: 'COPD Transcriptomic Analysis',
    desc: 'Statistical workflow (limma, clusterProfiler, fgsea) across GSE76925 (111 COPD vs 40 controls) that flagged biologically significant process signals, such as ECM remodelling and ribosomal suppression, missed by standard differential expression alone.',
    stack: ['R', 'limma', 'fgsea', 'clusterProfiler'],
    color: '#a78bfa',
    github: 'https://github.com/mayankgandhi13/Transcriptomics-Analysis-of-COPD-vs-Control-Lung-Tissue-GSE76925',
    lines: [
      '> Loading GSE76925 (111 COPD, 40 control)...',
      '> QC & normalization complete',
      '> Differential expression: limma',
      '> Enrichment: ECM remodelling flagged',
      '> Ribosomal suppression detected',
      '✓ Analysis complete.',
    ],
  },
  {
    type: 'Machine learning',
    name: 'SleepDisorder-ML',
    fullName: 'Predicting Sleep Disorders with ML',
    desc: 'Academic machine-learning project on predicting sleep disorders, written up in R Markdown.',
    stack: ['R', 'R Markdown', 'Machine Learning'],
    color: '#3d9eff',
    github: 'https://github.com/mayankgandhi13/Predicting-Sleep-Disorder_ML',
    lines: [
      '> Loading sleep health dataset...',
      '> Preprocessing features...',
      '> Training classifiers...',
      '> Evaluating performance...',
      '✓ Report knitted.',
    ],
  },
  {
    type: 'Biotech finance',
    name: 'ivSYTE',
    stats: [{ v: '$120M', l: 'Series A ask' }, { v: '2029', l: 'Break-even' }],
    fullName: 'ivSYTE Diagnostics — CFO Investor Dashboard',
    desc: 'CFO investor dashboard for a hypothetical blood-based multi-cancer early-detection company, built for the BIOT 5219 team pitch at Northeastern. Covers a $120M Series A ask, TAM/SAM/SOM, revenue vs. burn to 2029 break-even, competitive landscape and use of proceeds.',
    stack: ['JavaScript', 'Chart.js', 'HTML/CSS', 'GitHub Pages'],
    color: '#f472b6',
    live: 'https://mayankgandhi13.github.io/ivSYTE/landing.html',
    liveLabel: 'Landing Page',
    github: 'https://github.com/mayankgandhi13/ivSYTE',
    lines: [
      '> Loading IvSYTE financials...',
      '> Funding timeline rendered',
      '> Market opportunity charted',
      '> Revenue projections loaded',
      '✓ Dashboard ready.',
    ],
  },
]

// Filter domains; colours match the clusters in Figure 1.
const DOMAINS = [
  { id: 'rnaseq', label: 'RNA-seq & single-cell', color: 'var(--c1)' },
  { id: 'rust', label: 'Rust tools', color: 'var(--c2)' },
  { id: 'ml', label: 'Machine learning', color: 'var(--c3)' },
  { id: 'finance', label: 'Biotech finance', color: 'var(--c4)' },
  { id: 'building', label: 'In progress', color: 'var(--c6)' },
]

function domainsOf(p) {
  const t = p.type
  const d = []
  if (/single-cell|rna-seq|deconvolution|transcriptomics|R package|immunology/i.test(t)) d.push('rnaseq')
  if (/rust/i.test(t)) d.push('rust')
  if (/learning/i.test(t)) d.push('ml')
  if (/finance/i.test(t)) d.push('finance')
  if (p.status === 'in-progress') d.push('building')
  return d
}

function mainColor(p) {
  const d = domainsOf(p)
  const pick = d.includes('rust') ? 'rust' : d.includes('ml') ? 'ml' : d[0]
  return (DOMAINS.find(x => x.id === pick) || DOMAINS[0]).color
}

function steps(p) {
  return (p.lines || [])
    .filter(l => l.startsWith('>'))
    .map(l => l.replace(/^>\s*/, '').replace(/\.\.\.$/, ''))
}

function ProjectCard({ p, index }) {
  const [open, setOpen] = useState(false)
  const [title, sub] = p.fullName.split(' — ')
  const color = mainColor(p)
  const st = steps(p)
  const icons = p.stack.filter(hasIcon).slice(0, 2)
  const links = []
  if (p.github) links.push({ label: 'GitHub', href: p.github })
  if (p.live) links.push({ label: p.liveLabel || 'Live demo', href: p.live })
  if (p.extraLinks) p.extraLinks.forEach(l => links.push(l))
  const panelId = 'steps-' + p.name

  return (
    <article className="pcard" style={{ '--dom': color }}>
      <div className="pcard-head">
        <div className="pcard-top">
          <span className="pill">{p.type}</span>
          <div className="pcard-icons">
            {icons.map(n => <Icon key={n} name={n} size={42} />)}
          </div>
        </div>
        <span className="pcard-num" aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
        {p.status === 'in-progress' && <span className="pill pill-status">In progress</span>}
        <h3 className="pcard-title">{title}</h3>
        {sub && <div className="pcard-sub">{sub}</div>}
      </div>
      <div className="pcard-body">
        <p>{p.desc}</p>
        {p.stats && (
          <div className="stats">
            {p.stats.map(x => (
              <div key={x.l} className="stat"><strong>{x.v}</strong><span>{x.l}</span></div>
            ))}
          </div>
        )}
        {open && st.length > 0 && (
          <ol id={panelId} className="proj-steps">
            {st.map(x => <li key={x}>{x}</li>)}
          </ol>
        )}
        <div className="pcard-foot">
          <div className="pcard-stack">{p.stack.join(' · ')}</div>
          <div className="pcard-actions">
            {st.length > 0 && (
              <button type="button" className="steps-btn" aria-expanded={open} aria-controls={panelId} onClick={() => setOpen(o => !o)}>
                {open ? 'Hide workflow' : p.status === 'in-progress' ? 'Planned workflow' : 'Show workflow'}
              </button>
            )}
            <div className="proj-links">
              {links.map(l => <a key={l.href} href={l.href} target="_blank" rel="noreferrer">{l.label}</a>)}
            </div>
          </div>
        </div>
      </div>
    </article>
  )
}

export default function Projects() {
  const [filter, setFilter] = useState('all')
  const [pos, setPos] = useState(0)
  const track = useRef(null)
  const visible = projects
    .filter(p => filter === 'all' || domainsOf(p).includes(filter))
    .sort((a, b) => (a.status === 'in-progress') - (b.status === 'in-progress'))
  const count = id => projects.filter(p => id === 'all' || domainsOf(p).includes(id)).length

  useEffect(() => {
    setPos(0)
    if (track.current) track.current.scrollTo({ left: 0 })
  }, [filter])

  const onScroll = () => {
    const el = track.current
    if (!el || !el.firstChild) return
    const w = el.firstChild.getBoundingClientRect().width + 24
    setPos(Math.round(el.scrollLeft / w))
  }
  const go = dir => {
    const el = track.current
    if (!el || !el.firstChild) return
    const w = el.firstChild.getBoundingClientRect().width + 24
    el.scrollBy({ left: dir * w, behavior: 'smooth' })
  }
  const jump = i => {
    const el = track.current
    if (!el || !el.firstChild) return
    const w = el.firstChild.getBoundingClientRect().width + 24
    el.scrollTo({ left: i * w, behavior: 'smooth' })
  }

  return (
    <section id="projects" className="section">
      <div className="wrap">
        <div className="proj-header">
          <div>
            <h2 className="h2 big">Projects</h2>
            <p className="intro">Pipelines, packages and analyses, plus the Rust and deep learning tools I am building now. Filter by area, or open a card to see its workflow.</p>
          </div>
          <div className="carousel-ctrl">
            <button type="button" className="round-btn" onClick={() => go(-1)} disabled={pos === 0} aria-label="Previous project">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true"><path d="M15 6l-6 6 6 6" /></svg>
            </button>
            <button type="button" className="round-btn" onClick={() => go(1)} disabled={pos >= visible.length - 1} aria-label="Next project">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true"><path d="M9 6l6 6-6 6" /></svg>
            </button>
            <span className="counter">{String(Math.min(pos + 1, visible.length)).padStart(2, '0')} / {String(visible.length).padStart(2, '0')}</span>
          </div>
        </div>

        <div className="filters" role="group" aria-label="Filter projects">
          {[{ id: 'all', label: 'All', color: 'var(--ink)' }, ...DOMAINS].map(d => (
            <button key={d.id} type="button" className={'filter' + (filter === d.id ? ' on' : '')} style={{ '--dom': d.color }} aria-pressed={filter === d.id} onClick={() => setFilter(d.id)}>
              {d.id !== 'all' && <span className="dot" style={{ background: d.color }} aria-hidden="true" />}
              {d.label}
              <span className="filter-count">{count(d.id)}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="track-wrap">
        <div className="track" ref={track} onScroll={onScroll}>
          {visible.map((p, i) => <ProjectCard key={p.name} p={p} index={i} />)}
        </div>
      </div>

      <div className="wrap">
        <div className="dots" role="group" aria-label="Choose project">
          {visible.map((p, i) => (
            <button key={p.name} type="button" className={'dotbtn' + (i === pos ? ' on' : '')} onClick={() => jump(i)} aria-label={'Go to ' + p.name} />
          ))}
        </div>
      </div>
    </section>
  )
}
