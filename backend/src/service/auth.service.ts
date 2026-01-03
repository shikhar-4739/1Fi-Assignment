import { prisma } from "../config/db";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import type { StringValue } from "ms";
import type { Secret } from "jsonwebtoken";
import { ApiError } from "../utils/ApiError";
import type { UserRole } from "@prisma/client";

export const registerUser = async (
  name: string,
  email: string,
  password: string,
  role: UserRole
) => {
  if (!name || !email || !password || !role) {
    throw new ApiError(400, "Name, email, password, and role are required");
  }
  const existingUser = await prisma.user.findUnique({ where: { email } });
  if (existingUser) {
    throw new ApiError(400, "User already exists");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: { name, email, password: hashedPassword, role },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      createdAt: true,
    },
  });

  return user;
};

export const loginUser = async (email: string, password: string) => {
  if (!email || !password) {
    throw new ApiError(400, "Email and password are required");
  }
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) throw new ApiError(404, "Invalid credentials");

  if (!user.password) throw new ApiError(404, "Invalid credentials");

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new ApiError(404, "Invalid credentials");

  if (!process.env.JWT_SECRET) {
    throw new ApiError(500, "JWT_SECRET is not defined");
  }

  const token = jwt.sign(
    { userId: user.id, role: user.role },
    process.env.JWT_SECRET as Secret,
    { expiresIn: (process.env.JWT_EXPIRES_IN || "24h") as StringValue }
  );

  if (!token) {
    throw new ApiError(500, "Token generation failed");
  }

  await prisma.user.update({
    where: { id: user.id },
    data: { refreshToken: token },
  });

  const { password: _, refreshToken: __, ...userWithoutSensitiveData } = user;

  return { token, user: userWithoutSensitiveData };
};

export const logoutUser = async (userId: string) => {
  await prisma.user.updateMany({
    where: { id: userId, refreshToken: { not: null } },
    data: { refreshToken: null },
  });
};