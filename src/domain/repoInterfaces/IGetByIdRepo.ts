export interface IGetByIdRepo<T> {
    getById(id: number): Promise<T | null>;
}