import { useState } from "react";

// ── Icons (compact) ──
const I = {
  Play: () => <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21"/></svg>,
  Plus: () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>,
  X: () => <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>,
  User: () => <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>,
  Users: () => <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/></svg>,
  Scale: () => <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M16 16l3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1zM2 16l3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1z"/><path d="M7 21h10M12 3v18M3 7h2c2 0 5-1 7-2 2 1 5 2 7 2h2"/></svg>,
  Sparkle: () => <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 3l1.912 5.813a2 2 0 001.275 1.275L21 12l-5.813 1.912a2 2 0 00-1.275 1.275L12 21l-1.912-5.813a2 2 0 00-1.275-1.275L3 12l5.813-1.912a2 2 0 001.275-1.275L12 3z"/></svg>,
  Search: () => <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>,
  Lightbulb: () => <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18h6M10 22h4M15.09 14c.18-.98.65-1.74 1.41-2.5A4.65 4.65 0 0018 8 6 6 0 006 8c0 1 .23 2.23 1.5 3.5A4.61 4.61 0 018.91 14"/></svg>,
  Target: () => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>,
  Zap: () => <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10"/></svg>,
  Dollar: () => <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/></svg>,
  Ban: () => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="4.93" y1="4.93" x2="19.07" y2="19.07"/></svg>,
  Settings: () => <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z"/></svg>,
  Trash: () => <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2"/></svg>,
  ChevDown: () => <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="6 9 12 15 18 9"/></svg>,
  Layers: () => <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="12 2 2 7 12 12 22 7"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg>,
  Shuffle: () => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="16 3 21 3 21 8"/><line x1="4" y1="20" x2="21" y2="3"/><polyline points="21 16 21 21 16 21"/><line x1="15" y1="15" x2="21" y2="21"/><line x1="4" y1="4" x2="9" y2="9"/></svg>,
  Award: () => <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="8" r="7"/><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"/></svg>,
  TrendUp: () => <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>,
  Calendar: () => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>,
  Save: () => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 21H5a2 2 0 01-2-2V5a2 2 0 012-2h11l5 5v11a2 2 0 01-2 2z"/><polyline points="17 21 17 13 7 13 7 21"/><polyline points="7 3 7 8 15 8"/></svg>,
  Eye: () => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>,
  Download: () => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>,
  Compass: () => <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" fill="currentColor" opacity="0.15" stroke="currentColor"/></svg>,
  BarChart: () => <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>,
  Check: () => <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="20 6 9 17 4 12"/></svg>,
  AlertCircle: () => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>,
  Box: () => <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg>,
  Heart: () => <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/></svg>,
  Inbox: () => <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="22 12 16 12 14 15 10 15 8 12 2 12"/><path d="M5.45 5.11L2 12v6a2 2 0 002 2h16a2 2 0 002-2v-6l-3.45-6.89A2 2 0 0016.76 4H7.24a2 2 0 00-1.79 1.11z"/></svg>,
};

// ── UI Primitives ──
const Pill = ({ text, onRemove, color = "#1a1a1a" }) => <span style={{ display: "inline-flex", alignItems: "center", gap: "4px", padding: "2px 9px", borderRadius: "100px", background: color + "10", color, fontSize: "11px", fontWeight: 600, border: `1px solid ${color}18` }}>{text}{onRemove && <button onClick={onRemove} style={{ background: "none", border: "none", cursor: "pointer", color, opacity: 0.4, padding: 0, display: "flex" }}><I.X /></button>}</span>;
const Btn = ({ children, onClick, variant = "default", active, small, style: sx }) => { const s = { default: ["#f5f5f5","#333","#e5e5e5"], primary: ["#1a1a1a","#fff","#1a1a1a"], ghost: ["transparent","#888","transparent"] }[variant] || ["#f5f5f5","#333","#e5e5e5"]; return <button onClick={onClick} style={{ display: "inline-flex", alignItems: "center", gap: "4px", padding: small ? "3px 8px" : "5px 11px", borderRadius: "7px", fontSize: small ? "11px" : "12px", fontWeight: 600, fontFamily: "'DM Sans',sans-serif", background: active ? "#1a1a1a" : s[0], color: active ? "#fff" : s[1], border: `1px solid ${active ? "#1a1a1a" : s[2]}`, cursor: "pointer", transition: "all .15s", whiteSpace: "nowrap", ...sx }}>{children}</button>; };
const Mono = ({ children, color, size }) => <span style={{ fontFamily: "'JetBrains Mono',monospace", fontWeight: 700, color: color || "#1a1a1a", fontSize: size }}>{children}</span>;
const Chk = ({ checked, onChange, color = "#1a1a1a" }) => <button onClick={onChange} style={{ width: "15px", height: "15px", borderRadius: "3px", border: `2px solid ${checked ? color : "#ccc"}`, background: checked ? color : "transparent", cursor: "pointer", flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>{checked && <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="4"><polyline points="20 6 9 17 4 12"/></svg>}</button>;
const Card = ({ title, icon, children, badge, defaultCollapsed }) => { const [open, setOpen] = useState(!defaultCollapsed); return (<div style={{ background: "#fff", borderRadius: "12px", border: "1px solid #e5e7eb" }}><button onClick={() => setOpen(!open)} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "11px 16px", width: "100%", background: "none", border: "none", borderBottom: open ? "1px solid #f0f0f0" : "none", cursor: "pointer", textAlign: "left" }}><div style={{ display: "flex", alignItems: "center", gap: "7px" }}>{icon && <span style={{ color: "#94a3b8" }}>{icon}</span>}<span style={{ fontSize: "13px", fontWeight: 700 }}>{title}</span>{badge && <span style={{ fontSize: "10px", fontWeight: 700, padding: "1px 7px", borderRadius: "100px", background: badge.bg || "#f0f0f0", color: badge.color || "#666", fontFamily: "'JetBrains Mono',monospace" }}>{badge.text}</span>}</div><span style={{ color: "#ccc", transform: open ? "rotate(0)" : "rotate(-90deg)", transition: "transform .15s" }}><I.ChevDown /></span></button>{open && <div style={{ padding: "12px 16px" }}>{children}</div>}</div>); };

