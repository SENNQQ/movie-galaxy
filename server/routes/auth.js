import {Router} from 'express';


import * as UserController from '../controllers/UserController.js';
import checkAuth from "../middleware/checkAuth.js";


const router = Router();

router.post('/register', UserController.register); // Роут регистрации
router.post('/login', UserController.login); // Роут авторизации
router.patch('/update', UserController.update); // Роут авторизации
router.get('', checkAuth, UserController.getMe); // Роут получения пользователя
router.get('/getUser', UserController.getUser); // Роут получения пользователя


export default router;