import prisma from '../data/prismaClient';
import { Prisma, TripParticipantRole } from '@prisma/client';

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
  return prisma.trip.findUnique({
    where: { id },
    include: {
      participants: true,
      bookings: true,
      expenses: true,
      itineraryItems: { include: { destination: true } },
    },
  });
}

export async function getAllTrips() {
  return prisma.trip.findMany({ include: { participants: true } });
}

export async function updateTrip(id: number, data: Prisma.TripUpdateInput) {
  return prisma.trip.update({ where: { id }, data });
}

export async function deleteTrip(id: number) {
  return prisma.trip.delete({ where: { id } });
}

export async function addParticipant(tripId: number, data: { userId: number; role: TripParticipantRole }) {
  return prisma.tripParticipant.create({ data: { tripId, ...data } });
}

export async function removeParticipant(tripId: number, userId: number) {
  return prisma.tripParticipant.deleteMany({ where: { tripId, userId } });
}
