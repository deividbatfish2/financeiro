import { Erros, ValidationError } from '../erros'

type regexCodigoAcao = {
    empresa?: string
    tipoPapel?: string
    tipoMercado?: string
}

export class CodigoAcao {
    readonly codigo: string
    readonly tipoMercado: TipoMercado
    private readonly regex: RegExp = /(?<empresa>\D+)(?<tipoPapel>[1-9][0-9]?)(?<tipoMercado>\w?)/gm
    private readonly tipoAcaoByTipoPapel: Map<string, TipoAcao> = new Map([
        ['1', TipoAcao.DIREITO_SUBSCRICAO_ACAO_ORDINARIA],
        ['2', TipoAcao.DIREITO_SUBSCRICAO_ACAO_PREFERENCIAL],
        ['3', TipoAcao.ORDINARIA],
        ['4', TipoAcao.PREFERENCIAL],
        ['5', TipoAcao.PREFERENCIAL_A],
        ['6', TipoAcao.PREFERENCIAL_B],
        ['7', TipoAcao.PREFERENCIAL_C],
        ['8', TipoAcao.PREFERENCIAL_D],
        ['9', TipoAcao.RECIBO_SUBSCRICAO_ACAO_ORDINARIA],
        ['10', TipoAcao.RECIBO_SUBSCRICAO_ACAO_PREFERENCIAL],
        ['11', TipoAcao.UNIT],
    ])

    constructor(codigo?: string) {
        if (!codigo) throw new ValidationError(Erros.CODIGO_ACAO_INVALIDO)
        if (codigo.length <= 4 || codigo.length >= 8) throw new ValidationError(Erros.CODIGO_ACAO_INVALIDO)

        const { empresa, tipoPapel, tipoMercado } = <regexCodigoAcao>this.regex.exec(codigo)?.groups ?? {}

        if (!empresa || empresa.length !== 4) throw new ValidationError(Erros.CODIGO_ACAO_INVALIDO)
        if (!tipoPapel || parseInt(tipoPapel) < 1 || parseInt(tipoPapel) > 11) throw new ValidationError(Erros.CODIGO_ACAO_INVALIDO)
        if (tipoMercado && tipoMercado.toUpperCase() !== 'F') throw new ValidationError(Erros.CODIGO_ACAO_INVALIDO)

        this.tipoMercado = tipoMercado && tipoMercado.toUpperCase() === 'F' ? 'FRACIONARIO' : 'AVISTA'
        this.codigo = tipoMercado ? codigo.toUpperCase().substring(0, codigo.length - 1) : codigo.toUpperCase()
    }

    get tipoPapel(): TipoAcao {
        this.regex.exec(this.codigo)
        const { tipoPapel } = this.codigoAcaoDecomposto()
        return <TipoAcao>this.tipoAcaoByTipoPapel.get(tipoPapel!)
    }

    private codigoAcaoDecomposto(): regexCodigoAcao {
        return <regexCodigoAcao>this.regex.exec(this.codigo)!.groups
    }
}

export enum TipoAcao {
    DIREITO_SUBSCRICAO_ACAO_ORDINARIA = 1,
    DIREITO_SUBSCRICAO_ACAO_PREFERENCIAL = 2,
    ORDINARIA = 3,
    PREFERENCIAL = 4,
    PREFERENCIAL_A = 5,
    PREFERENCIAL_B = 6,
    PREFERENCIAL_C = 7,
    PREFERENCIAL_D = 8,
    RECIBO_SUBSCRICAO_ACAO_ORDINARIA = 9,
    RECIBO_SUBSCRICAO_ACAO_PREFERENCIAL = 10,
    UNIT = 11
}

export type TipoMercado = 'AVISTA' | 'FRACIONARIO'