import express from "express";
import SproblemRouter from "./problem-route";

const submissionRouter = express.Router();

submissionRouter.use("/problems", SproblemRouter);

export default submissionRouter;
