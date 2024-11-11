import { verifyToken } from "@utils/fn";

import {
  NextFunction as NextFn,
  Request as Req,
  Response as Res,
} from "express";

const verifyLogin = async (req: Req, _: Res, next: NextFn) => {
  try {
    const token =
      req.cookies?.token || req.header("Authorization")?.replace("Bearer ", "");

    verifyToken(token);

    next();
  } catch (error) {
    next(error);
  }
};

export default verifyLogin;
