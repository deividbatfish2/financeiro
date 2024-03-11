import { stringToTipoLancamento } from "@modules/lancamento"

describe('TipoLancamento', () => {
    test.each([
        'VENDA',
        '         venda',
        ' venda   ',
        'venda     ',
        'Venda',
        'VenDa'
    ])('Deve retornar um atipo de lançamento válido', (tipo: string) => {
        expect(stringToTipoLancamento(tipo)).toBe("VENDA")
    })

    test.each([
        undefined,
        '',
        'AnyValue'
    ])('Deve lançar exceção caso o tipo não seja encontrado', (tipo) => {
        expect(() => stringToTipoLancamento(tipo)).toThrow(Error)
    })
})