import { Router } from 'express';
import * as destinationController from '../controllers/destinationController';

const router = Router();

router.post('/', destinationController.createDestination);
router.get('/', destinationController.getAllDestinations);
router.get('/:id', destinationController.getDestinationById);
router.put('/:id', destinationController.updateDestination);
router.delete('/:id', destinationController.deleteDestination);

export default router;
