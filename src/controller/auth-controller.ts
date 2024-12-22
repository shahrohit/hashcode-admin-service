import {
  NextFunction as NextFn,
  Request as Req,
  Response as Res,
} from "express";
import { StatusCodes } from "http-status-codes";

import { TLoginAdmin, TRegisterAdmin } from "@schemas/auth-schema";
import authService from "@services/auth-service";
import { CREATED } from "@/utils/strings";
import { BadRequest, Forbidden } from "@/utils/errors";
import { PASS_KEY } from "@/config/server-config";

const register = async (req: Req, res: Res, next: NextFn) => {
  try {
    const body = req.body as TRegisterAdmin;
    if (!body.passKey) throw new BadRequest("Access Denied");
    if (!PASS_KEY) throw new Forbidden("Access Denied");

    if (body.passKey !== PASS_KEY) throw new Forbidden("Access Deneid");

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
    if (!body.passKey) throw new BadRequest("Access Denied");
    if (!PASS_KEY) throw new Forbidden("Access Denied");

    if (body.passKey !== PASS_KEY) throw new Forbidden("Access Deneid");

    const response = await authService.login(body);

    res.status(StatusCodes.OK).json({
      succcess: true,
      statusCode: StatusCodes.OK,
      message: "Logged In",
      data: response,
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
