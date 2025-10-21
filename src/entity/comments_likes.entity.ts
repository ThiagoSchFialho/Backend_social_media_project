import { IComments_likes } from "./interfaces/comments_likes.interface";

export class Comments_likes implements IComments_likes {
    id?: number | undefined;
    comment_id: number;
    user_id: number;

    constructor (comment_id: number, user_id: number) {
        this.comment_id = comment_id
        this.user_id = user_id
    }
}