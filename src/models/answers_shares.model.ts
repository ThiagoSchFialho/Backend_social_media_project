import { QueryResult } from "pg";
import { pool } from "../lib/db";
import { Answers_shares } from "../entity/answers_shares.entity";
import { IAnswers_sharesModel } from "./interfaces/answers_shares.model.interface";

export class Answers_sharesModel implements IAnswers_sharesModel {
    async createAnswer_share(answer_id: number, user_id: number): Promise<Answers_shares> {
        try {
            const result: QueryResult<Answers_shares> = await pool.query(`
                INSERT INTO answers_shares (answer_id, user_id)
                VALUES ($1, $2)
                RETURING *;
            `, [answer_id, user_id]);

            return result.rows[0];
            
        } catch (error: any) {
            throw new Error(`Erro ao adicionar compartilhamento na resposta: ${error.message}`);
        }
    }
    async getAnswer_shares(answer_id: number): Promise<Answers_shares[]> {
        try {
            const result: QueryResult<Answers_shares> = await pool.query(`
                SELECT * FROM answers_shares
                WHERE answer_id = $1;
            `, [answer_id]);

            return result.rows;
            
        } catch (error: any) {
            throw new Error(`Erro ao recuperar compartilhamentos da resposta: ${error.message}`);
        }
    }
    
}