import { Friends } from "../../entity/friends.entity";

export interface IFriendsModel {
    createFriend(friend_id: number, user_id: number): Promise<Friends>;
    getFriend(id: number): Promise<Friends>;
    getFriends(user_id: number): Promise<Friends[]>;
    deleteFriend(id: number): Promise<boolean>;
}