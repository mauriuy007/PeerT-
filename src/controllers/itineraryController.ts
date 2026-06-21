import { Request, Response } from 'express';
import { ForbiddenError } from '../errors/auth';
import { ItineraryItemNotFoundError } from '../errors/notFound';
import * as itineraryService from '../services/itineraryService';

export async function createItineraryItem(req: Request, res: Response) {
  try {
    const item = await itineraryService.createItineraryItem(req.body, req.user!.id);
    res.status(201).json(item);
  } catch (error) {
    if (error instanceof ForbiddenError) {
      res.status(403).json({ error: error.message });
      return;
    }
    res.status(500).json({ error: 'Internal server error' });
  }
}

export async function getItineraryItemById(req: Request, res: Response) {
  try {
    const item = await itineraryService.getItineraryItemById(Number(req.params.id), req.user!.id);
    res.json(item);
  } catch (error) {
    if (error instanceof ItineraryItemNotFoundError) {
      res.status(404).json({ error: error.message });
      return;
    }
    if (error instanceof ForbiddenError) {
      res.status(403).json({ error: error.message });
      return;
    }
    res.status(500).json({ error: 'Internal server error' });
  }
}

export async function getItineraryByTrip(req: Request, res: Response) {
  try {
    const items = await itineraryService.getItineraryByTrip(Number(req.params.tripId), req.user!.id);
    res.json(items);
  } catch (error) {
    if (error instanceof ForbiddenError) {
      res.status(403).json({ error: error.message });
      return;
    }
    res.status(500).json({ error: 'Internal server error' });
  }
}

export async function updateItineraryItem(req: Request, res: Response) {
  try {
    const item = await itineraryService.updateItineraryItem(Number(req.params.id), req.body, req.user!.id);
    res.json(item);
  } catch (error) {
    if (error instanceof ItineraryItemNotFoundError) {
      res.status(404).json({ error: error.message });
      return;
    }
    if (error instanceof ForbiddenError) {
      res.status(403).json({ error: error.message });
      return;
    }
    res.status(500).json({ error: 'Internal server error' });
  }
}

export async function deleteItineraryItem(req: Request, res: Response) {
  try {
    await itineraryService.deleteItineraryItem(Number(req.params.id), req.user!.id);
    res.status(204).send();
  } catch (error) {
    if (error instanceof ItineraryItemNotFoundError) {
      res.status(404).json({ error: error.message });
      return;
    }
    if (error instanceof ForbiddenError) {
      res.status(403).json({ error: error.message });
      return;
    }
    res.status(500).json({ error: 'Internal server error' });
  }
}
