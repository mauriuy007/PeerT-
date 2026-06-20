import { Router } from 'express';
import * as bookingController from '../controllers/bookingController';
import { validateCreateBooking, validateUpdateBooking } from '../middlewares/bookingMiddleware';

const router = Router();

router.post('/', validateCreateBooking, bookingController.createBooking);
router.get('/trip/:tripId', bookingController.getBookingsByTrip);
router.get('/:id', bookingController.getBookingById);
router.put('/:id', validateUpdateBooking, bookingController.updateBooking);
router.delete('/:id', bookingController.deleteBooking);

export default router;
