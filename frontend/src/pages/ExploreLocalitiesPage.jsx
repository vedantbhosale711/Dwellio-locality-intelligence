import React, { useState, useMemo, useRef } from "react";
import {
  Home, Search, MapPin, ArrowRight, Heart, ChevronDown, ChevronRight, X, RotateCcw,
  SlidersHorizontal, Star, ShieldCheck, TrainFront, HeartPulse, GraduationCap, Sprout,
  ShoppingBag, Sparkles, TrendingUp
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
};

const FONT_CSS = `
@import url('https://fonts.googleapis.com/css2?family=Manrope:wght@600;700;800&family=Inter:wght@400;500;600;700&display=swap');
* { box-sizing: border-box; }
.dwd-root { font-family:'Inter',-apple-system,sans-serif; background:${C.bg}; color:${C.navy}; }
.dwd-display { font-family:'Manrope','Inter',sans-serif; letter-spacing:-0.02em; }
.dwd-navlink { position:relative; color:${C.textSoft}; font-weight:600; }
.dwd-navlink.active { color:${C.blue}; }
.dwd-navlink.active::after { content:''; position:absolute; left:0; right:0; bottom:-19px; height:2px; background:${C.blue}; border-radius:2px; }
.dwd-btn-primary{ background:${C.blue}; color:#fff; transition: background .15s ease; }
.dwd-btn-primary:hover{ background:${C.blueDark}; }
.dwd-btn-outline{ background:#fff; color:${C.blue}; border:1.3px solid ${C.blue}; transition: all .15s ease; }
.dwd-btn-outline:hover{ background:${C.blueSoft}; }
.dwd-card{ transition: box-shadow .2s ease, transform .2s ease; }
.dwd-card:hover{ box-shadow: 0 16px 32px -18px rgba(16,24,39,0.16); transform: translateY(-2px); }
.dwd-chip{ transition: all .15s ease; }
.dwd-scrollx{ scrollbar-width:none; -ms-overflow-style:none; }
.dwd-scrollx::-webkit-scrollbar{ display:none; }
select.dwd-select{ appearance:none; -webkit-appearance:none; }
.dwd-fade{ animation: dwdFade .35s ease both; }
@keyframes dwdFade{ from{opacity:0; transform:translateY(6px);} to{opacity:1; transform:translateY(0);} }
`;

/* ============================== FACTOR META (9 core factors) ============================== */
const FACTORS = [
  { key: "safety", label: "Safety & Security", icon: ShieldCheck, color: "#DC2626", soft: "#FDE3E3" },
  { key: "connectivity", label: "Connectivity", icon: TrainFront, color: "#2563EB", soft: "#DEE9FE" },
  { key: "healthcare", label: "Healthcare", icon: HeartPulse, color: "#DB2777", soft: "#FBE1EE" },
  { key: "education", label: "Education", icon: GraduationCap, color: "#7C3AED", soft: "#ECE3FD" },
  { key: "environment", label: "Environment", icon: Sprout, color: "#159C5B", soft: "#DBF5E5" },
  { key: "amenities", label: "Amenities", icon: ShoppingBag, color: "#D97706", soft: "#FCECD2" },
  { key: "lifestyle", label: "Lifestyle", icon: Sparkles, color: "#0D9488", soft: "#D9F2EF" },
  { key: "housing", label: "Housing", icon: Home, color: "#C2740C", soft: "#FBE7CE" },
  { key: "growth", label: "Future Growth", icon: TrendingUp, color: "#2563EB", soft: "#DEE9FE" },
];
const LEFT_FACTORS = FACTORS.slice(0, 5);
const RIGHT_FACTORS = FACTORS.slice(5);

