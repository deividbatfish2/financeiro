import { Id } from '@valueObjects/id'

describe('Id', () => {
    describe('construtor', () => {
        test('Deve lançar um erro caso o valor informado no contrutor seja inválido', () => {
            expect(() => new Id('any_id')).toThrow(Error)
        })

        test('Deve retonar um novo id caso não seja informado um valor no construtor', () => {
            const id = new Id()

            expect(id.value).toBeDefined()
        })

        test('Deve utilizar o id informado caso o mesmo seja informado', () => {
            const { value: idValue } = Id.novo()
            const id = new Id(idValue)
            expect(id.value).toBe(idValue)
        })
    })

    describe('equals', () => {
        test('Deve retornar true caso os Ids possuam o mesmo value', () => {
            const id = new Id()
            const anotherId = new Id(id.value)

            expect(id.equals(anotherId)).toBeTruthy()
        })

        test('Deve retornar false caso os Ids não possuam o mesmo value', () => {
            const id = new Id()
            const anotherId = new Id()

            expect(id.equals(anotherId)).toBeFalsy()
        })
    })

    describe('notEquals', () => {
        test('Deve retornar true caso os Ids não possuam o mesmo value', () => {
            const id = new Id()
            const anotherId = new Id()

            expect(id.notEquals(anotherId)).toBeTruthy()
        })

        test('Deve retornar false caso os Ids possuam o mesmo value', () => {
            const id = new Id()
            const anotherId = new Id(id.value)

            expect(id.notEquals(anotherId)).toBeFalsy()
        })
    })

})