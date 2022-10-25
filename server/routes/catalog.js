import {Router} from 'express';


import * as CatalogController from '../controllers/CatalogController.js';
import checkAuth from "../middleware/checkAuth.js";


const router = Router();


router.get('/get', checkAuth, CatalogController.get); // Роут получения всех записей каталога
router.post('/createEntry', checkAuth, CatalogController.createEntry); // Роут для создания записи в каталоге
router.patch('/update', checkAuth, CatalogController.updateEntry); // Роут обновление каталога


export default router;