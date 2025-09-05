import { Answers } from "../../entity/answers.entity";

export interface IAnswersModel {
    createAnswer(text: string, date_time: string, user_id: number, comment_id?: number, parent_answer_id?: number): Promise<Answers>;
    getByComment(comment_id: number): Promise<Answers[]>;
    getByAnswer(parent_answer_id: number): Promise<Answers[]>;
    updateAnswer(id: number, text: string, date_time: string): Promise<Answers>;
    deleteAnswer(id: number): Promise<boolean>;
}