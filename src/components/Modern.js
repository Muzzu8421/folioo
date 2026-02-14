"use client";
import { useState, useEffect } from "react";
import { Github, Linkedin, Globe, Mail, MapPin, ExternalLink, Menu, X } from "lucide-react";

export default function Modern({ details }) {
  const [activeSection, setActiveSection] = useState("about");
  const [menuOpen, setMenuOpen] = useState(false); // mobile nav toggle

  const { personalInfo, summary, experience, education, skills, projects, certifications, awards } = details;

  // only show nav items that have actual data
  const navItems = [
    { id: "about",          label: "About",          show: true },
    { id: "experience",     label: "Experience",     show: experience?.length > 0 },
    { id: "skills",         label: "Skills",         show: !!skills },
    { id: "projects",       label: "Projects",       show: projects?.length > 0 },
    { id: "education",      label: "Education",      show: education?.length > 0 },
    { id: "certifications", label: "Certifications", show: certifications?.length > 0 || awards?.length > 0 },
  ].filter(i => i.show);

  // highlight nav item based on scroll position
  useEffect(() => {
    const observers = [];
    navItems.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (!el) return;
      const observer = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveSection(id); },
        { rootMargin: "-40% 0px -55% 0px" }
      );
      observer.observe(el);
      observers.push(observer);
    });
    return () => observers.forEach(o => o.disconnect());
  }, []);

  // smooth scroll + close mobile menu
  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=DM+Sans:wght@300;400;500&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        body {
          background: #0a0f1e;
          color: #cbd5e1;
          font-family: 'DM Sans', sans-serif;
          font-weight: 300;
          overflow-x: hidden;
        }

        /* desktop: sidebar left, content right */
        .wrap {
          display: flex;
          min-height: 100vh;
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 24px;
        }

        /* ── Sidebar ── */
        .sidebar {
          width: 320px;
          min-width: 320px;
          position: sticky;
          top: 0;
          height: 100vh;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          padding: 72px 32px 72px 0;
        }

        .s-name {
          font-family: 'Syne', sans-serif;
          font-weight: 800;
          font-size: 2rem;
          color: #f1f5f9;
          line-height: 1.1;
          letter-spacing: -0.03em;
        }

        .s-title {
          font-family: 'Syne', sans-serif;
          font-size: 0.95rem;
          font-weight: 500;
          color: #7c86a2;
          margin-top: 8px;
        }

        /* short bio clipped to ~2 lines */
        .s-bio {
          font-size: 0.85rem;
          color: #64748b;
          margin-top: 14px;
          line-height: 1.7;
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        /* desktop nav */
        .nav { margin-top: 44px; display: flex; flex-direction: column; gap: 2px; }

        .nav-btn {
          display: flex;
          align-items: center;
          gap: 12px;
          background: none;
          border: none;
          cursor: pointer;
          padding: 5px 0;
          text-align: left;
        }

        .nav-line {
          height: 1px;
          width: 28px;
          background: #334155;
          transition: width 0.3s, background 0.3s;
          flex-shrink: 0;
        }

        .nav-label {
          font-family: 'Syne', sans-serif;
          font-size: 0.7rem;
          font-weight: 700;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: #475569;
          transition: color 0.3s;
        }

        /* active + hover states */
        .nav-btn.active .nav-line { width: 52px; background: linear-gradient(90deg, #4f46e5, #fb923c); }
        .nav-btn.active .nav-label { color: #f1f5f9; }
        .nav-btn:hover .nav-line { width: 40px; background: #7c86a2; }
        .nav-btn:hover .nav-label { color: #cbd5e1; }

        /* social icons row */
        .socials { display: flex; gap: 14px; flex-wrap: wrap; align-items: center; }

        .soc-a {
          color: #475569;
          text-decoration: none;
          display: flex;
          align-items: center;
          gap: 5px;
          font-size: 0.8rem;
          transition: color 0.2s;
        }
        .soc-a:hover { color: #f1f5f9; }

        /* ── Main scrollable content ── */
        .main { flex: 1; padding: 72px 0 120px 72px; }

        /* section spacing + scroll offset */
        .section { margin-bottom: 88px; scroll-margin-top: 72px; }

        /* section heading with gradient line */
        .sec-h {
          font-family: 'Syne', sans-serif;
          font-size: 0.65rem;
          font-weight: 700;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: #4f46e5;
          margin-bottom: 28px;
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .sec-h::after {
          content: '';
          flex: 1;
          height: 1px;
          background: linear-gradient(90deg, #1e293b, transparent);
        }

        /* about body text */
        .about-p { font-size: 0.95rem; line-height: 1.85; color: #94a3b8; }

        /* experience: 2-col grid (date | content) */
        .exp-card {
          display: grid;
          grid-template-columns: 90px 1fr;
          gap: 20px;
          padding: 18px 18px 18px 0;
          border-radius: 10px;
          transition: background 0.2s, padding-left 0.2s;
          position: relative;
          margin-bottom: 4px;
        }
        .exp-card:hover { background: rgba(255,255,255,0.025); padding-left: 18px; }

        /* left accent bar on hover */
        .exp-card:hover::before {
          content: '';
          position: absolute;
          left: 0; top: 0; bottom: 0;
          width: 2px;
          border-radius: 2px;
          background: linear-gradient(180deg, #4f46e5, #fb923c);
        }

        .exp-dates {
          font-family: 'Syne', sans-serif;
          font-size: 0.68rem;
          font-weight: 600;
          color: #475569;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          padding-top: 3px;
          line-height: 1.6;
        }

        .exp-pos { font-family: 'Syne', sans-serif; font-size: 0.95rem; font-weight: 700; color: #e2e8f0; margin-bottom: 3px; }
        .exp-co { font-size: 0.85rem; color: #7c3aed; margin-bottom: 8px; }
        .exp-desc { font-size: 0.85rem; line-height: 1.75; color: #64748b; }

        /* pill row (skills, tech stack) */
        .pills { display: flex; flex-wrap: wrap; gap: 6px; margin-top: 10px; }

        /* skill category */
        .skills-group { margin-bottom: 24px; }
        .skills-cat {
          font-family: 'Syne', sans-serif;
          font-size: 0.68rem;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: #475569;
          margin-bottom: 10px;
        }

        /* project card */
        .proj-card {
          padding: 18px;
          border-radius: 10px;
          border: 1px solid #1e293b;
          margin-bottom: 14px;
          transition: border-color 0.2s, transform 0.2s;
        }
        .proj-card:hover { border-color: #334155; transform: translateY(-2px); }

        .proj-name {
          font-family: 'Syne', sans-serif;
          font-size: 0.95rem;
          font-weight: 700;
          color: #e2e8f0;
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 7px;
        }

        .proj-desc { font-size: 0.85rem; line-height: 1.75; color: #64748b; margin-bottom: 10px; }

        /* education: same 2-col grid as exp */
        .edu-card { display: grid; grid-template-columns: 90px 1fr; gap: 20px; margin-bottom: 24px; }

        .edu-year {
          font-family: 'Syne', sans-serif;
          font-size: 0.68rem;
          font-weight: 600;
          color: #475569;
          text-transform: uppercase;
          padding-top: 3px;
        }

        .edu-deg { font-family: 'Syne', sans-serif; font-size: 0.95rem; font-weight: 700; color: #e2e8f0; margin-bottom: 3px; }
        .edu-school { font-size: 0.85rem; color: #7c3aed; }
        .edu-gpa { font-size: 0.78rem; color: #475569; margin-top: 2px; }

        /* cert/award row */
        .cert-row {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 12px;
          padding: 13px 0;
          border-bottom: 1px solid #1e293b;
        }

        .cert-name { font-family: 'Syne', sans-serif; font-size: 0.88rem; font-weight: 600; color: #e2e8f0; }
        .cert-sub { font-size: 0.78rem; color: #475569; margin-top: 2px; }
        .cert-date { font-family: 'Syne', sans-serif; font-size: 0.72rem; color: #334155; white-space: nowrap; padding-top: 2px; }

        /* shared pill styles */
        .pill {
          font-size: 0.7rem;
          font-weight: 500;
          padding: 3px 11px;
          border-radius: 999px;
          background: rgba(79,70,229,0.12);
          color: #818cf8;
          border: 1px solid rgba(79,70,229,0.2);
        }

        .pill-o {
          background: rgba(251,146,60,0.1);
          color: #fb923c;
          border-color: rgba(251,146,60,0.2);
        }

        /* ── Mobile top bar ── */
        .mob-bar {
          display: none; /* hidden on desktop */
          position: fixed;
          top: 0; left: 0; right: 0;
          z-index: 100;
          background: rgba(10,15,30,0.96);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border-bottom: 1px solid #1e293b;
          padding: 14px 20px;
          align-items: center;
          justify-content: space-between;
        }

        .mob-name {
          font-family: 'Syne', sans-serif;
          font-weight: 800;
          font-size: 1rem;
          color: #f1f5f9;
        }

        .mob-menu-btn {
          background: none;
          border: none;
          color: #cbd5e1;
          cursor: pointer;
          padding: 4px;
          display: flex;
          align-items: center;
        }

        /* mobile dropdown menu */
        .mob-nav {
          display: none; /* hidden on desktop */
          position: fixed;
          top: 53px; left: 0; right: 0;
          z-index: 99;
          background: rgba(10,15,30,0.98);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border-bottom: 1px solid #1e293b;
          padding: 12px 20px 18px;
          flex-direction: column;
          gap: 0;
        }

        .mob-nav.open { display: flex; }

        .mob-nav-btn {
          background: none;
          border: none;
          border-bottom: 1px solid #1e293b;
          color: #7c86a2;
          cursor: pointer;
          font-family: 'Syne', sans-serif;
          font-size: 0.78rem;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          padding: 12px 0;
          text-align: left;
          transition: color 0.2s;
          width: 100%;
        }

        .mob-nav-btn:last-child { border-bottom: none; }
        .mob-nav-btn:hover, .mob-nav-btn.active { color: #f1f5f9; }

        /* ── Tablet (900px) ── */
        @media (max-width: 900px) {
          /* stack layout vertically */
          .wrap { flex-direction: column; padding: 80px 20px 60px; }

          /* hide desktop sidebar, show mobile bar */
          .sidebar { display: none; }
          .mob-bar { display: flex; }

          /* remove left padding */
          .main { padding: 28px 0 80px; }

          /* collapse 2-col grids to single col */
          .exp-card, .edu-card { grid-template-columns: 1fr; gap: 4px; }

          /* show date inline before content */
          .exp-dates, .edu-year { font-size: 0.65rem; }
        }

        /* ── Small phones (480px) ── */
        @media (max-width: 480px) {
          .s-name { font-size: 1.6rem; }
          .sec-h { font-size: 0.6rem; margin-bottom: 20px; }
          .exp-pos, .proj-name, .edu-deg { font-size: 0.88rem; }
          .about-p, .exp-desc, .proj-desc { font-size: 0.83rem; }
          .proj-card { padding: 14px; }
          .pill { font-size: 0.64rem; padding: 2px 9px; }
          .section { margin-bottom: 64px; }
        }
      `}</style>

      {/* ── Mobile bar (fixed top) ── */}
      <div className="mob-bar">
        <span className="mob-name">{personalInfo?.fullName}</span>
        <button className="mob-menu-btn" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* mobile dropdown nav */}
      <div className={`mob-nav ${menuOpen ? "open" : ""}`}>
        {navItems.map(({ id, label }) => (
          <button
            key={id}
            className={`mob-nav-btn ${activeSection === id ? "active" : ""}`}
            onClick={() => scrollTo(id)}
          >
            {label}
          </button>
        ))}
      </div>

      {/* ── Page layout ── */}
      <div className="wrap">

        {/* desktop sidebar (sticky) */}
        <aside className="sidebar">
          <div>
            <h1 className="s-name">{personalInfo?.fullName ?? "Your Name"}</h1>
            <h2 className="s-title">{personalInfo?.title ?? "Title"}</h2>
            {summary && <p className="s-bio">{summary}</p>}

            {/* desktop scroll nav */}
            <nav className="nav">
              {navItems.map(({ id, label }) => (
                <button
                  key={id}
                  className={`nav-btn ${activeSection === id ? "active" : ""}`}
                  onClick={() => scrollTo(id)}
                >
                  <span className="nav-line" />
                  <span className="nav-label">{label}</span>
                </button>
              ))}
            </nav>
          </div>

          {/* socials pinned to bottom */}
          <div className="socials">
            {personalInfo?.email     && <a href={`mailto:${personalInfo.email}`} className="soc-a"><Mail size={15} /></a>}
            {personalInfo?.linkedin  && <a href={personalInfo.linkedin}  className="soc-a" target="_blank" rel="noreferrer"><Linkedin size={15} /></a>}
            {personalInfo?.github    && <a href={personalInfo.github}    className="soc-a" target="_blank" rel="noreferrer"><Github   size={15} /></a>}
            {personalInfo?.portfolio && <a href={personalInfo.portfolio} className="soc-a" target="_blank" rel="noreferrer"><Globe    size={15} /></a>}
            {personalInfo?.location  && <span className="soc-a"><MapPin size={13} /> {personalInfo.location}</span>}
          </div>
        </aside>

        {/* scrollable main */}
        <main className="main">

          {/* About */}
          <section id="about" className="section">
            <p className="sec-h">About</p>
            <p className="about-p">{summary}</p>

            {/* socials inline on mobile (below about text) */}
            <div className="socials" style={{ marginTop: 18 }}>
              {personalInfo?.email     && <a href={`mailto:${personalInfo.email}`} className="soc-a"><Mail size={15} /></a>}
              {personalInfo?.linkedin  && <a href={personalInfo.linkedin}  className="soc-a" target="_blank" rel="noreferrer"><Linkedin size={15} /></a>}
              {personalInfo?.github    && <a href={personalInfo.github}    className="soc-a" target="_blank" rel="noreferrer"><Github   size={15} /></a>}
              {personalInfo?.portfolio && <a href={personalInfo.portfolio} className="soc-a" target="_blank" rel="noreferrer"><Globe    size={15} /></a>}
              {personalInfo?.location  && <span className="soc-a"><MapPin size={13} /> {personalInfo.location}</span>}
            </div>
          </section>

          {/* Experience */}
          {experience?.length > 0 && (
            <section id="experience" className="section">
              <p className="sec-h">Experience</p>
              {experience.map((exp, i) => (
                <div key={i} className="exp-card">
                  <div className="exp-dates">
                    {exp.startDate?.slice(0, 4)} — {exp.current ? "Now" : exp.endDate?.slice(0, 4)}
                  </div>
                  <div>
                    <div className="exp-pos">{exp.position}</div>
                    <div className="exp-co">{exp.company}{exp.location ? ` · ${exp.location}` : ""}</div>
                    <div className="exp-desc">{exp.description}</div>
                    {exp.technologies?.length > 0 && (
                      <div className="pills">
                        {exp.technologies.map((t, j) => <span key={j} className="pill">{t}</span>)}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </section>
          )}

          {/* Skills */}
          {skills && (
            <section id="skills" className="section">
              <p className="sec-h">Skills</p>
              {skills.technical?.map((cat, i) => (
                <div key={i} className="skills-group">
                  <div className="skills-cat">{cat.category}</div>
                  <div className="pills">
                    {cat.items?.map((item, j) => <span key={j} className="pill">{item}</span>)}
                  </div>
                </div>
              ))}
              {skills.soft?.length > 0 && (
                <div className="skills-group">
                  <div className="skills-cat">Soft Skills</div>
                  <div className="pills">
                    {skills.soft.map((s, i) => <span key={i} className="pill pill-o">{s}</span>)}
                  </div>
                </div>
              )}
            </section>
          )}

          {/* Projects */}
          {projects?.length > 0 && (
            <section id="projects" className="section">
              <p className="sec-h">Projects</p>
              {projects.map((proj, i) => (
                <div key={i} className="proj-card">
                  <div className="proj-name">
                    {proj.name}
                    {proj.url && (
                      <a href={proj.url} target="_blank" rel="noreferrer" style={{ color: "#475569", marginLeft: "auto" }}>
                        <ExternalLink size={13} />
                      </a>
                    )}
                  </div>
                  <div className="proj-desc">{proj.description}</div>
                  {proj.technologies?.length > 0 && (
                    <div className="pills">
                      {proj.technologies.map((t, j) => <span key={j} className="pill">{t}</span>)}
                    </div>
                  )}
                </div>
              ))}
            </section>
          )}

          {/* Education */}
          {education?.length > 0 && (
            <section id="education" className="section">
              <p className="sec-h">Education</p>
              {education.map((edu, i) => (
                <div key={i} className="edu-card">
                  <div className="edu-year">{edu.endDate?.slice(0, 4)}</div>
                  <div>
                    <div className="edu-deg">{edu.degree}{edu.field ? ` in ${edu.field}` : ""}</div>
                    <div className="edu-school">{edu.institution}</div>
                    {edu.gpa && <div className="edu-gpa">GPA: {edu.gpa}</div>}
                  </div>
                </div>
              ))}
            </section>
          )}

          {/* Certifications + Awards combined */}
          {(certifications?.length > 0 || awards?.length > 0) && (
            <section id="certifications" className="section">
              <p className="sec-h">Certifications & Awards</p>
              {certifications?.map((cert, i) => (
                <div key={i} className="cert-row">
                  <div>
                    <div className="cert-name">{cert.name}</div>
                    {cert.issuer && <div className="cert-sub">{cert.issuer}</div>}
                  </div>
                  {cert.date && <div className="cert-date">{cert.date}</div>}
                </div>
              ))}
              {awards?.map((award, i) => (
                <div key={i} className="cert-row">
                  <div>
                    <div className="cert-name">{award.title}</div>
                    {award.description && <div className="cert-sub">{award.description}</div>}
                  </div>
                  {award.date && <div className="cert-date">{award.date}</div>}
                </div>
              ))}
            </section>
          )}

        </main>
      </div>
    </>
  );
}