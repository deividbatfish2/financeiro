import { faker } from '@faker-js/faker/locale/pt_BR'
import { generate } from 'gerador-validador-cpf'
import { randomUUID } from 'node:crypto'

export type UsuarioModel = {
    id: string
    cpf: string
    email: string
    nome: string
    hash: string
    senha: string
}

export class UsuarioModelBuilder {
    readonly usuario: UsuarioModel
    constructor() {
        this.usuario = {
            cpf: generate(),
            nome: faker.person.fullName(),
            email: faker.internet.email(),
            hash: '$2a$10$Z/Hiysqfs2VxnkX8.AehM.CMBfVl3NejEH3QakIjt1M4Jop/UKZ2.',
            senha: 'Minha_Senha_Muito_Forte@123',
            id: randomUUID()
        }
    }

    build(): UsuarioModel {
        return this.usuario
    }
}