import { NextFunction, Request, Response } from 'express';
import { loginSchema } from '../validators/authValidator';

export function validateLogin(req: Request, res: Response, next: NextFunction) {
  const { error } = loginSchema.validate(req.body, { abortEarly: false });
  if (error) {
    res.status(400).json({ errors: error.details.map((d) => d.message) });
    return;
  }
  next();
}
