import {Router} from 'express';


import * as CatalogController from '../controllers/CatalogController.js';
import checkAuth from "../middleware/checkAuth.js";


const router = Router();


router.get('/get', checkAuth, CatalogController.get); // Роут получения пользователя
router.post('/createEntry', checkAuth, CatalogController.createEntry); // Роут получения пользователя
router.patch('/update', checkAuth, CatalogController.updateEntry); // Роут получения пользователя


export default router;