import { VESSEL_CONFIG } from "./Dashboard";
import type { DetectedObject, VesselType } from "./Dashboard";

interface CameraFeedProps {
  objects: DetectedObject[];
  roiActive: boolean;
  running: boolean;
  cameraOnline: boolean;
}

export default function CameraFeed({
  objects,
  roiActive,
  running,
  cameraOnline,
}: CameraFeedProps) {
  return (
    <div
      className="relative flex-1 overflow-hidden bg-[#0a0a0a] border-b border-border/40"
      data-ocid="camera_feed.panel"
      style={{ minHeight: 0 }}
    >
      {/* LIVE FEED label */}
      <div className="absolute top-3 left-3 z-20 font-display text-xs tracking-widest uppercase text-foreground/70 bg-background/60 px-2 py-0.5 border border-border/30">
        LIVE FEED
      </div>

      {/* Camera Status badge */}
      <div
        className="absolute top-3 left-28 z-20 flex items-center gap-1.5 px-2 py-0.5 border"
        style={{
          background: "rgba(8,8,8,0.85)",
          borderColor: cameraOnline
            ? "oklch(0.75 0.18 145 / 0.6)"
            : "oklch(0.65 0.22 25 / 0.7)",
        }}
        data-ocid="camera_feed.camera_status"
      >
        <span
          className="w-1.5 h-1.5 rounded-full"
          style={{
            background: cameraOnline
              ? "oklch(0.75 0.18 145)"
              : "oklch(0.65 0.22 25)",
          }}
        />
        <span
          className="font-display text-[10px] tracking-widest"
          style={{
            color: cameraOnline
              ? "oklch(0.75 0.18 145)"
              : "oklch(0.65 0.22 25)",
          }}
        >
          {cameraOnline ? "ONLINE" : "OFFLINE"}
        </span>
      </div>

      {/* REC / PAUSED indicator */}
      <div className="absolute top-3 right-3 z-20 flex items-center gap-1.5 bg-background/60 px-2 py-0.5 border border-border/30">
        <span
          className={`w-1.5 h-1.5 rounded-full ${running ? "bg-[oklch(var(--accent))]" : "bg-muted-foreground"}`}
        />
        <span className="font-display text-[10px] tracking-widest text-foreground/70">
          {running ? "REC" : "PAUSED"}
        </span>
      </div>

      {/* Simulated camera frame — top-down conveyor view */}
      <div
        className="absolute inset-0"
        style={{ background: "oklch(0.08 0 0)" }}
      >
        {/* Conveyor belt background — viewed from above: horizontal lanes moving downward */}
        <svg
          className="absolute inset-0 w-full h-full"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          {/* Belt surface */}
          <rect x="0" y="0" width="100" height="100" fill="#0c0c0c" />

          {/* Belt lane dividers — vertical lines indicating track channels */}
          {[18.4, 36.8, 55.2, 73.6].map((x) => (
            <line
              key={x}
              x1={x}
              y1="0"
              x2={x}
              y2="100"
              stroke="#161616"
              strokeWidth="0.35"
            />
          ))}

          {/* Moving belt slat lines — horizontal, simulating belt motion downward */}
          {[10, 20, 30, 40, 50, 60, 70, 80, 90].map((y) => (
            <line
              key={y}
              x1="0"
              y1={y}
              x2="100"
              y2={y}
              stroke="#141414"
              strokeWidth="0.3"
            />
          ))}

          {/* Belt edge rails */}
          <line
            x1="2"
            y1="0"
            x2="2"
            y2="100"
            stroke="#1a1a1a"
            strokeWidth="0.6"
          />
          <line
            x1="98"
            y1="0"
            x2="98"
            y2="100"
            stroke="#1a1a1a"
            strokeWidth="0.6"
          />

          {/* Subtle belt texture gradient from top */}
          <rect
            x="0"
            y="0"
            width="100"
            height="8"
            fill="#0a0a0a"
            opacity="0.6"
          />
          {/* Belt entry shadow at top */}
          <rect
            x="0"
            y="0"
            width="100"
            height="4"
            fill="#060606"
            opacity="0.9"
          />
        </svg>

        {/* Dark overlay */}
        <div className="absolute inset-0 bg-[#080808]/20 pointer-events-none" />

        {/* OFFLINE overlay */}
        {!cameraOnline && (
          <div
            className="absolute inset-0 z-25 flex flex-col items-center justify-center pointer-events-none"
            style={{ background: "rgba(0,0,0,0.78)" }}
            data-ocid="camera_feed.offline_overlay"
          >
            <span
              className="font-display text-2xl tracking-widest font-bold"
              style={{ color: "oklch(0.65 0.22 25)" }}
            >
              NO SIGNAL
            </span>
            <span className="font-display text-xs tracking-widest text-muted-foreground mt-2">
              CAMERA OFFLINE
            </span>
          </div>
        )}

        {/* ROI line — horizontal at 72% of feed height, vessels cross downward */}
        <div
          className="absolute left-0 right-0 z-10 pointer-events-none"
          style={{ top: "72%" }}
        >
          <div
            className="relative flex items-center"
            style={{
              height: "2px",
              background: roiActive
                ? "oklch(var(--accent))"
                : "oklch(var(--accent) / 0.45)",
              boxShadow: roiActive
                ? "0 0 10px oklch(var(--accent) / 0.65), 0 0 24px oklch(var(--accent) / 0.2)"
                : "none",
            }}
          >
            <span
              className="absolute left-2 font-display text-[10px] tracking-wider px-1"
              style={{
                color: roiActive
                  ? "oklch(var(--accent))"
                  : "oklch(var(--accent) / 0.6)",
                background: "#0a0a0a",
                lineHeight: "14px",
              }}
            >
              ROI
            </span>
            <span
              className="absolute right-2 font-display text-[10px] tracking-wider px-1"
              style={{
                color: roiActive
                  ? "oklch(var(--accent))"
                  : "oklch(var(--accent) / 0.6)",
                background: "#0a0a0a",
                lineHeight: "14px",
              }}
            >
              {roiActive ? "CROSSING" : "ARMED"}
            </span>
          </div>

          {/* Dashed extension marks on each side to reinforce the horizontal ROI */}
          <div
            className="absolute left-0 right-0 pointer-events-none"
            style={{ top: "-6px", height: "14px" }}
          >
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                borderTop: roiActive
                  ? "1px dashed oklch(var(--accent) / 0.25)"
                  : "none",
                borderBottom: roiActive
                  ? "1px dashed oklch(var(--accent) / 0.25)"
                  : "none",
              }}
            />
          </div>
        </div>

        {/* Bounding boxes — only render when camera online */}
        {cameraOnline &&
          objects.map((obj) => <BoundingBox key={obj.id} obj={obj} />)}
      </div>

      {/* Corner frame marks */}
      <div className="absolute inset-0 pointer-events-none z-30">
        <div className="absolute top-0 left-0 w-6 h-6 border-t border-l border-[oklch(var(--accent)/0.4)]" />
        <div className="absolute top-0 right-0 w-6 h-6 border-t border-r border-[oklch(var(--accent)/0.4)]" />
        <div className="absolute bottom-0 left-0 w-6 h-6 border-b border-l border-[oklch(var(--accent)/0.4)]" />
        <div className="absolute bottom-0 right-0 w-6 h-6 border-b border-r border-[oklch(var(--accent)/0.4)]" />
      </div>
    </div>
  );
}

