import jwt from "jsonwebtoken";
import { env } from "../../config/env.js";
import { AppError } from "../errors/AppError.js";

const generateAccessToken = (userId: string) => {
  // set expiration time for the token and generate the token
  const expiresIn = (env.JWT_EXPIRES_IN ??
    "15m") as jwt.SignOptions["expiresIn"];

  const token = jwt.sign({ sub: userId }, env.JWT_SECRET, { expiresIn });
  // return token
  return token;
};

const verifyAccessToken = (token: string) => {
  // get secret from env and validate it
  const secret = env.JWT_SECRET;

  try {
    // verify the token using the secret
    const decoded = jwt.verify(token, secret);
    return decoded;
    
  } catch (error) {
    throw new AppError("Invalid or expired token", 401);
  }
};

export { generateAccessToken, verifyAccessToken };
