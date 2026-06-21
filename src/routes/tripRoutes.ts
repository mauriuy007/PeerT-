import { Router } from 'express';
import * as tripController from '../controllers/tripController';
import { checkTripMembership, checkTripOwner, validateAddParticipant, validateCreateTrip, validateUpdateTrip } from '../middlewares/tripMiddleware';

const router = Router();

router.post('/', validateCreateTrip, tripController.createTrip);
router.get('/', tripController.getAllTrips);
router.get('/:id', checkTripMembership, tripController.getTripById);
router.put('/:id', checkTripOwner, validateUpdateTrip, tripController.updateTrip);
router.delete('/:id', checkTripOwner, tripController.deleteTrip);
router.post('/:id/participants', checkTripOwner, validateAddParticipant, tripController.addParticipant);
router.delete('/:id/participants/:userId', checkTripOwner, tripController.removeParticipant);

export default router;
