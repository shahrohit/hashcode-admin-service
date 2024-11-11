import {
  NextFunction as NextFn,
  Request as Req,
  Response as Res,
} from "express";
import { StatusCodes } from "http-status-codes";

import adminService from "@services/auth-service";
import { CREATED, GET } from "@utils/constants";

import { TLoginAdmin, TRegisterAdmin } from "@schemas/auth-schema";
import { generateToken } from "@utils/fn";
import { NODE_ENV } from "@/config/server-config";

// ------------------------ POST --------------------------
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

const login = async (req: Req, res: Res, next: NextFn) => {
  try {
    const body = req.body as TLoginAdmin;

    const response = await adminService.login(body);

    const token = generateToken(response.email);

    res.cookie("token", token, {
      httpOnly: true,
      secure: NODE_ENV !== "development",
      sameSite: "strict",
      maxAge: 1000 * 30,
    });

    res.status(StatusCodes.CREATED).json({
      succcess: true,
      statusCode: StatusCodes.OK,
      message: GET,
      data: response,
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
