import {interfaces} from "inversify";
import axios from 'axios';
import Container = interfaces.Container;

export class ServiceProvider {
    constructor(private container: Container) {
        this.container = container;
    }

    register() {
        this.container.bind('axios').toConstantValue(axios);
    }
}