import Config from "@/config/configurations"
import { JsonWebTokenAdapter } from "./jwt-token-service"

export const makeJsonWebToken = () => {
    return new JsonWebTokenAdapter(Config.Token.secret, Config.Token.expires)
}