import { Router } from "express";
import { PostController } from "../controllers/PostController";
import { PostPermission } from "../middlewares/PostPermission";

const postRouter = Router();
const controller = new PostController();

postRouter.get("/", async (req, res) => {
  await controller.get(req, res);
});
postRouter.post("/", async (req, res) => {
  await controller.create(req, res);
});
postRouter.get("/:id", PostPermission, async (req, res) => {
  await controller.getById(req, res);
});
postRouter.get("/:id/author", PostPermission, async (req, res) => {
  await controller.author(req, res);
});

postRouter.put("/:id/publish", PostPermission, async (req, res) => {
  await controller.publish(req, res);
});
postRouter.put("/:id", PostPermission, async (req, res) => {
  await controller.update(req, res);
});
postRouter.delete("/:id", PostPermission, async (req, res) => {
  await controller.delete(req, res);
});

export default postRouter;
