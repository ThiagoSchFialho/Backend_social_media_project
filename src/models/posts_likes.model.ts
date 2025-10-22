import { QueryResult } from "pg";
import { pool } from "../lib/db";
import { Posts_likes } from "../entity/posts_likes.entity";
import { IPosts_likesModel } from "./interfaces/posts_likes.model.interface";

export class Posts_likesModel implements IPosts_likesModel {
    async createPost_like(post_id: number, user_id: number): Promise<Posts_likes> {
        try {
            const result: QueryResult<Posts_likes> = await pool.query(`
                INSERT INTO posts_likes (posts_id, user_id)
                VALUES ($1, $2)
                RETURNING *;
            `, [post_id, user_id]);

            return result.rows[0];

        } catch (error: any) {
            throw new Error(`Erro ao adicionar like no post: ${error.message}`);
        }
    }

    async getPost_likes(post_id: number): Promise<Posts_likes[]> {
        try {
            const result: QueryResult<Posts_likes> = await pool.query(`
                SELECT * FROM posts_likes
                WHERE post_id = $1;
            `, [post_id]);

            return result.rows;

        } catch (error: any) {
            throw new Error(`Erro ao recuperar likes do post: ${error.message}`);
        }
    }
}