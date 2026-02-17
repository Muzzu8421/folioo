import { Upload, Palette, Globe, ExternalLink } from "lucide-react";
import QuickActionCard from "../Shared/QuickActionCard";

export default function QuickActions() {
  return (
    <div className="bg-white rounded-2xl p-6 border border-gray-200">
      <h3 className="text-xl font-bold text-gray-900 mb-4">
        Quick Actions
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-4">
        <QuickActionCard
          icon={<Upload className="w-6 h-6" />}
          title="Update Resume"
          description="Upload new version"
        />
        <QuickActionCard
          icon={<Palette className="w-6 h-6" />}
          title="Change Template"
          description="Browse templates"
        />
        <QuickActionCard
          icon={<Globe className="w-6 h-6" />}
          title="Custom Domain"
          description="Add your domain"
        />
        <QuickActionCard
          icon={<ExternalLink className="w-6 h-6" />}
          title="Share Portfolio"
          description="Get shareable link"
        />
      </div>
    </div>
  );
}