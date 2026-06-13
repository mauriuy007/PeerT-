import { Request, Response } from 'express';
import * as expenseService from '../services/expenseService';

export async function createExpense(req: Request, res: Response) {
  try {
    const expense = await expenseService.createExpense(req.body);
    res.status(201).json(expense);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create expense' });
  }
}

export async function getExpenseById(req: Request, res: Response) {
  try {
    const expense = await expenseService.getExpenseById(Number(req.params.id));
    if (!expense) {
      res.status(404).json({ error: 'Expense not found' });
      return;
    }
    res.json(expense);
  } catch (error) {
    res.status(500).json({ error: 'Failed to get expense' });
  }
}

export async function getExpensesByTrip(req: Request, res: Response) {
  try {
    const expenses = await expenseService.getExpensesByTrip(Number(req.params.tripId));
    res.json(expenses);
  } catch (error) {
    res.status(500).json({ error: 'Failed to get expenses' });
  }
}

export async function updateExpense(req: Request, res: Response) {
  try {
    const expense = await expenseService.updateExpense(Number(req.params.id), req.body);
    res.json(expense);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update expense' });
  }
}

export async function deleteExpense(req: Request, res: Response) {
  try {
    await expenseService.deleteExpense(Number(req.params.id));
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete expense' });
  }
}
