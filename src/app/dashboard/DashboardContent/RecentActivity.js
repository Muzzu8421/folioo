import { FileText, Eye, Palette, Link2, TrendingUp } from "lucide-react";
import ActivityItem from "../Shared/ActivityItem";

export default function RecentActivity() {
  return (
    <div className="bg-white rounded-2xl p-6 border border-gray-200">
      <h3 className="text-xl font-bold text-gray-900 mb-4">
        Recent Activity
      </h3>
      <div className="space-y-4">
        <ActivityItem
          icon={<FileText className="w-5 h-5 text-[#4f46e5]" />}
          text="Resume updated"
          time="2 hours ago"
        />
        <ActivityItem
          icon={<Eye className="w-5 h-5 text-[#10b981]" />}
          text="Portfolio viewed by Google recruiter"
          time="5 hours ago"
        />
        <ActivityItem
          icon={<Palette className="w-5 h-5 text-[#7c3aed]" />}
          text="Template changed to 'Modern Developer'"
          time="Yesterday"
        />
        <ActivityItem
          icon={<Link2 className="w-5 h-5 text-[#fb923c]" />}
          text="Portfolio link shared on LinkedIn"
          time="2 days ago"
        />
        <ActivityItem
          icon={<TrendingUp className="w-5 h-5 text-[#3b82f6]" />}
          text="Reached 1000 profile views"
          time="3 days ago"
        />
      </div>
      <button className="w-full mt-4 py-2 text-[#4f46e5] font-semibold hover:bg-gray-50 rounded-lg transition-colors">
        View all activity
      </button>
    </div>
  );
}