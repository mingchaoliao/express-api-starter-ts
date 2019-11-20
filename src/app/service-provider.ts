import {interfaces} from "inversify";
import axios from "axios";
import {Environment} from "./environment";
import Container = interfaces.Container;

export class ServiceProvider {
    constructor(private container: Container) {
        this.container = container;
    }

    register() {
        this.container.bind("axios").toConstantValue(axios);
        this.container.bind<Environment>(Environment).toConstantValue(new Environment(process.env));
    }
}