"use client";
import { useState, useEffect, useRef } from "react";
import { Mail, Linkedin, Github, Globe, MapPin, ExternalLink, ArrowUpRight } from "lucide-react";

// Place at: src/components/templates/Editorial.jsx
// Usage: <Editorial details={portfolio.details} />

export default function Editorial({ details }) {
  const { personalInfo, summary, experience, education, skills, projects, certifications, awards } = details;

  // fade-in on scroll
  const useReveal = () => {
    const ref = useRef(null);
    const [visible, setVisible] = useState(false);
    useEffect(() => {
      const obs = new IntersectionObserver(
        ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
        { threshold: 0.08 }
      );
      if (ref.current) obs.observe(ref.current);
      return () => obs.disconnect();
    }, []);
    return [ref, visible];
  };

  // section wrapper with reveal animation
  const Section = ({ num, title, children }) => {
    const [ref, visible] = useReveal();
    return (
      <section ref={ref} className={`ed-section ${visible ? "revealed" : ""}`}>
        <div className="sec-header">
          <span className="sec-num">0{num}</span>
          <span className="sec-title">{title}</span>
          <div className="sec-line" />
        </div>
        {children}
      </section>
    );
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400;1,700&family=DM+Mono:wght@300;400;500&family=Lato:wght@300;400;700&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        /* warm cream base */
        body {
          background: #F7F3EE;
          color: #1a1208;
          font-family: 'Lato', sans-serif;
          font-weight: 300;
          overflow-x: hidden;
        }

        /* ── CSS vars ── */
        :root {
          --cream:   #F7F3EE;
          --ink:     #1a1208;
          --muted:   #7a6f62;
          --accent:  #c2410c;  /* burnt orange */
          --border:  #d9d0c4;
          --card-bg: #EDE8E1;
        }

        /* ── Hero ── */
        .hero {
          padding: 80px 60px 60px;
          border-bottom: 1px solid var(--border);
          position: relative;
          overflow: hidden;
        }

        /* giant decorative letter behind name */
        .hero-bg-letter {
          position: absolute;
          right: -20px;
          top: -40px;
          font-family: 'Playfair Display', serif;
          font-size: 320px;
          font-weight: 900;
          color: var(--border);
          opacity: 0.4;
          line-height: 1;
          pointer-events: none;
          user-select: none;
          letter-spacing: -0.05em;
        }

        .hero-tag {
          font-family: 'DM Mono', monospace;
          font-size: 0.72rem;
          color: var(--accent);
          letter-spacing: 0.18em;
          text-transform: uppercase;
          margin-bottom: 20px;
        }

        .hero-name {
          font-family: 'Playfair Display', serif;
          font-weight: 900;
          font-size: clamp(3.5rem, 8vw, 7rem);
          line-height: 0.95;
          letter-spacing: -0.03em;
          color: var(--ink);
          max-width: 800px;
          position: relative;
          z-index: 1;
        }

        .hero-name em {
          font-style: italic;
          color: var(--accent);
        }

        .hero-meta {
          display: flex;
          flex-wrap: wrap;
          gap: 24px;
          margin-top: 36px;
          align-items: center;
        }

        .hero-title {
          font-family: 'Playfair Display', serif;
          font-size: 1.15rem;
          font-weight: 400;
          font-style: italic;
          color: var(--muted);
        }

        /* small divider dot */
        .dot { color: var(--border); font-size: 1.2rem; }

        /* social links in hero */
        .hero-socials {
          display: flex;
          gap: 16px;
          flex-wrap: wrap;
        }

        .soc {
          display: flex;
          align-items: center;
          gap: 5px;
          font-family: 'DM Mono', monospace;
          font-size: 0.72rem;
          color: var(--muted);
          text-decoration: none;
          transition: color 0.2s;
          letter-spacing: 0.03em;
        }
        .soc:hover { color: var(--accent); }

        /* ── Main layout ── */
        .main { max-width: 1100px; margin: 0 auto; padding: 0 60px 120px; }

        /* ── Section ── */
        .ed-section {
          margin-top: 80px;
          opacity: 0;
          transform: translateY(28px);
          transition: opacity 0.6s ease, transform 0.6s ease;
        }

        .ed-section.revealed { opacity: 1; transform: translateY(0); }

        .sec-header {
          display: flex;
          align-items: center;
          gap: 16px;
          margin-bottom: 44px;
        }

        .sec-num {
          font-family: 'DM Mono', monospace;
          font-size: 0.7rem;
          font-weight: 500;
          color: var(--accent);
          letter-spacing: 0.1em;
          flex-shrink: 0;
        }

        .sec-title {
          font-family: 'DM Mono', monospace;
          font-size: 0.72rem;
          font-weight: 500;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: var(--muted);
          flex-shrink: 0;
        }

        .sec-line {
          flex: 1;
          height: 1px;
          background: var(--border);
        }

        /* ── About ── */
        .about-grid {
          display: grid;
          grid-template-columns: 1fr 340px;
          gap: 60px;
          align-items: start;
        }

        .about-quote {
          font-family: 'Playfair Display', serif;
          font-size: clamp(1.4rem, 2.5vw, 1.9rem);
          font-weight: 400;
          line-height: 1.5;
          color: var(--ink);
          border-left: 3px solid var(--accent);
          padding-left: 24px;
        }

        .about-body {
          font-size: 0.95rem;
          line-height: 1.85;
          color: var(--muted);
          margin-top: 24px;
          padding-left: 27px;
        }

        /* right side info cards */
        .info-cards { display: flex; flex-direction: column; gap: 12px; }

        .info-card {
          background: var(--card-bg);
          border-radius: 10px;
          padding: 16px 18px;
        }

        .ic-label {
          font-family: 'DM Mono', monospace;
          font-size: 0.62rem;
          color: var(--muted);
          letter-spacing: 0.14em;
          text-transform: uppercase;
          margin-bottom: 4px;
        }

        .ic-value {
          font-family: 'Lato', sans-serif;
          font-size: 0.88rem;
          font-weight: 700;
          color: var(--ink);
        }

        /* ── Experience ── */
        .exp-item {
          display: grid;
          grid-template-columns: 160px 1fr;
          gap: 40px;
          padding: 32px 0;
          border-bottom: 1px solid var(--border);
        }

        .exp-item:first-of-type { border-top: 1px solid var(--border); }

        .exp-left {}

        .exp-period {
          font-family: 'DM Mono', monospace;
          font-size: 0.68rem;
          color: var(--muted);
          letter-spacing: 0.06em;
          line-height: 1.6;
        }

        .exp-co {
          font-family: 'Playfair Display', serif;
          font-size: 1rem;
          font-weight: 700;
          color: var(--accent);
          margin-top: 6px;
        }

        .exp-pos {
          font-family: 'Playfair Display', serif;
          font-size: 1.3rem;
          font-weight: 700;
          color: var(--ink);
          line-height: 1.2;
          margin-bottom: 12px;
        }

        .exp-desc {
          font-size: 0.9rem;
          line-height: 1.8;
          color: var(--muted);
        }

        .exp-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
          margin-top: 14px;
        }

        .tag {
          font-family: 'DM Mono', monospace;
          font-size: 0.65rem;
          padding: 3px 10px;
          border-radius: 4px;
          border: 1px solid var(--border);
          color: var(--muted);
          background: var(--cream);
          letter-spacing: 0.04em;
        }

        /* ── Skills bento grid ── */
        .skills-bento {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 12px;
        }

        .skill-card {
          background: var(--card-bg);
          border-radius: 12px;
          padding: 22px 20px;
          transition: background 0.2s, transform 0.2s;
        }

        .skill-card:hover { background: var(--ink); transform: translateY(-2px); }
        .skill-card:hover .skill-cat { color: var(--accent); }
        .skill-card:hover .skill-items { color: #e5ddd5; }

        .skill-cat {
          font-family: 'DM Mono', monospace;
          font-size: 0.65rem;
          font-weight: 500;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: var(--muted);
          margin-bottom: 10px;
          transition: color 0.2s;
        }

        .skill-items {
          font-family: 'Lato', sans-serif;
          font-size: 0.88rem;
          font-weight: 700;
          color: var(--ink);
          line-height: 1.6;
          transition: color 0.2s;
        }

        /* soft skills card — wider */
        .skill-card-wide {
          grid-column: span 3;
          background: var(--ink);
          border-radius: 12px;
          padding: 22px 24px;
          display: flex;
          align-items: center;
          gap: 20px;
          flex-wrap: wrap;
        }

        .sk-label {
          font-family: 'DM Mono', monospace;
          font-size: 0.65rem;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: var(--accent);
          flex-shrink: 0;
        }

        .sk-pill {
          font-family: 'Lato', sans-serif;
          font-size: 0.8rem;
          font-weight: 700;
          color: #e5ddd5;
          padding: 4px 12px;
          border: 1px solid #3a3028;
          border-radius: 999px;
        }

        /* ── Projects ── */
        .proj-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 16px;
        }

        .proj-card {
          background: var(--card-bg);
          border-radius: 12px;
          padding: 28px 24px;
          position: relative;
          transition: background 0.2s, transform 0.2s;
          overflow: hidden;
        }

        .proj-card::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 3px;
          background: linear-gradient(90deg, var(--accent), #fb923c);
          opacity: 0;
          transition: opacity 0.3s;
        }

        .proj-card:hover { background: #e6e0d8; transform: translateY(-3px); }
        .proj-card:hover::before { opacity: 1; }

        .proj-name {
          font-family: 'Playfair Display', serif;
          font-size: 1.15rem;
          font-weight: 700;
          color: var(--ink);
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 8px;
          margin-bottom: 10px;
        }

        .proj-link { color: var(--muted); transition: color 0.2s; }
        .proj-link:hover { color: var(--accent); }

        .proj-desc {
          font-size: 0.88rem;
          line-height: 1.75;
          color: var(--muted);
          margin-bottom: 14px;
        }

        /* ── Education ── */
        .edu-item {
          display: grid;
          grid-template-columns: 160px 1fr;
          gap: 40px;
          padding: 28px 0;
          border-bottom: 1px solid var(--border);
        }
        .edu-item:first-of-type { border-top: 1px solid var(--border); }

        .edu-year {
          font-family: 'DM Mono', monospace;
          font-size: 0.68rem;
          color: var(--muted);
          letter-spacing: 0.06em;
          padding-top: 4px;
        }

        .edu-deg {
          font-family: 'Playfair Display', serif;
          font-size: 1.25rem;
          font-weight: 700;
          color: var(--ink);
          margin-bottom: 4px;
        }

        .edu-school {
          font-family: 'Playfair Display', serif;
          font-size: 0.95rem;
          font-style: italic;
          color: var(--accent);
          margin-bottom: 6px;
        }

        .edu-note { font-size: 0.85rem; color: var(--muted); line-height: 1.6; }

        /* ── Certs & Awards ── */
        .cert-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 12px; }

        .cert-card {
          background: var(--card-bg);
          border-radius: 10px;
          padding: 20px;
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          gap: 12px;
        }

        .cert-name {
          font-family: 'Lato', sans-serif;
          font-size: 0.9rem;
          font-weight: 700;
          color: var(--ink);
          margin-bottom: 3px;
        }

        .cert-issuer { font-size: 0.8rem; color: var(--muted); }

        .cert-date {
          font-family: 'DM Mono', monospace;
          font-size: 0.65rem;
          color: var(--accent);
          white-space: nowrap;
          padding-top: 2px;
        }

        /* ── Footer ── */
        .footer {
          border-top: 1px solid var(--border);
          margin: 80px 60px 0;
          padding: 40px 0;
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 16px;
        }

        .footer-name {
          font-family: 'Playfair Display', serif;
          font-size: 1.3rem;
          font-weight: 700;
          font-style: italic;
          color: var(--ink);
        }

        .footer-copy {
          font-family: 'DM Mono', monospace;
          font-size: 0.65rem;
          color: var(--muted);
          letter-spacing: 0.08em;
        }

        /* ── Responsive ── */

        /* tablet */
        @media (max-width: 860px) {
          .hero { padding: 60px 28px 44px; }
          .hero-bg-letter { font-size: 180px; opacity: 0.25; }
          .main { padding: 0 28px 80px; }

          /* about stacks */
          .about-grid { grid-template-columns: 1fr; gap: 32px; }

          /* exp 2-col → 1-col */
          .exp-item, .edu-item { grid-template-columns: 1fr; gap: 8px; }

          /* skills 3-col → 2-col */
          .skills-bento { grid-template-columns: repeat(2, 1fr); }
          .skill-card-wide { grid-column: span 2; }

          /* projects 2-col → 1-col */
          .proj-grid { grid-template-columns: 1fr; }

          /* certs 2-col → 1-col */
          .cert-grid { grid-template-columns: 1fr; }

          .footer { margin: 60px 28px 0; }
        }

        /* phone */
        @media (max-width: 480px) {
          .hero { padding: 44px 20px 36px; }
          .main { padding: 0 20px 60px; }
          .hero-bg-letter { display: none; }
          .hero-meta { gap: 12px; flex-direction: column; align-items: flex-start; }
          .dot { display: none; }
          .ed-section { margin-top: 56px; }
          .about-quote { font-size: 1.25rem; }
          .skills-bento { grid-template-columns: 1fr; }
          .skill-card-wide { grid-column: span 1; }
          .footer { margin: 40px 20px 0; flex-direction: column; align-items: flex-start; }
        }
      `}</style>

      {/* ── Hero ── */}
      <header className="hero">
        {/* decorative bg letter — first char of first name */}
        <div className="hero-bg-letter" aria-hidden="true">
          {personalInfo?.fullName?.charAt(0) ?? "A"}
        </div>

        <p className="hero-tag">Portfolio · {new Date().getFullYear()}</p>

        <h1 className="hero-name">
          {/* italicise last word of name for style */}
          {personalInfo?.fullName?.split(" ").map((word, i, arr) =>
            i === arr.length - 1
              ? <em key={i}>{word}</em>
              : <span key={i}>{word} </span>
          ) ?? "Your Name"}
        </h1>

        <div className="hero-meta">
          <span className="hero-title">{personalInfo?.title ?? "Professional Title"}</span>

          {personalInfo?.location && <>
            <span className="dot">·</span>
            <span className="soc"><MapPin size={13} /> {personalInfo.location}</span>
          </>}

          <span className="dot">·</span>

          <div className="hero-socials">
            {personalInfo?.email     && <a href={`mailto:${personalInfo.email}`} className="soc"><Mail size={13} /> Email</a>}
            {personalInfo?.linkedin  && <a href={personalInfo.linkedin}  className="soc" target="_blank" rel="noreferrer"><Linkedin size={13} /> LinkedIn</a>}
            {personalInfo?.github    && <a href={personalInfo.github}    className="soc" target="_blank" rel="noreferrer"><Github size={13} /> GitHub</a>}
            {personalInfo?.portfolio && <a href={personalInfo.portfolio} className="soc" target="_blank" rel="noreferrer"><Globe size={13} /> Website</a>}
          </div>
        </div>
      </header>

      <div className="main">

        {/* ── About ── */}
        {summary && (
          <Section num={1} title="About">
            <div className="about-grid">
              <div>
                {/* first sentence as pull quote */}
                <p className="about-quote">
                  {summary.split(".")[0]}.
                </p>
                {/* rest as body */}
                <p className="about-body">
                  {summary.split(".").slice(1).join(".").trim()}
                </p>
              </div>

              {/* quick info cards */}
              <div className="info-cards">
                {personalInfo?.email    && <div className="info-card"><div className="ic-label">Email</div><div className="ic-value">{personalInfo.email}</div></div>}
                {personalInfo?.location && <div className="info-card"><div className="ic-label">Location</div><div className="ic-value">{personalInfo.location}</div></div>}
                {personalInfo?.phone    && <div className="info-card"><div className="ic-label">Phone</div><div className="ic-value">{personalInfo.phone}</div></div>}
                {experience?.[0]        && <div className="info-card"><div className="ic-label">Currently At</div><div className="ic-value">{experience[0].company}</div></div>}
              </div>
            </div>
          </Section>
        )}

        {/* ── Experience ── */}
        {experience?.length > 0 && (
          <Section num={2} title="Experience">
            {experience.map((exp, i) => (
              <div key={i} className="exp-item">
                <div className="exp-left">
                  <div className="exp-period">
                    {exp.startDate?.slice(0, 4)} — {exp.current ? "Present" : exp.endDate?.slice(0, 4)}
                  </div>
                  <div className="exp-co">{exp.company}</div>
                  {exp.location && <div className="exp-period" style={{ marginTop: 4 }}>{exp.location}</div>}
                </div>
                <div>
                  <div className="exp-pos">{exp.position}</div>
                  <div className="exp-desc">{exp.description}</div>
                  {exp.technologies?.length > 0 && (
                    <div className="exp-tags">
                      {exp.technologies.map((t, j) => <span key={j} className="tag">{t}</span>)}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </Section>
        )}

        {/* ── Skills ── */}
        {skills && (
          <Section num={3} title="Skills">
            <div className="skills-bento">
              {skills.technical?.map((cat, i) => (
                <div key={i} className="skill-card">
                  <div className="skill-cat">{cat.category}</div>
                  <div className="skill-items">{cat.items?.join(", ")}</div>
                </div>
              ))}
              {skills.soft?.length > 0 && (
                <div className="skill-card-wide">
                  <span className="sk-label">Soft Skills</span>
                  {skills.soft.map((s, i) => <span key={i} className="sk-pill">{s}</span>)}
                </div>
              )}
            </div>
          </Section>
        )}

        {/* ── Projects ── */}
        {projects?.length > 0 && (
          <Section num={4} title="Projects">
            <div className="proj-grid">
              {projects.map((proj, i) => (
                <div key={i} className="proj-card">
                  <div className="proj-name">
                    {proj.name}
                    {proj.url && (
                      <a href={proj.url} target="_blank" rel="noreferrer" className="proj-link">
                        <ArrowUpRight size={16} />
                      </a>
                    )}
                  </div>
                  <div className="proj-desc">{proj.description}</div>
                  {proj.technologies?.length > 0 && (
                    <div className="exp-tags">
                      {proj.technologies.map((t, j) => <span key={j} className="tag">{t}</span>)}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </Section>
        )}

        {/* ── Education ── */}
        {education?.length > 0 && (
          <Section num={5} title="Education">
            {education.map((edu, i) => (
              <div key={i} className="edu-item">
                <div className="edu-year">
                  {edu.startDate?.slice(0, 4) && edu.endDate?.slice(0, 4)
                    ? `${edu.startDate.slice(0, 4)} — ${edu.endDate.slice(0, 4)}`
                    : edu.endDate?.slice(0, 4) ?? ""}
                </div>
                <div>
                  <div className="edu-deg">{edu.degree}{edu.field ? ` in ${edu.field}` : ""}</div>
                  <div className="edu-school">{edu.institution}</div>
                  {edu.gpa && <div className="edu-note">GPA: {edu.gpa}</div>}
                  {edu.achievements?.length > 0 && (
                    <div className="edu-note" style={{ marginTop: 6 }}>{edu.achievements.join(" · ")}</div>
                  )}
                </div>
              </div>
            ))}
          </Section>
        )}

        {/* ── Certifications & Awards ── */}
        {(certifications?.length > 0 || awards?.length > 0) && (
          <Section num={6} title="Certifications & Awards">
            <div className="cert-grid">
              {certifications?.map((cert, i) => (
                <div key={i} className="cert-card">
                  <div>
                    <div className="cert-name">{cert.name}</div>
                    {cert.issuer && <div className="cert-issuer">{cert.issuer}</div>}
                  </div>
                  {cert.date && <div className="cert-date">{cert.date}</div>}
                </div>
              ))}
              {awards?.map((award, i) => (
                <div key={i} className="cert-card">
                  <div>
                    <div className="cert-name">{award.title}</div>
                    {award.description && <div className="cert-issuer">{award.description}</div>}
                  </div>
                  {award.date && <div className="cert-date">{award.date}</div>}
                </div>
              ))}
            </div>
          </Section>
        )}

      </div>

      {/* ── Footer ── */}
      <footer className="footer">
        <span className="footer-name">{personalInfo?.fullName}</span>
        <span className="footer-copy">
          {personalInfo?.email} · Built with Folioo
        </span>
      </footer>
    </>
  );
}