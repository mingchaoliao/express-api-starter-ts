import winston, {Logger as LoggerInterface} from "winston";
import {Environment} from "../../app/environment";

export class Logger {
    constructor(private winston: LoggerInterface) {
    }

    static create(env: Environment): Logger {
        return new Logger(winston.createLogger({
            level: env.getLogLevel(),
            format: winston.format.combine(
                winston.format.errors({
                    stack: true
                }),
                winston.format.timestamp(),
                winston.format.ms(),
                winston.format.label({
                    label: `ENV: ${env.getEnvironment()}`,
                    message: true
                })
            ),
            transports: [
                new winston.transports.Console({
                    format: winston.format.combine(
                        winston.format.cli(),
                    ),
                }),
                new winston.transports.File({
                    filename: "api.log",
                    format: winston.format.combine(
                        winston.format.logstash(),
                    ),
                })
            ]
        }));
    }

    resolve(): LoggerInterface {
        return this.winston;
    }
}