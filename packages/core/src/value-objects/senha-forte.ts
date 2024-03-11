import { Erros, ValidationError } from "../erros";

export class SenhaForte {
    private static readonly TAMANHO_MINIMO = 12

    readonly value: string
    constructor(value?: string) {
        if (!value || value.trim().length === 0) throw new ValidationError(Erros.SENHA_FRACA)
        const validacao = SenhaForte.applyRules(value)
        if (validacao) throw new ValidationError(`${Erros.SENHA_FRACA}, ${validacao}`)

        this.value = value.trim()
    }

    private static applyRules(value: string): string | void {
        return [
            SenhaForte.tamanhoMinimoRule,
            SenhaForte.caracteresEspeciaisRule,
            SenhaForte.numerosRule,
            SenhaForte.letrasMaiusculasEMinusculasRule,
            SenhaForte.espacosRule
        ]
            .map(rule => rule(value))
            .map(erro => erro?.message)
            .filter(erro => erro)
            .join(', ')
    }

    private static tamanhoMinimoRule(value: string): Error | void {
        if (value.trim().length < SenhaForte.TAMANHO_MINIMO) return new ValidationError(`TAMANHO_MINIMO_${SenhaForte.TAMANHO_MINIMO}`)
    }

    private static caracteresEspeciaisRule(value: string): Error | void {
        const regex = /[!@#$%&*()-+.,;?{[}\]\^><:]+/
        if (!regex.test(value)) return new ValidationError('DEVE_CONTER_CARACTERES_ESPECIAIS')
    }

    private static numerosRule(value: string): Error | void {
        const regex = /[0-9]+/
        if (!regex.test(value)) return new ValidationError('DEVE_CONTER_NUMEROS')
    }
    
    private static letrasMaiusculasEMinusculasRule(value: string): Error | void {
        const regex = /(?=.*[a-z])(?=.*[A-Z])/
        if (!regex.test(value)) return new ValidationError('DEVE_CONTER_LETRAS_MAIUSCULAS_E_MINUSCULAS')
    }
    
    private static espacosRule(value: string): Error | void {
        const regex = /\s/
        if (regex.test(value)) return new ValidationError('NAO_DEVE_CONTER_ESPACOS')
    }
}