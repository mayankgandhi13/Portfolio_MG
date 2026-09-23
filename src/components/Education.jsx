import { useState } from 'react'
import { CertBrowser } from './Certs'

const education = [
  {
    degree: 'Master of Science',
    field: 'Bioinformatics',
    school: 'Northeastern University',
    location: 'Boston, MA',
    date: 'Sep 2024 – Present',
    gpa: '3.9 / 4.0',
    logo: '/logos/northeastern.png',
    mono: 'NU',
    courses: 'Bioinformatics Programming, Computational Biology, Data Analytics, Genomics, Transcriptomics',
  },
  {
    degree: 'Bachelor of Technology',
    field: 'Bioengineering',
    school: 'Maharashtra Institute of Technology',
    location: 'Pune, India',
    date: 'Aug 2019 – Jun 2023',
    gpa: '3.27 / 4.0',
    logo: '/logos/mit-pune.png',
    mono: 'MIT',
    courses: 'Systems Biology, Molecular Biology, Pharmacology, Statistics, Medical Imaging, Nanotechnology',
  },
]

const certGroups = [
  {
    name: 'Data & programming',
    items: [
      { title: 'Introduction to PostgreSQL', issuer: 'LinkedIn Learning', date: 'May 2026', href: 'https://www.linkedin.com/learning/certificates/283e379cba17d23bfdcfcc1389266d79eeb9f509371c7813ad1df93ea0212aac/' },
      { title: 'R Tidyverse track (7 courses)', issuer: 'DataCamp', date: 'Jan–Feb 2025', note: 'Tidyverse, dplyr, tidyr, stringr, regular expressions, ggplot2, communicating with data' },
      { title: 'Shell Scripting (Bash)', issuer: 'Linux Training Academy, Udemy', date: 'Apr 2023', href: 'https://www.udemy.com/certificate/UC-c875dec2-7124-4ccd-bd9c-d71e2cc9754b/' },
      { title: 'R Programming', issuer: 'Great Learning', date: 'Aug 2022', href: 'https://olympus1.mygreatlearning.com/course_certificate/TFSHYGIG' },
      { title: 'Data Visualisation using Tableau', issuer: 'Great Learning', date: 'Aug 2022', href: 'https://olympus1.mygreatlearning.com/course_certificate/FSNJHBYH' },
      { title: 'Data Science', issuer: 'Analytics Vidhya', date: 'Jul 2021', href: 'https://trainings.internshala.com/view_certificate/9A0001D1-EB6F-0BB2-BA7E-263FC6415790/5669E8BB-6EFF-46B5-9933-E7AB956F8822' },
      { title: 'MATLAB', issuer: 'MathWorks', date: 'Aug 2020' },
    ],
  },
  {
    name: 'Research & science',
    items: [
      { title: 'Introduction to Laboratory Safety and Ethics', issuer: 'NCBS-TIFR', date: 'Feb 2023' },
      { title: 'Molecular Dynamics and Drug Simulations', issuer: 'Udemy', date: 'Jul 2021', href: 'https://udemy-certificate.s3.amazonaws.com/image/UC-4edb3f4e-fbb0-43a1-9615-9e9bb9291351.jpg' },
      { title: 'Fundamentals of Manuscript Preparation', issuer: 'Elsevier Researcher Academy', date: 'Jul 2021' },
    ],
  },
  {
    name: 'AI & leadership',
    items: [
      { title: 'Generative AI for Business Leaders', issuer: 'LinkedIn Learning', date: 'Jun 2025', href: 'https://www.linkedin.com/learning/certificates/6e0501decd2af05ca7dfb0e4640fb51ba6f5f04da6e58176ce55c0781c9e3412/' },
      { title: 'Mastering Communications as a Leader', issuer: 'LinkedIn Learning', date: 'Jun 2025', href: 'https://www.linkedin.com/learning/certificates/6d7bdcb7d4c01825b8c88b5fe7505abf06173655c8c399b6739997188dad48b8/' },
      { title: 'Artificial Intelligence Tools', issuer: 'Skill Nation', date: 'Oct 2023', href: 'https://drive.google.com/file/d/1Uo73Lv-Ziw-GoxJuO8NGSnsfdqzPaqHa/view' },
    ],
  },
]

const awards = [
  'Smart India Hackathon 2022',
  'Best In Vedic Award',
]

function EduCard({ e }) {
  const [failed, setFailed] = useState(false)
  return (
    <article className="edu-card">
      <div className="edu-logo">
        {!failed
          ? <img src={e.logo} alt={e.school + ' logo'} loading="lazy" onError={() => setFailed(true)} />
          : <span className="xcard-mono big">{e.mono}</span>}
      </div>
      <div className="edu-body">
        <h3 className="edu-degree">{e.degree}</h3>
        <div className="edu-field">{e.field}</div>
        <div className="edu-school">{e.school}, {e.location}</div>
        <div className="edu-meta"><span>{e.date}</span><span>GPA {e.gpa}</span></div>
        <div className="skill-set-name" style={{ marginTop: '1.1rem' }}>Relevant coursework</div>
        <p className="edu-courses">{e.courses}</p>
      </div>
    </article>
  )
}

export default function Education() {
  return (
    <section id="education" className="section">
      <div className="wrap">
        <h2 className="h2 big">Education</h2>
        <div className="edu-grid">
          {education.map(e => <EduCard key={e.school} e={e} />)}
        </div>

        <h3 className="proj-group-title" style={{ marginTop: '3.5rem' }}>Certifications</h3>
        <CertBrowser groups={certGroups} />

        <h3 className="proj-group-title" style={{ marginTop: '3rem' }}>Awards</h3>
        <ul className="cert-list award-list">
          {awards.map(a => <li key={a}><div className="cert-title">{a}</div></li>)}
        </ul>
      </div>
    </section>
  )
}
