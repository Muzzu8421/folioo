"use client";
import { useRef, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import {
  FileText,
  Download,
  Trash2,
  Eye,
  Star,
  Upload,
  Loader2,
  MoreHorizontal,
  Zap,
} from "lucide-react";
import { Bounce, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function ResumeList({ resumes, setResumes }) {
  const router = useRouter();
  const { data: session } = useSession();
  const fileRef = useRef(null);
  const [uploading, setUploading] = useState(false);
  const [openMenuId, setOpenMenuId] = useState(null);
  const menuRef = useRef(null);

  // Close menu on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpenMenuId(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Format
  const formatDate = (iso) => {
    if (!iso) return "Unknown date";
    try {
      return new Date(iso).toLocaleDateString("en-US", {
        year: "numeric", month: "short", day: "numeric",
      });
    } catch { return iso; }
  };

  const formatSize = (bytes) => {
    if (!bytes || isNaN(bytes)) return "";
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  // Upload
  const handleUploadClick = () => fileRef.current?.click();

  const handleFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    e.target.value = "";

    const allowed = [
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "application/msword",
      "application/pdf",
    ];
    if (!allowed.includes(file.type) && !file.name.match(/\.(docx|doc|pdf)$/i)) {
      toast.error("Please upload a .docx, .doc, or .pdf file.");
      return;
    }

    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("resume", file);
      formData.append("email", session?.user?.email ?? "");
      formData.append("username", session?.user?.name ?? "");

      const res = await fetch("/api/extract", { method: "POST", body: formData });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message ?? "Upload failed");

      toast.success("Resume uploaded! Redirecting to review…", {
        position: "top-right", autoClose: 3000, theme: "light", transition: Bounce,
      });
      router.push(`/dashboard/review?portfolioId=${data.id}`);
    } catch (err) {
      toast.error(err.message ?? "Something went wrong.", {
        position: "top-right", autoClose: 5000, theme: "light", transition: Bounce,
      });
    } finally {
      setUploading(false);
    }
  };

  // Delete
  const handleDelete = async (resumeId, portfolioId) => {
    const confirmed = confirm("Are you sure you want to delete this resume?");
    if (!confirmed) return;
    const res = await fetch(
      `/api/delete-resume?resumeId=${resumeId}&portfolioId=${portfolioId}`,
      { method: "DELETE" }
    );
    const data = await res.json();
    if (res.ok) {
      toast.success(data.message, {
        position: "top-right", autoClose: 5000, hideProgressBar: false,
        closeOnClick: true, pauseOnHover: true, draggable: true,
        theme: "light", transition: Bounce,
      });
      setResumes((prev) => prev.filter((r) => r.id !== resumeId));
    } else {
      toast.error(data.message ?? "Delete failed.", {
        position: "top-right", autoClose: 5000, theme: "light", transition: Bounce,
      });
    }
  };

  // Download
  const handleDownload = async (resumeId, filename) => {
    try {
      const res = await fetch(`/api/download-resume?resumeId=${resumeId}`);
      if (!res.ok) throw new Error("Download failed.");
      const data = await res.blob();
      const url = window.URL.createObjectURL(data);
      const link = document.createElement("a");
      link.href = url;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
      toast.success("Download started!", {
        position: "top-right", autoClose: 4000, theme: "light", transition: Bounce,
      });
    } catch {
      toast.error("Could not download file.", {
        position: "top-right", autoClose: 4000, theme: "light", transition: Bounce,
      });
    }
  };

  // View
  const handleView = (portfolioId) => {
    if (portfolioId) router.push(`/dashboard/review?portfolioId=${portfolioId}`);
  };

  // Set Active
  const handleSetActive = async (portfolioId) => {
    if (!portfolioId) return;
    const res = await fetch("/api/set-active-portfolio", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ portfolioId }),
    });
    const data = await res.json();
    if (res.ok) {
      toast.success("Portfolio set as active!", {
        position: "top-right", autoClose: 3000, theme: "light", transition: Bounce,
      });
      setResumes((prev) =>
        prev.map((r) => ({ ...r, isActive: r.portfolioid === portfolioId }))
      );
    } else {
      toast.error(data.message ?? "Could not set active.", {
        position: "top-right", autoClose: 4000, theme: "light", transition: Bounce,
      });
    }
  };

  return (
    <>
      {/* Upload overlay loader */}
      {uploading && (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white/80 backdrop-blur-sm px-4">
          <div className="flex flex-col items-center gap-4 bg-white rounded-2xl shadow-xl px-8 py-8 border border-gray-100 w-full max-w-xs">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-r from-[#4f46e5] via-[#7c3aed] to-[#fb923c] flex items-center justify-center">
              <Loader2 className="w-7 h-7 text-white animate-spin" />
            </div>
            <div className="text-center">
              <p className="font-semibold text-gray-900 text-base">Analysing your resume…</p>
              <p className="text-gray-500 text-sm mt-1">This may take a few seconds</p>
            </div>
            <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-[#4f46e5] via-[#7c3aed] to-[#fb923c] rounded-full animate-[progress_2s_ease-in-out_infinite]" />
            </div>
          </div>
        </div>
      )}

      <div className="space-y-4 sm:space-y-6">
        <input
          ref={fileRef}
          type="file"
          accept=".docx,.doc,.pdf"
          className="hidden"
          onChange={handleFileChange}
        />

        {/* ── Header ── */}
        <div className="flex items-center justify-between gap-3">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Resume Manager</h2>
            <p className="text-gray-500 text-sm mt-0.5 hidden sm:block">Manage and organize your resumes</p>
          </div>
          {/* Icon-only on mobile, full button on sm+ */}
          <button
            onClick={handleUploadClick}
            disabled={uploading}
            className="flex items-center gap-2 px-3 py-2 sm:px-4 sm:py-2.5 bg-gradient-to-r from-[#4f46e5] via-[#7c3aed] to-[#fb923c] text-white rounded-lg font-semibold hover:shadow-lg transition-all disabled:opacity-60 disabled:cursor-not-allowed flex-shrink-0"
          >
            <Upload className="w-4 h-4 flex-shrink-0" />
            <span className="hidden sm:inline text-sm">Upload New Resume</span>
          </button>
        </div>

        {/* ── Resume list ── */}
        <div className="grid gap-3 sm:gap-4">
          {resumes.length === 0 && (
            <div className="text-center py-16 text-gray-400">
              <FileText className="w-10 h-10 mx-auto mb-3 opacity-30" />
              <p className="font-medium text-sm">No resumes yet</p>
              <p className="text-xs mt-1">Upload a resume to get started</p>
            </div>
          )}

          {resumes.map((resume) => (
            <div
              key={resume.id}
              className="bg-white rounded-2xl p-3 sm:p-5 border border-gray-200 hover:border-[#4f46e5] transition-all"
            >
              <div className="flex items-center gap-3">

                {/* Icon — smaller on mobile */}
                <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-gradient-to-r from-[#4f46e5] via-[#7c3aed] to-[#fb923c] flex items-center justify-center text-white flex-shrink-0">
                  <FileText className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>

                {/* Info — takes all remaining space, clips overflow */}
                <div className="flex-1 min-w-0">
                  {/* Filename + badge row */}
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <p className="font-semibold text-gray-900 text-sm truncate max-w-[140px] xs:max-w-[180px] sm:max-w-xs">
                      {resume.filename}
                    </p>
                    {resume.isActive && (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-emerald-500 text-white rounded-full text-[10px] sm:text-xs font-semibold flex-shrink-0">
                        <Star className="w-2.5 h-2.5 fill-current" />
                        Active
                      </span>
                    )}
                  </div>
                  {/* Meta */}
                  <p className="text-xs text-gray-400 mt-0.5 truncate">
                    {formatDate(resume.uploadDate)}
                    {resume.size ? ` · ${formatSize(resume.size)}` : ""}
                  </p>
                </div>

                {/* ── Kebab ── */}
                <div
                  className="relative flex-shrink-0"
                  ref={openMenuId === resume.id ? menuRef : null}
                >
                  <button
                    onClick={() => setOpenMenuId(openMenuId === resume.id ? null : resume.id)}
                    className="p-1.5 sm:p-2 rounded-lg text-gray-500 hover:text-gray-800 hover:bg-gray-100 transition-colors"
                  >
                    <MoreHorizontal className="w-4 h-4 sm:w-5 sm:h-5" />
                  </button>

                  {openMenuId === resume.id && (
                    // on mobile anchor to right edge; ensure it never clips off-screen
                    <div className="absolute right-0 top-9 z-30 w-40 sm:w-44 bg-white border border-gray-100 rounded-xl shadow-xl overflow-hidden">
                      <button
                        onClick={() => { handleView(resume.portfolioid ?? resume.id); setOpenMenuId(null); }}
                        className="flex items-center gap-2.5 w-full px-3.5 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                      >
                        <Eye className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" />
                        View / Edit
                      </button>
                      <button
                        onClick={() => { handleDownload(resume.id, resume.filename); setOpenMenuId(null); }}
                        className="flex items-center gap-2.5 w-full px-3.5 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                      >
                        <Download className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" />
                        Download
                      </button>
                      {!resume.isActive && (
                        <button
                          onClick={() => { handleSetActive(resume.portfolioid); setOpenMenuId(null); }}
                          className="flex items-center gap-2.5 w-full px-3.5 py-2.5 text-sm text-[#4f46e5] hover:bg-indigo-50 transition-colors"
                        >
                          <Zap className="w-3.5 h-3.5 flex-shrink-0" />
                          Set as Active
                        </button>
                      )}
                      <div className="h-px bg-gray-100 mx-2" />
                      <button
                        onClick={() => { handleDelete(resume.id, resume.portfolioid); setOpenMenuId(null); }}
                        className="flex items-center gap-2.5 w-full px-3.5 py-2.5 text-sm text-red-500 hover:bg-red-50 transition-colors"
                      >
                        <Trash2 className="w-3.5 h-3.5 flex-shrink-0" />
                        Delete
                      </button>
                    </div>
                  )}
                </div>

              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes progress {
          0%   { transform: translateX(-100%); }
          50%  { transform: translateX(0%); }
          100% { transform: translateX(100%); }
        }
      `}</style>
    </>
  );
}