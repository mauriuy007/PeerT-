import { NextFunction, Request, Response } from 'express';
import {
  createDestinationSchema,
  fromPlaceSchema,
  searchDestinationsSchema,
  updateDestinationSchema,
} from '../validators/destinationValidator';

export function validateCreateDestination(req: Request, res: Response, next: NextFunction) {
  const { error } = createDestinationSchema.validate(req.body, { abortEarly: false });
  if (error) {
    res.status(400).json({ errors: error.details.map((d) => d.message) });
    return;
  }
  next();
}

export function validateUpdateDestination(req: Request, res: Response, next: NextFunction) {
  const { error } = updateDestinationSchema.validate(req.body, { abortEarly: false });
  if (error) {
    res.status(400).json({ errors: error.details.map((d) => d.message) });
    return;
  }
  next();
}

export function validateSearchDestinations(req: Request, res: Response, next: NextFunction) {
  const { error } = searchDestinationsSchema.validate(req.query, { abortEarly: false });
  if (error) {
    res.status(400).json({ errors: error.details.map((d) => d.message) });
    return;
  }
  next();
}

export function validateFromPlace(req: Request, res: Response, next: NextFunction) {
  const { error } = fromPlaceSchema.validate(req.body, { abortEarly: false });
  if (error) {
    res.status(400).json({ errors: error.details.map((d) => d.message) });
    return;
  }
  next();
}
