export class ValidationError extends Error {
    constructor(msg: string) {
        super()
        this.message = msg
        this.name = 'ValidationError'
    }
}