
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  MapPin,
  RefreshCw,
  Sparkles,
  AlertCircle,
  LoaderCircle,
} from "lucide-react";
import { getRecommendations } from "../utils/api";

function getRecommendationList(response) {
  const payload = response?.data ?? response;

  if (Array.isArray(payload)) return payload;
  if (Array.isArray(payload?.recommendations)) {
    return payload.recommendations;
  }
  if (Array.isArray(payload?.locations)) return payload.locations;
  if (Array.isArray(payload?.results)) return payload.results;

  return [];
}

function RecommendationCard({ locality, index, onViewDetails }) {
  const name =
    locality.name ??
    locality.locality_name ??
    locality.locality ??
    "Unnamed locality";

  const city = locality.city ?? locality.city_name ?? "";
  const state = locality.state ?? locality.state_name ?? "";
  const matchScore = locality.matchScore ?? locality.match_score;
  const score = Number(matchScore);
  const hasMatchScore =
    matchScore !== undefined &&
    matchScore !== null &&
    matchScore !== "" &&
    Number.isFinite(score);

  const id = locality.id ?? locality.location_id;

  return (
    <article className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
      <div className="flex items-start justify-between gap-3">
        <div className="flex min-w-0 items-start gap-3">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-700">
            <MapPin size={21} />
          </div>

          <div className="min-w-0">
            <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-gray-400">
              Recommendation #{index + 1}
            </p>
            <h2 className="text-lg font-bold text-gray-900">{name}</h2>

            {(city || state) && (
              <p className="mt-1 flex items-center gap-1 text-sm text-gray-500">
                <MapPin size={13} />
                {[city, state].filter(Boolean).join(", ")}
              </p>
            )}
          </div>
        </div>

        {hasMatchScore && (
          <div className="shrink-0 rounded-xl bg-emerald-50 px-3 py-2 text-center">
            <p className="text-lg font-bold text-emerald-700">
              {Math.round(score)}%
            </p>
            <p className="text-xs text-emerald-700">Match</p>
          </div>
        )}
      </div>

      {locality.explanation && (
        <p className="mt-4 rounded-xl bg-blue-50 p-3 text-sm text-blue-900">
          <Sparkles size={14} className="mr-2 inline" />
          {locality.explanation}
        </p>
      )}

      {locality.profile?.summary && (
        <p className="mt-4 text-sm leading-6 text-gray-600">
          {locality.profile.summary}
        </p>
      )}

      <div className="mt-5 border-t border-gray-100 pt-4">
        <button
          type="button"
          onClick={() => onViewDetails(id)}
          disabled={id == null}
          className="flex items-center gap-2 text-sm font-semibold text-blue-700 hover:text-blue-900 disabled:cursor-not-allowed disabled:opacity-40"
        >
          View locality details
          <ArrowRight size={16} />
        </button>
      </div>
    </article>
  );
}

