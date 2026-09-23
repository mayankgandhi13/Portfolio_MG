import { useMemo, useState } from 'react'

// A periodic table of skills. Each block is one area of work, laid out where
// that block sits on the real table. Levels: 3 = Expert, 2 = Advanced, 1 = Familiar.
const BLOCKS = {
  s: { label: 'Software', color: 'var(--c2)', note: 'Languages & engineering' },
  d: { label: 'Bioinformatics', color: 'var(--c1)', note: 'Omics analysis' },
  p: { label: 'Pipelines & systems', color: 'var(--c6)', note: 'Workflows, HPC, cloud, AI platforms' },
  f: { label: 'ML & AI', color: 'var(--c3)', note: 'Deep learning, modeling & evaluation' },
}

// [symbol, name, level, row, col, detail?]
const ELEMENTS = {
  s: [
    ['Py', 'Python', 3, 1, 1, 'Analysis, pipelines and ML'],
    ['R', 'R', 3, 1, 18, 'Bioconductor, Seurat, ggplot2, tidyverse'],
    ['Sq', 'SQL', 2, 2, 1, 'Oracle SQL and PostgreSQL'],
    ['Gi', 'Git', 2, 2, 2, 'Version control'],
    ['Jv', 'Java', 2, 3, 1, 'Spring Boot services'],
    ['Ts', 'TypeScript', 2, 3, 2, 'Angular front ends and REST integrations'],
    ['Ap', 'REST APIs', 2, 4, 1, 'EDI/API integrations at Cencora'],
    ['Ng', 'Angular', 2, 4, 2, 'Map Catalog UI at Cencora'],
    ['Sb', 'Spring Boot', 2, 5, 1, 'Map Catalog backend at Cencora'],
    ['Rs', 'Rust', 1, 5, 2, 'CellChatR, doublet-rs, gliph2-rs, scqc'],
    ['Rp', 'R package development', 2, 6, 1, 'CellChatR, published on R-universe'],
    ['Bc', 'Bioconductor packaging', 2, 6, 2, 'CellChatR submitted to Bioconductor'],
    ['Sy', 'Shiny', 2, 7, 1, 'Interactive R apps'],
    ['Te', 'pytest / testthat', 2, 7, 2, 'Unit testing in Python and R'],
  ],
  d: [
    ['Se', 'Seurat', 3, 4, 3, 'QC, integration, clustering, annotation'],
    ['Sc', 'Scanpy', 2, 4, 4],
    ['Sv', 'scVI', 2, 4, 5, 'Probabilistic single-cell integration'],
    ['Hm', 'Harmony', 2, 4, 6, 'Batch correction'],
    ['Bi', 'Batch-aware integration', 3, 4, 7, 'Reference atlas engineering'],
    ['Ra', 'Reference atlases', 3, 4, 8, 'Built at Century Therapeutics'],
    ['Cg', 'CELLxGENE', 2, 4, 9, 'Public single-cell data and exploration'],
    ['Cr', 'Cell Ranger', 2, 4, 10, '10x single-cell processing'],
    ['Gp', 'scGPT', 1, 4, 11, 'Single-cell foundation model'],
    ['Gf', 'Geneformer', 1, 4, 12, 'Single-cell foundation model'],
    ['Vs', '10x Visium', 2, 5, 3, 'Spatial transcriptomics'],
    ['Sr', 'Space Ranger', 2, 5, 4, 'Visium processing'],
    ['Xe', 'Xenium', 2, 5, 5, 'In situ spatial transcriptomics'],
    ['Cl', 'cell2location', 2, 5, 6, 'Spatial cell-type mapping'],
    ['Sd', 'Squidpy', 1, 5, 7, 'Spatial analysis in Python'],
    ['Mu', 'MuSiC', 3, 5, 8, 'Pancreatic islet deconvolution'],
    ['Cx', 'CIBERSORTx', 2, 5, 9, 'GTEx liver deconvolution'],
    ['Bp', 'BayesPrism', 2, 5, 10, 'GTEx liver deconvolution'],
    ['Lm', 'limma', 3, 5, 11, 'NeuroExprViz, COPD-TX'],
    ['Ds', 'DESeq2', 3, 5, 12, 'Bulk differential expression'],
    ['Cp', 'clusterProfiler', 3, 6, 3, 'Enrichment for NeuroExprViz and COPD-TX'],
    ['Gs', 'GSEA', 3, 6, 4],
    ['Fg', 'fgsea', 2, 6, 5, 'COPD-TX'],
    ['Re', 'Reactome', 2, 6, 6],
    ['Go', 'GO ORA', 2, 6, 7],
    ['Mo', 'Multi-omics integration', 2, 6, 8],
    ['St', 'STAR', 2, 6, 9, 'Alignment'],
    ['Ht', 'HISAT2', 2, 6, 10, 'Alignment'],
    ['Sa', 'Salmon', 2, 6, 11, 'Quantification'],
    ['Bw', 'BWA', 1, 6, 12, 'Alignment'],
    ['Ba', 'SAMtools & BAM', 2, 7, 3, 'SAM/BAM processing'],
    ['Gk', 'GATK', 1, 7, 4, 'Variant calling'],
    ['Fq', 'FastQC', 2, 7, 5, 'Read QC'],
    ['Tm', 'Trimmomatic', 2, 7, 6, 'Read trimming'],
    ['Iv', 'IGV', 3, 7, 7, 'Genome browser'],
  ],
  p: [
    ['Nf', 'Nextflow', 2, 2, 13],
    ['Sm', 'Snakemake', 2, 2, 14],
    ['Sl', 'SLURM', 2, 2, 15, 'Job scheduling on HPC'],
    ['Hc', 'HPC clusters', 2, 2, 16, 'Northeastern Discovery cluster'],
    ['Sh', 'Bash', 3, 2, 17, 'Unix scripting and HPC jobs'],
    ['Lx', 'Linux', 2, 2, 18],
    ['Dk', 'Docker', 2, 3, 13, 'Reproducible containers'],
    ['Si', 'Singularity', 1, 3, 14, 'Containers on HPC'],
    ['Cd', 'Conda', 2, 3, 15, 'Environments and Bioconda'],
    ['Aw', 'AWS', 2, 3, 16, 'EC2, S3, IAM'],
    ['Ci', 'CI/CD', 1, 3, 17, 'Automated testing and deployment'],
    ['Rw', 'Reproducible workflows', 2, 3, 18],
    ['Bk', 'Benchmarking', 2, 4, 13, 'Deconvolution method selection at Century'],
    ['Gr', 'Ground-truth simulation', 2, 4, 14, 'Synthetic bulk mixtures of known proportions'],
    ['Ry', 'rayon', 2, 4, 15, 'Parallel Rust'],
    ['Ex', 'extendr', 2, 4, 16, 'Rust ↔ R bindings'],
    ['Po', 'PyO3', 1, 4, 17, 'Rust ↔ Python bindings'],
    ['Ag', 'Agentic analysis', 2, 4, 18, 'Internal AI platform at Century'],
    ['Ll', 'LLM interpretation', 2, 5, 13, 'Expression data for non-computational scientists'],
    ['Ai', 'LLM APIs', 2, 5, 14, 'Claude and OpenAI APIs'],
    ['Mc', 'MCP', 2, 5, 15, 'Model Context Protocol tools for agents'],
  ],
  f: [
    ['Pt', 'PyTorch', 2, 9, 4],
    ['Cn', 'CNN', 2, 9, 5, 'Convolutional neural networks'],
    ['Sk', 'scikit-learn', 2, 9, 6],
    ['Xg', 'XGBoost', 2, 9, 7],
    ['Hf', 'Hugging Face', 2, 9, 8, 'Transformers and model hub'],
    ['Pd', 'pandas', 3, 9, 9],
    ['Np', 'NumPy', 2, 9, 10],
    ['Jp', 'Jupyter', 3, 9, 11],
    ['Su', 'Supervised learning', 2, 9, 12],
    ['Us', 'Unsupervised learning', 2, 9, 13],
    ['Dr', 'Dimensionality reduction', 2, 9, 14, 'PCA, UMAP'],
    ['En', 'Ensemble methods', 1, 9, 15],
    ['Im', 'Interpretable ML', 1, 9, 16, 'Predicting biological readouts at Century'],
    ['Xp', 'SHAP', 1, 9, 17, 'Explainability'],
    ['Au', 'AUC-ROC', 2, 10, 4, 'Model evaluation'],
    ['F1', 'F1 score', 2, 10, 5, 'Model evaluation'],
    ['Tb', 'Tableau', 2, 10, 6, 'GSG finance dashboards'],
    ['Pb', 'Power BI', 1, 10, 7],
  ],
}

