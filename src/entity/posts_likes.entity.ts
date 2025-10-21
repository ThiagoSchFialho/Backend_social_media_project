import { IPosts_likes } from "./interfaces/posts_likes.interface";

export class Posts_likes implements IPosts_likes {
    id?: number | undefined;
    post_id: number;
    user_id: number;

    constructor (post_id: number, user_id: number) {
        this.post_id = post_id
        this.user_id = user_id
    }
}