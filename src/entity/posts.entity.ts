import { IPosts } from "./interfaces/posts.interface";

export class Posts implements IPosts {
    id?: number | undefined;
    text: string;
    date_time: string;
    media_url: string;
    user_id: number;
    
    constructor (text: string, date_time: string, media_url: string, user_id: number) {
        this.text = text
        this.date_time = date_time
        this.media_url = media_url
        this.user_id = user_id
    }
}