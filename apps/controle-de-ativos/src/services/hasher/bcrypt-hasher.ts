import * as bcrypt from 'bcrypt'
import { Hasher } from 'core'

export class BcryptHasher implements Hasher {
    constructor(private readonly salt: number) { }
    async compare(senha: string, hash: string): Promise<boolean> {
        return await bcrypt.compare(senha, hash)
    }

    async hash(value: string): Promise<string> {
        return await bcrypt.hash(value, this.salt)
    }

}