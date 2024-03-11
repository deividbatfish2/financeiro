import Erros from "@/erros/erros"
import { RegistrarLancamento, LancamentoRepository, Lancamento } from "@modules/lancamento"
import { UsuarioRepository, Usuario } from '@modules/usuario'
import { LancamentoBuilder, UsuarioBuilder } from "test/builders"

describe('RegistrarLancamento', () => {
    test('Deve lnaçar erro caso o usuário informado não exista', async () => {
        const lancamento = new LancamentoBuilder().build()
        const { registrarLancamento, usuarioRepository } = makeSut()
        jest.spyOn(usuarioRepository, 'getUserById')
            .mockImplementationOnce(async () => undefined)

        await expect(() => registrarLancamento.executar(lancamento.props)).rejects.toThrow(Erros.USER_NOT_FOUND)
    })

    test('Deve salvar e retornar o lancamento', async () => {
        const lancamento = new LancamentoBuilder().build()
        const { registrarLancamento } = makeSut()
        const lancamentoSalvo = await registrarLancamento.executar(lancamento.props)

        expect(lancamentoSalvo.id).toBeDefined()
    })

})

class FakeUserRepository implements UsuarioRepository {
    inserirUsuario(usuario: Usuario): Promise<Usuario> {
        throw new Error("Method not implemented.")
    }
    getUserByEmail(email: string): Promise<Usuario | undefined> {
        throw new Error("Method not implemented.")
    }
    existsUserByEmailOrCpf(cpf: string, email: string): Promise<boolean> {
        throw new Error("Method not implemented.")
    }
    async getUserById(id: string): Promise<Usuario> {
        return new UsuarioBuilder().build()
    }
}

class FakeLancamentoRepository implements LancamentoRepository {
    async save(lancamento: Lancamento): Promise<Lancamento> {
        return lancamento
    }
}

const makeSut = (): SutDependencies => {
    const usuarioRepository = new FakeUserRepository()
    const lancamentoRepository = new FakeLancamentoRepository()

    const registrarLancamento = new RegistrarLancamento(usuarioRepository, lancamentoRepository)

    return {
        usuarioRepository, lancamentoRepository, registrarLancamento
    }
}

type SutDependencies = {
    lancamentoRepository: LancamentoRepository
    usuarioRepository: UsuarioRepository
    registrarLancamento: RegistrarLancamento
}