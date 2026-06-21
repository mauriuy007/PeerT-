import { Prisma, TripParticipantRole } from '@prisma/client';
import prisma from '../data/prismaClient';
import { UserAlreadyInTripError } from '../errors/conflict';
import { ForbiddenError } from '../errors/auth';
import { TripNotFoundError } from '../errors/notFound';

export async function assertTripMembership(tripId: number, userId: number) {
  const participant = await prisma.tripParticipant.findFirst({ where: { tripId, userId } });
  if (!participant) throw new ForbiddenError();
}

type CreateTripData = Pick<Prisma.TripCreateInput, 'name' | 'startDate' | 'endDate'>;

export async function createTrip(data: CreateTripData, ownerId: number) {
  return prisma.trip.create({
    data: {
      ...data,
      participants: {
        create: { userId: ownerId, role: 'OWNER' },
      },
    },
    include: { participants: true },
  });
}

export async function getTripById(id: number) {
  const trip = await prisma.trip.findUnique({
    where: { id },
    include: {
      participants: true,
      bookings: true,
      expenses: true,
      itineraryItems: { include: { destination: true } },
    },
  });
  if (!trip) throw new TripNotFoundError();
  return trip;
}

export async function getAllTrips(userId: number) {
  return prisma.trip.findMany({
    where: { participants: { some: { userId } } },
    include: { participants: true },
  });
}

export async function updateTrip(id: number, data: Prisma.TripUpdateInput) {
  try {
    return await prisma.trip.update({ where: { id }, data });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025') {
      throw new TripNotFoundError();
    }
    throw error;
  }
}

export async function deleteTrip(id: number) {
  try {
    return await prisma.trip.delete({ where: { id } });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025') {
      throw new TripNotFoundError();
    }
    throw error;
  }
}

export async function addParticipant(tripId: number, data: { userId: number; role: TripParticipantRole }) {
  const existing = await prisma.tripParticipant.findFirst({ where: { tripId, userId: data.userId } });
  if (existing) throw new UserAlreadyInTripError();
  return prisma.tripParticipant.create({ data: { tripId, ...data } });
}

export async function removeParticipant(tripId: number, userId: number) {
  return prisma.tripParticipant.deleteMany({ where: { tripId, userId } });
}
