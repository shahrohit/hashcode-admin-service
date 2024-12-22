import httpStatusCode from "http-status-codes";
import {
  Request as Req,
  Response as Res,
  NextFunction as NexFn,
} from "express";

import prisma from "@/config/db-config";

const checkHealth = async (_: Req, res: Res, next: NexFn) => {
  try {
    await prisma.$queryRaw`SELECT 1`;
    res.status(httpStatusCode.OK).json({
      success: true,
      message: "Server is Up",
    });
  } catch (error) {
    next(error);
  }
};

export default checkHealth;
