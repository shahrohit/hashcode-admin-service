import express from "express";

import validate from "@validations/zod-validator";
import problemController from "@controller/problem-controller";
import problemSchema, {
  problemLangCodeSchema,
  problemTestcaseSchema,
} from "@schemas/problem-schema";

const problemRouter = express.Router();

problemRouter
  .route("/")
  .post(validate(problemSchema), problemController.createProblem)
  .get(problemController.getProblems);

problemRouter.route("/search").get(problemController.searchProblems);

problemRouter
  .route("/testcases/:id")
  .put(validate(problemTestcaseSchema), problemController.updateProblemTestcase)
  .delete(problemController.deleteProblemTestcase);

problemRouter
  .route("/codes/:id")
  .put(validate(problemLangCodeSchema), problemController.updateProblemCode)
  .delete(problemController.deleteProblemCode);

// ---------------------- Routes for the specify problems -------------------------
problemRouter
  .route("/:slug")
  .get(problemController.getProblem)
  .put(validate(problemSchema), problemController.updateProblem)
  .delete(problemController.deleteProblem);

problemRouter
  .route("/:problemId/testcases")
  .post(
    validate(problemTestcaseSchema),
    problemController.createProblemTestcase,
  )
  .get(problemController.getProblemTestcases);

problemRouter
  .route("/:problemId/codes")
  .post(validate(problemLangCodeSchema), problemController.createProblemCode)
  .get(problemController.getProblemCodes);

problemRouter
  .route("/:slug/status")
  .patch(problemController.updateActiveStatus);

export default problemRouter;
