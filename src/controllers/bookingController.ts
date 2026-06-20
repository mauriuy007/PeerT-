import { Request, Response } from 'express';
import { BookingNotFoundError } from '../errors/notFound';
import * as bookingService from '../services/bookingService';

export async function createBooking(req: Request, res: Response) {
  try {
    const booking = await bookingService.createBooking(req.body);
    res.status(201).json(booking);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
}

export async function getBookingById(req: Request, res: Response) {
  try {
    const booking = await bookingService.getBookingById(Number(req.params.id));
    res.json(booking);
  } catch (error) {
    if (error instanceof BookingNotFoundError) {
      res.status(404).json({ error: error.message });
      return;
    }
    res.status(500).json({ error: 'Internal server error' });
  }
}

export async function getBookingsByTrip(req: Request, res: Response) {
  try {
    const bookings = await bookingService.getBookingsByTrip(Number(req.params.tripId));
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
}

export async function updateBooking(req: Request, res: Response) {
  try {
    const booking = await bookingService.updateBooking(Number(req.params.id), req.body);
    res.json(booking);
  } catch (error) {
    if (error instanceof BookingNotFoundError) {
      res.status(404).json({ error: error.message });
      return;
    }
    res.status(500).json({ error: 'Internal server error' });
  }
}

export async function deleteBooking(req: Request, res: Response) {
  try {
    await bookingService.deleteBooking(Number(req.params.id));
    res.status(204).send();
  } catch (error) {
    if (error instanceof BookingNotFoundError) {
      res.status(404).json({ error: error.message });
      return;
    }
    res.status(500).json({ error: 'Internal server error' });
  }
}
