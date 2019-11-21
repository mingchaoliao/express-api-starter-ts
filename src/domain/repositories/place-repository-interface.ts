import {Place} from "../models/place";

export interface PlaceRepositoryInterface {
    get(id: number): Promise<Place|undefined>;
    create(name: string): Promise<Place>;
}