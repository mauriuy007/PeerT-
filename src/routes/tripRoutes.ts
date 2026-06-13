import { Router } from 'express';
import * as tripController from '../controllers/tripController';

const router = Router();

router.post('/', tripController.createTrip);
router.get('/', tripController.getAllTrips);
router.get('/:id', tripController.getTripById);
router.put('/:id', tripController.updateTrip);
router.delete('/:id', tripController.deleteTrip);
router.post('/:id/participants', tripController.addParticipant);
router.delete('/:id/participants/:userId', tripController.removeParticipant);

export default router;
