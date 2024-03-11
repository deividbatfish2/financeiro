const Config = {
    Criptografia: {
        Salt: parseInt(process.env.SALT ?? '10')
    },
    Token: {
        secret: process.env.SECRET ?? 'ANY_FAKE_SECRET',
        expires: process.env.EXPIRES ?? '1d'
    }
} as const

export default Config