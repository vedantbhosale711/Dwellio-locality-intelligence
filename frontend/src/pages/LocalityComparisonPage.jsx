import React, { useState, useMemo } from "react";
import {
  ChevronRight, Search, Plus, X, MapPin, Users, Info, Star, ShieldCheck, TrainFront,
  HeartPulse, GraduationCap, Sprout, ShoppingBag, Sparkles, Home, TrendingUp, RotateCcw,
  ArrowRight, Lightbulb
} from "lucide-react";

/* ============================== TOKENS ============================== */
const C = {
  bg: "#F5F7FB",
  surface: "#FFFFFF",
  navy: "#101827",
  textSoft: "#5B6472",
  textMuted: "#8A93A3",
  border: "#E7EAF0",
  borderSoft: "#EFF1F5",
  blue: "#2F6FED",
  blueDark: "#1E56D6",
  blueSoft: "#E4EDFE",
  green: "#16A34A",
  greenSoft: "#DCFCE7",
  greenText: "#15803D",
  purple: "#7C3AED",
  purpleSoft: "#F1EAFE",
  gold: "#F59E0B",
};

const FONT_CSS = `
@import url('https://fonts.googleapis.com/css2?family=Manrope:wght@700;800&family=Inter:wght@400;500;600;700&display=swap');
* { box-sizing: border-box; }
.dwc-root { font-family:'Inter',-apple-system,sans-serif; background:${C.bg}; color:${C.navy}; }
.dwc-display { font-family:'Manrope','Inter',sans-serif; letter-spacing:-0.02em; }
.dwc-btn-primary{ background:${C.blue}; color:#fff; transition: background .15s ease; }
.dwc-btn-primary:hover{ background:${C.blueDark}; }
.dwc-btn-outline{ background:#fff; color:${C.blue}; border:1.3px solid ${C.blue}; transition: all .15s ease; }
.dwc-btn-outline:hover{ background:${C.blueSoft}; }
.dwc-card{ transition: box-shadow .2s ease, transform .2s ease; }
.dwc-card:hover{ box-shadow: 0 16px 32px -18px rgba(16,24,39,0.16); }
.dwc-fade{ animation: dwcFade .3s ease both; }
@keyframes dwcFade{ from{opacity:0; transform:translateY(6px);} to{opacity:1; transform:translateY(0);} }
`;

/* ============================== FACTOR META (order matches table) ============================== */
const FACTORS = [
  { key: "safety", label: "Safety & Security", icon: ShieldCheck, color: "#DC2626", soft: "#FDE3E3" },
  { key: "connectivity", label: "Connectivity", icon: TrainFront, color: "#2563EB", soft: "#DEE9FE" },
  { key: "healthcare", label: "Healthcare", icon: HeartPulse, color: "#DB2777", soft: "#FBE1EE" },
  { key: "education", label: "Education", icon: GraduationCap, color: "#7C3AED", soft: "#ECE3FD" },
  { key: "environment", label: "Environment", icon: Sprout, color: "#159C5B", soft: "#DBF5E5" },
  { key: "amenities", label: "Amenities", icon: ShoppingBag, color: "#D97706", soft: "#FCECD2" },
  { key: "lifestyle", label: "Lifestyle & Recreation", icon: Sparkles, color: "#0D9488", soft: "#D9F2EF" },
  { key: "housing", label: "Housing & Affordability", icon: Home, color: "#C2740C", soft: "#FBE7CE" },
  { key: "growth", label: "Future Growth", icon: TrendingUp, color: "#2563EB", soft: "#DEE9FE" },
];

const PRIORITY_KEYS = ["connectivity", "safety", "healthcare", "environment", "lifestyle"];

