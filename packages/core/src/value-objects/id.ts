import { Erros, ValidationError } from '../erros'
import { randomUUID } from 'node:crypto'

export class Id {
    readonly value: string

    constructor(codigo?: string) {
        if(codigo && !codigo.match(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$/i))
            throw new ValidationError(Erros.ID_INVALIDO)
        
        this.value = codigo ?? randomUUID()
    }

    equals(id: Id): boolean {
        return this.value === id.value
    }

    notEquals(id: Id): boolean {
        return !this.equals(id)
    }
    
    static novo() {
        return new Id()
    }
}