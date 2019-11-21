export interface Jsonable {
    toJson(): { [key: string]: any };
}