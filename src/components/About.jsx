export default function About() {
  return (
    <section id="about" className="section">
      <div className="wrap">
        <h2 className="h2">About</h2>
        <div className="about-top">
          <img className="portrait" src="/mayank-gandhi.jpg" alt="Portrait of Mayank Gandhi" width="280" height="350" />
          <div>
            <p>I work at the intersection of biology, data science, and AI, using mathematical modeling, computational tools, and machine learning to decode biological systems, especially in genomics and transcriptomics. I started at the bench, with wet-lab projects in my bioengineering degree and pharma QA at Micro Labs, moved into ODE models of Parkinson's synapses at NCBS-TIFR, and today I build RNA-seq deconvolution pipelines at Century Therapeutics and rewrite slow bioinformatics tools in Rust.</p>
            <p>I care about making complex data usable, whether that's a benchmarking framework a team can trust or a dashboard a bench scientist can explore on their own. I'm currently building a multi-omics model for antibiotic resistance prediction, and I'm always happy to connect about computational biology and bioinformatics engineering roles.</p>
          </div>
        </div>
      </div>
    </section>
  )
}
