import React from "react";
import {
  Home, ChevronDown, Heart, ArrowRight, ShieldCheck, TrainFront, HeartPulse,
  GraduationCap, Sprout, ShoppingBag, Sparkles, TrendingUp, Compass, SlidersHorizontal,
  Scale, Flag, Users, LineChart, Quote, Target
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
  green: "#159C5B",
};

const FONT_CSS = `
@import url('https://fonts.googleapis.com/css2?family=Manrope:wght@600;700;800&family=Inter:wght@400;500;600;700&display=swap');
* { box-sizing: border-box; }
.dwa-root { font-family:'Inter',-apple-system,sans-serif; background:${C.bg}; color:${C.navy}; }
.dwa-display { font-family:'Manrope','Inter',sans-serif; letter-spacing:-0.02em; }
.dwa-navlink { position:relative; color:${C.textSoft}; font-weight:600; }
.dwa-navlink.active { color:${C.blue}; }
.dwa-navlink.active::after { content:''; position:absolute; left:0; right:0; bottom:-19px; height:2px; background:${C.blue}; border-radius:2px; }
.dwa-btn-primary{ background:${C.blue}; color:#fff; transition: background .15s ease, transform .1s ease; }
.dwa-btn-primary:hover{ background:${C.blueDark}; }
.dwa-btn-outline{ background:#fff; color:${C.navy}; border:1.3px solid ${C.border}; transition: all .15s ease; }
.dwa-btn-outline:hover{ border-color:${C.blue}; color:${C.blue}; }
.dwa-card{ transition: box-shadow .2s ease, transform .2s ease; }
.dwa-card:hover{ box-shadow: 0 16px 32px -18px rgba(16,24,39,0.16); transform: translateY(-2px); }
`;

/* ============================== DATA ============================== */
const FACTORS = [
  { label: "Safety & Security", icon: ShieldCheck, color: "#DC2626", soft: "#FDE3E3" },
  { label: "Connectivity & Transport", icon: TrainFront, color: "#2563EB", soft: "#DEE9FE" },
  { label: "Healthcare", icon: HeartPulse, color: "#DB2777", soft: "#FBE1EE" },
  { label: "Education", icon: GraduationCap, color: "#7C3AED", soft: "#ECE3FD" },
  { label: "Environment", icon: Sprout, color: "#159C5B", soft: "#DBF5E5" },
  { label: "Amenities & Daily Convenience", icon: ShoppingBag, color: "#D97706", soft: "#FCECD2" },
  { label: "Lifestyle & Recreation", icon: Sparkles, color: "#0D9488", soft: "#D9F2EF" },
  { label: "Housing & Affordability", icon: Home, color: "#C2740C", soft: "#FBE7CE" },
  { label: "Future Growth", icon: TrendingUp, color: "#2563EB", soft: "#DEE9FE" },
];

const PERSONAS = [
  { icon: GraduationCap, name: "A student", desc: "cares most about connectivity and affordability.", color: "#7C3AED", soft: "#ECE3FD" },
  { icon: Users, name: "A family", desc: "prioritizes safety, education, and healthcare.", color: "#DC2626", soft: "#FDE3E3" },
  { icon: LineChart, name: "An investor", desc: "cares more about housing trends and future growth.", color: "#2563EB", soft: "#DEE9FE" },
];

const STEPS = [
  { n: "1", title: "Explore", desc: "Browse localities and understand their strengths.", icon: Compass },
  { n: "2", title: "Prioritize", desc: "Tell Dwellio what matters most to you.", icon: SlidersHorizontal },
  { n: "3", title: "Compare", desc: "Compare multiple localities side-by-side.", icon: Scale },
  { n: "4", title: "Decide", desc: "Find the locality that best matches your priorities.", icon: Flag },
];

