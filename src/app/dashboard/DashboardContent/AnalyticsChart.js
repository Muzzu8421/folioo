import { useMemo } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function AnalyticsChart({ analytics = {} }) {
  const chartData = useMemo(() => {
    // We want the last 7 days including today
    const dataMap = {};
    for (let i = 6; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const dateStr = d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
      dataMap[dateStr] = { date: dateStr, views: 0, clicks: 0 };
    }

    if (analytics.viewhistory) {
      analytics.viewhistory.forEach(dateStr => {
        const d = new Date(dateStr);
        const key = d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
        if (dataMap[key]) {
          dataMap[key].views += 1;
        }
      });
    }

    if (analytics.clickhistory) {
      analytics.clickhistory.forEach(dateStr => {
        const d = new Date(dateStr);
        const key = d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
        if (dataMap[key]) {
          dataMap[key].clicks += 1;
        }
      });
    }

    return Object.values(dataMap);
  }, [analytics]);

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
            <YAxis stroke="#4B5563" axisLine={false} tickLine={false} allowDecimals={false} />
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