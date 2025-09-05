import { IAnswers } from "./interfaces/answers.interface";

export class Answers implements IAnswers {
    id?: number | undefined;
    text: string;
    date_time: string;
    comment_id: number;
    parent_answer_id: number;
    user_id: number;
    
    constructor (text: string, date_time: string, comment_id: number, parent_answer_id: number, user_id: number) {
        this.text = text
        this.date_time = date_time
        this.comment_id = comment_id
        this.parent_answer_id = parent_answer_id
        this.user_id = user_id
    }
}