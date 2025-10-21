import { IPosts_shares } from "./interfaces/posts_shares.interface";

export class Posts_shares implements IPosts_shares {
    id?: number | undefined;
    post_id: number;
    user_id: number;

    constructor (post_id: number, user_id: number) {
        this.post_id = post_id
        this.user_id = user_id
    }
}