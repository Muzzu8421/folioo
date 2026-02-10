import { Lightbulb } from "lucide-react";

export default function SuggestionsCard() {
  return (
    <div className="bg-gradient-to-br from-[#fb923c]/10 to-[#fb923c]/5 rounded-2xl p-6 border border-[#fb923c]/20">
      <div className="flex items-start gap-3 mb-4">
        <div className="w-10 h-10 rounded-xl bg-[#fb923c] flex items-center justify-center flex-shrink-0">
          <Lightbulb className="w-5 h-5 text-white" />
        </div>
        <div>
          <h3 className="text-lg font-bold text-gray-900 mb-1">
            Tips to Improve Your Portfolio
          </h3>
          <ul className="space-y-2 text-sm text-gray-700">
            <li>
              • Add a professional photo to increase engagement by 40%
            </li>
            <li>• Include 3-5 key projects to showcase your skills</li>
            <li>• Update your contact information</li>
          </ul>
        </div>
      </div>
      <div className="flex gap-2">
        <button className="px-4 py-2 bg-[#fb923c] text-white rounded-lg font-semibold text-sm hover:shadow-lg transition-all">
          Learn more
        </button>
        <button className="px-4 py-2 text-gray-700 hover:bg-white/50 rounded-lg font-semibold text-sm transition-colors">
          Dismiss
        </button>
      </div>
    </div>
  );
}