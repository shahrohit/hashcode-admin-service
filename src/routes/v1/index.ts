import express from "express";

import languageRouter from "@routes/v1/language-route";
import problemRouter from "@routes/v1/problem-route";
import topicRouter from "@routes/v1/topic-route";

const v1Router = express.Router();

v1Router.use("/languages", languageRouter);
v1Router.use("/problems", problemRouter);
v1Router.use("/topics", topicRouter);

export default v1Router;
