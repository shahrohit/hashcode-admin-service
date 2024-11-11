import express from "express";

import authController from "@controller/auth-controller";
import validate from "@validations/zod-validator";
import { loginSchema, registerSchema } from "@schemas/auth-schema";

const authRouter = express.Router();

// ------------------------ POST --------------------------
authRouter.post("/register", validate(registerSchema), authController.register);
authRouter.post("/login", validate(loginSchema), authController.login);

export default authRouter;
