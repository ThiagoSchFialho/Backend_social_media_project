import { IPosts } from "./interfaces/posts.interface";

export class Posts implements IPosts {
    id?: number | undefined;
    text: string;
    dateTime: string;
    mediaUrl: string;
    user_id: number;
    
    constructor (text: string, dateTime: string, mediaUrl: string, user_id: number) {
        this.text = text
        this.dateTime = dateTime
        this.mediaUrl = mediaUrl
        this.user_id = user_id
    }
}