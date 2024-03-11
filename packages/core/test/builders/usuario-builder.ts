import { Usuario, UsuarioProps } from "@modules/usuario";

export class UsuarioBuilder {
    readonly usuarioProps: UsuarioProps
    constructor() {
        this.usuarioProps = { nome: 'Any Name', email: 'any_email@zmail.com', cpf: '338.236.278-30' }
    }

    withThisEmai(email: string): UsuarioBuilder {
        this.usuarioProps.email = email
        return this
    }

    withAnyHash(): UsuarioBuilder {
        this.usuarioProps.senhaHash = ' $2a$12$gyjMRb9QNKCY4KLJIoJhcutuXrmIW2vlyi10JooItanUWxKIN.xIm'
        return this
    }

    build(): Usuario {
        return new Usuario(this.usuarioProps)
    }
}