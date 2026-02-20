# IdeaForge Build Plan

> **How to execute:** Use the prompts in `prompts.md` — one prompt per phase. Each prompt runs all tasks in that phase, commits after each, and stops at the review checkpoint (🔍) for your approval. See `prompts.md` for the exact copy-paste prompts.

## Status Legend
- `[ ]` — Not started
- `[~]` — In progress
- `[x]` — Complete
- `[!]` — Blocked / needs input
- `🔍` — Code review checkpoint
- `📦` — Git commit point
- `🏷️` — Git tag (version release)

---

## Phase 0: Project Setup
> **Goal:** Empty folder → running Next.js app with correct structure

- [x] **Task 0.1:** Initialize project
  - Create Next.js 15 app with TypeScript, Tailwind, App Router
  - Set up `tsconfig.json` with strict mode
  - Verify `npm run dev` serves blank page on localhost:3000
  - 📦 Commit: `feat: initial project scaffold`

- [x] **Task 0.2:** Set up folder structure
  - Create all directories: `components/ui`, `components/layout`, `components/tabs`, `components/modals`, `lib`, `data`, `hooks`, `docs`, `docs/reference`
  - Create placeholder `index.ts` barrel exports where needed
  - 📦 Commit: `chore: set up folder structure`

- [x] **Task 0.3:** GitHub setup
  - Initialize git repo (if not done)
  - Create `.gitignore` (node_modules, .next, .env)
  - Create GitHub repo: `ideaforge`
  - Push initial commit to `main`
  - 📦 Commit + Push: `chore: github setup`

- [x] **Task 0.4:** Install fonts & configure Tailwind
  - Add DM Sans + JetBrains Mono via next/font
  - Configure `tailwind.config.ts` with custom colors, fonts, spacing
  - Set up global CSS with base styles (background, font smoothing)
  - 📦 Commit: `style: configure design tokens and fonts`

- 🔍 **Review 0:** Run `npm run build` — should compile with zero errors. Check that dev server renders. Verify folder structure matches CLAUDE.md architecture.
- 🏷️ Tag: `v0.1.0` — Project scaffold complete
- 📦 Push to GitHub

> **Phase 0 Log (2026-02-20):**
> Completed all 4 tasks. Used Next.js 16.1.6, React 19.2.3, Tailwind CSS 4, TypeScript 5.
> Decision: Used Tailwind v4 CSS-based `@theme` configuration instead of `tailwind.config.ts` (v4 approach).
> Decision: Used `next/font/google` for DM Sans + JetBrains Mono (better performance than CDN).
> Decision: Used `.gitkeep` files for empty directories instead of barrel `index.ts` exports (cleaner for now).
> Decision: Added `cn()` utility in `lib/cn.ts` for conditional class merging.
> Review: Build passes with zero errors, folder structure matches CLAUDE.md.
> Commits: cb596cb, 1660a84, 6de8206, 12c4269

---

## Phase 1: Design System & UI Primitives
> **Goal:** Reusable component library ready for all tabs

- [x] **Task 1.1:** Build `Button` component
  - Variants: default, primary, ghost, success
  - Props: `active`, `small`, `onClick`, `children`
  - Styling matches prototype: 7px radius, 12px font, 600 weight
  - 📦 Commit: `feat: Button component`

- [x] **Task 1.2:** Build `Card` component
  - Collapsible with chevron animation
  - Props: `title`, `icon`, `badge`, `defaultCollapsed`, `children`
  - Badge with custom bg/color
  - 📦 Commit: `feat: Card component`

- [x] **Task 1.3:** Build remaining primitives
  - `Checkbox` — colored toggle with checkmark SVG
  - `Pill` — tag with optional remove button
  - `Slider` — range input with label, value display, accent color
  - `Mono` — monospace number display
  - `Banner` — warning/info/excluded section messages
  - 📦 Commit: `feat: UI primitives (Checkbox, Pill, Slider, Mono, Banner)`

- [x] **Task 1.4:** Build layout components
  - `TopBar` — logo, template name, reset button, generate button
  - `Sidebar` — tab navigation with section toggles, summary panel
  - `TabContent` — wrapper with consistent padding
  - Main layout: sticky top bar, sticky sidebar, scrollable main
  - 📦 Commit: `feat: layout components`

- [x] **Task 1.5:** Create style guide page (temporary)
  - Route: `/styleguide`
  - Shows all UI primitives with different states
  - Verify visual consistency with prototype
  - 📦 Commit: `feat: style guide page`

- 🔍 **Review 1:** Visual inspection against prototype (ideaforge-v7.jsx). Check responsive behavior. Verify all interactive states (hover, active, disabled). Fix any styling inconsistencies.
- 📦 Commit fixes: `fix: design system review fixes`
- 🏷️ Tag: `v0.2.0` — Design system complete
- 📦 Push to GitHub

