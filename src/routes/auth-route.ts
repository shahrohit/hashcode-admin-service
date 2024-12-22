import express from "express";

import { loginSchema, registerSchema } from "@schemas/auth-schema";
import validate from "@validations/zod-validator";
import authController from "@controller/auth-controller";

const authRouter = express.Router();

authRouter.post("/register", validate(registerSchema), authController.register);
authRouter.post("/login", validate(loginSchema), authController.login);

export default authRouter;
