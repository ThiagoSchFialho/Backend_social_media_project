import { IAnswers_likes } from "./interfaces/answers_likes.interface";

export class Answers_likes implements IAnswers_likes {
    id?: number | undefined;
    answer_id: number;
    user_id: number;

    constructor (answer_id: number, user_id: number) {
        this.answer_id = answer_id
        this.user_id = user_id
    }
}