import { Erros, ValidationError } from "../../../erros"

export type TipoLancamento = 'COMPRA' | 'VENDA'

export const stringToTipoLancamento = (tipo?: string): TipoLancamento => {
    const tipoEnviado = tipo?.trim().toUpperCase() ?? ''

    if (tipoEnviado === "COMPRA" || tipoEnviado === "VENDA") {
        return tipoEnviado as TipoLancamento;
    } else {
        throw new ValidationError(Erros.TIPO_LANCAMENTO_INVALIDO);
    }
}