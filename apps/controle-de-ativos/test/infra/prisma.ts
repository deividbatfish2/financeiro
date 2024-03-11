import { promisify } from 'node:util'
import { exec } from 'node:child_process'
import { PrismaClient } from '@prisma/client'

export const createSchemes = async (): Promise<PrismaClient> => {
    const execAsync = promisify(exec)
    await execAsync('npx prisma migrate dev')
    return new PrismaClient()
}