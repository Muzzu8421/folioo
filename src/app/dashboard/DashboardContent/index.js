import StatsOverview from "./StatsOverview";
import PortfolioPreview from "./PortfolioPreview";
import QuickActions from "./QuickActions";
import SuggestionsCard from "./SuggestionsCard";
import AnalyticsChart from "./AnalyticsChart";

export default function DashboardContent({ userName }) {
  
  return (
    <>
      <StatsOverview />

      <PortfolioPreview userName={userName} />

      <div className="grid lg:grid-cols-2 gap-8 mb-8">
        <QuickActions />
        <SuggestionsCard />
      </div>

      <AnalyticsChart />
    </>
  );
}
