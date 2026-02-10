import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const chartData = [
  { date: "Jan 5", views: 120, clicks: 15 },
  { date: "Jan 10", views: 180, clicks: 22 },
  { date: "Jan 15", views: 240, clicks: 35 },
  { date: "Jan 20", views: 290, clicks: 42 },
  { date: "Jan 25", views: 350, clicks: 48 },
  { date: "Jan 30", views: 420, clicks: 58 },
  { date: "Feb 4", views: 520, clicks: 75 },
];

export default function AnalyticsChart() {
  return (
    <div className="bg-white rounded-2xl p-6 border border-gray-200">
      <h3 className="text-xl font-bold text-gray-900 mb-6">
        Portfolio Performance
      </h3>
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis dataKey="date" stroke="#6b7280" />
            <YAxis stroke="#6b7280" />
            <Tooltip
              contentStyle={{
                backgroundColor: "#ffffff",
                border: "1px solid #e5e7eb",
                borderRadius: "8px",
              }}
            />
            <Line
              type="monotone"
              dataKey="views"
              stroke="#4f46e5"
              strokeWidth={3}
              dot={{ fill: "#4f46e5", r: 4 }}
            />
            <Line
              type="monotone"
              dataKey="clicks"
              stroke="#fb923c"
              strokeWidth={3}
              dot={{ fill: "#fb923c", r: 4 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <div className="flex items-center justify-center gap-8 mt-4">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-[#4f46e5] rounded-full"></div>
          <span className="text-sm text-gray-700">Views</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-[#fb923c] rounded-full"></div>
          <span className="text-sm text-gray-700">Clicks</span>
        </div>
      </div>
    </div>
  );
}