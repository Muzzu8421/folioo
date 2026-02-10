"use client";
import { useState, useRef } from "react";
import ResumeList from "./ResumeList";
import { Upload, FileText, Sparkles } from "lucide-react";

export default function ResumeManager() {
  const [resumes, setResumes] = useState([]);

  return (
    <div className="space-y-6">
      {resumes.length === 0 ? <EmptyState /> : <ResumeList resumes={resumes} />}
    </div>
  );
}

function EmptyState() {
  const [uploadedFile, setUploadedFile] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);

    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleFileSelect(files[0]);
    }
  };

  const handleFileSelect = (file) => {
    // Validate file type
    const validTypes = [
      "application/pdf",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "application/msword",
    ];

    if (!validTypes.includes(file.type)) {
      alert("Please upload a PDF or DOCX file");
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert("File size must be less than 5MB");
      return;
    }

    setUploadedFile(file);
  };

  const handleFileInputChange = (e) => {
    const files = e.target.files;
    if (files.length > 0) {
      handleFileSelect(files[0]);
    }
  };

  const handleExtractClick = () => {
    if (!uploadedFile) {
      alert("Please upload a resume first");
      return;
    }
    const formData = new FormData();
    formData.append("resume", uploadedFile);

    fetch("/api/extract", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        
      })
      .catch((error) => {
        console.error("Error extracting resume:", error);
      });
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">
          Resume Manager
        </h2>
        <p className="text-gray-600">
          Upload your resume to automatically populate your portfolio
        </p>
      </div>

      {/* Upload Area */}
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`relative border-2 border-dashed rounded-2xl p-12 transition-all ${
          isDragging
            ? "border-[#4f46e5] bg-[#4f46e5] bg-opacity-5"
            : "border-gray-300 hover:border-gray-400"
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
            <>
              <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-[#10b981] bg-opacity-10 flex items-center justify-center">
                <FileText className="w-10 h-10 text-[#10b981]" />
              </div>

              <h3 className="text-xl font-bold text-gray-900 mb-2">
                {uploadedFile.name}
              </h3>
              <p className="text-gray-600 mb-6">
                {(uploadedFile.size / 1024).toFixed(2)} KB
              </p>

              <div className="flex items-center justify-center gap-3">
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="px-6 py-3 border border-gray-200 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-all"
                >
                  Change File
                </button>
                <button
                  onClick={handleExtractClick}
                  className="px-6 py-3 bg-gradient-to-r from-[#4f46e5] via-[#7c3aed] to-[#fb923c] text-white rounded-xl font-semibold hover:shadow-lg transition-all inline-flex items-center gap-2"
                >
                  <Sparkles className="w-5 h-5" />
                  Extract Information
                </button>
              </div>
            </>
          ) : (
            <>
              <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-r from-[#4f46e5] via-[#7c3aed] to-[#fb923c] flex items-center justify-center">
                <Upload className="w-10 h-10 text-white" />
              </div>

              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Drop your resume here
              </h3>
              <p className="text-gray-600 mb-6">
                or click to browse from your computer
              </p>

              <button
                onClick={() => fileInputRef.current?.click()}
                className="px-6 py-3 bg-gradient-to-r from-[#4f46e5] via-[#7c3aed] to-[#fb923c] text-white rounded-xl font-semibold hover:shadow-lg transition-all inline-flex items-center gap-2"
              >
                <Upload className="w-5 h-5" />
                Choose File
              </button>

              <p className="text-sm text-gray-500 mt-4">
                Supports PDF and DOCX files (Max 5MB)
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