> **Phase 1 Log (2026-02-20):**
> Completed all 5 tasks. Built 7 UI primitives + 3 layout components + Icons library + style guide.
> Decision: Created shared Icons.tsx component with all SVG icons from prototype (28 icons).
> Decision: Built IdeaForge.tsx as the main shell component (client component with tab state).
> Decision: Pill and Banner are server-compatible (no state); Button, Card, Checkbox, Slider need "use client".
> Review: Build passes, all components compile, /styleguide route works.
> Commits: d55958d, fd13ade, 8897d3d, 4da111c, 2d95976

---

## Phase 2: Data Layer & Generator Engine
> **Goal:** Config state management + working CLAUDE.md generation

- [x] **Task 2.1:** Define TypeScript types
  - All interfaces in `lib/types.ts`: Config, Principle, Vertical, Criterion, Constraint, FeedItem, Founder, Advisor
  - Export everything with JSDoc comments
  - 📦 Commit: `feat: TypeScript type definitions`

- [x] **Task 2.2:** Create defaults + data files
  - `lib/defaults.ts` — DEFAULTS constant matching production CLAUDE.md
  - `data/founders.ts` — All 13 founder personas with full detail
  - `data/advisors.ts` — All 7 advisor definitions
  - Verify defaults match Section 3 of PRD exactly
  - 📦 Commit: `feat: defaults and persona data`

- [x] **Task 2.3:** Port generator engine to TypeScript
  - Port `docs/reference/generate-claude-md.js` → `lib/generate-claude-md.ts`
  - Add proper typing to the function
  - No logic changes — straight port
  - 📦 Commit: `feat: generator engine (TypeScript port)`

- [x] **Task 2.4:** Write generator tests
  - Test: default config produces valid markdown (700+ lines)
  - Test: empty direction → no direction section
  - Test: all principles off → no principles section
  - Test: profile section off → excluded marker only
  - Test: feed empty → no feed section
  - Test: business model preset changes cascade correctly
  - Test: criteria weights appear in scoring table
  - Test: static sections always present (trend scouts, file locations, etc.)
  - 📦 Commit: `test: generator engine unit tests`

- [x] **Task 2.5:** Build `useConfig` hook + localStorage persistence
  - Central state hook: returns config object + individual setters + reset function
  - Auto-save to localStorage on change (debounced 500ms)
  - Load from localStorage on mount (with DEFAULTS fallback)
  - `resetToDefaults()` clears localStorage and restores DEFAULTS
  - 📦 Commit: `feat: config state hook with persistence`

- [x] **Task 2.6:** Build download utility
  - `lib/download.ts` — generates blob URL, triggers download
  - Filename: `CLAUDE.md`
  - Also: copy-to-clipboard function
  - 📦 Commit: `feat: download and clipboard utilities`

- 🔍 **Review 2:** Run all tests. Generate CLAUDE.md with default config and manually compare against `docs/reference/CLAUDE-default.md`. Check that empty fields produce clean output. Verify localStorage save/load cycle.
- 📦 Commit fixes: `fix: generator review fixes`
- 🏷️ Tag: `v0.3.0` — Generator engine complete
- 📦 Push to GitHub

> **Phase 2 Log (2026-02-20):**
> Completed all 6 tasks. 27 unit tests passing.
> Generator produces 874-line TypeScript file, straight port from reference JS.
> Decision: Used Vitest v4 (latest) for testing, configured with path aliases.
> Decision: useConfig hook uses generic `set(key, value)` pattern for flexibility.
> Decision: storage.ts has try/catch for SSR safety and private browsing.
> Review: All 27 tests pass, build compiles, types are strict.
> Commits: 989ce3f, 38cd8ac, 0d69351, d3c7d6b, dbb9044, e0b1478

---

## Phase 3: Run Tab (Core UI)
> **Goal:** The most important tab — direction, principles, business model, generation controls

- [ ] **Task 3.1:** Build Direction field
  - Compass icon, textarea, placeholder
  - Dark border when filled, clear button
  - "Show examples" toggle with 3 pre-written directions
  - 📦 Commit: `feat: Direction field`

- [ ] **Task 3.2:** Build Principles card
  - Checklist with toggle, delete, add new
  - 3 defaults pre-loaded
  - Heart icon, active count badge
  - 📦 Commit: `feat: Principles card`

- [ ] **Task 3.3:** Build Business Model card
  - Preset buttons (AI Solopreneur, Side Hustle, E-Commerce, AI Agency, Custom)
  - Summary pills when collapsed
  - "Customize" expands 5 parameter rows
  - Preset selection auto-sets all 5 params
  - 📦 Commit: `feat: Business Model card with presets`