// ── Data ──
const FOUNDERS = [
  { id: "maya", name: "Maya Chen", cat: "serial", power: "Pattern recognition", on: true },
  { id: "derek", name: "Derek Kim", cat: "serial", power: "Unit economics", on: true },
  { id: "nina", name: "Nina Patel", cat: "creative", power: "UX gaps → products", on: true },
  { id: "alex", name: "Alex Rivera", cat: "creative", power: "Engagement loops", on: true },
  { id: "sam", name: "Sam Torres", cat: "creative", power: "Hidden audiences", on: true },
  { id: "jordan", name: "Jordan Lee", cat: "creative", power: "Behavioral econ", on: true },
  { id: "riley", name: "Riley Park", cat: "operator", power: "Acquisition at scale", on: true },
  { id: "casey", name: "Casey Morgan", cat: "operator", power: "Ops automation", on: true },
  { id: "priya", name: "Priya Shah", cat: "gtm", power: "Paid + AI creative", on: true },
  { id: "marcus", name: "Marcus Johnson", cat: "gtm", power: "Organic growth", on: true },
  { id: "zoe", name: "Zoe Williams", cat: "gtm", power: "Viral + freemium", on: true },
  { id: "tony", name: "Tony Vasquez", cat: "gtm", power: "Launch sequencing", on: true },
  { id: "kai", name: "Kai Nakamura", cat: "futurist", power: "Signals → products", on: true },
];
const ADVISORS = [
  { id: "skeptic", name: "Skeptic", w: 1.5, focus: "Fatal flaws", on: true, c: "#dc2626", veto: false },
  { id: "gtm", name: "GTM Advisor", w: 1.5, focus: "Go-to-market", on: true, c: "#ea580c", veto: true },
  { id: "growth", name: "Growth", w: 1.3, focus: "Acquisition", on: true, c: "#16a34a", veto: false },
  { id: "economist", name: "Economist", w: 1.3, focus: "Unit economics", on: true, c: "#2563eb", veto: false },
  { id: "pragmatist", name: "Pragmatist", w: 1.2, focus: "Ops reality", on: true, c: "#7c3aed", veto: false },
  { id: "tech", name: "Technologist", w: 1.0, focus: "Buildability", on: true, c: "#0891b2", veto: false },
  { id: "advocate", name: "Advocate", w: 0.8, focus: "Protect ideas", on: true, c: "#65a30d", veto: false },
];
const VERTS = [
  { id: 1, name: "Education", w: 25, c: "#2563eb", on: true }, { id: 2, name: "Health/Wellness", w: 20, c: "#059669", on: true },
  { id: 3, name: "Seniors", w: 20, c: "#7c3aed", on: true }, { id: 4, name: "Consumer/Family", w: 15, c: "#db2777", on: true },
  { id: 5, name: "B2B/SaaS", w: 10, c: "#ea580c", on: true }, { id: 6, name: "Religion/Faith", w: 5, c: "#0891b2", on: true },
  { id: 7, name: "Wildcard", w: 5, c: "#64748b", on: true },
];
const CATMETA = { serial: { l: "SERIAL", bg: "#fef3c7", c: "#92400e" }, creative: { l: "CREATIVE", bg: "#ede9fe", c: "#5b21b6" }, operator: { l: "OPERATORS", bg: "#ecfdf5", c: "#065f46" }, gtm: { l: "GTM", bg: "#fce7f3", c: "#9d174d" }, futurist: { l: "FUTURIST", bg: "#e0f2fe", c: "#075985" } };
const COLORS = ["#2563eb","#059669","#7c3aed","#db2777","#ea580c","#0891b2","#64748b"];
const EXAMPLE_DIRS = ["AI-enhanced side hustles — Amazon FBA, POD, dropshipping.", "Tools for aging parents managing elderly care remotely.", "Boring B2B workflows people hate. The uglier, the better."];
const BIZ_PRESETS = [
  { k: "ai_solo", l: "AI Solopreneur", emoji: "🤖", config: { type: "digital", team: "solo_ai", ai: "native", touch: "self_serve", invest: "bootstrap" } },
  { k: "side_hustle", l: "Side Hustle", emoji: "💰", config: { type: "hybrid", team: "solo_ai", ai: "enhanced", touch: "low", invest: "light" } },
  { k: "ecommerce", l: "E-Commerce", emoji: "📦", config: { type: "physical", team: "solo_ai", ai: "enhanced", touch: "low", invest: "moderate" } },
  { k: "agency", l: "AI Agency", emoji: "🏢", config: { type: "digital", team: "small", ai: "enhanced", touch: "medium", invest: "light" } },
  { k: "custom", l: "Custom", emoji: "⚙️", config: null },
];

// Feed item type config
const FEED_TYPES = {
  idea: { emoji: "💡", label: "Idea", color: "#f59e0b" },
  signal: { emoji: "📰", label: "Signal", color: "#2563eb" },
  data: { emoji: "📊", label: "Data", color: "#7c3aed" },
  url: { emoji: "🔗", label: "URL", color: "#059669" },
};

