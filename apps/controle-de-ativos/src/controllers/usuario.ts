import { PrismaUsuarioRepository } from '@/repositories/prisma/prisma-usuario-repository'
import express, { Request, Response, NextFunction } from 'express'
import { RegistrarUsuario } from 'core'
import { makeBcryptHasher } from '@/services/hasher/make-hasher'

const router = express.Router()

router.post('/', async (req: Request, res: Response, next: NextFunction) => {
    const hasher = makeBcryptHasher()
    const usuarioRepository = new PrismaUsuarioRepository()
    const registrarUsuario = new RegistrarUsuario(hasher, usuarioRepository)

    try {
        const { senha, cpf, email, nome } = req.body
        const usuarioCadastrado = await registrarUsuario.executar({ senha, cpf, email, nome })
        res.json(usuarioCadastrado)
    } catch (e) {
        next(e)
    }
})

export default router