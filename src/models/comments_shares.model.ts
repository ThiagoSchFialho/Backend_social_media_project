import { QueryResult } from "pg";
import { pool } from "../lib/db";
import { IComments_sharesModel } from "./interfaces/comments_shares.model.interface";
import { Comments_shares } from "../entity/comment_shares.entity";

export class Comments_sharesModel implements IComments_sharesModel {
    async createComment_share(comment_id: number, user_id: number): Promise<Comments_shares> {
        try {
            const result: QueryResult<Comments_shares> = await pool.query(`
                INSERT INTO comments_shares (comment_id, user_id)
                VALUES ($1, $2)
                RETURNING *;    
            `, [comment_id, user_id]);

            return result.rows[0];

        } catch (error: any) {
            throw new Error(`Erro ao adicionar compartilhamento no comantário: ${error.message}`);
        }
    }

    async getComment_shares(comment_id: number): Promise<Comments_shares[]> {
        try {
            const result: QueryResult<Comments_shares> = await pool.query(`
                SELECT * FROM comments_shares
                WHERE comment_id = $1;    
            `, [comment_id]);

            return result.rows;
            
        } catch (error: any) {
            throw new Error(`Erro ao recuperar compartilhamentos do comantário: ${error.message}`);
        }
    }
}