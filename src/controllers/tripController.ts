import { Request, Response } from 'express';
import { UserAlreadyInTripError } from '../errors/conflict';
import { TripNotFoundError } from '../errors/notFound';
import * as tripService from '../services/tripService';

export async function createTrip(req: Request, res: Response) {
  try {
    const { ownerId, ...tripData } = req.body;
    const trip = await tripService.createTrip(tripData, ownerId);
    res.status(201).json(trip);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
}

export async function getTripById(req: Request, res: Response) {
  try {
    const trip = await tripService.getTripById(Number(req.params.id));
    res.json(trip);
  } catch (error) {
    if (error instanceof TripNotFoundError) {
      res.status(404).json({ error: error.message });
      return;
    }
    res.status(500).json({ error: 'Internal server error' });
  }
}

export async function getAllTrips(_req: Request, res: Response) {
  try {
    const trips = await tripService.getAllTrips();
    res.json(trips);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
}

export async function updateTrip(req: Request, res: Response) {
  try {
    const trip = await tripService.updateTrip(Number(req.params.id), req.body);
    res.json(trip);
  } catch (error) {
    if (error instanceof TripNotFoundError) {
      res.status(404).json({ error: error.message });
      return;
    }
    res.status(500).json({ error: 'Internal server error' });
  }
}

export async function deleteTrip(req: Request, res: Response) {
  try {
    await tripService.deleteTrip(Number(req.params.id));
    res.status(204).send();
  } catch (error) {
    if (error instanceof TripNotFoundError) {
      res.status(404).json({ error: error.message });
      return;
    }
    res.status(500).json({ error: 'Internal server error' });
  }
}

export async function addParticipant(req: Request, res: Response) {
  try {
    const participant = await tripService.addParticipant(Number(req.params.id), req.body);
    res.status(201).json(participant);
  } catch (error) {
    if (error instanceof TripNotFoundError) {
      res.status(404).json({ error: error.message });
      return;
    }
    if (error instanceof UserAlreadyInTripError) {
      res.status(409).json({ error: error.message });
      return;
    }
    res.status(500).json({ error: 'Internal server error' });
  }
}

export async function removeParticipant(req: Request, res: Response) {
  try {
    await tripService.removeParticipant(Number(req.params.id), Number(req.params.userId));
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
}
