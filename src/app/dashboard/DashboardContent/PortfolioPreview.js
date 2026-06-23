import React, { useState, useEffect } from "react";
import { Copy } from "lucide-react";
import Link from "next/link";
import { toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { QRCodeCanvas } from "qrcode.react";

export default function PortfolioPreview({ userName }) {
  const [link, setLink] = useState("");

  useEffect(() => {
    setLink(window.location.origin + "/portfolio/" + userName);
  }, [userName]);

  // Copy portfolio link to clipboard
  const handleCopy = () => {
    navigator.clipboard.writeText(link);
    toast.success("Copied to clipboard!", {
      position: "top-right",
      autoClose: 4000,
      theme: "dark",
      transition: Bounce,
    });
  };

  return (
    <div className="bg-[#111111] rounded-3xl p-6 mb-8 border border-white/5">
      <h3 className="text-xl font-medium text-gray-200 mb-6">Your Portfolio</h3>
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Portfolio Preview */}
        <div className="flex-shrink-0">
          <div className="w-full lg:w-64 aspect-video rounded-xl overflow-hidden border-2 border-white/10">
            {link ? (
              <div className="relative w-full h-full pointer-events-none overflow-hidden">
                <iframe
                  src={link}
                  title="Portfolio Preview"
                  className="absolute top-0 left-0 w-[400%] h-[400%] border-0 origin-top-left"
                  style={{ transform: "scale(0.25)" }}
                />
              </div>
            ) : (
              <div className="w-full h-full bg-[#222222]"></div>
            )}
          </div>
        </div>

        {/* Portfolio Info */}
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-4">
            {/* Portfolio Link when tapped will open in new tab */}
            <Link
              target="_blank"
              href={link}
              className="flex-1 bg-[#0a0a0a] border border-white/5 px-4 py-3 rounded-xl font-mono text-sm text-gray-300 hover:text-[#c084fc] transition-colors"
            >
              <div>{link}</div>
            </Link>
            {/* Copy Button to copy portfolio link to clipboard */}
            <button 
              onClick={handleCopy}
              className="cursor-pointer p-3 text-[#c084fc] bg-[#c084fc]/10 hover:bg-[#c084fc]/20 rounded-xl transition-colors"
            >
              <Copy className="w-5 h-5" />
            </button>
          </div>

          {/* QR Code */}
          <div className="mt-4 inline-block p-2 bg-white rounded-xl">
            <QRCodeCanvas value={link} size={100} />
          </div>
        </div>
      </div>
    </div>
  );
}
