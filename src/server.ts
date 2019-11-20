import "reflect-metadata";
import {App} from "./app/bootstrap/app";
import {InversifyExpressServer} from "inversify-express-utils";
import {Container} from "inversify";
import {ServiceProvider} from './app/service-provider';

const container = new Container();
const server = new InversifyExpressServer(container);
const serviceProvider = new ServiceProvider(container);

const app = new App(container, server, serviceProvider);
app.serve(Number(process.env.PORT) || 3000);
