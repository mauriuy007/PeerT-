import prisma from '../data/prismaClient';
import { Prisma } from '@prisma/client';

export async function createBooking(data: Prisma.BookingCreateInput) {
  return prisma.booking.create({ data });
}

export async function getBookingById(id: number) {
  return prisma.booking.findUnique({ where: { id } });
}

export async function getBookingsByTrip(tripId: number) {
  return prisma.booking.findMany({ where: { tripId } });
}

export async function updateBooking(id: number, data: Prisma.BookingUpdateInput) {
  return prisma.booking.update({ where: { id }, data });
}

export async function deleteBooking(id: number) {
  return prisma.booking.delete({ where: { id } });
}
