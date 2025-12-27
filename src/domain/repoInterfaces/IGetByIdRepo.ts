export interface IGetByIdRepo<T> {
    getById(id: number): T | null;
}