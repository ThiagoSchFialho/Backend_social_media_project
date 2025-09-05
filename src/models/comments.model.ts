import { QueryResult } from "pg";
import { pool } from "../lib/db";
import { Comments } from "../entity/comments.entity";
import { ICommentsModel } from "./interfaces/comments.model.interface";

export class CommentsModel implements ICommentsModel{
    
    async createComment(text: string, date_time: string, post_id: number, user_id: number): Promise<Comments> {
        try {
            const result: QueryResult<Comments> = await pool.query(`
                INSERT INTO comments (text, date_time, post_id, user_id)
                VALUES ($1, $2, $3, $4)
                RETURNING *;
            `, [text, date_time, post_id, user_id]);

            return result.rows[0];

        } catch (error: any) {
            throw new Error(`Erro ao criar comentário: ${error.message}`);
        }
    }
    
    async getComments(post_id: number): Promise<Comments[]> {
        try {
            const result: QueryResult<Comments> = await pool.query(`
                SELECT * FROM comments
                WHERE post_id = $1;    
            `, [post_id]);

            return result.rows;

        } catch (error: any) {
            throw new Error(`Erro ao recuperar comentáros: ${error.message}`);
        }
    }
    
    async updateComment(id: number, text: string, date_time: string): Promise<Comments> {
        try {
            const result: QueryResult<Comments> = await pool.query(`
                UPDATE comments
                SET text = $1, date_time = $2
                WHERE id = $3
                RETURNING *;    
            `, [text, date_time, id]);

            return result.rows[0];

        } catch (error: any) {
            throw new Error(`Erro ao atualizar comentário: ${error.message}`);
        }
    }
    
    async deleteComment(id: number): Promise<boolean> {
        try {
            const result: QueryResult<Comments> = await pool.query(`
                DELETE FROM comments
                WHERE id = $1    
            `, [id]);

            if (result.rowCount === null) return false;
            return result.rowCount > 0;

        } catch (error: any) {
            throw new Error(`Erro ao excluir comentário: ${error.message}`);
        }
    }
}