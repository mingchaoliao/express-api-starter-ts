import {BaseHttpController, controller, httpGet} from "inversify-express-utils";
import {AxiosResponse, AxiosStatic} from "axios";
import {inject} from "inversify";
import {Environment} from "../environment";

@controller("/")
class WelcomeController extends BaseHttpController {
    constructor(@inject("axios") private axios: AxiosStatic, private env: Environment) {
        super();
        this.axios = axios;
    }

    @httpGet("/")
    async welcome() {
        const res: AxiosResponse = await this.axios.get("https://api.ipify.org?format=json");
        return this.json({
            message: "Hello World!",
            ip: res.data.ip,
            environment: this.env.get("APP_ENV")
        });
    }
}