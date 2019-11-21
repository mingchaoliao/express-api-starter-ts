import {Connection} from "typeorm";


export abstract class TypeormRepository {
    constructor(private _connection: Promise<Connection>) {}

    get connection(): Promise<Connection> {
        return this._connection;
    }
}