/* ============================== DATA ============================== */
const ALL_LOCALITIES = [
  { id: "kharghar", name: "Kharghar", city: "Navi Mumbai", overall: 8.9, label: "Excellent", reviews: 125,
    safety: 8.5, connectivity: 9.1, healthcare: 8.2, education: 8.3, environment: 8.7, amenities: 9.0, lifestyle: 8.6, housing: 8.2, growth: 8.9,
    matchTag: "Best Overall Match", matchColor: C.green, matchSoft: C.greenSoft, matchText: C.greenText,
    matchDesc: "Great balance across all factors with strong future potential.",
    sky: ["#BFE0FA", "#EAF6EC"], skyline: [26, 40, 30, 55, 34, 22] },
  { id: "vashi", name: "Vashi", city: "Navi Mumbai", overall: 8.6, label: "Excellent", reviews: 98,
    safety: 8.2, connectivity: 8.8, healthcare: 8.1, education: 8.0, environment: 8.3, amenities: 8.8, lifestyle: 8.5, housing: 8.0, growth: 8.6,
    matchTag: "Best for Connectivity", matchColor: C.blue, matchSoft: C.blueSoft, matchText: C.blueDark,
    matchDesc: "Excellent connectivity and amenities make it a top choice.",
    sky: ["#BEDBF9", "#DDEFF1"], skyline: [34, 20, 46, 28, 38, 24] },
  { id: "powai", name: "Powai", city: "Mumbai", overall: 8.4, label: "Very Good", reviews: 112,
    safety: 8.0, connectivity: 9.0, healthcare: 7.8, education: 8.6, environment: 8.6, amenities: 8.2, lifestyle: 8.8, housing: 7.9, growth: 8.4,
    matchTag: "Best for Lifestyle", matchColor: C.purple, matchSoft: C.purpleSoft, matchText: C.purple,
    matchDesc: "Vibrant lifestyle with great education and green spaces.",
    sky: ["#CFE3FB", "#E6F1E3"], skyline: [40, 24, 52, 30, 20, 44] },
];

