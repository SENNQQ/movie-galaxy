import {Router} from 'express';


import * as UserController from '../controllers/UserController.js';

const router = Router();

router.post('/register', UserController.register); // Роут регистрации


export default router;