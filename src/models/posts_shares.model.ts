import { QueryResult } from "pg";
import { pool } from "../lib/db";
import { IPosts_sharesModel } from "./interfaces/posts_shares.model.interface";
import { Posts_shares } from "../entity/posts_shares.entity";

export class Posts_sharesModel implements IPosts_sharesModel {
    async createPost_share(post_id: number, user_id: number): Promise<Posts_shares> {
        try {
            const result: QueryResult<Posts_shares> = await pool.query(`
                INSERT INTO posts_shares (posts_id, user_id)
                VALUES ($1, $2)
                RETURNING *;
            `, [post_id, user_id]);

            return result.rows[0];

        } catch (error: any) {
            throw new Error(`Erro ao adicionar compartilhamento no post: ${error.message}`);
        }
    }

    async getPost_shares(post_id: number): Promise<Posts_shares[]> {
        try {
            const result: QueryResult<Posts_shares> = await pool.query(`
                SELECT * FROM posts_shares
                WHERE post_id = $1;
            `, [post_id]);

            return result.rows;

        } catch (error: any) {
            throw new Error(`Erro ao recuperar compartilhamentos do post: ${error.message}`);
        }
    }
}