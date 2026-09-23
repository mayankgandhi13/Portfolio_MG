import { useState } from 'react'

// Tool icons come from the open-source Devicon set (MIT) via CDN.
// Anything without a Devicon icon falls back to a two-letter monogram tile.
const DEVICON = {
  Python: 'python/python-original',
  R: 'r/r-original',
  Rust: 'rust/rust-original',
  Bash: 'bash/bash-original',
  Git: 'git/git-original',
  Docker: 'docker/docker-original',
  AWS: 'amazonwebservices/amazonwebservices-original-wordmark',
  'AWS EC2': 'amazonwebservices/amazonwebservices-original-wordmark',
  'AWS S3': 'amazonwebservices/amazonwebservices-original-wordmark',
  'AWS IAM': 'amazonwebservices/amazonwebservices-original-wordmark',
  Angular: 'angular/angular-original',
  'Spring Boot': 'spring/spring-original',
  TypeScript: 'typescript/typescript-original',
  JavaScript: 'javascript/javascript-original',
  'HTML/CSS': 'html5/html5-original',
  PyTorch: 'pytorch/pytorch-original',
  'GitHub Pages': 'github/github-original',
  GitHub: 'github/github-original',
  Linux: 'linux/linux-original',
  'CI/CD': 'githubactions/githubactions-original',
  MATLAB: 'matlab/matlab-original',
  SQL: 'postgresql/postgresql-original',
  PostgreSQL: 'postgresql/postgresql-original',
  Anaconda: 'anaconda/anaconda-original',
}

export function hasIcon(name) {
  return Boolean(DEVICON[name])
}

// Generic domain glyphs (original drawings) for tools that have no public icon.
const GLYPHS = {
  helix: <path d="M8 3c0 6 8 6 8 12s-8 6-8 6M16 3c0 6-8 6-8 12s8 6 8 6M9 6h6M9 18h6M10.5 9.5h3M10.5 14.5h3" />,
  cell: <><circle cx="12" cy="12" r="8.5" /><circle cx="13.5" cy="10.5" r="3" /><circle cx="8.5" cy="15" r="1" /><circle cx="15.5" cy="16" r="0.8" /></>,
  flow: <><rect x="3" y="4" width="6" height="5" rx="1.2" /><rect x="15" y="4" width="6" height="5" rx="1.2" /><rect x="9" y="15" width="6" height="5" rx="1.2" /><path d="M9 6.5h6M6 9v3.5h6V15M18 9v3.5h-6" /></>,
  chart: <><path d="M4 20V4M4 20h16" /><path d="M7 16l4-5 3 3 5-7" /><circle cx="19" cy="7" r="1.2" /></>,
  code: <path d="M9 7l-5 5 5 5M15 7l5 5-5 5" />,
}

export default function Icon({ name, size = 40, color = 'var(--c1)', glyph }) {
  const [failed, setFailed] = useState(false)
  const path = DEVICON[name]
  if (path && !failed) {
    return (
      <span className="icon-tile" style={{ width: size, height: size }}>
        <img
          src={`https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/${path}.svg`}
          alt=""
          width={size * 0.62}
          height={size * 0.62}
          loading="lazy"
          onError={() => setFailed(true)}
        />
      </span>
    )
  }
  if (glyph && GLYPHS[glyph]) {
    return (
      <span className="icon-tile glyph" style={{ width: size, height: size, '--mono': color }} aria-hidden="true">
        <svg width={size * 0.56} height={size * 0.56} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
          {GLYPHS[glyph]}
        </svg>
      </span>
    )
  }
  const raw = name.replace(/[^A-Za-z0-9]/g, '')
  const letters = raw.charAt(0).toUpperCase() + raw.slice(1, 2)
  return (
    <span className="icon-tile mono" style={{ width: size, height: size, '--mono': color, fontSize: size * 0.34 }} aria-hidden="true">
      {letters}
    </span>
  )
}
