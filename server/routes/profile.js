import {Router} from 'express';


import * as ProfileController from '../controllers/ProfileController.js';
import checkAuth from "../middleware/checkAuth.js";


const router = Router();


router.get('/get', checkAuth, ProfileController.getAllEntryCatalog); // Роут получения всех записей каталога


export default router;