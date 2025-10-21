import { Posts_shares } from "../../entity/posts_shares.entity";

export interface IPosts_sharesModel {
    createPost_share(post_id: number, user_id: number): Promise<Posts_shares>;
    getPost_shares(post_id: number): Promise<Posts_shares[]>;   
}