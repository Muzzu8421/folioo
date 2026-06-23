import { Eye, Link2, TrendingUp } from "lucide-react";
import StatCard from "../Shared/StatCard";

export default function StatsOverview({ analytics = {} }) {
  const views = analytics.views || 0; 
  const clicks = analytics.clicks || 0;
  
  const engagementRate = views > 0 ? ((clicks / views) * 100).toFixed(1) : 0;

  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
      <StatCard
        icon={<Eye className="w-6 h-6" />}
        value={views}
        label="Portfolio Views"
        trend={12.5}
        positive
      />
      <StatCard
        icon={<Link2 className="w-6 h-6" />}
        value={clicks}
        label="Profile Clicks"
        trend={8.2}
        positive
      />
      <StatCard
        icon={<TrendingUp className="w-6 h-6" />}
        value={`${engagementRate}%`}
        label="Engagement Rate"
        trend={5.3}
        positive
      />
    </div>
  );
}
