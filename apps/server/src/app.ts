import express from "express";
import apiRoutes from "./routes/index.js";
import { errorHandler } from "./middlewares/errorHandler.js";
import { requestLogger } from "./middlewares/requestLogger.js";

const app = express();

app.use(requestLogger);
app.use(express.json());

app.use("/api/v1", apiRoutes);

app.use(errorHandler);

export default app;
