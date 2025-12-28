export interface ICuGetById<T> {
  execute(id: number): Promise<T | null>;
}
