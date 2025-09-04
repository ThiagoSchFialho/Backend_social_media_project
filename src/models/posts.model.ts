import { QueryResult } from "pg";
import { pool } from "../lib/db";
import { Posts } from "../entity/posts.entity";
import { IPostsModel } from "./interfaces/posts.model.interface";

export class PostsModel implements IPostsModel {
    
    async createPost(text: string, dateTime: string, mediaUrl: string, user_id: number): Promise<Posts> {
        try {
            const result: QueryResult<Posts> = await pool.query(`
                INSERT INTO posts (text, dateTime, mediaUrl, user_id)
                VALUES ($1, $2, $3, $4)
                RETURNING *;
            `,[text, dateTime, mediaUrl, user_id]);

            return result.rows[0];

        } catch (error: any) {
            throw new Error(`Erro ao criar post: ${error.message}`)
        }
    }
    
    async getPost(id: number): Promise<Posts | null> {
        try {
            const result: QueryResult<Posts> = await pool.query(`
                SELECT * FROM posts
                WHERE id = $1;
            `,[id]);

            return result.rows[0];

        } catch (error: any) {
            throw new Error(`Erro ao recuperar post: ${error.message}`)
        }
    }
    
    async getPosts(user_id: number): Promise<Posts[]> {
        try {
            const result: QueryResult<Posts> = await pool.query(`
                SELECT * FROM posts
                WHERE user_id = $1;
            `,[user_id]);

            return result.rows;

        } catch (error: any) {
            throw new Error(`Erro ao recuperar posts: ${error.message}`)
        }
    }
    
    async getAllPosts(): Promise<Posts[]> {
        try {
            const result: QueryResult<Posts> = await pool.query(`
                SELECT * FROM posts;    
            `);

            return result.rows;

        } catch (error: any) {
            throw new Error(`Erro ao recuperar todos os posts: ${error.message}`)
        }
    }
    
    async updatePost(id: number, text: string, dateTime: string, mediaUrl: string): Promise<Posts> {
        try {
            const result: QueryResult<Posts> = await pool.query(`
                UPDATE posts
                SET text = $1, dateTime = $2, mediaUrl = $3
                WHERE id = $4
                RETURNING *;
            `,[text, dateTime, mediaUrl, id]);

            return result.rows[0];

        } catch (error: any) {
            throw new Error(`Erro ao atualizar post: ${error.message}`)
        }
    }
    
    async deletePost(id: number): Promise<boolean> {
        try {
            const result: QueryResult<Posts> = await pool.query(`
                DELETE FROM posts
                WHERE id = $1;
            `,[id]);

            if (result.rowCount === null) return false;
            return result.rowCount > 0;

        } catch (error: any) {
            throw new Error(`Erro ao excluir post: ${error.message}`)
        }
    }
}