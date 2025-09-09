import { QueryResult } from "pg";
import { pool } from "../lib/db";
import { Answers } from "../entity/answers.entity";
import { IAnswersModel } from "./interfaces/answers.model.interface"; 

export class AnswersModel implements IAnswersModel{
    
    async createAnswer(text: string, date_time: string, user_id: number, comment_id?: number | null, parent_answer_id?: number | null): Promise<Answers> {
        try {
            const result: QueryResult = await pool.query(`
                INSERT INTO answers (text, date_time, user_id, comment_id, parent_answer_id)
                VALUES ($1, $2, $3, $4, $5)
                RETURNING *;
            `, [text, date_time, user_id, comment_id ?? null, parent_answer_id ?? null]);

            return result.rows[0];

        } catch (error: any) {
            throw new Error(`Erro ao criar resposta: ${error.message}`);
        }
    }

    async getAnswer(id: number): Promise<Answers> {
        try {
            const result: QueryResult = await pool.query(`
                SELECT * FROM answers
                WHERE id = $1;
            `, [id]);

            return result.rows[0];

        } catch (error: any) {
            throw new Error(`Erro ao recuperar resposta: ${error.message}`);
        }
    }
    
    async getByComment(comment_id: number): Promise<Answers[]> {
        try {
            const result: QueryResult = await pool.query(`
                SELECT * FROM answers
                WHERE comment_id = $1;
            `, [comment_id]);

            return result.rows;

        } catch (error: any) {
            throw new Error(`Erro ao recuperar resposta pelo comentário: ${error.message}`);
        }
    }
    
    async getByAnswer(parent_answer_id: number): Promise<Answers[]> {
        try {
            const result: QueryResult = await pool.query(`
                SELECT * FROM answers
                WHERE parent_answer_id = $1;
            `, [parent_answer_id]);

            return result.rows;

        } catch (error: any) {
            throw new Error(`Erro ao recuperar resposta pela resposta: ${error.message}`);
        }
    }
    
    async updateAnswer(id: number, text: string, date_time: string): Promise<Answers> {
        try {
            const result: QueryResult = await pool.query(`
                UPDATE answers
                SET text = $1, date_time = $2
                WHERE id = $3
                RETURNING *;
            `, [text, date_time, id]);

            return result.rows[0];

        } catch (error: any) {
            throw new Error(`Erro ao atualizar resposta: ${error.message}`);
        }
    }
    
    async deleteAnswer(id: number): Promise<boolean> {
        try {
            const result: QueryResult = await pool.query(`
                DELETE FROM answers
                WHERE id = $1;
            `, [id]);

            if (result.rowCount === null) return false;
            return result.rowCount > 0;

        } catch (error: any) {
            throw new Error(`Erro ao excluir resposta: ${error.message}`);
        }
    }    
}