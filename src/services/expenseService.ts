import { Prisma } from '@prisma/client';
import prisma from '../data/prismaClient';
import { ExpenseNotFoundError } from '../errors/notFound';

export async function createExpense(data: Prisma.ExpenseCreateInput) {
  return prisma.expense.create({ data });
}

export async function getExpenseById(id: number) {
  const expense = await prisma.expense.findUnique({ where: { id } });
  if (!expense) throw new ExpenseNotFoundError();
  return expense;
}

export async function getExpensesByTrip(tripId: number) {
  return prisma.expense.findMany({ where: { tripId } });
}

export async function updateExpense(id: number, data: Prisma.ExpenseUpdateInput) {
  try {
    return await prisma.expense.update({ where: { id }, data });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025') {
      throw new ExpenseNotFoundError();
    }
    throw error;
  }
}

export async function deleteExpense(id: number) {
  try {
    return await prisma.expense.delete({ where: { id } });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025') {
      throw new ExpenseNotFoundError();
    }
    throw error;
  }
}
