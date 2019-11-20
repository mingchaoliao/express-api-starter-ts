import {interfaces} from "inversify";
import axios from "axios";
import {Environment} from "./environment";
import {HttpClient} from "../infrastructure/util/http-client";
import Container = interfaces.Container;

export class ServiceProvider {
    constructor(private container: Container) {
        this.container = container;
    }

    register() {
        this.container.bind<HttpClient>(HttpClient).toConstantValue(new HttpClient(axios));
        this.container.bind<Environment>(Environment).toConstantValue(new Environment(process.env));
    }
}