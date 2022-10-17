import {Router} from 'express';
// import * as ProductController from './controllers/ProductController.js';
// import * as OrderController from './controllers/OrderController.js';
// import {productCreateValidation} from './validators/product.js';
// import validationError from './validators/handleValidationErrors.js';
// import {orderCreateValidation} from './validators/order.js';
import authRoutes from './auth.js'

const router = Router();

router.use('/auth', authRoutes); // Роуты для авторизации, регистрации и изменения данных UserModel

export default router;