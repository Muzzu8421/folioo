import { X as XIcon } from "lucide-react";

export default function WelcomeBanner({ userName, show, onClose }) {
  if (!show) return null;

  return (
    <div className="bg-gradient-to-r from-[#4f46e5] via-[#7c3aed] to-[#fb923c] rounded-2xl p-6 sm:p-8 mb-8 text-white relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white rounded-full blur-3xl"></div>
      </div>
      <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2
            className="text-2xl sm:text-3xl font-bold mb-2"
            style={{ fontFamily: "var(--font-poppins)" }}
          >
            Welcome back, {userName}! 
          </h2>
          <p className="text-white/90">
            Your portfolio is looking great. Keep it up!
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <button className="px-4 py-2 bg-white text-[#4f46e5] rounded-lg font-semibold hover:shadow-lg transition-all">
            Update Resume
          </button>
          <button className="px-4 py-2 bg-white/20 backdrop-blur text-white rounded-lg font-semibold hover:bg-white/30 transition-all">
            View Portfolio
          </button>
          <button className="px-4 py-2 bg-white/20 backdrop-blur text-white rounded-lg font-semibold hover:bg-white/30 transition-all">
            Share Link
          </button>
        </div>
      </div>
      <button
        onClick={onClose}
        className="absolute top-4 right-4 p-1 hover:bg-white/20 rounded-lg transition-colors"
      >
        <XIcon className="w-5 h-5" />
      </button>
    </div>
  );
}