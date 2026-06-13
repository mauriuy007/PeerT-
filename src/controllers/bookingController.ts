import { Request, Response } from 'express';
import * as bookingService from '../services/bookingService';

export async function createBooking(req: Request, res: Response) {
  try {
    const booking = await bookingService.createBooking(req.body);
    res.status(201).json(booking);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create booking' });
  }
}

export async function getBookingById(req: Request, res: Response) {
  try {
    const booking = await bookingService.getBookingById(Number(req.params.id));
    if (!booking) {
      res.status(404).json({ error: 'Booking not found' });
      return;
    }
    res.json(booking);
  } catch (error) {
    res.status(500).json({ error: 'Failed to get booking' });
  }
}

export async function getBookingsByTrip(req: Request, res: Response) {
  try {
    const bookings = await bookingService.getBookingsByTrip(Number(req.params.tripId));
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ error: 'Failed to get bookings' });
  }
}

export async function updateBooking(req: Request, res: Response) {
  try {
    const booking = await bookingService.updateBooking(Number(req.params.id), req.body);
    res.json(booking);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update booking' });
  }
}

export async function deleteBooking(req: Request, res: Response) {
  try {
    await bookingService.deleteBooking(Number(req.params.id));
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete booking' });
  }
}
