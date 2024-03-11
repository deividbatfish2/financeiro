import { Temporal } from '@js-temporal/polyfill'
import { Entidade, EntidadeProps } from "../../entidade";
import { TipoLancamento, stringToTipoLancamento } from "./tipo-lancamento";
import { CodigoAcao, Id, ValorEmCentavos, InteiroPositivo } from '../../../value-objects';
import { Erros, ValidationError } from "../../../erros";

export type LancamentoProps = EntidadeProps & {
    codigo?: string
    data?: Date
    valor?: number
    quantidade?: number
    tipo?: string
    usuarioId?: string
}

export class Lancamento extends Entidade<LancamentoProps> {
    readonly codigo: CodigoAcao
    readonly data: Date
    readonly valor: ValorEmCentavos
    readonly quantidade: InteiroPositivo
    readonly tipo: TipoLancamento
    readonly usuarioId: Id

    constructor(lancamentoProps: LancamentoProps) {
        super(lancamentoProps)
        const today = Temporal.Now.plainDateISO()
        this.tipo = stringToTipoLancamento(lancamentoProps.tipo)
        this.data = this.props.data ?? new Date(today.year, today.month - 1, today.day)
        this.usuarioId = new Id(this.props.usuarioId)
        this.codigo = new CodigoAcao(this.props.codigo)
        this.quantidade = new InteiroPositivo(this.props.quantidade)
        this.valor = new ValorEmCentavos(this.props.valor)

        if (this.codigo.tipoMercado === "FRACIONARIO" && this.quantidade.valor >= 100) throw new ValidationError(Erros.LANCAMENTO_FRACIONARIO_MENOR)
        if (this.codigo.tipoMercado === "AVISTA" && this.quantidade.valor % 100 !== 0) throw new ValidationError(Erros.LANCAMENTO_AVISTA_QUNATIDADE_INVALIDA)

        const tomorow = today.add({ days: 1 })

        const dateToCompare = new Date(tomorow.year, tomorow.month - 1, tomorow.day)

        if (this.data.getTime() >= dateToCompare.getTime()) throw new ValidationError(Erros.DATA_MAIOR_ATUAL)
    }
}