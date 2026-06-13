import prisma from '../data/prismaClient';
import { Prisma } from '@prisma/client';

export async function createUser(data: Prisma.UserCreateInput) {
  return prisma.user.create({ data });
}

export async function getUserById(id: number) {
  return prisma.user.findUnique({ where: { id } });
}

export async function getAllUsers() {
  return prisma.user.findMany();
}

export async function updateUser(id: number, data: Prisma.UserUpdateInput) {
  return prisma.user.update({ where: { id }, data });
}

export async function deleteUser(id: number) {
  return prisma.user.delete({ where: { id } });
}
