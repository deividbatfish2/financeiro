import { GenericContainer, StartedTestContainer } from 'testcontainers'
import request from 'supertest'
import { randomUUID } from 'node:crypto'
import { createSchemes } from '../infra/prisma'
import { PrismaClient } from '@prisma/client'
import { UsuarioModel, UsuarioModelBuilder } from 'test/builders/usuario.model.builder'
import app from '@/app'

describe('Lancamento', () => {
    let database: StartedTestContainer
    let prismaClient: PrismaClient
    let user: UsuarioModel
    const userbuilder = new UsuarioModelBuilder()
    let jwt: string

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

        const res = await request(app).post('/auth').send({ email: user.email, senha: user.senha })
        jwt = res.body.jwt
    }, 10000)

    test('Deve retornar erro caso o usuário não esteja logado', async () => {
        const res = await request(app)
            .post('/lancamento')
            .send({
                codigo: 'ABCD4',
                valor: 10000,
                quantidade: 200,
                tipo: 'COMPRA',
                usuarioId: user.id
            })

        expect(res.status).toBe(401)
    })

    test('Deve realizar o lancamento', async () => {
        const res = await request(app)
            .post('/lancamento')
            .set('Authorization', `bearer ${jwt}`)
            .send({
                codigo: 'ABCD4',
                valor: 10000,
                quantidade: 200,
                tipo: 'COMPRA',
                usuarioId: user.id
            })

        expect(res.status).toBe(200)
        expect(res.body.id).toBeDefined()
    })

    test('Deve retornar erro caso o usuario nao exista na base', async () => {
        const res = await request(app)
            .post('/lancamento')
            .set('Authorization', `bearer ${jwt}`)
            .send({
                codigo: 'ABCD4',
                valor: 10000,
                quantidade: 200,
                tipo: 'COMPRA',
                usuarioId: randomUUID()
            })

        expect(res.status).toBe(400)
    })

    test('Deve retornar erro caso o codigo não seja informado', async () => {
        const res = await request(app)
            .post('/lancamento')
            .set('Authorization', `bearer ${jwt}`)
            .send({
                valor: 10000,
                quantidade: 200,
                tipo: 'COMPRA',
                usuarioId: user.id
            })

        expect(res.status).toBe(400)
    })

    test('Deve retornar erro caso o valor não seja informado', async () => {
        const res = await request(app)
            .post('/lancamento')
            .set('Authorization', `bearer ${jwt}`)
            .send({
                codigo: 'ABCD4',
                quantidade: 200,
                tipo: 'COMPRA',
                usuarioId: user.id
            })

        expect(res.status).toBe(400)
    })

    test('Deve retornar erro caso a quantidade não seja informada', async () => {
        const res = await request(app)
            .post('/lancamento')
            .set('Authorization', `bearer ${jwt}`)
            .send({
                codigo: 'ABCD4',
                valor: 1000,
                tipo: 'COMPRA',
                usuarioId: user.id
            })

        expect(res.status).toBe(400)
    })

    test('Deve retornar erro caso o tipo não seja informado', async () => {
        const res = await request(app)
            .post('/lancamento')
            .set('Authorization', `bearer ${jwt}`)
            .send({
                codigo: 'ABCD4',
                valor: 1000,
                quantidade: 200,
                usuarioId: user.id
            })

        expect(res.status).toBe(400)
    })

    test('Deve retornar erro caso o userId não seja informado', async () => {
        const res = await request(app)
            .post('/lancamento')
            .set('Authorization', `bearer ${jwt}`)
            .send({
                codigo: 'ABCD4',
                valor: 1000,
                quantidade: 200,
                tipo: 'COMPRA',
            })

        expect(res.status).toBe(400)
    })

    afterAll(async () => {
        await prismaClient.$disconnect()
        await database.stop()
    })
})