export default function RecommendationResultPage() {
  const location = useLocation();
  const navigate = useNavigate();

  const priorities = location.state?.priorities;
  const locationPreference = location.state?.locationPreference;

  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;

    async function loadRecommendations() {
      if (!priorities || typeof priorities !== "object") {
        setError(
          "Complete the locality quiz first to get personalized recommendations."
        );
        setLoading(false);
        return;
      }

      if (
        !locationPreference ||
        !["city", "state", "india"].includes(locationPreference.scope)
      ) {
        setError("Choose a valid location preference in the quiz first.");
        setLoading(false);
        return;
      }

      if (
        locationPreference.scope === "city" &&
        !locationPreference.city?.trim()
      ) {
        setError("Enter a city in your quiz preferences.");
        setLoading(false);
        return;
      }

      if (
        locationPreference.scope === "state" &&
        !locationPreference.state?.trim()
      ) {
        setError("Select a state in your quiz preferences.");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError("");

        const response = await getRecommendations(
          priorities,
          10,
          locationPreference
        );

        const results = getRecommendationList(response);

        if (cancelled) return;

        setRecommendations(results);

        if (results.length === 0) {
          setError(
            "No localities match this location and your quiz preferences. Try another city or state."
          );
        }
      } catch (err) {
        if (cancelled) return;

        setError(
          err?.message ??
            "Could not load recommendations. Check that the backend is running and try again."
        );
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    loadRecommendations();

    return () => {
      cancelled = true;
    };
  }, [priorities, locationPreference]);

  function viewDetails(id) {
    if (id == null) return;
    navigate(`/details/${id}`);
  }

  function retry() {
    navigate(0);
  }

  const scopeLabel =
    locationPreference?.scope === "city"
      ? locationPreference.city
      : locationPreference?.scope === "state"
        ? locationPreference.state
        : "Anywhere in India";

  return (
    <main className="min-h-screen bg-gray-50 px-5 py-8 md:px-10 lg:px-20">
      <div className="mx-auto max-w-6xl">
        <button
          type="button"
          onClick={() => navigate("/quiz")}
          className="mb-6 flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-blue-700"
        >
          <ArrowLeft size={17} />
          Back to quiz
        </button>

        <header className="mb-8">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700">
            <Sparkles size={14} />
            Personalized for you
          </div>

          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            Your Recommended Localities
          </h1>

          <p className="mt-3 text-sm leading-6 text-gray-500">
            Recommendations for{" "}
            <span className="font-semibold text-gray-700">
              {scopeLabel || "your selected location"}
            </span>
            , ranked using your quiz priorities.
          </p>
        </header>

        {loading && (
          <div className="flex min-h-60 flex-col items-center justify-center gap-4 rounded-2xl border border-gray-200 bg-white">
            <LoaderCircle
              size={32}
              className="animate-spin text-blue-600"
            />
            <p className="text-sm text-gray-600">
              Finding localities that fit your priorities...
            </p>
          </div>
        )}

        {!loading && error && (
          <div className="rounded-2xl border border-amber-200 bg-white p-6">
            <div className="flex items-start gap-3">
              <AlertCircle
                size={22}
                className="mt-0.5 shrink-0 text-amber-600"
              />

              <div>
                <h2 className="font-semibold text-gray-900">
                  Recommendations unavailable
                </h2>

                <p className="mt-2 text-sm leading-6 text-gray-600">
                  {error}
                </p>

                <div className="mt-5 flex flex-wrap gap-3">
                  <button
                    type="button"
                    onClick={retry}
                    className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700"
                  >
                    <RefreshCw size={15} />
                    Try again
                  </button>

                  <button
                    type="button"
                    onClick={() => navigate("/quiz")}
                    className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-50"
                  >
                    Change answers
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {!loading && !error && recommendations.length > 0 && (
          <>
            <div className="mb-5 flex items-center justify-between gap-3">
              <p className="text-sm text-gray-500">
                {recommendations.length} localities recommended
              </p>

              <button
                type="button"
                onClick={() => navigate("/compare")}
                className="flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-50"
              >
                Compare localities
                <ArrowRight size={15} />
              </button>
            </div>

            <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
              {recommendations.map((locality, index) => (
                <RecommendationCard
                  key={
                    locality.id ??
                    locality.location_id ??
                    `${locality.name}-${index}`
                  }
                  locality={locality}
                  index={index}
                  onViewDetails={viewDetails}
                />
              ))}
            </div>

            <div className="mt-8 rounded-2xl border border-gray-200 bg-white p-5">
              <h2 className="font-semibold text-gray-900">
                Want to explore further?
              </h2>
              <p className="mt-1 text-sm text-gray-500">
                View locality details or compare multiple areas side by side.
              </p>
              <button
                type="button"
                onClick={() => navigate("/explore")}
                className="mt-4 text-sm font-semibold text-blue-700 hover:text-blue-900"
              >
                Explore all localities →
              </button>
            </div>
          </>
        )}
      </div>
    </main>
  );
}
