import { PrismaClient } from '@prisma/client'
import { createSchemes } from 'test/infra/prisma'
import { GenericContainer, StartedTestContainer } from 'testcontainers'
import request from 'supertest'
import { generate } from 'gerador-validador-cpf'
import { faker } from '@faker-js/faker/locale/pt_BR'
import app from '@/app'

describe('Usuario', () => {
    let database: StartedTestContainer
    let prismaClient: PrismaClient

    beforeAll(async () => {
        const postgress = new GenericContainer('postgres:16')
            .withExposedPorts({ container: 5432, host: 5432 })
            .withEnvironment({ POSTGRES_USER: 'ControleDeAtivosAppUser' })
            .withEnvironment({ POSTGRES_PASSWORD: 'MY_STRONG_PASSWORD_@' })
            .withEnvironment({ POSTGRES_DB: 'controle-de-ativos' })

        database = await postgress.start()
        prismaClient = await createSchemes()
        await prismaClient.$connect()
    }, 10000)

    test('Deve cadastrar o usuario', async () => {
        const res = await request(app)
            .post('/usuario')
            .send({
                senha: 'Minha_Senha_Forte_1@',
                cpf: generate(),
                email: faker.internet.email(),
                nome: faker.person.fullName()
            })

        expect(res.status).toBe(200)
        expect(res.body.id).toBeDefined()
    })

    test('Deve retornar erro caso a senha não seja informada', async () => {
        const res = await request(app)
            .post('/usuario')
            .send({
                cpf: generate(),
                email: faker.internet.email(),
                nome: faker.person.fullName()
            })

        expect(res.status).toBe(400)
    })
    
    test('Deve retornar erro caso o cpf não seja informada', async () => {
        const res = await request(app)
            .post('/usuario')
            .send({
                senha: 'Minha_Senha_Forte_1@',
                email: faker.internet.email(),
                nome: faker.person.fullName()
            })

        expect(res.status).toBe(400)
    })
    
    test('Deve retornar erro caso o email não seja informado', async () => {
        const res = await request(app)
            .post('/usuario')
            .send({
                senha: 'Minha_Senha_Forte_1@',
                cpf: generate(),
                nome: faker.person.fullName()
            })

        expect(res.status).toBe(400)
    })

    test('Deve retornar erro caso o nome não seja informado', async () => {
        const res = await request(app)
            .post('/usuario')
            .send({
                senha: 'Minha_Senha_Forte_1@',
                cpf: generate(),
                email: faker.internet.email(),
            })

        expect(res.status).toBe(400)
    })

    afterAll(async () => {
        await prismaClient.$disconnect()
        await database.stop()
    })
})