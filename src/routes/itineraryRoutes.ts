import { Router } from 'express';
import * as itineraryController from '../controllers/itineraryController';
import { validateCreateItineraryItem, validateUpdateItineraryItem } from '../middlewares/itineraryMiddleware';

const router = Router();

router.post('/', validateCreateItineraryItem, itineraryController.createItineraryItem);
router.get('/trip/:tripId', itineraryController.getItineraryByTrip);
router.get('/:id', itineraryController.getItineraryItemById);
router.put('/:id', validateUpdateItineraryItem, itineraryController.updateItineraryItem);
router.delete('/:id', itineraryController.deleteItineraryItem);

export default router;
