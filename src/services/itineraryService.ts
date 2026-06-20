import { Prisma } from '@prisma/client';
import prisma from '../data/prismaClient';
import { ItineraryItemNotFoundError } from '../errors/notFound';

export async function createItineraryItem(data: Prisma.ItineraryItemCreateInput) {
  return prisma.itineraryItem.create({ data, include: { destination: true } });
}

export async function getItineraryItemById(id: number) {
  const item = await prisma.itineraryItem.findUnique({ where: { id }, include: { destination: true } });
  if (!item) throw new ItineraryItemNotFoundError();
  return item;
}

export async function getItineraryByTrip(tripId: number) {
  return prisma.itineraryItem.findMany({ where: { tripId }, include: { destination: true } });
}

export async function updateItineraryItem(id: number, data: Prisma.ItineraryItemUpdateInput) {
  try {
    return await prisma.itineraryItem.update({ where: { id }, data, include: { destination: true } });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025') {
      throw new ItineraryItemNotFoundError();
    }
    throw error;
  }
}

export async function deleteItineraryItem(id: number) {
  try {
    return await prisma.itineraryItem.delete({ where: { id } });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025') {
      throw new ItineraryItemNotFoundError();
    }
    throw error;
  }
}
