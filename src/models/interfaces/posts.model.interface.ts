import { Posts } from "../../entity/posts.entity";

export interface IPostsModel {
    createPost(text: string, dateTime: string, mediaUrl: string, user_id: number): Promise<Posts>;
    getPost(id: number): Promise<Posts | null>;
    getPosts(user_id: number): Promise<Posts[]>;
    getAllPosts(): Promise<Posts[]>;
    updatePost(id: number, text: string, dateTime: string, mediaUrl: string): Promise<Posts>;
    deletePost(id: number): Promise<boolean>;
}