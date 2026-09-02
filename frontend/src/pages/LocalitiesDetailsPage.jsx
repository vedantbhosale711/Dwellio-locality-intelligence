import React, { useState } from "react";
import {
  Home, ChevronDown, ChevronRight, Heart, MapPin, Star, Users, Plus, Check, Info,
  ShieldCheck, TrainFront, HeartPulse, GraduationCap, Sprout, ShoppingBag, Sparkles,
  TrendingUp, Sparkle, ArrowRight, Bookmark
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
  amber: "#D97706",
  amberSoft: "#FCECD2",
};

const FONT_CSS = `
@import url('https://fonts.googleapis.com/css2?family=Manrope:wght@600;700;800&family=Inter:wght@400;500;600;700&display=swap');
* { box-sizing: border-box; }
.dwl-root { font-family:'Inter',-apple-system,sans-serif; background:${C.bg}; color:${C.navy}; }
.dwl-display { font-family:'Manrope','Inter',sans-serif; letter-spacing:-0.02em; }
.dwl-navlink { position:relative; color:${C.textSoft}; font-weight:600; }
.dwl-navlink.active { color:${C.blue}; }
.dwl-navlink.active::after { content:''; position:absolute; left:0; right:0; bottom:-19px; height:2px; background:${C.blue}; border-radius:2px; }
.dwl-btn-primary{ background:${C.blue}; color:#fff; transition: background .15s ease; }
.dwl-btn-primary:hover{ background:${C.blueDark}; }
.dwl-btn-outline{ background:#fff; color:${C.navy}; border:1.3px solid ${C.border}; transition: all .15s ease; }
.dwl-btn-outline:hover{ border-color:${C.blue}; color:${C.blue}; }
.dwl-factor{ transition: box-shadow .2s ease; }
.dwl-factor:hover{ box-shadow: 0 10px 24px -16px rgba(16,24,39,0.16); }
.dwl-chevron{ transition: transform .2s ease; }
.dwl-chevron.open{ transform: rotate(180deg); }
.dwl-body{ animation: dwlOpen .22s ease both; overflow:hidden; }
@keyframes dwlOpen{ from{ opacity:0; max-height:0; } to{ opacity:1; max-height:400px; } }
`;

/* ============================== FACTOR DATA ============================== */
const FACTORS = [
  {
    key: "safety", label: "Safety & Security", icon: ShieldCheck, color: "#DC2626", soft: "#FDE3E3", score: 8.5,
    metrics: [
      { label: "Police stations within 3 km", value: "4" },
      { label: "Street lighting coverage", value: "92%" },
      { label: "Reported crime rate", value: "Low" },
      { label: "Community safety rating", value: "4.6 / 5" },
    ],
  },
  {
    key: "connectivity", label: "Connectivity & Transport", icon: TrainFront, color: "#2563EB", soft: "#DEE9FE", score: 9.1,
    metrics: [
      { label: "Nearest railway station", value: "1.2 km (Kharghar)" },
      { label: "Metro access", value: "Excellent — Line 1" },
      { label: "Bus stops nearby", value: "18" },
      { label: "Avg. commute to BKC", value: "38 min" },
    ],
  },
  {
    key: "healthcare", label: "Healthcare", icon: HeartPulse, color: "#DB2777", soft: "#FBE1EE", score: 8.2,
    metrics: [
      { label: "Number of hospitals nearby", value: "9" },
      { label: "Number of clinics nearby", value: "24" },
      { label: "Number of pharmacies nearby", value: "21" },
      { label: "Nearest multi-specialty hospital", value: "1.8 km" },
    ],
  },
  {
    key: "education", label: "Education", icon: GraduationCap, color: "#7C3AED", soft: "#ECE3FD", score: 8.3,
    metrics: [
      { label: "Schools nearby", value: "26" },
      { label: "Colleges nearby", value: "6" },
      { label: "Top-rated institutions nearby", value: "5" },
      { label: "Coaching / tuition centers nearby", value: "14" },
    ],
  },
  {
    key: "environment", label: "Environment", icon: Sprout, color: "#159C5B", soft: "#DBF5E5", score: 8.7,
    metrics: [
      { label: "Air Quality Index (AQI)", value: "68 — Satisfactory" },
      { label: "Parks & green spaces nearby", value: "14" },
      { label: "Tree cover", value: "34%" },
      { label: "Noise pollution level", value: "Low" },
    ],
  },
  {
    key: "amenities", label: "Amenities & Daily Convenience", icon: ShoppingBag, color: "#D97706", soft: "#FCECD2", score: 9.0,
    metrics: [
      { label: "Supermarkets nearby", value: "18" },
      { label: "Banks & ATMs nearby", value: "17" },
      { label: "Restaurants & cafes nearby", value: "64" },
      { label: "Petrol pumps nearby", value: "6" },
    ],
  },
  {
    key: "lifestyle", label: "Lifestyle & Recreation", icon: Sparkles, color: "#0D9488", soft: "#D9F2EF", score: 8.6,
    metrics: [
      { label: "Restaurants & cafes", value: "64" },
      { label: "Entertainment venues (cinemas, malls)", value: "8" },
      { label: "Sports & recreation facilities", value: "11" },
      { label: "Community events per month", value: "6" },
    ],
  },
  {
    key: "housing", label: "Housing & Affordability", icon: Home, color: "#C2740C", soft: "#FBE7CE", score: 8.2,
    metrics: [
      { label: "Avg. 1 BHK rent", value: "₹14,500 / mo" },
      { label: "Avg. 2 BHK rent", value: "₹24,000 / mo" },
      { label: "Price per sq. ft (buying)", value: "₹9,800" },
      { label: "5-year price growth", value: "+22%" },
    ],
  },
  {
    key: "growth", label: "Future Growth & Development", icon: TrendingUp, color: "#2563EB", soft: "#DEE9FE", score: 8.9,
    metrics: [
      { label: "Upcoming metro extension", value: "Line 2 — 2027" },
      { label: "New commercial projects", value: "5 upcoming" },
      { label: "5-year price appreciation", value: "+22%" },
      { label: "Government development zone", value: "Yes — CIDCO node" },
    ],
  },
];

