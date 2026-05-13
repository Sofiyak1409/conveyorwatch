import { Pause, Play, RotateCcw } from "lucide-react";

interface ControlStripProps {
  running: boolean;
  onStart: () => void;
  onPause: () => void;
  onReset: () => void;
}

export default function ControlStrip({
  running,
  onStart,
  onPause,
  onReset,
}: ControlStripProps) {
  return (
    <div
      className="flex items-center gap-2 px-4 py-2.5 border-t border-b border-border/40 bg-card shrink-0"
      data-ocid="controls.panel"
    >
      {/* Start */}
      <button
        type="button"
        onClick={onStart}
        disabled={running}
        className="flex items-center gap-2 px-4 py-2 border font-display text-xs tracking-widest uppercase disabled:opacity-40 disabled:cursor-not-allowed"
        style={{
          borderColor: running
            ? "oklch(var(--border)/0.3)"
            : "oklch(var(--accent))",
          color: running
            ? "oklch(var(--foreground)/0.4)"
            : "oklch(var(--accent))",
          background: running ? "transparent" : "oklch(var(--accent)/0.08)",
        }}
        data-ocid="controls.start_button"
        aria-label="Start monitoring"
      >
        <Play size={13} />
        <span>Start</span>
      </button>

      {/* Pause */}
      <button
        type="button"
        onClick={onPause}
        disabled={!running}
        className="flex items-center gap-2 px-4 py-2 border border-border/40 font-display text-xs tracking-widest uppercase text-foreground/70 hover:border-foreground/60 hover:text-foreground disabled:opacity-40 disabled:cursor-not-allowed"
        data-ocid="controls.pause_button"
        aria-label="Pause monitoring"
      >
        <Pause size={13} />
        <span>Pause</span>
      </button>

      {/* Divider */}
      <div className="w-px h-6 bg-border/30 mx-1" />

      {/* Reset Count */}
      <button
        type="button"
        onClick={onReset}
        className="flex items-center gap-2 px-4 py-2 border border-border/40 font-display text-xs tracking-widest uppercase text-foreground/70 hover:border-foreground/60 hover:text-foreground"
        data-ocid="controls.reset_button"
        aria-label="Reset batch count"
      >
        <RotateCcw size={13} />
        <span>Reset Count</span>
      </button>

      {/* Status readout */}
      <div className="ml-auto flex items-center gap-2">
        <span
          className="font-display text-[10px] tracking-widest uppercase"
          style={{
            color: running
              ? "oklch(var(--accent))"
              : "oklch(var(--muted-foreground))",
          }}
          data-ocid="controls.status_indicator"
        >
          {running ? "● MONITORING" : "○ IDLE"}
        </span>
      </div>
    </div>
  );
}
