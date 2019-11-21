import {interfaces} from "inversify";
import axios from "axios";
import {Environment} from "./environment";
import {HttpClient} from "../infrastructure/util/http-client";
import {Logger} from "../infrastructure/util/logger";
import Container = interfaces.Container;

export class ServiceProvider {
    constructor(private container: Container) {
        this.container = container;
    }

    register() {
        // setup environment
        this.container.bind<Environment>(Environment).toConstantValue(new Environment(process.env));
        const env = this.container.get(Environment);

        // setup logger
        this.container.bind<Logger>(Logger).toConstantValue(Logger.create(env));


        this.container.bind<HttpClient>(HttpClient).toConstantValue(new HttpClient(axios));
    }
}