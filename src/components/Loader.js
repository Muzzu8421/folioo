export default function Loader() {
  return (
    <div className="fixed inset-0 z-[9999] bg-black/50 backdrop-blur-sm flex items-center justify-center">
      <div className="relative h-20 w-20">
        {/* Outer glow with site colors */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-[#4f46e5] via-[#7c3aed] to-[#fb923c] blur-xl opacity-70 animate-pulse" />

        {/* Spinning ring with site gradient */}
        <div className="absolute inset-0 rounded-full border-[3px] border-transparent border-t-[#4f46e5] border-r-[#7c3aed] border-b-[#fb923c] animate-spin" />

        {/* Inner core with site gradient */}
        <div className="absolute inset-4 rounded-full bg-gradient-to-br from-[#4f46e5] via-[#7c3aed] to-[#fb923c] animate-ping opacity-75" />
      </div>
    </div>
  );
}