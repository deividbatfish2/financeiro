import { Erros, ValidationError } from '../erros'

export class NomeCompleto {
    readonly value: string
    private palavrasDeLigacao = ['de', 'da']


    constructor(nome?: string) {
        if (!nome || nome.trim().length === 0) throw new ValidationError(Erros.NOME_NAO_INFORMADO)

        if (nome.trim().split(' ').length < 2) throw new ValidationError(Erros.NOME_INCOMPLETO_SOBRENOME_NECESSARIO)
        if (nome.trim().split(' ').join('').length < 6 || nome.trim().split(' ').join('').length > 255) throw new ValidationError(Erros.NOME_INCOMPLETO_SOBRENOME_NECESSARIO)

        this.value = NomeCompleto.captalizeName(nome.normalize())
    }

    get iniciais(): string {
        return this.value
            .split(' ')
            .map((nome: string) => this.palavrasDeLigacao.includes(nome.toLowerCase()) ? '' : nome.charAt(0))
            .join('')
    }

    private static captalizeName(nome: string): string {
        return nome.split(' ')
            .map(nome => nome.charAt(0).toUpperCase() + nome.slice(1))
            .join(' ')
    }
}