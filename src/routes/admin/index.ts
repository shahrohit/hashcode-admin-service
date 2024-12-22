import express from "express";

import topicRouter from "@routes/admin/topic-route";
import languageRouter from "@routes/admin/language-route";
import problemRouter from "@routes/admin/problem-route";

const adminRouter = express.Router();

adminRouter.use("/topics", topicRouter);
adminRouter.use("/languages", languageRouter);
adminRouter.use("/problems", problemRouter);

export default adminRouter;
