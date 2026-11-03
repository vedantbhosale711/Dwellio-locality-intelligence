
const { Router } = require("express");
const { z } = require("zod");
const defaultRepository = require("../repositories/location.repository");
const { asyncHandler } = require("../middleware/async-handler");
const { HttpError } = require("../middleware/http-error");

const categories = [
  "safety",
  "connectivity",
  "healthcare",
  "education",
  "environment",
  "amenities",
  "lifestyle",
  "housing",
  "growth",
];

const locationPreferenceSchema = z.discriminatedUnion("scope", [
  z.object({
    scope: z.literal("city"),
    city: z.string().trim().min(1),
  }).strict(),

  z.object({
    scope: z.literal("state"),
    state: z.string().trim().min(1),
  }).strict(),

  z.object({
    scope: z.literal("india"),
  }).strict(),
]);

const recommendationSchema = z.object({
  priorities: z.object(
    Object.fromEntries(
      categories.map((category) => [
        category,
        z.number().min(0).max(100),
      ])
    )
  ).strict(),

  limit: z.number().int().min(1).max(20).default(10),
  locationPreference: locationPreferenceSchema,
});

function createRecommendationRouter({
  repository = defaultRepository,
} = {}) {
  const router = Router();

  router.post(
    "/",
    asyncHandler(async (request, response) => {
      const parsed = recommendationSchema.safeParse(request.body);

      if (!parsed.success) {
        throw new HttpError(
          400,
          "VALIDATION_ERROR",
          "Request validation failed.",
          parsed.error.flatten()
        );
      }

      const {
        priorities,
        limit,
        locationPreference,
      } = parsed.data;

      const totalWeight = Object.values(priorities).reduce(
        (total, value) => total + value,
        0
      );

      if (totalWeight === 0) {
        throw new HttpError(
          400,
          "VALIDATION_ERROR",
          "At least one priority must be greater than zero."
        );
      }

      const candidates =
        await repository.getRecommendationCandidates(
          100,
          locationPreference
        );

      const recommendations = candidates
        .map((candidate) => {
          const relevantScores = candidate.scores.filter(
            (score) => priorities[score.category] > 0
          );

          const matchedWeight = relevantScores.reduce(
            (total, score) =>
              total + priorities[score.category],
            0
          );

          const weightedScore =
            matchedWeight === 0
              ? null
              : relevantScores.reduce(
                  (total, score) =>
                    total +
                    score.score * priorities[score.category],
                  0
                ) / matchedWeight;

          return {
            ...candidate,
            matchScore:
              weightedScore === null
                ? null
                : Number((weightedScore * 10).toFixed(1)),
            dataCompleteness: Number(
              ((matchedWeight / totalWeight) * 100).toFixed(1)
            ),
            explanation:
              "Ranked from stored locality scores using your submitted priority weights and location preference.",
          };
        })
        .filter((candidate) => candidate.matchScore !== null)
        .sort((a, b) => b.matchScore - a.matchScore)
        .slice(0, limit);

      response.json({
        data: recommendations,
        meta: {
          count: recommendations.length,
          scoring: "weighted-average-v1",
          source: "stored locality scores",
          locationScope: locationPreference.scope,
        },
      });
    })
  );

  return router;
}

module.exports = { createRecommendationRouter };
