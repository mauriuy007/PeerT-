// src/dataAccess/prisma/UserRepo.ts
import { IUserRepo } from "../../domain/repoInterfaces/IUserRepo";
import { User } from "../../domain/entities/User";

export class UserRepo implements IUserRepo {
  async add(user: User): Promise<number> {
    // prisma.user.create({ data: { ... } })
    return 1;
  }
  async getById(id: number): Promise<User | null> {
    return null;
  }
  async getByEmail(email: string): Promise<User | null> {
    return null;
  }
  async getAll(): Promise<User[]> {
    return [];
  }
}
