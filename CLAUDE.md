# IdeaForge
Prompt builder web app that generates CLAUDE.md files for the AI Business Research System. Users configure parameters through a visual UI, click "Generate," and download a ready-to-use prompt file.

## Tech Stack
- Next.js 15 / React 19 / TypeScript (strict mode)
- Tailwind CSS (no component library — custom design system)
- localStorage for state persistence
- No backend, no API routes, no database
- Deployed on Vercel as static export

## Commands
```bash
npm run dev       # Start dev server (port 3000)
npm run build     # Production build + static export
npm run lint      # ESLint + TypeScript type-check
npm run test      # Vitest unit tests
```

## Architecture
```
src/
├── app/
│   ├── layout.tsx              # Root layout (fonts, meta)
│   └── page.tsx                # Single page app — renders <IdeaForge />
├── components/
│   ├── ui/                     # Design system primitives
│   │   ├── Button.tsx
│   │   ├── Card.tsx            # Collapsible card with header
│   │   ├── Checkbox.tsx        # Toggle checkbox with color
│   │   ├── Pill.tsx            # Tag pill with optional remove
│   │   ├── Slider.tsx          # Range slider with label + value
│   │   ├── Mono.tsx            # Monospace number display
│   │   └── Banner.tsx          # Warning/info banners
│   ├── layout/
│   │   ├── TopBar.tsx          # Logo, template name, run button, reset
│   │   ├── Sidebar.tsx         # Tab navigation + section toggles + summary
│   │   └── TabContent.tsx      # Tab content wrapper
│   ├── tabs/
│   │   ├── RunTab.tsx          # Direction, principles, biz model, generation, mix
│   │   ├── VerticalsTab.tsx    # Vertical weights, focus mode
│   │   ├── ScoringTab.tsx      # Revenue, budget, criteria, constraints
│   │   ├── FeedTab.tsx         # Unified seeds & signals input feed
│   │   ├── TeamTab.tsx         # Founders (13) + Advisors (7)
│   │   ├── ProfileTab.tsx      # Operator profile, skills, filters
│   │   └── PerformanceTab.tsx  # Placeholder for v2
│   └── modals/
│       ├── PreviewModal.tsx    # Shows generated CLAUDE.md with copy/download
│       └── ResetConfirm.tsx    # Confirmation dialog for reset
├── lib/
│   ├── types.ts                # All TypeScript interfaces
│   ├── defaults.ts             # DEFAULTS constant — the starting config
│   ├── generate-claude-md.ts   # Template engine: Config → markdown string
│   ├── storage.ts              # localStorage save/load helpers
│   └── download.ts             # File download utility (blob URL)
├── data/
│   ├── founders.ts             # 13 founder personas with full detail
│   └── advisors.ts             # 7 advisor definitions
└── hooks/
    └── useConfig.ts            # Central config state hook + persistence
```

## Code Conventions
- Server Components by default; `'use client'` only when state/interactivity needed
- All tab components are client components (they manage state)
- UI primitives are stateless — state lives in parent tab or useConfig hook
- One source of truth: `useConfig()` hook provides config + setters + reset
- Config auto-saves to localStorage on every change (debounced 500ms)
- No external UI library — all components custom-built per design system
- Use `cn()` utility for conditional class merging (tiny helper, not clsx)
- Colors, fonts, spacing defined in tailwind.config.ts — no inline magic numbers
- Generator function is pure: `(Config) => string` with no side effects

## Design System
- Font primary: DM Sans (400, 500, 600, 700, 800)
- Font mono: JetBrains Mono (numbers, code preview)
- Background: #f5f6f8 | Cards: #ffffff | Borders: #e5e7eb
- Text: #1a1a1a / #555 / #999
- Active: #1a1a1a (black) | Success: #059669 | Warning: #ea580c | Error: #dc2626
- Cards: 12px radius, 1px border, collapsible with chevron
- Buttons: 7px radius, 12px font, 600 weight
- No emojis in UI chrome — only in data content (founder categories, feed types)

## Key Design Decisions
- IdeaForge generates ONE file: CLAUDE.md. Template files (pitch-deck, reflections, insights) are static.
- Empty fields = clean omission from output (never "not set" or empty brackets)
- Profile OFF still keeps constraints/filters active (they're safety rails)
- Business model presets cascade through: mission, constraints, scoring, channels
- Principles inject into both Core Principles section AND Quality Bonuses in scoring
- Novelty slider controls explicit instructions about exploration vs refinement

## Generator Engine (lib/generate-claude-md.ts)
- Pure function: `generateClaudeMD(config: Config): string`
- Produces 700-850 line markdown file depending on config
- Reference implementation exists: `docs/reference/generate-claude-md.js`
- Visual prototype for all tabs/components: `docs/reference/ideaforge-prototype.jsx` (React artifact — use as design reference, not as code to copy)
- Static sections always included: trend scouts, competitor scout, daily execution, pitch deck generation, file locations, idea memory, commands
- Configurable sections driven by config: direction, principles, mission, novelty, profile, feed, founders, verticals, scoring, quality bonuses

## GitHub Workflow
- Branch: `main` for stable, feature branches for each phase
- Commit after each completed task in plan.md
- Tag releases: `v0.1.0` (scaffold), `v0.2.0` (generator), `v0.3.0` (run tab), etc.
- Push to GitHub after each phase completion

## Current Status
Phase: Pre-build (planning complete)
See plan.md for task breakdown.
See docs/PRD.md for full requirements.
See docs/reference/ for prototype and generator reference code.
