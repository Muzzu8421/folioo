export default function ActivityItem({ icon, text, time }) {
  return (
    <div className="flex items-start gap-3">
      <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center flex-shrink-0">
        {icon}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-gray-900 text-sm">{text}</p>
        <p className="text-gray-500 text-xs mt-0.5">{time}</p>
      </div>
    </div>
  );
}