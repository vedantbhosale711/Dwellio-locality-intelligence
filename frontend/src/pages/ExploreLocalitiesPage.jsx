
import { Search, ArrowRight, MapPin } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { searchLocalities } from "../utils/api";

function ExploreLocalitiesPage() {
  const navigate = useNavigate();

  const [query, setQuery] = useState("");
  const [localities, setLocalities] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSearch(e) {
    e.preventDefault();

    if (query.trim().length < 2) {
      setLocalities([]);
      setError("Enter at least 2 characters.");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const result = await searchLocalities(query.trim());
      setLocalities(result.data || []);

      if (!result.data?.length) {
        setError("No localities found.");
      }
    } catch (err) {
      setLocalities([]);
      setError(err.message || "Unable to fetch localities.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-slate-100 px-5 py-10 sm:px-10 lg:px-20">
      <div>
        <h1 className="mb-1 text-3xl font-bold text-slate-800">
          Explore Localities
        </h1>

        <p className="mb-5 text-sm text-slate-400">
          Discover and compare localities based on the factors that matter to
          you the most
        </p>

        <form
          onSubmit={handleSearch}
          className="flex flex-col gap-3 sm:flex-row"
        >
          <div className="flex w-full items-center gap-2 rounded-xl bg-white px-3 py-3 sm:max-w-xl">
            <Search size={16} className="shrink-0 text-slate-500" />

            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search localities, cities or areas..."
              className="w-full bg-transparent outline-none"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-3 text-white hover:bg-blue-700 disabled:opacity-60"
          >
            {loading ? "Searching..." : "Find Localities"}
            {!loading && <ArrowRight size={16} />}
          </button>
        </form>

        <div className="mt-8">
          {error && (
            <p className="mb-4 text-sm text-slate-600">{error}</p>
          )}

          {localities.length > 0 && (
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
              {localities.map((locality) => (
                <button
                  type="button"
                  key={locality.id}
                  onClick={() => navigate(`/details/${locality.id}`)}
                  className="rounded-xl border border-slate-200 bg-white p-5 text-left shadow-sm transition hover:shadow-md"
                >
                  <h2 className="text-lg font-semibold text-slate-800">
                    {locality.name}
                  </h2>

                  <p className="mt-2 flex items-center gap-1 text-sm text-slate-500">
                    <MapPin size={14} />
                    {[locality.city, locality.state, locality.country]
                      .filter(Boolean)
                      .join(", ")}
                  </p>

                  <div className="mt-4 flex items-center justify-between">
                    <span className="text-xs capitalize text-slate-400">
                      {locality.type || "Locality"}
                    </span>

                    <span className="flex items-center gap-1 text-sm font-medium text-blue-600">
                      View details <ArrowRight size={14} />
                    </span>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ExploreLocalitiesPage;
