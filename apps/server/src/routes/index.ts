import Router from "express";
import { AppError } from "../common/errors/AppError.js";
import homeRoutes from "./home.js";

const router = Router();

router.use("/home", homeRoutes);



// Catch-all for any routes under /api
router.use("/*splat", (req, res, next) => {
  const error = new AppError(
    `Route not found: ${req.method} ${req.originalUrl}`,
    404
  );
  next(error);
});


export default router;