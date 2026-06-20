import { Prisma } from '@prisma/client';
import prisma from '../data/prismaClient';
import { EmailAlreadyInUseError } from '../errors/conflict';
import { UserNotFoundError } from '../errors/notFound';

export async function createUser(data: Prisma.UserCreateInput) {
  try {
    return await prisma.user.create({ data });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002') {
      throw new EmailAlreadyInUseError();
    }
    throw error;
  }
}

export async function getUserById(id: number) {
  const user = await prisma.user.findUnique({ where: { id } });
  if (!user) throw new UserNotFoundError();
  return user;
}

export async function getAllUsers() {
  return prisma.user.findMany();
}

export async function updateUser(id: number, data: Prisma.UserUpdateInput) {
  try {
    return await prisma.user.update({ where: { id }, data });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025') {
      throw new UserNotFoundError();
    }
    throw error;
  }
}

export async function deleteUser(id: number) {
  try {
    return await prisma.user.delete({ where: { id } });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025') {
      throw new UserNotFoundError();
    }
    throw error;
  }
}
