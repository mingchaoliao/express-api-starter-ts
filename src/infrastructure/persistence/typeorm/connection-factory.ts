import {Connection, ConnectionOptions, createConnection} from "typeorm";
import {Environment} from "../../../app/environment";
import {PlaceEntity} from "./entities/place-entity";
import {UserEntity} from "./entities/user-entity";

export class ConnectionFactory {
    static create(env: Environment): Promise<Connection> {
        const options: any = {
            type: env.get("DB_CONNECTION"),
            database: String(env.get("DB_DATABASE")) || "test",
            host: String(env.get("DB_HOST")) || "loalhost",
            port: Number(env.get("DB_PORT")) || 3306,
            entities: [
                PlaceEntity,
                UserEntity
            ],
        };

        if(env.get("DB_USER") !== undefined) {
            options["username"] = String(env.get("DB_USER"));
        }

        if(env.get("DB_USER") !== undefined) {
            options["password"] = String(env.get("DB_PASSWORD"));
        }

        return createConnection(options);
    }
}