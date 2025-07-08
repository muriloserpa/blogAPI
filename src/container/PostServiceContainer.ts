import { PostRepository } from "../repositories/postRepository";
import { postService } from "../services/PostService";

const postRepository = new PostRepository();
const PostService = new postService(postRepository);

export { PostService };
