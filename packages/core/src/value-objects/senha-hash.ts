import { Erros, ValidationError } from '../erros'

export class SenhaHash {
    private regex = /^\$2[a|b|x|y]\$[0-9]{2}\$[a-zA-Z0-9\.\/]{53}$/
    readonly value: string

    constructor(value?: string) {
        if(!value || !this.regex.test(value.trim())) throw new ValidationError(Erros.HASH_INVALIDO)

        this.value = value
    }
}