function BoundingBox({ obj }: { obj: DetectedObject }) {
  const cfg = VESSEL_CONFIG[obj.label as VesselType];
  const color = cfg.color;
  const activeBorder = obj.crossingRoi
    ? color
    : color.replace(")", " / 0.75)").replace("oklch(", "oklch(");

  return (
    <div
      className="absolute"
      style={{
        left: `${obj.x}%`,
        top: `${obj.y}%`,
        width: `${obj.w}%`,
        height: `${obj.h}%`,
        border: `1.5px solid ${activeBorder}`,
        boxShadow: obj.crossingRoi
          ? `0 0 7px ${color.replace(")", " / 0.45)").replace("oklch(", "oklch(")}`
          : "none",
      }}
    >
      {/* Label tag — below the box so it doesn't overlap with the box above */}
      <div
        className="absolute -bottom-5 left-0 flex items-center gap-1 px-1 py-0.5 whitespace-nowrap"
        style={{
          background: "rgba(8,8,8,0.88)",
          borderBottom: `1px solid ${activeBorder}`,
          borderLeft: `1px solid ${activeBorder}`,
          borderRight: `1px solid ${activeBorder}`,
        }}
      >
        <span
          className="font-display text-[8px] tracking-wider leading-none font-bold"
          style={{ color: activeBorder }}
        >
          {obj.label.toUpperCase()}
        </span>
        <span
          className="font-display text-[7px] leading-none"
          style={{ color: "oklch(var(--foreground) / 0.45)" }}
        >
          {(obj.confidence * 100).toFixed(0)}%
        </span>
      </div>

      {/* Corner ticks */}
      <div
        className="absolute top-0 left-0 w-2 h-2 border-t border-l"
        style={{ borderColor: activeBorder }}
      />
      <div
        className="absolute top-0 right-0 w-2 h-2 border-t border-r"
        style={{ borderColor: activeBorder }}
      />
      <div
        className="absolute bottom-0 left-0 w-2 h-2 border-b border-l"
        style={{ borderColor: activeBorder }}
      />
      <div
        className="absolute bottom-0 right-0 w-2 h-2 border-b border-r"
        style={{ borderColor: activeBorder }}
      />
    </div>
  );
}
