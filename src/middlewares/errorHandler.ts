import {
  NextFunction as NextFn,
  Request as Req,
  Response as Res,
} from "express";
import { StatusCodes } from "http-status-codes";

import BaseError from "@utils/errors";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

function errorHandler(err: Error, _: Req, res: Res, __: NextFn) {
  if (err instanceof BaseError) {
    res.status(err.statusCode).json({
      success: false,
      statusCode: err.statusCode,
      name: err.name,
      message: err.message,
    });
    return;
  }

  if (err instanceof PrismaClientKnownRequestError) {
    if (err.code === "P2025") {
      res.status(StatusCodes.NOT_FOUND).json({
        success: false,
        statusCode: StatusCodes.NOT_FOUND,
        name: "NotFound",
        message: `${err.meta?.modelName} Not Found`,
      });
      return;
    }
  }

  res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
    success: false,
    statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
    name: "InternalServerError",
    message: "Something Went Wrong",
    data: err,
  });
}

export default errorHandler;
