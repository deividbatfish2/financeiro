import { Usuario } from '../entities';

export interface UsuarioRepository {
    getUserById(id: string): Promise<Usuario | undefined>
    existsUserByEmailOrCpf(cpf: string, email: string): Promise<boolean>
    inserirUsuario(usuario: Usuario): Promise<Usuario>
    getUserByEmail(email: string): Promise<Usuario | undefined>
}