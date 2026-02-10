import { Copy } from "lucide-react";

export default function PortfolioPreview() {
  return (
    <div className="bg-white rounded-2xl p-6 mb-8 border border-gray-200">
      <h3 className="text-xl font-bold text-gray-900 mb-4">Your Portfolio</h3>
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Portfolio Preview */}
        <div className="flex-shrink-0">
          <div className="w-full lg:w-64 aspect-video rounded-lg overflow-hidden border-4 border-gradient">
            <img
              src="https://images.unsplash.com/photo-1727686679920-79be3ffe07d8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080"
              alt="Portfolio preview"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Portfolio Info */}
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-4">
            <div className="flex-1 bg-gray-100 px-4 py-2 rounded-lg font-mono text-sm text-gray-700">
              folioo.me/johndoe
            </div>
            <button className="p-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
              <Copy className="w-5 h-5" />
            </button>
          </div>
          <div className="flex items-center gap-2 mb-4">
            <span className="inline-flex items-center px-3 py-1 bg-[#10b981] bg-opacity-10 text-[#10b981] rounded-full text-sm font-semibold">
              ● Live
            </span>
            <span className="text-sm text-gray-500">
              Last updated 2 days ago
            </span>
          </div>
          <div className="flex flex-wrap gap-3">
            <button className="px-4 py-2 bg-gradient-to-r from-[#4f46e5] via-[#7c3aed] to-[#fb923c] text-white rounded-lg font-semibold hover:shadow-lg transition-all">
              View Live
            </button>
            <button className="px-4 py-2 border border-gray-200 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors">
              Edit
            </button>
            <button className="px-4 py-2 border border-gray-200 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors">
              Settings
            </button>
          </div>

          {/* QR Code */}
          <div className="mt-4 inline-block">
            <div className="w-24 h-24 bg-gray-900 rounded-lg"></div>
            <p className="text-xs text-gray-500 mt-1 text-center">QR Code</p>
          </div>
        </div>
      </div>
    </div>
  );
}