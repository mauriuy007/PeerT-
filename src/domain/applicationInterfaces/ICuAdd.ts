export interface ICuAdd<T> {
  execute(input: T): Promise<number>;
}