/* ============================== DATA ============================== */
const LOCALITIES = [
  { id: "kharghar", name: "Kharghar", city: "Navi Mumbai", overall: 8.9, label: "Excellent", reviews: 125,
    desc: "Well-planned node with excellent infrastructure, green spaces, and strong future growth.",
    safety: 8.5, connectivity: 9.1, healthcare: 8.2, education: 8.3, environment: 8.7, amenities: 9.0, lifestyle: 8.6, housing: 8.2, growth: 8.9,
    sky: ["#BFE0FA", "#EAF6EC"], skyline: [26, 40, 30, 55, 34, 22] },
  { id: "vashi", name: "Vashi", city: "Navi Mumbai", overall: 8.6, label: "Excellent", reviews: 98,
    desc: "Prime location with great connectivity, amenities, and quality of life.",
    safety: 8.2, connectivity: 8.8, healthcare: 8.1, education: 8.0, environment: 8.3, amenities: 8.8, lifestyle: 8.5, housing: 8.0, growth: 8.6,
    sky: ["#BEDBF9", "#DDEFF1"], skyline: [34, 20, 46, 28, 38, 24] },
  { id: "powai", name: "Powai", city: "Mumbai", overall: 8.4, label: "Very Good", reviews: 112,
    desc: "Vibrant locality with premium lifestyle, top schools, and excellent connectivity.",
    safety: 8.0, connectivity: 9.0, healthcare: 7.8, education: 8.6, environment: 8.6, amenities: 8.2, lifestyle: 8.8, housing: 7.9, growth: 8.4,
    sky: ["#CFE3FB", "#E6F1E3"], skyline: [40, 24, 52, 30, 20, 44] },
  { id: "andheri", name: "Andheri", city: "Mumbai", overall: 8.2, label: "Very Good", reviews: 87,
    desc: "High-energy suburb with unmatched rail, metro and airport access.",
    safety: 7.3, connectivity: 9.3, healthcare: 8.6, education: 8.3, environment: 6.2, amenities: 8.9, lifestyle: 8.8, housing: 6.0, growth: 8.5,
    sky: ["#C7DEF7", "#EDEEE2"], skyline: [22, 36, 26, 44, 30, 20] },
  { id: "bandra", name: "Bandra", city: "Mumbai", overall: 8.1, label: "Very Good", reviews: 143,
    desc: "Iconic seafront suburb known for its vibrant culture and dining scene.",
    safety: 8.0, connectivity: 9.2, healthcare: 8.7, education: 8.4, environment: 6.9, amenities: 9.0, lifestyle: 9.3, housing: 5.4, growth: 8.6,
    sky: ["#CFE0F8", "#F1E9EE"], skyline: [30, 46, 22, 38, 28, 34] },
  { id: "koramangala", name: "Koramangala", city: "Bengaluru", overall: 8.0, label: "Very Good", reviews: 76,
    desc: "Bengaluru's buzzing startup hub with a thriving cafe culture.",
    safety: 7.8, connectivity: 8.6, healthcare: 8.3, education: 8.5, environment: 6.9, amenities: 9.0, lifestyle: 8.9, housing: 6.2, growth: 8.8,
    sky: ["#D3E6F7", "#E8F0E2"], skyline: [28, 42, 24, 36, 32, 26] },
];

const SCORE_LEVELS = ["Any", "6+", "7+", "8+", "9+"];
const CITY_OPTIONS = ["All Cities", "Mumbai", "Navi Mumbai", "Bengaluru"];
const SORT_OPTIONS = [
  { id: "overall_desc", label: "Overall Score — High to Low" },
  { id: "overall_asc", label: "Overall Score — Low to High" },
  { id: "reviews_desc", label: "Most Reviewed" },
];

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

function ScoreRing({ score, size = 96 }) {
  const r = (size - 10) / 2, cx = size / 2, cy = size / 2, circ = 2 * Math.PI * r;
  const len = circ * (score / 10);
  return (
    <div className="relative shrink-0" style={{ width: size, height: size }}>
      <svg width={size} height={size}>
        <circle cx={cx} cy={cy} r={r} fill="none" stroke={C.borderSoft} strokeWidth="7" />
        <circle cx={cx} cy={cy} r={r} fill="none" stroke={C.green} strokeWidth="7"
          strokeDasharray={`${len} ${circ}`} strokeLinecap="round" transform={`rotate(-90 ${cx} ${cy})`} />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="dwd-display font-extrabold" style={{ fontSize: size * 0.24, color: C.navy, lineHeight: 1 }}>{score.toFixed(1)}</span>
        <span className="text-[10px] font-semibold" style={{ color: C.textMuted }}>/10</span>
      </div>
    </div>
  );
}

