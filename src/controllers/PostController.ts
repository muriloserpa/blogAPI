import type { Request, Response } from "express";
import ApiError from "../errors/api-error";
import { postService } from "../services/PostService";
import { PostRepository } from "../repositories/postRepository";
import { createPostSchema, updatePostSchema } from "../schemas/PostSchema";

export class PostController {
  private readonly postService: postService;

  constructor() {
    this.postService = new postService(new PostRepository());
  }

  async create(req: Request, res: Response) {
    const parsedBody = createPostSchema.safeParse(req.body);

    if (!parsedBody.success) {
      return res
        .status(400)
        .json({ error: parsedBody.error.flatten().fieldErrors });
    }

    const post = await this.postService.create({
      ...parsedBody.data,
      authorId: req.user!.id,
    });
    res.status(201).json(post);
  }

  async get(req: Request, res: Response) {
    try {
      const posts = await this.postService.read();
      res.status(200).json(posts);
    } catch (error) {
      res.status(400).json({ message: "Failed to get posts" });
    }
  }

  async getById(req: Request, res: Response) {
    if (!req.params.id) {
      throw new ApiError(400, "post id is required");
    }
    try {
      const post = await this.postService.readOne(req.params.id);
      res.status(200).json(post);
    } catch (error) {
      res.status(404).json({ message: "post not found" });
    }
  }

  async update(req: Request, res: Response) {
    if (!req.params.id) {
      throw new ApiError(400, "post id is required");
    }

    const parsedBody = updatePostSchema.safeParse(req.body);

    if (!parsedBody.success) {
      return res
        .status(400)
        .json({ error: parsedBody.error.flatten().fieldErrors });
    }

    const post = await this.postService.update(req.params.id, parsedBody.data);
    res.status(200).json(post);
  }

  async delete(req: Request, res: Response) {
    if (!req.params.id) {
      throw new ApiError(400, "post id is required");
    }
    try {
      await this.postService.delete(req.params.id);
      res.status(204).send();
    } catch (error) {
      res.status(400).json({ message: "Failed to delete post" });
    }
  }
}
