import { Erros, ValidationError } from '../erros'

export class InteiroPositivo {
    readonly valor: number

    constructor(valor?: number) {
        if(!valor || valor <= 0) throw new ValidationError(Erros.VALOR_INVALIDO)
        this.valor = valor
    }
}