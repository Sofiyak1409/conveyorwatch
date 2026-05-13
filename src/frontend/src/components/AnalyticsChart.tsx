import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import type { ChartDataPoint } from "./Dashboard";

interface AnalyticsChartProps {
  data: ChartDataPoint[];
  peakRate: number;
  avgRate: number;
}

interface TooltipProps {
  active?: boolean;
  payload?: Array<{ value: number }>;
  label?: string;
}

function CustomTooltip({ active, payload, label }: TooltipProps) {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-card border border-border/60 px-3 py-2">
      <p className="font-display text-[10px] text-muted-foreground tracking-wider">
        {label}
      </p>
      <p className="font-display text-sm text-foreground font-bold">
        {payload[0].value}
      </p>
    </div>
  );
}

export default function AnalyticsChart({
  data,
  peakRate,
  avgRate,
}: AnalyticsChartProps) {
  return (
    <div
      className="bg-card border-t border-border/40 px-4 pt-3 pb-3 shrink-0"
      style={{ height: "200px" }}
      data-ocid="analytics.panel"
    >
      {/* Header row */}
      <div className="flex items-center justify-between mb-2">
        <span className="font-display text-[10px] tracking-widest uppercase text-muted-foreground">
          Detection Rate — Last 20 Min
        </span>
        <div className="flex items-center gap-4">
          <StatChip label="PEAK" value={peakRate} />
          <StatChip label="AVG" value={avgRate} />
        </div>
      </div>

      {/* Chart */}
      <ResponsiveContainer width="100%" height="80%">
        <LineChart
          data={data}
          margin={{ top: 2, right: 4, left: -20, bottom: 0 }}
        >
          <CartesianGrid
            strokeDasharray="2 4"
            stroke="oklch(0.25 0 0)"
            vertical={false}
          />
          <XAxis
            dataKey="time"
            tick={{
              fill: "oklch(0.40 0 0)",
              fontSize: 9,
              fontFamily: "JetBrainsMono",
            }}
            axisLine={{ stroke: "oklch(0.22 0 0)" }}
            tickLine={false}
            interval={3}
          />
          <YAxis
            tick={{
              fill: "oklch(0.40 0 0)",
              fontSize: 9,
              fontFamily: "JetBrainsMono",
            }}
            axisLine={false}
            tickLine={false}
            width={35}
          />
          <Tooltip content={<CustomTooltip />} />
          <Line
            type="monotone"
            dataKey="count"
            stroke="oklch(0.68 0.25 142)"
            strokeWidth={1.5}
            dot={false}
            activeDot={{ r: 3, fill: "oklch(0.68 0.25 142)", stroke: "none" }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

function StatChip({ label, value }: { label: string; value: number }) {
  return (
    <div className="flex items-center gap-1.5">
      <span className="font-display text-[9px] tracking-widest text-muted-foreground">
        {label}
      </span>
      <span className="font-display text-xs text-foreground font-bold">
        {value.toLocaleString()}
      </span>
    </div>
  );
}
