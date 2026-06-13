import { Router } from 'express';
import * as itineraryController from '../controllers/itineraryController';

const router = Router();

router.post('/', itineraryController.createItineraryItem);
router.get('/trip/:tripId', itineraryController.getItineraryByTrip);
router.get('/:id', itineraryController.getItineraryItemById);
router.put('/:id', itineraryController.updateItineraryItem);
router.delete('/:id', itineraryController.deleteItineraryItem);

export default router;
