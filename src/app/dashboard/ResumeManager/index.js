import { FileText, Upload, Download, Edit, Trash2, Eye } from "lucide-react";

export default function ResumeManager() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Resume Manager</h2>
          <p className="text-gray-600 mt-1">Manage and organize your resumes</p>
        </div>
        <button className="px-4 py-2 bg-gradient-to-r from-[#4f46e5] via-[#7c3aed] to-[#fb923c] text-white rounded-lg font-semibold hover:shadow-lg transition-all flex items-center gap-2">
          <Upload className="w-4 h-4" />
          Upload Resume
        </button>
      </div>

      {/* Resume List */}
      <div className="grid gap-4">
        <ResumeCard
          title="Software Engineer Resume"
          lastUpdated="2 days ago"
          fileSize="245 KB"
          isActive={true}
        />
        <ResumeCard
          title="Frontend Developer Resume"
          lastUpdated="1 week ago"
          fileSize="198 KB"
          isActive={false}
        />
        <ResumeCard
          title="Full Stack Developer Resume"
          lastUpdated="2 weeks ago"
          fileSize="312 KB"
          isActive={false}
        />
      </div>
    </div>
  );
}

function ResumeCard({ title, lastUpdated, fileSize, isActive }) {
  return (
    <div className="bg-white rounded-2xl p-6 border border-gray-200 hover:border-[#4f46e5] transition-all">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-[#4f46e5] via-[#7c3aed] to-[#fb923c] flex items-center justify-center text-white">
            <FileText className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">{title}</h3>
            <p className="text-sm text-gray-500">
              {lastUpdated} • {fileSize}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {isActive && (
            <span className="inline-flex items-center px-3 py-1 bg-opacity-10 text-[#10b981] border-2 rounded-full text-sm font-semibold">
              ● Active
            </span>
          )}
          <button className="p-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
            <Eye className="w-5 h-5" />
          </button>
          <button className="p-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
            <Download className="w-5 h-5" />
          </button>
          <button className="p-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
            <Edit className="w-5 h-5" />
          </button>
          <button className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors">
            <Trash2 className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}