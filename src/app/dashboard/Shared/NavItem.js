export default function NavItem({ icon, label, active = false, badge, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl transition-all ${
        active
          ? "bg-gradient-to-r from-[#4f46e5] via-[#7c3aed] to-[#fb923c] text-white font-semibold"
          : "text-gray-700 hover:bg-gray-100"
      }`}
    >
      {icon}
      <span className="flex-1 text-left">{label}</span>
      {badge && (
        <span className="px-2 py-0.5 bg-white text-[#4f46e5] rounded-full text-xs font-semibold">
          {badge}
        </span>
      )}
    </button>
  );
}