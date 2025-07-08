import type { Post } from "../models/post";
import type IRepository from "./iRepository";

export default interface IPostRepository extends IRepository<Post> {
  publish(id: string): Promise<Post>;
}
