import { NextFunction, Request, Response } from 'express';
import { createItineraryItemSchema, updateItineraryItemSchema } from '../validators/itineraryValidator';

export function validateCreateItineraryItem(req: Request, res: Response, next: NextFunction) {
  const { error } = createItineraryItemSchema.validate(req.body, { abortEarly: false });
  if (error) {
    res.status(400).json({ errors: error.details.map((d) => d.message) });
    return;
  }
  next();
}

export function validateUpdateItineraryItem(req: Request, res: Response, next: NextFunction) {
  const { error } = updateItineraryItemSchema.validate(req.body, { abortEarly: false });
  if (error) {
    res.status(400).json({ errors: error.details.map((d) => d.message) });
    return;
  }
  next();
}
