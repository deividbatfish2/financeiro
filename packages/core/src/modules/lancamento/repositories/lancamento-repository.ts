import { Lancamento } from '../entities'

export interface LancamentoRepository {
    save(lancamento: Lancamento): Promise<Lancamento>
}