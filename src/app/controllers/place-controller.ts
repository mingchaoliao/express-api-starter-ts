import {BaseHttpController, controller, httpGet, httpPost, requestBody, requestParam} from "inversify-express-utils";
import {Logger} from "../../infrastructure/util/logger";
import {inject} from "inversify";
import {PlaceRepositoryInterface} from "../../domain/repositories/place-repository-interface";

@controller("/place")
class PlaceController extends BaseHttpController {
    constructor(
        @inject("place-repository") private placeRepository: PlaceRepositoryInterface,
        private logger: Logger
    ) {
        super();
    }

    @httpGet("/:id")
    async get(@requestParam("id") id: number) {
        const place = await this.placeRepository.get(id);
        if (!place) {
            return this.json({
                message: `place (id: ${id}) not found.`
            }, 404);
        }

        return this.json(place.toJson());
    }

    @httpPost("/")
    async create(@requestBody() body: any) {
        if (!("name" in body)) {
            return this.json({
                message: "missing required field: name."
            }, 400);
        }

        const place = await this.placeRepository.create(body.name);
        return this.json(place.toJson());
    }
}