
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  MapPin,
  Star,
  ShieldCheck,
  TrainFront,
  HeartPulse,
  GraduationCap,
  Sprout,
  ShoppingBag,
  TrendingUp,
  Home,
  Info,
  RefreshCw,
} from "lucide-react";
import { getLocalityDetails } from "../utils/api";

const CATEGORY_INFO = {
  safety: { label: "Safety & Security", icon: ShieldCheck },
  connectivity: { label: "Connectivity & Transport", icon: TrainFront },
  healthcare: { label: "Healthcare", icon: HeartPulse },
  education: { label: "Education", icon: GraduationCap },
  environment: { label: "Environment", icon: Sprout },
  amenities: { label: "Amenities & Daily Convenience", icon: ShoppingBag },
  lifestyle: { label: "Lifestyle & Recreation", icon: Star },
  housing: { label: "Housing & Affordability", icon: Home },
  growth: { label: "Future Growth & Development", icon: TrendingUp },
};

function formatCategory(category) {
  return CATEGORY_INFO[category]?.label ||
    category.replace(/[_-]/g, " ").replace(/\b\w/g, (char) => char.toUpperCase());
}

function formatMetricValue(metric) {
  if (metric.value === null || metric.value === undefined || metric.value === "") {
    return "Not available";
  }

  return `${metric.value}${metric.unit ? ` ${metric.unit}` : ""}`;
}

function formatDate(value) {
  if (!value) return null;

  const date = new Date(value);

  return Number.isNaN(date.getTime())
    ? null
    : date.toLocaleDateString();
}

function LocalitiesDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [locality, setLocality] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [openCategories, setOpenCategories] = useState(new Set());

  useEffect(() => {
    let cancelled = false;

    async function loadLocality() {
      try {
        setLoading(true);
        setError("");

        const result = await getLocalityDetails(id);

        if (!cancelled) {
          setLocality(result.data);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err.message || "Unable to load locality details.");
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    if (id) {
      loadLocality();
    } else {
      setError("No locality ID was provided.");
      setLoading(false);
    }

    return () => {
      cancelled = true;
    };
  }, [id]);

  function toggleCategory(category) {
    setOpenCategories((previous) => {
      const next = new Set(previous);

      if (next.has(category)) {
        next.delete(category);
      } else {
        next.add(category);
      }

      return next;
    });
  }

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center bg-slate-100">
        <p className="text-slate-600">Loading locality details...</p>
      </div>
    );
  }

  if (error || !locality) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 bg-slate-100 px-5">
        <p className="text-center text-red-600">
          {error || "Locality not found."}
        </p>

        <button
          onClick={() => navigate("/explore")}
          className="rounded-lg bg-blue-600 px-4 py-2 text-white"
        >
          Back to Explore
        </button>
      </div>
    );
  }

  const profile = locality.profile || {};
  const scores = locality.scores || [];
  const availableScores = scores.filter(
    (item) => Number.isFinite(item.score)
  );

  const overallScore =
    availableScores.length > 0
      ? availableScores.reduce((sum, item) => sum + item.score, 0) /
        availableScores.length
      : null;

  const lastUpdated = formatDate(profile.refreshedAt);

  return (
    <div className="min-h-screen bg-slate-100 px-5 py-8 sm:px-10 lg:px-20">
      <div className="mx-auto max-w-6xl">
        <button
          onClick={() => navigate("/explore")}
          className="mb-6 flex items-center gap-2 text-sm font-medium text-blue-600 hover:text-blue-800"
        >
          <ArrowLeft size={16} />
          Back to Explore
        </button>

        <div className="mb-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <p className="mb-2 text-sm font-medium capitalize text-blue-600">
                {locality.type || "Locality"}
              </p>

              <h1 className="text-3xl font-bold text-slate-900">
                {locality.name}
              </h1>

              <p className="mt-3 flex items-center gap-2 text-sm text-slate-500">
                <MapPin size={16} />
                {[locality.city, locality.state, locality.country]
                  .filter(Boolean)
                  .join(", ")}
              </p>

              {locality.coordinates && (
                <p className="mt-2 text-xs text-slate-400">
                  Coordinates: {locality.coordinates.latitude},{" "}
                  {locality.coordinates.longitude}
                </p>
              )}
            </div>

            <div className="rounded-xl bg-blue-50 p-5 sm:min-w-44 sm:text-center">
              <p className="text-sm text-slate-600">
                Average category score
              </p>

              <p className="mt-1 text-4xl font-bold text-blue-700">
                {overallScore === null ? "—" : overallScore.toFixed(1)}
              </p>

              <p className="mt-1 text-xs text-slate-500">
                {availableScores.length
                  ? `Out of 10 · ${availableScores.length} categories`
                  : "No scores available"}
              </p>
            </div>
          </div>

          {profile.summary && (
            <p className="mt-6 border-t border-slate-100 pt-5 leading-7 text-slate-600">
              {profile.summary}
            </p>
          )}

          {profile.source && (
            <p className="mt-4 text-xs text-slate-400">
              Profile source: {profile.source}
            </p>
          )}

          {lastUpdated && (
            <p className="mt-1 text-xs text-slate-400">
              Profile last refreshed: {lastUpdated}
            </p>
          )}
        </div>

        <section className="mb-8">
          <div className="mb-5">
            <h2 className="text-xl font-bold text-slate-900">
              Category Breakdown
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Scores and metrics currently stored in the database.
            </p>
          </div>

          {scores.length === 0 ? (
            <div className="rounded-xl border border-amber-200 bg-amber-50 p-5 text-sm text-amber-800">
              No category scores have been stored for this locality yet.
              The locality itself exists, but its scoring data still needs to
              be added.
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              {scores.map((item) => {
                const category = item.category;
                const Icon = CATEGORY_INFO[category]?.icon || Info;
                const score = Number(item.score);
                const validScore =
                  Number.isFinite(score) && score >= 0 && score <= 10;
                const isOpen = openCategories.has(category);

                return (
                  <div
                    key={category}
                    className="overflow-hidden rounded-xl border border-slate-200 bg-white"
                  >
                    <button
                      type="button"
                      onClick={() => toggleCategory(category)}
                      className="flex w-full items-center gap-4 p-5 text-left"
                    >
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                        <Icon size={19} />
                      </div>

                      <div className="min-w-0 flex-1">
                        <div className="mb-2 flex items-center justify-between gap-3">
                          <span className="font-semibold text-slate-800">
                            {formatCategory(category)}
                          </span>

                          <span className="font-bold text-blue-700">
                            {validScore ? score.toFixed(1) : "—"}
                          </span>
                        </div>

                        <div className="h-2 overflow-hidden rounded-full bg-slate-100">
                          <div
                            className="h-full rounded-full bg-blue-600"
                            style={{
                              width: validScore ? `${score * 10}%` : "0%",
                            }}
                          />
                        </div>
                      </div>

                      <span className="text-xs text-slate-400">
                        {isOpen ? "Hide" : "Details"}
                      </span>
                    </button>

                    {isOpen && (
                      <div className="border-t border-slate-100 px-5 pb-5 pt-4">
                        <div className="grid gap-3 sm:grid-cols-2">
                          <div className="rounded-lg bg-slate-50 p-3">
                            <p className="text-xs text-slate-500">
                              Data completeness
                            </p>
                            <p className="mt-1 font-semibold text-slate-800">
                              {Number.isFinite(Number(item.dataCompleteness))
                                ? `${(Number(item.dataCompleteness) * 100).toFixed(0)}%`
                                : "Not available"}
                            </p>
                          </div>

                          <div className="rounded-lg bg-slate-50 p-3">
                            <p className="text-xs text-slate-500">
                              Methodology version
                            </p>
                            <p className="mt-1 font-semibold text-slate-800">
                              {item.methodologyVersion || "Not specified"}
                            </p>
                          </div>
                        </div>

                        <h3 className="mb-3 mt-5 font-semibold text-slate-800">
                          Metrics
                        </h3>

                        {item.metrics?.length ? (
                          <div className="grid gap-3 sm:grid-cols-2">
                            {item.metrics.map((metric, index) => (
                              <div
                                key={`${metric.key || metric.label}-${index}`}
                                className="rounded-lg border border-slate-100 p-3"
                              >
                                <p className="text-sm text-slate-500">
                                  {metric.label || metric.key}
                                </p>

                                <p className="mt-1 font-semibold text-slate-800">
                                  {formatMetricValue(metric)}
                                </p>

                                {metric.source && (
                                  <p className="mt-1 text-xs text-slate-400">
                                    Source: {metric.source}
                                  </p>
                                )}

                                {metric.observedAt && (
                                  <p className="mt-1 text-xs text-slate-400">
                                    Observed: {formatDate(metric.observedAt) || "Date unavailable"}
                                  </p>
                                )}
                              </div>
                            ))}
                          </div>
                        ) : (
                          <p className="text-sm text-slate-500">
                            No metrics available for this category yet.
                          </p>
                        )}

                        {item.calculatedAt && (
                          <p className="mt-4 text-xs text-slate-400">
                            Score calculated:{" "}
                            {formatDate(item.calculatedAt) || "Date unavailable"}
                          </p>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </section>

        {(profile.strengths?.length > 0 ||
          profile.considerations?.length > 0) && (
          <section className="mb-8 grid gap-5 lg:grid-cols-2">
            {profile.strengths?.length > 0 && (
              <div className="rounded-xl border border-green-200 bg-white p-6">
                <h2 className="mb-4 font-bold text-green-700">
                  Strengths
                </h2>

                <ul className="space-y-3">
                  {profile.strengths.map((strength, index) => (
                    <li
                      key={`${strength}-${index}`}
                      className="flex gap-2 text-sm text-slate-600"
                    >
                      <span className="text-green-600">✓</span>
                      {strength}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {profile.considerations?.length > 0 && (
              <div className="rounded-xl border border-amber-200 bg-white p-6">
                <h2 className="mb-4 font-bold text-amber-700">
                  Things to Consider
                </h2>

                <ul className="space-y-3">
                  {profile.considerations.map((item, index) => (
                    <li
                      key={`${item}-${index}`}
                      className="flex gap-2 text-sm text-slate-600"
                    >
                      <span className="text-amber-600">•</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </section>
        )}

        {profile.insight && (
          <section className="mb-8 rounded-xl bg-slate-900 p-6 text-white sm:p-8">
            <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-blue-300">
              Dwellio Insight
            </p>

            <p className="leading-7 text-slate-100">
              {profile.insight}
            </p>
          </section>
        )}

        <div className="flex flex-col items-center justify-between gap-4 rounded-xl bg-blue-50 p-5 sm:flex-row">
          <p className="text-sm text-slate-700">
            Want to compare {locality.name} with other localities?
          </p>

          <button
            onClick={() =>
              navigate(`/compare?ids=${locality.id}`)
            }
            className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-3 text-sm font-semibold text-white hover:bg-blue-700"
          >
            Compare Localities
            <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default LocalitiesDetailsPage;
