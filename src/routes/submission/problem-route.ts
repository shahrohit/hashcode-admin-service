import express from "express";

import problemController from "@controller/problem-controller";

const SproblemRouter = express.Router();

SproblemRouter.route("/submit/:slug/:lang").get(
  problemController.getProblemForSubmission,
);

SproblemRouter.route("/run/:slug/:lang").get(
  problemController.getProblemForRun,
);

export default SproblemRouter;
