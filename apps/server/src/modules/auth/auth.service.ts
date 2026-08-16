import bcrypt from "bcrypt";
import { prisma } from "../../config/index.js";
import { AppError } from "../../common/errors/AppError.js";

const hashPassword = async (password: string) => {
  const saltRounds = 10;
  const hash = await bcrypt.hash(password, saltRounds);
  return hash;
};

const comparePassword = async (password: string, hashedPassword: string) => {
  const isMatch = await bcrypt.compare(password, hashedPassword);
  return isMatch;
};

const login = async (email: string, password: string) => {
  // 1. Find user

  const user = await prisma.user.findUnique({ where: { email } });
  // 2. If user doesn't exist → authentication error
  if (!user) {
    throw new AppError("Authentication failed", 401);
  }
  // 3. Compare password
  const isPasswordValid = await comparePassword(password, user.passwordHash);
  // 4. If password doesn't match → authentication error
  if (!isPasswordValid) {
    throw new AppError("Authentication failed", 401);
  }
  // 5. For now, return the user
  return user;
};

export { hashPassword, comparePassword, login };
