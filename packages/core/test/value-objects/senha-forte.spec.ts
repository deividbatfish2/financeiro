import { Erros } from '@/erros'
import { SenhaForte } from '@valueObjects/senha-forte'

describe('SenhaForte', () => {
    test.each([undefined, '', '        '])
    ('Deve lancar erro caso um valor não seja informado', (valor) => {
        expect(() => new SenhaForte(valor)).toThrow(Erros.SENHA_FRACA)
    })
    
    test('Deve lançar erro caso a senha possua menos que 12 caracteres', () => {
        expect(() => new SenhaForte('@as12658gb#')).toThrow(/^SENHA_FRACA.+TAMANHO_MINIMO_12/)
    })
    
    test('Deve lançar erro caso a senha não possua caracteres especiais', () => {
        expect(() => new SenhaForte('12as12658gbb')).toThrow(/^SENHA_FRACA.+DEVE_CONTER_CARACTERES_ESPECIAIS/)
    })
    
    test('Deve lançar erro caso a senha não possua numeros', () => {
        expect(() => new SenhaForte('aME.A;:xW*uC')).toThrow(/^SENHA_FRACA.+DEVE_CONTER_NUMEROS/)
    })
    
    test('Deve lançar erro caso a senha não possua letras maiusculas e minusculas', () => {
        expect(() => new SenhaForte('|6};}^%,#1})')).toThrow(/^SENHA_FRACA.+DEVE_CONTER_LETRAS_MAIUSCULAS_E_MINUSCULAS/)
    })
    
    test('Deve lançar erro caso a senha possua espaços', () => {
        expect(() => new SenhaForte('9;L!s, PyEY|')).toThrow(/^SENHA_FRACA.+NAO_DEVE_CONTER_ESPACOS/)
    })

    test('Deve cadastrar a senha corretamente', () => {
        const senha = new SenhaForte('Minha_Senha_Forte_1@')

        expect(senha.value).toBe('Minha_Senha_Forte_1@')
    })

})