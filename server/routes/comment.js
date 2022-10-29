import {Router} from 'express';


import * as createComment from '../controllers/CommentController.js';
import checkAuth from "../middleware/checkAuth.js";


const router = Router();


router.post('/create', checkAuth, createComment.createComment); // Роут для создания комментариев
router.get('/getAll', createComment.getAll); // Роут для получения комментариев


export default router;