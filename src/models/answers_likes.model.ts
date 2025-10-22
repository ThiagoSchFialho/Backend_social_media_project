import { QueryResult } from "pg";
import { pool } from "../lib/db";
import { Answers_likes } from "../entity/answers_likes.entity";
import { IAnswers_likesModel } from "./interfaces/answers_likes.model.interface";

export class Answers_likesModel implements IAnswers_likesModel {
    async createAnswer_like(answer_id: number, user_id: number): Promise<Answers_likes> {
        try {
            const result: QueryResult<Answers_likes> = await pool.query(`
                INSERT INTO answers_likes (answer_id, user_id)
                VALUES ($1, $2)
                RETURING *;
            `, [answer_id, user_id]);

            return result.rows[0];
            
        } catch (error: any) {
            throw new Error(`Erro ao adicionar like na resposta: ${error.message}`);
        }
    }
    async getAnswer_likes(answer_id: number): Promise<Answers_likes[]> {
        try {
            const result: QueryResult<Answers_likes> = await pool.query(`
                SELECT * FROM answers_likes
                WHERE answer_id = $1;
            `, [answer_id]);

            return result.rows;
            
        } catch (error: any) {
            throw new Error(`Erro ao recuperar likes da resposta: ${error.message}`);
        }
    }
    
}