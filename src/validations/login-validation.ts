import { Forbidden } from "@/utils/errors";
import { ADMIN, ROLE_HEADER } from "@/utils/strings";

import {
  NextFunction as NextFn,
  Request as Req,
  Response as Res,
} from "express";

const verifyAdmin = async (req: Req, _: Res, next: NextFn) => {
  try {
    const role = req.headers[ROLE_HEADER];
    if (role === ADMIN) return next();
    else throw new Forbidden("ACCESS DENIED");
  } catch (error) {
    next(error);
  }
};

export default verifyAdmin;
