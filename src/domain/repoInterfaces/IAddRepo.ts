export interface IAddRepo<T> {
    add(entity: T): Promise<number>;
}