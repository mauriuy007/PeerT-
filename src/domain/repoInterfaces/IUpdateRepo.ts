export interface IUpdateRepo<T> {
  update(entity: T): number;
}
