import { Router } from "express";
import { AuthController } from "../controllers/AuthController";
import { usersService } from "../container/UserServiceContainer";

const authRouter = Router();
const controller = new AuthController(usersService);

authRouter.post("/register", async (req, res) => {
  await controller.register(req, res);
});
authRouter.post("/login", async (req, res) => {
  await controller.login(req, res);
});

export default authRouter;
