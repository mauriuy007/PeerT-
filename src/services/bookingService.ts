import { Prisma } from '@prisma/client';
import prisma from '../data/prismaClient';
import { BookingNotFoundError } from '../errors/notFound';
import { assertTripMembership } from './tripService';

export async function createBooking(data: Prisma.BookingUncheckedCreateInput, userId: number) {
  await assertTripMembership(data.tripId, userId);
  return prisma.booking.create({ data });
}

export async function getBookingById(id: number, userId: number) {
  const booking = await prisma.booking.findUnique({ where: { id } });
  if (!booking) throw new BookingNotFoundError();
  await assertTripMembership(booking.tripId, userId);
  return booking;
}

export async function getBookingsByTrip(tripId: number, userId: number) {
  await assertTripMembership(tripId, userId);
  return prisma.booking.findMany({ where: { tripId } });
}

export async function updateBooking(id: number, data: Prisma.BookingUpdateInput, userId: number) {
  const booking = await prisma.booking.findUnique({ where: { id } });
  if (!booking) throw new BookingNotFoundError();
  await assertTripMembership(booking.tripId, userId);
  return prisma.booking.update({ where: { id }, data });
}

export async function deleteBooking(id: number, userId: number) {
  const booking = await prisma.booking.findUnique({ where: { id } });
  if (!booking) throw new BookingNotFoundError();
  await assertTripMembership(booking.tripId, userId);
  return prisma.booking.delete({ where: { id } });
}
