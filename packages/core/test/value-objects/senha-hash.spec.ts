import { Erros, SenhaHash } from "@/index"

describe('SenhaHash', () => {
    test.each([
        '$2c$10$nOUIs5kJ7naTuTFkBy1veuK0kSxUFXfuaOKdOKf9xYT0KKIGSJwFa',
        '$2x$10$nOUIs5kJ7naTuTFkBy1veuK0kSxUFXfuaOKdOKf9xYT0KKIGSJwF',
        '$2y$100$nOUIs5kJ7naTuTFkBy1veuK0kSxUFXfuaOKdOKf9xYT0KKIGSJwFa',
        '$2a$8$9o6U83r.bvJHrQraMdPW/uBy922Mn120LcCTY2xlrIuLBMO5tqbSO',
        '$2a$07$6uO8WLJ73C2C57E1M0mgXeE2mjbcjd35xLgyKrXU4F95o/TU1lZXua',
        '%2a%14%xogNIzCaOQ8cG5B2ZA1eKOMJLwJ.p3qlXs578LBDUYDgEhlgGJv8a'
    ])
        ('Deve lançar erro caso a senha não esteja representada por um hash válido: %s', (hash) => {
            expect(() => new SenhaHash(hash)).toThrow(Erros.HASH_INVALIDO)
        })

        
})