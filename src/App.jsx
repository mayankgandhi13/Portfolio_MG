import './index.css'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Experience from './components/Experience'
import Projects from './components/Projects'
import Skills from './components/Skills'
import Involvement from './components/Involvement'
import Education from './components/Education'
import Contact from './components/Contact'

export default function App() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Experience />
        <Projects />
        <Skills />
        <Involvement />
        <Education />
        <Contact />
      </main>
      <footer className="footer">
        <div className="wrap footer-inner">
          <div>
            <div className="footer-name">Mayank Gandhi</div>
            <div>Bioinformatics engineer · Boston, MA · © {new Date().getFullYear()}</div>
          </div>
          <nav className="footer-links" aria-label="Footer">
            <a href="mailto:gandhi.may@northeastern.edu">Email</a>
            <a href="https://linkedin.com/in/mayankgandhi0713" target="_blank" rel="noreferrer">LinkedIn</a>
            <a href="https://github.com/mayankgandhi13" target="_blank" rel="noreferrer">GitHub</a>
            <a href="#top">Back to top ↑</a>
          </nav>
        </div>
      </footer>
    </>
  )
}