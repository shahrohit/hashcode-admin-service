import express from "express";

import topicController from "@controller/topic-controller";

const UtopicRouter = express.Router();

UtopicRouter.route("/").get(topicController.getTopics);

export default UtopicRouter;
