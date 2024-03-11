import Erros from "@/erros/erros"
import { CodigoAcao, TipoAcao } from '@valueObjects/codigo-acao'

describe('CodigoAcao', () => {
    test.each([
        "",
        undefined,
        "ABC4",
        "ABCD123",
        "ABCDE4",
        "ABCD12",
        "ABCD0",
        "ABCD3G",
    ])('Deve lançar erro caso o codigo seja invalido: %s', (codigo) => {
        expect(() => new CodigoAcao(codigo)).toThrow(Erros.CODIGO_ACAO_INVALIDO)
    })

    test.each([
        "ABCD4",
        "AbCd11"
    ])('Deve retornar o codigo da acao sempre em uppercase: %s', (codigo: string) => {
        expect(new CodigoAcao(codigo).codigo).toBe(codigo.toUpperCase())
    })

    test.each([
        "ABCF7f",
        "ABCF7F",
    ])('Deve remover a flag "F" para ações fracionarias', (codigo: string) => {
        const codigoAcao = new CodigoAcao(codigo)
        expect(codigoAcao.codigo).toBe(codigo.substring(0, codigo.length - 1))
        expect(codigoAcao.tipoMercado).toBe('FRACIONARIO')
    })

    test.each([
        { codigo: 'ABCD1', tipoPapel: TipoAcao.DIREITO_SUBSCRICAO_ACAO_ORDINARIA },
        { codigo: 'ABCD2', tipoPapel: TipoAcao.DIREITO_SUBSCRICAO_ACAO_PREFERENCIAL },
        { codigo: 'ABCD3', tipoPapel: TipoAcao.ORDINARIA },
        { codigo: 'ABCD4', tipoPapel: TipoAcao.PREFERENCIAL },
        { codigo: 'ABCD5', tipoPapel: TipoAcao.PREFERENCIAL_A },
        { codigo: 'ABCD6', tipoPapel: TipoAcao.PREFERENCIAL_B },
        { codigo: 'ABCD7', tipoPapel: TipoAcao.PREFERENCIAL_C },
        { codigo: 'ABCD8', tipoPapel: TipoAcao.PREFERENCIAL_D },
        { codigo: 'ABCD9', tipoPapel: TipoAcao.RECIBO_SUBSCRICAO_ACAO_ORDINARIA },
        { codigo: 'ABCD10', tipoPapel: TipoAcao.RECIBO_SUBSCRICAO_ACAO_PREFERENCIAL },
        { codigo: 'ABCD11', tipoPapel: TipoAcao.UNIT },
    ])('Deve retornar o tipo do papel: ', (codigoAcao) => {
        const acao = new CodigoAcao(codigoAcao.codigo)
        expect(acao.tipoPapel).toBe(codigoAcao.tipoPapel)
    })

    test.each([
        { codigo: "ABCD4F", tipoMercado: 'FRACIONARIO' },
        { codigo: "ABCD4", tipoMercado: 'AVISTA' }
    ])('Deve retornar o tipo de merado', (acao) => {
        const codigoAcao = new CodigoAcao(acao.codigo)
        expect(codigoAcao.tipoMercado).toBe(acao.tipoMercado)
    })
})