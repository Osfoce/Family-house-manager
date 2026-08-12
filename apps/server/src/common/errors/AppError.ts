export class AppError extends Error {
  statusCode: number;
  isOperational: boolean;
  details?: unknown;
  status: "fail" | "error";

  constructor(message: string, statusCode: number, details?: unknown) {
    super(message);

    this.name = "AppError";

    this.statusCode = statusCode;

    this.status = statusCode >= 400 && statusCode < 500 ? "fail" : "error";

    this.isOperational = true;

    this.details = details;

    Error.captureStackTrace(this, this.constructor);
  }
}
