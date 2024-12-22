import langaugeController from "@/controller/langauge-controller";
import express from "express";

const SlanguageRouter = express.Router();

SlanguageRouter.route("/").get(langaugeController.getSubmissionLanguages);

export default SlanguageRouter;
