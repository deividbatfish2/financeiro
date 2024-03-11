import UseCase from '../../use-case'
import { SenhaForte } from '../../../value-objects';
import { Usuario, UsuarioProps } from '../entities';
import { UsuarioRepository } from '../repositories';
import { Hasher } from '../services/hasher';
import { Erros, ValidationError } from '../../../erros';

export type Input = Partial<UsuarioProps> & {
    senha: string
}

export class RegistrarUsuario implements UseCase<Input, Promise<UsuarioProps>> {
    constructor(
        private readonly hasher: Hasher,
        private readonly usuarioRepository: UsuarioRepository
    ) { }

    async executar(entrada: Input): Promise<UsuarioProps> {
        const senha = new SenhaForte(entrada.senha)
        const senhaHash = await this.hasher.hash(senha.value)
        const usuario = new Usuario({ cpf: entrada.cpf, email: entrada.email, nome: entrada.nome, senhaHash: senhaHash })

        const usuarioExistente = await this.usuarioRepository.existsUserByEmailOrCpf(usuario.cpf.value, usuario.email.value)

        if(usuarioExistente) throw new ValidationError(Erros.USUARIO_JA_CADASTRADO)
        else await this.usuarioRepository.inserirUsuario(usuario)

        return { ...usuario.props, senhaHash: undefined }
    }
}