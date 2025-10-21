import { IFriends } from "./interfaces/friends.interface";

export class Friends implements IFriends {
    id?: number | undefined;
    friend_id: number;
    user_id: number;

    constructor (friend_id: number, user_id: number) {
        this.friend_id = friend_id
        this.user_id = user_id
    }
}