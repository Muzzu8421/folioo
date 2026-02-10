import WelcomeBanner from "./WelcomeBanner";
import StatsOverview from "./StatsOverview";
import PortfolioPreview from "./PortfolioPreview";
import RecentActivity from "./RecentActivity";
import QuickActions from "./QuickActions";
import SuggestionsCard from "./SuggestionsCard";
import AnalyticsChart from "./AnalyticsChart";

export default function DashboardContent({ userName, showBanner, setShowBanner }) {
  return (
    <>
      <WelcomeBanner
        userName={userName}
        show={showBanner}
        onClose={() => setShowBanner(false)}
      />
      
      <StatsOverview />
      
      <PortfolioPreview />

      <div className="grid lg:grid-cols-2 gap-8 mb-8">
        <RecentActivity />
        
        <div className="space-y-6">
          <QuickActions />
          <SuggestionsCard />
        </div>
      </div>

      <AnalyticsChart />
    </>
  );
}