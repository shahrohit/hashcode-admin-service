import express from "express";

import langaugeController from "@controller/langauge-controller";
import validate from "@validations/zod-validator";
import languageSchema from "@schemas/language-schema";

const languageRouter = express.Router();

// ------------------------ POST --------------------------
languageRouter.post(
  "/",
  validate(languageSchema),
  langaugeController.createLanguage,
);

// ------------------------ GET --------------------------
languageRouter.get("/", langaugeController.getLanguages);

languageRouter.get("/:id", langaugeController.getLanguage);

// ------------------------ PUT --------------------------
languageRouter.put(
  "/:id",
  validate(languageSchema),
  langaugeController.updateLanguage,
);

// ------------------------ PATCH --------------------------
languageRouter.patch("/:id/status", langaugeController.updateActiveStatus);

// ------------------------ DELETE --------------------------
languageRouter.delete("/:id", langaugeController.deleteLanguage);

export default languageRouter;
