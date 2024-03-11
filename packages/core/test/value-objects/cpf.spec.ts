import { Cpf, Erros } from "@/index"

describe('Cpf', () => {
    test.each(['', '    ', undefined])
    ('Deve lançar erro caso o valor do cpf não seja informado', (value) => {
        expect(()=> new Cpf(value)).toThrow(Erros.CPF_INVALIDO)
    })
    
    test.each([
        '31007472838',
        '1859329713',
        '336118763052',
        '103.802.833-78'
    ])
    ('Deve lançar erro caso o cpf informado seja inválido: %s', (value) => {
        expect(()=> new Cpf(value)).toThrow(Erros.CPF_INVALIDO)
    })

    test('Deve retornar o cpf com mascara', () => {
        const cpf1 = new Cpf('59506112509')
        const cpf2 = new Cpf('338.236.278-30')

        expect(cpf1.formatado).toBe('595.061.125-09')
        expect(cpf2.formatado).toBe('338.236.278-30')
    })

    test.each([
        '31007472838',
        '1859329713',
        '336118763052',
        '103.802.833-78'
    ])
    ('Deve retornar false caso o cpf informado seja inválido: %s', (value) => {
        expect(Cpf.isValid(value)).toBeFalsy()
    })
})