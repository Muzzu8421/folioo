export default function NavItem({ icon, label, active = false, badge, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center gap-3 px-4 py-3 rounded-full text-sm transition-all cursor-pointer ${
        active
          ? "bg-[#c084fc]/10 text-[#c084fc] font-semibold shadow-[0_0_15px_rgba(192,132,252,0.15)]"
          : "text-gray-400 hover:text-gray-200 hover:bg-white/5 font-medium"
      }`}
    >
      <div className={active ? "text-[#c084fc]" : "text-gray-500"}>{icon}</div>
      <span className="flex-1 text-left">{label}</span>
      {badge && (
        <span className="px-2 py-0.5 bg-[#c084fc] text-[#111111] rounded-full text-xs font-bold">
          {badge}
        </span>
      )}
    </button>
  );
}