import Erros from "@/erros/erros"
import { ValorEmCentavos } from "@valueObjects/valor-em-centavos"

describe('ValorEmCentavos', () => {
    test.each([undefined, -1, 0])('Deve lançar erro caso o valor passado seja menor ou igual zero', (valor) => {
        expect(() => new ValorEmCentavos(valor)).toThrow(Erros.VALOR_EM_CENTAVOS_INVALIDO)
    })

    test.each([
        { valorInformado: 1, valorExperado: 0.01 },
        { valorInformado: 10, valorExperado: 0.1 },
        { valorInformado: 100, valorExperado: 1 },
        { valorInformado: 1000, valorExperado: 10 },
        { valorInformado: 99, valorExperado: 0.99 },
    ])('Deve retornar o valor convertido em reais', (cenario) => {
        const valorEmCentavos = new ValorEmCentavos(cenario.valorInformado)
        expect(valorEmCentavos.emReais).toBe(cenario.valorExperado)
    })
})