# Design Brief

**Purpose**: Industrial factory monitoring dashboard for real-time conveyor tracking, object detection, and analytics visualization. Designed for factory floor operators who need large, instantly readable metrics visible from distance.

**Tone**: Tactical military HUD aesthetic—utilitarian, high-contrast, instrumentation-grade precision. No softness, no decoration. Evokes military targeting displays and aircraft cockpit instruments.

**Visual Direction**: Dark olive near-black background (oklch(0.08 0.015 100)) with warm undertone creates gritty tactical atmosphere. Amber-orange primary (oklch(0.72 0.19 55)) dominates metrics and active detection states. Teal secondary (oklch(0.68 0.15 195)) highlights ROI indicators and secondary data. Off-white foreground (oklch(0.93 0.01 80)) ensures long-distance factory-floor readability. All elements use 1px tactical borders; flat design with no shadows or animations.

**Differentiation**: Military instrument panel — purposeful color hierarchy (amber = active/critical metrics, teal = secondary tracking, red = alerts only), monospace metrics at display scale, industrial grid structure. Every design choice serves clarity from distance under factory lighting.

**Color Palette**

| Token | OKLCH | Purpose |
|---|---|---|
| background | 0.08 0.015 100 | Dark olive near-black; tactical base |
| foreground | 0.93 0.01 80 | Warm off-white; factory-floor visibility |
| card | 0.11 0.015 100 | Lifted olive surface; tactical separation |
| primary (amber) | 0.72 0.19 55 | Active metrics, main count, detection highlights |
| secondary (teal) | 0.68 0.15 195 | ROI line, secondary detection, tracking |
| destructive | 0.6 0.22 25 | Alert red (used sparingly) |
| chart-1 | 0.72 0.19 55 | Main metric line (amber) |
| chart-2 to 5 | 0.68–0.45 | Teal, orange-red, muted yellows for secondary data |
| border | 0.22 0.01 100 | Dark olive; tactical 1px separators |
| muted-foreground | 0.5 0.01 80 | Warm grey for secondary labels |

**Typography**

- Display: JetBrainsMono (monospace; metrics at 3xl+, factory-visible from distance, instrumentation precision)
- Body: DMSans (clean geometric sans-serif; label clarity, factory signage legibility)
- Mono: JetBrainsMono (technical data, confidence/FPS values)

**Shape Language**

- Border radius: 1px (minimal, utilitarian)
- Borders: 1px dark olive throughout (tactical mechanical separation)
- Shadows: None (flat tactical aesthetic)
- Spacing: Dense, functional

**Structural Zones**

| Zone | Treatment |
|---|---|
| Header/Status | bg-card, 1px border-b; status indicator (online/offline) |
| Main Content | bg-background; 70/30 split (camera feed + metrics panel) |
| Camera Feed | bg-background; bounding boxes with amber active, teal secondary; ROI band (teal) |
| Metrics Panel | bg-card; Total Count (3xl amber), Current Rate, Batch Count, Camera Status, FPS, Detection Confidence |
| Controls Strip | bg-card, 1px border-t/b; Start, Pause, Reset buttons (amber highlights on active) |
| Analytics Section | bg-card; amber main metric line, teal secondary, industrial grid, no color gradients |

**Component Patterns**

- **Metric Display**: monospace (JetBrainsMono) at 3xl+, amber for primary, foreground text on card background
- **Bounding Boxes**: 1px amber for active vessel, 1px teal for secondary type, labels in monospace
- **ROI Line**: 2px teal horizontal band with subtle glow effect (tactical targeting indicator)
- **Buttons**: bg-card, 1px border, white text, amber border + fill on focus/active state
- **Chart Line**: amber for primary metric, teal for secondary, industrial thin grid

**Motion**

None. All UI static. Conveyor animation only (operator expectation).

**Constraints**

- No gradients
- No animations except canvas conveyor feed
- No soft shadows or blur
- All interactive elements: 1px tactical border + focus state
- Amber reserved for active/critical metrics and highlights
- Teal reserved for secondary tracking and ROI
- Red reserved for alerts only
- Maximum contrast for factory-floor distance readability

**Signature Detail**

Tactical military HUD aesthetic: dark olive background, amber-orange metrics dominating visual hierarchy, teal secondary tracking, monospace display fonts, 1px borders throughout. Industrial instrumentation precision—designed for operators who need data clarity from 10+ feet away under factory lighting.
