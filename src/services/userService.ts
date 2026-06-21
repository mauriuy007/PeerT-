import { Prisma } from '@prisma/client';
import bcrypt from 'bcrypt';
import prisma from '../data/prismaClient';
import { EmailAlreadyInUseError } from '../errors/conflict';
import { UserNotFoundError } from '../errors/notFound';

const userSelect = {
  id: true,
  email: true,
  name: true,
  lastName: true,
} satisfies Prisma.UserSelect;

export async function createUser(data: Prisma.UserCreateInput) {
  try {
    const hashedPassword = await bcrypt.hash(data.password as string, 10);
    return await prisma.user.create({ data: { ...data, password: hashedPassword }, select: userSelect });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002') {
      throw new EmailAlreadyInUseError();
    }
    throw error;
  }
}

export async function getUserById(id: number) {
  const user = await prisma.user.findUnique({ where: { id }, select: userSelect });
  if (!user) throw new UserNotFoundError();
  return user;
}

export async function getAllUsers() {
  return prisma.user.findMany({ select: userSelect });
}

export async function updateUser(id: number, data: Prisma.UserUpdateInput) {
  try {
    return await prisma.user.update({ where: { id }, data, select: userSelect });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025') {
      throw new UserNotFoundError();
    }
    throw error;
  }
}

export async function deleteUser(id: number) {
  try {
    await prisma.user.delete({ where: { id } });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025') {
      throw new UserNotFoundError();
    }
    throw error;
  }
}
