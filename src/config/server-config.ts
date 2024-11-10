import dotenv from "dotenv";

dotenv.config();

const PORT: number = +(process.env.PORT || 4000);

export { PORT };
