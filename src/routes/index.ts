import express from "express";

import v1Router from "@routes/v1/index";

const apiRouter = express.Router();

apiRouter.use("/v1", v1Router);

export default apiRouter;
