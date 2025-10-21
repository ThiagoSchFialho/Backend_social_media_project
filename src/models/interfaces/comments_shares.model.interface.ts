import { Comments_shares } from "../../entity/comment_shares.entity";

export interface IComments_sharesModel {
    createComment_share(comment_id: number, user_id: number): Promise<Comments_shares>;
    getComment_shares(comment_id: number): Promise<Comments_shares[]>;   
}