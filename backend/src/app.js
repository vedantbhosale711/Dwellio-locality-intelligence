const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const { createHealthRouter } = require("./routes/health.routes");
const { createLocationRouter } = require("./routes/location.routes");
const { createRecommendationRouter } = require("./routes/recommendation.routes");
const { notFoundHandler } = require("./middleware/not-found");
const { errorHandler } = require("./middleware/error-handler");

function createApp({ databaseHealthCheck, locationRepository } = {}) {
  const app = express();

  app.disable("x-powered-by");
  app.use(helmet());
  app.use(cors());
  app.use(express.json({ limit: "100kb" }));

  app.get("/", (_request, response) => {
    response.status(200).json({
      status: "ok",
      service: "dwellio-backend",
      apiVersion: "v1",
    });
  });
  app.use("/api/v1/health", createHealthRouter({ databaseHealthCheck }));
  app.use("/api/v1/locations", createLocationRouter({ repository: locationRepository }));
  app.use("/api/v1/recommendations", createRecommendationRouter({ repository: locationRepository }));
  app.use(notFoundHandler);
  app.use(errorHandler);

  return app;
}

module.exports = { createApp };
