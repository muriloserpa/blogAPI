import { Router } from "express";
import { UserController } from "../controllers/UserController";

const userRouter = Router();
const controller = new UserController();

userRouter.get("/", async (req, res) => {
  await controller.getUsers(req, res);
});
userRouter.post("/", async (req, res) => {
  await controller.createUser(req, res);
});
userRouter.get("/:id", async (req, res) => {
  await controller.getUserById(req, res);
});
userRouter.put("/:id", async (req, res) => {
  await controller.updateUser(req, res);
});
userRouter.delete("/:id", async (req, res) => {
  await controller.deleteUser(req, res);
});

export default userRouter;
