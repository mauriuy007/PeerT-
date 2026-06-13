import { Request, Response } from 'express';
import * as destinationService from '../services/destinationService';

export async function createDestination(req: Request, res: Response) {
  try {
    const destination = await destinationService.createDestination(req.body);
    res.status(201).json(destination);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create destination' });
  }
}

export async function getDestinationById(req: Request, res: Response) {
  try {
    const destination = await destinationService.getDestinationById(Number(req.params.id));
    if (!destination) {
      res.status(404).json({ error: 'Destination not found' });
      return;
    }
    res.json(destination);
  } catch (error) {
    res.status(500).json({ error: 'Failed to get destination' });
  }
}

export async function getAllDestinations(req: Request, res: Response) {
  try {
    const destinations = await destinationService.getAllDestinations();
    res.json(destinations);
  } catch (error) {
    res.status(500).json({ error: 'Failed to get destinations' });
  }
}

export async function updateDestination(req: Request, res: Response) {
  try {
    const destination = await destinationService.updateDestination(Number(req.params.id), req.body);
    res.json(destination);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update destination' });
  }
}

export async function deleteDestination(req: Request, res: Response) {
  try {
    await destinationService.deleteDestination(Number(req.params.id));
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete destination' });
  }
}
