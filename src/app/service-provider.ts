import {interfaces} from "inversify";
import axios from "axios";
import {Environment} from "./environment";
import {HttpClient} from "../infrastructure/util/http-client";
import {Logger} from "../infrastructure/util/logger";
import {Connection, createConnection, getConnectionOptions} from "typeorm";
import Container = interfaces.Container;

export class ServiceProvider {
    constructor(private _container: Container) {
        this._container = _container;
    }

    get container(): interfaces.Container {
        return this._container;
    }

    async register(): Promise<ServiceProvider> {
        // setup environment
        this._container.bind<Environment>(Environment).toConstantValue(new Environment(process.env));
        const env: Environment = this._container.get(Environment);

        // setup logger
        const logger = Logger.create(env);
        this._container.bind<Logger>(Logger).toConstantValue(logger);

        // setup db connection
        const connectionOptions = await getConnectionOptions();
        Object.assign(connectionOptions, {
            entities: [__dirname + "/../infrastructure/persistence/typeorm/entities/*.js"]
        });
        this._container.bind<Promise<Connection>>("db-connection").toConstantValue(createConnection(connectionOptions));
        const conn: Connection = await this._container.get("db-connection");

        // setup HTTP client
        const http = new HttpClient(axios);
        this._container.bind<HttpClient>(HttpClient).toConstantValue(http);

        // bind repositories

        // bind services

        return this;
    }

    async complete(): Promise<void> {
        // add any clean up jobs. e,g, close a DB connection.

        const conn: Connection = await this._container.get("db-connection");
        await conn.close();
    }
}