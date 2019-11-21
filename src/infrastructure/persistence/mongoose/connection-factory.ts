import {Environment} from "../../../app/environment";
import mongoose, {Mongoose} from "mongoose";

export class ConnectionFactory {
    static create(env: Environment): Promise<Mongoose> {
        return mongoose.connect(
            `mongodb://${env.get("DB_HOST") || "localhost"}:${env.get("DB_PORT") || "27017"}/${env.get("DB_DATABASE") || "api-db"}`
        );
    }
}