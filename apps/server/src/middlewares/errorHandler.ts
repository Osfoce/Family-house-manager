import { env } from "../config/env.js";
import { Request, Response, NextFunction } from "express";
import { AppError } from "../common/errors/AppError.js";

export const errorHandler = (
  err: unknown,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  console.error(err);

  // Known application error
  if (err instanceof AppError) {
    res.status(err.statusCode).json({
      success: false,
      status: err.status,
      message: err.message,
      details: err.details ?? null,
      ...(env.NODE_ENV === "development" && {
        stack: err.stack,
      }),
    });

    return;
  }

  // Unexpected Error object
  if (err instanceof Error) {
    res.status(500).json({
      success: false,
      status: "error",
      message:
        env.NODE_ENV === "development"
          ? err.message
          : "Internal Server Error",
      details: null,
      ...(env.NODE_ENV === "development" && {
        stack: err.stack,
      }),
    });

    return;
  }

  // Something that isn't even an Error
  res.status(500).json({
    success: false,
    status: "error",
    message: "Internal Server Error",
    details: null,
  });
};