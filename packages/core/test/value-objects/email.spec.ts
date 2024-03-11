import { Erros } from "@/erros"
import { Email } from "@valueObjects/email"

describe('Email', () => {
    test.each([undefined, '', '      '])
    ('Deve lançar erro caso um email não seja informado', (value) => {
        expect(() => new Email(value)).toThrow(Erros.EMAIL_INVALIDO)
    })

    test.each([
        'analauraoliveira66hotmail.com.br',
        'analauraoliveira66@.com.br',
        'analauraoliveira66@zmail',
        '@n@l@uraoliveira66@zmail.com',
        '[analauraoliveira]66@zmail.com',
    ])
    ('Deve lançar erro caso um email não possua um formato valido: %s', (value) => {
        expect(() => new Email(value)).toThrow(Erros.EMAIL_INVALIDO)
    })

    test('Deve retornar a parte local do endereço de email', () => {
        const email = new Email('deividbatfish2@gmail.com')
        expect(email.localParte).toBe('deividbatfish2')
    })
    
    test('Deve retornar o dominio do endereço de email', () => {
        const email = new Email('deividbatfish2@gmail.com')
        expect(email.dominio).toBe('gmail.com')
    })
})