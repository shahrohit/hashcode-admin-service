import express from "express";

import problemController from "@controller/problem-controller";

const UproblemRouter = express.Router();

UproblemRouter.route("/").get(problemController.getUserProblems);

UproblemRouter.route("/search").get(problemController.searchUserProblems);

UproblemRouter.route("/:slug/description").get(
  problemController.getUserProblemDescription,
);
UproblemRouter.route("/:slug/testcases").get(
  problemController.getUserSampleTestcase,
);
UproblemRouter.route("/:slug/codes").get(problemController.getUserProblemCodes);

export default UproblemRouter;
