import { Prisma } from '@prisma/client';
import prisma from '../data/prismaClient';
import { DestinationNotFoundError } from '../errors/notFound';
import * as placesService from './placesService';

export async function createDestination(data: Prisma.DestinationCreateInput) {
  return prisma.destination.create({ data });
}

export async function getDestinationById(id: number) {
  const destination = await prisma.destination.findUnique({ where: { id } });
  if (!destination) throw new DestinationNotFoundError();
  return destination;
}

export async function getAllDestinations() {
  return prisma.destination.findMany();
}

export async function updateDestination(id: number, data: Prisma.DestinationUpdateInput) {
  try {
    return await prisma.destination.update({ where: { id }, data });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025') {
      throw new DestinationNotFoundError();
    }
    throw error;
  }
}

export async function deleteDestination(id: number) {
  try {
    return await prisma.destination.delete({ where: { id } });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025') {
      throw new DestinationNotFoundError();
    }
    throw error;
  }
}

export async function searchDestinations(query: string) {
  return placesService.searchCities(query);
}

export async function getOrCreateFromPlace(placeId: string) {
  const existing = await prisma.destination.findUnique({ where: { externalId: placeId } });
  if (existing) return existing;

  const details = await placesService.getDestinationDetails(placeId);

  return prisma.destination.create({
    data: {
      city: details.city,
      country: details.country,
      countryCode: details.countryCode,
      latitude: details.latitude,
      longitude: details.longitude,
      timezone: details.timezone,
      description: details.description,
      imageUrl: details.imageUrl,
      externalId: details.placeId,
    },
  });
}
