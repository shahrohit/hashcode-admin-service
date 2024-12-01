import {
  NextFunction as NextFn,
  Request as Req,
  Response as Res,
} from "express";
import { StatusCodes } from "http-status-codes";

import { TLoginAdmin, TRegisterAdmin } from "@schemas/auth-schema";
import authService from "@services/auth-service";
import { ADMIN, CREATED } from "@/utils/strings";

const register = async (req: Req, res: Res, next: NextFn) => {
  try {
    const body = req.body as TRegisterAdmin;

    await authService.register(body);

    res.status(StatusCodes.CREATED).json({
      succcess: true,
      statusCode: StatusCodes.CREATED,
      message: CREATED,
      data: {},
    });
  } catch (error) {
    next(error);
  }
};

const login = async (req: Req, res: Res, next: NextFn) => {
  try {
    const body = req.body as TLoginAdmin;
    const response = await authService.login(body);

    res.status(StatusCodes.OK).json({
      succcess: true,
      statusCode: StatusCodes.OK,
      message: "Logged In",
      data: { ...response, role: ADMIN },
    });
  } catch (error) {
    next(error);
  }
};

const authController = {
  register,
  login,
};

export default authController;
