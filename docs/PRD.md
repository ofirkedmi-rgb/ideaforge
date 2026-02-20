# IdeaForge PRD v7
## Prompt Builder for AI Business Research System

*Updated: Feb 20, 2026*

---

## 1. What Is IdeaForge

IdeaForge is a web app that configures parameters through a UI and generates a CLAUDE.md file for download. The user drops this file into `~/Projects/ai-business-research/` and runs Claude Code locally. No backend orchestration — it's a prompt assembler.

**Flow:** Configure in IdeaForge → Generate CLAUDE.md → Download → Replace in project → Run Claude Code → Decks sync to Deck Viewer

---

## 2. Architecture

```
Next.js static app (Vercel)
├── localStorage for state persistence
├── Template engine (generate-claude-md.js) renders config → markdown
├── Downloads CLAUDE.md as file
└── No API routes, no backend
```

### Key Files
| File | Purpose |
|------|---------|
| `generate-claude-md.js` | Template engine: config object → CLAUDE.md string |
| `defaults.ts` | Default config matching current production CLAUDE.md |
| Pages/components | Tab-based UI for editing config |

### Template Architecture
IdeaForge generates ONE file: `CLAUDE.md`. The other template files in the project are static and untouched:
- `/templates/pitch-deck-template.md` — HTML template for pitch decks
- `/templates/reflection-commands.md` — 5 reflection command definitions
- `/templates/ai-insights-template.md` — Insights report format

The generated CLAUDE.md references these with "Read /templates/X before doing Y" instructions.

---

## 3. Defaults System

### Reset to Defaults
A "Reset to Defaults" button is always visible (top bar or settings). Clicking it restores ALL parameters to the production defaults below. Confirmation dialog: "Reset all settings to defaults? This cannot be undone."

### Default Config (matches current production CLAUDE.md v3.4)
```typescript
const DEFAULTS: Config = {
  // Run tab
  direction: "",        // empty = no direction
  principles: [
    { id: "p1", t: "Prefer ideas where value is easy to quantify — pay $20, get $1,000", on: true },
    { id: "p2", t: "Prioritize ideas that create real impact for underserved people", on: true },
    { id: "p3", t: "Novel ideas over variations of what's already been explored", on: true },
  ],
  bizPreset: "ai_solo",
  bizType: "digital",
  bizTeam: "solo_ai",
  bizAI: "native",
  bizTouch: "self_serve",
  bizInvest: "bootstrap",
  ideasPer: 15,
  deckCut: 80,
  novelty: 70,
  mix: { trend: 6, pattern: 4, wild: 4 },
  activeTemplate: "Default",

  // Sections
  sections: {
    profile: true,
    team: true,
    scoring: true,
    feed: true,
    verticals: true,
  },

  // Verticals
  verts: [
    { id: "v1", name: "Education", w: 25, c: "#2563eb", on: true },
    { id: "v2", name: "Health/Wellness", w: 20, c: "#059669", on: true },
    { id: "v3", name: "Seniors", w: 20, c: "#7c3aed", on: true },
    { id: "v4", name: "Consumer/Family", w: 15, c: "#db2777", on: true },
    { id: "v5", name: "B2B/SaaS", w: 10, c: "#ea580c", on: true },
    { id: "v6", name: "Religion/Faith", w: 5, c: "#0891b2", on: true },
    { id: "v7", name: "Wildcard", w: 5, c: "#64748b", on: true },
  ],
  focusMode: null,

  // Scoring
  revenue: 5000,
  budget: "low",
  criteria: [
    { k: "gtm", n: "GTM Strategy", w: 30 },
    { k: "auto", n: "Automation", w: 20 },
    { k: "econ", n: "Economics", w: 20 },
    { k: "diff", n: "Differentiation", w: 15 },
    { k: "build", n: "Buildability", w: 15 },
  ],
  constraints: [
    { id: "c1", t: "No sales calls or demos", on: true },
    { id: "c2", t: "95%+ automatable", on: true },
    { id: "c3", t: "Solo founder friendly", on: true },
  ],

  // Feed
  feed: [],

  // Team — all 13 founders ON, all 7 advisors ON with default weights
  founders: ALL_FOUNDERS.map(f => ({ ...f, on: true })),
  advisors: ALL_ADVISORS.map(a => ({ ...a, on: true })),

  // Profile
  founderName: "Ofir Kedmi",
  founderRole: "Creative Director + Product Strategist",
  founderTime: "1 day/week",
  skills: ["Product Strategy", "UX Design", "Visual Storytelling", "AI Automation"],
  filters: ["Crypto", "Adult content", "Licensed professions"],
};
```

