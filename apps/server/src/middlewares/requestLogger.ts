import { Request, Response, NextFunction } from "express";

export const requestLogger = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  // 1. Record the start time
  const startTime = Date.now();
  const { method, originalUrl, ip } = req;

  // Log when request comes in
  console.log(`➡️  ${method} ${originalUrl} ${ip} - Started`);

  // 2. Wait for the response to finish
  // 3. Calculate duration
  // 4. Log:
  // method
  // URL
  // status code
  // duration
  res.on("finish", () => {
    const duration = Date.now() - startTime;

    console.log(
      `${method} ${originalUrl} ${res.statusCode} - ${duration}ms`,
    );
  });

  // 5. Continue to the next middleware
  next();
};
