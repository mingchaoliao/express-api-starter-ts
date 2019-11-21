import {interfaces} from "inversify";
import axios from "axios";
import {Environment} from "./environment";
import {HttpClient} from "../infrastructure/util/http-client";
import {Logger} from "../infrastructure/util/logger";
import Container = interfaces.Container;
import {PlaceRepository} from "../infrastructure/persistence/typeorm/repositories/place-repository";
import {Connection} from "typeorm";
import {ConnectionFactory} from "../infrastructure/persistence/typeorm/connection-factory";
// import {ConnectionFactory as MongoConnectionFactory} from "../infrastructure/persistence/mongoose/connection-factory";
// import {PlaceRepository as MongoPlaceRepository} from "../infrastructure/persistence/mongoose/repositories/place-repository";

import {PlaceRepositoryInterface} from "../domain/repositories/place-repository-interface";
// import {SchemaFactory} from "../infrastructure/persistence/mongoose/schema-factory";

export class ServiceProvider {
    constructor(private container: Container) {
        this.container = container;
    }

    register() {
        // setup environment
        this.container.bind<Environment>(Environment).toConstantValue(new Environment(process.env));
        const env: Environment = this.container.get(Environment);

        // setup logger
        this.container.bind<Logger>(Logger).toConstantValue(Logger.create(env));

        // setup db connection
        this.container.bind<Promise<Connection>>("db-connection").toConstantValue(ConnectionFactory.create(env));
        const conn: Promise<Connection> = this.container.get("db-connection");

        this.container.bind<HttpClient>(HttpClient).toConstantValue(new HttpClient(axios));
        this.container.bind<PlaceRepositoryInterface>("place-repository").toConstantValue(new PlaceRepository(conn));

        // const mongo = MongoConnectionFactory.create(env);
        // this.container.bind<PlaceRepositoryInterface>("place-repository").toConstantValue(new MongoPlaceRepository(
        //     mongo,
        //     SchemaFactory.create(mongo)
        // ));
    }
}