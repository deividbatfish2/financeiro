import { Erros, ValidationError } from '../erros'

export class Cnpj {
    readonly value: string

    constructor(value?: string) {
        const cnpjValue = value?.trim().replace(/\D/g, '') ?? ''

        if (!Cnpj.isValid(cnpjValue))
            throw new ValidationError(Erros.CNPJ_INVALIDO)

        this.value = cnpjValue
    }

    get formatado(): string {
        return this.value.replace(/([0-9]{2})([0-9]{3})([0-9]{3})([0-9]{4})([0-9]{2})/, '$1.$2.$3/$4-$5')
    }

    get isFilial(): boolean {
        return this.value.substring(8, 12) !== '0001'
    }

    static isValid(value: string): boolean {
        const cnpjNumber = value.replace(/\D/g, '')

        if (cnpjNumber.length !== 14) return false

        const firstDigit = Cnpj.calcFirstDigit(cnpjNumber)
        const secondDigit = Cnpj.calcSecondDigit(cnpjNumber, firstDigit)

        return cnpjNumber.substring(12) === `${firstDigit}${secondDigit}`
    }

    private static calcFirstDigit(value: string): number {
        const fatores: number[] = [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2]
        const total = value.split('')
            .slice(0, 12)
            .map((n: string) => parseInt(n))
            .reduce((acc: number, digito: number, index: number) => acc += (digito * fatores[index]), 0)

        const resto = total % 11

        return resto === 0 || resto === 1 ? 0 : 11 - resto
    }

    private static calcSecondDigit(value: string, firstDigit: number): number {
        const fatores: number[] = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2]
        const total = value.split('')
            .slice(0, 12)
            .map((n: string) => parseInt(n))
            .concat([firstDigit])
            .reduce((acc: number, digito: number, index: number) => {
                if(index === 12) return acc += (firstDigit * fatores[index])
                return acc += (digito * fatores[index])
            }, 0)

        const resto = total % 11

        return resto === 0 || resto === 1 ? 0 : 11 - resto
    }
}