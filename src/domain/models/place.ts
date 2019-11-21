import {Jsonable} from "../utils/jsonable";
import {User} from "./user";

export class Place implements Jsonable {
    constructor(
        private _id: number,
        private _name: string,
        private _users: User[]
    ) {
    }

    get id(): number {
        return this._id;
    }

    get name(): string {
        return this._name;
    }

    get users(): User[] {
        return this._users;
    }

    toJson(): { [p: string]: any } {
        return {
            id: this.id,
            name: this.name,
            users: this.users.map((user: User) => user.toJson())
        };
    }
}