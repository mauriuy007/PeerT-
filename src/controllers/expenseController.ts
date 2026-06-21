import { Request, Response } from 'express';
import { ForbiddenError } from '../errors/auth';
import { ExpenseNotFoundError } from '../errors/notFound';
import * as expenseService from '../services/expenseService';

export async function createExpense(req: Request, res: Response) {
  try {
    const expense = await expenseService.createExpense(req.body, req.user!.id);
    res.status(201).json(expense);
  } catch (error) {
    if (error instanceof ForbiddenError) {
      res.status(403).json({ error: error.message });
      return;
    }
    res.status(500).json({ error: 'Internal server error' });
  }
}

export async function getExpenseById(req: Request, res: Response) {
  try {
    const expense = await expenseService.getExpenseById(Number(req.params.id), req.user!.id);
    res.json(expense);
  } catch (error) {
    if (error instanceof ExpenseNotFoundError) {
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

export async function getExpensesByTrip(req: Request, res: Response) {
  try {
    const expenses = await expenseService.getExpensesByTrip(Number(req.params.tripId), req.user!.id);
    res.json(expenses);
  } catch (error) {
    if (error instanceof ForbiddenError) {
      res.status(403).json({ error: error.message });
      return;
    }
    res.status(500).json({ error: 'Internal server error' });
  }
}

export async function updateExpense(req: Request, res: Response) {
  try {
    const expense = await expenseService.updateExpense(Number(req.params.id), req.body, req.user!.id);
    res.json(expense);
  } catch (error) {
    if (error instanceof ExpenseNotFoundError) {
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

export async function deleteExpense(req: Request, res: Response) {
  try {
    await expenseService.deleteExpense(Number(req.params.id), req.user!.id);
    res.status(204).send();
  } catch (error) {
    if (error instanceof ExpenseNotFoundError) {
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
