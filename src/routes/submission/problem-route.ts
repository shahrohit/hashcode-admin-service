import express from "express";

import problemController from "@controller/problem-controller";

const SproblemRouter = express.Router();

SproblemRouter.route("/submit/:slug/:lang").get(
  problemController.getProblemForSubmission,
);

export default SproblemRouter;
