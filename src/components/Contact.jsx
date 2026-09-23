const links = [
  { label: 'Email', value: 'gandhi.may@northeastern.edu', href: 'mailto:gandhi.may@northeastern.edu' },
  { label: 'LinkedIn', value: 'mayankgandhi0713', href: 'https://linkedin.com/in/mayankgandhi0713' },
  { label: 'GitHub', value: 'mayankgandhi13', href: 'https://github.com/mayankgandhi13' },
  { label: 'ORCID', value: '0009-0000-3448-9308', href: 'https://orcid.org/0009-0000-3448-9308' },
  { label: 'Substack', value: 'mynks.substack.com', href: 'https://mynks.substack.com' },
  { label: 'Resume', value: 'Download PDF', href: '/MayankGandhi-Resume.pdf' },
]

export default function Contact() {
  return (
    <section id="contact" className="section">
      <div className="wrap">
        <h2 className="h2">Contact</h2>
        <p className="intro">
          I'm open to conversations about computational biology, bioinformatics engineering and sequencing pipeline roles. Email is the fastest way to reach me.
        </p>
        <ul className="contact-list">
          {links.map(l => (
            <li key={l.label}>
              <span>{l.label}</span>
              <a href={l.href} target={l.href.startsWith('mailto') ? undefined : '_blank'} rel="noreferrer">{l.value}</a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
