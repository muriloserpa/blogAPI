import { Router } from "express";
import { UserController } from "../controllers/UserController";
import { authorizeAdmin } from "../middlewares/auth";
import { UserPermission } from "../middlewares/UserPermission";

const userRouter = Router();
const controller = new UserController();

userRouter.get("/", authorizeAdmin, async (req, res) => {
  await controller.getUsers(req, res);
});
userRouter.post("/", authorizeAdmin, async (req, res) => {
  await controller.createUser(req, res);
});
userRouter.get("/:id", UserPermission, async (req, res) => {
  await controller.getUserById(req, res);
});
userRouter.put("/:id", UserPermission, async (req, res) => {
  await controller.updateUser(req, res);
});
userRouter.delete("/:id", UserPermission, async (req, res) => {
  await controller.deleteUser(req, res);
});

userRouter.get("/:id/posts", UserPermission, async (req, res) => {
  await controller.getUserPosts(req, res);
});

export default userRouter;
