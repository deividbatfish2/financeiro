import { Entidade, EntidadeProps } from '../../entidade';
import { Cpf, Email, NomeCompleto, SenhaHash } from '../../../value-objects';

export type UsuarioProps = EntidadeProps & {
    nome?: string,
    cpf?: string,
    email?: string
    senhaHash?: string
}

export class Usuario extends Entidade<UsuarioProps> {
    readonly nome: NomeCompleto
    readonly email: Email
    readonly cpf: Cpf
    readonly senhaHash?: SenhaHash

    constructor(props: UsuarioProps) {
        super(props)
        this.nome = new NomeCompleto(props.nome)
        this.email = new Email(props.email)
        this.cpf = new Cpf(props.cpf)

        if(props.senhaHash) this.senhaHash = new SenhaHash(props.senhaHash)
    }
}