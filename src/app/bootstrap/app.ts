import express from "express";
import compression from "compression";  // compresses requests
import bodyParser from "body-parser";
import errorHandler from "errorhandler";
import router from "../routes";

// Create Express server
const app = express();

// Express configuration
app.set("port", process.env.PORT || 3000);

app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

if(process.env.APP_ENV !== "production") {
    app.use(errorHandler());
}

app.use(router);

export default app;
