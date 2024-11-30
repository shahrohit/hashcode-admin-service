import express from "express";

import validate from "@validations/zod-validator";
import languageSchema from "@schemas/language-schema";
import langaugeController from "@controller/langauge-controller";

const languageRouter = express.Router();

languageRouter
  .route("/")
  .post(validate(languageSchema), langaugeController.createLanguage)
  .get(langaugeController.getLanguages);

languageRouter
  .route("/:id")
  .get(langaugeController.getLanguage)
  .put(validate(languageSchema), langaugeController.updateLanguage)
  .delete(langaugeController.deleteLanguage);

languageRouter
  .route("/:id/status")
  .patch(langaugeController.updateActiveStatus);

export default languageRouter;
