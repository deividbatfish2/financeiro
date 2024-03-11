import { makeBcryptHasher } from '@/services/hasher/make-hasher'
import { PrismaUsuarioRepository } from '@/repositories/prisma/prisma-usuario-repository'
import { Logar } from 'core'
import express, { Request, Response, NextFunction } from 'express'
import { makeJsonWebToken } from '@/services/token/make-jason-web-token-service'

const router = express.Router()

router.post('/', async (req: Request, res: Response, next: NextFunction) => {
    const usuarioRepository = new PrismaUsuarioRepository()
    const hasher = makeBcryptHasher()
    const tokenService = makeJsonWebToken()
    const logar = new Logar(usuarioRepository, hasher, tokenService)

    try {
        const { email, senha } = req.body
        const jwt = await logar.executar({ email, senha })
        return res.json(jwt)
    } catch (e) {
        next(e)
    }
})

export default router