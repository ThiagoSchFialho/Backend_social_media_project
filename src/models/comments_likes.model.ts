import { QueryResult } from "pg";
import { pool } from "../lib/db";
import { IComments_likesModel } from "./interfaces/comments_likes.model.interface";
import { Comments_likes } from "../entity/comments_likes.entity";

export class Comments_likesModel implements IComments_likesModel {
    async createComment_like(comment_id: number, user_id: number): Promise<Comments_likes> {
        try {
            const result: QueryResult<Comments_likes> = await pool.query(`
                INSERT INTO comments_likes (comment_id, user_id)
                VALUES ($1, $2)
                RETURNING *;    
            `, [comment_id, user_id]);

            return result.rows[0];

        } catch (error: any) {
            throw new Error(`Erro ao adicionar like no comantário: ${error.message}`);
        }
    }

    async getComment_likes(comment_id: number): Promise<Comments_likes[]> {
        try {
            const result: QueryResult<Comments_likes> = await pool.query(`
                SELECT * FROM comments_likes
                WHERE comment_id = $1;    
            `, [comment_id]);

            return result.rows;
            
        } catch (error: any) {
            throw new Error(`Erro ao recuperar likes do comantário: ${error.message}`);
        }
    }
}