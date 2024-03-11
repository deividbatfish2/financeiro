export class AuthenticationError extends Error {
    constructor() {
        super()
        this.name = 'AuthenticationError'
        this.message = 'AUTHENTICATION_FAILED'
    }
}