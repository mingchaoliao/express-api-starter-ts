import {Place} from "../../../../domain/models/place";
import {TypeormRepository} from "./typeorm-repository";
import {PlaceEntity} from "../entities/place-entity";
import {UserEntity} from "../entities/user-entity";
import {User} from "../../../../domain/models/user";
import {PlaceRepositoryInterface} from "../../../../domain/repositories/place-repository-interface";

export class PlaceRepository extends TypeormRepository implements PlaceRepositoryInterface {
    async get(id: number): Promise<Place | undefined> {
        const connection = await this.connection;
        const placeEntity = await connection.getRepository(PlaceEntity).findOne(id, {
            relations: ["users"]
        });

        if (!placeEntity) {
            return undefined;
        }

        return this.constructPlace(placeEntity);
    }

    async create(name: string): Promise<Place> {
        const connection = await this.connection;

        const res = await connection.getRepository(PlaceEntity).insert({
            name: name
        });

        return this.get(res.identifiers[0].id);
    }

    private constructPlace(placeEntity: PlaceEntity): Place {
        return new Place(
            placeEntity.id,
            placeEntity.name,
            'users' in placeEntity ? placeEntity.users.map((userEntity: UserEntity) => {
                return new User(userEntity.id, userEntity.name);
            }) : []
        );
    }
}