import dotenv from "dotenv";

dotenv.config();

export const PORT = +(process.env.PORT || 4000);
export const NODE_ENV = process.env.NODE_ENV || "development";
export const ACCESS_TOKEN = process.env.ACCESS_TOKEN!;
