import { Lancamento, LancamentoRepository } from "core";
import prismaClient from "./prismaclient";

export class PrismaLancamentoRepository implements LancamentoRepository {
    async save(lancamento: Lancamento): Promise<Lancamento> {
        const lancamentoSalvo = await prismaClient.lancamento.create({
            data: {
                codigo: lancamento.codigo.codigo,
                id: lancamento.id.value,
                quantidade: lancamento.quantidade.valor,
                tipo: lancamento.tipo,
                valor: lancamento.valor.valor,
                data: lancamento.data,
                usuarioId: lancamento.usuarioId.value
            }
        })

        return new Lancamento({
            codigo: lancamentoSalvo.codigo,
            data: lancamentoSalvo.data,
            id: lancamentoSalvo.id,
            quantidade: parseInt(lancamentoSalvo.quantidade.toString()),
            tipo: lancamentoSalvo.tipo,
            usuarioId: lancamentoSalvo.usuarioId,
            valor: parseInt(lancamentoSalvo.valor.toString())
        })
    }

}