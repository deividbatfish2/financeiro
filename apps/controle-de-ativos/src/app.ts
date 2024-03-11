import express, { NextFunction, Request, Response } from 'express'
import { ValidationError } from 'core'
import { auth, lancamentoRouter, usuarioRouter } from './controllers'
import { authentication } from './middlewares'

const app = express()
app.use(express.json())

app.use('/usuario', usuarioRouter)
app.use('/auth', auth)
app.use(authentication)
app.use('/lancamento', lancamentoRouter)

app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
    if (error instanceof ValidationError) {
        return res.status(400).json({ type: error.name, error: error.message })
    } else {
        return res.status(500).json({ type: 'UnexpectedError', error: 'Erro Inesperado' })
    }
})

export default app