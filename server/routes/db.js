import {Router} from 'express';

import * as DataBaseController from '../controllers/DataBaseController.js';
import checkAuth from "../middleware/checkAuth.js";

const router = Router();


router.post('/createBackUp', checkAuth, DataBaseController.createBackUpDB); //  для создания записи в каталоге



export default router;