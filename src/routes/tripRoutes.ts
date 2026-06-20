import { Router } from 'express';
import * as tripController from '../controllers/tripController';
import { validateAddParticipant, validateCreateTrip, validateUpdateTrip } from '../middlewares/tripMiddleware';

const router = Router();

router.post('/', validateCreateTrip, tripController.createTrip);
router.get('/', tripController.getAllTrips);
router.get('/:id', tripController.getTripById);
router.put('/:id', validateUpdateTrip, tripController.updateTrip);
router.delete('/:id', tripController.deleteTrip);
router.post('/:id/participants', validateAddParticipant, tripController.addParticipant);
router.delete('/:id/participants/:userId', tripController.removeParticipant);

export default router;
