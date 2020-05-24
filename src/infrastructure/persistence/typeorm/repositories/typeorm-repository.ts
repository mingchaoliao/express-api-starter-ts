import {Connection} from "typeorm";


export abstract class TypeormRepository {
    constructor(private _connection: Connection) {
    }

    get connection(): Connection {
        return this._connection;
    }
}