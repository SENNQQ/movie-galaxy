import {Router} from 'express';


import * as CatalogController from '../controllers/CatalogController.js';
import checkAuth from "../middleware/checkAuth.js";


const router = Router();


router.get('/get', checkAuth, CatalogController.getOneEntry); //  получения одной записей каталога
router.get('/getEntryStatus', checkAuth, CatalogController.getEntryStatus); //  получения записей каталога по статусу
router.get('/getAllEntry', checkAuth, CatalogController.getAllEntry); //  получения всех записей каталога
router.post('/createEntry', checkAuth, CatalogController.createEntry); //  для создания записи в каталоге
router.patch('/update', checkAuth, CatalogController.updateEntry); //  обновление записи в каталоге


export default router;