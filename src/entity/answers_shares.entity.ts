import { IAnswers_shares } from "./interfaces/answers_shares.interface";

export class Answers_shares implements IAnswers_shares {
    id?: number | undefined;
    answer_id: number;
    user_id: number;

    constructor (answer_id: number, user_id: number) {
        this.answer_id = answer_id
        this.user_id = user_id
    }
}