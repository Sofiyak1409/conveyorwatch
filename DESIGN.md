# Design Brief

**Purpose**: Industrial factory monitoring dashboard for real-time conveyor tracking, object detection, and analytics visualization. Designed for factory floor operators who need large, instantly readable metrics visible from distance.

**Tone**: Utilitarian brutalism — functional, purposeful, mechanical precision. No decoration, no softness.

**Visual Direction**: Factory instrumentation aesthetic. Near-black background (0.08 L), pure white text for maximum contrast and long-distance readability, surgical green for healthy detection states, clinical red reserved for errors only. All cards rendered with 1px white borders for mechanical visual separation. Hard edges (minimal border radius: 2px), stark grid structure.

**Differentiation**: Uncompromising industrial UI that prioritizes operator clarity and factory-floor usability over any design flourish. Metrics dominate layout. Green accent used sparingly and surgically only for detection success states. No animations, no gradients, no soft shadows.

**Color Palette**

| Token | OKLCH | Purpose |
|---|---|---|
| background | 0.08 0 0 | Near-total black; factory environment |
| foreground | 0.98 0 0 | Pure white; maximum contrast, long-distance readability |
| card | 0.12 0 0 | Elevated dark grey; mechanical separation via 1px white border |
| accent (success) | 0.68 0.25 142 | Surgical green for healthy detections only |
| destructive (error) | 0.60 0.24 25 | Alarm red; used sparingly for errors/alerts only |
| chart-1 | 0.68 0.25 142 | Matches accent green; primary detection metric |
| chart-2 to 5 | 0.40–0.50 0 0 | Industrial greys for secondary data |
| border | 0.98 0 0 | Pure white; 1px mechanical separators |

**Typography**

- Display: JetBrainsMono (monospace; metrics rendered at 3xl+, visible from distance, instrumentation precision)
- Body: DMSans (clean geometric sans-serif; factory signage legibility, label clarity)
- Mono: JetBrainsMono (technical data, code-like values)

**Shape Language**

- Border radius: 2px (minimal, utilitarian)
- Borders: 1px white throughout (mechanical separation)
- Shadows: None (flat, industrial aesthetic)
- Spacing: Dense, functional (not generous)

**Structural Zones**

| Zone | Treatment |
|---|---|
| Header/Status Bar | bg-card with 1px white border-b; foreground text; minimal padding |
| Main Content (Camera + Metrics) | bg-background; 70/30 split layout; left camera feed with ROI visualization, right data panel |
| Controls Strip | bg-card with 1px white border-t/b; horizontal button layout; minimal height |
| Analytics Section | bg-card with 1px white border-t; clean grid lines, no color gradients in chart |
| Footer | Optional; bg-card with 1px white border-t if present |

**Component Patterns**

- **Metric Cards**: bg-card, 1px white border, padding-6, monospace text at 3xl
- **Buttons**: bg-card, 1px white border, white text, no hover shadow (use border-accent on focus/active)
- **Data Labels**: font-body (DMSans), 0.75rem–0.875rem, all-caps or minimal case
- **Chart Grid**: 0.5px white gridlines; clean, industrial appearance
- **ROI Indicator**: 1–2px green border or solid green band; no animation

**Motion**

None. All UI is static. Transitions occur in real-time video feed only (operator expectations).

**Constraints**

- No gradients anywhere
- No animations or micro-interactions
- No soft shadows or blur effects
- Maximum contrast for factory-floor visibility
- All interactive elements must have 1px white border and focus state
- Green accent reserved for success/detection states only
- Red reserved for errors/alerts; use sparingly

**Signature Detail**

1px white borders on all cards and interactive elements. Monospace metrics at display size (3xl+, visible from distance). Green accent surgical and purposeful. Industrial utilitarian aesthetic — every design choice serves operator clarity and factory-floor usability.
