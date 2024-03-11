import { Temporal } from '@js-temporal/polyfill'
import Erros from "@/erros/erros"
import { Lancamento } from "@modules/lancamento"
import { Id } from "@valueObjects/id"

describe('Lancamento', () => {
    test('Deve lançar erro caso a ação seja do mercado fracionario e a quantidade seja >= 100', () => {
        expect(() => new Lancamento({
            codigo: 'ABCD3F',
            quantidade: 100,
            tipo: 'COMPRA',
            usuarioId: Id.novo().value,
            valor: 10000
        })).toThrow(Erros.LANCAMENTO_FRACIONARIO_MENOR)
    })

    test('Deve lançar erro caso a ação seja do mercado à vista e a quantidade não for multiplo de 100', () => {
        expect(() => new Lancamento({
            codigo: 'ABCD3',
            quantidade: 101,
            tipo: 'COMPRA',
            usuarioId: Id.novo().value,
            valor: 10000
        })).toThrow(Erros.LANCAMENTO_AVISTA_QUNATIDADE_INVALIDA)
    })

    test('Deve lançar erro caso a data informada seja maior que a data atual', () => {
        const tomorow = Temporal.Now.plainDateISO().add({ days: 1 })
        expect(() => new Lancamento({
            codigo: 'ABCD3',
            quantidade: 200,
            tipo: 'COMPRA',
            data: new Date(tomorow.year, tomorow.month - 1, tomorow.day),
            usuarioId: Id.novo().value,
            valor: 10000
        })).toThrow(Erros.DATA_MAIOR_ATUAL)
    })
})