- [ ] **Task 3.4:** Build Generation + Idea Mix cards
  - Ideas per run slider (5-30)
  - Deck cutoff slider (60-95%)
  - Novelty slider (0-100%) with "Refine ↔ Explore" labels
  - Idea Mix: trend/pattern/wild sliders with sum badge
  - 📦 Commit: `feat: Generation and Idea Mix controls`

- [ ] **Task 3.5:** Build Templates card (display only)
  - Template name buttons with active indicator
  - No save/load in v1 — just visual
  - 📦 Commit: `feat: Templates card (display only)`

- [ ] **Task 3.6:** Wire Run Tab to useConfig
  - All controls read from and write to config state
  - Changes auto-persist to localStorage
  - Reset button restores defaults with confirmation
  - 📦 Commit: `feat: wire Run Tab to config state`

- 🔍 **Review 3:** Test every control on Run tab. Change business model preset → verify pills update. Fill direction → verify card border changes. Toggle principles → verify count badge. Change novelty → check label text changes. Click reset → verify all controls restore. Check preview to see changes reflected in output.
- 📦 Commit fixes: `fix: Run tab review fixes`
- 🏷️ Tag: `v0.4.0` — Run tab complete
- 📦 Push to GitHub

---

## Phase 4: Verticals Tab
> **Goal:** Vertical weight distribution and focus mode

- [ ] **Task 4.1:** Build Verticals tab
  - Vertical list with colored checkboxes, weight sliders (0-50%)
  - Focus Mode target button per vertical
  - Add custom vertical input
  - Sum badge (warning if not 100%)
  - Section toggle integration (excluded banner when off)
  - Wire to useConfig
  - 📦 Commit: `feat: Verticals tab`

- 🔍 **Review 4:** Toggle verticals on/off → verify weights update. Enter Focus Mode → verify UI changes. Add custom vertical → verify it persists. Check generated output reflects vertical config.
- 📦 Commit fixes: `fix: Verticals tab review`
- 📦 Push to GitHub

---

## Phase 5: Scoring Tab
> **Goal:** Revenue targets, criteria weights, constraints

- [ ] **Task 5.1:** Build Scoring tab
  - Revenue target slider ($1K-$50K) with quick-select buttons
  - Budget selector (4 options)
  - Criteria weight sliders with names + sum validation
  - Constraints checklist (toggle, delete, add new)
  - Section toggle integration
  - Wire to useConfig
  - 📦 Commit: `feat: Scoring tab`

- 🔍 **Review 5:** Adjust criteria weights → verify sum badge. Add/remove constraints → verify persistence. Check generated CLAUDE.md scoring section reflects config.
- 📦 Commit fixes: `fix: Scoring tab review`
- 📦 Push to GitHub

---

## Phase 6: Seeds & Signals Tab
> **Goal:** Unified input feed for ideas, signals, data, URLs

- [ ] **Task 6.1:** Build Feed tab
  - Feed item list with type emoji, status badge, delete
  - Type filter row (All / 💡 / 📰 / 📊 / 🔗)
  - Add new: type selector, textarea with dynamic placeholder, submit
  - Pending count badge on sidebar tab
  - Section toggle integration
  - Wire to useConfig
  - 📦 Commit: `feat: Seeds & Signals tab`

- 🔍 **Review 6:** Add items of each type → verify type tags. Filter by type → verify list updates. Delete items → verify removal. Check generated CLAUDE.md feed section reflects config.
- 📦 Commit fixes: `fix: Feed tab review`
- 🏷️ Tag: `v0.5.0` — Core tabs complete
- 📦 Push to GitHub

---

## Phase 7: Creative Team Tab
> **Goal:** Configure 13 founders and 7 advisors

- [ ] **Task 7.1:** Build Team tab
  - Founders grouped by category with colored badges
  - Toggle each founder on/off
  - Active count badge
  - Advisors with weight sliders (0.5x-2.0x) and VETO badge
  - Section toggle integration
  - Wire to useConfig
  - 📦 Commit: `feat: Creative Team tab`

- 🔍 **Review 7:** Toggle founders → verify count updates. Adjust advisor weights → verify persistence. Toggle team section off → verify generated CLAUDE.md shows simplified generation.
- 📦 Commit fixes: `fix: Team tab review`
- 📦 Push to GitHub

---

## Phase 8: Founder Profile Tab
> **Goal:** Operator profile with skills, filters, time

- [ ] **Task 8.1:** Build Profile tab
  - Name + Role text inputs
  - Time availability selector (buttons)
  - Skills as pill tags (add/remove)
  - Hard Filters as red pill tags (collapsed by default)
  - Section toggle integration
  - Wire to useConfig
  - 📦 Commit: `feat: Founder Profile tab`

- 🔍 **Review 8:** Add/remove skills → verify pills update. Toggle profile off → verify constraints still appear in generated CLAUDE.md. Check the full generated output for correct profile section.
- 📦 Commit fixes: `fix: Profile tab review`
- 📦 Push to GitHub

