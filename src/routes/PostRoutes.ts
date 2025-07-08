import { Router } from "express";
import { PostController } from "../controllers/PostController";

const postRouter = Router();
const controller = new PostController();

postRouter.get("/", async (req, res) => {
  await controller.get(req, res);
});
postRouter.post("/", async (req, res) => {
  await controller.create(req, res);
});
postRouter.get("/:id", async (req, res) => {
  await controller.getById(req, res);
});
postRouter.put("/:id", async (req, res) => {
  await controller.update(req, res);
});
postRouter.delete("/:id", async (req, res) => {
  await controller.delete(req, res);
});

export default postRouter;
