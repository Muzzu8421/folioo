import { TrendingUp, TrendingDown } from "lucide-react";

export default function StatCard({ icon, value, label, trend, positive }) {
  return (
    <div className="bg-white p-6 rounded-2xl border border-gray-200">
      <div className="flex items-start justify-between mb-4">
        <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-[#4f46e5] via-[#7c3aed] to-[#fb923c] flex items-center justify-center text-white">
          {icon}
        </div>
        <div
          className={`flex items-center gap-1 text-sm font-semibold ${
            positive ? "text-[#10b981]" : "text-[#ef4444]"
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
      <p className="text-3xl font-bold text-gray-900 mb-1">{value}</p>
      <p className="text-sm text-gray-600">{label}</p>
    </div>
  );
}