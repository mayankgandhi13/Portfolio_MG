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
        <div className="wrap">Mayank Gandhi, Boston, MA. Built with React and Vite.</div>
      </footer>
    </>
  )
}
