import express from "express";

import topicSchema from "@schemas/topic-schema";
import validate from "@validations/zod-validator";
import topicController from "@controller/topic-controller";

const topicRouter = express.Router();

topicRouter
  .route("/")
  .post(validate(topicSchema), topicController.createTopic)
  .get(topicController.getTopics);

topicRouter
  .route("/:slug")
  .get(topicController.getTopic)
  .put(validate(topicSchema), topicController.updateTopic)
  .delete(topicController.deleteTopic);

export default topicRouter;