/* ============================== PRIMITIVES ============================== */
function CityThumb({ sky, skyline, name }) {
  return (
    <svg viewBox="0 0 300 170" className="w-full h-full" preserveAspectRatio="xMidYMid slice">
      <defs>
        <linearGradient id={`sky-${name}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={sky[0]} /><stop offset="100%" stopColor={sky[1]} />
        </linearGradient>
      </defs>
      <rect width="300" height="170" fill={`url(#sky-${name})`} />
      <rect y="132" width="300" height="38" fill="#DCE8EE" opacity="0.7" />
      {skyline.map((h, i) => (
        <rect key={i} x={10 + i * 48} y={132 - h * 1.7} width="30" height={h * 1.7 + 12} fill="#7C93A8" opacity={0.55 + (i % 3) * 0.12} rx="1.5" />
      ))}
      <circle cx="252" cy="28" r="14" fill="#FFFFFF" opacity="0.8" />
    </svg>
  );
}

function ScoreRing({ score, size = 84 }) {
  const r = (size - 9) / 2, cx = size / 2, cy = size / 2, circ = 2 * Math.PI * r;
  const len = circ * (score / 10);
  return (
    <div className="relative shrink-0" style={{ width: size, height: size }}>
      <svg width={size} height={size}>
        <circle cx={cx} cy={cy} r={r} fill="none" stroke={C.borderSoft} strokeWidth="6" />
        <circle cx={cx} cy={cy} r={r} fill="none" stroke={C.green} strokeWidth="6"
          strokeDasharray={`${len} ${circ}`} strokeLinecap="round" transform={`rotate(-90 ${cx} ${cy})`} />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="dwc-display font-extrabold" style={{ fontSize: size * 0.26, color: C.navy, lineHeight: 1 }}>{score.toFixed(1)}</span>
        <span className="text-[10px] font-semibold" style={{ color: C.textMuted }}>/10</span>
      </div>
    </div>
  );
}

function RatingPill({ label }) {
  const isExcellent = label === "Excellent";
  return (
    <span className="inline-flex items-center gap-1 text-xs font-bold px-2.5 py-1 rounded-full"
      style={{ background: isExcellent ? C.greenSoft : C.blueSoft, color: isExcellent ? C.greenText : C.blueDark }}>
      <Star size={11} fill={isExcellent ? C.greenText : C.blueDark} /> {label}
    </span>
  );
}

/* ============================== HEADER ============================== */
function Header({ onAdd }) {
  return (
    <div style={{ background: "linear-gradient(180deg,#EDF2FA 0%,#F5F7FB 100%)" }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-10 pt-6 pb-8">
        <div className="flex items-center gap-1.5 text-sm mb-4">
          <span className="font-semibold" style={{ color: C.blue }}>Home</span>
          <ChevronRight size={14} style={{ color: C.textMuted }} />
          <span className="font-semibold" style={{ color: C.textSoft }}>Compare Localities</span>
        </div>

        <div className="grid lg:grid-cols-[1fr_360px] gap-8 items-center">
          <div>
            <h1 className="dwc-display font-extrabold text-4xl mb-2">Compare Localities</h1>
            <p className="text-sm mb-6" style={{ color: C.textSoft, maxWidth: 460 }}>
              See how localities stack up across the factors that matter most to you.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="flex items-center gap-2 px-4 py-3 rounded-xl flex-1" style={{ background: "#fff", border: `1px solid ${C.border}` }}>
                <Search size={16} style={{ color: C.textMuted }} />
                <input placeholder="Search for a locality, city or area…" className="bg-transparent outline-none text-sm flex-1" style={{ color: C.navy }} />
              </div>
              <button onClick={onAdd} className="dwc-btn-primary inline-flex items-center justify-center gap-2 rounded-xl font-bold px-5 py-3 text-sm whitespace-nowrap">
                <Plus size={16} /> Add Locality
              </button>
            </div>
          </div>

          <div className="hidden lg:block relative h-40">
            <svg viewBox="0 0 360 160" className="w-full h-full">
              <path d="M20,40 a6,6 0 1,1 12,0" fill="none" />
              <circle cx="40" cy="30" r="3" fill="#8FB2EE" /><circle cx="55" cy="24" r="2.4" fill="#8FB2EE" />
              <circle cx="70" cy="34" r="3" fill="#8FB2EE" />
              <circle cx="34" cy="18" r="12" fill="#E1EAFB" /><circle cx="55" cy="14" r="9" fill="#E1EAFB" />
              <rect x="60" y="90" width="30" height="70" rx="2" fill="#AFC3EA" />
              <rect x="95" y="60" width="36" height="100" rx="2" fill="#7E9FDE" />
              <rect x="136" y="100" width="26" height="60" rx="2" fill="#C7D6F1" />
              <rect x="167" y="45" width="40" height="115" rx="2" fill="#6E8FD6" />
              <rect x="212" y="85" width="28" height="75" rx="2" fill="#AFC3EA" />
              <rect x="245" y="65" width="34" height="95" rx="2" fill="#8FA9E0" />
              <rect x="284" y="95" width="24" height="65" rx="2" fill="#C7D6F1" />
              <g fill="#7CAA6E">
                <circle cx="50" cy="150" r="9" /><rect x="48" y="150" width="4" height="14" />
                <circle cx="330" cy="145" r="9" /><rect x="328" y="145" width="4" height="14" />
              </g>
              <line x1="0" y1="160" x2="360" y2="160" stroke="#C7D6F1" strokeWidth="2" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ============================== SELECTED LOCALITY CARD ============================== */
function SelectedCard({ l, onRemove }) {
  return (
    <div className="dwc-fade rounded-2xl border overflow-hidden flex flex-col" style={{ borderColor: C.border, background: C.surface }}>
      <div className="h-36 relative">
        <CityThumb sky={l.sky} skyline={l.skyline} name={l.id} />
        <button onClick={() => onRemove(l.id)}
          className="absolute top-3 right-3 w-7 h-7 rounded-full flex items-center justify-center"
          style={{ background: "rgba(16,24,39,0.75)" }}>
          <X size={13} color="#fff" />
        </button>
      </div>
      <div className="p-4">
        <div className="flex items-center justify-between mb-1">
          <h3 className="font-bold text-base">{l.name}</h3>
          <RatingPill label={l.label} />
        </div>
        <div className="text-xs flex items-center gap-1 mb-3" style={{ color: C.textMuted }}><MapPin size={11} />{l.city}</div>

        <div className="flex items-center gap-4">
          <ScoreRing score={l.overall} size={72} />
          <div>
            <div className="text-sm font-bold">Overall Score</div>
            <div className="text-xs" style={{ color: C.textMuted }}>Based on 9 factors</div>
            <div className="text-xs flex items-center gap-1 mt-1" style={{ color: C.textMuted }}>
              <Users size={12} /> {l.reviews} reviews
            </div>
          </div>
        </div>
      </div>
      <div className="border-t py-3 text-center" style={{ borderColor: C.borderSoft }}>
        <button onClick={() => onRemove(l.id)} className="text-sm font-bold" style={{ color: "#DC2626" }}>Remove</button>
      </div>
    </div>
  );
}

/* ============================== FACTOR COMPARISON TABLE ============================== */
function FactorTable({ list }) {
  return (
    <div className="rounded-2xl border overflow-hidden" style={{ borderColor: C.border, background: C.surface }}>
      <div className="flex items-center justify-between p-5 pb-3 flex-wrap gap-3">
        <h2 className="font-extrabold text-lg dwc-display">Factor Comparison</h2>
        <div className="flex items-center gap-4 text-xs font-semibold" style={{ color: C.textSoft }}>
          <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full" style={{ background: C.green }} /> Highest Score</span>
          <span className="flex items-center gap-1.5"><Star size={12} style={{ color: C.blue }} fill={C.blue} /> Your Priority</span>
          <span className="flex items-center gap-1.5" style={{ color: C.textMuted }}><Info size={12} /> Based on your quiz preferences</span>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr style={{ borderTop: `1px solid ${C.borderSoft}`, borderBottom: `1px solid ${C.borderSoft}` }}>
              <th className="text-left p-4 font-bold" style={{ color: C.navy, width: 240 }}>Factor</th>
              {list.map((l) => (
                <th key={l.id} className="text-left p-4 font-bold">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-lg overflow-hidden shrink-0"><CityThumb sky={l.sky} skyline={l.skyline} name={`th-${l.id}`} /></div>
                    <div>
                      <div className="font-bold text-sm">{l.name}</div>
                      <div className="text-xs font-medium" style={{ color: C.textMuted }}>{l.city}</div>
                    </div>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {FACTORS.map((f) => {
              const values = list.map((l) => l[f.key]);
              const max = Math.max(...values);
              return (
                <tr key={f.key} style={{ borderBottom: `1px solid ${C.borderSoft}` }}>
                  <td className="p-4">
                    <span className="flex items-center gap-2.5 font-semibold" style={{ color: C.navy }}>
                      <span className="w-7 h-7 rounded-full flex items-center justify-center shrink-0" style={{ background: f.soft }}>
                        <f.icon size={13} style={{ color: f.color }} />
                      </span>
                      {f.label}
                      {PRIORITY_KEYS.includes(f.key) && <Star size={12} style={{ color: C.blue }} fill={C.blue} />}
                    </span>
                  </td>
                  {list.map((l) => {
                    const isMax = l[f.key] === max && values.some((v) => v !== max);
                    return (
                      <td key={l.id} className="p-4 font-bold" style={{ background: isMax ? C.greenSoft : "transparent", color: isMax ? C.greenText : C.navy }}>
                        {l[f.key].toFixed(1)}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
            <tr>
              <td className="p-4 font-extrabold">
                Overall Score <div className="text-xs font-medium" style={{ color: C.textMuted }}>(Average)</div>
              </td>
              {list.map((l) => {
                const max = Math.max(...list.map((x) => x.overall));
                const isMax = l.overall === max;
                return (
                  <td key={l.id} className="p-4 font-extrabold text-lg" style={{ color: isMax ? C.greenText : C.navy }}>
                    {l.overall.toFixed(1)}
                  </td>
                );
              })}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* ============================== PREFERENCE MATCH SECTION ============================== */
function MatchCard({ l, rank }) {
  const badgeColors = [
    { bg: C.gold, text: "#fff" },
    { bg: "#CBD3DE", text: "#fff" },
    { bg: "#D8C3F0", text: "#fff" },
  ];
  const b = badgeColors[rank - 1];
  return (
    <div className="dwc-card rounded-2xl border overflow-hidden relative" style={{ borderColor: C.border, background: l.matchSoft && rank === 1 ? "#F4FBF6" : C.surface }}>
      <div className="absolute top-3 left-3 w-7 h-7 rounded-full flex items-center justify-center text-xs font-extrabold z-10" style={{ background: b.bg, color: b.text }}>{rank}</div>
      <div className="h-28"><CityThumb sky={l.sky} skyline={l.skyline} name={`match-${l.id}`} /></div>
      <div className="p-4">
        <h3 className="font-bold text-base mb-2">{l.name}</h3>
        <span className="inline-block text-xs font-bold px-2.5 py-1 rounded-full mb-3" style={{ background: l.matchSoft, color: l.matchText }}>{l.matchTag}</span>
        <p className="text-sm mb-3" style={{ color: C.textSoft }}>{l.matchDesc}</p>
        <div className="flex items-center gap-1.5 text-sm font-bold" style={{ color: l.matchColor }}>
          <Star size={13} fill={l.matchColor} /> {l.overall.toFixed(1)} / 10
        </div>
      </div>
    </div>
  );
}

function PrioritiesPanel() {
  return (
    <div className="rounded-2xl border p-5" style={{ borderColor: C.border, background: C.surface }}>
      <h3 className="font-extrabold text-sm mb-4">Your Top Priorities</h3>
      <div className="flex flex-col gap-3 mb-5">
        {PRIORITY_KEYS.map((k) => {
          const f = FACTORS.find((x) => x.key === k);
          return (
            <div key={k} className="flex items-center gap-2.5 text-sm font-semibold" style={{ color: C.navy }}>
              <span className="w-7 h-7 rounded-full flex items-center justify-center shrink-0" style={{ background: f.soft }}>
                <f.icon size={13} style={{ color: f.color }} />
              </span>
              {f.label}
            </div>
          );
        })}
      </div>
      <button className="dwc-btn-outline w-full inline-flex items-center justify-center gap-2 rounded-xl font-bold px-4 py-2.5 text-sm">
        <RotateCcw size={14} /> Retake Quiz
      </button>
    </div>
  );
}

/* ============================== APP ============================== */
export default function LocalityComparisonPage() {
  const [selectedIds, setSelectedIds] = useState(ALL_LOCALITIES.map((l) => l.id));
  const list = useMemo(() => ALL_LOCALITIES.filter((l) => selectedIds.includes(l.id)), [selectedIds]);

  const remove = (id) => setSelectedIds((ids) => ids.filter((x) => x !== id));
  const addBack = () => setSelectedIds(ALL_LOCALITIES.map((l) => l.id));

  const rankedMatches = useMemo(() => [...list].sort((a, b) => b.overall - a.overall), [list]);

  return (
    <div className="dwc-root min-h-screen pb-14">
      <style dangerouslySetInnerHTML={{ __html: FONT_CSS }} />
      <Header onAdd={addBack} />

      <div className="max-w-7xl mx-auto px-6 lg:px-10 -mt-2">
        {list.length === 0 ? (
          <div className="rounded-2xl border p-14 text-center mb-6" style={{ borderColor: C.border, background: C.surface }}>
            <p className="text-sm font-semibold mb-4" style={{ color: C.textSoft }}>No localities selected for comparison.</p>
            <button onClick={addBack} className="dwc-btn-primary inline-flex items-center gap-2 rounded-xl font-bold px-5 py-2.5 text-sm">
              <Plus size={15} /> Add Localities
            </button>
          </div>
        ) : (
          <>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-6">
              {list.map((l) => <SelectedCard key={l.id} l={l} onRemove={remove} />)}
            </div>

            <div className="flex items-center gap-2.5 rounded-xl px-4 py-3 mb-6 text-sm font-medium" style={{ background: C.blueSoft, color: C.blueDark }}>
              <Info size={15} /> Scores are calculated on a scale of 1 to 10
            </div>

            <div className="mb-10"><FactorTable list={list} /></div>

            <section className="mb-8">
              <h2 className="dwc-display font-extrabold text-xl mb-1">How do these localities match your preferences?</h2>
              <p className="text-sm mb-5" style={{ color: C.textSoft }}>Based on your quiz, here's how each locality performs for you.</p>

              <div className="grid lg:grid-cols-[1fr_280px] gap-6">
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {rankedMatches.map((l, i) => <MatchCard key={l.id} l={l} rank={i + 1} />)}
                </div>
                <PrioritiesPanel />
              </div>
            </section>
          </>
        )}

        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 rounded-xl px-5 py-4" style={{ background: C.blueSoft }}>
          <span className="flex items-center gap-2 text-sm font-medium" style={{ color: C.blueDark }}>
            <Lightbulb size={15} /> Tip: Click on "View Details" in the Explore page to see more insights about any locality.
          </span>
          <button className="dwc-btn-outline inline-flex items-center gap-1.5 rounded-xl font-bold px-4 py-2 text-sm whitespace-nowrap">
            Explore More Localities <ArrowRight size={14} />
          </button>
        </div>
      </div>
    </div>
  );
}