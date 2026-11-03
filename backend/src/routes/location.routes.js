const { Router } = require("express");
const { z } = require("zod");
const defaultRepository = require("../repositories/location.repository");
const { asyncHandler } = require("../middleware/async-handler");
const { HttpError } = require("../middleware/http-error");

const searchSchema = z.object({ q: z.string().trim().min(2).max(120), limit: z.coerce.number().int().min(1).max(20).default(10) });
const listSchema = z.object({ limit: z.coerce.number().int().min(1).max(50).default(20), offset: z.coerce.number().int().min(0).default(0) });
const idsSchema = z.object({ ids: z.string().min(1).transform((value) => value.split(",").map((id) => Number(id.trim()))).refine((ids) => ids.length >= 2 && ids.length <= 4 && ids.every(Number.isSafeInteger), "Provide 2 to 4 numeric location IDs.") });
const idSchema = z.coerce.number().int().positive();

function validationError(parsed) {
  return new HttpError(400, "VALIDATION_ERROR", "Request validation failed.", parsed.error.flatten());
}

function createLocationRouter({ repository = defaultRepository } = {}) {
  const router = Router();

  router.get("/search", asyncHandler(async (request, response) => {
    const parsed = searchSchema.safeParse(request.query);
    if (!parsed.success) throw validationError(parsed);
    const locations = await repository.searchLocations(parsed.data.q, parsed.data.limit);
    response.json({ data: locations, meta: { query: parsed.data.q, count: locations.length, discoveryAvailable: Boolean(process.env.GEOAPIFY_API_KEY) } });
  }));

  router.get("/list", asyncHandler(async (request, response) => {
    const parsed = listSchema.safeParse(request.query);
    if (!parsed.success) throw validationError(parsed);
    const { locations, total } = await repository.listLocations(parsed.data.limit, parsed.data.offset);
    response.json({ data: locations, meta: { total, limit: parsed.data.limit, offset: parsed.data.offset } });
  }));

  router.get("/compare", asyncHandler(async (request, response) => {
    const parsed = idsSchema.safeParse(request.query);
    if (!parsed.success) throw validationError(parsed);
    const locations = await repository.getLocationsByIds(parsed.data.ids);
    response.json({ data: locations, meta: { requestedCount: parsed.data.ids.length, foundCount: locations.length } });
  }));

  router.get("/:id", asyncHandler(async (request, response) => {
    const parsed = idSchema.safeParse(request.params.id);
    if (!parsed.success) throw validationError(parsed);
    const location = await repository.getLocationDetails(parsed.data);
    if (!location) throw new HttpError(404, "LOCATION_NOT_FOUND", "The requested location was not found.");
    response.json({ data: location });
  }));

  return router;
}

module.exports = { createLocationRouter };
