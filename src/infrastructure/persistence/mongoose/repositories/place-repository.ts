import {PlaceRepositoryInterface} from "../../../../domain/repositories/place-repository-interface";
import {Place} from "../../../../domain/models/place";
import {Repository} from "./repository";
import {User} from "../../../../domain/models/user";

export class PlaceRepository extends Repository implements PlaceRepositoryInterface {
    async get(id: number): Promise<Place | undefined> {
        const schemaDict = await this.schemaDict;
        const placeModel = await schemaDict.place;

        const placeEntity = await placeModel.findOne({id: id}).populate("users");

        if (!placeEntity) {
            return undefined;
        }

        return new Place(
            placeEntity.get("id"),
            placeEntity.get("name"),
            placeEntity.get("users").map((usr: { [k: string]: any }) => {
                return new User(usr.id, usr.name);
            })
        );
    }

    async create(name: string): Promise<Place> {
        return undefined;
    }
}