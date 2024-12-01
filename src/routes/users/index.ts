import express from "express";

import UlanguageRouter from "./language-route";
import UtopicRouter from "./topic-route";
import UproblemRouter from "./problem-route";

const userRouter = express.Router();

userRouter.use("/topics", UtopicRouter);
userRouter.use("/languages", UlanguageRouter);
userRouter.use("/problems", UproblemRouter);

export default userRouter;
