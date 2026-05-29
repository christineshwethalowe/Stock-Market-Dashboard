"use client";

import {
  Area,
  AreaChart,
  CartesianGrid,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import type { ChartPoint } from "@/types/market";

interface MarketChartProps {
  data: ChartPoint[];
}

export function MarketChart({ data }: MarketChartProps) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
        <defs>
          <linearGradient id="aspiFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#2563eb" stopOpacity={0.36} />
            <stop offset="95%" stopColor="#2563eb" stopOpacity={0.02} />
          </linearGradient>
          <linearGradient id="sl20Fill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
            <stop offset="95%" stopColor="#10b981" stopOpacity={0.02} />
          </linearGradient>
        </defs>
        <CartesianGrid stroke="rgba(148,163,184,0.12)" vertical={false} />
        <XAxis
          dataKey="label"
          tick={{ fill: "#475569", fontSize: 12, fontFamily: "var(--font-dm-mono), monospace" }}
          axisLine={{ stroke: "rgba(30,58,138,0.16)" }}
          tickLine={false}
        />
        <YAxis
          tick={{ fill: "#475569", fontSize: 12, fontFamily: "var(--font-dm-mono), monospace" }}
          axisLine={false}
          tickLine={false}
          width={52}
          domain={["dataMin - 40", "dataMax + 40"]}
        />
        <Tooltip
          contentStyle={{
            background: "rgba(255,255,255,0.98)",
            border: "1px solid rgba(37,99,235,0.24)",
            borderRadius: 16,
            color: "#0f172a",
            boxShadow: "0 20px 40px rgba(15,23,42,0.16)",
          }}
          labelStyle={{ color: "#334155", fontSize: 12, fontFamily: "var(--font-dm-mono), monospace" }}
          itemStyle={{ color: "#0f172a", fontSize: 12, fontFamily: "var(--font-dm-mono), monospace" }}
        />
        <Area
          type="monotone"
          dataKey="aspi"
          stroke="#2563eb"
          strokeWidth={2.5}
          fill="url(#aspiFill)"
          dot={false}
          activeDot={{ r: 5 }}
        />
        <Line
          type="monotone"
          dataKey="sl20"
          stroke="#10b981"
          strokeWidth={2.5}
          dot={false}
          activeDot={{ r: 5 }}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}
