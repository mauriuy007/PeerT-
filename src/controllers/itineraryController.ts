import { Request, Response } from 'express';
import * as itineraryService from '../services/itineraryService';

export async function createItineraryItem(req: Request, res: Response) {
  try {
    const item = await itineraryService.createItineraryItem(req.body);
    res.status(201).json(item);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create itinerary item' });
  }
}

export async function getItineraryItemById(req: Request, res: Response) {
  try {
    const item = await itineraryService.getItineraryItemById(Number(req.params.id));
    if (!item) {
      res.status(404).json({ error: 'Itinerary item not found' });
      return;
    }
    res.json(item);
  } catch (error) {
    res.status(500).json({ error: 'Failed to get itinerary item' });
  }
}

export async function getItineraryByTrip(req: Request, res: Response) {
  try {
    const items = await itineraryService.getItineraryByTrip(Number(req.params.tripId));
    res.json(items);
  } catch (error) {
    res.status(500).json({ error: 'Failed to get itinerary' });
  }
}

export async function updateItineraryItem(req: Request, res: Response) {
  try {
    const item = await itineraryService.updateItineraryItem(Number(req.params.id), req.body);
    res.json(item);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update itinerary item' });
  }
}

export async function deleteItineraryItem(req: Request, res: Response) {
  try {
    await itineraryService.deleteItineraryItem(Number(req.params.id));
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete itinerary item' });
  }
}
