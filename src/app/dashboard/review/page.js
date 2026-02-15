"use client";
import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { ArrowRight, Loader2, Plus, Trash2 } from "lucide-react";

export default function ReviewPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const portfolioId = searchParams.get("portfolioId");
  const [details, setDetails] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!portfolioId) return;
    fetch("/api/get-portfolio", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: portfolioId }),
    })
      .then((r) => r.json())
      .then((data) => {
        if (data.portfolio?.details) setDetails(data.portfolio.details);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [portfolioId]);

  // No API call here — just store in sessionStorage and move to next step
  const handleNext = () => {
    sessionStorage.setItem("portfolioDetails", JSON.stringify(details));
    router.push(`/dashboard/customize?portfolioId=${portfolioId}`);
  };

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-[#4f46e5]" />
      </div>
    );
  }

  if (!details) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <p className="text-gray-500 text-sm">No portfolio found. Upload a resume first.</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6 py-2">

      {/* ── Header ── */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Review Portfolio</h2>
          <p className="text-gray-600 mt-1">Edit the information extracted from your resume</p>
        </div>
        <button
          onClick={handleNext}
          className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-[#4f46e5] via-[#7c3aed] to-[#fb923c] text-white rounded-xl font-semibold hover:shadow-lg transition-all"
        >
          Next — Choose Template <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* ── Personal Info ── */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6 space-y-4">
        <h3 className="font-semibold text-gray-900">Personal Information</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[
            ["Full Name",     "fullName"],
            ["Title",         "title"],
            ["Email",         "email"],
            ["Phone",         "phone"],
            ["Location",      "location"],
            ["LinkedIn",      "linkedin"],
            ["GitHub",        "github"],
            ["Portfolio URL", "portfolio"],
          ].map(([label, key]) => (
            <div key={key} className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">{label}</label>
              <input
                type="text"
                value={details.personalInfo?.[key] ?? ""}
                onChange={(e) =>
                  setDetails({ ...details, personalInfo: { ...details.personalInfo, [key]: e.target.value } })
                }
                className="px-3 py-2 rounded-xl border border-gray-200 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#4f46e5] transition-all"
              />
            </div>
          ))}
        </div>
      </div>

      {/* ── Summary ── */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6 space-y-3">
        <h3 className="font-semibold text-gray-900">Professional Summary</h3>
        <textarea
          rows={4}
          value={details.summary ?? ""}
          onChange={(e) => setDetails({ ...details, summary: e.target.value })}
          className="w-full px-3 py-2 rounded-xl border border-gray-200 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#4f46e5] resize-y transition-all"
        />
      </div>

      {/* ── Experience ── */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6 space-y-4">
        <h3 className="font-semibold text-gray-900">Experience</h3>

        {details.experience?.map((exp, i) => (
          <div key={i} className="relative p-4 rounded-2xl border border-gray-200 bg-gray-50 space-y-3">
            <button
              onClick={() => setDetails({ ...details, experience: details.experience.filter((_, j) => j !== i) })}
              className="absolute top-3 right-3 p-1 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
            >
              <Trash2 className="w-4 h-4" />
            </button>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pr-8">
              {[
                ["Company",    "company"],
                ["Position",   "position"],
                ["Location",   "location"],
                ["Start Date", "startDate"],
                ["End Date",   "endDate"],
              ].map(([label, key]) => (
                <div key={key} className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">{label}</label>
                  <input
                    type="text"
                    value={exp[key] ?? ""}
                    onChange={(e) => {
                      const updated = [...details.experience];
                      updated[i] = { ...updated[i], [key]: e.target.value };
                      setDetails({ ...details, experience: updated });
                    }}
                    className="px-3 py-2 rounded-xl border border-gray-200 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#4f46e5] transition-all"
                  />
                </div>
              ))}
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Description</label>
              <textarea
                rows={3}
                value={exp.description ?? ""}
                onChange={(e) => {
                  const updated = [...details.experience];
                  updated[i] = { ...updated[i], description: e.target.value };
                  setDetails({ ...details, experience: updated });
                }}
                className="w-full px-3 py-2 rounded-xl border border-gray-200 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#4f46e5] resize-y transition-all"
              />
            </div>
          </div>
        ))}

        <button
          onClick={() =>
            setDetails({ ...details, experience: [...(details.experience ?? []), { company: "", position: "", location: "", startDate: "", endDate: "", current: false, description: "", achievements: [], technologies: [] }] })
          }
          className="flex items-center gap-2 text-sm font-semibold text-[#4f46e5] hover:text-[#7c3aed] transition-colors"
        >
          <Plus className="w-4 h-4" /> Add Experience
        </button>
      </div>

      {/* ── Education ── */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6 space-y-4">
        <h3 className="font-semibold text-gray-900">Education</h3>

        {details.education?.map((edu, i) => (
          <div key={i} className="relative p-4 rounded-2xl border border-gray-200 bg-gray-50 space-y-3">
            <button
              onClick={() => setDetails({ ...details, education: details.education.filter((_, j) => j !== i) })}
              className="absolute top-3 right-3 p-1 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
            >
              <Trash2 className="w-4 h-4" />
            </button>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pr-8">
              {[
                ["Institution", "institution"],
                ["Degree",      "degree"],
                ["Field",       "field"],
                ["Location",    "location"],
                ["Start Date",  "startDate"],
                ["End Date",    "endDate"],
                ["GPA",         "gpa"],
              ].map(([label, key]) => (
                <div key={key} className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">{label}</label>
                  <input
                    type="text"
                    value={edu[key] ?? ""}
                    onChange={(e) => {
                      const updated = [...details.education];
                      updated[i] = { ...updated[i], [key]: e.target.value };
                      setDetails({ ...details, education: updated });
                    }}
                    className="px-3 py-2 rounded-xl border border-gray-200 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#4f46e5] transition-all"
                  />
                </div>
              ))}
            </div>
          </div>
        ))}

        <button
          onClick={() =>
            setDetails({ ...details, education: [...(details.education ?? []), { institution: "", degree: "", field: "", location: "", startDate: "", endDate: "", gpa: "", achievements: [] }] })
          }
          className="flex items-center gap-2 text-sm font-semibold text-[#4f46e5] hover:text-[#7c3aed] transition-colors"
        >
          <Plus className="w-4 h-4" /> Add Education
        </button>
      </div>

      {/* ── Skills ── */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6 space-y-6">
        <h3 className="font-semibold text-gray-900">Skills</h3>

        <div className="space-y-3">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Technical</p>
          {details.skills?.technical?.map((cat, i) => (
            <div key={i} className="relative p-4 rounded-2xl border border-gray-200 bg-gray-50 space-y-3">
              <button
                onClick={() => {
                  const updated = details.skills.technical.filter((_, j) => j !== i);
                  setDetails({ ...details, skills: { ...details.skills, technical: updated } });
                }}
                className="absolute top-3 right-3 p-1 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
              >
                <Trash2 className="w-4 h-4" />
              </button>
              <div className="flex flex-col gap-1.5 pr-8">
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Category</label>
                <input
                  type="text"
                  value={cat.category ?? ""}
                  onChange={(e) => {
                    const updated = [...details.skills.technical];
                    updated[i] = { ...updated[i], category: e.target.value };
                    setDetails({ ...details, skills: { ...details.skills, technical: updated } });
                  }}
                  className="px-3 py-2 rounded-xl border border-gray-200 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#4f46e5] transition-all"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Items (comma separated)</label>
                <input
                  type="text"
                  value={(cat.items ?? []).join(", ")}
                  onChange={(e) => {
                    const updated = [...details.skills.technical];
                    updated[i] = { ...updated[i], items: e.target.value.split(",").map((s) => s.trim()).filter(Boolean) };
                    setDetails({ ...details, skills: { ...details.skills, technical: updated } });
                  }}
                  className="px-3 py-2 rounded-xl border border-gray-200 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#4f46e5] transition-all"
                />
              </div>
            </div>
          ))}
          <button
            onClick={() => {
              const updated = [...(details.skills?.technical ?? []), { category: "", items: [] }];
              setDetails({ ...details, skills: { ...details.skills, technical: updated } });
            }}
            className="flex items-center gap-2 text-sm font-semibold text-[#4f46e5] hover:text-[#7c3aed] transition-colors"
          >
            <Plus className="w-4 h-4" /> Add Category
          </button>
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Soft Skills (comma separated)</label>
          <input
            type="text"
            value={(details.skills?.soft ?? []).join(", ")}
            onChange={(e) =>
              setDetails({ ...details, skills: { ...details.skills, soft: e.target.value.split(",").map((s) => s.trim()).filter(Boolean) } })
            }
            className="px-3 py-2 rounded-xl border border-gray-200 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#4f46e5] transition-all"
          />
        </div>
      </div>

      {/* ── Certifications ── */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6 space-y-4">
        <h3 className="font-semibold text-gray-900">Certifications</h3>

        {details.certifications?.map((cert, i) => (
          <div key={i} className="relative p-4 rounded-2xl border border-gray-200 bg-gray-50">
            <button
              onClick={() => setDetails({ ...details, certifications: details.certifications.filter((_, j) => j !== i) })}
              className="absolute top-3 right-3 p-1 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
            >
              <Trash2 className="w-4 h-4" />
            </button>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pr-8">
              {[
                ["Name",          "name"],
                ["Issuer",        "issuer"],
                ["Date",          "date"],
                ["Credential ID", "credentialId"],
                ["URL",           "url"],
              ].map(([label, key]) => (
                <div key={key} className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">{label}</label>
                  <input
                    type="text"
                    value={cert[key] ?? ""}
                    onChange={(e) => {
                      const updated = [...details.certifications];
                      updated[i] = { ...updated[i], [key]: e.target.value };
                      setDetails({ ...details, certifications: updated });
                    }}
                    className="px-3 py-2 rounded-xl border border-gray-200 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#4f46e5] transition-all"
                  />
                </div>
              ))}
            </div>
          </div>
        ))}

        <button
          onClick={() =>
            setDetails({ ...details, certifications: [...(details.certifications ?? []), { name: "", issuer: "", date: "", credentialId: "", url: "" }] })
          }
          className="flex items-center gap-2 text-sm font-semibold text-[#4f46e5] hover:text-[#7c3aed] transition-colors"
        >
          <Plus className="w-4 h-4" /> Add Certification
        </button>
      </div>

      {/* ── Awards ── */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6 space-y-4">
        <h3 className="font-semibold text-gray-900">Awards</h3>

        {details.awards?.map((award, i) => (
          <div key={i} className="relative p-4 rounded-2xl border border-gray-200 bg-gray-50 space-y-3">
            <button
              onClick={() => setDetails({ ...details, awards: details.awards.filter((_, j) => j !== i) })}
              className="absolute top-3 right-3 p-1 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
            >
              <Trash2 className="w-4 h-4" />
            </button>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pr-8">
              {[["Title", "title"], ["Issuer", "issuer"], ["Date", "date"]].map(([label, key]) => (
                <div key={key} className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">{label}</label>
                  <input
                    type="text"
                    value={award[key] ?? ""}
                    onChange={(e) => {
                      const updated = [...details.awards];
                      updated[i] = { ...updated[i], [key]: e.target.value };
                      setDetails({ ...details, awards: updated });
                    }}
                    className="px-3 py-2 rounded-xl border border-gray-200 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#4f46e5] transition-all"
                  />
                </div>
              ))}
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Description</label>
              <textarea
                rows={3}
                value={award.description ?? ""}
                onChange={(e) => {
                  const updated = [...details.awards];
                  updated[i] = { ...updated[i], description: e.target.value };
                  setDetails({ ...details, awards: updated });
                }}
                className="w-full px-3 py-2 rounded-xl border border-gray-200 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#4f46e5] resize-y transition-all"
              />
            </div>
          </div>
        ))}

        <button
          onClick={() =>
            setDetails({ ...details, awards: [...(details.awards ?? []), { title: "", issuer: "", date: "", description: "" }] })
          }
          className="flex items-center gap-2 text-sm font-semibold text-[#4f46e5] hover:text-[#7c3aed] transition-colors"
        >
          <Plus className="w-4 h-4" /> Add Award
        </button>
      </div>

      {/* ── Bottom Next ── */}
      <div className="flex justify-end pb-8">
        <button
          onClick={handleNext}
          className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#4f46e5] via-[#7c3aed] to-[#fb923c] text-white rounded-xl font-semibold hover:shadow-lg transition-all"
        >
          Next — Choose Template <ArrowRight className="w-4 h-4" />
        </button>
      </div>

    </div>
  );
}