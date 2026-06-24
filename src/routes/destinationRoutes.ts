import { Router } from 'express';
import * as destinationController from '../controllers/destinationController';
import {
  validateCreateDestination,
  validateFromPlace,
  validateSearchDestinations,
  validateUpdateDestination,
} from '../middlewares/destinationMiddleware';

const router = Router();

router.get('/search', validateSearchDestinations, destinationController.searchDestinations);
router.post('/from-place', validateFromPlace, destinationController.getOrCreateFromPlace);

router.post('/', validateCreateDestination, destinationController.createDestination);
router.get('/', destinationController.getAllDestinations);
router.get('/:id', destinationController.getDestinationById);
router.put('/:id', validateUpdateDestination, destinationController.updateDestination);
router.delete('/:id', destinationController.deleteDestination);

export default router;
