import { Router } from 'express';
import * as authController from '../controllers/authController';
import { validateLogin } from '../middlewares/validateLogin';

const router = Router();

router.post('/login', validateLogin, authController.login);

export default router;
