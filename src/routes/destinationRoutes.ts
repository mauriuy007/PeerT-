import { Router } from 'express';
import * as destinationController from '../controllers/destinationController';
import { validateCreateDestination, validateUpdateDestination } from '../middlewares/destinationMiddleware';

const router = Router();

router.post('/', validateCreateDestination, destinationController.createDestination);
router.get('/', destinationController.getAllDestinations);
router.get('/:id', destinationController.getDestinationById);
router.put('/:id', validateUpdateDestination, destinationController.updateDestination);
router.delete('/:id', destinationController.deleteDestination);

export default router;
