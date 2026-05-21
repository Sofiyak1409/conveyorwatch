import { RotateCcw } from "lucide-react";
import { VESSEL_CONFIG } from "./Dashboard";
import type { VesselCounts, VesselType } from "./Dashboard";

interface MetricsPanelProps {
  totalCount: number;
  rate: number;
  batchCount: number;
  onResetBatch: () => void;
  vesselCounts: VesselCounts;
  cameraOnline: boolean;
  fps: number;
  avgConfidence: number;
}

function MetricRow({
  label,
  value,
  unit,
  size = "normal",
  accent = false,
}: {
  label: string;
  value: string | number;
  unit?: string;
  size?: "normal" | "large";
  accent?: boolean;
}) {
  return (
    <div className="flex flex-col gap-0.5 py-3 border-b border-border/25">
      <span className="font-body text-xs tracking-widest uppercase text-muted-foreground leading-none">
        {label}
      </span>
      <div className="flex items-baseline gap-1.5">
        <span
          className={`font-display font-bold leading-none ${
            size === "large" ? "text-5xl" : "text-2xl"
          } ${accent ? "text-[oklch(var(--accent))]" : "text-foreground"}`}
        >
          {value}
        </span>
        {unit && (
          <span className="font-display text-xs text-muted-foreground tracking-wider">
            {unit}
          </span>
        )}
      </div>
    </div>
  );
}

const VESSEL_TYPES: VesselType[] = [
  "Vessel 1",
  "Vessel 2",
  "Vessel 3",
  "Vessel 4",
];

export default function MetricsPanel({
  totalCount,
  rate,
  batchCount,
  onResetBatch,
  vesselCounts,
  cameraOnline,
  fps,
  avgConfidence,
}: MetricsPanelProps) {
  return (
    <div
      className="flex flex-col h-full bg-card border-l border-border/40 overflow-y-auto"
      data-ocid="metrics.panel"
    >
      {/* Panel header */}
      <div className="px-4 py-2 border-b border-border/40 bg-background/60">
        <span className="font-display text-[10px] tracking-widest uppercase text-muted-foreground">
          System Metrics
        </span>
      </div>

      <div className="flex flex-col px-4 flex-1">
        {/* Total Count */}
        <div className="py-4 border-b border-border/25">
          <span className="font-body text-xs tracking-widest uppercase text-muted-foreground leading-none block mb-2">
            Total Count
          </span>
          <span
            className="font-display font-bold leading-none text-foreground block"
            style={{ fontSize: "clamp(3rem, 5vw, 5rem)" }}
            data-ocid="metrics.total_count"
          >
            {totalCount.toLocaleString()}
          </span>
          <span className="font-display text-xs text-muted-foreground tracking-wider mt-1 block">
            vessels detected
          </span>
        </div>

        {/* Current Rate */}
        <MetricRow
          label="Current Rate"
          value={rate.toFixed(1)}
          unit="/ min"
          size="large"
          accent
        />

        {/* Detection Confidence */}
        <MetricRow
          label="Detection Confidence"
          value={(avgConfidence * 100).toFixed(1)}
          unit="%"
        />

        {/* FPS */}
        <MetricRow label="FPS" value={fps} unit="fps" />

        {/* Batch Count with reset */}
        <div className="flex flex-col gap-0.5 py-3 border-b border-border/25">
          <div className="flex items-center justify-between">
            <span className="font-body text-xs tracking-widest uppercase text-muted-foreground leading-none">
              Batch Count
            </span>
            <button
              onClick={onResetBatch}
              type="button"
              className="flex items-center gap-1 px-2 py-0.5 border border-border/40 hover:border-[oklch(var(--accent)/0.6)] hover:text-[oklch(var(--accent))] text-muted-foreground"
              data-ocid="metrics.reset_batch_button"
              aria-label="Reset batch count"
            >
              <RotateCcw size={10} />
              <span className="font-display text-[10px] tracking-wider">
                RESET
              </span>
            </button>
          </div>
          <span
            className="font-display font-bold text-2xl leading-none text-foreground"
            data-ocid="metrics.batch_count"
          >
            {batchCount}
          </span>
        </div>

        {/* Vessel type breakdown */}
        <div className="flex flex-col py-3 border-b border-border/25 gap-1.5">
          <span className="font-body text-[10px] tracking-widest uppercase text-muted-foreground leading-none mb-1">
            Vessel Breakdown
          </span>
          {VESSEL_TYPES.map((vt, idx) => {
            const cfg = VESSEL_CONFIG[vt];
            return (
              <div
                key={vt}
                className="flex items-center justify-between"
                data-ocid={`metrics.vessel_type.${idx + 1}`}
              >
                <div className="flex items-center gap-1.5">
                  <span
                    className="w-2 h-2 shrink-0"
                    style={{ background: cfg.color }}
                  />
                  <span className="font-body text-xs text-muted-foreground">
                    {vt}
                  </span>
                </div>
                <span
                  className="font-display text-sm font-bold tabular-nums"
                  style={{ color: cfg.color }}
                >
                  {vesselCounts[vt].toLocaleString()}
                </span>
              </div>
            );
          })}
        </div>

        {/* Status indicators */}
        <div className="flex flex-col gap-2 py-3">
          <StatusRow
            label="Camera"
            status={cameraOnline ? "ONLINE" : "OFFLINE"}
            ok={cameraOnline}
          />
          <StatusRow label="Detection Engine" status="ACTIVE" ok />
          <StatusRow label="Data Stream" status="SYNCED" ok />
        </div>
      </div>

      {/* Footer branding */}
      <div className="px-4 py-2 border-t border-border/20 mt-auto flex flex-col gap-0.5">
        <span className="font-display text-[9px] text-muted-foreground/40 tracking-widest">
          CONVEYOR MONITOR v2.4.1
        </span>
        <a
          href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="font-display text-[9px] text-muted-foreground/30 tracking-widest hover:text-muted-foreground/50"
        >
          Built with caffeine.ai
        </a>
      </div>
    </div>
  );
}

function StatusRow({
  label,
  status,
  ok,
}: {
  label: string;
  status: string;
  ok: boolean;
}) {
  return (
    <div className="flex items-center justify-between">
      <span className="font-body text-xs text-muted-foreground">{label}</span>
      <div className="flex items-center gap-1.5">
        <span
          className="w-1.5 h-1.5 rounded-full"
          style={{
            background: ok ? "oklch(0.75 0.18 145)" : "oklch(0.65 0.22 25)",
          }}
        />
        <span
          className="font-display text-[10px] tracking-wider"
          style={{
            color: ok ? "oklch(0.75 0.18 145)" : "oklch(0.65 0.22 25)",
          }}
        >
          {status}
        </span>
      </div>
    </div>
  );
}
