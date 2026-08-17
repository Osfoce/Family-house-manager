import { verifyAccessToken } from "../common/auth/jwt.js";
import type { Request, Response, NextFunction } from "express";
import { AppError } from "../common/errors/AppError.js";

const authenticate = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new AppError("Authentication required", 401);
  }

  const token = authHeader.split(" ")[1];
  const decodedToken = verifyAccessToken(token);

  //   verify that the decoded token is a string and an object and has a 'sub' property
  if (
    typeof decodedToken === "string" ||
    typeof decodedToken.sub !== "string"
  ) {
    throw new AppError("Invalid token payload", 401);
  }

  req.user = { id: decodedToken.sub }; // Attach the decoded token to the request object

  next();
};

export { authenticate };
