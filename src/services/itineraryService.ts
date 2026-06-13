import prisma from '../data/prismaClient';
import { Prisma } from '@prisma/client';

export async function createItineraryItem(data: Prisma.ItineraryItemCreateInput) {
  return prisma.itineraryItem.create({ data, include: { destination: true } });
}

export async function getItineraryItemById(id: number) {
  return prisma.itineraryItem.findUnique({ where: { id }, include: { destination: true } });
}

export async function getItineraryByTrip(tripId: number) {
  return prisma.itineraryItem.findMany({ where: { tripId }, include: { destination: true } });
}

export async function updateItineraryItem(id: number, data: Prisma.ItineraryItemUpdateInput) {
  return prisma.itineraryItem.update({ where: { id }, data, include: { destination: true } });
}

export async function deleteItineraryItem(id: number) {
  return prisma.itineraryItem.delete({ where: { id } });
}
