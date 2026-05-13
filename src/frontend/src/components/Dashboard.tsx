import { useCallback, useEffect, useRef, useState } from "react";
import AnalyticsChart from "./AnalyticsChart";
import CameraFeed from "./CameraFeed";
import ControlStrip from "./ControlStrip";
import MetricsPanel from "./MetricsPanel";

export type VesselType = "Vessel 1" | "Vessel 2" | "Vessel 3" | "Vessel 4";

export interface DetectedObject {
  id: number;
  label: VesselType;
  x: number; // percentage left
  y: number; // percentage top
  w: number; // percentage width
  h: number; // percentage height
  confidence: number;
  crossingRoi: boolean;
  rowId: number;
}

export interface ChartDataPoint {
  time: string;
  count: number;
}

export interface VesselCounts {
  "Vessel 1": number;
  "Vessel 2": number;
  "Vessel 3": number;
  "Vessel 4": number;
}

// Vessel type visual config
export const VESSEL_CONFIG: Record<
  VesselType,
  { color: string; w: number; h: number }
> = {
  "Vessel 1": { color: "oklch(0.75 0.18 145)", w: 10, h: 8 }, // green
  "Vessel 2": { color: "oklch(0.75 0.15 210)", w: 10, h: 8 }, // cyan
  "Vessel 3": { color: "oklch(0.82 0.17 85)", w: 10, h: 8 }, // yellow
  "Vessel 4": { color: "oklch(0.72 0.18 45)", w: 10, h: 8 }, // orange
};

const VESSEL_TYPES: VesselType[] = [
  "Vessel 1",
  "Vessel 2",
  "Vessel 3",
  "Vessel 4",
];

// Layout constants — downward movement
const ITEMS_PER_ROW = 5;
const ITEM_W = 13; // % width of each vessel box
const ITEM_H = 8; // % height of each vessel box
const ROW_SPACING = 28; // % vertical gap between row y positions
const SPEED = 6; // % per tick, downward direction
const ROI_Y = 72; // % from top — horizontal ROI line position
const SPAWN_Y = -18; // % — rows spawn above the visible area

// Horizontal distribution: spread 5 items evenly across feed width
// Feed spans 0–100%. Leave margin on each side.
const LEFT_MARGIN = 4; // % from left edge
const USABLE_W = 92; // % usable width
const ITEM_STEP = USABLE_W / ITEMS_PER_ROW; // spacing between item left edges

let idCounter = 100;
let rowIdCounter = 4;

function makeRow(rowId: number, startY: number): DetectedObject[] {
  return Array.from({ length: ITEMS_PER_ROW }, (_, i) => {
    const vesselType = VESSEL_TYPES[Math.floor(Math.random() * 4)];
    // Center each item within its slot
    const slotCenter = LEFT_MARGIN + i * ITEM_STEP + ITEM_STEP / 2;
    const itemX = slotCenter - ITEM_W / 2;
    return {
      id: idCounter++,
      label: vesselType,
      x: itemX,
      y: startY,
      w: ITEM_W,
      h: ITEM_H,
      confidence: Number.parseFloat((0.85 + Math.random() * 0.14).toFixed(2)),
      crossingRoi: false,
      rowId,
    };
  });
}

function buildInitialObjects(): DetectedObject[] {
  // Spawn 4 rows spread vertically so the screen looks populated on load
  const rows: DetectedObject[] = [];
  rows.push(...makeRow(1, -10)); // just entering top
  rows.push(...makeRow(2, 20)); // upper section
  rows.push(...makeRow(3, 48)); // mid section
  rows.push(...makeRow(4, 76)); // near ROI
  return rows;
}

function buildInitialChartData(): ChartDataPoint[] {
  const counts = [
    0, 12, 28, 45, 67, 89, 110, 134, 158, 172, 190, 215, 238, 261, 280, 302,
    324, 347, 368, 391,
  ];
  return counts.map((count, i) => ({ time: `${i}m`, count }));
}

