import { Request, Response } from 'express';
import * as tripService from '../services/tripService';

export async function createTrip(req: Request, res: Response) {
  try {
    const { ownerId, ...tripData } = req.body;
    const trip = await tripService.createTrip(tripData, ownerId);
    res.status(201).json(trip);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create trip' });
  }
}

export async function getTripById(req: Request, res: Response) {
  try {
    const trip = await tripService.getTripById(Number(req.params.id));
    if (!trip) {
      res.status(404).json({ error: 'Trip not found' });
      return;
    }
    res.json(trip);
  } catch (error) {
    res.status(500).json({ error: 'Failed to get trip' });
  }
}

export async function getAllTrips(req: Request, res: Response) {
  try {
    const trips = await tripService.getAllTrips();
    res.json(trips);
  } catch (error) {
    res.status(500).json({ error: 'Failed to get trips' });
  }
}

export async function updateTrip(req: Request, res: Response) {
  try {
    const trip = await tripService.updateTrip(Number(req.params.id), req.body);
    res.json(trip);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update trip' });
  }
}

export async function deleteTrip(req: Request, res: Response) {
  try {
    await tripService.deleteTrip(Number(req.params.id));
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete trip' });
  }
}

export async function addParticipant(req: Request, res: Response) {
  try {
    const participant = await tripService.addParticipant(Number(req.params.id), req.body);
    res.status(201).json(participant);
  } catch (error) {
    res.status(500).json({ error: 'Failed to add participant' });
  }
}

export async function removeParticipant(req: Request, res: Response) {
  try {
    await tripService.removeParticipant(Number(req.params.id), Number(req.params.userId));
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Failed to remove participant' });
  }
}
