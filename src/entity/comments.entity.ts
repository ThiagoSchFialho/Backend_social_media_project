import { IComments } from "./interfaces/comments.interface";

export class Comments implements IComments {
    id?: number | undefined;
    text: string;
    date_time: string;
    post_id: number;
    user_id: number;
    
    constructor (text: string, date_time: string, post_id: number, user_id: number) {
        this.text = text
        this.date_time = date_time
        this.post_id = post_id
        this.user_id = user_id
    }
}