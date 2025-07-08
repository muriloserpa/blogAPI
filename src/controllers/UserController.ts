import type { Request, Response } from "express";
import { UserService } from "../services/UserService";
import { UserRepository } from "../repositories/userRepository";
import ApiError from "../errors/api-error";

export class UserController {
  private readonly userService: UserService;

  constructor() {
    this.userService = new UserService(new UserRepository());
  }

  async createUser(req: Request, res: Response) {
    try {
      const user = await this.userService.create(req.body);
      res.status(201).json(user);
    } catch (error) {
      res.status(400).json({ message: "Failed to create user" });
    }
  }

  async getUsers(req: Request, res: Response) {
    try {
      const users = await this.userService.read();
      console.log(users);
      res.status(200).json(users);
    } catch (error) {
      res.status(400).json({ message: "Failed to get users" });
    }
  }

  async getUserById(req: Request, res: Response) {
    if (!req.params.id) {
      throw new ApiError(400, "User id is required");
    }
    try {
      const user = await this.userService.readOne(req.params.id);
      res.status(200).json(user);
    } catch (error) {
      res.status(404).json({ message: "User not found" });
    }
  }

  async updateUser(req: Request, res: Response) {
    if (!req.params.id) {
      throw new ApiError(400, "User id is required");
    }
    try {
      const user = await this.userService.update(req.params.id, req.body);
      res.status(200).json(user);
    } catch (error) {
      res.status(400).json({ message: "Failed to update user" });
    }
  }

  async deleteUser(req: Request, res: Response) {
    if (!req.params.id) {
      throw new ApiError(400, "User id is required");
    }
    try {
      await this.userService.delete(req.params.id);
      res.status(204).send();
    } catch (error) {
      res.status(400).json({ message: "Failed to delete user" });
    }
  }
}
