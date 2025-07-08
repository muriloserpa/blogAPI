import type { NextFunction, Request, Response } from "express";
import ApiError from "../errors/api-error";
import { PostService } from "../container/PostServiceContainer";

export async function PostPermission(
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (req.user && req.user.role == "ADMIN") {
    return next();
  }
  const postService = PostService;
  const post = await postService.readOne(req.params.id!);
  if (post.authorId !== req.user!.id) {
    throw new ApiError(403, "You dont have permission");
  }
  next();
}
