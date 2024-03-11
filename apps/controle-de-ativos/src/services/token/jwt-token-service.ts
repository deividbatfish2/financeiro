import { TokenService, UserAuthId } from 'core'
import * as jwt from 'jsonwebtoken'

export class JsonWebTokenAdapter implements TokenService {
    constructor(
        private readonly secret: string,
        private readonly expires: string
    ) { }
    
    async verify(token: string): Promise<UserAuthId> {
        const result = <jwt.JwtPayload> await jwt.verify(token, this.secret)
        return {
            userAuthId: result.userId
        }
    }

    async sign(userId: string): Promise<string> {
        return await jwt.sign({ userId }, this.secret, { expiresIn: this.expires })
    }

}