/* ============================== PRIMITIVES ============================== */
function Button({ children, variant = "primary", icon: Icon = ArrowRight, size = "md" }) {
  const sizes = { md: "px-5 py-3 text-sm", lg: "px-7 py-3.5 text-base" };
  const cls = variant === "primary" ? "dwa-btn-primary" : "dwa-btn-outline";
  return (
    <button className={`inline-flex items-center justify-center gap-2 rounded-xl font-bold ${sizes[size]} ${cls}`}>
      {children}<Icon size={size === "lg" ? 17 : 15} />
    </button>
  );
}

function SectionLabel({ children }) {
  return <span className="text-xs font-bold uppercase tracking-widest" style={{ color: C.blue, letterSpacing: "0.1em" }}>{children}</span>;
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
          <span className="dwa-display font-extrabold text-lg">Dwellio</span>
        </div>
        <nav className="hidden md:flex items-center gap-10 text-sm">
          {links.map((l) => <span key={l} className={`dwa-navlink pb-1.5 cursor-pointer ${l === "About Us" ? "active" : ""}`}>{l}</span>)}
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

/* ============================== HERO ============================== */
function Hero() {
  return (
    <section className="relative overflow-hidden" style={{ background: "linear-gradient(180deg,#EDF2FA 0%,#F5F7FB 100%)" }}>
      <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full" style={{ background: "#E1EAFB", opacity: 0.6, filter: "blur(10px)" }} />
      <div className="max-w-3xl mx-auto px-6 lg:px-10 pt-20 pb-16 text-center relative">
        <SectionLabel>About Dwellio</SectionLabel>
        <h1 className="dwa-display font-extrabold text-4xl lg:text-5xl leading-tight mt-3 mb-5">
          Make better decisions about where you live.
        </h1>
        <p className="text-base leading-relaxed mb-4" style={{ color: C.textSoft }}>
          Choosing a locality shouldn't mean jumping between maps, property websites, reviews, and random Google searches.
        </p>
        <p className="text-base leading-relaxed mb-9" style={{ color: C.textSoft }}>
          Dwellio brings the factors that matter into one place — so you can understand, compare, and find localities that fit you.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <Button>Explore Localities</Button>
          <Button variant="outline">Find Your Match</Button>
        </div>
      </div>
    </section>
  );
}

/* ============================== WHY DWELLIO ============================== */
function WhyDwellio() {
  return (
    <section className="max-w-5xl mx-auto px-6 lg:px-10 py-20">
      <div className="text-center max-w-2xl mx-auto mb-12">
        <SectionLabel>Why Dwellio?</SectionLabel>
        <h2 className="dwa-display font-extrabold text-3xl mt-3">
          Most platforms help you find a property.<br />Dwellio helps you understand the place around it.
        </h2>
      </div>

      <div className="grid sm:grid-cols-2 gap-6 relative">
        <div className="rounded-2xl border p-8" style={{ borderColor: C.border, background: C.surface }}>
          <span className="text-xs font-bold uppercase tracking-wide" style={{ color: C.textMuted, letterSpacing: "0.06em" }}>Property platforms</span>
          <div className="flex items-start gap-3 mt-4">
            <Quote size={20} style={{ color: C.textMuted, flexShrink: 0 }} />
            <p className="text-xl font-semibold italic" style={{ color: C.textSoft }}>"Which apartment should I buy?"</p>
          </div>
        </div>

        <div className="rounded-2xl border-2 p-8" style={{ borderColor: C.blue, background: C.blueSoft }}>
          <span className="text-xs font-bold uppercase tracking-wide" style={{ color: C.blueDark, letterSpacing: "0.06em" }}>Dwellio</span>
          <div className="flex items-start gap-3 mt-4">
            <Quote size={20} style={{ color: C.blue, flexShrink: 0 }} />
            <p className="text-xl font-bold" style={{ color: C.navy }}>"Is this the right locality for me?"</p>
          </div>
        </div>

        <div className="hidden sm:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full items-center justify-center font-extrabold text-xs"
          style={{ background: C.navy, color: "#fff", boxShadow: "0 6px 16px -6px rgba(16,24,39,0.4)" }}>vs</div>
      </div>
    </section>
  );
}

/* ============================== WHAT WE LOOK AT ============================== */
function WhatWeLookAt() {
  return (
    <section className="py-20" style={{ background: C.surface }}>
      <div className="max-w-5xl mx-auto px-6 lg:px-10">
        <div className="text-center max-w-xl mx-auto mb-12">
          <SectionLabel>What We Look At</SectionLabel>
          <h2 className="dwa-display font-extrabold text-3xl mt-3">A clean grid of your 9 factors</h2>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {FACTORS.map((f) => (
            <div key={f.label} className="dwa-card p-5 rounded-2xl border flex flex-col items-center text-center gap-3" style={{ borderColor: C.border, background: C.bg }}>
              <div className="w-11 h-11 rounded-xl flex items-center justify-center" style={{ background: f.soft }}>
                <f.icon size={20} style={{ color: f.color }} />
              </div>
              <span className="text-sm font-bold leading-tight">{f.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================== BUILT AROUND YOUR PRIORITIES ============================== */
function Priorities() {
  return (
    <section className="max-w-5xl mx-auto px-6 lg:px-10 py-20">
      <div className="text-center max-w-2xl mx-auto mb-12">
        <SectionLabel>Built Around Your Priorities</SectionLabel>
        <h2 className="dwa-display font-extrabold text-3xl mt-3 mb-3">No two people look for the same thing.</h2>
      </div>

      <div className="grid sm:grid-cols-3 gap-5 mb-12">
        {PERSONAS.map((p) => (
          <div key={p.name} className="dwa-card p-6 rounded-2xl border" style={{ borderColor: C.border, background: C.surface }}>
            <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-4" style={{ background: p.soft }}>
              <p.icon size={20} style={{ color: p.color }} />
            </div>
            <h3 className="font-bold text-base mb-1.5">{p.name}</h3>
            <p className="text-sm" style={{ color: C.textSoft }}>{p.desc}</p>
          </div>
        ))}
      </div>

      <p className="text-base text-center leading-relaxed max-w-2xl mx-auto" style={{ color: C.textSoft }}>
        Dwellio lets you tell us what matters most, then uses those priorities to help you discover localities that better match your needs.
      </p>
    </section>
  );
}

/* ============================== OUR APPROACH ============================== */
function Approach() {
  return (
    <section className="py-20" style={{ background: C.surface }}>
      <div className="max-w-6xl mx-auto px-6 lg:px-10">
        <div className="text-center max-w-xl mx-auto mb-14">
          <SectionLabel>Our Approach</SectionLabel>
          <h2 className="dwa-display font-extrabold text-3xl mt-3">From exploring to deciding, in four steps</h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {STEPS.map((s, i) => (
            <div key={s.n} className="relative">
              <div className="p-6 rounded-2xl border h-full" style={{ borderColor: C.border, background: C.bg }}>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center font-extrabold text-sm" style={{ background: C.blue, color: "#fff" }}>{s.n}</div>
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: C.blueSoft }}>
                    <s.icon size={18} style={{ color: C.blue }} />
                  </div>
                </div>
                <h3 className="font-bold text-base mb-1.5">{s.title}</h3>
                <p className="text-sm" style={{ color: C.textSoft }}>{s.desc}</p>
              </div>
              {i < STEPS.length - 1 && (
                <div className="hidden lg:flex absolute top-11 -right-4 w-8 items-center justify-center" style={{ color: C.textMuted }}>
                  <ArrowRight size={16} />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================== OUR VISION ============================== */
function Vision() {
  return (
    <section className="max-w-4xl mx-auto px-6 lg:px-10 py-20 text-center">
      <div className="w-12 h-12 rounded-2xl flex items-center justify-center mx-auto mb-6" style={{ background: C.blueSoft }}>
        <Target size={22} style={{ color: C.blue }} />
      </div>
      <SectionLabel>Our Vision</SectionLabel>
      <h2 className="dwa-display font-extrabold text-2xl lg:text-3xl leading-snug mt-4 mb-5">
        Choosing where to live should be an informed decision — not a confusing one.
      </h2>
      <p className="text-base leading-relaxed" style={{ color: C.textSoft, maxWidth: 560, margin: "0 auto" }}>
        We're building Dwellio to make locality information easier to understand, easier to compare, and more personal.
      </p>
    </section>
  );
}

/* ============================== CTA ============================== */
function CTA() {
  return (
    <section className="max-w-6xl mx-auto px-6 lg:px-10 pb-20">
      <div className="rounded-3xl p-12 lg:p-16 text-center relative overflow-hidden" style={{ background: C.navy }}>
        <div className="absolute -top-16 -left-16 w-64 h-64 rounded-full" style={{ background: "rgba(47,111,237,0.25)", filter: "blur(10px)" }} />
        <div className="relative">
          <h2 className="dwa-display font-extrabold text-3xl lg:text-4xl text-white mb-3">Find a locality that fits you.</h2>
          <p className="text-base mb-8" style={{ color: "#B7C2D6" }}>Start by telling us what matters most.</p>
          <Button size="lg">Take the Recommendation Quiz</Button>
        </div>
      </div>
    </section>
  );
}

/* ============================== FOOTER ============================== */
function Footer() {
  const cols = [
    { title: "Product", items: ["Explore Localities", "Compare Localities", "Find My Locality", "Saved Localities"] },
    { title: "Resources", items: ["Blog", "Methodology", "Data Sources", "Help Center"] },
    { title: "Company", items: ["About Us", "Careers", "Contact Us", "Privacy Policy"] },
  ];
  return (
    <footer className="border-t" style={{ borderColor: C.border, background: C.surface }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-14 grid sm:grid-cols-2 lg:grid-cols-5 gap-10">
        <div className="lg:col-span-2">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: C.blue }}><Home size={15} color="#fff" /></div>
            <span className="dwa-display font-extrabold text-lg">Dwellio</span>
          </div>
          <p className="text-sm" style={{ color: C.textSoft, maxWidth: 260 }}>Data-driven locality intelligence for smarter home decisions.</p>
        </div>
        {cols.map((c) => (
          <div key={c.title}>
            <h4 className="text-sm font-bold mb-3">{c.title}</h4>
            <ul className="space-y-2">{c.items.map((i) => <li key={i} className="text-xs" style={{ color: C.textSoft }}>{i}</li>)}</ul>
          </div>
        ))}
        <div>
          <h4 className="text-sm font-bold mb-3">Newsletter</h4>
          <p className="text-xs mb-3" style={{ color: C.textSoft }}>Stay updated with the latest insights and new localities.</p>
          <div className="flex items-center gap-2 p-1.5 rounded-xl border" style={{ borderColor: C.border }}>
            <input placeholder="Enter your email" className="flex-1 bg-transparent outline-none text-xs px-2" />
            <button className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0" style={{ background: C.blue }}><ArrowRight size={13} color="#fff" /></button>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-5 border-t text-xs" style={{ borderColor: C.borderSoft, color: C.textMuted }}>
        © 2025 Dwellio. All rights reserved.
      </div>
    </footer>
  );
}

/* ============================== APP ============================== */
export default function AboutDwellioPage() {
  return (
    <div className="dwa-root min-h-screen">
      <style dangerouslySetInnerHTML={{ __html: FONT_CSS }} />
      <NavBar />
      <Hero />
      <WhyDwellio />
      <WhatWeLookAt />
      <Priorities />
      <Approach />
      <Vision />
      <CTA />
      <Footer />
    </div>
  );
}