const { Router } = require("express");
const { checkDatabaseHealth } = require("../config/db");

function createHealthRouter({ databaseHealthCheck = checkDatabaseHealth } = {}) {
  const router = Router();

  router.get("/", (_request, response) => {
    response.status(200).json({
      status: "ok",
      service: "dwellio-backend",
      timestamp: new Date().toISOString(),
    });
  });

  router.get("/database", async (_request, response, next) => {
    try {
      await databaseHealthCheck();
      response.status(200).json({ status: "ok", database: "connected" });
    } catch (error) {
      error.code = "DATABASE_UNAVAILABLE";
      next(error);
    }
  });

  return router;
}

module.exports = { createHealthRouter };