const LOCALITY = {
  name: "Kharghar", city: "Navi Mumbai", overall: 8.9, label: "Excellent", reviews: 125,
  tagline: "Well-planned node with excellent infrastructure, green spaces, and strong future growth.",
  sky: ["#BFE0FA", "#EAF6EC"], skyline: [26, 40, 30, 55, 34, 22],
  strengths: ["Excellent access to parks and open spaces", "Strong healthcare and education availability", "Clean, well-planned road layout"],
  considerations: ["Longer commute to central business districts", "Housing prices trending upward"],
  insight: "Kharghar is a strong choice for families and people who prioritize greenery, planned infrastructure, and access to healthcare and education — with a modest trade-off in commute time to central Mumbai.",
};

/* ============================== PRIMITIVES ============================== */
function CityThumb({ sky, skyline, name }) {
  return (
    <svg viewBox="0 0 300 200" className="w-full h-full" preserveAspectRatio="xMidYMid slice">
      <defs>
        <linearGradient id={`sky-${name}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={sky[0]} /><stop offset="100%" stopColor={sky[1]} />
        </linearGradient>
      </defs>
      <rect width="300" height="200" fill={`url(#sky-${name})`} />
      <rect y="158" width="300" height="42" fill="#DCE8EE" opacity="0.7" />
      {skyline.map((h, i) => (
        <rect key={i} x={10 + i * 48} y={158 - h * 1.9} width="30" height={h * 1.9 + 12} fill="#7C93A8" opacity={0.55 + (i % 3) * 0.12} rx="1.5" />
      ))}
      <circle cx="252" cy="34" r="15" fill="#FFFFFF" opacity="0.8" />
    </svg>
  );
}

function ScoreRing({ score, size = 128 }) {
  const r = (size - 12) / 2, cx = size / 2, cy = size / 2, circ = 2 * Math.PI * r;
  const len = circ * (score / 10);
  return (
    <div className="relative shrink-0" style={{ width: size, height: size }}>
      <svg width={size} height={size}>
        <circle cx={cx} cy={cy} r={r} fill="none" stroke={C.borderSoft} strokeWidth="9" />
        <circle cx={cx} cy={cy} r={r} fill="none" stroke={C.green} strokeWidth="9"
          strokeDasharray={`${len} ${circ}`} strokeLinecap="round" transform={`rotate(-90 ${cx} ${cy})`} />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="dwl-display font-extrabold" style={{ fontSize: size * 0.26, color: C.navy, lineHeight: 1 }}>{score.toFixed(1)}</span>
        <span className="text-xs font-semibold" style={{ color: C.textMuted }}>/ 10</span>
      </div>
    </div>
  );
}

/* ============================== NAVBAR ============================== */
function NavBar() {
  const links = ["Home", "Explore", "Compare", "Recommendations", "About Us"];
  return (
    <header className="sticky top-0 z-40" style={{ background: "#fff", borderBottom: `1px solid ${C.border}` }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-10 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ background: C.blue }}>
            <Home size={16} color="#fff" />
          </div>
          <span className="dwl-display font-extrabold text-lg">Dwellio</span>
        </div>
        <nav className="hidden md:flex items-center gap-10 text-sm">
          {links.map((l) => <span key={l} className={`dwl-navlink pb-1.5 cursor-pointer ${l === "Explore" ? "active" : ""}`}>{l}</span>)}
        </nav>
        <div className="flex items-center gap-5">
          <span className="hidden sm:flex items-center gap-1.5 text-sm font-semibold" style={{ color: C.textSoft }}><Heart size={16} /> Saved</span>
          <div className="flex items-center gap-1.5 cursor-pointer">
            <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold" style={{ background: C.blueSoft, color: C.blueDark }}>VB</div>
            <ChevronDown size={14} style={{ color: C.textMuted }} />
          </div>
        </div>
      </div>
    </header>
  );
}

/* ============================== FACTOR ACCORDION ============================== */
function FactorAccordion({ f, isOpen, onToggle }) {
  return (
    <div className="dwl-factor rounded-2xl border overflow-hidden" style={{ borderColor: isOpen ? f.color : C.border, background: C.surface }}>
      <button onClick={onToggle} className="w-full flex items-center gap-4 p-4 text-left">
        <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ background: f.soft }}>
          <f.icon size={18} style={{ color: f.color }} />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-1.5">
            <span className="font-bold text-sm">{f.label}</span>
            <span className="dwl-display font-extrabold text-sm" style={{ color: f.color }}>{f.score.toFixed(1)}</span>
          </div>
          <div className="h-1.5 rounded-full" style={{ background: C.borderSoft }}>
            <div className="h-1.5 rounded-full" style={{ width: `${f.score * 10}%`, background: f.color }} />
          </div>
        </div>
        <ChevronDown size={18} className={`dwl-chevron shrink-0 ${isOpen ? "open" : ""}`} style={{ color: C.textMuted }} />
      </button>

      {isOpen && (
        <div className="dwl-body px-4 pb-4">
          <div className="pt-3 border-t" style={{ borderColor: C.borderSoft }}>
            <div className="flex items-center gap-1.5 mb-3">
              <Info size={12} style={{ color: C.textMuted }} />
              <span className="text-xs font-semibold" style={{ color: C.textMuted }}>What we considered for this score</span>
            </div>
            <div className="grid sm:grid-cols-2 gap-x-6 gap-y-2.5">
              {f.metrics.map((m) => (
                <div key={m.label} className="flex items-center justify-between text-sm gap-3">
                  <span className="flex items-center gap-2" style={{ color: C.textSoft }}>
                    <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: f.color }} />
                    {m.label}
                  </span>
                  <span className="font-bold text-right shrink-0" style={{ color: C.navy }}>{m.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ============================== APP ============================== */
export default function LocalityDetailsPage() {
  const [openKeys, setOpenKeys] = useState(new Set(["healthcare"]));
  const toggle = (key) => setOpenKeys((prev) => {
    const next = new Set(prev);
    next.has(key) ? next.delete(key) : next.add(key);
    return next;
  });
  const expandAll = () => setOpenKeys(new Set(FACTORS.map((f) => f.key)));
  const collapseAll = () => setOpenKeys(new Set());

  const l = LOCALITY;

  return (
    <div className="dwl-root min-h-screen pb-16">
      <style dangerouslySetInnerHTML={{ __html: FONT_CSS }} />
      <NavBar />

      <div className="max-w-6xl mx-auto px-6 lg:px-10 pt-6">
        <div className="flex items-center gap-1.5 text-sm mb-5">
          <span className="font-semibold" style={{ color: C.blue }}>Home</span>
          <ChevronRight size={14} style={{ color: C.textMuted }} />
          <span className="font-semibold" style={{ color: C.blue }}>Explore</span>
          <ChevronRight size={14} style={{ color: C.textMuted }} />
          <span className="font-semibold" style={{ color: C.textSoft }}>{l.name}</span>
        </div>

        {/* Overview */}
        <div className="grid lg:grid-cols-[1.3fr_1fr] gap-6 mb-10">
          <div className="rounded-2xl border overflow-hidden" style={{ borderColor: C.border, background: C.surface }}>
            <div className="h-56"><CityThumb sky={l.sky} skyline={l.skyline} name="hero" /></div>
            <div className="p-6">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h1 className="dwl-display font-extrabold text-2xl mb-1">{l.name}</h1>
                  <div className="text-sm flex items-center gap-1" style={{ color: C.textMuted }}><MapPin size={13} />{l.city}</div>
                </div>
                <span className="inline-flex items-center gap-1 text-xs font-bold px-2.5 py-1 rounded-full" style={{ background: C.greenSoft, color: C.greenText }}>
                  <Star size={11} fill={C.greenText} /> {l.label}
                </span>
              </div>
              <p className="text-sm mb-4" style={{ color: C.textSoft }}>{l.tagline}</p>
              <div className="flex items-center gap-3">
                <button className="dwl-btn-primary inline-flex items-center gap-2 rounded-xl font-bold px-4 py-2.5 text-sm">
                  <Plus size={15} /> Add to Compare
                </button>
                <button className="dwl-btn-outline inline-flex items-center gap-2 rounded-xl font-bold px-4 py-2.5 text-sm">
                  <Bookmark size={15} /> Save
                </button>
                <span className="ml-auto text-xs flex items-center gap-1" style={{ color: C.textMuted }}><Users size={12} />{l.reviews} reviews</span>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border p-6 flex flex-col items-center justify-center text-center" style={{ borderColor: C.border, background: C.surface }}>
            <ScoreRing score={l.overall} />
            <span className="text-sm font-bold mt-3">Overall Livability Score</span>
            <span className="text-xs mt-1" style={{ color: C.textMuted }}>Based on 9 factors</span>
            <div className="grid grid-cols-3 gap-2 w-full mt-6">
              {FACTORS.slice(0, 3).map((f) => (
                <div key={f.key} className="p-2.5 rounded-xl border flex flex-col items-center gap-1" style={{ borderColor: C.borderSoft }}>
                  <f.icon size={14} style={{ color: f.color }} />
                  <span className="dwl-display font-extrabold text-sm">{f.score.toFixed(1)}</span>
                  <span className="text-[10px] font-semibold text-center leading-tight" style={{ color: C.textMuted }}>{f.label.split(" & ")[0]}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Factor breakdown */}
        <section className="mb-10">
          <div className="flex items-center justify-between mb-5 flex-wrap gap-3">
            <div>
              <h2 className="dwl-display font-extrabold text-xl">Category Breakdown</h2>
              <p className="text-xs mt-1" style={{ color: C.textMuted }}>Tap any factor to see exactly what was considered in its score.</p>
            </div>
            <div className="flex items-center gap-2">
              <button onClick={expandAll} className="text-xs font-bold px-3 py-1.5 rounded-lg border" style={{ borderColor: C.border, color: C.textSoft }}>Expand all</button>
              <button onClick={collapseAll} className="text-xs font-bold px-3 py-1.5 rounded-lg border" style={{ borderColor: C.border, color: C.textSoft }}>Collapse all</button>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            {FACTORS.map((f) => (
              <FactorAccordion key={f.key} f={f} isOpen={openKeys.has(f.key)} onToggle={() => toggle(f.key)} />
            ))}
          </div>
        </section>

        {/* Strengths / Considerations */}
        <div className="grid lg:grid-cols-2 gap-6 mb-10">
          <div className="rounded-2xl border p-6" style={{ borderColor: C.greenSoft, background: "#F4FBF6" }}>
            <h3 className="font-bold mb-3 flex items-center gap-2" style={{ color: C.greenText }}><Check size={16} /> Strengths</h3>
            <ul className="space-y-2.5">
              {l.strengths.map((s) => <li key={s} className="text-sm flex gap-2" style={{ color: C.textSoft }}><span style={{ color: C.greenText }}>•</span>{s}</li>)}
            </ul>
          </div>
          <div className="rounded-2xl border p-6" style={{ borderColor: C.amberSoft, background: "#FEFAF3" }}>
            <h3 className="font-bold mb-3 flex items-center gap-2" style={{ color: C.amber }}><Info size={16} /> Things to consider</h3>
            <ul className="space-y-2.5">
              {l.considerations.map((s) => <li key={s} className="text-sm flex gap-2" style={{ color: C.textSoft }}><span style={{ color: C.amber }}>•</span>{s}</li>)}
            </ul>
          </div>
        </div>

        {/* Insight */}
        <div className="rounded-2xl p-7 flex gap-4 mb-10" style={{ background: C.navy }}>
          <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ background: "rgba(255,255,255,0.12)" }}>
            <Sparkle size={18} color="#fff" />
          </div>
          <div>
            <div className="text-xs font-bold uppercase tracking-wide mb-1.5" style={{ color: "#9DB6F5", letterSpacing: "0.08em" }}>Dwellio Insight</div>
            <p className="text-base leading-relaxed" style={{ color: "#fff" }}>{l.insight}</p>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 rounded-xl px-5 py-4" style={{ background: C.blueSoft }}>
          <span className="text-sm font-medium" style={{ color: C.blueDark }}>Want to see how {l.name} stacks up against other localities?</span>
          <button className="dwl-btn-primary inline-flex items-center gap-1.5 rounded-xl font-bold px-4 py-2 text-sm whitespace-nowrap">
            Compare Localities <ArrowRight size={14} />
          </button>
        </div>
      </div>
    </div>
  );
}