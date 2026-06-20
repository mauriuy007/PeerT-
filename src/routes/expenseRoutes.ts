import { Router } from 'express';
import * as expenseController from '../controllers/expenseController';
import { validateCreateExpense, validateUpdateExpense } from '../middlewares/expenseMiddleware';

const router = Router();

router.post('/', validateCreateExpense, expenseController.createExpense);
router.get('/trip/:tripId', expenseController.getExpensesByTrip);
router.get('/:id', expenseController.getExpenseById);
router.put('/:id', validateUpdateExpense, expenseController.updateExpense);
router.delete('/:id', expenseController.deleteExpense);

export default router;
