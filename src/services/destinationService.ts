import prisma from '../data/prismaClient';
import { Prisma } from '@prisma/client';

export async function createDestination(data: Prisma.DestinationCreateInput) {
  return prisma.destination.create({ data });
}

export async function getDestinationById(id: number) {
  return prisma.destination.findUnique({ where: { id } });
}

export async function getAllDestinations() {
  return prisma.destination.findMany();
}

export async function updateDestination(id: number, data: Prisma.DestinationUpdateInput) {
  return prisma.destination.update({ where: { id }, data });
}

export async function deleteDestination(id: number) {
  return prisma.destination.delete({ where: { id } });
}
