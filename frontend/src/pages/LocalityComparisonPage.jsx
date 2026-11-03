
import { useEffect, useMemo, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  Search,
  Plus,
  X,
  MapPin,
  Info,
  Star,
  ShieldCheck,
  TrainFront,
  HeartPulse,
  GraduationCap,
  Sprout,
  ShoppingBag,
  Sparkles,
  Home,
  TrendingUp,
  ArrowRight,
  Lightbulb,
  RotateCcw,
} from "lucide-react";
import { searchLocalities, getLocalityDetails } from "../utils/api";

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
@import url('https://fonts.googleapis.com/css2?family=Manrope:wght@700;800&family=Inter:wght@400;500;600;700&display=swap');
.dwc-root { font-family:'Inter',-apple-system,sans-serif; background:${C.bg}; color:${C.navy}; }
.dwc-display { font-family:'Manrope','Inter',sans-serif; letter-spacing:-0.02em; }
.dwc-btn-primary { background:${C.blue}; color:#fff; transition:background .15s ease; }
.dwc-btn-primary:hover { background:${C.blueDark}; }
.dwc-btn-primary:disabled { opacity:.55; cursor:not-allowed; }
.dwc-card { transition:box-shadow .2s ease; }
.dwc-card:hover { box-shadow:0 16px 32px -18px rgba(16,24,39,.16); }
`;

const FACTORS = [
  { key: "safety", label: "Safety & Security", icon: ShieldCheck },
  { key: "connectivity", label: "Connectivity", icon: TrainFront },
  { key: "healthcare", label: "Healthcare", icon: HeartPulse },
  { key: "education", label: "Education", icon: GraduationCap },
  { key: "environment", label: "Environment", icon: Sprout },
  { key: "amenities", label: "Amenities", icon: ShoppingBag },
  { key: "lifestyle", label: "Lifestyle & Recreation", icon: Sparkles },
  { key: "housing", label: "Housing & Affordability", icon: Home },
  { key: "growth", label: "Future Growth", icon: TrendingUp },
];

function normalizeCategory(value) {
  return String(value || "")
    .toLowerCase()
    .replace(/[\s&/-]+/g, "_")
    .replace(/^_+|_+$/g, "");
}

function getCategoryScore(locality, key) {
  const score = locality.scores?.find(
    (item) => normalizeCategory(item.category) === key
  );

  if (!score || score.score === null || score.score === undefined) {
    return null;
  }

  const value = Number(score.score);

  return Number.isFinite(value) ? value : null;
}

function getOverallScore(locality) {
  const values = FACTORS.map((factor) =>
    getCategoryScore(locality, factor.key)
  ).filter((score) => score !== null);

  if (!values.length) return null;

  return values.reduce((sum, score) => sum + score, 0) / values.length;
}

function ScoreRing({ score }) {
  if (score === null) {
    return (
      <div className="flex h-[76px] w-[76px] shrink-0 items-center justify-center rounded-full border-4 border-slate-100">
        <span className="text-xl font-bold text-slate-400">—</span>
      </div>
    );
  }

  const radius = 32;
  const circumference = 2 * Math.PI * radius;

  return (
    <div className="relative h-[76px] w-[76px] shrink-0">
      <svg viewBox="0 0 76 76" className="h-full w-full -rotate-90">
        <circle
          cx="38"
          cy="38"
          r={radius}
          fill="none"
          stroke="#EFF1F5"
          strokeWidth="6"
        />
        <circle
          cx="38"
          cy="38"
          r={radius}
          fill="none"
          stroke={C.green}
          strokeWidth="6"
          strokeLinecap="round"
          strokeDasharray={`${circumference * Math.max(0, Math.min(10, score)) / 10} ${circumference}`}
        />
      </svg>

      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="dwc-display text-xl font-extrabold">
          {score.toFixed(1)}
        </span>
        <span className="text-[10px] text-slate-400">/ 10</span>
      </div>
    </div>
  );
}

function SelectedCard({ locality, onRemove }) {
  const overall = getOverallScore(locality);

  return (
    <div className="dwc-card flex flex-col overflow-hidden rounded-2xl border bg-white"
      style={{ borderColor: C.border }}>
      <div className="flex items-start justify-between gap-3 p-5">
        <div>
          <h3 className="text-lg font-bold">{locality.name}</h3>

          <p className="mt-2 flex items-start gap-1.5 text-xs text-slate-500">
            <MapPin size={13} className="mt-0.5 shrink-0" />
            {[locality.city, locality.state, locality.country]
              .filter(Boolean)
              .join(", ")}
          </p>
        </div>

        <button
          type="button"
          onClick={() => onRemove(locality.id)}
          aria-label={`Remove ${locality.name}`}
          className="rounded-lg p-2 text-slate-400 hover:bg-red-50 hover:text-red-600"
        >
          <X size={17} />
        </button>
      </div>

      <div className="flex items-center gap-4 border-t border-slate-100 p-5">
        <ScoreRing score={overall} />

        <div>
          <p className="font-bold">Average category score</p>
          <p className="mt-1 text-xs text-slate-500">
            {locality.scores?.length || 0} stored categories
          </p>
          <p className="mt-1 text-xs text-slate-400">
            {overall === null
              ? "Scores not available"
              : "Calculated from available scores"}
          </p>
        </div>
      </div>

      <button
        type="button"
        onClick={() => onRemove(locality.id)}
        className="border-t border-slate-100 py-3 text-sm font-semibold text-red-600 hover:bg-red-50"
      >
        Remove locality
      </button>
    </div>
  );
}

function FactorTable({ localities }) {
  return (
    <div className="overflow-hidden rounded-2xl border bg-white"
      style={{ borderColor: C.border }}>
      <div className="p-5">
        <h2 className="dwc-display text-lg font-extrabold">
          Factor Comparison
        </h2>

        <p className="mt-1 text-xs text-slate-500">
          Green highlights the highest available score for each factor.
        </p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr className="border-y border-slate-100">
              <th className="min-w-48 p-4 text-left">Factor</th>

              {localities.map((locality) => (
                <th key={locality.id} className="min-w-36 p-4 text-left">
                  <div className="font-bold">{locality.name}</div>
                  <div className="mt-1 text-xs font-normal text-slate-400">
                    {locality.city || locality.state || ""}
                  </div>
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {FACTORS.map((factor) => {
              const values = localities.map((locality) =>
                getCategoryScore(locality, factor.key)
              );

              const available = values.filter((value) => value !== null);
              const max = available.length ? Math.max(...available) : null;

              return (
                <tr key={factor.key} className="border-b border-slate-100">
                  <td className="p-4 font-semibold">
                    <div className="flex items-center gap-2">
                      <factor.icon size={16} className="shrink-0 text-blue-600" />
                      {factor.label}
                    </div>
                  </td>

                  {localities.map((locality) => {
                    const value = getCategoryScore(locality, factor.key);
                    const isMax = value !== null && value === max;

                    return (
                      <td
                        key={locality.id}
                        className="p-4 font-bold"
                        style={{
                          background: isMax ? C.greenSoft : "transparent",
                          color: isMax ? C.greenText : C.navy,
                        }}
                      >
                        {value === null ? "—" : value.toFixed(1)}
                      </td>
                    );
                  })}
                </tr>
              );
            })}

            <tr className="bg-slate-50">
              <td className="p-4 font-extrabold">
                Average score
              </td>

              {localities.map((locality) => {
                const score = getOverallScore(locality);

                return (
                  <td key={locality.id} className="p-4 text-lg font-extrabold">
                    {score === null ? "—" : score.toFixed(1)}
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

export default function LocalityComparisonPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [selected, setSelected] = useState([]);
  const [loadingSearch, setLoadingSearch] = useState(false);
  const [loadingInitial, setLoadingInitial] = useState(true);
  const [addingId, setAddingId] = useState(null);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");

  useEffect(() => {
    let cancelled = false;

    async function loadInitial() {
      const idsFromUrl = (searchParams.get("ids") || "")
        .split(",")
        .map((id) => id.trim())
        .filter((id) => /^\d+$/.test(id));

      if (!idsFromUrl.length) {
        setLoadingInitial(false);
        return;
      }

      try {
        const results = await Promise.all(
          [...new Set(idsFromUrl)].slice(0, 4).map(async (id) => {
            const response = await getLocalityDetails(id);
            return response.data;
          })
        );

        if (!cancelled) {
          setSelected(results.filter(Boolean));
        }
      } catch (err) {
        if (!cancelled) {
          setError(err.message || "Unable to load the requested localities.");
        }
      } finally {
        if (!cancelled) {
          setLoadingInitial(false);
        }
      }
    }

    loadInitial();

    return () => {
      cancelled = true;
    };
  }, [searchParams]);

  async function handleSearch(event) {
    event.preventDefault();

    if (query.trim().length < 2) {
      setError("Enter at least 2 characters to search.");
      setResults([]);
      return;
    }

    try {
      setLoadingSearch(true);
      setError("");
      setNotice("");

      const response = await searchLocalities(query.trim());
      const found = response.data || [];

      setResults(found.filter(
        (item) => !selected.some((chosen) => String(chosen.id) === String(item.id))
      ));

      if (!found.length) {
        setNotice("No localities found. Try another name or city.");
      }
    } catch (err) {
      setError(err.message || "Search failed.");
      setResults([]);
    } finally {
      setLoadingSearch(false);
    }
  }

  async function addLocality(locality) {
    if (selected.some((item) => String(item.id) === String(locality.id))) {
      setNotice("This locality is already selected.");
      return;
    }

    if (selected.length >= 4) {
      setNotice("You can compare up to 4 localities at a time.");
      return;
    }

    try {
      setAddingId(locality.id);
      setError("");
      setNotice("");

      const response = await getLocalityDetails(locality.id);

      setSelected((previous) => {
        if (previous.some((item) => String(item.id) === String(locality.id))) {
          return previous;
        }

        if (previous.length >= 4) return previous;

        return [...previous, response.data];
      });

      setResults((previous) =>
        previous.filter((item) => String(item.id) !== String(locality.id))
      );
    } catch (err) {
      setError(err.message || `Unable to load ${locality.name}.`);
    } finally {
      setAddingId(null);
    }
  }

  function removeLocality(id) {
    setSelected((previous) =>
      previous.filter((item) => String(item.id) !== String(id))
    );
  }

  const ranked = useMemo(() => {
    return [...selected].sort((a, b) => {
      const scoreA = getOverallScore(a);
      const scoreB = getOverallScore(b);

      if (scoreA === null) return scoreB === null ? 0 : 1;
      if (scoreB === null) return -1;

      return scoreB - scoreA;
    });
  }, [selected]);

  return (
    <div className="dwc-root min-h-screen pb-14">
      <style dangerouslySetInnerHTML={{ __html: FONT_CSS }} />

      <header className="bg-gradient-to-b from-blue-50 to-slate-100">
        <div className="mx-auto max-w-7xl px-5 pb-8 pt-7 sm:px-8 lg:px-10">
          <div className="mb-5 flex items-center gap-2 text-sm">
            <button onClick={() => navigate("/")} className="text-blue-600">
              Home
            </button>
            <ArrowRight size={13} className="text-slate-400" />
            <span className="font-semibold text-slate-600">
              Compare Localities
            </span>
          </div>

          <h1 className="dwc-display text-3xl font-extrabold sm:text-4xl">
            Compare Localities
          </h1>

          <p className="mt-3 max-w-xl text-sm leading-6 text-slate-600">
            Compare localities using the scores and metrics stored in Dwellio.
            Select up to four places to see how they differ.
          </p>

          <form
            onSubmit={handleSearch}
            className="mt-6 flex max-w-2xl flex-col gap-3 sm:flex-row"
          >
            <div className="flex flex-1 items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3">
              <Search size={17} className="shrink-0 text-slate-400" />

              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search localities, cities or areas..."
                className="w-full bg-transparent text-sm outline-none"
              />
            </div>

            <button
              type="submit"
              disabled={loadingSearch}
              className="dwc-btn-primary inline-flex items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-bold"
            >
              <Search size={15} />
              {loadingSearch ? "Searching..." : "Search"}
            </button>
          </form>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        {error && (
          <div className="my-5 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
            {error}
          </div>
        )}

        {notice && (
          <div className="my-5 rounded-xl border border-blue-100 bg-blue-50 p-4 text-sm text-blue-700">
            {notice}
          </div>
        )}

        {results.length > 0 && (
          <section className="mb-8 mt-6 rounded-2xl border border-slate-200 bg-white p-5">
            <h2 className="mb-4 font-bold">Search Results</h2>

            <div className="divide-y divide-slate-100">
              {results.map((locality) => (
                <div
                  key={locality.id}
                  className="flex flex-col justify-between gap-3 py-4 sm:flex-row sm:items-center"
                >
                  <div>
                    <p className="font-semibold">{locality.name}</p>
                    <p className="mt-1 text-xs text-slate-500">
                      {[locality.city, locality.state, locality.country]
                        .filter(Boolean)
                        .join(", ")}
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => addLocality(locality)}
                    disabled={addingId !== null || selected.length >= 4}
                    className="dwc-btn-primary inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold"
                  >
                    <Plus size={15} />
                    {addingId === locality.id ? "Adding..." : "Add to Compare"}
                  </button>
                </div>
              ))}
            </div>
          </section>
        )}

        <section className="mt-7">
          <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="dwc-display text-xl font-extrabold">
                Selected Localities
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                {selected.length} of 4 selected
              </p>
            </div>

            {selected.length > 0 && (
              <button
                type="button"
                onClick={() => setSelected([])}
                className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-50"
              >
                <RotateCcw size={14} />
                Clear All
              </button>
            )}
          </div>

          {loadingInitial ? (
            <div className="rounded-xl border border-slate-200 bg-white p-8 text-center text-sm text-slate-500">
              Loading selected localities...
            </div>
          ) : selected.length === 0 ? (
            <div className="rounded-2xl border border-slate-200 bg-white px-6 py-14 text-center">
              <MapPin size={28} className="mx-auto mb-3 text-slate-400" />
              <h3 className="font-bold">Start comparing localities</h3>
              <p className="mx-auto mt-2 max-w-md text-sm text-slate-500">
                Search for a place above and add it to your comparison.
              </p>
            </div>
          ) : (
            <>
              <div className="mb-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {selected.map((locality) => (
                  <SelectedCard
                    key={locality.id}
                    locality={locality}
                    onRemove={removeLocality}
                  />
                ))}
              </div>

              <div className="mb-6 flex items-start gap-3 rounded-xl bg-blue-50 p-4 text-sm text-blue-800">
                <Info size={17} className="mt-0.5 shrink-0" />
                <p>
                  Scores come from your database. A dash means no score is
                  available for that category. Average scores use only
                  categories with available scores.
                </p>
              </div>

              <div className="mb-10">
                <FactorTable localities={selected} />
              </div>

              <section className="mb-10">
                <h2 className="dwc-display mb-2 text-xl font-extrabold">
                  Score Ranking
                </h2>
                <p className="mb-5 text-sm text-slate-500">
                  Ranked by the average of available category scores. This is
                  not a preference-based recommendation.
                </p>

                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                  {ranked.map((locality, index) => {
                    const score = getOverallScore(locality);

                    return (
                      <div
                        key={locality.id}
                        className="rounded-xl border border-slate-200 bg-white p-5"
                      >
                        <div className="mb-4 flex items-center justify-between">
                          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-50 text-sm font-extrabold text-blue-700">
                            {score === null ? "—" : `#${index + 1}`}
                          </span>
                          <Star size={16} className="text-amber-500" />
                        </div>

                        <h3 className="font-bold">{locality.name}</h3>
                        <p className="mt-1 text-xs text-slate-500">
                          {[locality.city, locality.state]
                            .filter(Boolean)
                            .join(", ")}
                        </p>

                        <p className="dwc-display mt-4 text-2xl font-extrabold">
                          {score === null ? "N/A" : score.toFixed(1)}
                          {score !== null && (
                            <span className="ml-1 text-xs font-medium text-slate-400">
                              / 10
                            </span>
                          )}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </section>
            </>
          )}
        </section>

        <div className="flex flex-col items-start justify-between gap-4 rounded-xl bg-blue-50 p-5 sm:flex-row sm:items-center">
          <div className="flex items-start gap-3">
            <Lightbulb size={18} className="mt-0.5 shrink-0 text-blue-700" />
            <div>
              <p className="text-sm font-semibold text-blue-900">
                Want to explore more localities?
              </p>
              <p className="mt-1 text-xs text-blue-700">
                Search for another place or return to Explore.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => navigate("/explore")}
            className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-bold text-white hover:bg-blue-700"
          >
            Explore Localities <ArrowRight size={15} />
          </button>
        </div>
      </main>
    </div>
  );
}
