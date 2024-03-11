import { Erros, ValidationError } from '../erros'

export class ValorEmCentavos {
    readonly valor: number

    constructor(valor?: number) {
        if (!valor || valor <= 0) throw new ValidationError(Erros.VALOR_EM_CENTAVOS_INVALIDO)
        this.valor = valor
    }

    get emReais() {
        return this.valor / 100
    }
}