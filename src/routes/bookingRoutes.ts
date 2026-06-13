import { Router } from 'express';
import * as bookingController from '../controllers/bookingController';

const router = Router();

router.post('/', bookingController.createBooking);
router.get('/trip/:tripId', bookingController.getBookingsByTrip);
router.get('/:id', bookingController.getBookingById);
router.put('/:id', bookingController.updateBooking);
router.delete('/:id', bookingController.deleteBooking);

export default router;
