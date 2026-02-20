import type { Config } from "./types";
import { ALL_FOUNDERS } from "@/data/founders";
import { ALL_ADVISORS } from "@/data/advisors";

export const DEFAULTS: Config = {
  // Run tab
  direction: "",
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

  // Team — all founders and advisors ON by default
  founders: ALL_FOUNDERS.map((f) => ({ ...f })),
  advisors: ALL_ADVISORS.map((a) => ({ ...a })),

  // Profile
  founderName: "Ofir Kedmi",
  founderRole: "Creative Director + Product Strategist",
  founderTime: "1 day/week",
  skills: ["Product Strategy", "UX Design", "Visual Storytelling", "AI Automation"],
  filters: ["Crypto", "Adult content", "Licensed professions"],
};
