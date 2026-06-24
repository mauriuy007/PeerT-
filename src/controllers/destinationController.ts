import { Request, Response } from 'express';
import { DestinationNotFoundError } from '../errors/notFound';
import * as destinationService from '../services/destinationService';
import { ExternalServiceError } from '../errors/externalService';

export async function createDestination(req: Request, res: Response) {
  try {
    const destination = await destinationService.createDestination(req.body);
    res.status(201).json(destination);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
}

export async function getDestinationById(req: Request, res: Response) {
  try {
    const destination = await destinationService.getDestinationById(Number(req.params.id));
    res.json(destination);
  } catch (error) {
    if (error instanceof DestinationNotFoundError) {
      res.status(404).json({ error: error.message });
      return;
    }
    res.status(500).json({ error: 'Internal server error' });
  }
}

export async function getAllDestinations(_req: Request, res: Response) {
  try {
    const destinations = await destinationService.getAllDestinations();
    res.json(destinations);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
}

export async function updateDestination(req: Request, res: Response) {
  try {
    const destination = await destinationService.updateDestination(Number(req.params.id), req.body);
    res.json(destination);
  } catch (error) {
    if (error instanceof DestinationNotFoundError) {
      res.status(404).json({ error: error.message });
      return;
    }
    res.status(500).json({ error: 'Internal server error' });
  }
}

export async function deleteDestination(req: Request, res: Response) {
  try {
    await destinationService.deleteDestination(Number(req.params.id));
    res.status(204).send();
  } catch (error) {
    if (error instanceof DestinationNotFoundError) {
      res.status(404).json({ error: error.message });
      return;
    }
    res.status(500).json({ error: 'Internal server error' });
  }
}

export async function searchDestinations(req: Request, res: Response) {
  try {
    const results = await destinationService.searchDestinations(req.query.query as string);
    res.json(results);
  } catch (error) {
    if (error instanceof ExternalServiceError) {
      res.status(502).json({ error: error.message });
      return;
    }
    res.status(500).json({ error: 'Internal server error' });
  }
}

export async function getOrCreateFromPlace(req: Request, res: Response) {
  try {
    const destination = await destinationService.getOrCreateFromPlace(req.body.placeId);
    res.status(201).json(destination);
  } catch (error) {
    if (error instanceof ExternalServiceError) {
      res.status(502).json({ error: error.message });
      return;
    }
    res.status(500).json({ error: 'Internal server error' });
  }
}
