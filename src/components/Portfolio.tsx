import { useEffect, useState } from 'react'
import { profile } from '../data/profile'

const sections = [
  { id: 'about', label: 'About' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'education', label: 'Education' },
]

const skillLabels: Record<string, string> = {
  languages: 'Languages',
  frontend: 'Frontend',
  backend: 'Backend',
  databases: 'Databases',
  cloud: 'Cloud & DevOps',
  tools: 'Tools',
}

function Portfolio() {
  const [selectedProjectSlug, setSelectedProjectSlug] = useState<string | null>(null)

  useEffect(() => {
    const syncSelectionFromHash = () => {
      const hash = window.location.hash.replace(/^#/, '')
      if (!hash.startsWith('project/')) {
        setSelectedProjectSlug(null)
        return
      }

      const slug = hash.replace('project/', '')
      setSelectedProjectSlug(slug)
      window.scrollTo({ top: 0, behavior: 'auto' })
    }

    syncSelectionFromHash()
    window.addEventListener('hashchange', syncSelectionFromHash)

    return () => window.removeEventListener('hashchange', syncSelectionFromHash)
  }, [])

  const selectedProject = profile.projects.find((project) => project.slug === selectedProjectSlug) ?? null

  useEffect(() => {
    if (selectedProject) {
      window.scrollTo({ top: 0, behavior: 'auto' })
    }
  }, [selectedProject])

  const openProjectDetails = (slug: string) => {
    window.location.hash = `project/${slug}`
    setSelectedProjectSlug(slug)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const closeProjectDetails = () => {
    window.history.pushState('', '', `${window.location.pathname}${window.location.search}`)
    setSelectedProjectSlug(null)
  }

  if (selectedProject) {
    const galleryImages = [1, 2, 3].map((index) => `/images/${selectedProject.slug}/image${index}.svg`)

    return (
      <div className="portfolio-shell">
        <div className="detail-page">
          <button type="button" className="back-button" onClick={closeProjectDetails}>
            ← Back to projects
          </button>

          <header className="detail-hero">
            <div>
              <p className="eyebrow">Project spotlight</p>
              <h1>{selectedProject.name}</h1>
              <p className="summary">{selectedProject.overview}</p>
            </div>
            <div className="detail-meta">
              {selectedProject.link ? (
                <a href={selectedProject.link} target="_blank" rel="noreferrer" className="button primary">
                  Live Preview
                </a>
              ) : null}
              <div className="chips">
                {selectedProject.stack.map((tech) => (
                  <span key={tech}>{tech}</span>
                ))}
              </div>
            </div>
          </header>

          <section className="detail-card">
            <div className="section-heading">
              <span>01</span>
              <h3>Overview</h3>
            </div>
            <p>{selectedProject.overview}</p>
            <ul>
              {selectedProject.bullets.map((bullet) => (
                <li key={bullet}>{bullet}</li>
              ))}
            </ul>
          </section>

          <section className="detail-card">
            <div className="section-heading">
              <span>02</span>
              <h3>Project Gallery</h3>
            </div>
            <div className="gallery-grid">
              {galleryImages.map((src, index) => (
                <div className="gallery-frame" key={src}>
                  <img src={src} alt={`${selectedProject.name} screenshot ${index + 1}`} />
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    )
  }

  return (
    <div className="portfolio-shell">
      <header className="hero-panel">
        <div className="hero-copy">
          <p className="eyebrow">Available for full-stack opportunities</p>
          <h1>{profile.name}</h1>
          <h2>{profile.title}</h2>
          <p className="summary">{profile.summary}</p>
          <div className="hero-actions">
            <a href={`mailto:${profile.email}`} className="button primary">
              Contact Me
            </a>
            <a href={profile.linkedin} target="_blank" rel="noreferrer" className="button secondary">
              LinkedIn
            </a>
          </div>
        </div>

        <div className="hero-card">
          <img src="/images/profile.png" alt="Professional portrait" />
          <div className="contact-list">
            <p>{profile.location}</p>
            <p>{profile.phone}</p>
            <p>{profile.email}</p>
            <p>
              <a href={profile.website} target="_blank" rel="noreferrer">
                {profile.website}
              </a>
            </p>
          </div>
        </div>
      </header>

      <nav className="section-nav" aria-label="Portfolio sections">
        {sections.map((section) => (
          <a key={section.id} href={`#${section.id}`}>
            {section.label}
          </a>
        ))}
      </nav>

      <main className="content-grid">
        <section id="about" className="card">
          <div className="section-heading">
            <span>01</span>
            <h3>About</h3>
          </div>
          <p>{profile.summary}</p>

          <div className="skill-groups">
            {Object.entries(profile.technicalSkills)
              .filter(([groupKey]) => groupKey !== 'tools')
              .map(([groupKey, items]) => (
                <div className="skill-group" key={groupKey}>
                  <h4>{skillLabels[groupKey]}</h4>
                  <ul>
                    {items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              ))}
          </div>

          <div className="tool-group card card--compact">
            <h4>Tools</h4>
            <ul className="tool-list">
              {profile.technicalSkills.tools.map((tool) => (
                <li key={tool}>{tool}</li>
              ))}
            </ul>
          </div>

          <div className="chips">
            {profile.interpersonalSkills.map((skill) => (
              <span key={skill}>{skill}</span>
            ))}
          </div>
        </section>

        <section id="experience" className="card">
          <div className="section-heading">
            <span>02</span>
            <h3>Experience</h3>
          </div>
          {profile.experience.map((job) => (
            <article key={job.title} className="entry">
              <div className="entry-header">
                <div>
                  <h4>{job.title}</h4>
                  <p className="company">{job.company}</p>
                </div>
                <span>{job.period}</span>
              </div>
              <p className="muted">{job.location}</p>
              <ul>
                {job.bullets.map((bullet) => (
                  <li key={bullet}>{bullet}</li>
                ))}
              </ul>
            </article>
          ))}
        </section>

        <section id="projects" className="card">
          <div className="section-heading">
            <span>03</span>
            <h3>Projects</h3>
          </div>
          <div className="projects-grid">
            {profile.projects.map((project) => (
              <article key={project.name} className="project-card">
                <div className="project-header">
                  <h4>{project.name}</h4>
                  {project.link ? (
                    <a href={project.link} target="_blank" rel="noreferrer">
                      Live
                    </a>
                  ) : null}
                </div>
                <p className="project-summary">{project.overview}</p>
                <div className="chips">
                  {project.stack.map((tech) => (
                    <span key={tech}>{tech}</span>
                  ))}
                </div>
                <ul>
                  {project.bullets.map((bullet) => (
                    <li key={bullet}>{bullet}</li>
                  ))}
                </ul>
                <button type="button" className="detail-button" onClick={() => openProjectDetails(project.slug)}>
                  Open detail page
                </button>
              </article>
            ))}
          </div>
        </section>

        <section id="education" className="card">
          <div className="section-heading">
            <span>04</span>
            <h3>Education</h3>
          </div>
          {profile.education.map((item) => (
            <article key={item.degree} className="entry">
              <div className="entry-header">
                <div>
                  <h4>{item.degree}</h4>
                  <p className="company">{item.school}</p>
                </div>
                <span>{item.period}</span>
              </div>
            </article>
          ))}
        </section>
      </main>
    </div>
  )
}

export default Portfolio
