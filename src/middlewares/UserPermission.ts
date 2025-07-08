import type { NextFunction, Request, Response } from "express";
import { usersService } from "../container/UserServiceContainer";
import ApiError from "../errors/api-error";

export async function UserPermission(
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (req.user && req.user.role == "ADMIN") {
    return next();
  }
  const userService = usersService;
  const user = await usersService.readOne(req.params.id!);
  if (user.id !== req.user!.id) {
    throw new ApiError(403, "You dont have permission");
  }
  next();
}
