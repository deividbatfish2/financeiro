import Erros from "@/erros/erros"
import { Cnpj } from "@valueObjects/cnpj"

describe('Cnpj', () => {
    describe('isValid', () => {
        test('deve retornar false caso o cnpj informado não seja valido', () => {
            const cnpjMenorComMascara = "28.653.909/001-68"
            const cnpjMenor = "2865390900168"
            const cnpjMaiorComMascara = "28.653.909/00001-68"
            const cnpjMaior = "286539090000168"
            const cnpjInvalidoComMascara = "42.719.361/0001-33"
            const cnpjInvalido = "25937676000138"

            expect(Cnpj.isValid(cnpjMenorComMascara)).toBeFalsy()
            expect(Cnpj.isValid(cnpjMenor)).toBeFalsy()
            expect(Cnpj.isValid(cnpjMaiorComMascara)).toBeFalsy()
            expect(Cnpj.isValid(cnpjMaior)).toBeFalsy()
            expect(Cnpj.isValid(cnpjInvalidoComMascara)).toBeFalsy()
            expect(Cnpj.isValid(cnpjInvalido)).toBeFalsy()
        })

        test.each([
            "42.719.361/0001-32",
            "58577114000189",
            "01.590.184/0001-50",
            "88081724000158",
            "15.641.519/0001-26",
            "16117106000100",
            "15.632.070/0001-30",
            "34504453000177",
            "97.933.568/0001-05"
        ])('Deve retornar true para cnpjs validos', (cnpj: string) => {
            expect(Cnpj.isValid(cnpj)).toBeTruthy()
        })
    })

    describe('Constructor', () => {
        test('Deve lançar erro caso o cnpj informado seja inválido', () => {
            const cnpjMenorComMascara = "28.653.909/001-68"
            const cnpjMenor = "2865390900168"
            const cnpjMaiorComMascara = "28.653.909/00001-68"
            const cnpjMaior = "286539090000168"
            const cnpjInvalidoComMascara = "42.719.361/0001-33"
            const cnpjInvalido = "25937676000138"

            expect(() => new Cnpj(cnpjMenorComMascara)).toThrow(Erros.CNPJ_INVALIDO)
            expect(() => new Cnpj(cnpjMenor)).toThrow(Erros.CNPJ_INVALIDO)
            expect(() => new Cnpj(cnpjMaiorComMascara)).toThrow(Erros.CNPJ_INVALIDO)
            expect(() => new Cnpj(cnpjMaior)).toThrow(Erros.CNPJ_INVALIDO)
            expect(() => new Cnpj(cnpjInvalidoComMascara)).toThrow(Erros.CNPJ_INVALIDO)
            expect(() => new Cnpj(cnpjInvalido)).toThrow(Erros.CNPJ_INVALIDO)
            expect(() => new Cnpj()).toThrow(Erros.CNPJ_INVALIDO)
        })

        test('Deve criar um cnpj', () => {
            const cnpjComMascara = "42.719.361/0001-32"
            const cnpj = "58577114000189"

            expect(new Cnpj(cnpjComMascara).value).toBeDefined()
            expect(new Cnpj(cnpj).value).toBeDefined()
        })
    })

    describe('formatado', () => {
        test('Deve criar um cnpj', () => {
            const cnpjComMascara = new Cnpj("42.719.361/0001-32")
            const cnpj = new Cnpj("58577114000189")

            expect(cnpjComMascara.formatado).toBe("42.719.361/0001-32")
            expect(cnpj.formatado).toBe("58.577.114/0001-89")
        })
    })

    describe('isFilial', () => {
        test('Deve criar um cnpj', () => {
            const cnpjComMascara = new Cnpj("42.719.361/0001-32")
            const cnpj = new Cnpj("58577114000189")
            const filial = new Cnpj("58577114000260")

            expect(cnpjComMascara.isFilial).toBeFalsy()
            expect(cnpj.isFilial).toBeFalsy()
            expect(filial.isFilial).toBeTruthy()
        })
    })
})