"use client";
import { useState, useRef, useEffect } from "react";
import ResumeList from "./ResumeList";
import { Upload, FileText, Sparkles, Loader2 } from "lucide-react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function ResumeManager() {
  const { data: session } = useSession();
  const [resumes, setResumes] = useState([]);

  useEffect(() => {
    fetch("/api/get-resumes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: session.user.email }),
    })
      .then((r) => r.json())
      .then((data) => {
        if (!data.resumes || data.resumes.length === 0) return;
        setResumes(data.resumes);
      })
      .catch((err) => console.error("Error fetching resumes:", err));
  }, []);

  return (
    <div className="space-y-6">
      {resumes.length === 0
        ? <EmptyState />
        : <ResumeList resumes={resumes} setResumes={setResumes} />
      }
    </div>
  );
}

function EmptyState() {
  const [uploadedFile, setUploadedFile] = useState(null);
  const [isDragging, setIsDragging]     = useState(false);
  const [uploading, setUploading]       = useState(false);
  const fileInputRef = useRef(null);
  const { data: session } = useSession();
  const router = useRouter();

  const handleDragOver  = (e) => { e.preventDefault(); setIsDragging(true); };
  const handleDragLeave = (e) => { e.preventDefault(); setIsDragging(false); };
  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files.length > 0) handleFileSelect(e.dataTransfer.files[0]);
  };

  const handleFileSelect = (file) => {
    const validTypes = [
      "application/pdf",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "application/msword",
    ];
    if (!validTypes.includes(file.type)) {
      alert("Please upload a PDF or DOCX file");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      alert("File size must be less than 5MB");
      return;
    }
    setUploadedFile(file);
  };

  const handleFileInputChange = (e) => {
    if (e.target.files.length > 0) handleFileSelect(e.target.files[0]);
  };

  const handleExtractClick = async () => {
    if (!uploadedFile) { alert("Please upload a resume first"); return; }

    const formData = new FormData();
    formData.append("resume",   uploadedFile);
    formData.append("email",    session?.user?.email    ?? "unknown");
    formData.append("username", session?.user?.name     ?? "unknown");

    setUploading(true);
    try {
      const res  = await fetch("/api/extract", { method: "POST", body: formData });
      const data = await res.json();
      if (data.success === false) {
        alert(data.error || "Failed to extract resume");
        return;
      }
      setUploadedFile(null);
      router.push("/dashboard/review?portfolioId=" + data.id);
    } catch (err) {
      console.error("Error extracting resume:", err);
    } finally {
      setUploading(false);
    }
  };

  return (
    <>
      {/* ── Same overlay loader as ResumeList ── */}
      {uploading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm px-4">
          <div className="flex flex-col items-center gap-4 bg-[#111111] rounded-3xl shadow-[0_0_30px_rgba(192,132,252,0.15)] px-8 py-8 border border-white/10 w-full max-w-xs">
            <div className="w-14 h-14 rounded-2xl bg-[#c084fc]/20 flex items-center justify-center">
              <Loader2 className="w-7 h-7 text-[#c084fc] animate-spin" />
            </div>
            <div className="text-center">
              <p className="font-medium text-white text-base">Analysing your resume…</p>
              <p className="text-gray-400 text-sm mt-1">This may take a few seconds</p>
            </div>
            <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden mt-2">
              <div className="h-full bg-[#c084fc] rounded-full animate-[progress_2s_ease-in-out_infinite]" />
            </div>
          </div>
        </div>
      )}

      <div className="max-w-2xl mx-auto px-0 sm:px-4">

        {/* Header */}
        <div className="text-center mb-6 sm:mb-8">
          <h2 className="text-2xl sm:text-3xl font-medium text-white mb-2">
            Resume Manager
          </h2>
          <p className="text-gray-400 text-sm sm:text-base">
            Upload your resume to automatically populate your portfolio
          </p>
        </div>

        {/* Upload area */}
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={`relative border-2 border-dashed rounded-3xl p-6 sm:p-12 transition-all bg-[#111111] ${
            isDragging
              ? "border-[#c084fc] bg-[#c084fc]/5 shadow-[0_0_20px_rgba(192,132,252,0.1)]"
              : "border-white/10 hover:border-[#c084fc]/50 hover:bg-white/5"
          }`}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept=".pdf,.doc,.docx"
            onChange={handleFileInputChange}
            className="hidden"
          />

          <div className="text-center">
            {uploadedFile ? (
              /* ── File selected state ── */
              <>
                <div className="w-14 h-14 sm:w-20 sm:h-20 mx-auto mb-4 sm:mb-6 rounded-full bg-emerald-500/10 flex items-center justify-center">
                  <FileText className="w-7 h-7 sm:w-10 sm:h-10 text-emerald-400" />
                </div>

                <h3 className="text-base sm:text-xl font-medium text-white mb-1 truncate max-w-[220px] sm:max-w-sm mx-auto">
                  {uploadedFile.name}
                </h3>
                <p className="text-gray-500 text-sm mb-5 sm:mb-6">
                  {(uploadedFile.size / 1024).toFixed(1)} KB
                </p>

                {/* Stacks vertically on mobile */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3">
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="cursor-pointer w-full sm:w-auto px-5 py-2.5 border border-white/10 text-gray-300 rounded-xl text-sm font-semibold hover:bg-white/5 transition-all"
                  >
                    Change File
                  </button>
                  <button
                    onClick={handleExtractClick}
                    disabled={uploading}
                    className="cursor-pointer w-full sm:w-auto px-5 py-2.5 bg-[#c084fc] text-[#111111] rounded-xl text-sm font-semibold hover:shadow-[0_0_15px_rgba(192,132,252,0.3)] transition-all inline-flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    <Sparkles className="w-4 h-4" />
                    Extract Information
                  </button>
                </div>
              </>
            ) : (
              /* ── Empty / drag state ── */
              <>
                <div className="w-14 h-14 sm:w-20 sm:h-20 mx-auto mb-4 sm:mb-6 rounded-full bg-[#c084fc]/10 flex items-center justify-center">
                  <Upload className="w-7 h-7 sm:w-10 sm:h-10 text-[#c084fc]" />
                </div>

                <h3 className="text-base sm:text-xl font-medium text-white mb-1.5">
                  Drop your resume here
                </h3>
                <p className="text-gray-400 text-sm mb-5 sm:mb-6 hidden sm:block">
                  or click to browse from your computer
                </p>

                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="cursor-pointer px-5 py-2.5 bg-[#c084fc] text-[#111111] rounded-xl text-sm font-semibold hover:shadow-[0_0_15px_rgba(192,132,252,0.3)] transition-all inline-flex items-center gap-2"
                >
                  <Upload className="w-4 h-4" />
                  Choose File
                </button>

                <p className="text-xs text-gray-500 mt-4">
                  PDF and DOCX · Max 5 MB
                </p>
              </>
            )}
          </div>
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