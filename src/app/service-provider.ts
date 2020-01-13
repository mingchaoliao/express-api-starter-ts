import {interfaces} from "inversify";
import axios from "axios";
import {Environment} from "./environment";
import {HttpClient} from "../infrastructure/util/http-client";
import {Logger} from "../infrastructure/util/logger";
import {Connection} from "typeorm";
import {ConnectionFactory} from "../infrastructure/persistence/typeorm/connection-factory";
import Container = interfaces.Container;

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

        // setup HTTP client
        this.container.bind<HttpClient>(HttpClient).toConstantValue(new HttpClient(axios));

        // bind repositories

        // bind services
    }
}