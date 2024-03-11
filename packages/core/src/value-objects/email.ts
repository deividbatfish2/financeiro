import { Erros, ValidationError } from '../erros'

export class Email {
    readonly value: string
    private regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

    constructor(value?: string) { 
        if(!value || value.trim().length === 0) throw new ValidationError(Erros.EMAIL_INVALIDO)
        if(!this.regex.test(value.trim())) throw new ValidationError(Erros.EMAIL_INVALIDO)

        this.value = value.trim()
    }

    get localParte(): string {
        return this.value.split('@')[0]
    }
    
    get dominio(): string {
        return this.value.split('@')[1]
    }
}