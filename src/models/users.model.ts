import { QueryResult } from "pg";
import { pool } from "../lib/db";
import { Users } from "../entity/users.entity";
import { IUsersModel } from "./interfaces/users.model.interface";

export class UsersModel implements IUsersModel{
    
    async createUser(email: string, password: string, name: string): Promise<Users> {
        try {
            const result: QueryResult<Users> = await pool.query(`
                INSERT INTO users (email, password, name)
                VALUES ($1, $2, $3)
                RETURNING *;
            `, [email, password, name]);

            return result.rows[0];

        } catch (error: any) {
            throw new Error(`Erro ao criar usuário: ${error.message}`);
        }
    }

    async getUser(id: number): Promise<Users | null> {
        try {
            const result: QueryResult<Users> = await pool.query(`
                SELECT * FROM users
                WHERE id = $1;
            `, [id]);

            return result.rows[0];

        } catch (error: any) {
            throw new Error(`Erro ao recuperar usuário: ${error.message}`);
        }
    }
    
    async getUserByEmail(email: string): Promise<Users> {
        try {
            const result: QueryResult<Users> = await pool.query(`
                SELECT * FROM users
                WHERE email = $1;
            `, [email]);

            return result.rows[0];

        } catch (error: any) {
            throw new Error(`Falha ao recuperar usuário: ${error.message}`);
        }
    }
    
    async updateUser(id: number, email: string, password: string, name: string): Promise<Users> {
        try {
            const result: QueryResult<Users> = await pool.query(`
                UPDATE users
                SET email = $1, password = $2, name = $3
                WHERE id = $4
                RETURNING *;
            `, [email, password, name, id]);

            return result.rows[0];

        } catch (error: any) {
            throw new Error(`Falha ao atualizar usuário: ${error.message}`);
        }
    }
    
    async deleteUser(id: number): Promise<boolean> {
        try {
            const result: QueryResult<Users> = await pool.query(`
                DELETE FROM users
                WHERE id = $1;
            `, [id]);

            if (result.rowCount === null) return false;
            return result.rowCount > 0;

        } catch (error: any) {
            throw new Error(`Falha ao excluir usuário: ${error.message}`);
        }
    }
}