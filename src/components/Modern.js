"use client";
import { useState, useEffect } from "react";
import { Github, Linkedin, Globe, Mail, MapPin, ExternalLink, Menu, X, ArrowUpRight, Code, Award, GraduationCap, Briefcase } from "lucide-react";

export default function Modern({ details }) {
  const [activeSection, setActiveSection] = useState("home");
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const { personalInfo, summary, experience, education, skills, projects, certifications, awards } = details;

  const navItems = [
    { id: "home",           label: "Home",           show: true },
    { id: "about",          label: "About",          show: !!summary },
    { id: "experience",     label: "Experience",     show: experience?.length > 0 },
    { id: "projects",       label: "Projects",       show: projects?.length > 0 },
    { id: "skills",         label: "Skills",         show: !!skills },
    { id: "education",      label: "Education",      show: education?.length > 0 },
    { id: "certifications", label: "Awards",         show: certifications?.length > 0 || awards?.length > 0 },
  ].filter(i => i.show);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const observers = [];
    navItems.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (!el) return;
      const observer = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveSection(id); },
        { rootMargin: "-30% 0px -70% 0px" }
      );
      observer.observe(el);
      observers.push(observer);
    });
    return () => observers.forEach(o => o.disconnect());
  }, []);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) {
      const y = el.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
    setMenuOpen(false);
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&family=Inter:wght@300;400;500;600&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        
        body {
          background: #09090b;
          color: #a1a1aa;
          font-family: 'Inter', sans-serif;
          overflow-x: hidden;
          line-height: 1.6;
        }

        h1, h2, h3, h4, h5, h6 { font-family: 'Outfit', sans-serif; color: #f4f4f5; }
        a { color: inherit; text-decoration: none; }

        /* ── Nav ── */
        .navbar {
          position: fixed;
          top: 0; left: 0; right: 0;
          height: 70px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 5%;
          z-index: 1000;
          transition: all 0.3s ease;
        }
        .navbar.scrolled {
          background: rgba(9, 9, 11, 0.8);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border-bottom: 1px solid rgba(255,255,255,0.05);
        }

        .nav-logo { font-family: 'Outfit', sans-serif; font-size: 1.2rem; font-weight: 800; letter-spacing: -0.02em; color: #fff; cursor: pointer; }
        .nav-links { display: flex; gap: 28px; }
        .nav-item {
          font-family: 'Outfit', sans-serif;
          font-size: 0.9rem;
          font-weight: 500;
          color: #a1a1aa;
          cursor: pointer;
          transition: color 0.2s;
          position: relative;
        }
        .nav-item:hover, .nav-item.active { color: #fff; }
        .nav-item.active::after {
          content: '';
          position: absolute;
          bottom: -6px; left: 0; right: 0;
          height: 2px;
          background: linear-gradient(90deg, #c084fc, #06b6d4);
          border-radius: 2px;
        }

        .mobile-toggle { display: none; background: none; border: none; color: #f4f4f5; cursor: pointer; }

        /* Mobile Menu */
        .mobile-menu {
          position: fixed;
          top: 70px; left: 0; right: 0;
          background: rgba(9, 9, 11, 0.98);
          backdrop-filter: blur(20px);
          border-bottom: 1px solid rgba(255,255,255,0.05);
          padding: 20px 5%;
          display: flex;
          flex-direction: column;
          gap: 16px;
          z-index: 999;
          transform: translateY(-100%);
          opacity: 0;
          pointer-events: none;
          transition: all 0.3s ease;
        }
        .mobile-menu.open { transform: translateY(0); opacity: 1; pointer-events: auto; }
        .mobile-menu .nav-item { font-size: 1.1rem; padding: 10px 0; border-bottom: 1px solid rgba(255,255,255,0.03); }
        .mobile-menu .nav-item:last-child { border: none; }

        /* ── Container ── */
        .container { max-width: 1100px; margin: 0 auto; padding: 0 5%; }
        .section { padding: 100px 0; }

        /* ── Hero ── */
        .hero { min-height: 100vh; display: flex; align-items: center; justify-content: center; position: relative; padding-top: 70px; }
        
        .hero-glow {
          position: absolute;
          width: 600px; height: 600px;
          background: radial-gradient(circle, rgba(192,132,252,0.15) 0%, rgba(6,182,212,0.05) 40%, rgba(9,9,11,0) 70%);
          top: 50%; left: 50%;
          transform: translate(-50%, -50%);
          z-index: -1;
          pointer-events: none;
        }

        .hero-content { text-align: center; z-index: 1; }
        .hero-badge {
          display: inline-flex; align-items: center; gap: 8px;
          padding: 6px 16px;
          border-radius: 99px;
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.08);
          font-size: 0.85rem;
          color: #d4d4d8;
          margin-bottom: 24px;
        }
        .hero-badge-dot { width: 8px; height: 8px; border-radius: 50%; background: #22c55e; box-shadow: 0 0 12px #22c55e; }

        .hero-title { font-size: clamp(3rem, 8vw, 5.5rem); font-weight: 800; line-height: 1.1; letter-spacing: -0.03em; margin-bottom: 20px; }
        .hero-title span { background: linear-gradient(to right, #fff, #a1a1aa); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
        .hero-title .gradient { background: linear-gradient(135deg, #c084fc 0%, #06b6d4 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }

        .hero-subtitle { font-size: clamp(1.1rem, 2vw, 1.4rem); color: #a1a1aa; max-width: 600px; margin: 0 auto 40px; font-weight: 400; }

        .hero-socials { display: flex; gap: 16px; justify-content: center; flex-wrap: wrap; }
        .hero-social {
          display: flex; align-items: center; justify-content: center;
          width: 44px; height: 44px;
          border-radius: 12px;
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.08);
          color: #e4e4e7;
          transition: all 0.2s ease;
        }
        .hero-social:hover { background: rgba(255,255,255,0.08); transform: translateY(-3px); border-color: rgba(255,255,255,0.15); color: #c084fc; }

        /* ── Section Headers ── */
        .sec-header { margin-bottom: 50px; }
        .sec-title { font-size: 2.2rem; font-weight: 700; letter-spacing: -0.02em; display: flex; align-items: center; gap: 12px; }
        .sec-title svg { color: #c084fc; }
        .sec-desc { font-size: 1.05rem; color: #71717a; margin-top: 8px; }

        /* ── Bento Grid base ── */
        .bento-box {
          background: rgba(255,255,255,0.02);
          border: 1px solid rgba(255,255,255,0.05);
          border-radius: 20px;
          padding: 32px;
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
        }
        .bento-box:hover { border-color: rgba(255,255,255,0.1); background: rgba(255,255,255,0.03); transform: translateY(-2px); }

        /* ── About ── */
        .about-grid { display: grid; grid-template-columns: 1.5fr 1fr; gap: 24px; }
        .about-text { font-size: 1.1rem; line-height: 1.8; color: #d4d4d8; }
        .about-info { display: flex; flex-direction: column; gap: 16px; }
        .info-item { display: flex; align-items: center; gap: 12px; font-size: 0.95rem; color: #a1a1aa; }
        .info-item svg { color: #c084fc; flex-shrink: 0; }
        .info-val { color: #f4f4f5; font-weight: 500; word-break: break-word; }

        /* ── Experience ── */
        .exp-list { display: flex; flex-direction: column; gap: 24px; }
        .exp-item { display: flex; gap: 24px; }
        .exp-timeline { display: flex; flex-direction: column; align-items: center; gap: 8px; width: 2px; }
        .exp-dot { width: 12px; height: 12px; border-radius: 50%; background: #c084fc; border: 3px solid #09090b; box-shadow: 0 0 0 1px rgba(255,255,255,0.1); flex-shrink: 0; z-index: 1; }
        .exp-line { width: 2px; flex: 1; background: rgba(255,255,255,0.05); }
        
        .exp-content { flex: 1; padding-bottom: 32px; }
        .exp-item:last-child .exp-line { display: none; }
        .exp-item:last-child .exp-content { padding-bottom: 0; }
        
        .exp-header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 12px; flex-wrap: wrap; gap: 8px; }
        .exp-role { font-family: 'Outfit', sans-serif; font-size: 1.25rem; font-weight: 600; color: #f4f4f5; }
        .exp-co { font-size: 1rem; color: #06b6d4; font-weight: 500; }
        .exp-date { font-family: 'Outfit', sans-serif; font-size: 0.85rem; color: #71717a; padding: 4px 12px; border-radius: 99px; background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.05); }
        .exp-desc { font-size: 0.95rem; color: #a1a1aa; line-height: 1.7; margin-bottom: 16px; white-space: pre-line; }

        .pill-list { display: flex; flex-wrap: wrap; gap: 8px; }
        .pill { font-size: 0.75rem; font-weight: 500; padding: 4px 12px; border-radius: 6px; background: rgba(192,132,252,0.1); color: #d8b4fe; border: 1px solid rgba(192,132,252,0.2); }

        /* ── Projects Bento ── */
        .proj-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 24px; }
        .proj-card { display: flex; flex-direction: column; justify-content: space-between; height: 100%; }
        .proj-top { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 16px; }
        .proj-icon { width: 44px; height: 44px; border-radius: 12px; background: rgba(6,182,212,0.1); color: #67e8f9; display: flex; align-items: center; justify-content: center; border: 1px solid rgba(6,182,212,0.2); }
        .proj-link { color: #71717a; transition: color 0.2s; }
        .proj-link:hover { color: #f4f4f5; transform: scale(1.1); }
        .proj-title { font-size: 1.25rem; font-weight: 600; margin-bottom: 8px; }
        .proj-desc { font-size: 0.9rem; color: #a1a1aa; line-height: 1.6; margin-bottom: 24px; flex: 1; white-space: pre-line; }

        /* ── Skills Bento ── */
        .skills-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 24px; }
        .skill-cat-title { font-family: 'Outfit', sans-serif; font-size: 1.1rem; font-weight: 600; margin-bottom: 16px; color: #e4e4e7; }
        
        .soft-skills { grid-column: 1 / -1; margin-top: 8px; }
        .soft-pill { background: rgba(255,255,255,0.03); color: #e4e4e7; border-color: rgba(255,255,255,0.1); }

        /* ── Education & Certs ── */
        .edu-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 24px; }
        .edu-card { padding: 24px; }
        .edu-deg { font-size: 1.15rem; font-weight: 600; color: #f4f4f5; margin-bottom: 4px; }
        .edu-sch { font-size: 0.95rem; color: #c084fc; margin-bottom: 12px; }
        .edu-meta { font-size: 0.85rem; color: #71717a; display: flex; gap: 12px; }

        .cert-row { display: flex; justify-content: space-between; align-items: center; padding: 16px 0; border-bottom: 1px solid rgba(255,255,255,0.05); flex-wrap: wrap; gap: 12px; }
        .cert-row:last-child { border: none; padding-bottom: 0; }
        .cert-title { font-size: 1rem; font-weight: 500; color: #e4e4e7; }
        .cert-sub { font-size: 0.85rem; color: #71717a; }

        /* ── Footer ── */
        .footer { padding: 40px 5%; border-top: 1px solid rgba(255,255,255,0.05); text-align: center; color: #71717a; font-size: 0.9rem; }
        .footer span { color: #f4f4f5; font-family: 'Outfit', sans-serif; font-weight: 600; }

        /* ── Responsive ── */
        @media (max-width: 900px) {
          .nav-links { display: none; }
          .mobile-toggle { display: block; }
          .about-grid { grid-template-columns: 1fr; }
          .hero-title { font-size: clamp(2.5rem, 10vw, 4rem); }
        }

        @media (max-width: 600px) {
          .section { padding: 60px 0; }
          .bento-box { padding: 20px; }
          .exp-item { gap: 16px; }
          .exp-header { flex-direction: column; align-items: flex-start; }
          .sec-title { font-size: 1.8rem; }
          .hero-glow { width: 300px; height: 300px; }
        }
      `}</style>

      {/* Nav */}
      <nav className={`navbar ${scrolled ? "scrolled" : ""}`}>
        <div className="nav-logo" onClick={() => scrollTo("home")}>{personalInfo?.fullName?.split(" ")[0] ?? "Portfolio"}</div>
        <div className="nav-links">
          {navItems.map(item => (
            <div key={item.id} className={`nav-item ${activeSection === item.id ? "active" : ""}`} onClick={() => scrollTo(item.id)}>
              {item.label}
            </div>
          ))}
        </div>
        <button className="mobile-toggle" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X /> : <Menu />}
        </button>
      </nav>

      {/* Mobile Menu */}
      <div className={`mobile-menu ${menuOpen ? "open" : ""}`}>
        {navItems.map(item => (
          <div key={item.id} className={`nav-item ${activeSection === item.id ? "active" : ""}`} onClick={() => scrollTo(item.id)}>
            {item.label}
          </div>
        ))}
      </div>

      {/* Home Hero */}
      <section id="home" className="hero">
        <div className="hero-glow"></div>
        <div className="container hero-content">
          <div className="hero-badge">
            <div className="hero-badge-dot"></div>
            Available for new opportunities
          </div>
          <h1 className="hero-title">
            <span>Hi, I'm {personalInfo?.fullName?.split(" ")[0] ?? "there"}.</span><br/>
            I build <span className="gradient">digital experiences.</span>
          </h1>
          <p className="hero-subtitle">
            {personalInfo?.title ?? "Software Engineer & Designer"} based in {personalInfo?.location ?? "Earth"}.
          </p>
          <div className="hero-socials">
            {personalInfo?.email     && <a href={`mailto:${personalInfo.email}`} className="hero-social"><Mail size={20} /></a>}
            {personalInfo?.linkedin  && <a href={personalInfo.linkedin}  className="hero-social" target="_blank" rel="noreferrer"><Linkedin size={20} /></a>}
            {personalInfo?.github    && <a href={personalInfo.github}    className="hero-social" target="_blank" rel="noreferrer"><Github size={20} /></a>}
            {personalInfo?.portfolio && <a href={personalInfo.portfolio} className="hero-social" target="_blank" rel="noreferrer"><Globe size={20} /></a>}
          </div>
        </div>
      </section>

      <div className="container">

        {/* About */}
        {summary && (
          <section id="about" className="section">
            <div className="sec-header">
              <h2 className="sec-title"><Award /> About Me</h2>
              <p className="sec-desc">A brief introduction</p>
            </div>
            <div className="bento-box about-grid">
              <div className="about-text">{summary}</div>
              <div className="about-info">
                {personalInfo?.email && <div className="info-item"><Mail size={18}/> <span className="info-val">{personalInfo.email}</span></div>}
                {personalInfo?.location && <div className="info-item"><MapPin size={18}/> <span className="info-val">{personalInfo.location}</span></div>}
                {experience?.[0] && <div className="info-item"><Briefcase size={18}/> <span className="info-val">{experience[0].company}</span></div>}
              </div>
            </div>
          </section>
        )}

        {/* Experience */}
        {experience?.length > 0 && (
          <section id="experience" className="section">
            <div className="sec-header">
              <h2 className="sec-title"><Briefcase /> Experience</h2>
              <p className="sec-desc">My professional journey</p>
            </div>
            <div className="bento-box">
              <div className="exp-list">
                {experience.map((exp, i) => (
                  <div key={i} className="exp-item">
                    <div className="exp-timeline">
                      <div className="exp-dot"></div>
                      <div className="exp-line"></div>
                    </div>
                    <div className="exp-content">
                      <div className="exp-header">
                        <div>
                          <h3 className="exp-role">{exp.position}</h3>
                          <div className="exp-co">{exp.company}{exp.location ? ` • ${exp.location}` : ""}</div>
                        </div>
                        <div className="exp-date">
                          {exp.startDate?.slice(0, 4)} — {exp.current ? "Present" : exp.endDate?.slice(0, 4)}
                        </div>
                      </div>
                      <p className="exp-desc">{exp.description}</p>
                      {exp.technologies?.length > 0 && (
                        <div className="pill-list">
                          {exp.technologies.map((t, j) => <span key={j} className="pill">{t}</span>)}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Projects */}
        {projects?.length > 0 && (
          <section id="projects" className="section">
            <div className="sec-header">
              <h2 className="sec-title"><Code /> Selected Projects</h2>
              <p className="sec-desc">Things I've built</p>
            </div>
            <div className="proj-grid">
              {projects.map((proj, i) => (
                <div key={i} className="bento-box proj-card">
                  <div>
                    <div className="proj-top">
                      <div className="proj-icon"><Code size={22} /></div>
                      {proj.url && <a href={proj.url} target="_blank" rel="noreferrer" className="proj-link"><ArrowUpRight size={20} /></a>}
                    </div>
                    <h3 className="proj-title">{proj.name}</h3>
                    <p className="proj-desc">{proj.description}</p>
                  </div>
                  {proj.technologies?.length > 0 && (
                    <div className="pill-list">
                      {proj.technologies.map((t, j) => <span key={j} className="pill">{t}</span>)}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Skills */}
        {skills && (
          <section id="skills" className="section">
            <div className="sec-header">
              <h2 className="sec-title"><Award /> Technical Arsenal</h2>
              <p className="sec-desc">Tools and technologies I use</p>
            </div>
            <div className="skills-grid">
              {skills.technical?.map((cat, i) => (
                <div key={i} className="bento-box">
                  <h3 className="skill-cat-title">{cat.category}</h3>
                  <div className="pill-list">
                    {cat.items?.map((item, j) => <span key={j} className="pill">{item}</span>)}
                  </div>
                </div>
              ))}
              {skills.soft?.length > 0 && (
                <div className="bento-box soft-skills">
                  <h3 className="skill-cat-title">Soft Skills</h3>
                  <div className="pill-list">
                    {skills.soft.map((s, i) => <span key={i} className="pill soft-pill">{s}</span>)}
                  </div>
                </div>
              )}
            </div>
          </section>
        )}

        {/* Education */}
        {education?.length > 0 && (
          <section id="education" className="section">
            <div className="sec-header">
              <h2 className="sec-title"><GraduationCap /> Education</h2>
              <p className="sec-desc">Academic background</p>
            </div>
            <div className="edu-grid">
              {education.map((edu, i) => (
                <div key={i} className="bento-box edu-card">
                  <h3 className="edu-deg">{edu.degree}{edu.field ? ` in ${edu.field}` : ""}</h3>
                  <div className="edu-sch">{edu.institution}</div>
                  <div className="edu-meta">
                    <span>{edu.endDate?.slice(0, 4)}</span>
                    {edu.gpa && <span>• GPA: {edu.gpa}</span>}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Certifications */}
        {(certifications?.length > 0 || awards?.length > 0) && (
          <section id="certifications" className="section">
            <div className="sec-header">
              <h2 className="sec-title"><Award /> Awards & Certifications</h2>
            </div>
            <div className="bento-box">
              {certifications?.map((cert, i) => (
                <div key={i} className="cert-row">
                  <div>
                    <div className="cert-title">{cert.name}</div>
                    {cert.issuer && <div className="cert-sub">{cert.issuer}</div>}
                  </div>
                  {cert.date && <div className="exp-date" style={{fontSize: '0.75rem'}}>{cert.date}</div>}
                </div>
              ))}
              {awards?.map((award, i) => (
                <div key={i} className="cert-row">
                  <div>
                    <div className="cert-title">{award.title}</div>
                    {award.description && <div className="cert-sub">{award.description}</div>}
                  </div>
                  {award.date && <div className="exp-date" style={{fontSize: '0.75rem'}}>{award.date}</div>}
                </div>
              ))}
            </div>
          </section>
        )}

      </div>

      <footer className="footer">
        <p>© {new Date().getFullYear()} <span>{personalInfo?.fullName}</span>. Built with Folioo.</p>
      </footer>
    </>
  );
}
