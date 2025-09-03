import { IUsers } from "./interfaces/users.interface";

export class Users implements IUsers {
    id?: number | undefined;
    email: string;
    password: string;
    name: string;   

    constructor (email: string, password: string, name: string) {
        this.email = email
        this.password = password
        this.name = name
    }
}