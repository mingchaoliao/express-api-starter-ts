import mongoose, {Model, Mongoose, Document} from "mongoose";

export class SchemaFactory {
    static async create(connection: Promise<Mongoose>): Promise<{[key: string]: Model<Document>}> {
        return {
            user: (await connection).model("user", new mongoose.Schema({
                id: Number,
                name: String
            }, {collection: "user"})),
            place: (await connection).model("place", new mongoose.Schema({
                id: Number,
                name: String,
                users: [{type: mongoose.Schema.Types.ObjectId, ref: "user"}]
            }, {collection: "place"}))
        };
    }
}