const LEVELS = { 3: 'Expert', 2: 'Advanced', 1: 'Familiar' }

function Level({ n }) {
  return (
    <span className="lvl" role="img" aria-label={LEVELS[n]}>
      {[1, 2, 3].map(i => <span key={i} className={i <= n ? 'on' : ''} />)}
    </span>
  )
}

export default function Skills() {
  const [active, setActive] = useState(null)
  const [block, setBlock] = useState(null)

  const elements = useMemo(() => {
    const all = []
    Object.entries(ELEMENTS).forEach(([b, list]) =>
      list.forEach(([sym, name, lvl, row, col, detail]) => all.push({ b, sym, name, lvl, row, col, detail }))
    )
    all.sort((x, y) => x.row - y.row || x.col - y.col)
    all.forEach((e, i) => { e.n = i + 1 })
    return all
  }, [])

  const cur = active && elements.find(e => e.sym === active)
  const dim = e => (block && e.b !== block) || (active && e.sym !== active && !block)

  return (
    <section id="skills" className="section">
      <div className="wrap">
        <h2 className="h2 big">Periodic table of skills</h2>
        <p className="intro">Every tool I work with, arranged like the elements. Each block is one area: s for software, d for bioinformatics, p for pipelines, f for ML. Hover or tap an element.</p>

        <div className="ptable" onMouseLeave={() => setActive(null)}>
          {/* detail panel sits in the gap above the d-block, like the legend on a real table */}
          <div className="pt-panel" aria-live="polite">
            {cur ? (
              <div className="pt-detail" style={{ '--dom': BLOCKS[cur.b].color }}>
                <div className="pt-big">
                  <span className="pt-n">{cur.n}</span>
                  <span className="pt-sym">{cur.sym}</span>
                  <Level n={cur.lvl} />
                </div>
                <div>
                  <div className="pt-name">{cur.name}</div>
                  <div className="pt-meta">{cur.b}-block · {BLOCKS[cur.b].label} · {LEVELS[cur.lvl]}</div>
                  {cur.detail && <div className="pt-note">{cur.detail}</div>}
                </div>
              </div>
            ) : (
              <div className="pt-legend">
                {Object.entries(BLOCKS).map(([k, v]) => (
                  <button
                    key={k}
                    type="button"
                    className={'pt-key' + (block === k ? ' on' : '')}
                    style={{ '--dom': v.color }}
                    aria-pressed={block === k}
                    onClick={() => setBlock(b => (b === k ? null : k))}
                  >
                    <span className="pt-key-b">{k}</span>
                    <span><b>{v.label}</b><small>{v.note}</small></span>
                  </button>
                ))}
                <div className="pt-levels">
                  {[3, 2, 1].map(n => <span key={n}><Level n={n} /> {LEVELS[n]}</span>)}
                </div>
              </div>
            )}
          </div>

          {elements.map(e => (
            <button
              key={e.sym}
              type="button"
              className={'el' + (dim(e) ? ' dim' : '') + (active === e.sym ? ' on' : '')}
              style={{ gridRow: e.row, gridColumn: e.col, '--dom': BLOCKS[e.b].color }}
              onMouseEnter={() => setActive(e.sym)}
              onFocus={() => setActive(e.sym)}
              onBlur={() => setActive(null)}
              onClick={() => setActive(a => (a === e.sym ? null : e.sym))}
              aria-label={`${e.name}, ${BLOCKS[e.b].label}, ${LEVELS[e.lvl]}`}
            >
              <span className="el-n">{e.n}</span>
              <span className="el-sym">{e.sym}</span>
              <span className="el-name">{e.name}</span>
              <Level n={e.lvl} />
            </button>
          ))}

          <div className="pt-blocklabel" style={{ gridRow: 8, gridColumn: '1 / 3', '--dom': BLOCKS.s.color }}>s · Software</div>
          <div className="pt-blocklabel" style={{ gridRow: 8, gridColumn: '3 / 13', '--dom': BLOCKS.d.color }}>d · Bioinformatics</div>
          <div className="pt-blocklabel" style={{ gridRow: 6, gridColumn: '13 / 19', '--dom': BLOCKS.p.color }}>p · Pipelines & systems</div>
          <div className="pt-blocklabel" style={{ gridRow: '9 / 11', gridColumn: '1 / 4', '--dom': BLOCKS.f.color, alignSelf: 'center' }}>f · ML & AI</div>
        </div>

        {/* small screens: same elements, grouped by block */}
        <div className="pt-mobile">
          {Object.entries(BLOCKS).map(([k, v]) => (
            <div key={k} className="pt-mgroup">
              <h3 className="tool-group-title"><span className="dot" style={{ background: v.color }} aria-hidden="true" />{k}-block · {v.label}</h3>
              <div className="pt-mgrid">
                {elements.filter(e => e.b === k).map(e => (
                  <div key={e.sym} className="el static" style={{ '--dom': v.color }}>
                    <span className="el-n">{e.n}</span>
                    <span className="el-sym">{e.sym}</span>
                    <span className="el-name">{e.name}</span>
                    <Level n={e.lvl} />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
