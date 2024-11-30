import {
  NextFunction as NextFn,
  Request as Req,
  Response as Res,
} from "express";
import { StatusCodes } from "http-status-codes";

import { TLoginAdmin, TRegisterAdmin } from "@schemas/auth-schema";
import adminService from "@services/auth-service";
import { ADMIN, CREATED } from "@/utils/strings";

// ------------------------ Register Admin --------------------------
const register = async (req: Req, res: Res, next: NextFn) => {
  try {
    const body = req.body as TRegisterAdmin;

    await adminService.register(body);

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

// ------------------------ Login As Admin --------------------------
const login = async (req: Req, res: Res, next: NextFn) => {
  try {
    const body = req.body as TLoginAdmin;
    const response = await adminService.login(body);

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

const adminController = {
  register,
  login,
};

export default adminController;
