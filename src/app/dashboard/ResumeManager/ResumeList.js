"use client";
import { FileText, Download, Trash2, Eye, Star } from "lucide-react";
import { Bounce, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function ResumeList({ resumes, setResumes }) {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Resume Manager</h2>
          <p className="text-gray-600 mt-1">Manage and organize your resumes</p>
        </div>
        <button className="px-4 py-2 bg-gradient-to-r from-[#4f46e5] via-[#7c3aed] to-[#fb923c] text-white rounded-lg font-semibold hover:shadow-lg transition-all flex items-center gap-2">
          <FileText className="w-4 h-4" />
          Upload New Resume
        </button>
      </div>

      {/* Resume List */}
      <div className="grid gap-4">
        {resumes.map((resume, index) => (
          <ResumeCard
            key={resume.id || index}
            title={resume.filename}
            lastUpdated={resume.uploadDate}
            fileSize={resume.size}
            isActive={index === 0}
            resumeId={resume.id}
            metadata={resume.metadata}
            onDelete={(id)=>setResumes((prev)=>prev.filter((resume) => resume.id !== id))}
          />
        ))}
      </div>
    </div>
  );
}

function ResumeCard({
  title,
  lastUpdated,
  fileSize,
  isActive,
  resumeId,
  onDelete
}) {
  // Handle resume deletion
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
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
      onDelete(resumeId);
    }
  };

  return (
    <div className="bg-white rounded-2xl p-6 border border-gray-200 hover:border-[#4f46e5] transition-all">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-[#4f46e5] via-[#7c3aed] to-[#fb923c] flex items-center justify-center text-white">
            <FileText className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-semibold text-gray-900">{title}</h3>
              {isActive && (
                <span className="inline-flex items-center px-3 py-1 bg-[#10b981] bg-opacity-10 text-white rounded-full text-sm font-semibold">
                  <Star className="w-3 h-3 mr-1 fill-current" />
                  Active
                </span>
              )}
            </div>
            <p className="text-sm text-gray-500">
              {lastUpdated} • {fileSize}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button className="p-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
            <Eye className="w-5 h-5" />
          </button>
          <button className="p-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
            <Download className="w-5 h-5" />
          </button>
          <button
            onClick={() => handleDelete(resumeId)}
            className="cursor-pointerp-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
          >
            <Trash2 className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
