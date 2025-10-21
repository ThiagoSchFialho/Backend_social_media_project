import { IComments_shares } from "./interfaces/comments_shares.interface";

export class Comments_shares implements IComments_shares {
    id?: number | undefined;
    comment_id: number;
    user_id: number;

    constructor (comment_id: number, user_id: number) {
        this.comment_id = comment_id
        this.user_id = user_id
    }
}