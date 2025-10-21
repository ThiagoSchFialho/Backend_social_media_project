import { Answers_shares } from "../../entity/answers_shares.entity";

export interface IAnswers_sharesModel {
    createAnswer_share(answer_id: number, user_id: number): Promise<Answers_shares>;
    getAnswer_shares(answer_id: number): Promise<Answers_shares[]>;   
}