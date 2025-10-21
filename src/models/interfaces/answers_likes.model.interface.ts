import { Answers_likes } from "../../entity/answers_likes.entity";

export interface IAnswers_likesModel {
    createAnswer_like(answer_id: number, user_id: number): Promise<Answers_likes>;
    getAnswer_likes(answer_id: number): Promise<Answers_likes[]>;   
}