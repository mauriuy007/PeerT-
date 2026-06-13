import { Router } from 'express';
import * as expenseController from '../controllers/expenseController';

const router = Router();

router.post('/', expenseController.createExpense);
router.get('/trip/:tripId', expenseController.getExpensesByTrip);
router.get('/:id', expenseController.getExpenseById);
router.put('/:id', expenseController.updateExpense);
router.delete('/:id', expenseController.deleteExpense);

export default router;
