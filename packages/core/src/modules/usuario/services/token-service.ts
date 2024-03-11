export type UserAuthId = {
    userAuthId: string
}

export interface TokenService {
    sign(userId: string): Promise<string>
    verify(token: string): Promise<UserAuthId>
}