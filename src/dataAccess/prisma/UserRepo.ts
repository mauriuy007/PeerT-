// src/dataAccess/prisma/UserRepo.ts
import { IUserRepo } from "../../domain/repoInterfaces/IUserRepo";
import { User } from "../../domain/entities/User";

export class UserRepo implements IUserRepo {
  async create(user: User): Promise<number> {
    // prisma.user.create({ data: { ... } })
    return 1;
  }
}
