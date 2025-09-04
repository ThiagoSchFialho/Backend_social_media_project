import { Users } from "../../entity/users.entity";

export interface IUsersModel {
    createUser(email: string, password: string, name: string): Promise<Users>;
    getUser(id: number): Promise<Users | null>;
    getUserByEmail(email: string): Promise<Users>;
    updateUser(id: number, email: string, password: string, name: string): Promise<Users>;
    deleteUser(id: number): Promise<boolean>;
}