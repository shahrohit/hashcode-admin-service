import express from "express";

import problemController from "@controller/problem-controller";

const UproblemRouter = express.Router();

UproblemRouter.route("/").get(problemController.getUserProblems);

UproblemRouter.route("/search").get(problemController.searchUserProblems);

UproblemRouter.route("/:slug").get(problemController.getUserProblem);

export default UproblemRouter;
