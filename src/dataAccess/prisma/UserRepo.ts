// src/dataAccess/prisma/UserRepo.ts
import { IUserRepo } from "../../domain/repoInterfaces/IUserRepo";
import { User } from "../../domain/entities/User";
import { prisma } from "../prismaClient";
import { UserMapper } from "../../application/mappers/UserMapper";

export class UserRepo implements IUserRepo {
  async add(user: User): Promise<User> {
  const created = await prisma.user.create({
    data: UserMapper.mapEntityToPersistence(user)
  });

  return UserMapper.mapPersistenceToEntity(created);
}
  async getById(id: number): Promise<User | null> {
    const user = await prisma.users.findUnique({
      where: { id },
    });
    return user;
  }
  async getByEmail(email: string): Promise<User | null> {
    return null;
  }
  async getAll(): Promise<User[]> {
    return [];
  }
}
