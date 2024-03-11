import UseCase from '../../use-case'
import { LancamentoRepository } from '../repositories'
import { LancamentoProps, Lancamento } from '../../lancamento'
import { Erros, ValidationError } from '../../../erros'
import { UsuarioRepository } from '../../usuario'

export class RegistrarLancamento implements UseCase<LancamentoProps, Promise<LancamentoProps>> {
    constructor(
        readonly usuarioRepository: UsuarioRepository,
        readonly lancamentoRepository: LancamentoRepository
    ) { }

    async executar(entrada: LancamentoProps): Promise<LancamentoProps> {
        const lancamentoTosave = new Lancamento(entrada)
        const usuario = await this.usuarioRepository.getUserById(lancamentoTosave.usuarioId.value)
        if (!usuario) throw new ValidationError(Erros.USER_NOT_FOUND)

        const lancamentoSaved = await this.lancamentoRepository.save(lancamentoTosave)
        return lancamentoSaved.props
    }

}