function Dropdown({ value, onChange, options, className = "" }) {
  // options: array of strings, or array of { value, label }
  const norm = options.map((o) => (typeof o === "string" ? { value: o, label: o } : o));
  return (
    <div className={`relative ${className}`}>
      <select value={value} onChange={(e) => onChange(e.target.value)}
        className="dwd-select w-full pl-4 pr-9 py-2.5 rounded-xl text-sm font-semibold border outline-none bg-white"
        style={{ borderColor: C.border, color: C.navy }}>
        {norm.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
      </select>
      <ChevronDown size={15} className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color: C.textMuted }} />
    </div>
  );
}

function Chip({ children, onRemove }) {
  return (
    <span className="dwd-chip inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold" style={{ background: C.blueSoft, color: C.blueDark }}>
      {children}
      <button onClick={onRemove}><X size={12} /></button>
    </span>
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
          <span className="dwd-display font-extrabold text-lg">Dwellio</span>
        </div>
        <nav className="hidden md:flex items-center gap-10 text-sm">
          {links.map((l) => <span key={l} className={`dwd-navlink pb-1.5 cursor-pointer ${l === "Explore" ? "active" : ""}`}>{l}</span>)}
        </nav>
        <div className="flex items-center gap-5">
          <span className="hidden sm:flex items-center gap-1.5 text-sm font-semibold" style={{ color: C.textSoft }}>
            <Heart size={16} /> Saved
          </span>
          <div className="flex items-center gap-1.5 cursor-pointer">
            <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold" style={{ background: C.blueSoft, color: C.blueDark }}>VB</div>
            <ChevronDown size={14} style={{ color: C.textMuted }} />
          </div>
        </div>
      </div>
    </header>
  );
}

