import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { ACCESS_TOKEN } from "@config/server-config";
import { Unauthorized } from "./errors";

// ----------------- Hashed Password -------------------------------
export const generateHashPassword = async (password: string) => {
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  return hashedPassword;
};

export const verifyPassword = async (
  password: string,
  hashedPassword: string,
) => {
  return await bcrypt.compare(password, hashedPassword);
};

// ----------------- JWT Token -------------------------------
export const generateToken = (email: string) => {
  return jwt.sign({ email: email }, ACCESS_TOKEN);
};

export const verifyToken = (token: any) => {
  if (!token) throw new Unauthorized("Access Denied");
  const decode = jwt.verify(token, ACCESS_TOKEN) as jwt.JwtPayload;
  return decode.email as string;
};
