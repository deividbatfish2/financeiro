import { Erros, ValidationError } from '../erros'

export class Cpf {
    readonly value: string
    constructor(value?: string) {
        if (!value || value.trim().length === 0) throw new ValidationError(Erros.CPF_INVALIDO)
        const valueWithOutMask = value.trim().replace(/\D/g, '')
        if (valueWithOutMask.length !== 11) throw new ValidationError(Erros.CPF_INVALIDO)
        if (!Cpf.isValid(valueWithOutMask)) throw new ValidationError(Erros.CPF_INVALIDO)

        this.value = valueWithOutMask
    }

    get formatado(): string {
        return this.value.replace(/([0-9]{3})([0-9]{3})([0-9]{3})([0-9]{2})/g, '$1.$2.$3-$4')
    }

    public static isValid(value: string): boolean {
        const cpfNumber = value.replace(/\D/g, '')

        if (cpfNumber.length !== 11) return false

        const firstDigit = Cpf.calcFirstDigit(cpfNumber)
        const secondDigit = Cpf.calcSecondDigit(cpfNumber, firstDigit)

        return cpfNumber.substring(9) === `${firstDigit}${secondDigit}`
    }

    private static calcFirstDigit(value: string): number {
        const fatores: number[] = [10, 9, 8, 7, 6, 5, 4, 3, 2]
        const total = value.split('')
            .slice(0, 9)
            .map((n: string) => parseInt(n))
            .reduce((acc: number, digito: number, index: number) => acc += (digito * fatores[index]), 0)

        const resto = total % 11

        const result = 11 - resto

        return result >= 10 ? 0 : result
    }

    private static calcSecondDigit(value: string, firstDigit: number): number {
        const fatores: number[] = [11, 10, 9, 8, 7, 6, 5, 4, 3, 2]
        const total = value.split('')
            .slice(0, 9)
            .map((n: string) => parseInt(n))
            .concat([firstDigit])
            .reduce((acc: number, digito: number, index: number) => {
                if (index === 9) return acc += (firstDigit * fatores[index])
                return acc += (digito * fatores[index])
            }, 0)

        const resto = total % 11

        const result = 11 - resto

        return result >= 10 ? 0 : result
    }
}