/* ============================== HERO ============================== */
function Hero({ search, setSearch }) {
  return (
    <div style={{ background: "linear-gradient(180deg,#EDF2FA 0%,#F5F7FB 100%)" }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-10 pt-12 pb-10 grid lg:grid-cols-[1fr_360px] gap-8 items-center">
        <div>
          <h1 className="dwd-display font-extrabold text-4xl mb-2">Explore Localities</h1>
          <p className="text-sm mb-6" style={{ color: C.textSoft }}>Discover and compare localities based on the factors that matter most to you.</p>
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="flex items-center gap-2 px-4 py-3 rounded-xl flex-1" style={{ background: "#fff", border: `1px solid ${C.border}` }}>
              <Search size={16} style={{ color: C.textMuted }} />
              <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search localities, cities, or areas…"
                className="bg-transparent outline-none text-sm flex-1" style={{ color: C.navy }} />
            </div>
            <button className="dwd-btn-primary inline-flex items-center justify-center gap-2 rounded-xl font-bold px-5 py-3 text-sm whitespace-nowrap">
              Find My Ideal Locality <ArrowRight size={15} />
            </button>
          </div>
        </div>

        <div className="hidden lg:block relative h-44">
          <svg viewBox="0 0 360 180" className="w-full h-full">
            <circle cx="230" cy="80" r="90" fill="#E1EAFB" opacity="0.6" />
            <circle cx="60" cy="30" r="14" fill="#fff" opacity="0.8" />
            <circle cx="90" cy="25" r="10" fill="#fff" opacity="0.7" />
            <rect x="150" y="90" width="34" height="80" rx="3" fill="#B9C8E4" />
            <rect x="190" y="60" width="40" height="110" rx="3" fill="#9FB3D8" />
            <rect x="236" y="100" width="30" height="70" rx="3" fill="#CBD8EE" />
            <rect x="272" y="80" width="24" height="90" rx="3" fill="#B9C8E4" />
            <rect x="196" y="80" width="12" height="14" fill="#7C93C4" />
            <rect x="196" y="104" width="12" height="14" fill="#7C93C4" />
            <path d="M200,20 C192,20 186,26 186,34 C186,44 200,58 200,58 C200,58 214,44 214,34 C214,26 208,20 200,20 Z" fill={C.blue} />
            <circle cx="200" cy="33" r="6" fill="#fff" />
            <path d="M280,10 C273,10 268,15 268,21 C268,29 280,40 280,40 C280,40 292,29 292,21 C292,15 287,10 280,10 Z" fill={C.blue} />
            <circle cx="280" cy="20" r="5" fill="#fff" />
            <circle cx="310" cy="150" r="10" fill="#7CAA6E" /><rect x="308" y="150" width="4" height="20" fill="#7CAA6E" />
            <circle cx="130" cy="155" r="10" fill="#7CAA6E" /><rect x="128" y="155" width="4" height="20" fill="#7CAA6E" />
          </svg>
        </div>
      </div>
    </div>
  );
}

/* ============================== FILTER BAR ============================== */
function FilterBar({ filters, setFilter, clearAll, count }) {
  const activeChips = [];
  if (filters.city !== "All Cities") activeChips.push({ key: "city", label: filters.city });
  if (filters.overall !== "Any") activeChips.push({ key: "overall", label: `Overall Score: ${filters.overall}` });
  if (filters.safety !== "Any") activeChips.push({ key: "safety", label: `Safety: ${filters.safety}` });
  if (filters.connectivity !== "Any") activeChips.push({ key: "connectivity", label: `Connectivity: ${filters.connectivity}` });
  if (filters.healthcare !== "Any") activeChips.push({ key: "healthcare", label: `Healthcare: ${filters.healthcare}` });

  const defaults = { city: "All Cities", overall: "Any", safety: "Any", connectivity: "Any", healthcare: "Any" };

  return (
    <div className="max-w-7xl mx-auto px-6 lg:px-10 -mt-2 relative z-10">
      <div className="rounded-2xl border p-4" style={{ borderColor: C.border, background: C.surface, boxShadow: "0 12px 28px -20px rgba(16,24,39,0.15)" }}>
        <div className="flex flex-wrap gap-3 mb-3">
          <Dropdown value={filters.city} onChange={(v) => setFilter("city", v)} options={CITY_OPTIONS} className="w-36" />
          <Dropdown value={filters.overall} onChange={(v) => setFilter("overall", v)} options={SCORE_LEVELS.map((s) => ({ value: s, label: s === "Any" ? "Overall Score" : s }))} className="w-40" />
          <Dropdown value={filters.safety} onChange={(v) => setFilter("safety", v)} options={SCORE_LEVELS.map((s) => ({ value: s, label: s === "Any" ? "Safety" : s }))} className="w-32" />
          <Dropdown value={filters.connectivity} onChange={(v) => setFilter("connectivity", v)} options={SCORE_LEVELS.map((s) => ({ value: s, label: s === "Any" ? "Connectivity" : s }))} className="w-36" />
          <Dropdown value={filters.healthcare} onChange={(v) => setFilter("healthcare", v)} options={SCORE_LEVELS.map((s) => ({ value: s, label: s === "Any" ? "Healthcare" : s }))} className="w-36" />
          <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold border" style={{ borderColor: C.border, color: C.navy }}>
            <SlidersHorizontal size={14} /> More Filters
          </button>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {activeChips.map((c) => <Chip key={c.key} onRemove={() => setFilter(c.key, defaults[c.key])}>{c.label}</Chip>)}
          {activeChips.length > 0 && (
            <button onClick={clearAll} className="flex items-center gap-1.5 text-xs font-bold" style={{ color: C.blue }}>
              <RotateCcw size={12} /> Clear Filters
            </button>
          )}
          <span className="ml-auto text-sm" style={{ color: C.textSoft }}>Showing <b style={{ color: C.navy }}>{count}</b> localities</span>
        </div>
      </div>
    </div>
  );
}

/* ============================== TOP RATED SCROLLER ============================== */
function TopRatedCard({ l, rank }) {
  return (
    <div className="dwd-card rounded-2xl border overflow-hidden shrink-0" style={{ width: 230, borderColor: C.border, background: C.surface }}>
      <div className="h-28 relative">
        <CityThumb sky={l.sky} skyline={l.skyline} name={`top-${l.id}`} />
        <div className="absolute top-3 left-3 w-7 h-7 rounded-full flex items-center justify-center text-xs font-extrabold" style={{ background: "#fff", color: C.navy }}>{rank}</div>
      </div>
      <div className="p-4">
        <div className="flex items-center justify-between mb-1">
          <h3 className="font-bold text-sm">{l.name}</h3>
          <span className="text-xs font-extrabold px-2 py-0.5 rounded-full" style={{ background: C.greenSoft, color: C.greenText }}>{l.overall}</span>
        </div>
        <div className="text-xs mb-2" style={{ color: C.textMuted }}>{l.city}</div>
        <div className="flex items-center gap-1 text-xs font-semibold" style={{ color: C.greenText }}>
          <Star size={12} fill={C.greenText} /> {l.label} <span style={{ color: C.textMuted, fontWeight: 500 }}>· {l.reviews} reviews</span>
        </div>
      </div>
    </div>
  );
}

function TopRatedSection({ list }) {
  const scrollerRef = useRef(null);
  const scroll = () => scrollerRef.current?.scrollBy({ left: 260, behavior: "smooth" });
  return (
    <section className="max-w-7xl mx-auto px-6 lg:px-10 mt-10">
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-extrabold text-lg dwd-display">Top Rated Localities</h2>
        <span className="text-sm font-bold cursor-pointer" style={{ color: C.blue }}>View all</span>
      </div>
      <div className="relative">
        <div ref={scrollerRef} className="dwd-scrollx flex gap-4 overflow-x-auto pb-1">
          {list.slice(0, 4).map((l, i) => <TopRatedCard key={l.id} l={l} rank={i + 1} />)}
        </div>
        {list.length > 4 && (
          <button onClick={scroll} className="hidden sm:flex absolute -right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full items-center justify-center border"
            style={{ background: "#fff", borderColor: C.border, boxShadow: "0 6px 16px -6px rgba(16,24,39,0.25)" }}>
            <ChevronRight size={16} style={{ color: C.navy }} />
          </button>
        )}
      </div>
    </section>
  );
}

/* ============================== DETAILED ROW ============================== */
function DetailedRow({ l }) {
  return (
    <div className="dwd-card dwd-fade rounded-2xl border p-4 grid grid-cols-1 lg:grid-cols-[230px_1fr_120px_1fr] gap-6 items-center" style={{ borderColor: C.border, background: C.surface }}>
      <div className="h-40 lg:h-36 rounded-xl overflow-hidden"><CityThumb sky={l.sky} skyline={l.skyline} name={l.id} /></div>

      <div>
        <h3 className="font-bold text-lg mb-0.5">{l.name}</h3>
        <div className="text-xs flex items-center gap-1 mb-2" style={{ color: C.textMuted }}><MapPin size={11} />{l.city}</div>
        <p className="text-sm mb-3" style={{ color: C.textSoft }}>{l.desc}</p>
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1 text-xs font-bold px-2.5 py-1 rounded-full" style={{ background: C.greenSoft, color: C.greenText }}>
            <Star size={11} fill={C.greenText} /> {l.label}
          </span>
          <span className="text-xs font-bold px-2.5 py-1 rounded-full" style={{ background: C.blueSoft, color: C.blueDark }}>{l.reviews} reviews</span>
        </div>
      </div>

      <div className="flex flex-col items-center justify-self-center">
        <ScoreRing score={l.overall} size={100} />
        <span className="text-xs font-semibold mt-2" style={{ color: C.textMuted }}>Overall Score</span>
      </div>

      <div>
        <div className="grid grid-cols-2 gap-x-6 gap-y-2 mb-3">
          <div className="flex flex-col gap-2">
            {LEFT_FACTORS.map((f) => (
              <div key={f.key} className="flex items-center justify-between text-sm">
                <span className="flex items-center gap-2" style={{ color: C.textSoft }}>
                  <span className="w-6 h-6 rounded-full flex items-center justify-center shrink-0" style={{ background: f.soft }}>
                    <f.icon size={12} style={{ color: f.color }} />
                  </span>
                  {f.label}
                </span>
                <span className="font-bold" style={{ color: C.navy }}>{l[f.key].toFixed(1)}</span>
              </div>
            ))}
          </div>
          <div className="flex flex-col gap-2">
            {RIGHT_FACTORS.map((f) => (
              <div key={f.key} className="flex items-center justify-between text-sm">
                <span className="flex items-center gap-2" style={{ color: C.textSoft }}>
                  <span className="w-6 h-6 rounded-full flex items-center justify-center shrink-0" style={{ background: f.soft }}>
                    <f.icon size={12} style={{ color: f.color }} />
                  </span>
                  {f.label}
                </span>
                <span className="font-bold" style={{ color: C.navy }}>{l[f.key].toFixed(1)}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="flex justify-end">
          <button className="dwd-btn-outline inline-flex items-center gap-1.5 rounded-xl font-bold px-4 py-2 text-sm">
            View Details <ArrowRight size={14} />
          </button>
        </div>
      </div>
    </div>
  );
}

/* ============================== EMPTY STATE ============================== */
function EmptyState({ onClear }) {
  return (
    <div className="rounded-2xl border p-10 flex flex-col sm:flex-row items-center gap-8" style={{ borderColor: C.border, background: C.surface }}>
      <svg viewBox="0 0 160 120" className="w-36 h-28 shrink-0">
        <circle cx="80" cy="60" r="55" fill="#EEF2FA" />
        <rect x="40" y="60" width="20" height="45" fill="#C9D5EA" />
        <rect x="65" y="45" width="22" height="60" fill="#B7C6E4" />
        <rect x="92" y="65" width="18" height="40" fill="#D6E0F0" />
        <circle cx="95" cy="70" r="24" fill="none" stroke={C.blue} strokeWidth="6" />
        <line x1="113" y1="88" x2="128" y2="103" stroke={C.blue} strokeWidth="7" strokeLinecap="round" />
      </svg>
      <div className="text-center sm:text-left flex-1">
        <h3 className="font-extrabold text-lg mb-1">No localities found</h3>
        <p className="text-sm mb-4" style={{ color: C.textSoft }}>Try changing your filters or searching for another area.</p>
        <button onClick={onClear} className="dwd-btn-primary inline-flex items-center gap-2 rounded-xl font-bold px-5 py-2.5 text-sm">
          <RotateCcw size={14} /> Clear Filters
        </button>
      </div>
    </div>
  );
}

/* ============================== APP ============================== */
export default function ExploreLocalitiesDetailed() {
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState({ city: "All Cities", overall: "Any", safety: "Any", connectivity: "Any", healthcare: "Any" });
  const [sortBy, setSortBy] = useState("overall_desc");

  const setFilter = (key, value) => setFilters((f) => ({ ...f, [key]: value }));
  const clearAll = () => { setFilters({ city: "All Cities", overall: "Any", safety: "Any", connectivity: "Any", healthcare: "Any" }); setSearch(""); };

  const minOf = (v) => v === "Any" ? 0 : parseInt(v);

  const filtered = useMemo(() => {
    let list = LOCALITIES.filter((l) =>
      (filters.city === "All Cities" || l.city === filters.city) &&
      l.overall >= minOf(filters.overall) &&
      l.safety >= minOf(filters.safety) &&
      l.connectivity >= minOf(filters.connectivity) &&
      l.healthcare >= minOf(filters.healthcare) &&
      (l.name.toLowerCase().includes(search.toLowerCase()) || l.city.toLowerCase().includes(search.toLowerCase()))
    );
    if (sortBy === "overall_desc") list = [...list].sort((a, b) => b.overall - a.overall);
    if (sortBy === "overall_asc") list = [...list].sort((a, b) => a.overall - b.overall);
    if (sortBy === "reviews_desc") list = [...list].sort((a, b) => b.reviews - a.reviews);
    return list;
  }, [filters, search, sortBy]);

  return (
    <div className="dwd-root min-h-screen pb-16">
      <style dangerouslySetInnerHTML={{ __html: FONT_CSS }} />
      <Hero search={search} setSearch={setSearch} />
      <FilterBar filters={filters} setFilter={setFilter} clearAll={clearAll} count={filtered.length} />

      <div className="max-w-7xl mx-auto px-6 lg:px-10 flex items-center gap-3 mt-6">
        <span className="text-sm font-semibold" style={{ color: C.textSoft }}>Sort by</span>
        <Dropdown value={sortBy} onChange={setSortBy} options={SORT_OPTIONS.map((s) => ({ value: s.id, label: s.label }))} className="w-64" />
      </div>

      {filtered.length > 0 && <TopRatedSection list={filtered} />}

      <section className="max-w-7xl mx-auto px-6 lg:px-10 mt-10">
        {filtered.length === 0 ? (
          <EmptyState onClear={clearAll} />
        ) : (
          <div className="flex flex-col gap-5">
            {filtered.map((l) => <DetailedRow key={l.id} l={l} />)}
          </div>
        )}
      </section>
    </div>
  );
}