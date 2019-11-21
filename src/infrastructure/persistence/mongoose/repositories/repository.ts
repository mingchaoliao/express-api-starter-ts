import {Document, Model, Mongoose} from "mongoose";

export abstract class Repository {
    constructor(private _connection: Promise<Mongoose>, private _schemaDict: Promise<{[key: string]: Model<Document>}>) {}

    get connection(): Promise<Mongoose> {
        return this._connection;
    }

    get schemaDict(): Promise<{[key: string]: Model<Document>}> {
        return this._schemaDict;
    }
}