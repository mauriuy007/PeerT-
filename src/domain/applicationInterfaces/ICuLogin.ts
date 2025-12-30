export interface ICuLogin {
  execute(email: string, password: string): Promise<{ userId: number; token: string }>;
}
