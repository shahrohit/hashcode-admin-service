import express from "express";

import verifyAdmin from "@validations/login-validation";
import authRouter from "@routes/auth-route";
import adminRouter from "@routes/admin/index";
import userRouter from "@routes/users/index";

const apiRouter = express.Router();

apiRouter.use("/auth", authRouter);
apiRouter.use("/admin", verifyAdmin, adminRouter);
apiRouter.use("/users", userRouter);

export default apiRouter;
