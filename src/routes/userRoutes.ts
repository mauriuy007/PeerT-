import { Router } from 'express';
import * as userController from '../controllers/userController';
import { validateCreateUser, validateUpdateUser } from '../middlewares/userMiddleware';

const router = Router();

router.post('/', validateCreateUser, userController.createUser);
router.get('/', userController.getAllUsers);
router.get('/:id', userController.getUserById);
router.put('/:id', validateUpdateUser, userController.updateUser);
router.delete('/:id', userController.deleteUser);

export default router;
