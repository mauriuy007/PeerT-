import { Prisma } from '@prisma/client';
import prisma from '../data/prismaClient';
import { BookingNotFoundError } from '../errors/notFound';

export async function createBooking(data: Prisma.BookingCreateInput) {
  return prisma.booking.create({ data });
}

export async function getBookingById(id: number) {
  const booking = await prisma.booking.findUnique({ where: { id } });
  if (!booking) throw new BookingNotFoundError();
  return booking;
}

export async function getBookingsByTrip(tripId: number) {
  return prisma.booking.findMany({ where: { tripId } });
}

export async function updateBooking(id: number, data: Prisma.BookingUpdateInput) {
  try {
    return await prisma.booking.update({ where: { id }, data });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025') {
      throw new BookingNotFoundError();
    }
    throw error;
  }
}

export async function deleteBooking(id: number) {
  try {
    return await prisma.booking.delete({ where: { id } });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025') {
      throw new BookingNotFoundError();
    }
    throw error;
  }
}