---

## 4. Empty Field / Fallback Handling

**Core rule: If a field is empty or a section is disabled, omit it cleanly from the generated CLAUDE.md. Never inject placeholder text, empty brackets, or "not set" markers.**

| Field | If Empty/Disabled | CLAUDE.md Behavior |
|-------|-------------------|-------------------|
| Direction | "" | Omit entire `## 🧭 DIRECTION` section |
| Principles | All unchecked or empty | Omit entire `## Core Principles` section |
| Profile section | Toggle OFF | Show `## Operator Profile ✗ (excluded)` — one line |
| Team section | Toggle OFF | Show `## Creative Founders ✗ (excluded)` with simplified generation instructions |
| Scoring section | Toggle OFF | Show `## Scoring ✗ (excluded)` — ideas generated but not scored |
| Feed section | Toggle OFF or 0 items | Omit entire `## Input Feed` section |
| Verticals | Toggle OFF | Omit vertical weights, system explores freely |
| Skills list | Empty | Line reads `- (General business background)` |
| Filters list | Empty | Line reads `**AVOID:** (No specific filters)` |
| Constraints | All unchecked | Only auto-generated constraints from business model remain |
| Custom verticals | 0 added | Only default verticals shown |
| Feed items | All "explored" | Omit section (no pending items) |
| Founder name | Empty | Omit name line entirely |

**Validation before generation:**
- Criteria weights must sum to 100% → show warning if not, but still generate
- Vertical weights don't need to sum to 100% → they're relative
- Mix (trend+pattern+wild) should roughly equal ideasPer → show warning if not

---

## 5. Founder Profile Behavior

### When Profile Section is ON
The operator profile influences the system in three ways:
1. **Feasibility filtering** — Time constraint ("1 day/week") shapes what's realistic
2. **Opportunity signals** — Skills create positive signals ("visual storytelling" → ideas where design is the differentiator)
3. **Background context** — Domain experience influences which verticals founders explore

### When Profile Section is OFF
- Skills, background, time constraint, and opportunity signals are ALL removed
- The system generates ideas for a generic operator
- Hard constraints (from Constraints list on Scoring tab) STILL APPLY — they are independent of the profile
- Filters (crypto, adult content, etc.) STILL APPLY — they are independent of the profile

### Why This Design
Constraints and filters are safety rails — you always want "no crypto" enforced. The profile is about personalization — sometimes you want to explore without limiting to your specific skillset. The user already sees this separation in the UI: Constraints live on Scoring tab, profile lives on Profile tab.

---

## 6. Tab Structure & Features

### Tab 1: Run & Generate
The most-changed tab. Contains everything that varies per run.

