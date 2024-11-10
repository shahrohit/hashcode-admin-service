import { NextFunction, Request, Response } from "express";
import { ZodError, ZodSchema } from "zod";
import { StatusCodes } from "http-status-codes";

const validate =
  (schema: ZodSchema<any>) =>
  (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse(req.body);
      next();
    } catch (error) {
      if (!(error instanceof ZodError)) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
          success: false,
          error: error,
        });
        return;
      }

      let err: string[] = [];
      error.issues.map(issue => {
        err.push(issue.message);
      });

      res.status(StatusCodes.BAD_REQUEST).json({
        success: false,
        statusCode: StatusCodes.BAD_REQUEST,
        name: "BadRequest",
        message: "Invalid Data Provided",
        error: err,
      });
    }
  };

export default validate;
