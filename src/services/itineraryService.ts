import { Prisma } from '@prisma/client';
import prisma from '../data/prismaClient';
import { ItineraryItemNotFoundError } from '../errors/notFound';
import { assertTripMembership } from './tripService';

export async function createItineraryItem(data: Prisma.ItineraryItemUncheckedCreateInput, userId: number) {
  await assertTripMembership(data.tripId, userId);
  return prisma.itineraryItem.create({ data, include: { destination: true } });
}

export async function getItineraryItemById(id: number, userId: number) {
  const item = await prisma.itineraryItem.findUnique({ where: { id }, include: { destination: true } });
  if (!item) throw new ItineraryItemNotFoundError();
  await assertTripMembership(item.tripId, userId);
  return item;
}

export async function getItineraryByTrip(tripId: number, userId: number) {
  await assertTripMembership(tripId, userId);
  return prisma.itineraryItem.findMany({ where: { tripId }, include: { destination: true } });
}

export async function updateItineraryItem(id: number, data: Prisma.ItineraryItemUpdateInput, userId: number) {
  const item = await prisma.itineraryItem.findUnique({ where: { id } });
  if (!item) throw new ItineraryItemNotFoundError();
  await assertTripMembership(item.tripId, userId);
  return prisma.itineraryItem.update({ where: { id }, data, include: { destination: true } });
}

export async function deleteItineraryItem(id: number, userId: number) {
  const item = await prisma.itineraryItem.findUnique({ where: { id } });
  if (!item) throw new ItineraryItemNotFoundError();
  await assertTripMembership(item.tripId, userId);
  return prisma.itineraryItem.delete({ where: { id } });
}