**Direction field** (top, prominent)
- Freeform textarea for natural language creative briefs
- Compass icon 🧭
- Placeholder: "What should the team focus on today?"
- When filled: card gets dark border (1.5px solid #1a1a1a)
- "Show examples" button reveals 3 pre-written directions
- Optional — leave empty for balanced exploration
- In CLAUDE.md: Injects as `## 🧭 DIRECTION` right after header, with override instruction

**Principles** (persistent across runs)
- Checklist of guiding values
- 3 defaults pre-loaded (quantifiable ROI, impact, novelty)
- Each can be toggled on/off or deleted
- Users can add custom principles
- In CLAUDE.md: `## Core Principles` section before Mission; also feeds into Quality Bonuses

**Business Model** (presets + custom)
- Preset buttons: AI Solopreneur 🤖, Side Hustle 💰, E-Commerce 📦, AI Agency 🏢, Custom ⚙️
- Each preset sets 5 parameters at once
- Parameters: Type (digital/physical/hybrid/service), Team (solo/solo+AI/small/flex), AI (native/enhanced/optional/any), Touch (self-serve/low/medium/high), Investment (bootstrap/light/moderate/flex)
- Show summary pills when collapsed; "customize" link expands detail controls
- Affects: Mission section, auto-reject rules, acquisition channels, buildability criteria

**Generation controls**
- Ideas per run (slider 5-30, default 15)
- Deck cutoff (slider 60-95%, default 80%)
- Novelty (slider 0-100%, default 70%) — labels: "Refine winners" ↔ "Explore new"

**Idea Mix**
- Trend/Pattern/Wild sliders (default 6/4/4)
- Warning badge if sum ≠ ideasPer

**Templates** (future)
- Save/load named configurations
- v1: just template name display, no save/load functionality

**Reset to Defaults button** — restores everything

### Tab 2: Verticals
- Toggle on sidebar to exclude entirely
- Weight sliders per vertical (0-50%)
- Focus Mode: click target icon → all ideas in that vertical
- Add custom verticals
- In CLAUDE.md: `## Verticals` section with distribution table or focus instruction

### Tab 3: Scoring & Goals
- Toggle on sidebar to exclude entirely
- Revenue target slider ($1K-$50K, default $5K)
- Marketing budget selector ($0/$100-500/$500-2K/$2K+)
- Criteria weight sliders (must sum to 100%)
- Constraints checklist (auto-reject rules)
- In CLAUDE.md: Criteria table with 1/3/5 descriptions, hard gates, quality bonuses/penalties

### Tab 4: Seeds & Signals (unified feed)
- Toggle on sidebar to exclude entirely
- Unified input feed (replaces old separate Seeds + Research tabs)
- 4 types: 💡 Idea, 📰 Signal, 📊 Data, 🔗 URL
- Type selector when adding new items
- Placeholder changes per type
- Status: pending/explored
- Filter row by type
- Badge on sidebar tab shows pending count
- In CLAUDE.md: `## Input Feed` section with typed items and processing rules

### Tab 5: Creative Team
- Toggle on sidebar to exclude entirely
- 13 founders grouped by category (Serial/Creative/Operator/GTM/Futurist)
- Category badges with color coding
- Toggle each founder on/off
- 7 advisors with weight sliders (0.5x-2.0x)
- VETO badge on GTM advisor
- In CLAUDE.md: Full founder personas for active founders only; advisor table with weights

### Tab 6: Founder Profile
- Toggle on sidebar to exclude entirely (see Section 5 for behavior)
- Name, Role fields
- Time availability selector
- Skills as pill tags (add/remove)
- Hard Filters as red pill tags (collapsed by default)
- In CLAUDE.md: `## Operator Profile` section with background, constraints, filters

### Tab 7: Performance (v2)
- NOT in v1 build — placeholder only
- Will contain: KPI row, optimization suggestions, vertical performance table, config history, top ideas leaderboard, reflection command shortcuts

---

## 7. Generator Engine

### Architecture
`generate-claude-md.js` exports a single function:
```typescript
function generateClaudeMD(config: Config): string
```

### Static Sections (always present, not configurable)
These come from the current CLAUDE.md and MUST be included regardless of parameter settings:

1. **System Architecture** — pipeline diagram, template references
2. **Inbox System** — folder structure, processing rules
3. **Trend Scouts** — 5 agents, daily tasks, output format
4. **Competitor Scout** — output format, saturation rules
5. **Collaborative Ideation Process** — 4 phases (when team enabled)
6. **Anti-Patterns** — things that kill innovation (when team enabled)
7. **Required Output Per Idea** — 15-item checklist
8. **GTM Advisor Deep Dive** — channel reality check, tool stacks (when scoring enabled and GTM advisor active)
9. **Iteration Protocol** — trigger, max rounds, flow
10. **Daily Execution Sequence** — pre-flight, 10-step sequence, timing
11. **Pitch Deck Generation** — TOP 6 rule, wave-based generation, validation
12. **Post-Flight Verification** — bash commands
13. **File Locations** — project root, paths, DO NOT rules
14. **Daily Report Format** — complete template
15. **Idea Memory System** — files, deduplication rules
16. **Execution Commands** — daily, manual, insights, reflection

### Configurable Sections (driven by parameters)
1. **Direction** — from direction field
2. **Core Principles** — from principles list
3. **Mission** — composed from business model params + revenue + budget
4. **Novelty Setting** — from novelty slider
5. **Operator Profile** — from profile fields (or excluded)
6. **Input Feed** — from feed items (or omitted)
7. **Founder Personas** — only active founders, full detail
8. **Idea Mix** — from mix sliders
9. **Verticals** — from vert weights or focus mode (or excluded)
10. **Advisor Panel** — active advisors with weights
11. **Scoring Criteria** — from criteria weights, with descriptions adapted to business model
12. **Hard Gates** — adapted to business model (self-serve vs low-touch changes rules)
13. **Quality Bonuses** — adapted to principles (quantifiable ROI → +10% bonus)
14. **Auto-Reject Rules** — composed from business model + constraints

### Business Model Cascading Effects
Changing the business model affects multiple sections:

| Parameter Change | Sections Affected |
|-----------------|-------------------|
| Type → physical | Mission, Trend Scouts (add supply chain), Acquisition channels (add Amazon/Etsy), Output per idea (add inventory), Required tools |
| Team → small | Mission, Constraints (remove "solo friendly"), Output per idea (add team roles) |
| AI → enhanced | Mission, Scoring (rename "Automation" → "AI Advantage"), Output per idea (change automation focus) |
| Touch → medium | Mission, Auto-reject (remove "no sales calls"), Acquisition (allow outreach), Hard gates (relax) |
| Invest → moderate | Mission, Constraints (change budget cap), Buildability criteria (adjust threshold) |

---

## 8. Data Model

```typescript
interface Config {
  // Run
  direction: string;
  principles: Principle[];
  bizPreset: string;
  bizType: "digital" | "physical" | "hybrid" | "service";
  bizTeam: "solo" | "solo_ai" | "small" | "flex";
  bizAI: "native" | "enhanced" | "optional" | "none";
  bizTouch: "self_serve" | "low" | "medium" | "high";
  bizInvest: "bootstrap" | "light" | "moderate" | "flex";
  ideasPer: number;
  deckCut: number;
  novelty: number;
  mix: { trend: number; pattern: number; wild: number };
  activeTemplate: string;

  // Sections
  sections: {
    profile: boolean;
    team: boolean;
    scoring: boolean;
    feed: boolean;
    verticals: boolean;
  };

  // Verticals
  verts: Vertical[];
  focusMode: string | null;

  // Scoring
  revenue: number;
  budget: "zero" | "low" | "medium" | "high";
  criteria: Criterion[];
  constraints: Constraint[];

  // Feed
  feed: FeedItem[];

  // Team
  founders: Founder[];
  advisors: Advisor[];

  // Profile
  founderName: string;
  founderRole: string;
  founderTime: string;
  skills: string[];
  filters: string[];
}

interface Principle { id: string; t: string; on: boolean; }
interface Vertical { id: string; name: string; w: number; c: string; on: boolean; }
interface Criterion { k: string; n: string; w: number; }
interface Constraint { id: string; t: string; on: boolean; }
interface FeedItem { id: string; t: string; type: "idea"|"signal"|"data"|"url"; vertical: string|null; status: "pending"|"explored"; }
interface Founder { id: string; name: string; role: string; cat: string; power: string; lens: string; asks: string[]; bg: string; knows?: string[]; on: boolean; }
interface Advisor { id: string; name: string; w: number; focus: string; on: boolean; c: string; veto: boolean; }
```

---

## 9. Build Phases

### Phase 0: Project Setup
- Next.js + TypeScript + Tailwind
- Design system (colors, typography, components)
- Layout shell (top bar, sidebar, main area)

### Phase 1: Defaults & State
- Define DEFAULTS constant with all default values
- localStorage persistence (save on change, load on mount)
- Reset to Defaults function with confirmation

### Phase 2: Generator Engine
- Port `generate-claude-md.js` to TypeScript
- Unit tests: default config produces valid output
- Unit tests: empty fields produce clean output
- Unit tests: business model presets produce correct cascading
- Download function (blob URL → file download)
- Copy to clipboard function

### Phase 3: Run Tab
- Direction field with examples
- Principles checklist
- Business Model presets + detail controls
- Generation controls (ideas, cutoff, novelty)
- Idea Mix sliders
- Template selector (display only for v1)
- Reset to Defaults button

### Phase 4: Verticals Tab
- Vertical list with weight sliders
- Focus Mode toggle
- Add custom verticals
- Section toggle

### Phase 5: Scoring Tab
- Revenue target slider
- Budget selector
- Criteria weight sliders with sum validation
- Constraints checklist
- Section toggle

### Phase 6: Seeds & Signals Tab
- Unified feed list with type tags
- Add new items with type selector
- Status toggle (pending/explored)
- Filter by type
- Section toggle

### Phase 7: Creative Team Tab
- Founder list grouped by category
- Toggle each founder
- Advisor list with weight sliders
- Section toggle

### Phase 8: Founder Profile Tab
- Name, Role fields
- Time selector
- Skills pill tags
- Filters pill tags
- Section toggle

### Phase 9: Preview & Download
- Preview modal showing generated CLAUDE.md
- Syntax highlighting (optional)
- Download button (generates file)
- Copy button (clipboard)
- Section indicators (✓/✗) in preview

### Phase 10: Polish
- Sidebar summary panel (key stats)
- Top bar status (excluded sections warning)
- Responsive layout
- Loading states
- Error handling

### Phase 11: Performance Tab (v2)
- Placeholder in v1
- Future: KPIs, optimization suggestions, config history

---

## 10. File Structure

```
ideaforge/
├── app/
│   ├── layout.tsx
│   └── page.tsx              ← Main app (single page)
├── components/
│   ├── ui/                   ← Design system primitives
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   ├── Checkbox.tsx
│   │   ├── Pill.tsx
│   │   ├── Slider.tsx
│   │   └── Mono.tsx
│   ├── layout/
│   │   ├── TopBar.tsx
│   │   ├── Sidebar.tsx
│   │   └── TabContent.tsx
│   ├── tabs/
│   │   ├── RunTab.tsx
│   │   ├── VerticalsTab.tsx
│   │   ├── ScoringTab.tsx
│   │   ├── FeedTab.tsx
│   │   ├── TeamTab.tsx
│   │   ├── ProfileTab.tsx
│   │   └── PerformanceTab.tsx
│   └── modals/
│       └── PreviewModal.tsx
├── lib/
│   ├── defaults.ts           ← Default config constant
│   ├── generate-claude-md.ts ← Template engine
│   ├── types.ts              ← TypeScript interfaces
│   └── storage.ts            ← localStorage helpers
├── data/
│   └── founders.ts           ← Full founder persona data
└── public/
```

---

## 11. Design System

### Typography
- Primary: DM Sans (400, 500, 600, 700, 800)
- Mono: JetBrains Mono (for numbers, code)

### Colors
- Background: #f5f6f8
- Cards: #ffffff
- Borders: #e5e7eb
- Text primary: #1a1a1a
- Text secondary: #555
- Text muted: #999
- Active/Primary: #1a1a1a (black)
- Success: #059669
- Warning: #ea580c / #f59e0b
- Error: #dc2626
- Verticals: each has assigned color from COLORS array

### Components
- Cards with collapsible headers
- Pill tags with optional remove button
- Toggle checkboxes with color
- Range sliders with accent color
- Section toggle buttons (✓/✗) on sidebar
- Warning banners for excluded sections

---

## 12. Key Decisions Log

| Decision | Rationale |
|----------|-----------|
| Direction field > custom instructions per vertical | More natural for cross-vertical themes; clearer hierarchy |
| Unified feed > separate Seeds + Research | Same pipeline destination; simpler UX |
| Principles > hardcoded values | Configurable values that shape generation, not just scoring |
| Novelty slider | Direct control over convergence vs exploration |
| Business Model presets | Complex parameter relationships simplified into named archetypes |
| Profile OFF keeps constraints | Safety rails (no crypto, no sales) should always apply |
| Template files stay static | IdeaForge generates only CLAUDE.md; pitch deck format doesn't change |
| Foundation research = simple toggle (future) | Daily trends drive high performers more than foundation context |
| Performance tab = v2 | Needs real run data to be useful; placeholder for now |
| Reset to Defaults always available | Users need escape hatch when experimenting |
| Empty fields = clean omission | No confusing placeholder text in generated output |
