import Timeline from './Timeline'

const experiences = [
  {
    role: 'Computational Biology/Data Science, Quality Assurance Co-op',
    org: 'Century Therapeutics, Inc.',
    logo: '/logos/century-full.png',
    location: 'Boston, MA · Hybrid',
    date: 'Jun 2026 – Present',
    color: 'var(--c1)',
    desc: 'Building an end-to-end bulk RNA-seq deconvolution pipeline for cell-therapy product characterization, benchmarking reference-based and reference-free algorithms against in-silico synthetic mixtures of known cell-type proportions. Engineered single-cell reference atlases (QC, batch-aware integration, marker-based annotation) and showed that reference resolution, not algorithm choice, drives accuracy for transcriptionally similar subpopulations. Integrating multi-omics workflows into an internal agentic AI platform for LLM-driven interpretation, and extending the pipeline with an interpretable ML layer and self-serve visualization for bench scientists.',
    tags: ['Bulk RNA-seq', 'Deconvolution', 'scRNA-seq Atlases', 'Agentic AI', 'Interpretable ML'],
  },
  {
    role: 'Software Developer Intern — Technical Delivery, D&S IT',
    org: 'Cencora (formerly AmerisourceBergen)',
    logo: '/logos/cencora.png',
    location: 'Conshohocken, PA · Remote',
    date: 'Jun 2025 – Aug 2025',
    color: 'var(--c4)',
    desc: 'Designed and shipped a Map Catalog UI (Angular, Spring Boot) that consolidated fragmented EDI transaction workflows onto a single platform, backed by Oracle SQL-driven data mapping (850, 810 and related X12 transactions) and automated QC reporting for healthcare supply-chain data exchange.',
    tags: ['Angular', 'Spring Boot', 'TypeScript', 'EDI / X12', 'Oracle SQL'],
  },
  {
    role: 'Application Specialist',
    org: "Let's Excel Analytics Solutions",
    logo: '/logos/letsexcel.png',
    location: 'Gandhinagar, India · Remote',
    date: 'Oct 2023 – Jan 2024',
    color: 'var(--c6)',
    desc: 'Supported DataPandit, a no-code predictive analytics platform for pharma quality management, using Python.',
    tags: ['Python', 'Predictive Analytics'],
  },
  {
    role: 'Computational Researcher & Modeler Intern',
    org: 'National Centre for Biological Sciences (NCBS-TIFR)',
    logo: '/logos/ncbs-full.png',
    location: 'Bengaluru, India',
    date: 'Jan 2023 – Aug 2023',
    color: 'var(--c2)',
    desc: "Built and optimized biochemical signalling models of synapses in neurodegenerative disease, focusing on dopaminergic pathways in Parkinson's (ODEs, HillTau). Curated literature experiments to test wild-type and disease models with FindSim, and engineered reproducible pipelines in Bash and Python.",
    tags: ['ODE Modeling', 'HillTau', 'FindSim', 'Neuroscience', 'Python'],
  },
  {
    role: 'R&D Analyst & Quality Assurance Intern',
    org: 'Micro Labs Limited',
    logo: '/logos/microlabs.png',
    location: 'Mumbai, India',
    date: 'Jun 2022 – Aug 2022',
    color: 'var(--c5)',
    desc: 'Hands-on pharmaceutical R&D and QA work across formulation and analytical testing: dissolution, HPLC, GC, FTIR and UV spectroscopy.',
    tags: ['HPLC', 'GC', 'FTIR', 'Dissolution', 'QA'],
  },
]

export default function Experience() {
  return <Timeline id="experience" title="Work experience" items={experiences} />
}
