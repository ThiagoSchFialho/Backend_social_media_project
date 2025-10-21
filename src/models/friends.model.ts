import { QueryResult } from "pg";
import { pool } from "../lib/db";
import { Friends } from "../entity/friends.entity";
import { IFriendsModel } from "./interfaces/friends.model.interface";

export class FriendsModel implements IFriendsModel {
    async createFriend(friend_id: number, user_id: number): Promise<Friends> {
        try {
            const result: QueryResult<Friends> = await pool.query(`
                INSERT INTO friends (friend_id, user_id)
                VALUES ($1, $2)
                RETURNING *;
            `, [friend_id, user_id]);

            return result.rows[0];

        } catch (error: any) {
            throw new Error(`Erro ao criar amigo: ${error.message}`);
        }
    }

    async getFriend(id: number): Promise<Friends> {
        try {
            const result: QueryResult<Friends> = await pool.query(`
                SELECT * FROM friends
                WHERE id = $1;
            `, [id]);

            return result.rows[0];

        } catch (error: any) {
            throw new Error(`Erro ao recuperar amigo: ${error.message}`);
        }
    }

    async getFriends(user_id: number): Promise<Friends[]> {
        try {
            const result: QueryResult<Friends> = await pool.query(`
                SELECT * FROM friends
                WHERE user_id = $1;
            `, [user_id]);

            return result.rows;

        } catch (error: any) {
            throw new Error(`Erro ao recuperar amigos: ${error.message}`);
        }
    }

    async deleteFriend(id: number): Promise<boolean> {
        try {
            const result: QueryResult<Friends> = await pool.query(`
                DELETE FROM friends
                WHERE id = $1;    
            `, [id]);

            if (result.rowCount === null) return false;
            return result.rowCount > 0;

        } catch (error: any) {
            throw new Error(`Erro ao remover amigo: ${error.message}`);
        }
    }
}