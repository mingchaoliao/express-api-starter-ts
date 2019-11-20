import {BaseHttpController, controller, httpGet} from "inversify-express-utils";
import {AxiosResponse} from "axios";
import {Environment} from "../environment";
import {HttpClient} from "../../infrastructure/util/http-client";

@controller("/")
class WelcomeController extends BaseHttpController {
    constructor(private http: HttpClient, private env: Environment) {
        super();
        this.http = http;
    }

    @httpGet("/")
    async welcome() {
        const res: AxiosResponse = await this.http.get("https://api.ipify.org?format=json");
        return this.json({
            message: "Hello World!",
            ip: res.data.ip,
            environment: this.env.get("APP_ENV")
        });
    }
}