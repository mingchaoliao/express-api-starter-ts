import {Jsonable} from "../utils/jsonable";

export abstract class BaseModel implements Jsonable {
    abstract toJson(): { [p: string]: any };
}