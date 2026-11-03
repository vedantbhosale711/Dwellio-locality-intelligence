
const API_BASE = import.meta.env.VITE_API_URL || "/api/v1";

async function apiFetch(path, options = {}) {
  const url = `${API_BASE}${path}`;

  const res = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
    ...options,
  });

  const body = await res.json();

  if (!res.ok) {
    const err = new Error(
      body?.error?.message || `API error ${res.status}`
    );
    err.status = res.status;
    err.code = body?.error?.code;
    err.details = body?.error?.details;
    throw err;
  }

  return body;
}

export async function searchLocalities(query, limit = 10) {
  const params = new URLSearchParams({
    q: query,
    limit: String(limit),
  });

  return apiFetch(`/locations/search?${params}`);
}

export async function listLocalities(limit = 20, offset = 0) {
  const params = new URLSearchParams({
    limit: String(limit),
    offset: String(offset),
  });

  return apiFetch(`/locations/list?${params}`);
}

export async function getLocalityDetails(id) {
  return apiFetch(`/locations/${id}`);
}

export async function compareLocalities(ids) {
  const params = new URLSearchParams({
    ids: ids.join(","),
  });

  return apiFetch(`/locations/compare?${params}`);
}

export async function getRecommendations(
  priorities,
  limit = 10,
  locationPreference
) {
  return apiFetch("/recommendations", {
    method: "POST",
    body: JSON.stringify({
      priorities,
      limit,
      locationPreference,
    }),
  });
}

export async function checkHealth() {
  return apiFetch("/health/database");
}
