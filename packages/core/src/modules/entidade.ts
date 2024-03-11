import { Id } from '../value-objects';

export type EntidadeProps = {
    id?: string
}

export abstract class Entidade<PropsType extends EntidadeProps> {
    readonly id: Id
    readonly props: PropsType

    constructor(props: PropsType) {
        this.id = new Id(props.id)
        this.props = { ...props, id: this.id.value }
    }

    equals(entidade: Entidade<PropsType>): boolean {
        return this.id.equals(entidade.id)
    }

    notEquals(entidadeToCompare: Entidade<PropsType>) {
        return !this.equals(entidadeToCompare)
    }

    clone(updatedProps: PropsType, ...args: any) {
        return new (this.constructor as any)({ ...this.props, ...updatedProps }, ...args)
    }
}