export default function Dashboard() {
  const [running, setRunning] = useState(true);
  const [totalCount, setTotalCount] = useState(391);
  const [batchCount, setBatchCount] = useState(47);
  const [rate, setRate] = useState(18.4);
  const [objects, setObjects] = useState<DetectedObject[]>(buildInitialObjects);
  const [chartData, setChartData] = useState<ChartDataPoint[]>(
    buildInitialChartData,
  );
  const [roiActive, setRoiActive] = useState(false);
  const [vesselCounts, setVesselCounts] = useState<VesselCounts>({
    "Vessel 1": 98,
    "Vessel 2": 102,
    "Vessel 3": 95,
    "Vessel 4": 96,
  });
  const [cameraOnline, setCameraOnline] = useState(true);
  const tickRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const tick = useCallback(() => {
    setRate(() => Number.parseFloat((14 + Math.random() * 8).toFixed(1)));

    let roiCrossings = 0;
    const crossedVessels: VesselType[] = [];

    setObjects((prev) => {
      // Move all objects downward by SPEED %
      const moved = prev.map((obj) => ({
        ...obj,
        y: obj.y + SPEED,
      }));

      // Track which rowIds have already triggered ROI to avoid double-counting
      const crossedRowIds = new Set<number>();

      // Detect ROI crossings: center of item crosses ROI_Y from above
      const updated = moved.map((obj) => {
        const centerY = obj.y + obj.h / 2;
        const prevCenterY = centerY - SPEED;
        const crossed = prevCenterY < ROI_Y && centerY >= ROI_Y;
        if (crossed && !crossedRowIds.has(obj.rowId)) {
          crossedRowIds.add(obj.rowId);
          roiCrossings++;
          crossedVessels.push(obj.label);
        }
        const nearRoi = Math.abs(centerY - ROI_Y) < 8;
        return { ...obj, crossingRoi: nearRoi };
      });

      // Remove objects that have fully scrolled off the bottom
      const visible = updated.filter((obj) => obj.y < 112);

      // Find the topmost y position of all visible objects (the highest row)
      const minY =
        visible.length > 0 ? Math.min(...visible.map((o) => o.y)) : 0;

      // Spawn a new row when there's room at the top
      let final = visible;
      if (minY > SPAWN_Y + ROW_SPACING) {
        rowIdCounter++;
        final = [...makeRow(rowIdCounter, SPAWN_Y), ...visible];
      }

      return final;
    });

    if (roiCrossings > 0) {
      setRoiActive(true);
      setTotalCount((c) => c + roiCrossings);
      setBatchCount((c) => c + roiCrossings);
      setVesselCounts((vc) => {
        const next = { ...vc };
        for (const v of crossedVessels) next[v] += 1;
        return next;
      });
      setChartData((prev) => {
        const next = [...prev];
        const last = next[next.length - 1];
        next.push({
          time: `${Number.parseInt(last.time, 10) + 1}m`,
          count: last.count + roiCrossings,
        });
        if (next.length > 25) next.shift();
        return next;
      });
    } else {
      setRoiActive(false);
    }
  }, []);

  useEffect(() => {
    if (running) {
      tickRef.current = setInterval(tick, 600);
    } else {
      if (tickRef.current) clearInterval(tickRef.current);
    }
    return () => {
      if (tickRef.current) clearInterval(tickRef.current);
    };
  }, [running, tick]);

  const handleReset = () => {
    setBatchCount(0);
    setVesselCounts({
      "Vessel 1": 0,
      "Vessel 2": 0,
      "Vessel 3": 0,
      "Vessel 4": 0,
    });
  };

  const peakRate = Math.max(...chartData.map((d) => d.count));
  const avgRate = Math.round(
    chartData.reduce((s, d) => s + d.count, 0) / chartData.length,
  );

  return (
    <div
      className="flex flex-col h-screen overflow-hidden bg-background"
      data-ocid="dashboard.page"
    >
      {/* Header */}
      <header className="flex items-center justify-between px-4 py-2 border-b border-border/40 bg-card shrink-0">
        <span className="font-display text-sm tracking-widest uppercase text-muted-foreground">
          Factory Monitoring System
        </span>
        <div className="flex items-center gap-4">
          {/* Camera toggle for demo */}
          <button
            type="button"
            onClick={() => setCameraOnline((v) => !v)}
            className="font-display text-[10px] tracking-widest px-2 py-0.5 border border-border/40 hover:border-border/70 text-muted-foreground"
            data-ocid="dashboard.camera_toggle_button"
            aria-label="Toggle camera status"
          >
            CAM {cameraOnline ? "ONLINE" : "OFFLINE"}
          </button>
          <span
            className={`w-2 h-2 rounded-full ${running ? "bg-[oklch(var(--accent))]" : "bg-muted-foreground"}`}
          />
          <span className="font-display text-xs text-muted-foreground tracking-wider">
            {running ? "LIVE" : "PAUSED"}
          </span>
        </div>
      </header>

      {/* Main content */}
      <div className="flex flex-1 gap-0 overflow-hidden">
        {/* Left: camera + controls */}
        <div className="flex flex-col w-[70%] border-r border-border/40">
          <CameraFeed
            objects={objects}
            roiActive={roiActive}
            running={running}
            cameraOnline={cameraOnline}
          />
          <ControlStrip
            running={running}
            onStart={() => setRunning(true)}
            onPause={() => setRunning(false)}
            onReset={handleReset}
          />
          <AnalyticsChart
            data={chartData}
            peakRate={peakRate}
            avgRate={avgRate}
          />
        </div>

        {/* Right: metrics */}
        <div className="w-[30%] flex flex-col">
          <MetricsPanel
            totalCount={totalCount}
            rate={rate}
            batchCount={batchCount}
            onResetBatch={handleReset}
            vesselCounts={vesselCounts}
            cameraOnline={cameraOnline}
          />
        </div>
      </div>
    </div>
  );
}
