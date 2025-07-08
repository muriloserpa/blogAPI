import type { Request, Response, NextFunction } from "express";
import jwt, { type JwtPayload } from "jsonwebtoken";
import ApiError from "../errors/api-error";

export async function authenticate(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const authHeader = req.headers.authorization;
  if (!authHeader) throw new ApiError(401, "No token provided.");

  const token = authHeader.split(" ")[1];

  if (!token) throw new ApiError(401, "No token provided.");

  const secret = process.env.JWT_SECRET || "secret";

  try {
    const payload = jwt.verify(token, secret) as JwtPayload;
    req.user = {
      id: payload.id,
      role: payload.role,
    };
    next();
  } catch (err) {
    throw new ApiError(401, "Invalid token.");
  }
}

export async function authorizeAdmin(
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (req.user && req.user.role !== "ADMIN") {
    throw new ApiError(403, "Admins only");
  }
  next();
}
