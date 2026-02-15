"use client";
import { useState, useEffect } from "react";
import { ChevronRight, ChevronDown, FolderOpen, FileCode, Mail, Github, Linkedin, Globe, MapPin } from "lucide-react";

// Place at: src/components/templates/Terminal.jsx

export default function Terminal({ details }) {
  const { personalInfo, summary, experience, education, skills, projects, certifications, awards } = details;

  const [activeFile, setActiveFile] = useState("about.md");
  const [openFolders, setOpenFolders] = useState({ portfolio: true });
  const [typedText, setTypedText] = useState("");
  const [cursorVisible, setCursorVisible] = useState(true);

  const files = [
    { name: "about.md",           label: "about.md" },
    { name: "experience.json",    label: "experience.json",   show: experience?.length > 0 },
    { name: "skills.ts",          label: "skills.ts",         show: !!skills },
    { name: "projects.js",        label: "projects.js",       show: projects?.length > 0 },
    { name: "education.md",       label: "education.md",      show: education?.length > 0 },
    { name: "certifications.yml", label: "certifications.yml",show: certifications?.length > 0 || awards?.length > 0 },
  ].filter(f => f.show !== false);

  const [openTabs, setOpenTabs] = useState(["about.md"]);

  const openFile = (name) => {
    setActiveFile(name);
    if (!openTabs.includes(name)) setOpenTabs(prev => [...prev, name]);
    setTypedText("");
  };

  const closeTab = (name, e) => {
    e.stopPropagation();
    const next = openTabs.filter(t => t !== name);
    setOpenTabs(next);
    if (activeFile === name) setActiveFile(next[next.length - 1] ?? "");
  };

  const toggleFolder = (name) => setOpenFolders(prev => ({ ...prev, [name]: !prev[name] }));

  useEffect(() => {
    const t = setInterval(() => setCursorVisible(v => !v), 530);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    if (activeFile !== "about.md" || !summary) return;
    setTypedText("");
    let i = 0;
    const t = setInterval(() => {
      setTypedText(summary.slice(0, i));
      i++;
      if (i > summary.length) clearInterval(t);
    }, 12);
    return () => clearInterval(t);
  }, [activeFile, summary]);

  const Lines = ({ count }) => (
    <div className="line-nums">
      {Array.from({ length: count }, (_, i) => (
        <span key={i}>{i + 1}</span>
      ))}
    </div>
  );

  const kw  = (t) => <span className="c-kw">{t}</span>;
  const str = (t) => <span className="c-str">{`"${t}"`}</span>;
  const num = (t) => <span className="c-num">{t}</span>;
  const cmt = (t) => <span className="c-cmt">{t}</span>;
  const fn  = (t) => <span className="c-fn">{t}</span>;
  const prop= (t) => <span className="c-prop">{t}</span>;
  const pun = (t) => <span className="c-pun">{t}</span>;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:ital,wght@0,300;0,400;0,500;0,700;1,300;1,400&family=Inter:wght@300;400;500;600&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        :root {
          --bg:        #1e1e1e;
          --sidebar:   #252526;
          --tabs:      #2d2d2d;
          --tab-act:   #1e1e1e;
          --border:    #3e3e42;
          --text:      #d4d4d4;
          --muted:     #6a9955;
          --dim:       #858585;
          --line-num:  #858585;
          --c-kw:      #569cd6;
          --c-str:     #ce9178;
          --c-num:     #b5cea8;
          --c-fn:      #dcdcaa;
          --c-prop:    #9cdcfe;
          --c-cmt:     #6a9955;
          --c-pun:     #d4d4d4;
          --accent:    #007acc;
          --red:       #f44747;
        }

        body {
          background: var(--bg);
          color: var(--text);
          font-family: 'JetBrains Mono', monospace;
          font-size: 13px;
          line-height: 1.6;
          overflow-x: hidden;
          height: 100vh;
        }

        .window {
          display: flex;
          flex-direction: column;
          height: 100vh;
          min-height: 100vh;
        }

        .titlebar {
          height: 35px;
          background: #3c3c3c;
          display: flex;
          align-items: center;
          padding: 0 16px;
          gap: 8px;
          border-bottom: 1px solid var(--border);
          flex-shrink: 0;
        }

        .tl { width: 12px; height: 12px; border-radius: 50%; }
        .tl-r { background: #ff5f57; }
        .tl-y { background: #ffbd2e; }
        .tl-g { background: #28c840; }

        .titlebar-text {
          flex: 1;
          text-align: center;
          font-family: 'Inter', sans-serif;
          font-size: 0.72rem;
          color: var(--dim);
        }

        .ide {
          display: flex;
          flex: 1;
          overflow: hidden;
        }

        .activity-bar {
          width: 48px;
          background: #333333;
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 8px 0;
          gap: 12px;
          border-right: 1px solid var(--border);
          flex-shrink: 0;
        }

        .act-icon {
          width: 28px;
          height: 28px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--dim);
          border-radius: 4px;
          cursor: pointer;
          transition: color 0.15s;
        }
        .act-icon:hover { color: var(--text); }
        .act-icon.active { color: var(--text); border-left: 2px solid var(--accent); }

        .explorer {
          width: 220px;
          background: var(--sidebar);
          border-right: 1px solid var(--border);
          overflow-y: auto;
          flex-shrink: 0;
        }

        .explorer-title {
          font-family: 'Inter', sans-serif;
          font-size: 0.65rem;
          font-weight: 600;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--dim);
          padding: 12px 16px 8px;
        }

        .folder-row {
          display: flex;
          align-items: center;
          gap: 4px;
          padding: 3px 8px 3px 12px;
          cursor: pointer;
          color: var(--text);
          font-family: 'Inter', sans-serif;
          font-size: 0.8rem;
          transition: background 0.1s;
        }
        .folder-row:hover { background: rgba(255,255,255,0.05); }

        .file-row {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 3px 8px 3px 36px;
          cursor: pointer;
          font-family: 'Inter', sans-serif;
          font-size: 0.8rem;
          color: var(--dim);
          transition: background 0.1s, color 0.1s;
        }
        .file-row:hover { background: rgba(255,255,255,0.05); color: var(--text); }
        .file-row.active { background: rgba(255,255,255,0.08); color: var(--text); }

        .ic-md   { color: #519aba; }
        .ic-json { color: #e5c07b; }
        .ic-ts   { color: #3178c6; }
        .ic-js   { color: #e5c07b; }
        .ic-yml  { color: #e06c75; }

        .editor-area {
          flex: 1;
          display: flex;
          flex-direction: column;
          overflow: hidden;
        }

        .tabs {
          height: 35px;
          background: var(--tabs);
          display: flex;
          overflow-x: auto;
          border-bottom: 1px solid var(--border);
          flex-shrink: 0;
        }
        .tabs::-webkit-scrollbar { height: 2px; }
        .tabs::-webkit-scrollbar-thumb { background: var(--border); }

        .tab {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 0 14px;
          min-width: fit-content;
          cursor: pointer;
          border-right: 1px solid var(--border);
          font-family: 'Inter', sans-serif;
          font-size: 0.78rem;
          color: var(--dim);
          background: var(--tabs);
          transition: background 0.15s, color 0.15s;
          position: relative;
        }
        .tab.active {
          background: var(--tab-act);
          color: var(--text);
          border-top: 1px solid var(--accent);
        }

        .tab-close {
          width: 16px;
          height: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 3px;
          font-size: 14px;
          line-height: 1;
          color: var(--dim);
          background: none;
          border: none;
          cursor: pointer;
        }
        .tab-close:hover { background: rgba(255,255,255,0.1); color: var(--text); }

        .breadcrumb {
          padding: 4px 16px;
          font-family: 'Inter', sans-serif;
          font-size: 0.72rem;
          color: var(--dim);
          border-bottom: 1px solid var(--border);
          background: var(--bg);
          flex-shrink: 0;
        }

        .code-view {
          flex: 1;
          overflow-y: auto;
          display: flex;
        }

        .line-nums {
          padding: 16px 0;
          min-width: 44px;
          text-align: right;
          padding-right: 16px;
          color: var(--line-num);
          font-size: 12px;
          user-select: none;
          border-right: 1px solid var(--border);
          display: flex;
          flex-direction: column;
          gap: 0;
          flex-shrink: 0;
        }
        .line-nums span { display: block; line-height: 1.6; }

        .code-content {
          flex: 1;
          padding: 16px 24px;
          overflow-x: auto;
        }

        .code-line { display: block; white-space: pre-wrap; line-height: 1.6; }
        .code-block { display: block; margin-bottom: 0; }

        .c-kw   { color: var(--c-kw); }
        .c-str  { color: var(--c-str); }
        .c-num  { color: var(--c-num); }
        .c-fn   { color: var(--c-fn); }
        .c-prop { color: var(--c-prop); }
        .c-cmt  { color: var(--c-cmt); }
        .c-pun  { color: var(--c-pun); }

        .cursor {
          display: inline-block;
          width: 2px;
          height: 14px;
          background: var(--text);
          margin-left: 1px;
          vertical-align: middle;
        }

        .statusbar {
          height: 22px;
          background: var(--accent);
          display: flex;
          align-items: center;
          padding: 0 12px;
          gap: 16px;
          flex-shrink: 0;
        }

        .status-item {
          font-family: 'Inter', sans-serif;
          font-size: 0.65rem;
          color: rgba(255,255,255,0.9);
          display: flex;
          align-items: center;
          gap: 4px;
        }

        .status-link {
          color: rgba(255,255,255,0.9);
          text-decoration: none;
          font-family: 'Inter', sans-serif;
          font-size: 0.65rem;
          display: flex;
          align-items: center;
          gap: 3px;
          transition: color 0.15s;
        }
        .status-link:hover { color: #fff; }

        /* ── MOBILE ONLY — nothing above changes ── */

        .mob-chips { display: none; }

        .mob-chip {
          display: flex;
          align-items: center;
          gap: 5px;
          padding: 5px 12px;
          border-radius: 20px;
          border: 1px solid var(--border);
          background: none;
          color: var(--dim);
          font-family: 'Inter', sans-serif;
          font-size: 0.7rem;
          white-space: nowrap;
          cursor: pointer;
          flex-shrink: 0;
          transition: all 0.15s;
        }
        .mob-chip.active {
          background: var(--accent);
          border-color: var(--accent);
          color: #fff;
        }
        .mob-chip.active .ic-md,
        .mob-chip.active .ic-json,
        .mob-chip.active .ic-ts,
        .mob-chip.active .ic-js,
        .mob-chip.active .ic-yml { color: #fff; }

        @media (max-width: 768px) {
          .activity-bar { display: none; }
          .explorer { width: 160px; }
          .titlebar-text { font-size: 0.6rem; }
        }

        @media (max-width: 540px) {
          .activity-bar { display: none; }
          .explorer     { display: none; }
          .tabs         { display: none; }
          .breadcrumb   { display: none; }

          .mob-chips {
            display: flex;
            overflow-x: auto;
            gap: 7px;
            padding: 8px 12px;
            background: var(--sidebar);
            border-bottom: 1px solid var(--border);
            flex-shrink: 0;
            scrollbar-width: none;
          }
          .mob-chips::-webkit-scrollbar { display: none; }

          body { font-size: 12px; }
          .code-content { padding: 10px 12px; }
          .line-nums { min-width: 30px; padding-right: 8px; font-size: 11px; }
          .status-label { display: none; }
        }

        @media (max-width: 380px) {
          .code-content { padding: 8px 10px; font-size: 11px; }
          .line-nums { min-width: 24px; padding-right: 5px; font-size: 10px; }
        }
      `}</style>

      <div className="window">

        {/* Title bar */}
        <div className="titlebar">
          <div className="tl tl-r" />
          <div className="tl tl-y" />
          <div className="tl tl-g" />
          <span className="titlebar-text">
            {personalInfo?.fullName ?? "Portfolio"} — Visual Studio Code
          </span>
        </div>

        <div className="ide">

          {/* Activity bar */}
          <div className="activity-bar">
            <div className="act-icon active"><FolderOpen size={20} /></div>
            <div className="act-icon"><FileCode size={20} /></div>
          </div>

          {/* File explorer */}
          <div className="explorer">
            <div className="explorer-title">Explorer</div>

            <div className="folder-row" onClick={() => toggleFolder("portfolio")}>
              {openFolders.portfolio ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
              <FolderOpen size={14} style={{ color: "#e5c07b" }} />
              portfolio
            </div>

            {openFolders.portfolio && files.map(f => (
              <div
                key={f.name}
                className={`file-row ${activeFile === f.name ? "active" : ""}`}
                onClick={() => openFile(f.name)}
              >
                <FileCode size={13} className={
                  f.name.endsWith(".json") ? "ic-json" :
                  f.name.endsWith(".ts")   ? "ic-ts" :
                  f.name.endsWith(".js")   ? "ic-js" :
                  f.name.endsWith(".yml")  ? "ic-yml" : "ic-md"
                } />
                {f.label}
              </div>
            ))}
          </div>

          {/* Editor */}
          <div className="editor-area">

            {/* Tabs */}
            <div className="tabs">
              {openTabs.map(tab => (
                <div
                  key={tab}
                  className={`tab ${activeFile === tab ? "active" : ""}`}
                  onClick={() => openFile(tab)}
                >
                  <FileCode size={12} />
                  {tab}
                  <button className="tab-close" onClick={(e) => closeTab(tab, e)}>×</button>
                </div>
              ))}
            </div>

            {/* Mobile chip nav — only visible under 540px */}
            <div className="mob-chips">
              {files.map(f => (
                <button
                  key={f.name}
                  className={`mob-chip ${activeFile === f.name ? "active" : ""}`}
                  onClick={() => openFile(f.name)}
                >
                  <FileCode size={11} className={
                    f.name.endsWith(".json") ? "ic-json" :
                    f.name.endsWith(".ts")   ? "ic-ts" :
                    f.name.endsWith(".js")   ? "ic-js" :
                    f.name.endsWith(".yml")  ? "ic-yml" : "ic-md"
                  } />
                  {f.label}
                </button>
              ))}
            </div>

            {/* Breadcrumb */}
            <div className="breadcrumb">
              portfolio &gt; {activeFile}
            </div>

            {/* Code content */}
            <div className="code-view">

              {/* about.md */}
              {activeFile === "about.md" && (
                <>
                  <Lines count={12} />
                  <div className="code-content">
                    <span className="code-line">{cmt(`# ${personalInfo?.fullName ?? "Your Name"}`)}</span>
                    <span className="code-line">{cmt(`## ${personalInfo?.title ?? "Professional Title"}`)}</span>
                    <span className="code-line"> </span>
                    <span className="code-line">{cmt("---")}</span>
                    <span className="code-line"> </span>
                    <span className="code-line">
                      {typedText}
                      {cursorVisible && <span className="cursor" />}
                    </span>
                    <span className="code-line"> </span>
                    <span className="code-line">{cmt("---")}</span>
                    <span className="code-line"> </span>
                    {personalInfo?.email    && <span className="code-line">{cmt("📧")} {personalInfo.email}</span>}
                    {personalInfo?.location && <span className="code-line">{cmt("📍")} {personalInfo.location}</span>}
                    {personalInfo?.phone    && <span className="code-line">{cmt("📞")} {personalInfo.phone}</span>}
                  </div>
                </>
              )}

              {/* experience.json */}
              {activeFile === "experience.json" && (
                <>
                  <Lines count={(experience?.length ?? 0) * 10 + 2} />
                  <div className="code-content">
                    <span className="code-line">{pun("[")}</span>
                    {experience?.map((exp, i) => (
                      <span key={i} className="code-block">
                        <span className="code-line">{"  "}{pun("{")}</span>
                        <span className="code-line">{"    "}{prop("company")}{pun(": ")}{str(exp.company ?? "")}{pun(",")}</span>
                        <span className="code-line">{"    "}{prop("position")}{pun(": ")}{str(exp.position ?? "")}{pun(",")}</span>
                        <span className="code-line">{"    "}{prop("location")}{pun(": ")}{str(exp.location ?? "")}{pun(",")}</span>
                        <span className="code-line">{"    "}{prop("period")}{pun(": ")}{str(`${exp.startDate?.slice(0,4) ?? ""} — ${exp.current ? "Present" : exp.endDate?.slice(0,4) ?? ""}`)}{pun(",")}</span>
                        <span className="code-line">{"    "}{prop("description")}{pun(": ")}{str((exp.description ?? "").slice(0,80) + "…")}</span>
                        {exp.technologies?.length > 0 && (
                          <>
                            <span className="code-line">{"    "}{prop("stack")}{pun(": [")} </span>
                            <span className="code-line">{"      "}{exp.technologies.map((t,j) => <span key={j}><span className="c-str">{`"${t}"`}</span>{j < exp.technologies.length-1 ? ", " : ""}</span>)}</span>
                            <span className="code-line">{"    "}{pun("]")}</span>
                          </>
                        )}
                        <span className="code-line">{"  "}{pun("}")}{ i < experience.length - 1 ? pun(",") : ""}</span>
                      </span>
                    ))}
                    <span className="code-line">{pun("]")}</span>
                  </div>
                </>
              )}

              {/* skills.ts */}
              {activeFile === "skills.ts" && (
                <>
                  <Lines count={(skills?.technical?.length ?? 0) * 4 + 10} />
                  <div className="code-content">
                    <span className="code-line">{kw("interface")} {fn("Skills")} {pun("{")}</span>
                    <span className="code-line">{"  "}{prop("technical")}{pun(": Record<string, string[]>;")}</span>
                    <span className="code-line">{"  "}{prop("soft")}{pun(": string[];")}</span>
                    <span className="code-line">{pun("}")}</span>
                    <span className="code-line"> </span>
                    <span className="code-line">{kw("const")} {fn("skills")}{pun(": Skills = {")} </span>
                    <span className="code-line">{"  "}{prop("technical")}{pun(": {")}</span>
                    {skills?.technical?.map((cat, i) => (
                      <span key={i} className="code-block">
                        <span className="code-line">{"    "}{str(cat.category)}{pun(": [")}
                          {cat.items?.map((item, j) => (
                            <span key={j}><span className="c-str">{`"${item}"`}</span>{j < cat.items.length-1 ? ", " : ""}</span>
                          ))}
                        {pun("],")}
                        </span>
                      </span>
                    ))}
                    <span className="code-line">{"  "}{pun("},")} </span>
                    {skills?.soft?.length > 0 && (
                      <>
                        <span className="code-line">{"  "}{prop("soft")}{pun(": [")} </span>
                        <span className="code-line">{"    "}{skills.soft.map((s,i) => <span key={i}><span className="c-str">{`"${s}"`}</span>{i < skills.soft.length-1 ? ", " : ""}</span>)}</span>
                        <span className="code-line">{"  "}{pun("]")}</span>
                      </>
                    )}
                    <span className="code-line">{pun("}")}</span>
                  </div>
                </>
              )}

              {/* projects.js */}
              {activeFile === "projects.js" && (
                <>
                  <Lines count={(projects?.length ?? 0) * 8 + 2} />
                  <div className="code-content">
                    {projects?.map((proj, i) => (
                      <span key={i} className="code-block">
                        <span className="code-line">{cmt(`// ${proj.name}`)}</span>
                        <span className="code-line">{kw("const")} {fn(`project_${i+1}`)} {pun("= {")} </span>
                        <span className="code-line">{"  "}{prop("name")}{pun(": ")}{str(proj.name ?? "")}{pun(",")}</span>
                        <span className="code-line">{"  "}{prop("description")}{pun(": ")}{str((proj.description ?? "").slice(0,90) + "…")}{pun(",")}</span>
                        {proj.url && <span className="code-line">{"  "}{prop("url")}{pun(": ")}{str(proj.url)}{pun(",")}</span>}
                        {proj.technologies?.length > 0 && (
                          <span className="code-line">{"  "}{prop("stack")}{pun(": [")}
                            {proj.technologies.map((t,j) => <span key={j}><span className="c-str">{`"${t}"`}</span>{j < proj.technologies.length-1 ? ", " : ""}</span>)}
                          {pun("];")}</span>
                        )}
                        <span className="code-line">{pun("}")}</span>
                        <span className="code-line"> </span>
                      </span>
                    ))}
                  </div>
                </>
              )}

              {/* education.md */}
              {activeFile === "education.md" && (
                <>
                  <Lines count={(education?.length ?? 0) * 6 + 2} />
                  <div className="code-content">
                    <span className="code-line">{cmt("# Education")}</span>
                    <span className="code-line"> </span>
                    {education?.map((edu, i) => (
                      <span key={i} className="code-block">
                        <span className="code-line">{cmt(`## ${edu.degree}${edu.field ? ` in ${edu.field}` : ""}`)}</span>
                        <span className="code-line">{cmt(`**${edu.institution}**`)}</span>
                        <span className="code-line">{cmt(`_${edu.startDate?.slice(0,4) ?? ""} — ${edu.endDate?.slice(0,4) ?? ""}_`)}</span>
                        {edu.gpa && <span className="code-line">{cmt(`GPA: ${edu.gpa}`)}</span>}
                        {edu.achievements?.map((a, j) => (
                          <span key={j} className="code-line">{cmt(`- ${a}`)}</span>
                        ))}
                        <span className="code-line"> </span>
                      </span>
                    ))}
                  </div>
                </>
              )}

              {/* certifications.yml */}
              {activeFile === "certifications.yml" && (
                <>
                  <Lines count={(certifications?.length ?? 0) * 5 + (awards?.length ?? 0) * 5 + 4} />
                  <div className="code-content">
                    {certifications?.length > 0 && (
                      <>
                        <span className="code-line">{prop("certifications")}{pun(":")}</span>
                        {certifications.map((cert, i) => (
                          <span key={i} className="code-block">
                            <span className="code-line">{"  "}{pun("- ")}{prop("name")}{pun(": ")}{str(cert.name ?? "")}</span>
                            {cert.issuer && <span className="code-line">{"    "}{prop("issuer")}{pun(": ")}{str(cert.issuer)}</span>}
                            {cert.date  && <span className="code-line">{"    "}{prop("date")}{pun(":  ")}{num(cert.date)}</span>}
                          </span>
                        ))}
                      </>
                    )}
                    <span className="code-line"> </span>
                    {awards?.length > 0 && (
                      <>
                        <span className="code-line">{prop("awards")}{pun(":")}</span>
                        {awards.map((award, i) => (
                          <span key={i} className="code-block">
                            <span className="code-line">{"  "}{pun("- ")}{prop("title")}{pun(":  ")}{str(award.title ?? "")}</span>
                            {award.issuer      && <span className="code-line">{"    "}{prop("issuer")}{pun(": ")}{str(award.issuer)}</span>}
                            {award.description && <span className="code-line">{"    "}{prop("desc")}{pun(":   ")}{str((award.description ?? "").slice(0,60) + "…")}</span>}
                          </span>
                        ))}
                      </>
                    )}
                  </div>
                </>
              )}

            </div>
          </div>
        </div>

        {/* Status bar */}
        <div className="statusbar">
          <span className="status-item">⎇ main</span>
          <span className="status-item">✓ 0 errors</span>
          <span className="status-item" style={{ marginLeft: "auto" }}>
            {personalInfo?.email && <a href={`mailto:${personalInfo.email}`} className="status-link"><Mail size={11} /><span className="status-label"> {personalInfo.email}</span></a>}
          </span>
          {personalInfo?.linkedin  && <a href={personalInfo.linkedin}  className="status-link" target="_blank" rel="noreferrer"><Linkedin size={11} /></a>}
          {personalInfo?.github    && <a href={personalInfo.github}    className="status-link" target="_blank" rel="noreferrer"><Github size={11} /></a>}
          {personalInfo?.portfolio && <a href={personalInfo.portfolio} className="status-link" target="_blank" rel="noreferrer"><Globe size={11} /></a>}
          {personalInfo?.location  && <span className="status-item"><MapPin size={11} /><span className="status-label"> {personalInfo.location}</span></span>}
        </div>

      </div>
    </>
  );
}