---

## Phase 9: Preview & Generate Flow
> **Goal:** The money feature — preview and download working CLAUDE.md

- [ ] **Task 9.1:** Build Preview modal
  - Full-screen modal with backdrop blur
  - Shows generated CLAUDE.md as formatted code
  - Scroll container with monospace font
  - Section indicators (✓/✗) visible
  - 📦 Commit: `feat: Preview modal`

- [ ] **Task 9.2:** Build Generate + Download flow
  - "Generate CLAUDE.md" button in bottom bar calls generator
  - Triggers file download as `CLAUDE.md`
  - "Copy" button copies to clipboard with feedback
  - "Preview" button opens preview modal
  - Bottom bar: sticky, always visible
  - 📦 Commit: `feat: Generate and Download flow`

- [ ] **Task 9.3:** Build Reset to Defaults
  - Confirmation dialog: "Reset all settings to defaults?"
  - Calls `resetToDefaults()` from useConfig
  - Visual feedback after reset
  - 📦 Commit: `feat: Reset to Defaults with confirmation`

- 🔍 **Review 9 (CRITICAL):** This is the full integration test. Go through this checklist:
  1. Default config → Generate → Download → open file → verify matches reference CLAUDE-default.md
  2. Change direction → Generate → verify direction appears in output
  3. Change business model to Side Hustle → Generate → verify mission, constraints, channels change
  4. Toggle off Team section → Generate → verify simplified founders section
  5. Toggle off Profile → Generate → verify constraints still present
  6. Add feed items → Generate → verify they appear
  7. Set novelty to 20% → Generate → verify "REFINE MODE" instruction
  8. Empty all optional fields → Generate → verify clean output (no empty brackets)
  9. Reset to Defaults → verify everything restores
  10. Close browser, reopen → verify config persisted from localStorage
- 📦 Commit fixes: `fix: integration review fixes`
- 🏷️ Tag: `v0.9.0` — Feature complete
- 📦 Push to GitHub

---

## Phase 10: Polish & Deploy
> **Goal:** Production-ready quality

- [ ] **Task 10.1:** Sidebar summary panel
  - Key stats: target revenue, ideas per run, novelty %, pending feed items
  - Direction preview (truncated)
  - Active model display
  - 📦 Commit: `feat: sidebar summary panel`

- [ ] **Task 10.2:** Top bar polish
  - Excluded sections warning badge
  - Template name display
  - Clean generate button
  - 📦 Commit: `feat: top bar polish`

- [ ] **Task 10.3:** Edge cases & error handling
  - Criteria weights sum ≠ 100% → show warning, still generate
  - Mix sum ≠ ideasPer → show warning
  - Very long direction text → handle gracefully
  - No founders active → show warning in team tab
  - 📦 Commit: `fix: edge case handling`

- [ ] **Task 10.4:** Performance check
  - Verify no unnecessary re-renders (React.memo where needed)
  - localStorage debounce working correctly
  - Generator function executes < 50ms
  - 📦 Commit: `perf: optimize rendering and persistence`

- [ ] **Task 10.5:** Deploy to Vercel
  - Set up Vercel project
  - Configure static export in `next.config.ts`
  - Deploy and verify production build
  - 📦 Commit: `chore: Vercel deployment config`

- 🔍 **Review 10 (Final):** Full walkthrough on production URL. Test on mobile (responsive). Test fresh browser (no localStorage). Generate 3 different configs (default, side hustle, e-commerce) and verify all outputs are correct and usable.
- 📦 Commit fixes: `fix: final review polish`
- 🏷️ Tag: `v1.0.0` — Production release
- 📦 Push to GitHub

---

## Phase 11: Performance Tab (v2 — future)
> **Goal:** Analytics-driven optimization suggestions

- [ ] **Task 11.1:** Performance tab placeholder → real implementation
  - KPI row: total runs, avg score, greenlit count
  - Optimization suggestions based on config analysis
  - Vertical performance table
  - Config change history
  - Top ideas leaderboard

*Not part of v1 build. Requires real run data to be useful.*

---

## Quick Reference

| Phase | Tasks | Est. Time | Milestone |
|-------|-------|-----------|-----------|
| 0 | Setup | 30 min | Running app |
| 1 | UI Kit | 2 hr | Design system |
| 2 | Engine | 2 hr | Working generator |
| 3 | Run Tab | 2 hr | Core UI |
| 4 | Verticals | 45 min | Distribution |
| 5 | Scoring | 45 min | Criteria |
| 6 | Feed | 45 min | Input system |
| 7 | Team | 45 min | Personas |
| 8 | Profile | 30 min | Operator |
| 9 | Preview | 1.5 hr | **End-to-end working** |
| 10 | Polish | 1.5 hr | **Production** |
