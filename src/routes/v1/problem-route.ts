import express from "express";

import validate from "@validations/zod-validator";
import problemController from "@controller/problem-controller";
import problemSchema, {
  problemLangCodeSchema,
  problemTestcaseSchema,
} from "@schemas/problem-schema";

const problemRouter = express.Router();

// ------------------------ POST --------------------------
problemRouter.post(
  "/",
  validate(problemSchema),
  problemController.createProblem,
);

problemRouter.post(
  "/testcase",
  validate(problemTestcaseSchema),
  problemController.createProblemTestcase,
);

problemRouter.post(
  "/code",
  validate(problemLangCodeSchema),
  problemController.createProblemCode,
);

// ------------------------ GET --------------------------
problemRouter.get("/", problemController.getProblems);
problemRouter.get("/search", problemController.searchProblems);
problemRouter.get("/:slug", problemController.getProblem);
problemRouter.get("/:id/testcases", problemController.getProblemTestcases);
problemRouter.get("/:id/codes", problemController.getProblemCodes);

// ------------------------ PUT --------------------------
problemRouter.put(
  "/:slug",
  validate(problemSchema),
  problemController.updateProblem,
);

problemRouter.put(
  "/testcase/:id",
  validate(problemTestcaseSchema),
  problemController.updateProblemTestcase,
);

problemRouter.put(
  "/code/:id",
  validate(problemLangCodeSchema),
  problemController.updateProblemCode,
);

// ------------------------ PATCH --------------------------
problemRouter.patch("/:slug/status", problemController.updateActiveStatus);

// ------------------------ DELETE --------------------------
problemRouter.delete("/:slug", problemController.deleteProblem);
problemRouter.delete("/testcase/:id", problemController.deleteProblemTestcase);
problemRouter.delete("/code/:id", problemController.deleteProblemCode);

export default problemRouter;
