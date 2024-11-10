import express from "express";

import topicController from "@controller/topic-controller";
import validate from "@validations/zod-validator";
import topicSchema from "@schemas/topic-schema";

const topicRouter = express.Router();

// ------------------------ POST --------------------------
topicRouter.post("/", validate(topicSchema), topicController.createTopic);

// ------------------------ GET --------------------------
topicRouter.get("/", topicController.getTopics);

topicRouter.get("/:slug", topicController.getTopic);

// ------------------------ PUT --------------------------
topicRouter.put("/:id", validate(topicSchema), topicController.updateTopic);

// ------------------------ DELETE --------------------------
topicRouter.delete("/:id", topicController.deleteTopic);

export default topicRouter;
