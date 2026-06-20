import { NextFunction, Request, Response } from 'express';
import { addParticipantSchema, createTripSchema, updateTripSchema } from '../validators/tripValidator';

export function validateCreateTrip(req: Request, res: Response, next: NextFunction) {
  const { error } = createTripSchema.validate(req.body, { abortEarly: false });
  if (error) {
    res.status(400).json({ errors: error.details.map((d) => d.message) });
    return;
  }
  next();
}

export function validateUpdateTrip(req: Request, res: Response, next: NextFunction) {
  const { error } = updateTripSchema.validate(req.body, { abortEarly: false });
  if (error) {
    res.status(400).json({ errors: error.details.map((d) => d.message) });
    return;
  }
  next();
}

export function validateAddParticipant(req: Request, res: Response, next: NextFunction) {
  const { error } = addParticipantSchema.validate(req.body, { abortEarly: false });
  if (error) {
    res.status(400).json({ errors: error.details.map((d) => d.message) });
    return;
  }
  next();
}
