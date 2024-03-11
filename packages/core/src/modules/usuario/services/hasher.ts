export interface Hasher {
    hash(value: string): Promise<string>
    compare(senha: string, hash: string): Promise<boolean>
}