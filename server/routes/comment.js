import {Router} from 'express';


import * as createComment from '../controllers/CommentController.js';
import checkAuth from "../middleware/checkAuth.js";


const router = Router();


router.post('/create', checkAuth, createComment.createComment); // Роут для создания комментариев
router.get('/getContentComment', createComment.getContentComment); // Роут для получения комментариев к контенту
router.get('/getAll', createComment.getAll); // Роут для получения всех комментариев на проверку админа
router.patch('/updateApprove', createComment.updateApprove); // Роут для обновления комментария


export default router;