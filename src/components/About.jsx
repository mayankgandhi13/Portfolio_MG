const focus = [
  { label: 'Sequencing pipelines and cell therapy', desc: 'Bulk RNA-seq deconvolution for cell-therapy product characterization at Century Therapeutics' },
  { label: 'Genomics and transcriptomics', desc: 'Bulk and single-cell RNA-seq, differential expression and pathway enrichment on public GEO data' },
  { label: 'Rust for bioinformatics', desc: 'Rewriting CellChat, DoubletFinder and GLIPH2 for speed and memory efficiency' },
  { label: 'Systems biology', desc: "ODE models of Parkinson's synaptic signalling at NCBS-TIFR" },
  { label: 'Biotech and pharma', desc: 'Pharma R&D and QA at Micro Labs: HPLC, GC, FTIR, dissolution testing' },
]

export default function About() {
  return (
    <section id="about" className="section">
      <div className="wrap">
        <h2 className="h2">About</h2>
        <div className="about-top">
          <img className="portrait" src="/mayank-gandhi.jpg" alt="Portrait of Mayank Gandhi" width="280" height="350" />
          <div>
            <p>I work at the intersection of biology, data science, and AI, using mathematical modeling, computational tools, and machine learning to decode biological systems, especially in genomics and transcriptomics. That started with ODE models of Parkinson's synapses at NCBS-TIFR, and today it means building RNA-seq deconvolution pipelines at Century Therapeutics and rewriting slow bioinformatics tools in Rust.</p>
            <p>I care about making complex data usable, whether that's a benchmarking framework a team can trust or a dashboard a bench scientist can explore on their own. I'm currently building a multi-omics model for antibiotic resistance prediction, and I'm always happy to connect about computational biology and bioinformatics engineering roles.</p>
          </div>
        </div>
        <ul className="focus-list" aria-label="Areas of focus">
          {focus.map(f => (
            <li key={f.label}>
              <div className="h3">{f.label}</div>
              <div className="sub">{f.desc}</div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
