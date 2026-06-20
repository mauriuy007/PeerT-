import { Request, Response } from 'express';
import { ItineraryItemNotFoundError } from '../errors/notFound';
import * as itineraryService from '../services/itineraryService';

export async function createItineraryItem(req: Request, res: Response) {
  try {
    const item = await itineraryService.createItineraryItem(req.body);
    res.status(201).json(item);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
}

export async function getItineraryItemById(req: Request, res: Response) {
  try {
    const item = await itineraryService.getItineraryItemById(Number(req.params.id));
    res.json(item);
  } catch (error) {
    if (error instanceof ItineraryItemNotFoundError) {
      res.status(404).json({ error: error.message });
      return;
    }
    res.status(500).json({ error: 'Internal server error' });
  }
}

export async function getItineraryByTrip(req: Request, res: Response) {
  try {
    const items = await itineraryService.getItineraryByTrip(Number(req.params.tripId));
    res.json(items);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
}

export async function updateItineraryItem(req: Request, res: Response) {
  try {
    const item = await itineraryService.updateItineraryItem(Number(req.params.id), req.body);
    res.json(item);
  } catch (error) {
    if (error instanceof ItineraryItemNotFoundError) {
      res.status(404).json({ error: error.message });
      return;
    }
    res.status(500).json({ error: 'Internal server error' });
  }
}

export async function deleteItineraryItem(req: Request, res: Response) {
  try {
    await itineraryService.deleteItineraryItem(Number(req.params.id));
    res.status(204).send();
  } catch (error) {
    if (error instanceof ItineraryItemNotFoundError) {
      res.status(404).json({ error: error.message });
      return;
    }
    res.status(500).json({ error: 'Internal server error' });
  }
}
