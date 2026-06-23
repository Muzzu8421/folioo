import { TrendingUp, TrendingDown } from "lucide-react";

export default function StatCard({ icon, value, label, trend, positive }) {
  return (
    <div className="bg-[#111111] p-6 rounded-3xl border border-white/5">
      <div className="flex items-start justify-between mb-4">
        <div className="w-12 h-12 rounded-full bg-[#c084fc]/10 flex items-center justify-center text-[#c084fc]">
          {icon}
        </div>
        <div
          className={`flex items-center gap-1 text-sm font-semibold ${
            positive ? "text-[#c084fc]" : "text-gray-500"
          }`}
        >
          {positive ? (
            <TrendingUp className="w-4 h-4" />
          ) : (
            <TrendingDown className="w-4 h-4" />
          )}
          {Math.abs(trend)}%
        </div>
      </div>
      <p className="text-3xl font-bold text-white mb-1">{value}</p>
      <p className="text-sm text-gray-500">{label}</p>
    </div>
  );
}