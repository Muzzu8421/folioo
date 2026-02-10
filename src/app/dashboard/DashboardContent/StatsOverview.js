import { Eye, Link2, Upload, TrendingUp } from "lucide-react";
import StatCard from "../Shared/StatCard";

export default function StatsOverview() {
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <StatCard
        icon={<Eye className="w-6 h-6" />}
        value="2,847"
        label="Portfolio Views"
        trend={12.5}
        positive
      />
      <StatCard
        icon={<Link2 className="w-6 h-6" />}
        value="124"
        label="Profile Clicks"
        trend={8.2}
        positive
      />
      <StatCard
        icon={<Upload className="w-6 h-6" />}
        value="45"
        label="Downloads"
        trend={-3.1}
        positive={false}
      />
      <StatCard
        icon={<TrendingUp className="w-6 h-6" />}
        value="12.4%"
        label="Engagement Rate"
        trend={5.3}
        positive
      />
    </div>
  );
}