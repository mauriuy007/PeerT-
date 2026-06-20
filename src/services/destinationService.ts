import { Prisma } from '@prisma/client';
import prisma from '../data/prismaClient';
import { DestinationNotFoundError } from '../errors/notFound';

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
