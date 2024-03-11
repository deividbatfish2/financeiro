import { Lancamento, LancamentoProps } from '@modules/lancamento';
import { Id } from '@valueObjects/id'

export class LancamentoBuilder {
    private lancamentoProps: LancamentoProps
    constructor() {
        this.lancamentoProps = {
            codigo: 'ABCD4',
            data: new Date(),
            quantidade: 300,
            tipo: 'COMPRA',
            usuarioId: Id.novo().value,
            valor: 10000
        }
    }

    deAcaoDoMercadoFracionario(): LancamentoBuilder {
        this.lancamentoProps = { ...this.lancamentoProps, codigo: 'ABCD4F' }
        return this
    }

    comASeguinteQunatidade(qtd: number): LancamentoBuilder {
        this.lancamentoProps = { ...this.lancamentoProps, quantidade: qtd }
        return this
    }

    build(): Lancamento {
        return new Lancamento(this.lancamentoProps)
    }
}