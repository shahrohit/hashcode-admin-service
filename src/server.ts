import express from "express";
import bodyParser from "body-parser";

import { PORT } from "@config/server-config";
import apiRouter from "@routes/index";
import errorHandler from "@middlewares/errorHandler";

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api", apiRouter);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
