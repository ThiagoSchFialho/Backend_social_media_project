import { Comments } from "../../entity/comments.entity";

export interface ICommentsModel {
    createComment(text: string, date_time: string, post_id: number, user_id: number): Promise<Comments>;
    getComments(post_id: number): Promise<Comments[]>;
    updateComment(id: number, text: string, date_time: string): Promise<Comments>;
    deleteComment(id: number): Promise<boolean>;
}