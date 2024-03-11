import Config from "@/config/configurations";
import { BcryptHasher } from "./bcrypt-hasher";

export const makeBcryptHasher = (): BcryptHasher => {
    return new BcryptHasher(Config.Criptografia.Salt)
}