import { PrismaClient } from '@prisma/client'
import { createSchemes } from 'test/infra/prisma'
import { GenericContainer, StartedTestContainer } from 'testcontainers'
import request from 'supertest'
import { UsuarioModel, UsuarioModelBuilder } from 'test/builders/usuario.model.builder'
import app from '@/app'

describe('Auth', () => {
    let database: StartedTestContainer
    let prismaClient: PrismaClient
    let user: UsuarioModel

    const userbuilder = new UsuarioModelBuilder()

    beforeAll(async () => {
        const postgress = new GenericContainer('postgres:16')
            .withExposedPorts({ container: 5432, host: 5432 })
            .withEnvironment({ POSTGRES_USER: 'ControleDeAtivosAppUser' })
            .withEnvironment({ POSTGRES_PASSWORD: 'MY_STRONG_PASSWORD_@' })
            .withEnvironment({ POSTGRES_DB: 'controle-de-ativos' })

        database = await postgress.start()
        prismaClient = await createSchemes()
        await prismaClient.$connect()

        user = userbuilder.build()

        await prismaClient.usuario.create({ data: { cpf: user.cpf, email: user.email, hash: user.hash, id: user.id, nome: user.nome } })
    }, 10000)

    test('Deve retornar um token de acesso', async () => {
        const res = await request(app)
            .post('/auth')
            .send({
                email: user.email,
                senha: user.senha
            })

        expect(res.status).toBe(200)
        expect(res.body.jwt).toBeDefined()
    })

    afterAll(async () => {
        await prismaClient.$disconnect()
        await database.stop()
    })
})