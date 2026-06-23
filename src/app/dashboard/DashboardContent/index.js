import { useEffect, useState } from "react";
import StatsOverview from "./StatsOverview";
import PortfolioPreview from "./PortfolioPreview";
import QuickActions from "./QuickActions";
import SuggestionsCard from "./SuggestionsCard";
import AnalyticsChart from "./AnalyticsChart";

export default function DashboardContent({ userName, setActivePage }) {
  const [analytics, setAnalytics] = useState({});

  useEffect(() => {
    const load = async () => {
      const res = await fetch("/api/analytics/get-active-portfolio", {
        method: "GET",
      });
      if (res.ok) {
        const data = await res.json();
        setAnalytics(data.analytics || {});
      }
    };
    load();
  }, []);
  
  return (
    <>
      <StatsOverview analytics={analytics} />

      <PortfolioPreview userName={userName} />

      <div className="grid lg:grid-cols-2 gap-8 mb-8">
        <QuickActions userName={userName} setActivePage={setActivePage} />
        <SuggestionsCard />
      </div>

      <AnalyticsChart analytics={analytics} />
    </>
  );
}
