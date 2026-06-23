import { Lightbulb } from "lucide-react";

export default function SuggestionsCard() {
  return (
    <div className="bg-gradient-to-br from-[#1A2235] to-[#111111] rounded-3xl p-6 border border-[#c084fc]/20 shadow-[0_0_20px_rgba(192,132,252,0.1)]">
      <div className="flex items-start gap-3 mb-6">
        <div className="w-10 h-10 rounded-full bg-[#c084fc]/10 flex items-center justify-center flex-shrink-0">
          <Lightbulb className="w-5 h-5 text-[#c084fc]" />
        </div>
        <div>
          <h3 className="text-lg font-medium text-white mb-2">
            Tips to Improve Your Portfolio
          </h3>
          <ul className="space-y-2 text-sm text-gray-400 leading-relaxed">
            <li>• Add a professional photo to increase engagement by 40%</li>
            <li>• Include 3-5 key projects to showcase your skills</li>
            <li>• Update your contact information</li>
          </ul>
        </div>
      </div>
      <div className="flex gap-3 mt-4">
        <button className="px-5 py-2.5 bg-[#c084fc] text-[#111111] rounded-full font-semibold text-xs hover:bg-cyan-300 transition-colors cursor-pointer">
          Learn more
        </button>
        <button className="px-5 py-2.5 text-gray-400 hover:text-white hover:bg-white/5 rounded-full font-semibold text-xs transition-colors cursor-pointer">
          Dismiss
        </button>
      </div>
    </div>
  );
}