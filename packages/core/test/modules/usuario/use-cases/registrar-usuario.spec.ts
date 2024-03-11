import { Erros } from "@/erros"
import { Hasher, RegistrarUsuario, Usuario, UsuarioRepository } from "@/modules"
import { UsuarioBuilder } from "test/builders"

describe('RegistrarUsuario', () => {
    test('Deve lançar erro caso o cpf informado já esteja cadastrado', async () => {
        const { registrarUsuario, usuarioRepository } = makeSut()

        const usuario = new UsuarioBuilder().build()

        jest.spyOn(usuarioRepository, 'existsUserByEmailOrCpf')
            .mockImplementationOnce(async () => true)

        await expect(() => registrarUsuario.executar({ ...usuario.props, senha: 'MtW:Tr7RFk[o' })).rejects.toThrow(Erros.USUARIO_JA_CADASTRADO)
    })
    
    test('Deve lançar erro caso o email informado já esteja cadastrado', async () => {
        const { registrarUsuario, usuarioRepository } = makeSut()

        const usuario = new UsuarioBuilder().build()

        jest.spyOn(usuarioRepository, 'existsUserByEmailOrCpf')
            .mockImplementationOnce(async () => true)

        await expect(() => registrarUsuario.executar({ ...usuario.props, senha: 'MtW:Tr7RFk[o' })).rejects.toThrow(Erros.USUARIO_JA_CADASTRADO)
    })
    
    test('Deve registrar o usuario', async () => {
        const { registrarUsuario } = makeSut()

        const usuario = new UsuarioBuilder().build()

        const result = await registrarUsuario.executar({ ...usuario.props, senha: 'MtW:Tr7RFk[o' })

        expect(result.id).toBeDefined()
        expect(result.senhaHash).toBeUndefined()
    })
})

type SutDependencies = {
    hasher: Hasher,
    usuarioRepository: UsuarioRepository
    registrarUsuario: RegistrarUsuario
}

const makeSut = (): SutDependencies => {
    const hasher = new FakeHasher()
    const usuarioRepository = new FakeUsuarioRepository()
    const registrarUsuario = new RegistrarUsuario(hasher, usuarioRepository)
    return { registrarUsuario, hasher, usuarioRepository }
}

class FakeHasher implements Hasher {
    compare(senha: string, hash: string): Promise<boolean> {
        throw new Error("Method not implemented.")
    }
    async hash(value: string): Promise<string> {
        return '$2a$12$iqsJxvH8u0KH/Jd1Gquvbuewqgf69p5VrWTHMf0B1ZVIc0CiXWzWe'
    }
}

class FakeUsuarioRepository implements UsuarioRepository {
    getUserByEmail(email: string): Promise<Usuario | undefined> {
        throw new Error("Method not implemented.")
    }
    async inserirUsuario(usuario: Usuario): Promise<Usuario> {
        return usuario
    }
    
    async existsUserByEmailOrCpf(cpf: string, email: string): Promise<boolean> {
        return false
    }
    
    getUserById(id: string): Promise<Usuario | undefined> {
        throw new Error("Method not implemented.")
    }

}