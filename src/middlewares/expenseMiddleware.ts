import { NextFunction, Request, Response } from 'express';
import { createExpenseSchema, updateExpenseSchema } from '../validators/expenseValidator';

export function validateCreateExpense(req: Request, res: Response, next: NextFunction) {
  const { error } = createExpenseSchema.validate(req.body, { abortEarly: false });
  if (error) {
    res.status(400).json({ errors: error.details.map((d) => d.message) });
    return;
  }
  next();
}

export function validateUpdateExpense(req: Request, res: Response, next: NextFunction) {
  const { error } = updateExpenseSchema.validate(req.body, { abortEarly: false });
  if (error) {
    res.status(400).json({ errors: error.details.map((d) => d.message) });
    return;
  }
  next();
}
