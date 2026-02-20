/** A guiding principle that shapes idea generation and scoring. */
export interface Principle {
  id: string;
  t: string;
  on: boolean;
}

/** A vertical market with weight distribution. */
export interface Vertical {
  id: string;
  name: string;
  w: number;
  c: string;
  on: boolean;
}

/** A scoring criterion with weight. */
export interface Criterion {
  k: string;
  n: string;
  w: number;
}

/** A hard constraint (auto-reject rule). */
export interface Constraint {
  id: string;
  t: string;
  on: boolean;
}

/** An input feed item (idea seed, signal, data point, or URL). */
export interface FeedItem {
  id: string;
  t: string;
  type: "idea" | "signal" | "data" | "url";
  vertical: string | null;
  status: "pending" | "explored";
}

/** A creative founder persona. */
export interface Founder {
  id: string;
  name: string;
  role: string;
  cat: "serial" | "creative" | "operator" | "gtm" | "futurist";
  power: string;
  lens: string;
  asks: string[];
  bg: string;
  knows?: string[];
  on: boolean;
}

/** An advisor with scoring weight. */
export interface Advisor {
  id: string;
  name: string;
  w: number;
  focus: string;
  on: boolean;
  c: string;
  veto: boolean;
}

/** Section toggle states. */
export interface Sections {
  profile: boolean;
  team: boolean;
  scoring: boolean;
  feed: boolean;
  verticals: boolean;
}

/** Idea mix distribution. */
export interface Mix {
  trend: number;
  pattern: number;
  wild: number;
}

/** Business model parameter types. */
export type BizType = "digital" | "physical" | "hybrid" | "service";
export type BizTeam = "solo" | "solo_ai" | "small" | "flex";
export type BizAI = "native" | "enhanced" | "optional" | "none";
export type BizTouch = "self_serve" | "low" | "medium" | "high";
export type BizInvest = "bootstrap" | "light" | "moderate" | "flex";
export type Budget = "zero" | "low" | "medium" | "high";

/** The complete IdeaForge configuration. */
export interface Config {
  // Run tab
  direction: string;
  principles: Principle[];
  bizPreset: string;
  bizType: BizType;
  bizTeam: BizTeam;
  bizAI: BizAI;
  bizTouch: BizTouch;
  bizInvest: BizInvest;
  ideasPer: number;
  deckCut: number;
  novelty: number;
  mix: Mix;
  activeTemplate: string;

  // Sections
  sections: Sections;

  // Verticals
  verts: Vertical[];
  focusMode: string | null;

  // Scoring
  revenue: number;
  budget: Budget;
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
