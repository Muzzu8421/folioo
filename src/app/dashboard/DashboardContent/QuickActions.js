import { Upload, ExternalLink } from "lucide-react";
import QuickActionCard from "../Shared/QuickActionCard";
import { toast, Bounce } from "react-toastify";

export default function QuickActions({ userName, setActivePage }) {
  const handleShare = () => {
    const url = `${window.location.origin}/${userName}`;
    navigator.clipboard.writeText(url);
    toast.success("Portfolio link copied to clipboard!", {
      position: "top-right",
      autoClose: 2000,
      theme: "dark",
      transition: Bounce,
    });
  };

  return (
    <div className="bg-[#111111] rounded-3xl p-6 border border-white/5">
      <h3 className="text-xl font-medium text-gray-200 mb-6">
        Quick Actions
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-4">
        <QuickActionCard
          icon={<Upload className="w-6 h-6" />}
          title="Upload Resume"
          description="Upload new version"
          onClick={() => setActivePage("resume")}
        />
        <QuickActionCard
          icon={<ExternalLink className="w-6 h-6" />}
          title="Share Portfolio"
          description="Get shareable link"
          onClick={handleShare}
        />
      </div>
    </div>
  );
}