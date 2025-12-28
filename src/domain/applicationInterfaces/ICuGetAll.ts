export interface ICuGetAll<T> {
  execute(): Promise<T[]>;
}
