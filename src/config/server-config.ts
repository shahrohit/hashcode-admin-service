import dotenv from "dotenv";
dotenv.config();

import { DEV_ENV } from "@/utils/strings";

export const PORT = +(process.env.PORT || 4000);
export const NODE_ENV = process.env.NODE_ENV || DEV_ENV;
