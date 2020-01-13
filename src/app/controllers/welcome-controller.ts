import {BaseHttpController, controller, httpGet} from "inversify-express-utils";
import {AxiosResponse} from "axios";
import {Environment} from "../environment";
import {HttpClient} from "../../infrastructure/util/http-client";
import {Logger} from "../../infrastructure/util/logger";

@controller("/")
class WelcomeController extends BaseHttpController {
    constructor(private http: HttpClient, private env: Environment, private logger: Logger) {
        super();
    }

    @httpGet("/")
    async welcome() {
        const res: AxiosResponse = await this.http.get("https://api.ipify.org?format=json");
        this.logger.resolve().info("get ip from ipify.org", res.data);
        return this.json({
            message: "Hello World!",
            serverIP: res.data.ip,
            environment: this.env.get("APP_ENV")
        });
    }
}