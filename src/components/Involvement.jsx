import Timeline from './Timeline'

const involvement = [
  {
    role: 'Senator for Finance',
    org: 'Graduate Student Government, Northeastern University',
    mono: 'GSG',
    logo: '/logos/gsg.png',
    logoBg: '#111111',
    location: 'Boston, MA',
    date: 'Jun 2025 – Present',
    color: 'var(--c2)',
    desc: 'Working with the VP of Finance to restructure transaction records into Excel and Tableau dashboards that surface more useful financial insights.',
    tags: ['Tableau', 'Excel', 'Finance'],
  },
  {
    role: 'Student Advisor',
    org: 'Graduate Biotechnology-Bioinformatics Association (GBBA)',
    mono: 'GBBA',
    logo: '/logos/gbba.png',
    location: 'Boston, MA',
    date: 'Dec 2024 – Present',
    color: 'var(--c4)',
    prev: 'Previously: Director of Operations (Aug–Dec 2025) · Head of Finance (Dec 2024–Aug 2025)',
    desc: 'Led budgeting and financial operations, secured sponsorships and grants for journal clubs, lab tours and an industry speaker series, and later ran event operations. Now advising the incoming board.',
    tags: ['Leadership', 'Sponsorships', 'Operations'],
  },
  {
    role: 'Graduate Student Ambassador',
    org: 'College of Science, Northeastern University',
    mono: 'NU',
    logo: '/logos/nu-cos.png',
    logoBg: '#f8f8f8',
    location: 'Boston, MA',
    date: 'Jul 2026 – Present',
    color: 'var(--c1)',
    desc: 'Represent the College of Science at admitted-student and recruiting events, and mentor prospective and incoming graduate students on program navigation and academic planning.',
    tags: ['Mentoring', 'Outreach'],
  },
  {
    role: 'Founder & President',
    org: 'MITBIO Sports Club, MIT Pune',
    mono: 'BSC',
    logo: '/logos/mitbio-sports.png',
    location: 'Pune, India',
    date: 'Apr 2022 – Jan 2023',
    color: 'var(--c3)',
    desc: 'Founded the sports club and served as president and basketball head.',
    tags: ['Founder', 'Public Speaking'],
  },
  {
    role: 'Co-founder & Treasurer',
    org: 'MITBIO Bioengineering Club, MIT Pune',
    mono: 'MITBIO',
    logo: '/logos/mitbio-bioeng.png',
    location: 'Pune, India',
    date: 'Jun 2021 – Aug 2022',
    color: 'var(--c2)',
    desc: "Co-founded the club with batchmates, set up its structure, rules and governance, and managed the treasury.",
    tags: ['Co-founder', 'Treasury'],
  },
]

export default function Involvement() {
  return <Timeline id="involvement" title="Leadership and involvement" intro="Student government, student organizations, and the clubs I started as an undergraduate." items={involvement} />
}
