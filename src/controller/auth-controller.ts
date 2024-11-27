import {
  NextFunction as NextFn,
  Request as Req,
  Response as Res,
} from "express";
import { StatusCodes } from "http-status-codes";

import adminService from "@services/auth-service";
import { CREATED, GET } from "@utils/constants";

import { TLoginAdmin, TRegisterAdmin } from "@schemas/auth-schema";
import { generateToken, verifyToken } from "@utils/fn";
import { ACCESS_TOKEN, NODE_ENV, REFRESH_TOKEN } from "@/config/server-config";

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

    const refreshtoken = generateToken(
      { email: response.email },
      REFRESH_TOKEN,
      "7d",
    );

    const accessToken = generateToken(
      { email: response.email },
      ACCESS_TOKEN,
      "15m",
    );

    res.cookie("refreshToken", refreshtoken, {
      httpOnly: true,
      secure: NODE_ENV !== "development",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(StatusCodes.CREATED).json({
      succcess: true,
      statusCode: StatusCodes.OK,
      message: GET,
      data: { ...response, accessToken },
    });
  } catch (error) {
    next(error);
  }
};

const refreshAccessToken = async (req: Req, res: Res, next: NextFn) => {
  try {
    const refreshToken = req.cookies?.refreshToken;
    const email = verifyToken(refreshToken, REFRESH_TOKEN);

    const newAccessToken = generateToken({ email }, ACCESS_TOKEN, "15m");

    // issue a new refresh token (token rotation)
    const newRefreshToken = generateToken({ email }, REFRESH_TOKEN, "7d");

    // Update the refresh token in the cookie
    res.cookie("refreshToken", newRefreshToken, {
      httpOnly: true,
      secure: NODE_ENV !== "development",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(StatusCodes.CREATED).json({
      succcess: true,
      statusCode: StatusCodes.OK,
      message: GET,
      data: { accessToken: newAccessToken },
    });
  } catch (error) {
    next(error);
  }
};

const logout = (_: Req, res: Res) => {
  res.clearCookie("refreshToken");
  res
    .status(StatusCodes.OK)
    .json({ success: true, statusCode: StatusCodes.OK, message: "Logged out" });
};

const adminController = {
  register,
  login,
  refreshAccessToken,
  logout,
};

export default adminController;
