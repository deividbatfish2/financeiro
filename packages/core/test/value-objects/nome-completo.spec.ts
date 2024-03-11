import { Erros } from '@/erros'
import { NomeCompleto } from '@valueObjects/nome-completo'

describe('NomeCompleto', () => {
    test.each([undefined, '', '         '])
        ('Deve lançar erro caso o nome não seja passado', (nome) => {
            expect(() => new NomeCompleto(nome)).toThrow(Erros.NOME_NAO_INFORMADO)
        })

    test.each(['NomeSemSobrenome', ' NomeSemSobrenome', 'NomeSemSobrenome  '])
        ('Deve lançar erro caso o nome não possua um sobrenome', (nome) => {
            expect(() => new NomeCompleto(nome)).toThrow(Erros.NOME_INCOMPLETO_SOBRENOME_NECESSARIO)
        })

    test('Deve retornar erro caso o nome possua menos que 6 caracteres', () => {
        expect(() => new NomeCompleto('xa bla')).toThrow(Erros.NOME_INCOMPLETO_SOBRENOME_NECESSARIO)
    })

    test('Deve retornar erro caso o nome possua mais que 255 caracteres', () => {
        const nomeGrande = new Array(257).fill('a').join(' ')
        expect(() => new NomeCompleto(nomeGrande)).toThrow(Erros.NOME_INCOMPLETO_SOBRENOME_NECESSARIO)
    })

    test.each([
        { nome: 'deivid de assis teixeira', iniciaisExperadas: 'DAT' },
        { nome: 'bianca peixoto siqueira', iniciaisExperadas: 'BPS', },
        { nome: 'Outro Nome Qualquer', iniciaisExperadas: 'ONQ' }
    ])
        ('Deve retornar as iniciais dos nomes', ({ nome, iniciaisExperadas }) => {
            const nomeCompleto = new NomeCompleto(nome)
            expect(nomeCompleto.iniciais).toBe(iniciaisExperadas)
        })
    test.each([
        { nome: 'deivid de assis teixeira', nomeCaptalizado: 'Deivid De Assis Teixeira' },
        { nome: 'bianca peixoto siqueira', nomeCaptalizado: 'Bianca Peixoto Siqueira' },
        { nome: 'Outro Nome Qualquer', nomeCaptalizado: 'Outro Nome Qualquer' },
        { nome: 'san São', nomeCaptalizado: 'San São' }
    ])
        ('Deve retornar as iniciais dos nomes', ({ nome, nomeCaptalizado }) => {
            const nomeCompleto = new NomeCompleto(nome)
            expect(nomeCompleto.value).toBe(nomeCaptalizado)
        })

})