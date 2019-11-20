import express from "express";
import compression from "compression"; // compresses requests
import bodyParser from "body-parser";
import errorHandler from "errorhandler";
import {interfaces} from "inversify";
import {InversifyExpressServer} from "inversify-express-utils";

import '../controllers/welcome-controller'
import Container = interfaces.Container;

export class App {
    private container: Container;
    private server: InversifyExpressServer;

    constructor(container: interfaces.Container, server: InversifyExpressServer) {
        this.container = container;
        this.server = server;
    }

    serve(port: number): void {
        this.server
            .setConfig((app: express.Application) => {
                app.use(compression());
                app.use(bodyParser.json());

                console.log(`Configured in ${app.get('env')} mode`);

                if (process.env.APP_ENV !== "production") {
                    console.log('Middleware: errorHandler is enabled');
                    app.use(errorHandler());
                }
            })
            .setErrorConfig((app: express.Application) => {
                app.use((req: express.Request, res: express.Response) => {
                    res.status(404).json({
                        message: `undefined route: ${req.method} ${req.path}`
                    });
                });

                app.use(function (err: Error, req: express.Request, res: express.Response, next: express.NextFunction) {
                    res.status(500).json({
                        message: err.message
                    });
                });
            })
            .build()
            .listen(port, () => {
                console.log(`App is running at http://localhost:${port}`);
                console.log("Press CTRL-C to stop\n");
            });
    }
}
