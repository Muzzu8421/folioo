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
    <div className="bg-[#111111] rounded-3xl p-6 border border-white/5">
      <h3 className="text-xl font-medium text-gray-200 mb-6">
        Portfolio Performance
      </h3>
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#ffffff0d" />
            <XAxis dataKey="date" stroke="#4B5563" axisLine={false} tickLine={false} />
            <YAxis stroke="#4B5563" axisLine={false} tickLine={false} />
            <Tooltip
              contentStyle={{
                backgroundColor: "#111111",
                border: "1px solid #ffffff1a",
                borderRadius: "12px",
                color: "#fff"
              }}
            />
            <Line
              type="monotone"
              dataKey="views"
              stroke="#c084fc"
              strokeWidth={3}
              dot={{ fill: "#111111", stroke: "#c084fc", strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6, fill: "#c084fc", stroke: "#fff" }}
            />
            <Line
              type="monotone"
              dataKey="clicks"
              stroke="#8B949E"
              strokeWidth={3}
              dot={{ fill: "#111111", stroke: "#8B949E", strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6, fill: "#8B949E", stroke: "#fff" }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <div className="flex items-center justify-center gap-8 mt-6">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-[#c084fc] rounded-full shadow-[0_0_8px_rgba(192,132,252,0.8)]"></div>
          <span className="text-sm text-gray-400">Views</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-[#8B949E] rounded-full"></div>
          <span className="text-sm text-gray-400">Clicks</span>
        </div>
      </div>
    </div>
  );
}