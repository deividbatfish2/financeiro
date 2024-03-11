import { Erros } from "@/erros"
import { Hasher, TokenService, UserAuthId, Usuario, UsuarioRepository } from "@/modules"
import { Logar } from "@/modules/usuario/use-cases/login"
import { UsuarioBuilder } from "test/builders"

describe('Logar', () => {
    test('Deve retornar erro caso o usuário informado não exista', async () => {
        const { logar, fakeUsuarioRepositry } = makeSut()

        jest.spyOn(fakeUsuarioRepositry, 'getUserByEmail')
            .mockImplementationOnce(async () => undefined)

        await expect(() => logar.executar({ email: 'any_email@zmail.com', senha: 'Minha_Senha_Forte_123@' })).rejects.toThrow(Erros.USUARIO_OU_SENHA_INVALIDO)
    })

    test('Deve retornar erro caso a senha informada esteja incorreta', async () => {
        const { logar, fakeHasher } = makeSut()

        jest.spyOn(fakeHasher, 'compare')
            .mockImplementationOnce(async () => false)

        await expect(() => logar.executar({ email: 'any_email@zmail.com', senha: 'Minha_Senha_Forte_123@' })).rejects.toThrow(Erros.USUARIO_OU_SENHA_INVALIDO)
    })

    test('Deve retornar erro caso a senha informada esteja incorreta', async () => {
        const { logar } = makeSut()

        const token = await logar.executar({ email: 'any_email@zmail.com', senha: 'Minha_Senha_Forte_123@' })

        expect(token.jwt).toBeDefined()
    })
})

const makeSut = (): SutDependencies => {
    const fakeUsuarioRepositry = new FakeUsuarioRepository()
    const fakeHasher = new FakeHasher()
    const fakeJwtService = new FakeJwtService()

    const logar = new Logar(fakeUsuarioRepositry, fakeHasher, fakeJwtService)
    return { logar, fakeUsuarioRepositry, fakeHasher, fakeJwtService }
}

type SutDependencies = {
    logar: Logar
    fakeUsuarioRepositry: UsuarioRepository
    fakeHasher: Hasher
    fakeJwtService: TokenService
}

class FakeUsuarioRepository implements UsuarioRepository {
    getUserById(id: string): Promise<Usuario | undefined> {
        throw new Error("Method not implemented.")
    }
    existsUserByEmailOrCpf(cpf: string, email: string): Promise<boolean> {
        throw new Error("Method not implemented.")
    }
    inserirUsuario(usuario: Usuario): Promise<Usuario> {
        throw new Error("Method not implemented.")
    }
    async getUserByEmail(email: string): Promise<Usuario | undefined> {
        return new UsuarioBuilder()
            .withThisEmai(email)
            .withAnyHash()
            .build()
    }

}

class FakeHasher implements Hasher {
    hash(value: string): Promise<string> {
        throw new Error("Method not implemented.")
    }
    async compare(senha: string, hash: string): Promise<boolean> {
        return true
    }
}

class FakeJwtService implements TokenService {
    verify(token: string): Promise<UserAuthId> {
        throw new Error("Method not implemented.")
    }
    async sign(userId: string): Promise<string> {
        return 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJhMTMwN2JhYy05NjhhLTRhZTMtYjg0ZS0zMzE0ZDlhYjZhNmUifQ.6TW-62qOHB8nTRanApAWdokkMiJZvlZy366iIwAkGD8'
    }

}