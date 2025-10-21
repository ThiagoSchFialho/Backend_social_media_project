import { Posts_likes } from "../../entity/posts_likes.entity";

export interface IPosts_likesModel {
    createPost_like(post_id: number, user_id: number): Promise<Posts_likes>;
    getPost_likes(post_id: number): Promise<Posts_likes[]>;
}