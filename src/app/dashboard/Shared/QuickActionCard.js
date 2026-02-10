export default function QuickActionCard({ icon, title, description }) {
  return (
    <button className="flex items-start gap-3 p-4 border border-gray-200 rounded-xl hover:border-[#4f46e5] hover:bg-gray-50 transition-all text-left">
      <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-[#4f46e5] via-[#7c3aed] to-[#fb923c] flex items-center justify-center text-white flex-shrink-0">
        {icon}
      </div>
      <div>
        <p className="font-semibold text-gray-900 text-sm">{title}</p>
        <p className="text-gray-600 text-xs mt-0.5">{description}</p>
      </div>
    </button>
  );
}