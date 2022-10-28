import {Router} from 'express';
import authRoutes from './auth.js'
import catalogRoutes from './catalog.js'
import profile from './profile.js'
import comment from './comment.js'

const router = Router();

router.use('/auth', authRoutes); // Роуты для авторизации, регистрации и изменения данных UserModel
router.use('/catalog', catalogRoutes); // Получение, обновление и добавление фильмов,тв шоу в каталог юзера
router.use('/profile', profile); // Получение, обновление и добавление фильмов,тв шоу в каталог юзера
router.use('/comment', comment); // Получение, добавление фильмов,тв шоу в каталог юзера

export default router;