export interface IGetAllRepo<T> {
  getAll(): Promise<T[]>;
}
