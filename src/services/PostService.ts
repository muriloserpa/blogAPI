import { hash } from "bcryptjs";
import ApiError from "../errors/api-error";
import type IPostRepository from "../interfaces/iPostRepository";
import type {
  createPostData,
  Post,
  PostStatus,
  updatePostData,
} from "../models/post";

export class postService {
  protected readonly repository: IPostRepository;

  constructor(userRepository: IPostRepository) {
    this.repository = userRepository;
  }

  async create(
    data: createPostData,
    status: PostStatus = "DRAFT"
  ): Promise<Omit<Post, "status">> {
    const created = await this.repository.create({
      ...data,
      status: status,
    });

    return {
      id: created.id,
      title: created.title,
      content: created.content,
      authorId: created.authorId,
      createdAt: created.createdAt,
      updatedAt: created.updatedAt,
    };
  }
  async read(): Promise<Omit<Post, "status" | "content">[]> {
    const posts = await this.repository.read();
    const postsWithoutStatus = posts.map(
      ({ status, content, ...rest }) => rest
    );
    return postsWithoutStatus;
  }
  async readOne(id: string): Promise<Post> {
    const post = await this.repository.readOne(id);
    if (!post) throw new ApiError(404, "post not found.");
    const { ...postWithoutStatus } = post;
    return postWithoutStatus;
  }

  async update(id: string, userData: updatePostData) {
    const post = await this.repository.readOne(id);
    if (!post) throw new ApiError(404, "post not found.");
    const updated = await this.repository.update(id, userData);
    return updated;
  }
  async delete(id: string) {
    const deleted = await this.repository.delete(id);
    const { status, ...post } = deleted;
    return post;
  }

  async publish(id: string) {
    const post = await this.repository.readOne(id);
    if (!post) throw new ApiError(404, "post not found.");
    const published = await this.repository.publish(id);
    return published;
  }

  async author(id: string) {
    const post = await this.repository.readOne(id);
    if (!post) throw new ApiError(404, "post not found.");
    const author = await this.repository.getAuthor(post);
    return author;
  }
}
