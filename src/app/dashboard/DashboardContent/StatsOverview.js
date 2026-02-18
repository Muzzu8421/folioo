import { Eye, Link2, Upload, TrendingUp } from "lucide-react";
import StatCard from "../Shared/StatCard";
import { useEffect, useState } from "react";

export default function StatsOverview() {

  const [analytics, setanalytics] = useState({});

  //Get the data of the Analytics from the Active Portfolio
  useEffect(() => {
    const load = async () => {
      const res = await fetch("/api/analytics/get-active-portfolio", {
        method: "GET",
      });
      if (res.ok) {
        const data = await res.json();
        setanalytics(data.analytics);
      } else {
        console.log(res.status);
      }
    };
    load();
  }, []);
  
  const views = analytics.views || 0; 
  const clicks = analytics.clicks || 0;
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
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
