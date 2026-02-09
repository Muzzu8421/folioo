export default function Loader() {
  return (
    <div className="flex items-center justify-center">
      <div className="relative">
        {/* Outer spinning ring */}
        <div className="w-12 h-12 border-4 border-gray-200 border-t-[#4f46e5] rounded-full animate-spin"></div>
        
        {/* Inner pulsing dot */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-[#4f46e5] rounded-full animate-pulse"></div>
      </div>
    </div>
  );
}