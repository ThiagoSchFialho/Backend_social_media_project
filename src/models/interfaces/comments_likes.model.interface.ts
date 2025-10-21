import { Comments_likes } from "../../entity/comments_likes.entity";

export interface IComments_likesModel {
    createComment_like(comment_id: number, user_id: number): Promise<Comments_likes>;
    getComment_likes(comment_id: number): Promise<Comments_likes[]>;   
}