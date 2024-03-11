import prismaClient from "./prismaclient";
import { Usuario, UsuarioRepository } from "core";

type User = {
    id: string;
    cpf: string;
    email: string;
    hash: string;
    nome: string;
    createdAt: Date;
    updatedAt: Date;
}

export class PrismaUsuarioRepository implements UsuarioRepository {
    async getUserByEmail(email: string): Promise<Usuario | undefined> {
        const user = await prismaClient.usuario.findFirst({
            where: { email }
        })

        if(user) return this.converteModelParaUsuario(user)
        return
    }

    async existsUserByEmailOrCpf(cpf: string, email: string): Promise<boolean> {
        const users = await prismaClient.usuario.findMany({
            where: {
                OR: [
                    { cpf },
                    { email }
                ]
            }
        })

        return users.length === 0 ? false : true
    }

    async inserirUsuario(usuario: Usuario): Promise<Usuario> {
        const user = await prismaClient.usuario.create({
            data: {
                cpf: usuario.cpf.value,
                email: usuario.email.value,
                hash: usuario.senhaHash!.value,
                id: usuario.id.value,
                nome: usuario.nome.value
            }
        })

        return new Usuario({ cpf: user.cpf, email: user.email, id: user.id, nome: user.nome, senhaHash: user.hash })
    }

    async getUserById(id: string): Promise<Usuario | undefined> {
        const user = await prismaClient.usuario.findFirst({ where: { id } })
        if (user) return this.converteModelParaUsuario(user)
        return
    }

    private converteModelParaUsuario(user: User): Usuario {
        return new Usuario({ id: user.id, cpf: user.cpf, email: user.email, nome: user.nome, senhaHash: user.hash })
    }

}