import { Copy } from "lucide-react";
import Link from "next/link";
import { toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { QRCodeCanvas } from "qrcode.react";

export default function PortfolioPreview({ userName }) {
  const link = window.location.origin + "/portfolio/" + userName;

  // Copy portfolio link to clipboard
  const handleCopy = () => {
    navigator.clipboard.writeText(link);
    toast.success("Copied to clipboard!", {
      position: "top-right",
      autoClose: 4000,
      theme: "light",
      transition: Bounce,
    });
  };
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
            {/* Portfolio Link when tapped will open in new tab */}
            <Link
              target="_blank"
              href={link}
              className="flex-1 bg-gray-100 px-4 py-2 rounded-lg font-mono text-sm text-gray-700"
            >
              <div>{link}</div>
            </Link>
            {/* Copy Button to copy portfolio link to clipboard */}
            <button className="cursor-pointer p-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
              <Copy onClick={handleCopy} className="w-5 h-5" />
            </button>
          </div>

          {/* QR Code */}
          <div className="mt-4 inline-block">
            <QRCodeCanvas value={link} size={100} />
          </div>
        </div>
      </div>
    </div>
  );
}
