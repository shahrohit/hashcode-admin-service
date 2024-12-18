import express from "express";
import SproblemRouter from "./problem-route";
import SlanguageRouter from "./language-route";

const submissionRouter = express.Router();

submissionRouter.use("/problems", SproblemRouter);
submissionRouter.use("/languages", SlanguageRouter);

export default submissionRouter;
