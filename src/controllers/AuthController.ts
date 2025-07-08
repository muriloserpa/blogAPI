import type { Request, Response } from "express";
import type { UserService } from "../services/UserService";
import { registerUserSchema } from "../schemas/UserSchema";

export class AuthController {
  constructor(private service: UserService) {}
  async login(req: Request, res: Response): Promise<Response> {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ error: "E-mail and password are required." });
    }
    const token = await this.service.autenticate({ email, password });
    return res.json({ token });
  }

  async register(req: Request, res: Response): Promise<Response> {
    const parsedBody = registerUserSchema.safeParse(req.body);
    if (!parsedBody.success) {
      return res
        .status(400)
        .json({ error: parsedBody.error.flatten().fieldErrors });
    }
    const user = await this.service.create({
      ...parsedBody.data,
      role: "USER",
    });
    return res.status(201).json({ message: "User created successfully." });
  }
}
