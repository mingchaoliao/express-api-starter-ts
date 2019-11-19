import {BaseHttpController, controller, httpGet} from "inversify-express-utils";
import axios, {AxiosResponse} from "axios";

@controller("/")
class WelcomeController extends BaseHttpController {
    @httpGet("/")
    async welcome() {
        const res: AxiosResponse = await axios.get("https://api.ipify.org?format=json");
        return this.json({
            message: "welcome",
            ip: res.data.ip
        });
    }
}