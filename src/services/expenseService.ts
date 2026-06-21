import { Prisma } from '@prisma/client';
import prisma from '../data/prismaClient';
import { ExpenseNotFoundError } from '../errors/notFound';
import { assertTripMembership } from './tripService';

export async function createExpense(data: Prisma.ExpenseUncheckedCreateInput, userId: number) {
  await assertTripMembership(data.tripId, userId);
  return prisma.expense.create({ data });
}

export async function getExpenseById(id: number, userId: number) {
  const expense = await prisma.expense.findUnique({ where: { id } });
  if (!expense) throw new ExpenseNotFoundError();
  await assertTripMembership(expense.tripId, userId);
  return expense;
}

export async function getExpensesByTrip(tripId: number, userId: number) {
  await assertTripMembership(tripId, userId);
  return prisma.expense.findMany({ where: { tripId } });
}

export async function updateExpense(id: number, data: Prisma.ExpenseUpdateInput, userId: number) {
  const expense = await prisma.expense.findUnique({ where: { id } });
  if (!expense) throw new ExpenseNotFoundError();
  await assertTripMembership(expense.tripId, userId);
  return prisma.expense.update({ where: { id }, data });
}

export async function deleteExpense(id: number, userId: number) {
  const expense = await prisma.expense.findUnique({ where: { id } });
  if (!expense) throw new ExpenseNotFoundError();
  await assertTripMembership(expense.tripId, userId);
  return prisma.expense.delete({ where: { id } });
}
