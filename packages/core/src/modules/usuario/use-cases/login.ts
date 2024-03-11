import UseCase from "../../../modules/use-case";
import { Email, SenhaForte } from "../../../value-objects";
import { UsuarioRepository } from "../repositories";
import { Hasher, TokenService } from "../services";
import { Erros, ValidationError } from "../../../erros";

export type Input = {
    email?: string
    senha?: string
}

export type Output = {
    jwt: string
}

export class Logar implements UseCase<Input, Promise<Output>> {
    constructor(
        private readonly usuarioRepository: UsuarioRepository,
        private readonly hasher: Hasher,
        private readonly tokenService: TokenService
    ) { }
    
    async executar(entrada: Input): Promise<Output> {
        const email = new Email(entrada.email)
        const senha = new SenhaForte(entrada.senha)

        const usuario = await this.usuarioRepository.getUserByEmail(email.value)

        if (!usuario) throw new ValidationError(Erros.USUARIO_OU_SENHA_INVALIDO)

        const senhaCorreta = await this.hasher.compare(senha.value, usuario.senhaHash!.value)

        if (!senhaCorreta) throw new ValidationError(Erros.USUARIO_OU_SENHA_INVALIDO)

        const jwt = await this.tokenService.sign(usuario.id.value)

        return { jwt }
    }
}