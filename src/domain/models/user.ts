import {Jsonable} from "../utils/jsonable";

export class User implements Jsonable {
    constructor(
        private _id: number,
        private _name: string
    ) {
    }

    get id(): number {
        return this._id;
    }

    get name(): string {
        return this._name;
    }

    toJson(): { [p: string]: any } {
        return {
            id: this.id,
            name: this.name
        };
    }
}