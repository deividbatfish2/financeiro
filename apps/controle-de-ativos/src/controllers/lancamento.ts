import express, { Request, Response, NextFunction } from 'express'
import { PrismaLancamentoRepository } from '@/repositories/prisma/prisma-lancamento-repository'
import { PrismaUsuarioRepository } from '@/repositories/prisma/prisma-usuario-repository'
import { RegistrarLancamento, ValidationError } from 'core'

const router = express.Router()

router.post('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const registrarLancamento = new RegistrarLancamento(new PrismaUsuarioRepository(), new PrismaLancamentoRepository())
        const { codigo, valor, quantidade, tipo, usuarioId, auth } = req.body
        if (auth && auth.userAuthId !== usuarioId) throw new ValidationError('AUTH_MUST_BE_EQUAL_USERID')

        const lancamento = await registrarLancamento.executar({ codigo, valor, quantidade, tipo, usuarioId })
        res.json(lancamento)
    } catch (erro) {
        next(erro)
    }
})

export default router