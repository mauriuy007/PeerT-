export interface ICuAdd<I, O> {
  execute(input: I): Promise<O>;
}
