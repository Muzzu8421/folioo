export default function QuickActionCard({ icon, title, description }) {
  return (
    <button className="flex items-start gap-3 p-4 border border-white/5 rounded-2xl hover:border-[#c084fc]/50 hover:bg-white/5 transition-all text-left cursor-pointer">
      <div className="w-10 h-10 rounded-full bg-[#c084fc]/10 flex items-center justify-center text-[#c084fc] flex-shrink-0">
        {icon}
      </div>
      <div>
        <p className="font-medium text-gray-200 text-sm">{title}</p>
        <p className="text-gray-500 text-xs mt-0.5">{description}</p>
      </div>
    </button>
  );
}