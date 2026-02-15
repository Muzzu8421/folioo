"use client";
import { useRef, useState } from "react";
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
} from "lucide-react";
import { Bounce, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function ResumeList({ resumes, setResumes }) {
  const router = useRouter();
  const { data: session } = useSession();
  const fileRef = useRef(null);
  const [uploading, setUploading] = useState(false);

  // ── Format helpers ───────────────────────────────────────────────────────

  const formatDate = (iso) => {
    if (!iso) return "Unknown date";
    try {
      return new Date(iso).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
    } catch {
      return iso;
    }
  };

  const formatSize = (bytes) => {
    if (!bytes || isNaN(bytes)) return "";
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  // ── Upload ───────────────────────────────────────────────────────────────

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
    if (
      !allowed.includes(file.type) &&
      !file.name.match(/\.(docx|doc|pdf)$/i)
    ) {
      toast.error("Please upload a .docx, .doc, or .pdf file.");
      return;
    }

    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("resume", file);
      formData.append("email", session?.user?.email ?? "");
      formData.append("username", session?.user?.name ?? "");

      const res = await fetch("/api/extract", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();

      if (!res.ok) throw new Error(data.message ?? "Upload failed");

      toast.success("Resume uploaded! Redirecting to review…", {
        position: "top-right",
        autoClose: 3000,
        theme: "light",
        transition: Bounce,
      });

      router.push(`/dashboard/review?portfolioId=${data.id}`);
    } catch (err) {
      toast.error(err.message ?? "Something went wrong.", {
        position: "top-right",
        autoClose: 5000,
        theme: "light",
        transition: Bounce,
      });
    } finally {
      setUploading(false);
    }
  };

  // ── Delete ───────────────────────────────────────────────────────────────

  const handleDelete = async (resumeId) => {
    const res = await fetch(`/api/delete-resume?resumeId=${resumeId}`, {
      method: "DELETE",
    });
    const data = await res.json();
    if (res.ok) {
      toast.success(data.message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "light",
        transition: Bounce,
      });
      setResumes((prev) => prev.filter((r) => r.id !== resumeId));
    } else {
      toast.error(data.message ?? "Delete failed.", {
        position: "top-right",
        autoClose: 5000,
        theme: "light",
        transition: Bounce,
      });
    }
  };

  // ── Download ─────────────────────────────────────────────────────────────

  const handleDownload = async (resumeId, filename) => {
    try {
      const res = await fetch(`/api/download-resume?resumeId=${resumeId}`);
      if (!res.ok) throw new Error("Download failed");
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = filename ?? "resume";
      a.click();
      URL.revokeObjectURL(url);
    } catch {
      toast.error("Could not download file.", {
        position: "top-right",
        autoClose: 4000,
        theme: "light",
        transition: Bounce,
      });
    }
  };

  // ── View ─────────────────────────────────────────────────────────────────

  const handleView = (portfolioId) => {
    if (portfolioId) router.push(`/dashboard/review?id=${portfolioId}`);
  };

  // ── Render ───────────────────────────────────────────────────────────────

  return (
    <>
      {/* ── Upload overlay loader ── */}
      {uploading && (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white/80 backdrop-blur-sm">
          <div className="flex flex-col items-center gap-4 bg-white rounded-2xl shadow-xl px-10 py-8 border border-gray-100">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-[#4f46e5] via-[#7c3aed] to-[#fb923c] flex items-center justify-center">
              <Loader2 className="w-8 h-8 text-white animate-spin" />
            </div>
            <div className="text-center">
              <p className="font-semibold text-gray-900 text-lg">
                Analysing your resume…
              </p>
              <p className="text-gray-500 text-sm mt-1">
                This may take a few seconds
              </p>
            </div>
            {/* animated progress bar */}
            <div className="w-56 h-1.5 bg-gray-100 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-[#4f46e5] via-[#7c3aed] to-[#fb923c] rounded-full animate-[progress_2s_ease-in-out_infinite]" />
            </div>
          </div>
        </div>
      )}

      <div className="space-y-6">
        {/* Hidden file input */}
        <input
          ref={fileRef}
          type="file"
          accept=".docx,.doc,.pdf"
          className="hidden"
          onChange={handleFileChange}
        />

        {/* ── Header ── */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Resume Manager</h2>
            <p className="text-gray-600 mt-1">
              Manage and organize your resumes
            </p>
          </div>
          <button
            onClick={handleUploadClick}
            disabled={uploading}
            className="flex items-center justify-center gap-2 px-4 py-2.5 bg-gradient-to-r from-[#4f46e5] via-[#7c3aed] to-[#fb923c] text-white rounded-lg font-semibold hover:shadow-lg transition-all disabled:opacity-60 disabled:cursor-not-allowed w-full sm:w-auto"
          >
            <Upload className="w-4 h-4 flex-shrink-0" />
            Upload New Resume
          </button>
        </div>

        {/* ── Resume list ── */}
        <div className="grid gap-4">
          {resumes.length === 0 && (
            <div className="text-center py-16 text-gray-400">
              <FileText className="w-12 h-12 mx-auto mb-3 opacity-30" />
              <p className="font-medium">No resumes yet</p>
              <p className="text-sm mt-1">Upload a resume to get started</p>
            </div>
          )}

          {resumes.map((resume, index) => (
            <div
              key={resume.id ?? index}
              className="bg-white rounded-2xl p-4 sm:p-6 border border-gray-200 hover:border-[#4f46e5] transition-all"
            >
              <div className="flex items-center gap-3 sm:gap-4">
                {/* Icon */}
                <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-r from-[#4f46e5] via-[#7c3aed] to-[#fb923c] flex items-center justify-center text-white flex-shrink-0">
                  <FileText className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>

                {/* Info — grows, truncates long filenames */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="font-semibold text-gray-900 truncate max-w-[180px] sm:max-w-xs md:max-w-sm">
                      {resume.filename}
                    </h3>
                    {index === 0 && (
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 bg-emerald-500 text-white rounded-full text-xs font-semibold flex-shrink-0">
                        <Star className="w-3 h-3 fill-current" />
                        Active
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-500 mt-0.5">
                    {formatDate(resume.uploadDate)}
                    {resume.size ? ` • ${formatSize(resume.size)}` : ""}
                  </p>
                </div>

                {/* Actions — always visible, no overflow */}
                <div className="flex items-center gap-0.5 sm:gap-1 flex-shrink-0">
                  <button
                    onClick={() => handleView(resume.portfolioId ?? resume.id)}
                    title="View / Edit"
                    className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <Eye className="w-4 h-4 sm:w-5 sm:h-5" />
                  </button>
                  <button
                    onClick={() => handleDownload(resume.id, resume.filename)}
                    title="Download"
                    className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <Download className="w-4 h-4 sm:w-5 sm:h-5" />
                  </button>
                  <button
                    onClick={() => handleDelete(resume.id)}
                    title="Delete"
                    className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <Trash2 className="w-4 h-4 sm:w-5 sm:h-5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Keyframe for progress bar — add to globals.css if preferred */}
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
