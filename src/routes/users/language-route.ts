import express from "express";

import langaugeController from "@controller/langauge-controller";

const UlanguageRouter = express.Router();

UlanguageRouter.route("/").get(langaugeController.getUserLanguage);

export default UlanguageRouter;
