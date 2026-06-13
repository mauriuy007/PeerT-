import prisma from '../data/prismaClient';
import { Prisma } from '@prisma/client';

export async function createExpense(data: Prisma.ExpenseCreateInput) {
  return prisma.expense.create({ data });
}

export async function getExpenseById(id: number) {
  return prisma.expense.findUnique({ where: { id } });
}

export async function getExpensesByTrip(tripId: number) {
  return prisma.expense.findMany({ where: { tripId } });
}

export async function updateExpense(id: number, data: Prisma.ExpenseUpdateInput) {
  return prisma.expense.update({ where: { id }, data });
}

export async function deleteExpense(id: number) {
  return prisma.expense.delete({ where: { id } });
}
