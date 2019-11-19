import "reflect-metadata";
import {App} from "./app/bootstrap/app";
import {InversifyExpressServer} from "inversify-express-utils";
import {Container} from "inversify";

const container = new Container();
const server = new InversifyExpressServer(container);

const app = new App(container, server);
app.serve(Number(process.env.PORT) || 3000);
