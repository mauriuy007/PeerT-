import { NextFunction, Request, Response } from 'express';
import prisma from '../data/prismaClient';
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

export async function checkTripMembership(req: Request, res: Response, next: NextFunction) {
  const tripId = Number(req.params.id);
  const userId = req.user!.id;
  const participant = await prisma.tripParticipant.findFirst({ where: { tripId, userId } });
  if (!participant) {
    res.status(403).json({ error: 'You are not a participant of this trip' });
    return;
  }
  next();
}

export async function checkTripOwner(req: Request, res: Response, next: NextFunction) {
  const tripId = Number(req.params.id);
  const userId = req.user!.id;
  const participant = await prisma.tripParticipant.findFirst({ where: { tripId, userId, role: 'OWNER' } });
  if (!participant) {
    res.status(403).json({ error: 'Only the trip owner can perform this action' });
    return;
  }
  next();
}