export default function IdeaForgeV7() {
  const [tab, setTab] = useState("run");
  const [founders, setFounders] = useState(FOUNDERS);
  const [advisors, setAdvisors] = useState(ADVISORS);
  const [verts, setVerts] = useState(VERTS);
  const [focusMode, setFocusMode] = useState(null);
  const [newVert, setNewVert] = useState("");
  const [mix, setMix] = useState({ trend: 6, pattern: 4, wild: 4 });
  const [revenue, setRevenue] = useState(5000);
  const [budget, setBudget] = useState("low");
  const [criteria, setCriteria] = useState([{ k: "gtm", n: "GTM Strategy", w: 30 }, { k: "auto", n: "Automation", w: 20 }, { k: "econ", n: "Economics", w: 20 }, { k: "diff", n: "Differentiation", w: 15 }, { k: "build", n: "Buildability", w: 15 }]);
  const [constraints, setConstraints] = useState([{ id: 1, t: "No sales calls or demos", on: true }, { id: 2, t: "95%+ automatable", on: true }, { id: 3, t: "Solo founder friendly", on: true }]);
  const [newCon, setNewCon] = useState("");
  const [skills, setSkills] = useState(["Product Strategy", "UX Design", "Visual Storytelling", "AI Automation"]);
  const [newSkill, setNewSkill] = useState("");
  const [filters, setFilters] = useState(["Crypto", "Adult content", "Licensed professions"]);
  const [newFilter, setNewFilter] = useState("");
  const [founderTime, setFounderTime] = useState("1 day/week");
  const [ideasPer, setIdeasPer] = useState(15);
  const [deckCut, setDeckCut] = useState(80);
  const [running, setRunning] = useState(false);
  const [prog, setProg] = useState(0);
  const [stage, setStage] = useState("");
  const [activeTemplate, setActiveTemplate] = useState("Default Daily Run");
  const [showPreview, setShowPreview] = useState(false);
  const [direction, setDirection] = useState("");
  const [showExamples, setShowExamples] = useState(false);
  const [sections, setSections] = useState({ profile: true, team: true, scoring: true, feed: true, verticals: true });
  const toggleSection = k => setSections({ ...sections, [k]: !sections[k] });

  // Business model
  const [bizPreset, setBizPreset] = useState("ai_solo");
  const [bizType, setBizType] = useState("digital");
  const [bizTeam, setBizTeam] = useState("solo_ai");
  const [bizAI, setBizAI] = useState("native");
  const [bizTouch, setBizTouch] = useState("self_serve");
  const [bizInvest, setBizInvest] = useState("bootstrap");
  const [showBizDetails, setShowBizDetails] = useState(false);
  const applyPreset = (k) => { setBizPreset(k); const p = BIZ_PRESETS.find(b => b.k === k); if (p?.config) { setBizType(p.config.type); setBizTeam(p.config.team); setBizAI(p.config.ai); setBizTouch(p.config.touch); setBizInvest(p.config.invest); setShowBizDetails(false); } else setShowBizDetails(true); };

  // ★ Principles (persistent values across runs)
  const [principles, setPrinciples] = useState([
    { id: 1, t: "Prefer ideas where value is easy to quantify — pay $20, get $1,000", on: true },
    { id: 2, t: "Prioritize ideas that create real impact for underserved people", on: true },
    { id: 3, t: "Novel ideas over variations of what's already been explored", on: true },
  ]);
  const [newPrinciple, setNewPrinciple] = useState("");

  // ★ Novelty control
  const [novelty, setNovelty] = useState(70); // 0 = iterate on winners, 100 = max exploration

  // ★ Unified Feed (merged seeds + research)
  const [feed, setFeed] = useState([
    { id: 1, t: "AI homework helper for parents", type: "idea", vertical: "Education", status: "pending" },
    { id: 2, t: "Rising demand for AI tutoring in rural areas", type: "signal", vertical: "Education", status: "pending" },
    { id: 3, t: "73M freelancers in US, growing 15% YoY", type: "data", vertical: "B2B/SaaS", status: "pending" },
    { id: 4, t: "Shopify UCP launch enables AI shopping agents", type: "signal", vertical: "AI Commerce", status: "explored" },
  ]);
  const [newFeedText, setNewFeedText] = useState("");
  const [newFeedType, setNewFeedType] = useState("idea");

  const run = () => { setRunning(true); setProg(0); const st = ["Scanning…","Brainstorming…","Scoring…","Decks…","✓ Done"]; let i = 0; const iv = setInterval(() => { if (i < st.length) { setStage(st[i]); setProg(((i+1)/st.length)*100); i++; } else clearInterval(iv); }, 1100); };
  const tw = verts.filter(v => v.on).reduce((s, v) => s + v.w, 0);
  const cw = criteria.reduce((s, c) => s + c.w, 0);
  const tm = mix.trend + mix.pattern + mix.wild;
  const pendingFeed = feed.filter(f => f.status === "pending").length;

  const TABS = [
    { k: "run", l: "Run & Generate", i: <I.Zap />, toggle: null },
    { k: "verticals", l: "Verticals", i: <I.Layers />, toggle: "verticals" },
    { k: "scoring", l: "Scoring & Goals", i: <I.Scale />, toggle: "scoring" },
    { k: "feed", l: "Seeds & Signals", i: <I.Inbox />, toggle: "feed" },
    { k: "team", l: "Creative Team", i: <I.Users />, toggle: "team" },
    { k: "profile", l: "Founder Profile", i: <I.User />, toggle: "profile" },
    { k: "perf", l: "Performance", i: <I.BarChart />, toggle: null },
  ];

  const ExcludedBanner = ({ msg }) => <div style={{ padding: "10px 14px", borderRadius: "9px", background: "#fef3c7", border: "1px solid #fde68a", fontSize: "12px", color: "#92400e", fontWeight: 600, display: "flex", alignItems: "center", gap: "6px" }}><I.AlertCircle /> {msg || "Excluded from prompt."}</div>;

  return (
    <div style={{ minHeight: "100vh", background: "#f5f6f8", fontFamily: "'DM Sans',sans-serif" }}>
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600;700&display=swap" rel="stylesheet" />

      {/* Top Bar */}
      <div style={{ background: "#fff", borderBottom: "1px solid #e5e7eb", padding: "0 20px", display: "flex", alignItems: "center", justifyContent: "space-between", height: "50px", position: "sticky", top: 0, zIndex: 100 }}>
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}><div style={{ width: "26px", height: "26px", borderRadius: "7px", background: "#1a1a1a", display: "flex", alignItems: "center", justifyContent: "center", color: "white" }}><I.Sparkle /></div><span style={{ fontSize: "15px", fontWeight: 800, letterSpacing: "-0.03em" }}>IdeaForge</span></div>
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          {Object.values(sections).some(v => !v) && <span style={{ fontSize: "10px", color: "#ea580c", fontWeight: 600 }}>⚠ {Object.values(sections).filter(v => !v).length} excluded</span>}
          <span style={{ fontSize: "11px", color: "#999" }}>{activeTemplate}</span>
          {running ? <div style={{ display: "flex", alignItems: "center", gap: "6px" }}><div style={{ width: "70px", height: "4px", borderRadius: "2px", background: "#e5e7eb", overflow: "hidden" }}><div style={{ width: `${prog}%`, height: "100%", borderRadius: "2px", background: prog === 100 ? "#059669" : "#1a1a1a", transition: "width .5s" }} /></div><span style={{ fontSize: "11px", color: "#666" }}>{stage}</span></div>
          : <button onClick={run} style={{ display: "flex", alignItems: "center", gap: "5px", padding: "7px 16px", borderRadius: "8px", fontSize: "12px", fontWeight: 700, background: "#1a1a1a", color: "#fff", border: "none", cursor: "pointer" }}><I.Play /> Run</button>}
        </div>
      </div>

      <div style={{ display: "flex", maxWidth: "1100px", margin: "0 auto", padding: "14px 20px", gap: "14px" }}>
        {/* Sidebar */}
        <div style={{ width: "180px", flexShrink: 0 }}>
          <div style={{ position: "sticky", top: "64px" }}>
            {TABS.map(t => (
              <div key={t.k} style={{ display: "flex", alignItems: "center", marginBottom: "2px" }}>
                <button onClick={() => setTab(t.k)} style={{ display: "flex", alignItems: "center", gap: "7px", padding: "8px 10px", borderRadius: t.toggle ? "8px 0 0 8px" : "8px", border: "none", background: tab === t.k ? "#1a1a1a" : "transparent", color: tab === t.k ? "#fff" : "#555", fontSize: "12px", fontWeight: 600, cursor: "pointer", textAlign: "left", flex: 1, transition: "all .15s", opacity: t.toggle && !sections[t.toggle] ? 0.45 : 1 }}>
                  <span style={{ opacity: tab === t.k ? 1 : 0.5 }}>{t.i}</span>{t.l}
                  {t.k === "feed" && pendingFeed > 0 && <span style={{ fontSize: "9px", fontWeight: 700, padding: "0 5px", borderRadius: "100px", background: tab === t.k ? "#fff" : "#f59e0b", color: tab === t.k ? "#1a1a1a" : "#fff", marginLeft: "auto" }}>{pendingFeed}</span>}
                </button>
                {t.toggle && <button onClick={() => toggleSection(t.toggle)} style={{ width: "26px", height: "36px", borderRadius: "0 8px 8px 0", border: "none", background: tab === t.k ? (sections[t.toggle] ? "#059669" : "#6b7280") : (sections[t.toggle] ? "#ecfdf5" : "#f5f5f5"), cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", color: tab === t.k ? "#fff" : (sections[t.toggle] ? "#059669" : "#ccc"), transition: "all .15s" }}>{sections[t.toggle] ? <I.Check /> : <I.X />}</button>}
              </div>
            ))}
            <div style={{ height: "1px", background: "#e5e7eb", margin: "10px 0" }} />
            <div style={{ padding: "10px 12px", borderRadius: "8px", background: "#fff", border: "1px solid #e5e7eb", fontSize: "11px" }}>
              {[["Target", `$${revenue.toLocaleString()}/mo`], ["Ideas", ideasPer], ["Novelty", `${novelty}%`], ["Feed", `${pendingFeed} pending`]].map(([k, v]) => (
                <div key={k} style={{ display: "flex", justifyContent: "space-between", padding: "1px 0", color: "#666" }}><span>{k}</span><Mono size="11px">{v}</Mono></div>
              ))}
              {direction && <div style={{ marginTop: "5px", paddingTop: "5px", borderTop: "1px solid #f0f0f0", fontSize: "10px", color: "#ea580c", fontWeight: 600, lineHeight: 1.3 }}>🧭 {direction.substring(0, 50)}…</div>}
            </div>
          </div>
        </div>

        {/* Main */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "10px" }}>

          {/* ═══ RUN ═══ */}
          {tab === "run" && (<>
            {/* Direction */}
            <div style={{ background: "#fff", borderRadius: "14px", border: direction ? "1.5px solid #1a1a1a" : "1.5px solid #e5e7eb", overflow: "hidden" }}>
              <div style={{ padding: "14px 18px 0" }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "8px" }}><div style={{ display: "flex", alignItems: "center", gap: "8px" }}><I.Compass /><span style={{ fontSize: "14px", fontWeight: 800 }}>Direction</span>{!direction && <span style={{ fontSize: "10px", color: "#999" }}>Optional</span>}</div>{direction && <button onClick={() => setDirection("")} style={{ background: "none", border: "none", cursor: "pointer", color: "#ccc", fontSize: "11px", display: "flex", alignItems: "center", gap: "3px" }}><I.X /> Clear</button>}</div>
                <textarea value={direction} onChange={e => setDirection(e.target.value)} placeholder="What should the team focus on today?" rows={direction ? 3 : 2} style={{ width: "100%", padding: "10px 12px", borderRadius: "8px", border: "1px solid #e8e8e8", fontSize: "13px", lineHeight: 1.5, resize: "none", outline: "none", boxSizing: "border-box", background: "#f8f9fb", fontFamily: "'DM Sans',sans-serif" }} />
              </div>
              <div style={{ padding: "6px 18px 10px" }}><button onClick={() => setShowExamples(!showExamples)} style={{ background: "none", border: "none", cursor: "pointer", fontSize: "11px", color: "#999", display: "flex", alignItems: "center", gap: "4px" }}><I.Lightbulb /> Examples</button>{showExamples && <div style={{ display: "flex", flexDirection: "column", gap: "3px", marginTop: "5px" }}>{EXAMPLE_DIRS.map((ex, i) => <button key={i} onClick={() => { setDirection(ex); setShowExamples(false); }} style={{ textAlign: "left", padding: "6px 10px", borderRadius: "7px", background: "#f8f9fb", border: "1px solid #eee", cursor: "pointer", fontSize: "11px", color: "#555" }}>{ex}</button>)}</div>}</div>
            </div>

            {/* ★ Principles */}
            <Card title="Principles" icon={<I.Heart />} badge={{ text: `${principles.filter(p => p.on).length} active`, bg: "#fce7f3", color: "#9d174d" }}>
              <div style={{ fontSize: "10px", color: "#999", marginBottom: "6px" }}>Persistent values. These carry across every run and shape which ideas get generated.</div>
              {principles.map(p => (
                <div key={p.id} style={{ display: "flex", alignItems: "center", gap: "7px", padding: "4px 0" }}>
                  <Chk checked={p.on} onChange={() => setPrinciples(principles.map(x => x.id === p.id ? { ...x, on: !x.on } : x))} color="#db2777" />
                  <span style={{ flex: 1, fontSize: "12px", color: p.on ? "#333" : "#bbb" }}>{p.t}</span>
                  <button onClick={() => setPrinciples(principles.filter(x => x.id !== p.id))} style={{ background: "none", border: "none", cursor: "pointer", color: "#ddd" }}><I.Trash /></button>
                </div>
              ))}
              <div style={{ display: "flex", gap: "6px", marginTop: "4px" }}><input value={newPrinciple} onChange={e => setNewPrinciple(e.target.value)} onKeyDown={e => { if (e.key === "Enter" && newPrinciple.trim()) { setPrinciples([...principles, { id: Date.now(), t: newPrinciple.trim(), on: true }]); setNewPrinciple(""); }}} placeholder="Add a guiding principle…" style={{ flex: 1, padding: "5px 10px", borderRadius: "6px", border: "1px solid #e5e5e5", fontSize: "12px", outline: "none" }} /><Btn onClick={() => { if (newPrinciple.trim()) { setPrinciples([...principles, { id: Date.now(), t: newPrinciple.trim(), on: true }]); setNewPrinciple(""); }}} small><I.Plus /></Btn></div>
            </Card>

            {/* Business Model */}
            <Card title="Business Model" icon={<I.Box />} badge={{ text: BIZ_PRESETS.find(p => p.k === bizPreset)?.l }}>
              <div style={{ display: "flex", gap: "5px", flexWrap: "wrap", marginBottom: showBizDetails ? "8px" : "0" }}>
                {BIZ_PRESETS.map(p => <button key={p.k} onClick={() => applyPreset(p.k)} style={{ padding: "6px 12px", borderRadius: "8px", background: bizPreset === p.k ? "#1a1a1a" : "#fafafa", color: bizPreset === p.k ? "#fff" : "#333", border: `1.5px solid ${bizPreset === p.k ? "#1a1a1a" : "#e8e8e8"}`, cursor: "pointer", fontSize: "11px", fontWeight: 700 }}>{p.emoji} {p.l}</button>)}
              </div>
              {!showBizDetails && bizPreset !== "custom" && <div style={{ display: "flex", gap: "4px", flexWrap: "wrap", marginTop: "6px" }}><Pill text={{ digital: "Digital", physical: "Physical", hybrid: "Hybrid", service: "Service" }[bizType]} color="#2563eb" /><Pill text={{ solo: "Solo", solo_ai: "Solo+AI", small: "2-3 ppl", flex: "Any" }[bizTeam]} color="#7c3aed" /><Pill text={{ native: "AI-native", enhanced: "AI-enhanced", optional: "AI-optional", none: "Any" }[bizAI]} color="#059669" /><button onClick={() => setShowBizDetails(true)} style={{ fontSize: "10px", color: "#999", background: "none", border: "none", cursor: "pointer", textDecoration: "underline" }}>customize</button></div>}
              {showBizDetails && (<div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                {[["TYPE", bizType, setBizType, [["digital","💻 Digital"],["physical","📦 Physical"],["hybrid","🔄 Hybrid"],["service","🤝 Service"]]],
                  ["TEAM", bizTeam, setBizTeam, [["solo","👤 Solo"],["solo_ai","🤖 Solo+AI"],["small","👥 2-3"],["flex","🔓 Any"]]],
                  ["AI", bizAI, setBizAI, [["native","🧠 95%+"],["enhanced","⚡ Enhanced"],["optional","🔧 Optional"],["none","🔓 Any"]]],
                  ["TOUCH", bizTouch, setBizTouch, [["self_serve","🖥 Self-serve"],["low","✉️ Low"],["medium","📞 Medium"],["high","🤝 High"]]],
                  ["INVEST", bizInvest, setBizInvest, [["bootstrap","🪙 <$500"],["light","💵 $500-5K"],["moderate","💰 $5K-25K"],["flex","🔓 Any"]]]
                ].map(([label, val, setVal, opts]) => (
                  <div key={label}><div style={{ fontSize: "9px", fontWeight: 700, color: "#999", marginBottom: "3px" }}>{label}</div><div style={{ display: "flex", gap: "3px" }}>{opts.map(([k, l]) => <button key={k} onClick={() => { setVal(k); setBizPreset("custom"); }} style={{ padding: "3px 8px", borderRadius: "6px", fontSize: "10px", fontWeight: 600, background: val === k ? "#1a1a1a" : "#fafafa", color: val === k ? "#fff" : "#555", border: `1px solid ${val === k ? "#1a1a1a" : "#e8e8e8"}`, cursor: "pointer" }}>{l}</button>)}</div></div>
                ))}
              </div>)}
            </Card>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
              <Card title="Generation" icon={<I.Settings />}>
                <div style={{ marginBottom: "8px" }}><div style={{ display: "flex", justifyContent: "space-between", marginBottom: "2px" }}><span style={{ fontSize: "11px", fontWeight: 600, color: "#888" }}>Ideas per run</span><Mono>{ideasPer}</Mono></div><input type="range" min="5" max="30" value={ideasPer} onChange={e => setIdeasPer(parseInt(e.target.value))} style={{ width: "100%", accentColor: "#1a1a1a" }} /></div>
                <div style={{ marginBottom: "8px" }}><div style={{ display: "flex", justifyContent: "space-between", marginBottom: "2px" }}><span style={{ fontSize: "11px", fontWeight: 600, color: "#888" }}>Deck cutoff</span><Mono>{deckCut}%</Mono></div><input type="range" min="60" max="95" value={deckCut} onChange={e => setDeckCut(parseInt(e.target.value))} style={{ width: "100%", accentColor: "#1a1a1a" }} /></div>
                {/* ★ Novelty slider */}
                <div><div style={{ display: "flex", justifyContent: "space-between", marginBottom: "2px" }}><span style={{ fontSize: "11px", fontWeight: 600, color: "#888" }}>Novelty vs. Iteration</span><Mono color={novelty >= 70 ? "#059669" : novelty >= 40 ? "#1a1a1a" : "#ea580c"}>{novelty}%</Mono></div><input type="range" min="0" max="100" value={novelty} onChange={e => setNovelty(parseInt(e.target.value))} style={{ width: "100%", accentColor: novelty >= 70 ? "#059669" : "#ea580c" }} /><div style={{ display: "flex", justifyContent: "space-between", fontSize: "9px", color: "#bbb" }}><span>Refine winners</span><span>Explore new</span></div></div>
              </Card>
              <Card title="Idea Mix" icon={<I.Shuffle />} badge={{ text: `${tm}`, bg: tm !== ideasPer ? "#fef3c7" : "#ecfdf5", color: tm !== ideasPer ? "#92400e" : "#065f46" }}>
                {[{ k: "trend", l: "🔥 Trend", c: "#ea580c" }, { k: "pattern", l: "🎯 Pattern", c: "#2563eb" }, { k: "wild", l: "🎲 Wild", c: "#7c3aed" }].map(m => <div key={m.k} style={{ display: "flex", alignItems: "center", gap: "8px", padding: "4px 0" }}><span style={{ fontSize: "12px", fontWeight: 600, minWidth: "68px" }}>{m.l}</span><input type="range" min="0" max="10" value={mix[m.k]} onChange={e => setMix({ ...mix, [m.k]: parseInt(e.target.value) })} style={{ flex: 1, accentColor: m.c }} /><Mono color={m.c}>{mix[m.k]}</Mono></div>)}
              </Card>
            </div>
            <Card title="Templates" icon={<I.Calendar />}>
              <div style={{ display: "flex", gap: "5px", flexWrap: "wrap" }}>{["Default Daily Run", "Side Hustle AI", "Impact Focus", "E-Commerce"].map(t => <button key={t} onClick={() => setActiveTemplate(t)} style={{ padding: "4px 10px", borderRadius: "7px", background: activeTemplate === t ? "#f0fdf4" : "#fafafa", border: `1.5px solid ${activeTemplate === t ? "#86efac" : "#e8e8e8"}`, cursor: "pointer", fontSize: "11px", fontWeight: 600, display: "flex", alignItems: "center", gap: "4px" }}>{activeTemplate === t && <span style={{ width: "5px", height: "5px", borderRadius: "50%", background: "#059669" }} />}{t}</button>)}<Btn variant="ghost" small><I.Plus /></Btn></div>
            </Card>
          </>)}

          {/* ═══ VERTICALS ═══ */}
          {tab === "verticals" && (<>
            {!sections.verticals && <ExcludedBanner />}
            {focusMode && <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "8px 14px", borderRadius: "9px", background: `${verts.find(v => v.name === focusMode)?.c}10`, border: `1.5px solid ${verts.find(v => v.name === focusMode)?.c}25`, fontSize: "12px" }}><div style={{ display: "flex", alignItems: "center", gap: "6px" }}><I.Target /> <b>Focus:</b> <span style={{ fontWeight: 700, color: verts.find(v => v.name === focusMode)?.c }}>{focusMode}</span></div><Btn onClick={() => setFocusMode(null)} small variant="ghost"><I.X /> Exit</Btn></div>}
            <Card title="Vertical Weights" icon={<I.Layers />} badge={{ text: tw === 100 ? "100%" : `${tw}%`, bg: tw === 100 ? "#ecfdf5" : "#fef3c7", color: tw === 100 ? "#065f46" : "#92400e" }}>
              {verts.map((v, i) => <div key={v.id} style={{ display: "flex", alignItems: "center", gap: "7px", padding: "5px 0", opacity: v.on ? 1 : 0.4 }}><Chk checked={v.on} onChange={() => { const n = [...verts]; n[i].on = !n[i].on; setVerts(n); }} color={v.c} /><span style={{ fontSize: "12px", fontWeight: 600, minWidth: "100px" }}>{v.name}</span>{v.name !== "Wildcard" && <button onClick={() => setFocusMode(focusMode === v.name ? null : v.name)} style={{ background: focusMode === v.name ? v.c : "transparent", border: `1px solid ${focusMode === v.name ? v.c : "#ddd"}`, borderRadius: "4px", width: "22px", height: "22px", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", color: focusMode === v.name ? "white" : "#ccc" }}><I.Target /></button>}<input type="range" min="0" max="50" value={v.w} onChange={e => { const n = [...verts]; n[i].w = parseInt(e.target.value); setVerts(n); }} disabled={!v.on} style={{ flex: 1, accentColor: v.c }} /><Mono color={v.on ? v.c : "#999"}>{v.w}%</Mono></div>)}
              <div style={{ display: "flex", gap: "6px", marginTop: "8px" }}><input value={newVert} onChange={e => setNewVert(e.target.value)} onKeyDown={e => { if (e.key === "Enter" && newVert.trim()) { setVerts([...verts, { id: Date.now(), name: newVert.trim(), w: 5, c: COLORS[verts.length % COLORS.length], on: true }]); setNewVert(""); }}} placeholder="Add vertical…" style={{ flex: 1, padding: "5px 10px", borderRadius: "6px", border: "1px solid #e5e5e5", fontSize: "12px", outline: "none" }} /><Btn onClick={() => { if (newVert.trim()) { setVerts([...verts, { id: Date.now(), name: newVert.trim(), w: 5, c: COLORS[verts.length % COLORS.length], on: true }]); setNewVert(""); }}}><I.Plus /></Btn></div>
            </Card>
          </>)}

          {/* ═══ SCORING ═══ */}
          {tab === "scoring" && (<>
            {!sections.scoring && <ExcludedBanner />}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
              <Card title="Revenue Target" icon={<I.Dollar />}>
                <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "6px" }}><input type="range" min="1000" max="50000" step="1000" value={revenue} onChange={e => setRevenue(parseInt(e.target.value))} style={{ flex: 1, accentColor: "#1a1a1a" }} /><span style={{ fontSize: "18px", fontWeight: 800, fontFamily: "'JetBrains Mono',monospace" }}>${revenue.toLocaleString()}</span></div>
                <div style={{ display: "flex", gap: "3px" }}>{[1000, 5000, 10000, 20000].map(v => <Btn key={v} active={revenue === v} onClick={() => setRevenue(v)} small>${v / 1000}K</Btn>)}</div>
              </Card>
              <Card title="Budget" icon={<I.TrendUp />}>
                {[{ k: "zero", l: "$0 Organic" }, { k: "low", l: "$100-500" }, { k: "medium", l: "$500-2K" }, { k: "high", l: "$2K+" }].map(b => <button key={b.k} onClick={() => setBudget(b.k)} style={{ display: "block", width: "100%", padding: "4px 10px", borderRadius: "6px", background: budget === b.k ? "#1a1a1a" : "transparent", color: budget === b.k ? "#fff" : "#555", border: `1px solid ${budget === b.k ? "#1a1a1a" : "#eee"}`, cursor: "pointer", marginBottom: "2px", fontSize: "12px", fontWeight: 600, textAlign: "left" }}>{b.l}</button>)}
              </Card>
            </div>
            <Card title="Criteria" icon={<I.Scale />} badge={{ text: cw === 100 ? "100%" : `${cw}%`, bg: cw === 100 ? "#ecfdf5" : "#fef3c7", color: cw === 100 ? "#065f46" : "#92400e" }}>
              {criteria.map((c, i) => <div key={c.k} style={{ display: "flex", alignItems: "center", gap: "8px", padding: "4px 0" }}><span style={{ flex: 1, fontSize: "12px", fontWeight: 600 }}>{c.n}</span><input type="range" min="0" max="40" value={c.w} onChange={e => { const n = [...criteria]; n[i].w = parseInt(e.target.value); setCriteria(n); }} style={{ width: "80px", accentColor: "#1a1a1a" }} /><Mono>{c.w}%</Mono></div>)}
            </Card>
            <Card title="Constraints" icon={<I.Ban />}>
              {constraints.map(c => <div key={c.id} style={{ display: "flex", alignItems: "center", gap: "7px", padding: "3px 0" }}><Chk checked={c.on} onChange={() => setConstraints(constraints.map(x => x.id === c.id ? { ...x, on: !x.on } : x))} /><span style={{ flex: 1, fontSize: "12px", color: c.on ? "#333" : "#bbb" }}>{c.t}</span><button onClick={() => setConstraints(constraints.filter(x => x.id !== c.id))} style={{ background: "none", border: "none", cursor: "pointer", color: "#ddd" }}><I.Trash /></button></div>)}
              <div style={{ display: "flex", gap: "6px", marginTop: "4px" }}><input value={newCon} onChange={e => setNewCon(e.target.value)} onKeyDown={e => { if (e.key === "Enter" && newCon.trim()) { setConstraints([...constraints, { id: Date.now(), t: newCon.trim(), on: true }]); setNewCon(""); }}} placeholder="Add…" style={{ flex: 1, padding: "5px 10px", borderRadius: "6px", border: "1px solid #e5e5e5", fontSize: "12px", outline: "none" }} /><Btn onClick={() => { if (newCon.trim()) { setConstraints([...constraints, { id: Date.now(), t: newCon.trim(), on: true }]); setNewCon(""); }}}><I.Plus /></Btn></div>
            </Card>
          </>)}

          {/* ═══ SEEDS & SIGNALS (unified feed) ═══ */}
          {tab === "feed" && (<>
            {!sections.feed && <ExcludedBanner />}
            <Card title="Input Feed" icon={<I.Inbox />} badge={{ text: `${pendingFeed} pending` }}>
              <div style={{ fontSize: "10px", color: "#999", marginBottom: "8px" }}>Drop ideas, signals, data points, or URLs. The system processes them all during the daily run.</div>
              {/* Type filter */}
              <div style={{ display: "flex", gap: "3px", marginBottom: "8px" }}>
                <Btn small active>All ({feed.length})</Btn>
                {Object.entries(FEED_TYPES).map(([k, v]) => <Btn key={k} small>{v.emoji} {feed.filter(f => f.type === k).length}</Btn>)}
              </div>
              {/* Feed items */}
              {feed.map(f => {
                const ft = FEED_TYPES[f.type];
                return (
                  <div key={f.id} style={{ display: "flex", alignItems: "center", gap: "8px", padding: "7px 10px", borderRadius: "8px", background: f.status === "pending" ? `${ft.color}08` : "#fafafa", border: `1px solid ${f.status === "pending" ? ft.color + "25" : "#eee"}`, marginBottom: "4px" }}>
                    <span style={{ fontSize: "14px" }}>{ft.emoji}</span>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: "12px", fontWeight: 600, color: f.status === "explored" ? "#999" : "#333" }}>{f.t}</div>
                      <div style={{ display: "flex", gap: "4px", marginTop: "2px" }}>
                        <span style={{ fontSize: "9px", fontWeight: 700, padding: "1px 5px", borderRadius: "100px", background: ft.color + "15", color: ft.color }}>{ft.label}</span>
                        {f.vertical && <span style={{ fontSize: "9px", color: "#999" }}>{f.vertical}</span>}
                      </div>
                    </div>
                    <span style={{ fontSize: "9px", fontWeight: 700, padding: "1px 6px", borderRadius: "100px", background: f.status === "pending" ? "#fef3c7" : "#ecfdf5", color: f.status === "pending" ? "#92400e" : "#065f46", textTransform: "uppercase" }}>{f.status}</span>
                    <button onClick={() => setFeed(feed.filter(x => x.id !== f.id))} style={{ background: "none", border: "none", cursor: "pointer", color: "#ddd" }}><I.Trash /></button>
                  </div>
                );
              })}
              {/* Add new */}
              <div style={{ marginTop: "8px", padding: "10px", borderRadius: "8px", border: "1.5px dashed #d1d5db", background: "#fafafa" }}>
                <div style={{ display: "flex", gap: "3px", marginBottom: "6px" }}>
                  {Object.entries(FEED_TYPES).map(([k, v]) => <button key={k} onClick={() => setNewFeedType(k)} style={{ padding: "3px 8px", borderRadius: "6px", fontSize: "10px", fontWeight: 600, background: newFeedType === k ? v.color : "#f0f0f0", color: newFeedType === k ? "#fff" : "#666", border: "none", cursor: "pointer" }}>{v.emoji} {v.label}</button>)}
                </div>
                <textarea value={newFeedText} onChange={e => setNewFeedText(e.target.value)} placeholder={newFeedType === "idea" ? "Describe an idea to explore…" : newFeedType === "signal" ? "What trend or signal did you notice?" : newFeedType === "data" ? "Share a data point or statistic…" : "Paste a URL to mine for opportunities…"} rows={2} style={{ width: "100%", padding: "6px 10px", borderRadius: "6px", border: "1px solid #e5e5e5", fontSize: "12px", resize: "vertical", outline: "none", boxSizing: "border-box" }} />
                <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "4px" }}><Btn variant="primary" onClick={() => { if (newFeedText.trim()) { setFeed([...feed, { id: Date.now(), t: newFeedText.trim(), type: newFeedType, vertical: null, status: "pending" }]); setNewFeedText(""); }}}><I.Plus /> Add</Btn></div>
              </div>
            </Card>
          </>)}

          {/* ═══ TEAM ═══ */}
          {tab === "team" && (<>
            {!sections.team && <ExcludedBanner msg="Excluded — simplified generation without personas." />}
            <Card title="Founders" icon={<I.Users />} badge={{ text: `${founders.filter(f => f.on).length}/13` }}>
              {Object.entries(CATMETA).map(([cat, m]) => <div key={cat} style={{ marginBottom: "5px" }}><span style={{ fontSize: "9px", fontWeight: 700, padding: "1px 6px", borderRadius: "100px", background: m.bg, color: m.c }}>{m.l}</span>{founders.filter(f => f.cat === cat).map(f => <div key={f.id} style={{ display: "flex", alignItems: "center", gap: "7px", padding: "4px 0", opacity: f.on ? 1 : 0.4 }}><Chk checked={f.on} onChange={() => setFounders(founders.map(x => x.id === f.id ? { ...x, on: !x.on } : x))} color={m.c} /><span style={{ fontSize: "12px", fontWeight: 700, minWidth: "95px" }}>{f.name}</span><span style={{ fontSize: "10px", color: "#bbb" }}>{f.power}</span></div>)}</div>)}
            </Card>
            <Card title="Advisors" icon={<I.Scale />} badge={{ text: `${advisors.filter(a => a.on).length}/7` }}>
              {advisors.map(a => <div key={a.id} style={{ display: "flex", alignItems: "center", gap: "7px", padding: "4px 0", opacity: a.on ? 1 : 0.4 }}><Chk checked={a.on} onChange={() => setAdvisors(advisors.map(x => x.id === a.id ? { ...x, on: !x.on } : x))} color={a.c} /><span style={{ fontSize: "12px", fontWeight: 700, minWidth: "75px" }}>{a.name}</span>{a.veto && <span style={{ fontSize: "8px", fontWeight: 700, padding: "1px 4px", borderRadius: "3px", background: "#fef2f2", color: "#dc2626" }}>VETO</span>}<span style={{ fontSize: "11px", color: "#999", flex: 1 }}>{a.focus}</span><input type="range" min="0.5" max="2.0" step="0.1" value={a.w} onChange={e => setAdvisors(advisors.map(x => x.id === a.id ? { ...x, w: parseFloat(e.target.value) } : x))} style={{ width: "50px", accentColor: a.c }} /><Mono color={a.c}>{a.w}x</Mono></div>)}
            </Card>
          </>)}

          {/* ═══ PROFILE ═══ */}
          {tab === "profile" && (<>
            {!sections.profile && <ExcludedBanner msg="Excluded — no operator constraints." />}
            <Card title="Background" icon={<I.User />}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px", marginBottom: "6px" }}>
                <div><label style={{ fontSize: "10px", fontWeight: 600, color: "#999" }}>Name</label><input defaultValue="Ofir Kedmi" style={{ width: "100%", padding: "6px 9px", borderRadius: "6px", border: "1px solid #e5e5e5", fontSize: "12px", boxSizing: "border-box" }} /></div>
                <div><label style={{ fontSize: "10px", fontWeight: 600, color: "#999" }}>Role</label><input defaultValue="Creative Director + Product Strategist" style={{ width: "100%", padding: "6px 9px", borderRadius: "6px", border: "1px solid #e5e5e5", fontSize: "12px", boxSizing: "border-box" }} /></div>
              </div>
              <label style={{ fontSize: "10px", fontWeight: 600, color: "#999" }}>Time</label>
              <div style={{ display: "flex", gap: "3px", margin: "2px 0" }}>{["2 hrs/week", "1 day/week", "2 days/week", "Full-time"].map(t => <Btn key={t} active={founderTime === t} onClick={() => setFounderTime(t)} small>{t}</Btn>)}</div>
            </Card>
            <Card title="Skills" icon={<I.Award />} badge={{ text: `${skills.length}` }} defaultCollapsed>
              <div style={{ display: "flex", gap: "4px", flexWrap: "wrap", marginBottom: "6px" }}>{skills.map(s => <Pill key={s} text={s} color="#2563eb" onRemove={() => setSkills(skills.filter(x => x !== s))} />)}</div>
              <div style={{ display: "flex", gap: "5px" }}><input value={newSkill} onChange={e => setNewSkill(e.target.value)} onKeyDown={e => { if (e.key === "Enter" && newSkill.trim()) { setSkills([...skills, newSkill.trim()]); setNewSkill(""); }}} placeholder="Add…" style={{ flex: 1, padding: "5px 9px", borderRadius: "6px", border: "1px solid #e5e5e5", fontSize: "11px", outline: "none" }} /><Btn onClick={() => { if (newSkill.trim()) { setSkills([...skills, newSkill.trim()]); setNewSkill(""); }}} small><I.Plus /></Btn></div>
            </Card>
            <Card title="Hard Filters" icon={<I.Ban />} badge={{ text: `${filters.length}`, bg: "#fef2f2", color: "#dc2626" }} defaultCollapsed>
              <div style={{ display: "flex", gap: "4px", flexWrap: "wrap", marginBottom: "6px" }}>{filters.map(f => <Pill key={f} text={f} color="#dc2626" onRemove={() => setFilters(filters.filter(x => x !== f))} />)}</div>
              <div style={{ display: "flex", gap: "5px" }}><input value={newFilter} onChange={e => setNewFilter(e.target.value)} onKeyDown={e => { if (e.key === "Enter" && newFilter.trim()) { setFilters([...filters, newFilter.trim()]); setNewFilter(""); }}} placeholder="Add…" style={{ flex: 1, padding: "5px 9px", borderRadius: "6px", border: "1px solid #e5e5e5", fontSize: "11px", outline: "none" }} /><Btn onClick={() => { if (newFilter.trim()) { setFilters([...filters, newFilter.trim()]); setNewFilter(""); }}} small><I.Plus /></Btn></div>
            </Card>
          </>)}

          {/* ═══ PERF ═══ */}
          {tab === "perf" && <div style={{ background: "#fff", borderRadius: "12px", border: "1px solid #e5e7eb", padding: "30px", textAlign: "center", color: "#999" }}><I.BarChart /><div style={{ fontWeight: 700, marginTop: "8px" }}>Performance Dashboard</div><div style={{ fontSize: "11px", marginTop: "4px" }}>KPIs, optimization suggestions, vertical performance, config history — same as v5.</div></div>}

          {/* Bottom Bar */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 14px", borderRadius: "10px", background: "#fff", border: "1px solid #e5e7eb", position: "sticky", bottom: "8px", boxShadow: "0 -2px 12px rgba(0,0,0,.04)" }}>
            <div style={{ display: "flex", gap: "5px" }}><Btn><I.Save /> Save</Btn><Btn variant="ghost" onClick={() => setShowPreview(true)}><I.Eye /> Preview</Btn></div>
            <button style={{ display: "flex", alignItems: "center", gap: "5px", padding: "8px 18px", borderRadius: "8px", fontSize: "13px", fontWeight: 700, background: "#1a1a1a", color: "#fff", border: "none", cursor: "pointer" }}><I.Download /> Generate CLAUDE.md</button>
          </div>
        </div>
      </div>

      {/* Preview Modal */}
      {showPreview && <div style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0, background: "rgba(0,0,0,.4)", backdropFilter: "blur(4px)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 200 }} onClick={() => setShowPreview(false)}>
        <div onClick={e => e.stopPropagation()} style={{ background: "#fff", borderRadius: "14px", width: "700px", maxHeight: "80vh", display: "flex", flexDirection: "column", boxShadow: "0 20px 60px rgba(0,0,0,.2)" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "14px 18px", borderBottom: "1px solid #f0f0f0" }}><span style={{ fontSize: "14px", fontWeight: 800 }}>CLAUDE.md Preview</span><div style={{ display: "flex", gap: "5px" }}><Btn small><I.Save /> Copy</Btn><Btn small variant="primary"><I.Download /> Download</Btn><button onClick={() => setShowPreview(false)} style={{ background: "none", border: "none", cursor: "pointer", color: "#999" }}><I.X /></button></div></div>
          <div style={{ flex: 1, overflow: "auto", padding: "16px 18px" }}>
            <pre style={{ fontSize: "11px", fontFamily: "'JetBrains Mono',monospace", color: "#444", lineHeight: 1.6, whiteSpace: "pre-wrap", margin: 0 }}>{`# AI Business Opportunity Research System v4.0
${direction ? `\n## 🧭 DIRECTION\n> ${direction}\n` : ""}
## Core Principles
${principles.filter(p => p.on).map(p => `- ${p.t}`).join("\n")}

## Business Model
Type: ${{ digital: "Digital", physical: "Physical", hybrid: "Hybrid", service: "Service" }[bizType]}
Team: ${{ solo: "Solo", solo_ai: "Solo+AI", small: "2-3 people", flex: "Flexible" }[bizTeam]}
AI: ${{ native: "95%+ automated", enhanced: "AI gives competitive edge", optional: "AI helpful but not core", none: "No constraint" }[bizAI]}
Revenue Target: $${revenue.toLocaleString()}/month

## Novelty Setting: ${novelty}%
${novelty >= 70 ? "EXPLORE: Prioritize novel ideas. Penalize similarity to past ideas. Push into unexplored verticals and business models." : novelty >= 40 ? "BALANCED: Mix of novel exploration and refinement of proven patterns." : "REFINE: Iterate on winning patterns. Produce variations of highest-scoring idea types."}
${sections.profile ? `\n## Operator ✓\nTime: ${founderTime} · Skills: ${skills.join(", ")}` : ""}
${sections.verticals ? `\n## Verticals ✓\n${focusMode ? `FOCUS: ${focusMode}` : verts.filter(v => v.on).map(v => `${v.name}: ${v.w}%`).join(" · ")}` : ""}
${sections.team ? `\n## Team ✓ ${founders.filter(f => f.on).length} founders · ${advisors.filter(a => a.on).length} advisors` : ""}
${sections.scoring ? `\n## Scoring ✓\n${criteria.map(c => `${c.n}: ${c.w}%`).join(" · ")}` : ""}
${sections.feed && pendingFeed > 0 ? `\n## Input Feed (${pendingFeed} items)\n${feed.filter(f => f.status === "pending").map(f => `${FEED_TYPES[f.type].emoji} [${FEED_TYPES[f.type].label}] ${f.t}`).join("\n")}` : ""}

## Run: ${ideasPer} ideas · ${deckCut}% cutoff · Mix ${mix.trend}/${mix.pattern}/${mix.wild}

*IdeaForge · ${new Date().toISOString().split("T")[0]} · ${activeTemplate}*`}</pre>
          </div>
        </div>
      </div>}
    </div>
  );
}
