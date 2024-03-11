import Erros from "@/erros/erros"
import { InteiroPositivo } from "@valueObjects/inteiro-positivo"

describe('InteiroPositivo', () => {
    test.each([undefined, -1, 0])('Deve lançar erro caso o valor informado seja menor ou igual a 0', (valor) => {
        expect(() => new InteiroPositivo(valor)).toThrow(Erros.VALOR_INVALIDO)
    })
})