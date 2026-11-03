function errorHandler(error, _request, response, _next) {
  const isDatabaseError = error.code === "DATABASE_UNAVAILABLE";
  const status = isDatabaseError ? 503 : error.statusCode || 500;
  const code = isDatabaseError ? "DATABASE_UNAVAILABLE" : error.code || "INTERNAL_SERVER_ERROR";
  const message = isDatabaseError
    ? "The database is temporarily unavailable."
    : error.statusCode ? error.message : "An unexpected error occurred.";

  if (status >= 500 && process.env.NODE_ENV !== "test") {
    console.error(error);
  }

  response.status(status).json({ error: { code, message, ...(error.details ? { details: error.details } : {}) } });
}

module.exports = { errorHandler };
